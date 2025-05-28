# uvicorn main:app --reload

from fastapi import FastAPI, UploadFile, File, Query
from fastapi.middleware.cors import CORSMiddleware
from task_summary_extractor import summarize_and_extract_tasks
from dotenv import load_dotenv
from pyannote.audio import Pipeline
import whisperx

import subprocess
import os
import whisper
import tempfile
import torch
import time

# Load environment variables
load_dotenv()
HF_TOKEN = os.getenv("HF_TOKEN")

# Detect device
device = "cuda" if torch.cuda.is_available() else "cpu"
compute_type = "float16" if device == "cuda" else "int8"

# Load WhisperX model once
model = whisperx.load_model("small", device, compute_type=compute_type)

# Load diarization model once
try:
    diarization_pipeline = Pipeline.from_pretrained("pyannote/speaker-diarization", use_auth_token=HF_TOKEN)
except Exception as e:
    print(f"Warning: Failed to load diarization pipeline: {e}")
    diarization_pipeline = None

# FastAPI app
app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

def merge_segments_with_speakers(whisper_segments, diarization_segments):
    merged = []
    for whisper_seg in whisper_segments:
        speaker = "Unknown"
        for dia_seg in diarization_segments.itertracks(yield_label=True):
            dia_start, dia_end, dia_label = dia_seg[0].start, dia_seg[0].end, dia_seg[2]
            if dia_start <= whisper_seg["start"] < dia_end:
                speaker = dia_label
                break
        whisper_seg["speaker"] = speaker
        merged.append(whisper_seg)
    return merged

@app.post("/transcribe")
async def transcribe(file: UploadFile = File(...), with_speakers: bool = False):
    start_time = time.time()

    # Save uploaded audio to temporary file
    with tempfile.NamedTemporaryFile(delete=False, suffix=".webm") as tmp:
        tmp.write(await file.read())
        tmp.flush()
        input_path = tmp.name

    # Convert to WAV
    with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as tmp_wav:
        output_path = tmp_wav.name
    subprocess.run([
        "ffmpeg", "-y", "-i", input_path,
        "-ar", "16000", "-ac", "1", "-f", "wav", output_path
    ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    print(f"[TIMING] Audio conversion: {time.time() - start_time:.2f}s")

    # Load audio
    audio = whisperx.load_audio(output_path)

    # Transcribe + align
    result = model.transcribe(audio)
    model_a, metadata = whisperx.load_align_model(language_code=result["language"], device=device)
    result = whisperx.align(result["segments"], model_a, metadata, audio, device)
    print(f"[TIMING] Transcription + alignment: {time.time() - start_time:.2f}s")

    # # Optional diarization (disabled for effiency)
    # if with_speakers and diarization_pipeline:
    #     try:
    #         diarization_result = diarization_pipeline(output_path)
    #         result["segments"] = merge_segments_with_speakers(result["segments"], diarization_result)
    #     except Exception as e:
    #         print(f"Warning: Diarization failed: {e}")

    # Format transcript
    transcript = "\n".join([f"{seg.get('speaker', 'Speaker')}: {seg['text']}" for seg in result["segments"]])
    summary_result = summarize_and_extract_tasks(transcript)
    print(f"[TIMING] Full pipeline: {time.time() - start_time:.2f}s")

    return {
        "text": transcript,
        "summary": summary_result
    }

@app.get("/")
def read_root():
    return {"message": "CollabAgent backend is running!"}

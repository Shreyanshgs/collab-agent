# uvicorn main:app --reload


from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from task_summary_extractor import summarize_and_extract_tasks
from dotenv import load_dotenv
from whisperx.diarize import DiarizationPipeline
from pyannote.audio import Pipeline


import subprocess
import os
import whisper
import whisperx
import tempfile
import torch

load_dotenv()
HF_TOKEN = os.getenv("HF_TOKEN")

# initialize FastAPI app to handle HTTP requests
app = FastAPI()
# load Whisper model

# allows frontend to call backend without getting blocked by browser
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

device = "cuda" if torch.cuda.is_available() else "cpu"
model = whisperx.load_model("base", device, compute_type="float32")


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


# transcription endpoint which takes in a audio file
@app.post("/transcribe")
async def transcribe(file: UploadFile = File(...)):
    with tempfile.NamedTemporaryFile(delete=False, suffix=".webm") as tmp:
        tmp.write(await file.read())
        tmp.flush()
        input_path = tmp.name

    # Convert to proper WAV format using ffmpeg
    with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as tmp_wav:
        output_path = tmp_wav.name

    subprocess.run([
        "ffmpeg", "-y", "-i", input_path,
        "-ar", "16000", "-ac", "1", "-f", "wav", output_path
    ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    audio = whisperx.load_audio(output_path)

    # Transcribe and align
    result = model.transcribe(audio)
    model_a, metadata = whisperx.load_align_model(language_code=result["language"], device=device)
    result = whisperx.align(result["segments"], model_a, metadata, audio, device)

    # Diarization
    try:
        pipeline = Pipeline.from_pretrained("pyannote/speaker-diarization", use_auth_token=HF_TOKEN)
        diarization_result = pipeline(output_path)  # <--- FIXED THIS LINE
    except Exception as e:
        raise RuntimeError(f"Diarization pipeline failed: {e}")

    # Merge speaker labels
    result["segments"] = merge_segments_with_speakers(result["segments"], diarization_result)

    # Format transcript
    transcript = "\n".join([f"{seg['speaker']}: {seg['text']}" for seg in result["segments"]])
    summary_result = summarize_and_extract_tasks(transcript)

    return {
        "text": transcript,
        "summary": summary_result
    }


# root endpoint for testing backend connection
@app.get("/")
def read_root():
    return {"message": "CollabAgent backend is running!"}
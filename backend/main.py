from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from task_summary_extractor import summarize_and_extract_tasks

import whisper
import tempfile

# initialize FastAPI app to handle HTTP requests
app = FastAPI()
# load Whisper model
model = whisper.load_model("base")

# allows frontend to call backend without getting blocked by browser
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# transcription endpoint which takes in a audio file
@app.post("/transcribe")
async def transcribe(file: UploadFile = File(...)):
    with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as tmp:
        tmp.write(await file.read())
        result = model.transcribe(tmp.name)

    transcript = result["text"]
    summary = summarize_and_extract_tasks(transcript)

    return {
        "text": transcript,
        "summary": summary
    }


# root endpoint for testing backend connection
@app.get("/")
def read_root():
    return {"message": "CollabAgent backend is running!"}
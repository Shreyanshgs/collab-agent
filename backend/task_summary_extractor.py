import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=api_key)
model = genai.GenerativeModel(model_name="models/gemini-2.0-flash")

def summarize_and_extract_tasks(transcript: str):
    prompt = f"""
You're an AI meeting assistant.

Given the transcript below, do the following:
1. Summarize the meeting in 4–6 sentences.
2. Extract clear action items (tasks) in the format: [Who] will [do what] [by when if mentioned].
3. Extract any decisions made.

Format your output as:
Summary: <summary>
Tasks:
- ...
- ...
Decisions:
- ...
- ...

Transcript:
\"\"\"
{transcript}
\"\"\"
"""

    response = model.generate_content(prompt)
    text = response.text

    # Simple parsing logic (can be replaced with regex for more robustness)
    summary = ""
    tasks = []
    decisions = []

    section = None
    for line in text.splitlines():
        if line.startswith("Summary:"):
            section = "summary"
            summary = line[len("Summary:"):].strip()
        elif line.strip() == "Tasks:":
            section = "tasks"
        elif line.strip() == "Decisions:":
            section = "decisions"
        elif line.startswith("-"):
            item = line.strip("- ").strip()
            if section == "tasks":
                tasks.append(item)
            elif section == "decisions":
                decisions.append(item)

    return {
        "summary": summary,
        "tasks": tasks,
        "decisions": decisions
    }

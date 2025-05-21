import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

genai.configure(api_key=api_key)

model = genai.GenerativeModel(model_name="models/gemini-2.0-flash")

def summarize_and_extract_tasks(transcript: str):
    prompt = f"""
You're an AI note taker assistant.

Given the following transcript, generate a concise summary paragraph of 4-6 sentences. Just give the summary, no other text. 

Summary:
\"\"\"
{transcript}
\"\"\"
"""

    response = model.generate_content(prompt)

    return response.text


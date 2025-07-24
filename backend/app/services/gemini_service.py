
import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)

# Use Gemini 1.5 Pro
model = genai.GenerativeModel("models/gemini-1.5-pro-latest")

# 🧠 System prompt to shape behavior
system_prompt = (
    "You are MindCare Assistant, a calm and thoughtful emotional support AI. "
    "You are not a doctor or therapist, and you never diagnose. "
    "Your goal is to gently check in on a user’s mental wellbeing, one step at a time. "
    "Avoid long paragraphs. Instead, ask short, supportive follow-up questions. "
    "If someone mentions distress or mental illness, ask how they are feeling or what they are experiencing before redirecting. "
    "Use a warm tone, stay grounded, and never make assumptions. "
    "If the user expresses serious risk (e.g., suicide), recommend they talk to a professional with emergency contact info."
)

def format_prompt(message: str) -> str:
    return f"{system_prompt}\n\nUser: {message}\nAssistant:"

def get_gemini_response(message: str) -> str:
    prompt = format_prompt(message)
    response = model.generate_content(prompt)
    return response.text.strip()

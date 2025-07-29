# backend/app/services/gemini_service.py
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

SYSTEM_PROMPTS = {
    "MindCare": "You are a calm, emotionally intelligent assistant. Offer support with balance and clarity. Avoid deep diagnosis. Stay gentle and structured.",
    "Motivator": "You are a bold and energetic motivator. Encourage action, clarity, and positive thinking. Use strong and short phrases.",
    "StressRelief": "You are a mindfulness-oriented assistant. Help the user relax, breathe, and feel okay. Offer calming thoughts and space.",
}

async def ask_gemini_async(message: str, mode: str) -> str:
    try:
        model = genai.GenerativeModel("gemini-1.5-pro")
        system_prompt = SYSTEM_PROMPTS.get(mode, SYSTEM_PROMPTS["MindCare"])

        chat = model.start_chat(history=[
            {"role": "user", "parts": [system_prompt]},
        ])
        response = await chat.send_message_async(message)
        return response.text or "⚠️ Gemini did not return a response."

    except Exception as e:
        print("❌ Gemini API error:", str(e))
        return "⚠️ Gemini service failed."

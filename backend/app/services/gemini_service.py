# backend/app/services/gemini_service.py
import google.generativeai as genai
import os
from dotenv import load_dotenv
from asyncio import sleep

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

ongoing_sessions = {}

SYSTEM_PROMPTS = {
    "MindCare": "You are a calm, emotionally intelligent assistant. Offer support with balance and clarity. Avoid deep diagnosis. Stay gentle and structured.",
    "Motivator": "You are a bold and energetic motivator. Encourage action, clarity, and positive thinking. Use strong and short phrases.",
    "StressRelief": "You are a mindfulness-oriented assistant. Help the user relax, breathe, and feel okay. Offer calming thoughts and space.",
}

async def ask_gemini_async(message: str, mode: str, history: list, session_id: str) -> str:
    try:
        model = genai.GenerativeModel("gemini-1.5-pro")
        system_prompt = SYSTEM_PROMPTS.get(mode, SYSTEM_PROMPTS["MindCare"])

        # Inject system prompt as the assistant's first message
        formatted_history = [{"role": "assistant", "parts": [system_prompt]}] + [
            {"role": m["sender"], "parts": [m["text"]]} for m in history
        ]

        chat = model.start_chat(history=formatted_history)
        ongoing_sessions[session_id] = chat
        response = await chat.send_message_async(message)
        return response.text

    except Exception as e:
        print("❌ Gemini API error:", str(e))
        return "Sorry, I ran into an issue. Please try again."
    finally:
        ongoing_sessions.pop(session_id, None)



async def cancel_session(session_id: str):
    if session_id in ongoing_sessions:
        ongoing_sessions.pop(session_id, None)
        await sleep(0.1)
        print(f"⚠️ Cancelled session {session_id}")

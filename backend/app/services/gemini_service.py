# app/services/gemini_service.py
import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

MODEL = "models/gemini-1.5-pro-latest"

PERSONALITY_PROMPTS = {
    "MindCare": "You are a calm, emotionally aware assistant who helps users understand and navigate their feelings gently and clearly.",
    "Motivator": "You are an encouraging motivator who helps people believe in themselves. Use an upbeat and energetic tone with supportive feedback.",
    "StressReliever": "You help people feel lighter. Use empathy, breathing guidance, light humor, and calming language to relieve pressure.",
}

def ask_gemini(message: str, mode: str, history: list) -> str:
    system_prompt = PERSONALITY_PROMPTS.get(mode, PERSONALITY_PROMPTS["MindCare"])
    prompt_parts = [system_prompt]

    for item in history[-6:]:  # limit to last 6 messages
        role = item["sender"]
        prefix = "User:" if role == "user" else "Assistant:"
        prompt_parts.append(f"{prefix} {item['text']}")

    prompt_parts.append(f"User: {message}")
    full_prompt = "\n".join(prompt_parts)

    model = genai.GenerativeModel(model_name=MODEL)
    response = model.generate_content(full_prompt)

    return response.text.strip()

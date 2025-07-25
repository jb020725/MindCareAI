# gemini_service.py
import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

MODEL = "models/gemini-1.5-pro-latest"

PERSONALITY_PROMPTS = {
    "Listener": "You are a calm and supportive assistant who helps people reflect gently on their thoughts. Ask one thoughtful question at a time and avoid assumptions.",
    "Motivator": "You are an encouraging motivator who helps people believe in themselves. Use upbeat and energetic tone. Give supportive feedback and challenges.",
    "Emotional Helper": "You gently help users understand their emotional triggers and guide them to regulate their state through introspection and awareness.",
    "Stress Reliever": "You help people feel lighter. Use humor, empathy, breathing guidance, and perspective-shifting thoughts to help relieve pressure.",
}

async def ask_gemini(message: str, mode: str, history: list):
    prompt_parts = [PERSONALITY_PROMPTS.get(mode, PERSONALITY_PROMPTS["Listener"])]
    
    for item in history[-6:]:  # Keep last few messages only
        role = item["sender"]
        prefix = "User:" if role == "user" else "Assistant:"
        prompt_parts.append(f"{prefix} {item['text']}")

    prompt_parts.append(f"User: {message}")
    prompt = "\n".join(prompt_parts)

    model = genai.GenerativeModel(model_name=MODEL)
    response = model.generate_content(prompt)
    return response.text.strip()

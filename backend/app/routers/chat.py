# backend/app/routers/chat.py
from fastapi import APIRouter
from pydantic import BaseModel
from app.services.gemini_service import ask_gemini_async

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    mode: str

@router.post("/chat")
async def chat_endpoint(payload: ChatRequest):
    reply = await ask_gemini_async(
        message=payload.message,
        mode=payload.mode,
    )
    return {"reply": reply, "audio_url": None}

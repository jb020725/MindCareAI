# chat.py
from fastapi import APIRouter, Request
from pydantic import BaseModel
from app.services.gemini_service import ask_gemini

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    mode: str
    history: list

@router.post("/chat")
async def chat_endpoint(payload: ChatRequest):
    reply = await ask_gemini(
        message=payload.message,
        mode=payload.mode,
        history=payload.history
    )
    return {"reply": reply}

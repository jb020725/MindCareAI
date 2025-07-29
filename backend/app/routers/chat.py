# backend/app/routers/chat.py
from fastapi import APIRouter
from pydantic import BaseModel
from app.services.gemini_service import ask_gemini_async, cancel_session

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    mode: str
    history: list
    session_id: str

@router.post("/chat")
async def chat_endpoint(payload: ChatRequest):
    reply = await ask_gemini_async(
        message=payload.message,
        mode=payload.mode,
        history=payload.history,
        session_id=payload.session_id,
    )
    return {"reply": reply, "audio_url": None}

@router.post("/cancel")
async def cancel_endpoint(payload: dict):
    session_id = payload.get("session_id")
    await cancel_session(session_id)
    return {"status": "cancelled"}

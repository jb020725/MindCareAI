# backend/app/routers/chat.py
from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from backend.app.services.gemini_service import ask_gemini

router = APIRouter()

class Message(BaseModel):
    sender: str
    text: str

class ChatRequest(BaseModel):
    message: str
    mode: str
    history: List[Message]

@router.post("/chat")
async def chat_endpoint(payload: ChatRequest):
    print(f"Received: {payload.dict()}")
    try:
        reply = ask_gemini(
            message=payload.message,
            mode=payload.mode,
            history=[msg.dict() for msg in payload.history]
        )
        return {"reply": reply}
    except Exception as e:
        print(f"Error in /chat: {e}")
        return {"reply": "Sorry, something went wrong."}

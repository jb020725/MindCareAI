# chat.py
from fastapi import APIRouter, Request
from pydantic import BaseModel
from backend.app.services.gemini_service import ask_gemini

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    mode: str
    history: list

@router.post("/chat")
async def chat_endpoint(payload: ChatRequest):
    print(f"Received: {payload.dict()}")
    try:
        reply = ask_gemini(
            message=payload.message,
            mode=payload.mode,
            history=payload.history
        )
        return {"reply": reply}
    except Exception as e:
        print(f"Error in /chat: {e}")
        return {"reply": "Sorry, something went wrong."}

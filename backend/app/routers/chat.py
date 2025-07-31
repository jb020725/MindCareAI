from fastapi import APIRouter, Request
from pydantic import BaseModel
from app.services.gemini_service import ask_gemini_async

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    mode: str

@router.post("/chat")
async def chat_endpoint(request: Request):
    # Debug: print raw JSON payload
    body = await request.json()
    print("📦 Received payload:", body)

    # Validate
    payload = ChatRequest(**body)

    reply = await ask_gemini_async(
        message=payload.message,
        mode=payload.mode,
    )
    return {"reply": reply, "audio_url": None}



from fastapi import APIRouter, Request
from app.services.gemini_service import get_gemini_response

router = APIRouter()

@router.post("/")
async def chat(request: Request):
    data = await request.json()
    user_message = data.get("message")

    # sync call now
    reply = get_gemini_response(user_message)

    return {"response": reply}

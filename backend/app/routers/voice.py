from fastapi import APIRouter, UploadFile, File, Form
from pydantic import BaseModel
from fastapi.responses import JSONResponse
from app.services.tts_service import synthesize_speech
import uuid
import os

router = APIRouter()

class TTSRequest(BaseModel):
    text: str

@router.post("/tts")
async def generate_tts(payload: TTSRequest):
    filename = str(uuid.uuid4())
    audio_url = synthesize_speech(payload.text, filename)

    # Schedule deletion (optional: async delay or background task)
    filepath = os.path.join("backend/app/static/audio", f"{filename}.mp3")
    try:
        # Auto-delete file after 60 seconds (basic implementation)
        import threading, time
        def delete_later(path):
            time.sleep(60)
            if os.path.exists(path):
                os.remove(path)
        threading.Thread(target=delete_later, args=(filepath,)).start()
    except Exception as e:
        print("Error scheduling file deletion:", e)

    return {"audio_url": audio_url}

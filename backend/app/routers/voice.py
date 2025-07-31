# backend/app/routers/voice.py

from fastapi import APIRouter, UploadFile, File, Form
from pydantic import BaseModel
from fastapi.responses import JSONResponse
from app.services.tts_service import synthesize_speech
from app.services.stt_service import transcribe_audio
import uuid
import os
import tempfile

router = APIRouter()

# ✅ TTS endpoint
class TTSRequest(BaseModel):
    text: str

@router.post("/tts")
async def generate_tts(payload: TTSRequest):
    filename = str(uuid.uuid4())
    audio_url = synthesize_speech(payload.text, filename)

    filepath = os.path.join("backend/app/static/audio", f"{filename}.mp3")

    try:
        # Delete the file after 60 seconds
        import threading, time

        def delete_later(path):
            time.sleep(60)
            if os.path.exists(path):
                os.remove(path)

        threading.Thread(target=delete_later, args=(filepath,)).start()
    except Exception as e:
        print("❌ Error scheduling file deletion:", e)

    return {"audio_url": audio_url}


# ✅ STT /voice endpoint (used by frontend mic)
@router.post("/voice")
async def transcribe_voice(file: UploadFile = File(...), mode: str = Form(...)):
    try:
        # Save voice.webm to temp file
        with tempfile.NamedTemporaryFile(delete=False, suffix=".webm") as tmp:
            tmp.write(await file.read())
            tmp_path = tmp.name

        # Call Google STT
        transcript = transcribe_audio(tmp_path)

        # Clean up
        os.remove(tmp_path)

        return {"transcript": transcript}

    except Exception as e:
        print("❌ Error in /voice:", str(e))
        return {"transcript": ""}

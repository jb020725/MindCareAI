# backend/app/routers/voice.py
from fastapi import APIRouter, File, UploadFile, Form
from fastapi.responses import JSONResponse
from app.services.stt_service import transcribe_audio
from app.services.gemini_service import ask_gemini
from app.services.tts_service import synthesize_speech
import uuid
import os

router = APIRouter()

@router.post("/voice")
async def handle_voice(file: UploadFile = File(...), mode: str = Form(...)):
    try:
        # Define and create audio save directory
        save_dir = "backend/app/static/audio"
        os.makedirs(save_dir, exist_ok=True)

        # Save the uploaded file
        filename = f"{uuid.uuid4()}.webm"
        filepath = os.path.join(save_dir, filename)
        with open(filepath, "wb") as f:
            f.write(await file.read())

        print(">> Saving audio...")

        # Transcribe audio
        print(">> Transcribing...")
        transcript = transcribe_audio(filepath)
        print(f">> Transcript: {transcript}")

        if not transcript.strip():
            return JSONResponse(status_code=400, content={"error": "Empty transcript"})

        # Call Gemini with transcript
        reply = ask_gemini(transcript, mode, [])
        print(f">> Gemini Reply: {reply}")

        # Generate TTS audio
        filename_base = os.path.splitext(os.path.basename(filepath))[0]
        synthesize_speech(reply, filename_base)

        # Prepare audio URL for frontend
        audio_url = f"http://localhost:8000/static/audio/{filename_base}.mp3"

        return {"reply": reply, "audio_url": audio_url}

    except Exception as e:
        print(f"ERROR in /voice: {e}")
        return JSONResponse(status_code=500, content={"error": str(e)})

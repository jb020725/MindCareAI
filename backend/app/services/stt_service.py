# app/services/stt_service.py
import os
from pathlib import Path
from google.cloud import speech
import io

# Set Google credentials path
credential_path = Path("backend/app/keys/google_credentials.json").resolve()
print(f"Credential path: {credential_path}")
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = str(credential_path)

def transcribe_audio(file_path: str) -> str:
    client = speech.SpeechClient()

    with io.open(file_path, "rb") as audio_file:
        content = audio_file.read()

    audio = speech.RecognitionAudio(content=content)

    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.WEBM_OPUS,
        language_code="en-US",
        model="default",
        # ✅ DO NOT manually set sample_rate_hertz — let Google detect it
        # sample_rate_hertz=48000,  ❌ REMOVE
        audio_channel_count=1,
        enable_automatic_punctuation=True,
    )

    response = client.recognize(config=config, audio=audio)

    for result in response.results:
        return result.alternatives[0].transcript

    return ""

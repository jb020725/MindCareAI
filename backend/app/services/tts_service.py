import os
from pathlib import Path
from google.cloud import texttospeech

# Set up credentials path (safe for local dev)
credential_path = Path("backend/app/keys/google_credentials.json").resolve()
print(f"Credential path: {credential_path}")
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = str(credential_path)

# Create output directory if it doesn't exist
OUTPUT_DIR = Path("backend/app/static/audio")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

def synthesize_speech(text: str, filename: str) -> str:
    """
    Convert text to speech using Google Cloud TTS and save as an .mp3 file.

    Args:
        text (str): Text to synthesize.
        filename (str): Desired filename (without extension).

    Returns:
        str: Relative path to the generated .mp3 file.
    """
    client = texttospeech.TextToSpeechClient()

    synthesis_input = texttospeech.SynthesisInput(text=text)
    voice = texttospeech.VoiceSelectionParams(
        language_code="en-US",
        ssml_gender=texttospeech.SsmlVoiceGender.NEUTRAL
    )
    audio_config = texttospeech.AudioConfig(
        audio_encoding=texttospeech.AudioEncoding.MP3
    )

    response = client.synthesize_speech(
        input=synthesis_input,
        voice=voice,
        audio_config=audio_config
    )

    output_path = OUTPUT_DIR / f"{filename}.mp3"
    with open(output_path, "wb") as out:
        out.write(response.audio_content)

    return f"/static/audio/{filename}.mp3"

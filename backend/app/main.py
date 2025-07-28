
# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from backend.app.routers import chat, voice  # ✅ Added voice route

app = FastAPI()

# Allow frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Route registration
app.include_router(chat.router)
app.include_router(voice.router)  # ✅ Include voice endpoint

# Static files for TTS playback
app.mount("/static", StaticFiles(directory="backend/app/static"), name="static")  # ✅ Fixed directory path

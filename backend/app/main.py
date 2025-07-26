# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.routers import chat

app = FastAPI()

# Allow frontend connection (adjust origins for prod)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat.router)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import chat
from dotenv import load_dotenv
load_dotenv()


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat.router, prefix="/chat")
@app.get("/")
async def root():
    return {"message": "Welcome to the MindCare AI backend!"}
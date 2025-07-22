from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return {"message": "MindCareAI backend is running"}

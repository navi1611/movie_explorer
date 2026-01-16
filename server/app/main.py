from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os
from dotenv import load_dotenv
from app.api.v1.router import router as api_router
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.models import Movie, Genre, movies_genres, MovieActor, Actor, Director

load_dotenv()

app = FastAPI(title="Movie API", version="1.0.0")

# Get CORS origins from environment variable, default to localhost:5173
cors_origins = os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",")
cors_origins = [origin.strip() for origin in cors_origins]

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(api_router, prefix="/api/v1")


@app.get("/", tags=["Health"])
async def root():
    return {"message": "Movie API running successfully"}



# if __name__ == "__main__":
#     uvicorn.run(app, host="0.0.0.0", port=8000)

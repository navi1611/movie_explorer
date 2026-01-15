from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from app.api.v1.router import router as api_router
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.models import Movie, Genre, movies_genres, MovieActor, Actor, Director


app = FastAPI(title="Movie API", version="1.0.0")


# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:3000"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )


app.include_router(api_router, prefix="/api/v1")


@app.get("/", tags=["Health"])
async def root():
    return {"message": "Movie API running successfully"}



# if __name__ == "__main__":
#     uvicorn.run(app, host="0.0.0.0", port=8000)

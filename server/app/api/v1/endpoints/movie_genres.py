from fastapi import APIRouter, Depends, HTTPException
from app.schemas.genre import GenreResponse
from app.core.database import get_db
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
from app.services.movie_genres import (
    get_movie_genres_by_movie_service,
    get_movies_by_genre_service,
    create_movie_genres_bulk_service
)

router = APIRouter()

class MovieGenreBulkCreateItem(BaseModel):
    movie_id: int
    genre_id: int

@router.get("/movie/{movie_id}", response_model=list[GenreResponse])
def get_movie_genres(movie_id: int, db: Session = Depends(get_db)):
    res = get_movie_genres_by_movie_service(movie_id, db)
    return res

@router.get("/genre/{genre_id}/movies")
def get_movies_by_genre(genre_id: int, db: Session = Depends(get_db)):
    res = get_movies_by_genre_service(genre_id, db)
    return res

@router.post("/bulk", status_code=201)
def create_movie_genres_bulk(
    creates: List[MovieGenreBulkCreateItem],
    db: Session = Depends(get_db)
):
    try:
        creates_dict = [create.model_dump() for create in creates]
        res = create_movie_genres_bulk_service(creates_dict, db)
        return res
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))


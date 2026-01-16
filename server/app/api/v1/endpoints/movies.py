from fastapi import APIRouter, Depends, HTTPException, Query
from app.schemas.movie import MovieResponse, MovieDetail, MovieCreate
from app.core.database import get_db
from sqlalchemy.orm import Session
from typing import Optional
from app.services.movies import (
    get_movie_detail_service,
    get_movies_service,
    create_movie_service
)

router = APIRouter()

@router.get("/", response_model=list[MovieResponse])
def get_movies(
    genre_id: Optional[int] = Query(None, description="Filter movies by genre ID"),
    db: Session = Depends(get_db)
):
    res = get_movies_service(db, genre_id=genre_id)
    return res

@router.post("/", response_model=MovieResponse, status_code=201)
def create_movie(movie: MovieCreate, db: Session = Depends(get_db)):
    try:
        res = create_movie_service(movie, db)
        return res
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/{movie_id}", response_model=MovieDetail)
def get_movie(movie_id: int, db: Session = Depends(get_db)):
    res = get_movie_detail_service(movie_id, db)
    return res


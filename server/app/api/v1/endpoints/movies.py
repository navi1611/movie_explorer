from fastapi import APIRouter, Depends
from app.schemas.movie import MovieResponse,MovieDetail
from app.core.database import get_db
from sqlalchemy.orm import Session
from app.services.movies import get_movie_detail_service, get_movies_service

router = APIRouter()

@router.get("/", response_model=list[MovieResponse])
def get_movies(db: Session = Depends(get_db)):
    res = get_movies_service(db)
    return res

@router.get("/{movie_id}", response_model=MovieDetail)
def get_movie(movie_id: int, db: Session = Depends(get_db)):
    res = get_movie_detail_service(movie_id, db)
    return res


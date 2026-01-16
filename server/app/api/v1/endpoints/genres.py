from fastapi import APIRouter, Depends, HTTPException
from app.schemas.genre import GenreResponse, GenreCreate, GenreWithMovies
from app.core.database import get_db
from sqlalchemy.orm import Session
from app.services.genres import (
    get_genres_service,
    get_genre_service,
    get_genre_with_movies_service,
    create_genre_service
)

router = APIRouter()

@router.get("/", response_model=list[GenreResponse])
def get_genres(db: Session = Depends(get_db)):
    res = get_genres_service(db)
    return res

@router.get("/{genre_id}", response_model=GenreResponse)
def get_genre(genre_id: int, db: Session = Depends(get_db)):
    res = get_genre_service(genre_id, db)
    return res

@router.get("/{genre_id}/movies", response_model=GenreWithMovies)
def get_genre_with_movies(genre_id: int, db: Session = Depends(get_db)):
    res = get_genre_with_movies_service(genre_id, db)
    return res

@router.post("/", response_model=GenreResponse, status_code=201)
def create_genre(genre: GenreCreate, db: Session = Depends(get_db)):
    try:
        res = create_genre_service(genre, db)
        return res
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


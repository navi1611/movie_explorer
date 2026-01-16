from fastapi import  HTTPException
from sqlalchemy.orm import Session, joinedload
from typing import Optional
from app.models import Movie, Genre, movies_genres, MovieActor
from app.schemas.movie import MovieCreate

def get_movies_service(db: Session, genre_id: Optional[int] = None):
    query = db.query(Movie)
    
    if genre_id is not None:
        query = query.join(Movie.genres).filter(Genre.id == genre_id).distinct()
    
    movies = query.all()
    return movies

def get_movie_detail_service(movie_id: int, db: Session ):
    movie = (
        db.query(Movie)
        .options(
            joinedload(Movie.director),
            joinedload(Movie.genres),
            joinedload(Movie.movie_actors).joinedload(MovieActor.actor)
        )
        .filter(Movie.id == movie_id)
        .first()
    )

    if not movie:
        raise HTTPException(status_code=404, detail="Movie not found")

    return movie

def create_movie_service(movie_data: MovieCreate, db: Session):
    db_movie = Movie(**movie_data.model_dump())
    db.add(db_movie)
    db.commit()
    db.refresh(db_movie)
    return db_movie


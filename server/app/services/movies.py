from fastapi import  HTTPException
from sqlalchemy.orm import Session, joinedload
from app.models import Movie, Director, Genre, movies_genres, MovieActor, Actor

def get_movies_service(db: Session):
    movies = db.query(Movie).all()
    return movies

def get_movie_detail_service(movie_id: int, db: Session ):
    movie = (
        db.query(Movie)
        .options(
            joinedload(Movie.director),
            joinedload(Movie.genres)
        )
        .filter(Movie.id == movie_id)
        .first()
    )

    if not movie:
        raise HTTPException(status_code=404, detail="Movie not found")

    return movie


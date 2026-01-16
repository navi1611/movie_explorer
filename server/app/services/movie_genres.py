from fastapi import HTTPException
from sqlalchemy.orm import Session, joinedload
from app.models import Movie, Genre, movies_genres

def get_movie_genres_by_movie_service(movie_id: int, db: Session):
    movie = db.query(Movie).filter(Movie.id == movie_id).first()
    if not movie:
        raise HTTPException(status_code=404, detail="Movie not found")
    
    movie_obj = (
        db.query(Movie)
        .options(joinedload(Movie.genres))
        .filter(Movie.id == movie_id)
        .first()
    )
    return movie_obj.genres if movie_obj else []

def get_movies_by_genre_service(genre_id: int, db: Session):
    genre = db.query(Genre).filter(Genre.id == genre_id).first()
    if not genre:
        raise HTTPException(status_code=404, detail="Genre not found")
    
    genre_obj = (
        db.query(Genre)
        .options(joinedload(Genre.movies))
        .filter(Genre.id == genre_id)
        .first()
    )
    return genre_obj.movies if genre_obj else []

def create_movie_genres_bulk_service(creates: list[dict], db: Session):
    created_relationships = []
    
    for create_data in creates:
        movie_id = create_data.get("movie_id")
        genre_id = create_data.get("genre_id")
        
        if not movie_id or not genre_id:
            raise HTTPException(
                status_code=400,
                detail="movie_id and genre_id are required for each create"
            )
        
        movie = db.query(Movie).filter(Movie.id == movie_id).first()
        if not movie:
            raise HTTPException(status_code=404, detail=f"Movie with id={movie_id} not found")
        
        genre = db.query(Genre).filter(Genre.id == genre_id).first()
        if not genre:
            raise HTTPException(status_code=404, detail=f"Genre with id={genre_id} not found")
        
        from sqlalchemy import select
        existing_relationship = (
            db.execute(
                select(movies_genres).where(
                    movies_genres.c.movie_id == movie_id,
                    movies_genres.c.genre_id == genre_id
                )
            ).first()
        )
        
        if existing_relationship:
            raise HTTPException(
                status_code=400,
                detail=f"MovieGenre relationship already exists for movie_id={movie_id} and genre_id={genre_id}"
            )
        
        db.execute(
            movies_genres.insert().values(movie_id=movie_id, genre_id=genre_id)
        )
        created_relationships.append({"movie_id": movie_id, "genre_id": genre_id})
    
    db.commit()
    return created_relationships


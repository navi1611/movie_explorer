from fastapi import HTTPException
from sqlalchemy.orm import Session, joinedload
from app.models import Genre
from app.schemas.genre import GenreCreate

def get_genres_service(db: Session):
    genres = db.query(Genre).all()
    return genres

def get_genre_service(genre_id: int, db: Session):
    genre = db.query(Genre).filter(Genre.id == genre_id).first()
    if not genre:
        raise HTTPException(status_code=404, detail="Genre not found")
    return genre

def get_genre_with_movies_service(genre_id: int, db: Session):
    genre = (
        db.query(Genre)
        .options(joinedload(Genre.movies))
        .filter(Genre.id == genre_id)
        .first()
    )
    if not genre:
        raise HTTPException(status_code=404, detail="Genre not found")
    return genre

def create_genre_service(genre_data: GenreCreate, db: Session):
    existing_genre = db.query(Genre).filter(Genre.name == genre_data.name).first()
    if existing_genre:
        raise HTTPException(status_code=400, detail=f"Genre with name '{genre_data.name}' already exists")
    
    db_genre = Genre(**genre_data.model_dump())
    db.add(db_genre)
    db.commit()
    db.refresh(db_genre)
    return db_genre


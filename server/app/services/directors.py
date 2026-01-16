from fastapi import HTTPException
from sqlalchemy.orm import Session, joinedload
from app.models import Director
from app.schemas.director import DirectorCreate

def get_directors_service(db: Session):
    directors = db.query(Director).all()
    return directors

def get_director_service(director_id: int, db: Session):
    director = (
        db.query(Director)
        .options(joinedload(Director.movies))
        .filter(Director.id == director_id)
        .first()
    )
    if not director:
        raise HTTPException(status_code=404, detail="Director not found")
    return director

def create_director_service(director_data: DirectorCreate, db: Session):
    db_director = Director(**director_data.model_dump())
    db.add(db_director)
    db.commit()
    db.refresh(db_director)
    return db_director


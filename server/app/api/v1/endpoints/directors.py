from fastapi import APIRouter, Depends, HTTPException
from app.schemas.director import DirectorResponse, DirectorCreate, DirectorWithMovies
from app.core.database import get_db
from sqlalchemy.orm import Session
from app.services.directors import (
    get_directors_service,
    get_director_service,
    create_director_service
)

router = APIRouter()

@router.get("/", response_model=list[DirectorResponse])
def get_directors(db: Session = Depends(get_db)):
    res = get_directors_service(db)
    return res

@router.get("/{director_id}", response_model=DirectorWithMovies)
def get_director(director_id: int, db: Session = Depends(get_db)):
    res = get_director_service(director_id, db)
    return res

@router.post("/", response_model=DirectorResponse, status_code=201)
def create_director(director: DirectorCreate, db: Session = Depends(get_db)):
    try:
        res = create_director_service(director, db)
        return res
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


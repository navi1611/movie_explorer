from fastapi import APIRouter, Depends, HTTPException
from app.schemas.movie_actor import (
    MovieActorResponse,
    MovieActorCreate,
    MovieActorWithDetails
)
from app.core.database import get_db
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
from app.services.movie_actors import (
    get_movie_actors_service,
    get_movie_actors_by_movie_service,
    get_movie_actor_service,
    create_movie_actor_service,
    create_movie_actors_bulk_service
)

router = APIRouter()

class MovieActorBulkCreateItem(BaseModel):
    movie_id: int
    actor_id: int
    role: Optional[str] = None

@router.get("/", response_model=list[MovieActorResponse])
def get_movie_actors(db: Session = Depends(get_db)):
    res = get_movie_actors_service(db)
    return res

@router.get("/movie/{movie_id}", response_model=list[MovieActorWithDetails])
def get_movie_actors_by_movie(movie_id: int, db: Session = Depends(get_db)):
    res = get_movie_actors_by_movie_service(movie_id, db)
    return res

@router.get("/movie/{movie_id}/actor/{actor_id}", response_model=MovieActorWithDetails)
def get_movie_actor(
    movie_id: int,
    actor_id: int,
    db: Session = Depends(get_db)
):
    res = get_movie_actor_service(movie_id, actor_id, db)
    return res

@router.post("/", response_model=MovieActorResponse, status_code=201)
def create_movie_actor(
    movie_actor: MovieActorCreate,
    db: Session = Depends(get_db)
):
    try:
        res = create_movie_actor_service(movie_actor, db)
        return res
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/bulk", response_model=list[MovieActorResponse], status_code=201)
def create_movie_actors_bulk(
    creates: List[MovieActorBulkCreateItem],
    db: Session = Depends(get_db)
):
    try:
        creates_dict = [create.model_dump() for create in creates]
        res = create_movie_actors_bulk_service(creates_dict, db)
        return res
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))


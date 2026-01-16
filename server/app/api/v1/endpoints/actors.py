from fastapi import APIRouter, Depends, HTTPException
from app.schemas.actor import ActorResponse, ActorCreate, ActorWithMovies
from app.core.database import get_db
from sqlalchemy.orm import Session
from typing import List
from app.services.actors import (
    get_actors_service,
    get_actor_service,
    create_actor_service,
    create_actors_bulk_service
)

router = APIRouter()

@router.get("/", response_model=list[ActorResponse])
def get_actors(db: Session = Depends(get_db)):
    res = get_actors_service(db)
    return res

@router.get("/{actor_id}", response_model=ActorWithMovies)
def get_actor(actor_id: int, db: Session = Depends(get_db)):
    res = get_actor_service(actor_id, db)
    return res

@router.post("/", response_model=ActorResponse, status_code=201)
def create_actor(actor: ActorCreate, db: Session = Depends(get_db)):
    try:
        res = create_actor_service(actor, db)
        return res
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/bulk", response_model=list[ActorResponse], status_code=201)
def create_actors_bulk(actors: List[ActorCreate], db: Session = Depends(get_db)):
    try:
        res = create_actors_bulk_service(actors, db)
        return res
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))


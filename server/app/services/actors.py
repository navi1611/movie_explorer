from fastapi import HTTPException
from sqlalchemy.orm import Session, joinedload
from app.models import Actor, MovieActor
from app.schemas.actor import ActorCreate

def get_actors_service(db: Session):
    actors = db.query(Actor).all()
    return actors

def get_actor_service(actor_id: int, db: Session):
    actor = (
        db.query(Actor)
        .options(joinedload(Actor.movie_actors).joinedload(MovieActor.movie))
        .filter(Actor.id == actor_id)
        .first()
    )
    if not actor:
        raise HTTPException(status_code=404, detail="Actor not found")
    return actor

def create_actor_service(actor_data: ActorCreate, db: Session):
    db_actor = Actor(**actor_data.model_dump())
    db.add(db_actor)
    db.commit()
    db.refresh(db_actor)
    return db_actor

def create_actors_bulk_service(actors_data: list[ActorCreate], db: Session):
    db_actors = []
    for actor_data in actors_data:
        db_actor = Actor(**actor_data.model_dump())
        db.add(db_actor)
        db_actors.append(db_actor)
    
    db.commit()
    for db_actor in db_actors:
        db.refresh(db_actor)
    return db_actors


from fastapi import HTTPException
from sqlalchemy.orm import Session, joinedload
from app.models import MovieActor, Movie, Actor
from app.schemas.movie_actor import MovieActorCreate

def get_movie_actors_service(db: Session):
    movie_actors = db.query(MovieActor).all()
    return movie_actors

def get_movie_actors_by_movie_service(movie_id: int, db: Session):
    movie = db.query(Movie).filter(Movie.id == movie_id).first()
    if not movie:
        raise HTTPException(status_code=404, detail="Movie not found")
    
    movie_actors = (
        db.query(MovieActor)
        .options(joinedload(MovieActor.actor))
        .filter(MovieActor.movie_id == movie_id)
        .all()
    )
    return movie_actors

def get_movie_actor_service(movie_id: int, actor_id: int, db: Session):
    movie_actor = (
        db.query(MovieActor)
        .options(joinedload(MovieActor.actor))
        .filter(
            MovieActor.movie_id == movie_id,
            MovieActor.actor_id == actor_id
        )
        .first()
    )
    if not movie_actor:
        raise HTTPException(
            status_code=404,
            detail=f"MovieActor relationship not found for movie_id={movie_id} and actor_id={actor_id}"
        )
    return movie_actor

def create_movie_actor_service(movie_actor_data: MovieActorCreate, db: Session):
    existing_movie_actor = db.query(MovieActor).filter(
        MovieActor.movie_id == movie_actor_data.movie_id,
        MovieActor.actor_id == movie_actor_data.actor_id
    ).first()
    
    if existing_movie_actor:
        raise HTTPException(
            status_code=400,
            detail=f"MovieActor relationship already exists for movie_id={movie_actor_data.movie_id} and actor_id={movie_actor_data.actor_id}"
        )
    
    movie = db.query(Movie).filter(Movie.id == movie_actor_data.movie_id).first()
    if not movie:
        raise HTTPException(status_code=404, detail="Movie not found")
    
    actor = db.query(Actor).filter(Actor.id == movie_actor_data.actor_id).first()
    if not actor:
        raise HTTPException(status_code=404, detail="Actor not found")
    
    db_movie_actor = MovieActor(**movie_actor_data.model_dump())
    db.add(db_movie_actor)
    db.commit()
    db.refresh(db_movie_actor)
    return db_movie_actor

def create_movie_actors_bulk_service(creates: list[dict], db: Session):
    from app.models import Movie, Actor
    
    created_movie_actors = []
    
    for create_data in creates:
        movie_id = create_data.get("movie_id")
        actor_id = create_data.get("actor_id")
        role = create_data.get("role")
        
        if not movie_id or not actor_id:
            raise HTTPException(
                status_code=400,
                detail="movie_id and actor_id are required for each create"
            )
        
        existing_movie_actor = db.query(MovieActor).filter(
            MovieActor.movie_id == movie_id,
            MovieActor.actor_id == actor_id
        ).first()
        
        if existing_movie_actor:
            raise HTTPException(
                status_code=400,
                detail=f"MovieActor relationship already exists for movie_id={movie_id} and actor_id={actor_id}"
            )
        
        movie = db.query(Movie).filter(Movie.id == movie_id).first()
        if not movie:
            raise HTTPException(status_code=404, detail=f"Movie with id={movie_id} not found")
        
        actor = db.query(Actor).filter(Actor.id == actor_id).first()
        if not actor:
            raise HTTPException(status_code=404, detail=f"Actor with id={actor_id} not found")
        
        db_movie_actor = MovieActor(
            movie_id=movie_id,
            actor_id=actor_id,
            role=role
        )
        db.add(db_movie_actor)
        created_movie_actors.append(db_movie_actor)
    
    db.commit()
    for movie_actor in created_movie_actors:
        db.refresh(movie_actor)
    
    return created_movie_actors


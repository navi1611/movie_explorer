from pydantic import BaseModel
from datetime import datetime
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:
    from app.schemas.movie_actor import MovieActorResponse


class ActorBase(BaseModel):
    """Actor Base schema"""
    name: str
    birth_year: Optional[int] = None
    nationality: Optional[str] = None


class ActorCreate(ActorBase):
    """creating an Actor"""
    pass


class ActorUpdate(BaseModel):
    """updating an Actor"""
    name: Optional[str] = None
    birth_year: Optional[int] = None
    nationality: Optional[str] = None


class ActorResponse(ActorBase):
    """Actor"""
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


class ActorWithMovies(ActorResponse):
    """ Actor with movie relationships"""
    movie_actors: list["MovieActorResponse"] = []

    class Config:
        from_attributes = True


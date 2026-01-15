from pydantic import BaseModel
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:
    from app.schemas.actor import ActorResponse


class MovieActorBase(BaseModel):
    """Base MovieActor"""
    role: Optional[str] = None


class MovieActorCreate(MovieActorBase):
    """creating a MovieActor relationship"""
    movie_id: int
    actor_id: int


class MovieActorUpdate(BaseModel):
    """updating a MovieActor relationship"""
    role: Optional[str] = None


class MovieActorResponse(MovieActorBase):
    """Response MovieActor"""
    movie_id: int
    actor_id: int

    class Config:
        from_attributes = True


class MovieActorWithDetails(MovieActorResponse):
    """Response MovieActor with nested actor details"""
    actor: Optional["ActorResponse"] = None

    class Config:
        from_attributes = True


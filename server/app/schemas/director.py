from pydantic import BaseModel
from datetime import datetime
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:
    from app.schemas.movie import MovieResponse


class DirectorBase(BaseModel):
    """Base Director"""
    name: str
    birth_year: Optional[int] = None
    nationality: Optional[str] = None


class DirectorCreate(DirectorBase):
    """creating a Director"""
    pass


class DirectorUpdate(BaseModel):
    """updating a Director"""
    name: Optional[str] = None
    birth_year: Optional[int] = None
    nationality: Optional[str] = None


class DirectorResponse(DirectorBase):
    """ Director"""
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


class DirectorWithMovies(DirectorResponse):
    """ Director with movies"""
    movies: list["MovieResponse"] = []

    class Config:
        from_attributes = True


from pydantic import BaseModel
from datetime import datetime
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:
    from app.schemas.movie import MovieResponse


class GenreBase(BaseModel):
    """Base Genre"""
    name: str


class GenreCreate(GenreBase):
    """creating a Genre"""
    pass


class GenreUpdate(BaseModel):
    """updating a Genre"""
    name: Optional[str] = None


class GenreResponse(GenreBase):
    """Genre"""
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


class GenreWithMovies(GenreResponse):
    """Genre with movies"""
    movies: list["MovieResponse"] = []

    class Config:
        from_attributes = True


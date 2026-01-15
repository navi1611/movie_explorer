from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List, TYPE_CHECKING
from decimal import Decimal

if TYPE_CHECKING:
    from app.schemas.director import DirectorResponse
    from app.schemas.genre import GenreResponse
    from app.schemas.movie_actor import MovieActorWithDetails


class MovieBase(BaseModel):
    """Base Movie"""
    title: str
    release_year: int
    duration_minutes: Optional[int] = None
    director_id: Optional[int] = None
    rating: Optional[Decimal] = None
    description: Optional[str] = None
    poster_url: Optional[str] = None


class MovieCreate(MovieBase):
    """creating a Movie"""
    pass


class MovieUpdate(BaseModel):
    """updating a Movie"""
    title: Optional[str] = None
    release_year: Optional[int] = None
    duration_minutes: Optional[int] = None
    director_id: Optional[int] = None
    rating: Optional[Decimal] = None
    description: Optional[str] = None
    poster_url: Optional[str] = None


class MovieResponse(MovieBase):
    """Response Movie"""
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class MovieWithDirector(MovieResponse):
    """Response Movie with director information"""
    director: Optional["DirectorResponse"] = None

    class Config:
        from_attributes = True


class MovieWithGenres(MovieResponse):
    """Response Movie with genres"""
    genres: List["GenreResponse"] = []

    class Config:
        from_attributes = True


class MovieWithActors(MovieResponse):
    """Response Movie with actors"""
    movie_actors: List["MovieActorWithDetails"] = []

    class Config:
        from_attributes = True


class MovieDetail(MovieResponse):
    """ Movie with all relationships"""
    director: Optional["DirectorResponse"] = None
    genres: List["GenreResponse"] = []
    movie_actors: List["MovieActorWithDetails"] = []

    class Config:
        from_attributes = True


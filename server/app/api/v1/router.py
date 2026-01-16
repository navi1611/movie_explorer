from fastapi import APIRouter
from app.api.v1.endpoints import movies, actors, directors, genres, movie_actors, movie_genres

router = APIRouter()
router.include_router(
    movies.router,
    prefix="/movies",
    tags=["movies"]
)
router.include_router(
    actors.router,
    prefix="/actors",
    tags=["actors"]
)
router.include_router(
    directors.router,
    prefix="/directors",
    tags=["directors"]
)
router.include_router(
    genres.router,
    prefix="/genres",
    tags=["genres"]
)
router.include_router(
    movie_actors.router,
    prefix="/movie-actors",
    tags=["movie-actors"]
)
router.include_router(
    movie_genres.router,
    prefix="/movie-genres",
    tags=["movie-genres"]
)

from app.schemas.actor import (
    ActorBase,
    ActorCreate,
    ActorUpdate,
    ActorResponse,
    ActorWithMovies,
)
from app.schemas.director import (
    DirectorBase,
    DirectorCreate,
    DirectorUpdate,
    DirectorResponse,
    DirectorWithMovies,
)
from app.schemas.genre import (
    GenreBase,
    GenreCreate,
    GenreUpdate,
    GenreResponse,
    GenreWithMovies,
)
from app.schemas.movie import (
    MovieBase,
    MovieCreate,
    MovieUpdate,
    MovieResponse,
    MovieWithDirector,
    MovieWithGenres,
    MovieWithActors,
    MovieDetail,
)
from app.schemas.movie_actor import (
    MovieActorBase,
    MovieActorCreate,
    MovieActorUpdate,
    MovieActorResponse,
    MovieActorWithDetails,
    MovieActorWithMovie,
)

MovieActorWithDetails.model_rebuild()
MovieWithDirector.model_rebuild()
MovieWithGenres.model_rebuild()
MovieWithActors.model_rebuild()
MovieDetail.model_rebuild()
MovieActorWithMovie.model_rebuild()
ActorWithMovies.model_rebuild()
DirectorWithMovies.model_rebuild()
GenreWithMovies.model_rebuild()

__all__ = [
    # Actor
    "ActorBase",
    "ActorCreate",
    "ActorUpdate",
    "ActorResponse",
    "ActorWithMovies",
    # Director
    "DirectorBase",
    "DirectorCreate",
    "DirectorUpdate",
    "DirectorResponse",
    "DirectorWithMovies",
    # Genre
    "GenreBase",
    "GenreCreate",
    "GenreUpdate",
    "GenreResponse",
    "GenreWithMovies",
    # Movie
    "MovieBase",
    "MovieCreate",
    "MovieUpdate",
    "MovieResponse",
    "MovieWithDirector",
    "MovieWithGenres",
    "MovieWithActors",
    "MovieDetail",
    # MovieActor
    "MovieActorBase",
    "MovieActorCreate",
    "MovieActorUpdate",
    "MovieActorResponse",
    "MovieActorWithDetails",
    "MovieActorWithMovie",
]


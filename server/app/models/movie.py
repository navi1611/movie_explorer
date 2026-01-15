from sqlalchemy import Column, Integer, String, DECIMAL, VARCHAR,  TIMESTAMP, ForeignKey, CheckConstraint, func
from sqlalchemy.orm import relationship
from app.models.movie_generes import movies_genres
from app.core.database import Base

class Movie(Base):
    __tablename__ = "movies"

    __table_args__ = (
        CheckConstraint("rating >= 0 AND rating <= 10", name="rating_range"),
    )


    id = Column(Integer, primary_key=True, index=True)
    title = Column(VARCHAR(200), nullable=False)
    release_year = Column(Integer, nullable=False)
    duration_minutes = Column(Integer)
    director_id = Column(Integer, ForeignKey("directors.id"))
    rating = Column(DECIMAL(3,1))
    description = Column(String)
    poster_url = Column(VARCHAR(500))
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=func.now())
    updated_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=func.now(), onupdate=func.now)

    genres = relationship(
        "Genre",
        secondary=movies_genres,
        back_populates="movies",
        passive_deletes=True,
    )

    # actors = relationship(
    #     "MovieActor",
    #     back_populates="movie",
    #     cascade="all, delete-orphan",
    # )

    movie_actors = relationship(
        "MovieActor",
        back_populates="movie",
        cascade="all, delete-orphan"
    )

    director = relationship(
        "Director",
        back_populates="movies"
    )

    # actors = relationship(
    #     "Actor",
    #     secondary="movie_actors",
    #     back_populates="movies"
    # )
from sqlalchemy import Column, Integer, String, DECIMAL, VARCHAR,  TIMESTAMP, ForeignKey, CheckConstraint, func
from sqlalchemy.orm import  relationship
from app.core.database import Base
from app.models.movie_actors import MovieActor


class Actor(Base):
    __tablename__ = "actors"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(VARCHAR(100), nullable=False)
    birth_year = Column(Integer)
    nationality = Column(VARCHAR(50))
    created_at = Column(
        TIMESTAMP(timezone=False),
        server_default=func.now()
    )

    # movies = relationship(
    #     "MovieActor",
    #     back_populates="actor",
    #     cascade="all, delete-orphan",
    # )

    # movies = relationship(
    #     "Movie",
    #     secondary="movie_actors",
    #     back_populates="actors"
    # )


    movie_actors = relationship(
        "MovieActor",
        back_populates="actor",
        cascade="all, delete-orphan"
    )

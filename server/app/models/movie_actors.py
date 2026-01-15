from sqlalchemy import Column, Integer, ForeignKey, VARCHAR
from sqlalchemy.orm import relationship
from app.core.database import Base

class MovieActor(Base):
    __tablename__ = "movies_actors"

    movie_id = Column(
        Integer,
        ForeignKey("movies.id", ondelete="CASCADE"),
        primary_key=True,
    )
    actor_id = Column(
        Integer,
        ForeignKey("actors.id", ondelete="CASCADE"),
        primary_key=True,
    )

    role = Column(VARCHAR(100))

    movie = relationship("Movie", back_populates="movie_actors")
    actor = relationship("Actor", back_populates="movie_actors")

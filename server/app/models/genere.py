from sqlalchemy import Column, Integer, String, DECIMAL, VARCHAR,  TIMESTAMP, ForeignKey, CheckConstraint, func
from sqlalchemy.orm import  relationship
from app.models.movie_generes import movies_genres
from app.core.database import Base


class Genre(Base):
    __tablename__ = "genres"


    id = Column(Integer, primary_key=True, index=True)
    name = Column(VARCHAR(50), unique=True, nullable=False)
    created_at = Column(
        TIMESTAMP(timezone=False),
        server_default=func.now()
    )

    movies = relationship(
        "Movie",
        secondary=movies_genres,
        back_populates="genres",
        passive_deletes=True,
    )

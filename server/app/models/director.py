from sqlalchemy import Column, Integer, String, DECIMAL, VARCHAR,  TIMESTAMP, ForeignKey, CheckConstraint, func
from sqlalchemy.orm import  relationship
from app.core.database import Base



class Director(Base):
    __tablename__ = "directors"


    id = Column(Integer, primary_key=True, index=True)
    name = Column(VARCHAR(100), nullable=False)
    birth_year = Column(Integer)
    nationality = Column(VARCHAR(50))
    created_at = Column(
        TIMESTAMP(timezone=False),
        server_default=func.now()
    )

    movies = relationship(
        "Movie",
        back_populates="director",
    )


# from sqlalchemy import create_engine, event
# from sqlalchemy.engine import Engine
# from typing import Optional
# from contextlib import contextmanager
# from sqlalchemy.orm import Session

# # Replace with your PostgreSQL connection string
# # DATABASE_URL =  "postgresql://postgres:4921dda4-989e-41dd-9d8c-03b927950352@db.yurabqxnonnqstfufwxt.supabase.co:5432/postgres"
# DATABASE_URL = (
#     "postgresql+psycopg2://postgres:4921dda4-989e-41dd-9d8c-03b927950352"
#     "@aws-0-ap-south-1.pooler.supabase.com:6543/postgres"
#     "?sslmode=require"
# )

# engine = create_engine(
#     DATABASE_URL,
#     echo=True,  # Set to False in production
# )

# def create_db_and_tables():
#     """Create all tables from SQLModel models"""


# def get_session() -> Session:
#     """Dependency to get DB session"""
#     with Session(engine) as session:
#         yield session

# @contextmanager
# def get_db_session():
#     """Context manager for database sessions"""
#     session = Session(engine)
#     try:
#         yield session
#         session.commit()
#     except Exception:
#         session.rollback()
#         raise
#     finally:
#         session.close()


# # Usage examples:
# #
# # 1. One-off session:
# # with get_db_session() as session:
# #     result = session.exec(select(Movie)).all()
# #
# # 2. FastAPI dependency:
# # @app.get("/movies")
# # async def get_movies(session: Session = Depends(get_session)):
# #     return session.exec(select(Movie)).all()
# #
# # 3. Async context manager:
# # async with get_db_session() as session:
# #     result = await session.exec(select(Movie)).all()


from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = "postgresql+psycopg2://postgres:4921dda4-989e-41dd-9d8c-03b927950352@db.yurabqxnonngstfufwxt.supabase.co:5432/postgres"

engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
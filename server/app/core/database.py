
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql+psycopg2://postgres:4921dda4-989e-41dd-9d8c-03b927950352@db.yurabqxnonngstfufwxt.supabase.co:5432/postgres"
)

# DATABASE_URL = "postgresql+psycopg2://postgres:4921dda4-989e-41dd-9d8c-03b927950352@db.yurabqxnonngstfufwxt.supabase.co:5432/postgres"


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
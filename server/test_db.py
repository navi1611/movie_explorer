# from app.core.database import engine
# from sqlalchemy import text

# try:
#     with engine.connect() as connection:
#         result = connection.execute(text("SELECT 1"))
#         print("✅ Database connected successfully:", result.scalar())
# except Exception as e:
#     print("❌ Database connection failed")
#     print(e)


from sqlalchemy import create_engine

DATABASE_URL = "postgresql+psycopg2://postgres:4921dda4-989e-41dd-9d8c-03b927950352@db.yurabqxnonngstfufwxt.supabase.co:5432/postgres"

engine = create_engine(DATABASE_URL)

with engine.connect() as conn:
    print("✅ Connected successfully")

import asyncpg
import os
from dotenv import load_dotenv
from quart import current_app

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")


async def get_db():
    return await asyncpg.create_pool(
        DATABASE_URL,
        min_size=50,  # Минимальное количество соединений
        max_size=250,  # Максимальное количество соединений
        max_queries=10000,  # Максимальное количество запросов на соединение
        max_inactive_connection_lifetime=600  # Время жизни неактивных соединений (сек)
    )

async def get_db_connection():
    """Get a connection from the global db pool."""
    return await current_app.database.acquire()

async def release_db_connection(connection):
    """Release a connection back to the pool."""
    await current_app.database.release(connection)


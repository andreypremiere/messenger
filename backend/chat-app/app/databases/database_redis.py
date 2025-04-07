import os
from dotenv import load_dotenv
from redis.asyncio import Redis
from quart import current_app

load_dotenv()

REDIS_HOST = os.getenv("REDIS_HOST", "localhost")
REDIS_PORT = int(os.getenv("REDIS_PORT", 6378))


def get_connection_redis():
    redis_client = Redis(host=REDIS_HOST, port=REDIS_PORT, decode_responses=True)
    return redis_client


def get_redis_client():
    return current_app.redis_client
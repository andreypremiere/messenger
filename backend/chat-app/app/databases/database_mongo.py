import os
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
from quart import current_app

load_dotenv()

MONGO_HOST = os.getenv("MONGO_HOST", "localhost")
MONGO_PORT = int(os.getenv("MONGO_PORT", 27018))


async def get_connection_mongo():
    connection_string = f"mongodb://{MONGO_HOST}:{MONGO_PORT}"
    mongo_client = AsyncIOMotorClient(connection_string)
    return mongo_client['chat_app']


def get_mongo():
    return current_app.mongo
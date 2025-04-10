# from datetime import datetime
from app.databases.database_mongo import get_mongo


async def create_chat(participants, datetime, chat_type='private', admin=None, name=None):
    db = get_mongo()['chats']

    # Создаем новый чат
    chat_data = {
        "participants": participants,
        "type": chat_type,
        "admin": admin,
        "name": name,
        "lastMessage": None,
        "createdAt": datetime,
        "updatedAt": datetime
    }

    result = await db.insert_one(chat_data)

    return {"chat_id": str(result.inserted_id)}


async def get_chats_by_user(user_id):
    db = get_mongo()['chats']

    cursor = db.find(
        {"participants": user_id}
    ).sort("updatedAt", -1)

    chats = await cursor.to_list(length=None)

    return {"chats": chats}


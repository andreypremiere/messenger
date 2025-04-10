from datetime import datetime
from app.repositories.messages_repo import (
    add_message as repo_add_message,
    get_batch_messages as repo_get_batch_messages,
    get_all_messages as repo_get_all_messages
)


# Сервис добавления сообщения
async def add_message_service(data):
    chat_id = data.get("chat_id")
    sender = data.get("sender")
    message = data.get("message")
    timestamp = data.get("timestamp", datetime.utcnow())  # если не передали, установим текущую дату

    return await repo_add_message(chat_id, sender, message, timestamp)


# Сервис для получения батча сообщений
async def get_batch_messages_service(data):
    chat_id = data.get("chat_id")
    group = data.get("group", 0)

    return await repo_get_batch_messages(chat_id, group)


# Сервис для получения всех сообщений чата
async def get_all_messages_service(data):
    chat_id = data.get("chat_id")
    return await repo_get_all_messages(chat_id)

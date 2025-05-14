from datetime import datetime
from app.repositories.messages_repo import (
    add_message as repo_add_message,
    get_batch_messages as repo_get_batch_messages,
    get_all_messages as repo_get_all_messages, repo_add_message_ml
)
from bson import ObjectId
from datetime import datetime

# Сервис добавления сообщения
from app.utils.serialize_document import serialize_document


async def add_message_service(data):
    chat_id = data.get("chat_id")
    sender = data.get("sender")
    message = data.get("message")
    timestamp = data.get("timestamp", datetime.utcnow())  # если не передали, установим текущую дату

    result = await repo_add_message(chat_id, sender, message, timestamp)
    print(result)
    result['result'] = serialize_document(result['result'])

    # Возвращается документ целиком
    return result


# Сервис для получения батча сообщений
async def get_batch_messages_service(data):
    chat_id = data.get("chat_id")
    group = data.get("group", 0)

    result = await repo_get_batch_messages(chat_id, group)

    result['result'] = [serialize_document(i) for i in result['result']]

    return result


# Сервис для получения всех сообщений чата
async def get_all_messages_service(data):
    chat_id = data.get("chat_id")
    result = await repo_get_all_messages(chat_id)
    result['result'] = [serialize_document(i) for i in result['result']]
    return result


async def add_message_ml_service(data):
    chat_id = data.get("chat_id")
    sender = data.get("sender")
    file_name = data.get("file_name")
    data_file = data.get('data')
    timestamp = data.get("timestamp", datetime.utcnow())  # если не передали, установим текущую дату

    result = await repo_add_message_ml(chat_id, sender, file_name, data_file, timestamp)

    def serialize_document(doc):
        """
        Преобразует все типы данных документа MongoDB в стандартные Python типы данных.
        """

        if isinstance(doc, dict):
            # Преобразуем все ключи и значения в стандартные типы
            return {key: serialize_document(value) for key, value in doc.items()}
        elif isinstance(doc, ObjectId):
            # Преобразуем ObjectId в строку
            return str(doc)
        elif isinstance(doc, datetime):
            # Преобразуем datetime в строку ISO
            return doc.isoformat()
        elif isinstance(doc, list):
            # Преобразуем все элементы в списке
            return [serialize_document(item) for item in doc]
        else:
            # Прочие типы данных (например, строки, числа)
            return doc
    # print(result)
    # result['result'] = serialize_document(result['result'])

    # Возвращается документ целиком
    return serialize_document(result)

async def get_all_messages_ml_service(data):
    def serialize_document(doc):
        """
        Преобразует все типы данных документа MongoDB в стандартные Python типы данных.
        """

        if isinstance(doc, dict):
            # Преобразуем все ключи и значения в стандартные типы
            return {key: serialize_document(value) for key, value in doc.items()}
        elif isinstance(doc, ObjectId):
            # Преобразуем ObjectId в строку
            return str(doc)
        elif isinstance(doc, datetime):
            # Преобразуем datetime в строку ISO
            return doc.isoformat()
        elif isinstance(doc, list):
            # Преобразуем все элементы в списке
            return [serialize_document(item) for item in doc]
        else:
            # Прочие типы данных (например, строки, числа)
            return doc

    chat_id = data.get("chat_id")
    result = await repo_get_all_messages(chat_id)
    result['result'] = [serialize_document(i) for i in result['result']]
    return result['result']

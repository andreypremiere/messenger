from datetime import datetime
from app.repositories.chats_repo import create_chat, get_chats_by_user, get_chat_by_chat_id
from app.utils.serialize_document import serialize_document


async def create_chat_service(data):
    # Извлекаем параметры из data
    participants = data.get("participants")
    chat_type = data.get("chat_type", "private")
    name = data.get("name", None)
    admin = data.get("admin", None)
    dt = datetime.utcnow()

    # Вызов репозитория для создания чата
    result = await create_chat(participants, datetime=dt, chat_type=chat_type, name=name, admin=admin)

    if result.get("chat_id"):
        return {"result": result}
    else:
        return {"error": "Ошибка при создании чата."}


async def get_user_chats_service(data):
    # Извлекаем user_id из data
    user_id = data.get("user_id")

    if not user_id:
        return {"error": "user_id не был предоставлен."}

    # Вызов репозитория для получения чатов пользователя
    result = await get_chats_by_user(user_id)

    result['chats'] = [serialize_document(i) for i in result['chats']]

    if result.get("chats"):
        return {"result": result['chats']}
    else:
        return {"error": "Чаты не найдены."}


async def get_chat_by_chat_id_service(data):
    chat_id = data.get('chat_id')
    print(chat_id)
    result = await get_chat_by_chat_id(chat_id)
    print('Сервис получаения чата по id', result)

    result = serialize_document(result)

    return {'result': result}

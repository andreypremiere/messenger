from quart import websocket, Blueprint
import json
from datetime import datetime
from app.databases.database_mongo import get_mongo
from app.databases.database_redis import get_connection_redis
import asyncio
from app.services.chats_service import get_user_chats_service, get_chat_by_chat_id_service
from app.services.messages_service import get_all_messages_service, add_message_service

ws_bp = Blueprint("ws", __name__)

# Временное хранилище WebSocket соединений (только для текущего процесса)
active_websockets = {}  # user_id: websocket


@ws_bp.websocket("/ws")
# @jwt_required()
async def chat_socket():
    # получаем user_id из строки
    user_id = websocket.args.get("user_id")
    if not user_id:
        await websocket.close()
        return

    ws = websocket
    active_websockets[user_id] = ws

    redis = get_connection_redis()
    pubsub = redis.pubsub()
    await pubsub.subscribe(f"user:{user_id}")

    print(f"Пользователь {user_id} подключился к WebSocket.")

    async def redis_listener():
        async for message in pubsub.listen():
            if message["type"] == "message":
                raw_data = message["data"]

                if isinstance(raw_data, bytes):
                    raw_data = raw_data.decode('utf-8')  # Преобразуем байты в строку
                try:
                    parsed_data = json.loads(raw_data)  # Парсим JSON-строку в словарь
                    sending_message = {'type': 'get_message', 'data': parsed_data}
                    await ws.send_json(sending_message)
                except Exception as ex:
                    print(f"Ошибка при отправке сообщения пользователю {user_id}", ex)
                    break

    listener_task = asyncio.create_task(redis_listener())

    try:
        while True:
            data = await ws.receive_json()
            print('data', data)
            msg_type = data.get("type")

            # Получить список чатов по user_id
            if msg_type == "get_chats":
                print('Принят запрос на получение списка чатов\n', data)
                result = await get_user_chats_service(data)
                await ws.send_json({"type": msg_type, "data": result['result']})

            # получение списка сообщений чата
            elif msg_type == "get_messages":
                result = await get_all_messages_service(data)
                print('Результат перед отправкой', result)
                await ws.send_json({'type': msg_type, 'data': result['result']})

            # отправка сообщения
            elif msg_type == 'send_message':
                data = data.get('data')
                # sender = data.get('sender')
                result = await add_message_service(data)
                messsage = result.get('result')
                result_chat_response = await get_chat_by_chat_id_service(data)
                result_chat = result_chat_response['result']
                print(result_chat)
                chat_participants = result_chat.get('participants')  # список участников

                for pr in chat_participants:
                    await redis.publish(f"user:{pr}", json.dumps({
                        "type": "message",
                        "data": messsage
                    }))

    except Exception as e:
        print(f"WebSocket ошибка: {e}")

    finally:
        listener_task.cancel()
        await pubsub.unsubscribe(f"user:{user_id}")
        active_websockets.pop(user_id, None)
        print(f"Пользователь {user_id} отключился от WebSocket.")

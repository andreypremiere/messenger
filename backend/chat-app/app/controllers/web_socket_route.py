from quart import websocket, Blueprint
import json
from datetime import datetime
from app.databases.database_mongo import get_mongo
from app.databases.database_redis import get_connection_redis
import asyncio

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

    # mongo = get_mongo()
    # redis = get_connection_redis()
    # pubsub = redis.pubsub()
    # await pubsub.subscribe(f"user:{user_id}")

    print(f"Пользователь {user_id} подключился к WebSocket.")

    try:
        while True:
            data = await ws.receive_json()
            print('data', data)
            msg_type = data.get("type")

            await ws.send_json({"type": msg_type, "message": 'Тоже привет'})
            # if msg_type == "get_chats":
            #     chats_cursor = mongo.chats.find({"participants": user_id})
            #     chats = []
            #     async for chat in chats_cursor:
            #         chats.append({
            #             "chatId": str(chat["_id"]),
            #             "name": chat.get("name", ""),
            #             "lastMessage": chat.get("lastMessage", "")
            #         })
            #     await ws.send_json({"type": "chat_list", "chats": chats})
            #
            # elif msg_type == "get_messages":
            #     chat_id = data["chatId"]
            #     cursor = mongo.messages.find({"chatId": chat_id}).sort("timestamp", 1)
            #     messages = []
            #     async for msg in cursor:
            #         messages.append({
            #             "sender": msg["sender"],
            #             "content": msg["content"],
            #             "timestamp": msg["timestamp"]
            #         })
            #     await ws.send_json({
            #         "type": "message_history",
            #         "chatId": chat_id,
            #         "messages": messages
            #     })
            #
            # elif msg_type == "send_message":
            #     chat_id = data["chatId"]
            #     content = data["content"]
            #
            #     message = {
            #         "chatId": chat_id,
            #         "sender": user_id,
            #         "content": content,
            #         "timestamp": datetime.utcnow().isoformat()
            #     }
            #
            #     await mongo.messages.insert_one(message)
            #
            #     chat = await mongo.chats.find_one({"_id": chat_id})
            #     participants = chat["participants"]
            #
            #     for uid in participants:
            #         if uid != user_id:
            #             await redis.publish(f"user:{uid}", json.dumps({
            #                 "type": "new_message",
            #                 **message
            #             }))

    except Exception as e:
        print(f"WebSocket ошибка: {e}")

    finally:
        # listener_task.cancel()
        # await pubsub.unsubscribe(f"user:{user_id}")
        active_websockets.pop(user_id, None)
        print(f"Пользователь {user_id} отключился от WebSocket.")

from datetime import datetime

from app.databases.database_mongo import get_mongo


async def add_message(chat_id, sender, message, timestamp, status=None):
    db = get_mongo()['messages']

    if status is None:
        status = 'delivered'

    # вернет id нового документа
    result = await db.insert_one({'chat_id': chat_id,
                                  'sender': sender,
                                  'content': None,
                                  'message': message,
                                  'timestamp': timestamp,
                                  'status': status})

    if result.inserted_id:
        inserted_doc = await db.find_one({'_id': result.inserted_id})
        print('Вернулся документ: ', inserted_doc)
        return {'result': inserted_doc}


async def get_batch_messages(chat_id, group):
    limit = 100
    db = get_mongo()['messages']

    cursor = db.messages.find(
        {"chat_id": chat_id}
    ).sort("timestamp", -1).skip(group*100).limit(limit)

    messages = await cursor.to_list(length=limit)

    return {'result': messages}


async def get_all_messages(chat_id):
    db = get_mongo()['messages']

    cursor = db.find(
        {"chat_id": chat_id}
    ).sort("timestamp", 1)

    messages = await cursor.to_list(length=None)

    # print(messages)

    return {'result': messages}






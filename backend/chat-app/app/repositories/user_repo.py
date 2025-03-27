from app.database import get_db_connection, release_db_connection


async def get_user_by_nickname_or_email(nickname: str = None, email: str = None):
    """Получить пользователя по email или телефону."""

    # В сервисах предварительно выполнить проверку шаблона на номер телефона и допустимую длину nickname (создать функции utils)

    db = await get_db_connection()
    query = "SELECT * FROM users WHERE nickname = $1 OR email = $2"

    result = await db.fetchrow(query, nickname, email)

    await release_db_connection(db)

    return result


async def register_user_repo(nickname: str = None, number_phone: str = None, email: str = None):
    if nickname is None or number_phone is None or email is None:
        return None

    db = await get_db_connection()

    # Создание запроса для вставки нового пользователя
    query = """
    INSERT INTO users (nickname, number_phone, email)
    VALUES ($1, $2, $3)
    RETURNING user_id, nickname, number_phone, email
    """

    # Выполнение запроса с передачей значений для вставки
    result = await db.fetchrow(query, nickname, number_phone, email)

    await release_db_connection(db)

    if result is not None:
        return {
            "user_id": result["user_id"],
            "nickname": result["nickname"],
            "number_phone": result["number_phone"],
            "email": result['email']
        }
    else:
        return None


async def get_user_by_id(user_id):
    db = await get_db_connection()
    query = "SELECT * FROM users WHERE user_id = $1"

    result = await db.fetchrow(query, user_id)

    await release_db_connection(db)

    return result

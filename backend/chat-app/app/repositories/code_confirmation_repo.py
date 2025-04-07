from app.databases.database_postgresql import get_db_connection, release_db_connection
from app.databases.database_redis import get_redis_client

async def save_email_verification_code(user_id, email_code=None):
    """Сохранить код подтверждения в БД."""
    db = await get_db_connection()
    query = """
    INSERT INTO code_confirmation (user_id, email_code, expire_time)
    VALUES ($1, $2, CURRENT_TIMESTAMP + INTERVAL '2 minutes')
    RETURNING code_id
    """
    result = await db.fetchval(query, user_id, email_code)

    await release_db_connection(db)

    if result is not None:
        return result
    else:
        return None


# async def get_verification_code(user_id):
#     """Получить код подтверждения по user_id."""
#     db = await get_db_connection()
#     query = "SELECT * FROM code_confirmation WHERE user_id = $1"
#
#     result = await db.fetchrow(query, user_id)
#
#     await release_db_connection(db)
#
#     return result


async def get_verification_code(user_id):
    """Получить код подтверждения по user_id."""
    r = get_redis_client()

    code = await r.get(user_id)

    return code

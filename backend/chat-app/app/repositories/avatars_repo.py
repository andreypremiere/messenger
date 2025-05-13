from app.databases.database_postgresql import get_db_connection, release_db_connection


async def get_main_avatars_by_user_ids(user_ids: list) -> dict:
    query = """
    SELECT user_id, 
           jsonb_path_query_first(url_avatars, '$[*] ? (@.isMain == true)') AS main_avatar
    FROM users
    WHERE user_id = ANY($1)
    """
    db = await get_db_connection()

    rows = await db.fetch(query, user_ids)

    await release_db_connection(db)

    result = {}

    for row in rows:
        print(row)
        result[str(row['user_id'])] = row['main_avatar']

    return result


async def add_avatar_for_user(user_id: str, avatar: dict) -> None:
    query = """
    UPDATE users
    SET avatars = COALESCE(avatars, '[]'::jsonb) || $2::jsonb
    WHERE id = $1
    """

    db = get_db_connection()
    await db.execute(query, user_id, avatar)
    await release_db_connection(db)

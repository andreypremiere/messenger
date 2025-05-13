from app.repositories.avatars_repo import get_main_avatars_by_user_ids


async def get_main_avatars_by_user_ids_service(list_ids):
    # list_ids = data.get('user_ids')
    # print('list_ids', list_ids)

    if not list_ids:
        return None

    result = await get_main_avatars_by_user_ids(list_ids)
    print('result', result)

    return result


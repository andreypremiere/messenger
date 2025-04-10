from app.repositories.code_confirmation_repo import save_email_verification_code
from app.repositories.user_repo import get_user_by_nickname_or_email_or_numberphone, register_user_repo
from app.utils.checking_string import is_valid_phone, is_valid_email, is_valid_nickname
from app.utils.confirmation_code import generate_code
from app.utils.formating_string import clean_phone_number
from app.utils.sending_code import send_email
from app.databases.database_redis import get_redis_client


async def register_user(data):
    number_phone = data.get("numberPhone")
    nickname = data.get("nickname")
    email = data.get("email")

    number_phone = clean_phone_number(number_phone)

    if not is_valid_phone(number_phone) or not is_valid_email(email):
        return {'error': "Uncorrect number phone or email format"}

    if not is_valid_nickname(nickname):
        return {"error": "Uncorrect nickname format"}

    user = await get_user_by_nickname_or_email_or_numberphone(email=email, nickname=nickname, number_phone=number_phone)
    print(user)

    if user is not None:
        return {"error": "User already exists"}
    else:
        user = await register_user_repo(nickname=nickname, number_phone=number_phone, email=email)

    if user is None:
        return {"error": "Error of creating user in database"}

    code = generate_code()

    # Сохраняет код в базе данных postgres
    # save_result = await save_email_verification_code(user["user_id"], email_code=code)
    r = get_redis_client()
    print(r)
    await r.set(f'code:{user["user_id"]}', f"{code}", ex=200)

    # if save_result is None:
    #     return {'error': "Code confirmation wasn't saved in database"}

    # Отправка кода на почту, раскомментировать
    # send_email(email, code)

    return {"result": user["user_id"]}


async def perform_login_service(data):
    user = await get_user_by_nickname_or_email_or_numberphone(email=data['email'], nickname=data['nickname'],
                                                              number_phone=data['numberPhone'])

    if user is None:
        return {"error": "User not found"}

    generated_code = generate_code()

    # save_result = await save_email_verification_code(user["user_id"], email_code=generated_code)

    # if save_result is None:
    #     return {'error': "Code confirmation wasn't saved in database"}

    # send_email(user["email"], generated_code)

    r = get_redis_client()
    print(r)
    await r.set(f'code:{user["user_id"]}', f"{generated_code}", ex=200)

    return {"result": f"Code was sended to {user['email']}", 'user_id': user['user_id']}






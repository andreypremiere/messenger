from app.repositories.code_confirmation_repo import save_email_verification_code
from app.repositories.user_repo import get_user_by_nickname_or_email, register_user_repo
from app.utils.checking_string import is_valid_phone, is_valid_email, is_valid_nickname
from app.utils.confirmation_code import generate_code
from app.utils.formating_string import clean_phone_number
from app.utils.sending_code import send_email


async def register_user(number_phone=None, email=None, nickname=None):
    number_phone = clean_phone_number(number_phone)

    if not is_valid_phone(number_phone) or not is_valid_email(email):
        return {'error': "Uncorrect number phone or email format"}

    if not is_valid_nickname(nickname):
        return {"error": "Uncorrect nickname format"}

    user = await get_user_by_nickname_or_email(email=email, nickname=nickname)
    print(user)

    if user is not None:
        return {"error": "User already exists"}
    else:
        user = await register_user_repo(nickname=nickname, number_phone=number_phone, email=email)

    if user is None:
        return {"error": "Error of creating user in database"}

    code = generate_code()

    save_result = await save_email_verification_code(user["user_id"], email_code=code)

    if save_result is None:
        return {'error': "Code confirmation wasn't saved in database"}

    send_email(email, code)

    return {"result": user["user_id"]}


async def perform_login_service(data):
    if 'email' in data or 'nickname' in data:
        user = await get_user_by_nickname_or_email(email=data['email'], nickname=data['nickname'])

        if user is None:
            return {"error": "User not found"}

        generated_code = generate_code()

        save_result = await save_email_verification_code(user["user_id"], email_code=generated_code)

        if save_result is None:
            return {'error': "Code confirmation wasn't saved in database"}

        send_email(user["email"], generated_code)

        return {"result": f"Code was sended to {user['email']}"}

    if 'number_phone' in data:
        pass






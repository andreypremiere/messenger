from app.repositories.code_confirmation_repo import get_verification_code
from app.repositories.user_repo import get_user_by_id
from app.utils.jwt_provider import create_jwt_token
from app.utils.sending_code import send_email


async def verify_code(data):
    user_id = data.get("userId")
    code = data.get("codeConfirmation")

    if user_id is None or code is None:
        return {'error': 'Invalid input data (user_id or code)'}

    stored_code = await get_verification_code(user_id)

    if stored_code is None:
        return {"error": "Invalid or expired code"}

    if code == stored_code:
        token = create_jwt_token(user_id)
        return {"token": token}

    return {"error": "Invalid code"}


async def repeat_confirm_code(user_id):
    stored_code = await get_verification_code(user_id)

    if stored_code is None:
        return {"error": "Invalid or expired code"}

    user = await get_user_by_id(user_id)

    if user is None:
        return {'error': "User not found"}

    send_email(user['email'], stored_code['email_code'])

    return {'result': "Code is successfully sended"}


from quart import Blueprint, request, jsonify
from app.services.user_auth_service import register_user, perform_login_service
from app.services.code_confirmation_service import verify_code

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/register", methods=["POST"])
async def register():
    """
    Регистрирует пользователя в системе.

    Params:
        number_phone (str): номер телефона.
        nickname (str): никнейм.
        email (str): электронная почта.

    Returns:
        (str): Ошибка, если возникла ошибка.
        (str): user_id, если регистрация выполнена успешно.
    """
    data = await request.json

    print(data)

    response = await register_user(data)

    if 'result' in response:
        return jsonify(response['result']), 201
    else:
        return jsonify(response['error']), 400


@auth_bp.route("/verify", methods=["POST"])
async def verify():
    """
    Проверяет отправленный на почту код.

    Params:
        user_id (str): user_id, который был отправлен при регистрации на клиент.
        code (str): отправленный на почту код.

    Returns:
        (str): Ошибка, если возникла ошибка.
        (str): Токен, если регистрация выполнена успешно.
    """
    data = await request.json

    response = await verify_code(
        data
    )

    if 'error' in response:
        return jsonify(response['error']), 400

    return jsonify(response)


@auth_bp.route("/perform_login", methods=["POST"])
async def perform_login():
    """
    Выполняет вход в систему.

    Params:
        nickname (str): никнейм пользователя.
        or
        email (str): электронная почта пользователя.

    Returns:
        (str): Ошибка, если возникла ошибка.
        (str): Сообщение об отправке кода пользователю, если пользователь бын найден.
    """

    data = await request.json

    result_login = await perform_login_service(data)

    if 'error' in result_login:
        return jsonify(result_login['error']), 400


    return jsonify(result_login['result'])

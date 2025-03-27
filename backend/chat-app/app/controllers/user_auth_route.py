from quart import Blueprint, request, jsonify
from app.services.user_auth_service import register_user, perform_login_service
from app.services.code_confirmation_service import verify_code

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/register", methods=["POST"])
async def register():
    data = await request.json

    print(data)

    response = await register_user(
        number_phone=data.get("number_phone"),
        nickname=data.get("nickname"),
        email=data.get("email")
    )

    if 'result' in response:
        return jsonify(response['result']), 201
    else:
        return jsonify(response['error']), 400


@auth_bp.route("/verify", methods=["POST"])
async def verify():
    data = await request.json

    response = await verify_code(
        user_id=data.get("user_id"),
        code=data.get("code"),
        method=data.get("method")
    )

    if 'error' in response:
        return jsonify(response['error']), 400

    return jsonify(response)


@auth_bp.route("/perform_login", methods=["POST"])
async def perform_login():
    data = await request.json

    result_login = await perform_login_service(data)

    if 'error' in result_login:
        return jsonify(result_login['error']), 400

    return jsonify(result_login['result'])

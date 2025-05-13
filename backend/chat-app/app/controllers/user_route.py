from quart import Blueprint, request, jsonify
from app.services.user_auth_service import find_users_by_nickname

user_bp = Blueprint("users", __name__)


@user_bp.route('/find_users', methods=['GET'])
async def find_users():
    nickname = request.args.get('nickname')
    print(nickname)
    users = await find_users_by_nickname(nickname)

    return jsonify(users)






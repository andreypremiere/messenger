from quart import Blueprint, jsonify
from quart import request
from app.services.avatars_services import get_main_avatars_by_user_ids_service


avatars_bp = Blueprint('avatars', __name__)


@avatars_bp.route('/get_avatars', methods=['POST'])
async def get_user_avatars():
    data = await request.get_json()
    # print('data', data)

    list_idx = await get_main_avatars_by_user_ids_service(data)
    return jsonify(list_idx)



from quart import Blueprint, request, jsonify
from app.services.code_confirmation_service import repeat_confirm_code

verifying_bp = Blueprint("verify", __name__)


@verifying_bp.route("/repeat_verifying", methods=["GET"])
async def repeat_verifying():
    user_id = request.args.get('id')

    result_code = await repeat_confirm_code(user_id)

    if 'error' in result_code:
        return jsonify(result_code['error']), 400

    return jsonify(result_code['result'])

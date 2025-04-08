import jwt
import datetime
import os
from dotenv import load_dotenv

load_dotenv()
JWT_SECRET = os.getenv("JWT_SECRET")


def create_jwt_token(user_id, nickname):
    """Создает JWT-токен для пользователя."""
    payload = {
        "userId": str(user_id),
        "nickname": str(nickname),
        "exp": datetime.datetime.utcnow() + datetime.timedelta(days=1)
    }
    return jwt.encode(payload, JWT_SECRET, algorithm="HS256")

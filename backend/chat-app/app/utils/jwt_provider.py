import jwt
import datetime
import os
from dotenv import load_dotenv

load_dotenv()
JWT_SECRET = os.getenv("JWT_SECRET")


def create_jwt_token(user_id):
    """Создает JWT-токен для пользователя."""
    payload = {
        "user_id": str(user_id),
        "exp": datetime.datetime.utcnow() + datetime.timedelta(days=3)
    }
    return jwt.encode(payload, JWT_SECRET, algorithm="HS256")

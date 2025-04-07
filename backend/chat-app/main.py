from quart import Quart
from quart_cors import cors
from app.controllers.code_confirmation_route import verifying_bp
from app.controllers.user_auth_route import auth_bp
from app.databases.database_postgresql import get_db
from app.databases.database_redis import get_connection_redis

app = Quart('Chat-project')

app = cors(app, allow_origin="http://localhost:3000")

app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(verifying_bp, url_prefix='/verifying')


@app.before_serving
async def startup():
    app.database = await get_db()
    app.redis_client = get_connection_redis()
    print('Пул соединений открыт')


@app.after_serving
async def shutdown():
    await app.database.close()
    print('Пул соединений закрыт.')


if __name__ == "__main__":
    app.run()

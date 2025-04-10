from quart import Quart
from quart_cors import cors
from app.controllers.code_confirmation_route import verifying_bp
from app.controllers.user_auth_route import auth_bp
from app.databases.database_postgresql import get_db
from app.databases.database_redis import get_connection_redis
from app.databases.database_mongo import get_connection_mongo
from app.controllers.web_socket_route import ws_bp

app = Quart('Chat-project')

app = cors(app, allow_origin="http://localhost:3000")

app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(verifying_bp, url_prefix='/verifying')
app.register_blueprint(ws_bp)


@app.before_serving
async def startup():
    app.database = await get_db()
    app.redis_client = get_connection_redis()
    app.mongo = await get_connection_mongo()
    print('Пул соединений открыт')


@app.after_serving
async def shutdown():
    await app.database.close()
    app.mongo.client.close()
    print('Пул соединений закрыт.')


if __name__ == "__main__":
    app.run()

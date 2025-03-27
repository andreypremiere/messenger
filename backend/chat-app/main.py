from quart import Quart

from app.controllers.code_confirmation_route import verifying_bp
from app.controllers.user_auth_route import auth_bp
from app.database import get_db

app = Quart('Chat-project')

app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(verifying_bp, url_prefix='/verifying')


@app.before_serving
async def startup():
    app.database = await get_db()
    print('Пул соединений инициализирован.')


@app.after_serving
async def shutdown():
    await app.database.close()
    print('Пул соединений закрыт.')


if __name__ == "__main__":
    app.run()

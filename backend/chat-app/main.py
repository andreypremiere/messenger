from quart import Quart
from quart_cors import cors
from torch import nn

from app.controllers.code_confirmation_route import verifying_bp
from app.controllers.user_auth_route import auth_bp
from app.controllers.user_route import user_bp
from app.databases.database_postgresql import get_db
from app.databases.database_redis import get_connection_redis
from app.databases.database_mongo import get_connection_mongo
from app.controllers.web_socket_route import ws_bp
from app.controllers.avatars_route import avatars_bp
import torch
import asyncio


app = Quart('Chat-project')

app = cors(app, allow_origin="http://localhost:3000")

app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(verifying_bp, url_prefix='/verifying')
app.register_blueprint(user_bp)
app.register_blueprint(avatars_bp)
app.register_blueprint(ws_bp)


async def get_model_ml():
    def load_model():
        class ClassicRNnn(nn.Module):
            def __init__(self, input_size, hidden_size, num_classes, num_layers):
                super(ClassicRNnn, self).__init__()

                self.rnn = nn.RNN(input_size, hidden_size, num_layers, batch_first=True)
                self.ll = nn.Linear(hidden_size, num_classes)

            def forward(self, x):
                out, hidden = self.rnn(
                    x)  # in: (batch_size, seq_len, input_size) out: (batch_size, seq_len, hidden_size)
                # hidden: (num_layers,batch_size,hidden_size)
                last_hidden_state = hidden[-1]  # (batch_size, hidden_size)
                # print(last_hidden_state.shape)
                return self.ll(last_hidden_state)

        model = ClassicRNnn(9, 64, 6, 2)
        model.load_state_dict(torch.load("classic_rnn_weights.pth"))
        return model

    return await asyncio.to_thread(load_model)


@app.before_serving
async def startup():
    app.database = await get_db()
    app.redis_client = get_connection_redis()
    app.mongo = await get_connection_mongo()
    app.model = await get_model_ml()
    print('Пул соединений открыт')


@app.after_serving
async def shutdown():
    await app.database.close()
    app.mongo.client.close()
    print('Пул соединений закрыт.')


if __name__ == "__main__":
    app.run()

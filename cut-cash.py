from flask import Flask

from src import route

app = Flask(__name__)

route.init_routes(app)


if __name__ == '__main__':
    app.run(debug=True)

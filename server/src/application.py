from flask import Flask

app = Flask(__name__)

from animals import animals
from greetings import greetings

app.register_blueprint(animals)
app.register_blueprint(greetings)

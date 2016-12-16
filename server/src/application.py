from flask import Flask
import database
import config
from animals import animals
from greetings import greetings
from accounts import accounts


app = Flask(__name__)
app.config.from_object(config.DefaultConfig)
app.config.from_envvar('PROPERTIES_FILE')

database.set_properties(
    host = app.config['DB_HOST'],
    database = app.config['DB_DATABASE'],
    user = app.config['DB_USER'],
    password = app.config['DB_PASSWORD']
)
database.register_teardown(app)

app.register_blueprint(animals)
app.register_blueprint(greetings)
app.register_blueprint(accounts)

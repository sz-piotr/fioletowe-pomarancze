from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

import database
import config

app = Flask(__name__)
app.config.from_object(config.DefaultConfig)
app.config.from_envvar('PROPERTIES_FILE')

db = SQLAlchemy(app)

database.set_properties(
    host = app.config['DB_HOST'],
    database = app.config['DB_DATABASE'],
    user = app.config['DB_USER'],
    password = app.config['DB_PASSWORD']
)
database.register_teardown(app)
migrate = Migrate(app, db)

from animals import animals
from greetings import greetings
from accounts import accounts
from users import users

app.register_blueprint(animals)
app.register_blueprint(greetings)
app.register_blueprint(accounts)
app.register_blueprint(users)

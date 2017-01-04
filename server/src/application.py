from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import exceptions

import config

app = Flask(__name__)
app.config.from_object(config.DefaultConfig)
app.config.from_envvar('PROPERTIES_FILE')

db = SQLAlchemy(app)
migrate = Migrate(app, db)

exceptions.register(app)

from users import users
from auth import auth

app.register_blueprint(users)
app.register_blueprint(auth)

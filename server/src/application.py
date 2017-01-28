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
from devices import devices
from groups import groups
from shares import shares
from debug import debug

api_prefix = app.config['API_PREFIX']

app.register_blueprint(users, url_prefix=api_prefix)
app.register_blueprint(auth, url_prefix=api_prefix)
app.register_blueprint(devices, url_prefix=api_prefix)
app.register_blueprint(groups, url_prefix=api_prefix)
app.register_blueprint(shares, url_prefix=api_prefix)
app.register_blueprint(debug)

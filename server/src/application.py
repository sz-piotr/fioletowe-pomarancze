from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import database
import config

app = Flask(__name__)
app.config.from_object(config.DefaultConfig)
app.config.from_envvar('PROPERTIES_FILE')
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://fioletowe:pomarancze@localhost:5432/appdb'
db = SQLAlchemy(app)

database.set_properties(
    host = app.config['DB_HOST'],
    database = app.config['DB_DATABASE'],
    user = app.config['DB_USER'],
    password = app.config['DB_PASSWORD']
)
database.register_teardown(app)


from flask import Blueprint
from application import app

auth = Blueprint('auth', __name__)
secret = app.config['SECRET']
token_duration = app.config['TOKEN_DURATION']

from auth import views

from flask import Blueprint
from application import app

auth = Blueprint('auth', __name__)
secret = app.config['SECRET']

from auth import views

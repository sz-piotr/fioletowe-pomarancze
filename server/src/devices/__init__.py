from flask import Blueprint

devices = Blueprint('devices', __name__)

from devices import views

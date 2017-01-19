from flask import Blueprint

groups = Blueprint('groups', __name__)

from groups import views

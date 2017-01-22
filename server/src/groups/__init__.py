from flask import Blueprint

groups = Blueprint('groups', __name__)
memberships = Blueprint('memberships', __name__)

from groups import views

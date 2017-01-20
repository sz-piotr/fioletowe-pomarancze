from flask import Blueprint

shares = Blueprint('shares', __name__)

from shares import views

from flask import Blueprint


accounts = Blueprint('accounts', __name__, url_prefix='/accounts')

from accounts import accounts_controller

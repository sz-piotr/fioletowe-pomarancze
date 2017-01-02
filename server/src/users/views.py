from users import users
from users.models import User
from flask import jsonify


@users.route('/list', methods=['GET'])
def list():
    users = User.query.all()
    return jsonify(User.serialize_list(users))

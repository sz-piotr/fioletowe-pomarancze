from auth import auth, secret, tokens
from users.models import User
from flask import jsonify, request
from exceptions import LoginError, MalformedJsonError


@auth.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    try:
        user = User.query.filter_by(username=data['username']).first()
        if user != None and user.check(data['password']):
            return jsonify({
                'token': tokens.encode(user).decode('utf-8')
            })
    except KeyError:
        raise MalformedJsonError
    raise LoginError()

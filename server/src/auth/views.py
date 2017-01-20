from auth import auth, secret, tokens, schemas
from users.models import User
from flask import jsonify, request
from exceptions import LoginError
from util.decorators import request_schema


@auth.route('/login', methods=['POST'])
@request_schema(schemas.login)
def login():
    data = request.get_json(force=True)
    user = User.query.filter_by(username=data['username']).first()
    if user == None:
        user = User.query.filter_by(email=data['username']).first()
    if user != None and user.check(data['password']):
        return jsonify({
            'token': tokens.encode(user).decode('utf-8')
        })
    else:
        raise LoginError()

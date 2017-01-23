from auth import auth, secret, tokens, schemas
from users.models import User
from flask import jsonify, request
from exceptions import LoginError
from util.decorators import request_schema
from sqlalchemy import or_


@auth.route('/login', methods=['POST'])
@request_schema(schemas.login)
def login():
    data = request.get_json(force=True)
    users = User.query.filter(or_(User.username==data['username'], User.email==data['username'])).all()
    for user in users:
        if user.check(data['password']):
            return jsonify({
                'token': tokens.encode(user).decode('utf-8'),
                'username': user.username
            })
    else:
        raise LoginError()

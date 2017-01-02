from users import users
from users.models import User
from flask import jsonify, request
from sqlalchemy.exc import IntegrityError
from http import HTTPStatus
from exceptions import ApiException, MalformedJsonException
from application import db


@users.route('/list', methods=['GET'])
def list():
    users = User.query.all()
    return jsonify(User.serialize_list(users, exclude='id'))


@users.route('/add', methods=['POST'])
def add():
    user_dict = request.get_json()
    try:
        user = User(
            username=user_dict['username'],
            email=user_dict['email'],
            password=user_dict['password']
        )
        db.session.add(user)
        db.session.commit()
    except KeyError:
        raise MalformedJsonException()
    except IntegrityError as e:
        e = str(e)
        if 'Key (username)' in e:
            raise ApiException('Username already in use')
        elif 'Key (email)' in e:
            raise ApiException('Email already in use')
    return ('', HTTPStatus.NO_CONTENT)

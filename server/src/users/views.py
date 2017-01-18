from users import users
from users.models import User
from flask import jsonify, request
from sqlalchemy.exc import IntegrityError
from http import HTTPStatus
from exceptions import AlreadyExistsError, MalformedJsonError
from application import db
from auth.decorators import login_required


@users.route('', methods=['GET'])
@login_required
def list():
    users = User.query.all()
    return jsonify(User.serialize_list(users, exclude='id'))


@users.route('', methods=['POST'])
def add():
    data = request.get_json(force=True)
    try:
        user = User(
            username=data['username'],
            email=data['email'],
            password=data['password']
        )
        db.session.add(user)
        db.session.commit()
    except KeyError:
        raise MalformedJsonError()
    except IntegrityError as e:
        e = str(e)
        if 'Key (username)' in e:
            raise AlreadyExistsError('Username')
        elif 'Key (email)' in e:
            raise AlreadyExistsError('Email')
    return ('', HTTPStatus.NO_CONTENT)

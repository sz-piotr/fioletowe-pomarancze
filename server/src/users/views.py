from users import users, schemas
from users.models import User
from flask import jsonify, request, g
from sqlalchemy.exc import IntegrityError
from http import HTTPStatus
from exceptions import AlreadyExistsError, MalformedJsonError, ValidationError
from application import db
from auth.decorators import login_required
from util.decorators import request_schema
import re

username_format = re.compile('\w+')
email_format = re.compile('[\w\.]+@[\w\.]+\.\w+')

@users.route('/users', methods=['GET'])
@login_required
def list():
    users = User.query.all()
    return jsonify(User.serialize_list(users, exclude='id'))


@users.route('/users', methods=['POST'])
@request_schema(schemas.add_user)
def add():
    # TODO add email confirmation
    if username_format.fullmatch(g.data['username']) == None:
        raise ValidationError('Username must can only contain letters, numbers and underscores')
    if email_format.fullmatch(g.data['email']) == None:
        raise ValidationError('Email is not valid')
    try:
        user = User(
            username=g.data['username'],
            email=g.data['email'],
            password=g.data['password']
        )
        db.session.add(user)
        db.session.commit()
    except IntegrityError as e:
        e = str(e)
        if 'Key (username)' in e:
            raise AlreadyExistsError('Username')
        elif 'Key (email)' in e:
            raise AlreadyExistsError('Email')
    return ('', HTTPStatus.NO_CONTENT)

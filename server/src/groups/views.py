from groups import groups, schemas
from groups.models import Group
from users.models import user_group_association, User
from flask import jsonify, request, g
from http import HTTPStatus
from auth.decorators import login_required
from util.decorators import request_schema
from exceptions import AlreadyExistsError, DoesNotExistError
from sqlalchemy.exc import IntegrityError
from application import db


@groups.route('/groups', methods=['GET'])
@login_required
def list():
    groups = Group.query.filter_by(user_id = g.auth['sub']).all()
    groups = [out_group(group) for group in groups]
    return jsonify({
        'groups': groups
    })

def out_group(group):
    return {
        'name': group.name,
        'shares': [],
        'members': [out_member(member) for member in group.members]
    }

def out_member(member):
    return {
        'email': member.email,
        'name': member.username
    }

@groups.route('/groups/<group_name>', methods=['POST'])
@login_required
def add(group_name):
    try:
        group = Group(
            name=group_name,
            user_id=g.auth['sub']
        )
        db.session.add(group)
        db.session.commit()
    except IntegrityError as e:
        raise AlreadyExistsError(group_name)
    return ('', HTTPStatus.NO_CONTENT)


@groups.route('/groups/<group_name>', methods=['DELETE'])
@login_required
def remove(group_name):
    Group.query.filter_by(user_id=g.auth['sub'], name=group_name).delete()
    db.session.commit()
    return ('', HTTPStatus.OK)


@groups.route('/groups/<group_name>/members/<member_email>', methods=['POST'])
@login_required
def add_member(group_name, member_email):
    group = Group.query.filter_by(user_id = g.auth['sub'], name = group_name).first()
    if group == None:
        raise DoesNotExistError(group_name)
    user = User.query.filter_by(email = member_email).first()
    if user == None:
        raise DoesNotExistError(member_email)
    try:
        group.members.append(user)
        db.session.commit()
    except IntegrityError as e:
        raise AlreadyExistsError(member_email)
    return ('', HTTPStatus.OK)

@groups.route('/groups/<group_name>/members/<member_email>', methods=['DELETE'])
@login_required
def remove_member(group_name, member_email):
    group = Group.query.filter_by(user_id = g.auth['sub'], name = group_name).first()
    if group == None:
        raise DoesNotExistError(group_name)
    user = User.query.filter_by(email = member_email).first()
    if user == None:
        raise DoesNotExistError(member_email)
    try:
        group.members.remove(user)
        db.session.commit()
    except ValueError as e:
        raise DoesNotExistError(member_email)
    return ('', HTTPStatus.OK)
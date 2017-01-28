from groups import groups, schemas
from groups.models import Group
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
    # TODO implement
    return jsonify({
        'groups': [{
            'name': 'name',
            'members': [{
                'email': 'email',
                'name': 'name'
            }]
        }]
    })


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
    # TODO implement
    print('Adding %s to %s' % (member_email, group_name))
    return ('', HTTPStatus.OK)


@groups.route('/groups/<group_name>/members/<member_email>', methods=['DELETE'])
@login_required
def remove_member(group_name, member_email):
    # TODO implement
    print('Removing %s from %s' % (member_email, group_name))
    return ('', HTTPStatus.OK)
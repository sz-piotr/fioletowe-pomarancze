from groups import groups, schemas
from groups.models import Group
from flask import jsonify, request, g
from http import HTTPStatus
from auth.decorators import login_required
from util.decorators import request_schema


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
    # TODO implement
    print('Adding:', group_name)
    return ('', HTTPStatus.OK)


@groups.route('/groups/<group_name>', methods=['DELETE'])
@login_required
def remove(group_name):
    # TODO implement
    print('Removing:', group_name)
    return ('', HTTPStatus.OK)


@groups.route('/groups/<group_name>/members/<member_email>', methods=['POST'])
@login_required
def add_members(group_name, member_email):
    # TODO implement
    print('Adding %s to %s' % (member_email, group_name))
    return ('', HTTPStatus.OK)


@groups.route('/groups/<group_name>/members/<member_email>', methods=['DELETE'])
@login_required
def remove_members(group_name, member_email):
    # TODO implement
    print('Removing %s from %s' % (member_email, group_name))
    return ('', HTTPStatus.OK)

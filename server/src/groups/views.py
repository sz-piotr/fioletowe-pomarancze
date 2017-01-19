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


@groups.route('/groups', methods=['POST'])
@login_required
@request_schema(schemas.add_groups)
def add():
    # TODO implement
    print('Received', g.data)
    return ('', HTTPStatus.NO_CONTENT)


@groups.route('/groups', methods=['DELETE'])
@login_required
@request_schema(schemas.remove_groups)
def remove():
    # TODO implement
    print('Received', g.data)
    return ('', HTTPStatus.NO_CONTENT)


@groups.route('/groups/<string:group_name>', methods=['POST'])
@login_required
@request_schema(schemas.add_members)
def add_members(group_name):
    # TODO implement
    print('Received', g.data)
    return ('', HTTPStatus.NO_CONTENT)


@groups.route('/groups/<string:group_name>', methods=['DELETE'])
@login_required
@request_schema(schemas.remove_members)
def remove_members(group_name):
    # TODO implement
    print('Received', g.data)
    return ('', HTTPStatus.NO_CONTENT)

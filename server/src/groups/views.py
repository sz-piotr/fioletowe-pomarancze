from sqlalchemy.dialects.postgresql import insert
from groups import groups, schemas
from groups.models import Group
from groups.models import Membership
from groups.models import GroupSchema
from flask import jsonify, request, g
from http import HTTPStatus
from auth.decorators import login_required
from util.decorators import request_schema
from application import db


@groups.route('/groups', methods=['GET'])
@login_required
def list():
    groups = Group.query.all()
    result = GroupSchema().dump(groups, many=True)
    return jsonify({
        'groups':
            result.data
    })

	
@groups.route('/groups', methods=['POST'])
@login_required
@request_schema(schemas.add_groups)
def add():
    try:
        request_data = request.get_json()
        generator = (item['name'] for item in request_data['groups'])
        for n in generator:
            gr = Group(n)
            db.session.add(gr)
        db.session.commit()
    except IntegrityError as e:
        e = str(e)
        if 'Key (name)' in e:
            raise AlreadyExistsError('name')
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

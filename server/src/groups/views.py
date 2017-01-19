from groups import groups
from groups.models import Group
from flask import jsonify, request
from sqlalchemy.exc import IntegrityError
from http import HTTPStatus
from exceptions import AlreadyExistsError, MalformedJsonError
from application import db
from auth.decorators import login_required


@groups.route('/groups', methods=['GET'])
@login_required
def list():
    '''
    Response format:
    { groups: [ {name:”name”}, ... ] }
    '''
    # TODO implement
    return jsonify([])


@groups.route('/groups', methods=['POST'])
@login_required
def add():
    '''
    Request format:
    { groups: [ {name:”name”}, ... ] }
    '''
    # TODO implement
    return ('', HTTPStatus.NO_CONTENT)


@groups.route('/groups', methods=['DELETE'])
@login_required
def remove():
    '''
    Request format:
    { groups: [ {name:”name”}, ... ] }
    '''
    # TODO implement
    return ('', HTTPStatus.NO_CONTENT)


@groups.route('/groups/<string:group_name>', methods=['GET'])
@login_required
def list_members(group_name):
    '''
    Response format:
    { members: [ {email:”email”, name:”name”},  ... ] }
    '''
    # TODO implement
    return jsonify([])


@groups.route('/groups/<string:group_name>', methods=['POST'])
@login_required
def add_members(group_name):
    '''
    Request format:
    { members: [ {email:”example@ex.com”}, ... ] }
    '''
    # TODO implement
    return ('', HTTPStatus.NO_CONTENT)


@groups.route('/groups/<string:group_name>', methods=['DELETE'])
@login_required
def remove_members():
    '''
    Request format:
    { members: [ {email:”example@ex.com”}, ... ] }
    '''
    # TODO implement
    return ('', HTTPStatus.NO_CONTENT)

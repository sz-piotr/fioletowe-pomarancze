from devices import devices
from devices.models import Device
from flask import jsonify, request
from sqlalchemy.exc import IntegrityError
from http import HTTPStatus
from exceptions import AlreadyExistsError, MalformedJsonError
from application import db
from auth.decorators import login_required


@devices.route('/devices', methods=['GET'])
@login_required
def list():
    '''
    Response format:
    { devices: [ {name:”name”}, ... ] }
    '''
    # TODO implement
    return jsonify([])


@devices.route('/devices', methods=['POST'])
@login_required
def add():
    '''
    Request format:
    { devices: [ {name:”name”}, ... ] }
    '''
    # TODO implement
    return ('', HTTPStatus.NO_CONTENT)


@devices.route('/devices', methods=['DELETE'])
@login_required
def remove():
    '''
    Request format:
    { devices: [ {name:”name”}, ... ] }
    '''
    # TODO implement
    return ('', HTTPStatus.NO_CONTENT)

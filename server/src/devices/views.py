from devices import devices, schemas
from devices.models import Device
from flask import jsonify, request
from sqlalchemy.exc import IntegrityError
from http import HTTPStatus
from exceptions import AlreadyExistsError, MalformedJsonError
from application import db
from auth.decorators import login_required
from util.decorators import request_schema


@devices.route('/devices', methods=['GET'])
@login_required
def list():
    # TODO implement
    return jsonify({
        'devices': [{
            'name': 'name',
            'address': 'ip:port'
        }]
    })


@devices.route('/devices/<device_name>', methods=['POST'])
@login_required
@request_schema(schemas.add_devices)
def add(device_name):
    # TODO implement
    print('Adding: ', device_name)
    return ('', HTTPStatus.NO_CONTENT)


@devices.route('/devices/<device_name>', methods=['DELETE'])
@login_required
def remove(device_name):
    # TODO implement
    print('Removing: ', device_name)
    return ('', HTTPStatus.NO_CONTENT)

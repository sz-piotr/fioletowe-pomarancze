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
            'name': 'name'
        }]
    })


@devices.route('/devices', methods=['POST'])
@login_required
@request_schema(schemas.add_devices)
def add():
    # TODO implement
    return ('', HTTPStatus.NO_CONTENT)


@devices.route('/devices', methods=['DELETE'])
@login_required
@request_schema(schemas.remove_devices)
def remove():
    # TODO implement
    return ('', HTTPStatus.NO_CONTENT)

from devices import devices, schemas
from devices.models import Device
from flask import jsonify, request, g
from sqlalchemy.exc import IntegrityError
from http import HTTPStatus
from exceptions import AlreadyExistsError, MalformedJsonError
from application import db
from auth.decorators import login_required
from util.decorators import request_schema


@devices.route('/devices', methods=['GET'])
@login_required
def list():
    devices = Device.query.filter_by(user_id=g.auth['sub']).all()
    return jsonify({
        'devices': Device.serialize_list(devices)
    })


@devices.route('/devices/<device_name>', methods=['POST'])
@login_required
@request_schema(schemas.add_device)
def add(device_name):
    try:
        device = Device(
            name=device_name,
            address=g.data['address'],
            user_id=g.auth['sub']
        )
        db.session.add(device)
        db.session.commit()
    except IntegrityError as e:
        raise AlreadyExistsError(device_name)
    return ('', HTTPStatus.NO_CONTENT)


@devices.route('/devices/<device_name>', methods=['DELETE'])
@login_required
def remove(device_name):
    Device.query.filter_by(user_id=g.auth['sub'], name=device_name).delete()
    db.session.commit()
    return ('', HTTPStatus.NO_CONTENT)

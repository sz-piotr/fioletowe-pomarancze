from shares import shares, schemas
from devices.models import Device
from shares.models import Share, Path
from flask import jsonify, request, g
from sqlalchemy.exc import IntegrityError
from http import HTTPStatus
from application import db
from auth.decorators import login_required
from util.decorators import request_schema
from exceptions import AlreadyExistsError, DoesNotExistError


@shares.route('/shares', methods=['GET'])
@login_required
def list():
    # TODO implement
    return jsonify({
        'shares': [{
            'name': 'name',
            'device': 'device',
            'paths': [{
                'name': 'name',
                'path:': 'path'
            }]
        }]
    })

@shares.route('/shares/<share_name>', methods=['POST'])
@login_required
@request_schema(schemas.add_share)
def add(share_name):
    device = Device.query.filter_by(user_id = g.auth['sub'], name = g.data['device']).first()
    if device == None:
        raise DoesNotExistError(g.data['device'])
    try:
        share = Share(
            name = share_name,
            user_id = g.auth['sub'],
            device_id = device.id
        )
        db.session.add(share)
        db.session.commit()
    except IntegrityError as e:
        raise AlreadyExistsError(share_name)
    return ('', HTTPStatus.NO_CONTENT)


@shares.route('/shares/<share_name>', methods=['DELETE'])
@login_required
def remove(share_name):
    # TODO implement
    print('Removing:', share_name)
    return ('', HTTPStatus.OK)

from shares import shares, schemas
from shares.models import Share, Path
from flask import jsonify, request, g
from http import HTTPStatus
from auth.decorators import login_required
from util.decorators import request_schema


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
    # TODO implement
    print('Adding:', share_name)
    return ('', HTTPStatus.OK)


@shares.route('/shares/<share_name>', methods=['DELETE'])
@login_required
def remove(share_name):
    # TODO implement
    print('Removing:', share_name)
    return ('', HTTPStatus.OK)

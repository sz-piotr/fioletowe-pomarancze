from shares import shares, schemas
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


@shares.route('/shares', methods=['POST'])
@login_required
@request_schema(schemas.add_shares)
def add():
    # TODO implement
    print('Received', g.data)
    return ('', HTTPStatus.NO_CONTENT)


@shares.route('/shares', methods=['DELETE'])
@login_required
@request_schema(schemas.remove_shares)
def remove():
    # TODO implement
    print('Received', g.data)
    return ('', HTTPStatus.NO_CONTENT)

from shares import shares, schemas
from flask import jsonify, request, g
from http import HTTPStatus
from auth.decorators import login_required
from util.decorators import request_schema


@shares.route('/shares/public', methods=['GET'])
@login_required
def list_shares():
    # TODO implement
    return jsonify({
        'shares': [{
            'owner': 'name',
            'name': 'sharename',
            'paths': [{'name': 'name'}]
        }]
    })


@shares.route('/shares/public/<string:user_name>/at', methods=['GET'])
@login_required
def get_access_token(user_name):
    # TODO implement
    return jsonify({
        'token': 'token',
        'shares': [{
            'name': 'name',
            'address': 'ip:port'
        }]
    })


@shares.route('/shares/public/verify/at', methods=['GET'])
@login_required
@request_schema(schemas.verify_access_token)
def verify_access_token(user_name):
    # TODO implement
    return jsonify({
        'allowed': True,
        'realpath': '/real/path'
    })

from shares import shares, schemas
from flask import jsonify, request, g
from http import HTTPStatus
from auth.decorators import login_required
from util.decorators import request_schema
from shares.models import Share
from shares.views.utils import out_aval_share, out_path


@shares.route('/shares/public', methods=['GET'])
@login_required
def list_shares():
    shares = Share.query.all()
    results = [out_aval_share(share) for share in shares]
    return jsonify({
        'shares':
            results
    })


@shares.route('/shares/public/<user_name>/at', methods=['GET'])
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

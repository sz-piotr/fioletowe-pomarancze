from shares import shares, schemas
from flask import jsonify, request, g, json
from http import HTTPStatus
from auth.decorators import login_required
from util.decorators import request_schema
from shares.models import Share
from users.models import User
from shares.views.utils import out_aval_share, out_path
from auth.tokens import encode_access, decode


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
    user = User.query.filter_by(username=user_name).one()
    if user == None:
        raise DoesNotExistError(user_name)
    token = encode_access(user)
    shares = user.shares
    shares = [out_aval_share(share) for share in shares]
    return jsonify({
        'token': token.decode('utf-8'),
        'shares': 
            shares
    })


@shares.route('/shares/public/verify/at', methods=['GET'])
@login_required
@request_schema(schemas.verify_access_token)
def verify_access_token(user_name):
    user_name = 'user1'
    json_request = request.get_json()
    path = json_request['path']
    verified_token = json_request['token']

    user = User.query.filter_by(username=user_name).one()
    if user == None:
        raise DoesNotExistError(user_name)
    token = encode_access(user)
    
    return jsonify({
        'allowed': True if token is verified_token else False
        'realpath': '/real/' + path
    })

from shares import shares, schemas
from flask import jsonify, request, g, json
from http import HTTPStatus
from auth.decorators import login_required
from util.decorators import request_schema
from shares.models import Share
from users.models import User
from exceptions import DoesNotExistError
from shares.views.utils import out_aval_share, out_path, is_path_aval
from auth.tokens import encode_access, decode


@shares.route('/shares/public', methods=['GET'])
@login_required
def list_shares():
    user = User.query.filter_by(id = g.auth['sub']).first()
    if (user is None):
        raise DoesNotExistError(g.data['user'])
	
    results = []
    for group in user.in_groups:
        results.extend([out_aval_share(share) for share in group.shares])
    return jsonify({
        'shares':
            results
    })	


@shares.route('/shares/public/<user_name>/at', methods=['GET'])
@login_required
def get_access_token(user_name):
    user = User.query.filter_by(id = g.auth['sub']).first()
    if (user is None):
        raise DoesNotExistError(g.data['user'])
    for_user = User.query.filter_by(username=user_name).first()
    if (for_user is None):
        raise DoesNotExistError(g.data['user'])
		
    token = encode_access(user, for_user)
    return jsonify({
        'token': token.decode('utf-8')
    })


@shares.route('/shares/public/verify/at', methods=['POST'])
@login_required
@request_schema(schemas.verify_access_token)
def verify_access_token():
    json_request = request.get_json()
    token = json_request['token']
    token = decode(token)
    success = {
        'allowed': True,
        'realpath': '/real/' + json_request['path']
    }
    fail = {
        'allowed': False,
        'realpath': '/real/' + json_request['path']
    }
	
    if(token['type'] != 'access'):
        return jsonify(fail) 
	
    if (g.auth['sub'] != token['for']):
        return jsonify(fail)
    
    user = User.query.filter_by(id=token['sub']).first()
    if user == None:
        raise DoesNotExistError(token['sub'])
	
    res_path = is_path_aval(user, json_request['share'], json_request['path'])
	
    if(res_path == None):
        return jsonify(fail)
    else:
        return jsonify(success)
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


class AccessError(Exception):
    pass


@shares.route('/shares/public', methods=['GET'])
@login_required
def list_shares():
    user = User.query.filter_by(id=g.auth['sub']).first()
    if (user is None):
        raise DoesNotExistError(g.data['user'])

    shares = []
    for group in user.in_groups:
        for share in group.shares:
            if not share in shares:
                shares.append(share)
    return jsonify({
        'shares': [out_aval_share(share) for share in shares]
    })


@shares.route('/shares/public/<user_name>/at', methods=['GET'])
@login_required
def get_access_token(user_name):
    user = User.query.filter_by(id=g.auth['sub']).first()
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
    print('HELLO')
    token = g.data['issuer']['token']
    print(token)
    token = decode(token)
    print(token)
    try:
        verify_access_token(token, g.auth['sub'])

        owner = User.query.filter_by(id=g.auth['sub']).first()
        requester = User.query.filter_by(id=token['sub']).first()
        if requester == None:
            raise AccessError

        for share in owner.shares:
            if share.name == g.data['request']['share']:
                for group in share.groups:
                    if requester in group.users:
                        for path in share.paths:
                            if path.name == g.data['request']['path']:
                                return jsonify({
                                    'allowed': True,
                                    'realpath': path.path
                                })
                        raise AccessError
                raise AccessError
        raise AccessError
    except AccessError:
        return jsonify({'allowed': False})


def verify_access_token(token, user_id):
    if(token['type'] != 'access'):
        raise AccessError
    if (g.auth['sub'] != token['for']):
        raise AccessError

from shares import shares, schemas
from flask import jsonify, request, g
from http import HTTPStatus
from auth.decorators import login_required
from util.decorators import request_schema


@shares.route('/shares/<string:share_name>', methods=['POST'])
@login_required
@request_schema(schemas.add_paths)
def add_paths(share_name):
    # TODO implement
    print('Received', g.data)
    return ('', HTTPStatus.NO_CONTENT)


@shares.route('/shares/<string:share_name>', methods=['DELETE'])
@login_required
@request_schema(schemas.remove_paths)
def remove_paths(share_name):
    # TODO implement
    print('Received', g.data)
    return ('', HTTPStatus.NO_CONTENT)
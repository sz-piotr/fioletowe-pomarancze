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
    return jsonify([])


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

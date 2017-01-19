from shares import shares, schemas
from flask import jsonify, request, g
from http import HTTPStatus
from auth.decorators import login_required
from util.decorators import request_schema


@shares.route('/shares/<string:share_name>/groups', methods=['POST'])
@login_required
@request_schema(schemas.add_to_groups)
def add_to_groups(share_name):
    # TODO implement
    print('Received', g.data)
    return ('', HTTPStatus.NO_CONTENT)


@shares.route('/shares/<string:share_name>/groups', methods=['DELETE'])
@login_required
@request_schema(schemas.remove_from_groups)
def remove_from_groups(share_name):
    # TODO implement
    print('Received', g.data)
    return ('', HTTPStatus.NO_CONTENT)

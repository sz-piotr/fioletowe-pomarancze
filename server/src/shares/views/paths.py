from shares import shares, schemas
from flask import jsonify, request, g
from http import HTTPStatus
from auth.decorators import login_required
from util.decorators import request_schema


@shares.route('/shares/<share_name>/paths/<path_name>', methods=['POST'])
@login_required
@request_schema(schemas.add_path)
def add_path(share_name, path_name):
    # TODO implement
    print('Adding %s to %s' % (path_name, share_name))
    return ('', HTTPStatus.OK)


@shares.route('/shares/<share_name>/paths/<path_name>', methods=['DELETE'])
@login_required
def remove_path(share_name, path_name):
    # TODO implement
    print('Removing %s from %s' % (path_name, share_name))
    return ('', HTTPStatus.OK)

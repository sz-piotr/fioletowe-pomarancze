from shares import shares, schemas
from flask import jsonify, request, g
from http import HTTPStatus
from auth.decorators import login_required
from util.decorators import request_schema


@shares.route('/groups<group_name>/shares/<share_name>', methods=['POST'])
@login_required
def add_to_group(group_name, share_name):
    # TODO implement
    print('Adding %s to %s' % (group_name, share_name))
    return ('', HTTPStatus.OK)


@shares.route('/groups<group_name>/shares/<share_name>', methods=['DELETE'])
@login_required
def remove_from_group(group_name, share_name):
    # TODO implement
    print('Removing %s from %s' % (group_name, share_name))
    return ('', HTTPStatus.OK)

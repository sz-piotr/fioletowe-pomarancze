from shares import shares, schemas
from flask import jsonify, request, g
from groups.models import Group
from shares.models import Share
from http import HTTPStatus
from auth.decorators import login_required
from util.decorators import request_schema
from sqlalchemy.exc import IntegrityError
from application import db
from exceptions import AlreadyExistsError, DoesNotExistError


@shares.route('/groups/<group_name>/shares/<share_name>', methods=['POST'])
@login_required
def add_to_group(group_name, share_name):
    group = Group.query.filter_by(user_id = g.auth['sub'], name = group_name).first()
    if group == None:
        raise DoesNotExistError(group_name)
    share = Share.query.filter_by(user_id = g.auth['sub'], name = share_name).first()
    if share == None:
        raise DoesNotExistError(share_name)
    try:
        group.shares.append(share)
        db.session.commit()
    except IntegrityError as e:
        raise AlreadyExistsError(share_name)
    print('Adding %s to %s' % (group_name, share_name))
    return ('', HTTPStatus.OK)


@shares.route('/groups/<group_name>/shares/<share_name>', methods=['DELETE'])
@login_required
def remove_from_group(group_name, share_name):
    group = Group.query.filter_by(user_id = g.auth['sub'], name = group_name).first()
    if group == None:
        raise DoesNotExistError(group_name)
    share = Share.query.filter_by(user_id = g.auth['sub'], name = share_name).first()
    if share == None:
        raise DoesNotExistError(share_name)

    group.shares.remove(share)
    db.session.commit()

    print('Removing %s from %s' % (group_name, share_name))
    return ('', HTTPStatus.OK)

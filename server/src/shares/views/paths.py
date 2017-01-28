from shares import shares, schemas
from devices.models import Device
from shares.models import Share, Path
from flask import jsonify, request, g
from sqlalchemy.exc import IntegrityError
from http import HTTPStatus
from application import db
from auth.decorators import login_required
from util.decorators import request_schema
from exceptions import AlreadyExistsError, DoesNotExistError

@shares.route('/shares/<share_name>/paths/<path_name>', methods=['POST'])
@login_required
@request_schema(schemas.add_path)
def add_path(share_name, path_name):
    share = Share.query.filter_by(user_id = g.auth['sub'], name = share_name).first()
    if share == None:
        raise DoesNotExistError(share_name)
    try:
        path = Path(
            name = path_name,
            share_id = share.id,
            path = g.data['path']        
        )
        db.session.add(path)
        db.session.commit()
    except IntegrityError as e:
        raise AlreadyExistsError(path_name)
    return ('', HTTPStatus.NO_CONTENT)


@shares.route('/shares/<share_name>/paths/<path_name>', methods=['DELETE'])
@login_required
def remove_path(share_name, path_name):
    share = Share.query.filter_by(user_id = g.auth['sub'], name = share_name).first()
    if share == None:
        raise DoesNotExistError(share_name)
    Path.query.filter_by(share_id = share.id, name=path_name).delete()
    db.session.commit()
    return ('', HTTPStatus.OK)
from functools import wraps
from flask import request, g
from exceptions import LoginRequredError, LoginError
from auth import tokens
from jwt.exceptions import InvalidTokenError
import re

header_format = re.compile('Bearer .*')


def login_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth = request.headers.get('Authorization')
        if auth == None or header_format.fullmatch(auth) == None:
            raise LoginRequredError()
        try:
            g.auth = tokens.decode(auth[7:])
            if g.auth['type'] != 'auth':
                raise InvalidTokenError
        except (InvalidTokenError, KeyError):
            raise LoginError('Invalid token')
        return f(*args, **kwargs)
    return decorated

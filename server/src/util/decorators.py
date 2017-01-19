from functools import wraps
from flask import request, g
from exceptions import MalformedJsonError
from jsonschema import validate
from jsonschema.exceptions import ValidationError


def request_schema(schema):
    def decorator(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            g.data = request.get_json(force=True)
            try:
                validate(g.data, schema)
            except ValidationError:
                raise MalformedJsonError
            return f(*args, **kwargs)
        return decorated
    return decorator

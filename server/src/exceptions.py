from http import HTTPStatus
from flask import jsonify


class ApiException(Exception):

    def __init__(self, message='Bad request', status_code=HTTPStatus.BAD_REQUEST, payload=None):
        Exception.__init__(self)
        self.message = message
        self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv['message'] = self.message
        rv['status'] = self.status_code
        return rv


class MalformedJsonException(ApiException):

    def __init__(self):
        ApiException.__init__(self, 'Malformed JSON')


def register(app):
    @app.errorhandler(ApiException)
    def handler(error):
        response = jsonify(error.to_dict())
        response.status_code = error.status_code
        return response

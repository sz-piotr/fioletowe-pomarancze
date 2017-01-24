from http import HTTPStatus
from flask import jsonify


class ApiException(Exception):

    def __init__(self, message='Api error', code='API_ERROR',
                 status_code=HTTPStatus.BAD_REQUEST, data=None):
        Exception.__init__(self)
        self.message = message
        self.code = code
        self.status_code = status_code
        self.data = data

    def to_dict(self):
        rv = {}
        rv['code'] = self.code
        rv['msg'] = self.message
        if self.data != None:
            rv['data'] = self.data
        return rv


class MalformedJsonError(ApiException):

    def __init__(self):
        ApiException.__init__(self, message='Malformed JSON', code='MALFORMED_JSON')

class ValidationError(ApiException):

    def __init__(self, message='Validation failed'):
        ApiException.__init__(self, message=message, code='VALIDATION_FAILED')


class AlreadyExistsError(ApiException):

    def __init__(self, item):
        ApiException.__init__(self, message=item + ' already exists', code='ALREADY_EXISTS')


class LoginError(ApiException):

    def __init__(self, message='Invalid username or password'):
        ApiException.__init__(self, message, code='LOGIN_ERROR')


class LoginRequredError(ApiException):

    def __init__(self):
        ApiException.__init__(self, message='Login required', code='LOGIN_REQUIRED',
                              status_code=HTTPStatus.UNAUTHORIZED)


def register(app):
    @app.errorhandler(ApiException)
    def handler(error):
        response = jsonify(error.to_dict())
        response.status_code = error.status_code
        return response

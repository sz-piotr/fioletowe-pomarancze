from flask import request, abort
from accounts import accounts
import psycopg2
from http import HTTPStatus
from accounts import accounts_service


@accounts.route('/create', methods=['POST'])
def create_account():
    credentials = request.get_json()
    try:
        accounts_service.create_account(
            credentials['username'],
            credentials['password']
        )
        return 'Account created successfully'
    except psycopg2.Error as e:
        return abort(HTTPStatus.BAD_REQUEST)

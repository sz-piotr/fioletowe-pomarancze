import jwt
from datetime import timedelta, datetime
from auth import secret

def encode(user):
    payload = {
        'sub': user.id
    }
    return jwt.encode(payload, secret, algorithm='HS256')


def decode(token):
    return jwt.decode(token, secret, algorithms=['HS256'])

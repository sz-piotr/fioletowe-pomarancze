import jwt
from datetime import timedelta, datetime
from auth import secret, token_duration

def encode(user):
    payload = {
        'sub': user.id,
        'exp': datetime.utcnow() + timedelta(seconds=token_duration)
    }
    return jwt.encode(payload, secret, algorithm='HS256')


def decode(token):
    return jwt.decode(token, secret, algorithms=['HS256'])

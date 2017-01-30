import jwt
from datetime import timedelta, datetime
from auth import secret

def encode_access(user, for_user):
    payload = {
        'sub': user.id,
		'for': for_user.id,
        'type': 'access'
    }
    return jwt.encode(payload, secret, algorithm='HS256')
	
def encode_auth(user):
    payload = {
        'sub': user.id,
		'type': "auth"
    }
    return jwt.encode(payload, secret, algorithm='HS256')


def decode(token):
    return jwt.decode(token, secret, algorithms=['HS256'])

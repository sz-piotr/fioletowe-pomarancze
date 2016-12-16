from passlib.hash import pbkdf2_sha256
from accounts import accounts_sql


def create_account(username, password):
    hash = hash_password(password)
    accounts_sql.create_account(username, hash)


def hash_password(password):
    return pbkdf2_sha256.hash(password)


def check_password(password, hash):
    return pbkdf2_sha256.verify(password, hash)

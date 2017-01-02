from passlib.hash import pbkdf2_sha256


def hash(password):
    return pbkdf2_sha256.hash(password)


def check(password, hash):
    return pbkdf2_sha256.verify(password, hash)

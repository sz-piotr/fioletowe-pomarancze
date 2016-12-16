from flask import g
from database import transactional


@transactional
def create_account(username, hash):
    g.cursor.execute(
        "INSERT INTO users (username, hash) VALUES (%s, %s)",
        (username, hash)
    )

from application import app
from flask import g
from functools import wraps
import psycopg2
from psycopg2.extras import RealDictCursor


def connect_db():
    conn = psycopg2.connect("host='localhost' dbname='playground' user='user' password='password'",
                            cursor_factory=RealDictCursor)
    return conn


def get_db():
    if not hasattr(g, 'pgsql_db'):
        g.pgsql_db = connect_db()
    return g.pgsql_db


@app.teardown_appcontext
def close_db(error):
    if hasattr(g, 'pgsql_db'):
        g.pgsql_db.close()


def transactional(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        conn = get_db()
        cursor = conn.cursor()
        ret_value = func(*args, **kwargs, cursor=cursor)
        conn.commit()
        cursor.close()
        return ret_value
    return wrapper

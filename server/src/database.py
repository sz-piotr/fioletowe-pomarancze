from flask import g
from functools import wraps
import psycopg2
from psycopg2.extras import RealDictCursor
_properties = {}


def set_properties(**kwargs):
    global _properties
    _properties = kwargs


def connect_db():
    return psycopg2.connect(cursor_factory=RealDictCursor, **_properties)


def get_db():
    if not hasattr(g, 'pgsql_db'):
        g.pgsql_db = connect_db()
    return g.pgsql_db


def register_teardown(app):
    @app.teardown_appcontext
    def close_db(error):
        if hasattr(g, 'pgsql_db'):
            g.pgsql_db.close()


def transactional(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        if not hasattr(g, 'cursor'):
            try:
                conn = get_db()
                g.cursor = conn.cursor()
                ret_value = func(*args, **kwargs)
                conn.commit()
                return ret_value
            except Exception as e:
                conn.rollback()
                raise e
            finally:
                del g.cursor
        else:
            return func(*args, **kwargs)
    return wrapper

from application import db
from serializer import Serializer
from users import passwords


class User(db.Model, Serializer):
    __private__ = ('password')

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(90), nullable=False)

    def __init__(self, username, email, password):
        self.username = username
        self.email = email
        self.password = passwords.hash(password)

    def __repr__(self):
        return '<User %r>' % self.username

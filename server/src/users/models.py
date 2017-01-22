from application import db
from serializer import Serializer
from users import passwords
from sqlalchemy.orm import relationship
from sqlalchemy.ext.associationproxy import association_proxy
from marshmallow import Schema, fields


class User(db.Model, Serializer):
    __tablename__ = 'user'
    __private__ = ('password')

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(90), nullable=False)

    groups = association_proxy("membership", "group")

    def __init__(self, username, email, password):
        self.username = username
        self.email = email
        self.password = passwords.hash(password)

    def check(self, password):
        return passwords.check(password, self.password)

    def __repr__(self):
        return '<User %r>' % self.username 


class UserSchema(Schema):
    username = fields.Str()
    email = fields.Str()
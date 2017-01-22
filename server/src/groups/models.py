from application import db
from serializer import Serializer
from sqlalchemy.orm import relationship, backref
from sqlalchemy.ext.associationproxy import association_proxy
from marshmallow import Schema, fields
from users.models import UserSchema


class Group(db.Model, Serializer):
    __tablename__ = 'group'
    __private__ = ('id')

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)

    members = association_proxy("membership", "user")

    def __init__(self, name):
	    self.name = name

    def __repr__(self):
        return '<Group %r members %r>' % (self.name, self.members)


class GroupSchema(Schema):
    name = fields.Str()
    members = fields.Nested(UserSchema, many=True)


class Membership(db.Model, Serializer):
    __tablename__ = 'membership'

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    group_id = db.Column(db.Integer, db.ForeignKey('group.id'))

    __table_args__ = (
        db.PrimaryKeyConstraint('user_id', 'group_id'),
        {},
    )

    user = db.relationship("User")
    group = db.relationship(Group, backref="membership")

    def __init__(self, user, group):
        self.user_id = user.id
        self.group_id = group.id
        self.user = user
        self.group = group
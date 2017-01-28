from application import db
from serializer import Serializer
from users import passwords

user_group_association = db.Table('user_group_association', db.Model.metadata,
    db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('group_id', db.Integer, db.ForeignKey('group.id')),
    db.UniqueConstraint('user_id', 'group_id', name='user_group_association_uc')
)

class User(db.Model, Serializer):
    __private__ = ('password')

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(90), nullable=False)

    devices = db.relationship("Device", back_populates="user")
    shares = db.relationship("Share", back_populates="user")
    own_groups = db.relationship("Group", back_populates="user")
    in_groups = db.relationship("Group", secondary=user_group_association, back_populates="members")

    def __init__(self, username, email, password):
        self.username = username
        self.email = email
        self.password = passwords.hash(password)

    def check(self, password):
        return passwords.check(password, self.password)

    def __repr__(self):
        return '<User %r>' % self.username
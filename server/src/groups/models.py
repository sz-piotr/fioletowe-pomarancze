from application import db
from serializer import Serializer


class Group(db.Model, Serializer):
    __private__ = ('id')

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    user = db.relationship("User", back_populates="own_groups")

    __table_args__ = (db.UniqueConstraint('name', 'user_id', name='group_name_user_id_uc'), )

    def __init__(self, name, user_id):
        self.name = name
        self.user_id = user_id

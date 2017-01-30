from application import db
from serializer import Serializer
from users.models import user_group_association

share_group_association = db.Table('share_group_association', db.Model.metadata,
    db.Column('share_id', db.Integer, db.ForeignKey('share.id', ondelete="CASCADE"), nullable=False),
    db.Column('group_id', db.Integer, db.ForeignKey('group.id', ondelete="CASCADE"), nullable=False),
    db.UniqueConstraint('share_id', 'group_id', name='share_group_association_uc')
)

class Group(db.Model, Serializer):
    __private__ = ('id')

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    user = db.relationship("User", back_populates="own_groups")

    members = db.relationship("User", secondary=user_group_association, back_populates="in_groups")

    shares = db.relationship("Share", secondary=share_group_association, back_populates="groups")

    __table_args__ = (db.UniqueConstraint('name', 'user_id', name='group_name_user_id_uc'), )

    def __init__(self, name, user_id):
        self.name = name
        self.user_id = user_id

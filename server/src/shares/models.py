from application import db
from serializer import Serializer
from groups.models import share_group_association


class Share(db.Model, Serializer):
    __private__ = ('id')

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)

    device_id = db.Column(db.Integer, db.ForeignKey('device.id', ondelete="CASCADE"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    device = db.relationship("Device", back_populates="shares")
    user = db.relationship("User", back_populates="shares")
    paths = db.relationship("Path", back_populates="share")
    groups = db.relationship("Group", secondary=share_group_association, back_populates="shares")

    __table_args__ = (db.UniqueConstraint('name', 'user_id', name='shares_name_user_id_uc'), )

    def __init__(self, name, user_id, device_id):
        self.name = name
        self.user_id = user_id
        self.device_id = device_id

class Path(db.Model, Serializer):
    __private__ = ('id')

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    path = db.Column(db.String(350), nullable=False)

    share_id = db.Column(db.Integer, db.ForeignKey('share.id', ondelete="CASCADE"), nullable=False)
    share = db.relationship("Share", back_populates="paths")

    __table_args__ = (db.UniqueConstraint('name', 'share_id', name='paths_name_share_id_uc'), )

    def __init__(self, name, path, share_id):
        self.name = name
        self.path = path
        self.share_id = share_id

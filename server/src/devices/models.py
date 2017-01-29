from application import db
from serializer import Serializer


class Device(db.Model, Serializer):
    __private__ = ('id', 'user_id', 'user')

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    address = db.Column(db.String(80), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    user = db.relationship("User", back_populates="devices")
    shares = db.relationship("Share", back_populates="device")


    __table_args__ = (db.UniqueConstraint('name', 'user_id', name='name_user_uc'), )

    def __init__(self, name, address, user_id):
        self.name = name
        self.address = address
        self.user_id = user_id

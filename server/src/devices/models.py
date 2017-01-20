from application import db
from serializer import Serializer


class Device(db.Model, Serializer):
    __private__ = ('id')

    id = db.Column(db.Integer, primary_key=True)

    def __init__(self):
        pass
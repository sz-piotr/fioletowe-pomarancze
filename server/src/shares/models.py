from application import db
from serializer import Serializer


class Share(db.Model, Serializer):
    __private__ = ('id')

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)

    def __init__(self, name):
        self.name = name

class Path(db.Model, Serializer):
    __private__ = ('id')

    id = db.Column(db.Integer, primary_key=True)

    def __init__(self):
        pass

from sqlalchemy.inspection import inspect


class Serializer(object):

    def serialize(self, exclude=()):
        return {
            c: getattr(self, c)
            for c in inspect(self).attrs.keys()
            if c not in exclude and c not in self.__private__
        }

    @staticmethod
    def serialize_list(lst, exclude=()):
        return [m.serialize(exclude=exclude) for m in lst]

from users import users
from users.user import User

@users.route('/list', methods=['GET'])
def list():
  us = User.query.all()
  print(len(us))
  return ", ".join([x.username for x in us])

from application import app, db
from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand

from users.user import User
from animals import animals
from greetings import greetings
from accounts import accounts
from users import users

app.register_blueprint(animals)
app.register_blueprint(greetings)
app.register_blueprint(accounts)
app.register_blueprint(users)

migrate = Migrate(app, db)
manager = Manager(app)

session = db.session

@manager.command
def seed():
  """Add some users."""
  session.add(User(username="ble", email="ble@ble.com"))
  session.add(User(username="bla", email="bla@bla.com"))
  session.commit()

manager.add_command('db', MigrateCommand)

if __name__ == '__main__':
    manager.run()

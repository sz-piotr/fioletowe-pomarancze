from flask import Blueprint, jsonify, request

greetings = Blueprint('greetings', __name__, url_prefix='/greetings')


@greetings.route('')
@greetings.route('/<name>')
def hello(name='stranger'):
    return 'Greetings ' + name + '!\n'

from flask import Blueprint, jsonify, request, g
from http import HTTPStatus
from database import transactional

animals = Blueprint('animals', __name__, url_prefix='/animals')


@animals.route('', methods=['GET'])
@transactional
def get_animals():
    g.cursor.execute("SELECT * FROM animals")
    return jsonify(g.cursor.fetchall())


@animals.route('/<int:id>', methods=['GET'])
@transactional
def get_animal(id):
    g.cursor.execute("SELECT * FROM animals WHERE id = %s", (id, ))
    return jsonify(g.cursor.fetchone())


@animals.route('', methods=['PUT'])
@transactional
def put_animal():
    data = request.get_json()
    g.cursor.execute("INSERT INTO animals (name, sound) VALUES (%s, %s)", (data['name'], data['sound']))
    return ('', HTTPStatus.NO_CONTENT)


@animals.route('/<int:id>', methods=['DELETE'])
@transactional
def delete_animal(id):
    g.cursor.execute("DELETE FROM animals WHERE id = %s", (id, ))
    return ('', HTTPStatus.NO_CONTENT)

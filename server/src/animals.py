from flask import Blueprint, jsonify, request
from http import HTTPStatus
from database import transactional

animals = Blueprint('animals', __name__, url_prefix='/animals')


@animals.route('', methods=['GET'])
@transactional
def get_animals(cursor):
    cursor.execute("SELECT * FROM animals;")
    data = cursor.fetchall()
    print(data)
    return jsonify(data)


@animals.route('/<int:id>', methods=['GET'])
@transactional
def get_animal(cursor, id):
    cursor.execute("SELECT * FROM animals WHERE id = %s", (id, ))
    data = cursor.fetchone()
    print(data)
    return jsonify(data)


@animals.route('', methods=['PUT'])
@transactional
def put_animal(cursor):
    data = request.get_json()
    cursor.execute("INSERT INTO animals (name, sound) VALUES (%s, %s)", (data['name'], data['sound']))
    return ('', HTTPStatus.NO_CONTENT)


@animals.route('/<int:id>', methods=['DELETE'])
@transactional
def delete_animal(cursor, id):
    cursor.execute("DELETE FROM animals WHERE id = %s", (id, ))
    return ('', HTTPStatus.NO_CONTENT)

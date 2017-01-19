add_user = {
    '$schema': 'http://json-schema.org/draft-04/schema#',
    'type': 'object',
    'properties': {
        'username': {
            'type': 'string'
        },
        'email': {
            'type': 'string'
        },
        'password': {
            'type': 'string'
        }
    },
    'required': ['username', 'email', 'password']
}

add_devices = {
    '$schema': 'http://json-schema.org/draft-04/schema#',
    'type': 'object',
    'properties': {
        'devices': {
            'type': 'array',
            'items': {
                'type': 'object',
                'properties': {
                    'name': {
                        'type': 'string'
                    },
                    'address': {
                        'type': 'string'
                    }
                },
                'required': ['name', 'address']
            },
            'minItems': 1
        }
    },
    'required': ['devices']
}

remove_devices = {
    '$schema': 'http://json-schema.org/draft-04/schema#',
    'type': 'object',
    'properties': {
        'devices': {
            'type': 'array',
            'items': {
                'type': 'object',
                'properties': {
                    'name': {
                        'type': 'string'
                    }
                },
                'required': ['name']
            },
            'minItems': 1
        }
    },
    'required': ['devices']
}

add_share = {
    '$schema': 'http://json-schema.org/draft-04/schema#',
    'type': 'object',
    'properties': {
        'device': {
            'type': 'string'
        }
    },
    'required': ['device']
}

add_path = {
    '$schema': 'http://json-schema.org/draft-04/schema#',
    'type': 'object',
    'properties': {
        'path': {
            'type': 'string'
        }
    },
    'required': ['path']
}

verify_access_token = {
    '$schema': 'http://json-schema.org/draft-04/schema#',
    'type': 'object',
    'properties': {
        'issuer': {
            'type': 'object',
            'properties': {
                'token': {
                    'type': 'string'
                }
            },
            'required': ['token']
        },
        'request': {
            'type': 'object',
            'properties': {
                'share': {
                    'type': 'string'
                },
                'path': {
                    'type': 'string'
                }
            },
            'required': ['share', 'path']
        }
    },
    'required': ['issuer', 'request']
}

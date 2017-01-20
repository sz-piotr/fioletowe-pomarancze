add_groups = {
    '$schema': 'http://json-schema.org/draft-04/schema#',
    'type': 'object',
    'properties': {
        'groups': {
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
    'required': ['groups']
}

remove_groups = add_groups

add_members = add_groups = {
    '$schema': 'http://json-schema.org/draft-04/schema#',
    'type': 'object',
    'properties': {
        'members': {
            'type': 'array',
            'items': {
                'type': 'object',
                'properties': {
                    'email': {
                        'type': 'string'
                    }
                },
                'required': ['name']
            },
            'minItems': 1
        }
    },
    'required': ['members']
}

remove_members = add_members

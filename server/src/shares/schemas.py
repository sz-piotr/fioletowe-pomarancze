add_shares = {
    '$schema': 'http://json-schema.org/draft-04/schema#',
    'type': 'object',
    'properties': {
        'shares': {
            'type': 'array',
            'items': {
                'type': 'object',
                'properties': {
                    'name': {
                        'type': 'string'
                    },
                    'device': {
                        'type': 'string'
                    }
                },
                'required': ['name', 'device']
            },
            'minItems': 1
        }
    },
    'required': ['shares']
}

remove_shares = {
    '$schema': 'http://json-schema.org/draft-04/schema#',
    'type': 'object',
    'properties': {
        'shares': {
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
    'required': ['shares']
}

add_paths = {
    '$schema': 'http://json-schema.org/draft-04/schema#',
    'type': 'object',
    'properties': {
        'paths': {
            'type': 'array',
            'items': {
                'type': 'object',
                'properties': {
                    'name': {
                        'type': 'string'
                    },
                    'path': {
                        'type': 'string'
                    }
                },
                'required': ['name', 'path']
            },
            'minItems': 1
        }
    },
    'required': ['paths']
}

remove_paths = {
    '$schema': 'http://json-schema.org/draft-04/schema#',
    'type': 'object',
    'properties': {
        'paths': {
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
    'required': ['paths']
}

add_to_groups = {
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

remove_from_groups = add_to_groups

verify_access_token= {
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

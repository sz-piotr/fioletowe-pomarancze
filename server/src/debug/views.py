from debug import debug
import urllib
from flask import jsonify, url_for
from application import app


@debug.route('/debug/routes', methods=['GET'])
def list():
    output = []
    for rule in app.url_map.iter_rules():
        options = {}
        for arg in rule.arguments:
            options[arg] = "[{0}]".format(arg)

        methods = ','.join(rule.methods)
        url = url_for(rule.endpoint, **options)
        path = {
            "endpoint": rule.endpoint,
            "methods": methods.split(','),
            "url": urllib.parse.unquote(url)
        }
        output.append(path)
    return jsonify(output)

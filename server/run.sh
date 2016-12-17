export FLASK_APP=src/application.py
export PROPERTIES_FILE=../application.cfg
export FLASK_DEBUG=1
flask $@

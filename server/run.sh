export FLASK_APP=src/application.py
export PROPERTIES_FILE=../application.cfg

case "$1" in
    "" )
        flask run
        ;;
    * )
        flask $@
        ;;
esac

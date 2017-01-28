@echo off
set FLASK_APP=src/application.py
set PROPERTIES_FILE=../application.cfg

if NOT "%1"=="" goto ARG
flask run
goto END
:ARG
flask %*
:END

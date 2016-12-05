# Środowisko wirtualne

Środowisko wirtualne tworzone jest za pomocą `virtualenv`
```
sudo apt-get update
sudo apt-get install virtualenv
```

Bardzo ważne jest aby utworzyć środowisko dla `python 3.5`
```
virtualenv -p /usr/bin/python3 venv
source venv/bin/activate
```

Od tej chwili wszystkie komendy wykonywane są w wirtualnym środowisku.

# Instalacja zależności

Aby zainstalować wszystkie wymagane biblioteki:
```
pip install -r requirements.txt
```
Możliwe że będzie też konieczne zainstalowanie `libpq-dev`


# Uruchamianie aplikacji

Aby uruchomić serwer aplikacji:
```
./run.sh
```

Od tej chwili aplikacja dostępna jest pod adresem:
```
http://localhost:5000
```

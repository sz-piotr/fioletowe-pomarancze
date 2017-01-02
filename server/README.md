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

# Zarządzanie bazą danych

Aby przenieść zmiany modelu do kontroli wersji bazy danych
```
./run.sh db migrate
```

Aby dokonać synchronizacji bazy z kodem
```
./run.sh db upgrade
```

# Uruchamianie aplikacji

Przed uruchomieniem aplikacji należy w katalogu `server` utworzyć plik `application.cfg`. Należy się przy tym kierować zawartością pliku wzorcowego `application.cfg.template`. Plik konfiguracyjny `application.cfg` wykluczony jest z kontroli wersji aby każdy developer mógł korzystać z własnej, niezależnej konfiguracji.

Aby uruchomić serwer aplikacji:
```
Linux: ./run.sh
Winows: run.bat
```

Od tej chwili aplikacja dostępna jest pod adresem:
```
http://localhost:5000
```

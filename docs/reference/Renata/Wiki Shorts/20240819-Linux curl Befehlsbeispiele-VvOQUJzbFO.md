# Linux curl Befehlsbeispiele


## HTTP GET-Operation
- `curl http://abc.com`  
  Eine URL abrufen und ihren Inhalt anzeigen.

- `curl -o ausgabe.txt http://abc.com`  
  Antwort in einer Datei speichern.

- `curl -A "Mozilla/5.0" http://abc.com`  
  User-Agent setzen.

- `curl -e http://referer.com http://abc.com`  
  Einen Referer angeben.

- `curl -x http://proxy.com:port http://abc.com`  
  HTTP-Proxy verwenden.

- `curl -H "Authorization: bearer-token" http://abc.com`  
  Benutzerdefinierte Header verwenden.

- `curl -u benutzername:passwort http://abc.com`  
  Benutzerauthentifizierung verwenden.

- `curl -L http://abc.com`  
  Umleitungen folgen bis zum endgültigen Ziel.

- `curl -b /pfad/zur/cookie http://abc.com`  
  Eine lokale Cookie-Datei lesen.

- `curl -c /pfad/zur/cookie http://abc.com`  
  Eine empfangene Cookie-Datei schreiben.

- `curl --compressed http://abc.com`  
  Antwort automatisch dekomprimieren.

## HTTP POST/PUT-Operation
- `curl -X POST -d "schluessel1=wert1&schluessel2=wert2" http://abc.com`  
  Schlüssel-Wert-Paare in POST angeben.

- `curl -X POST -d '{"k1":"v1"}' -H "Content-Type: application/json" http://abc.com`  
  JSON-Daten verwenden.

- `curl -X POST -F "name=dan" -F "datei=@/pfad/zur/datei.txt" http://abc.com`  
  Datei-Upload.

- `curl -X POST --data-binary @/pfad/zur/datei.bin http://abc.com`  
  Binärdatei-Upload.

- `curl -X PUT -d "schluessel1=wert1&schluessel2=wert2" http://abc.com`  
  Schlüssel-Wert-Paare in PUT angeben.

## Datei-Download-Operation
- `curl -O http://abc.com/datei.zip`  
  Eine Datei herunterladen und unter demselben Namen speichern.

- `curl -O -C - http://abc.com/datei.zip`  
  Einen teilweisen Download fortsetzen.

- `curl --limit-rate 1M -O http://abc.com/datei.zip`  
  Download auf 1MB/s begrenzen.

- `curl --remote-name-all http://abc.com/bild[1-10].jpg`  
  Mehrere Dateien herunterladen.

- `curl http://{foo,bar}.com/index.htm --output "#1.htm"`  
  Von mehreren Domains herunterladen.

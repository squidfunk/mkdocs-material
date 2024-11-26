# Linux-Dateiberechtigungen


## Darstellung der Dateiberechtigungen
- **Symbolische Notation:** `rwxrw-rw-`
- **Numerische (Oktale) Notation:** `766`

## Felder in der `ls -l` Ausgabe
- **drwxrwxr-x:** Verzeichnis mit Benutzer/Gruppe/Andere-Berechtigungen.
- **Besitzer:** Der Benutzer, dem die Datei gehört.
- **Gruppe:** Die Gruppe, der die Datei gehört.
- **Berechtigungen:** Die Berechtigungen für Benutzer, Gruppe und Andere.
- **Dateityp:** d (Verzeichnis), - (Datei), usw.

### Befehl zum Ändern von Berechtigungen
- **Änderung durch Andere verbieten:** `chmod 764 run.py` oder `chmod g-w run.py`.

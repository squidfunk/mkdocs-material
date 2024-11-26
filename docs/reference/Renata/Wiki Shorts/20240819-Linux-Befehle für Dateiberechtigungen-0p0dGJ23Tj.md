# Linux-Befehle für Dateiberechtigungen


## chmod: Dateiberechtigungen für Besitzer/Gruppe/Andere setzen/ändern
- **Leseberechtigung erteilen:** `chmod u+r meine.txt`
- **Schreibberechtigung entfernen:** `chmod g-w meine.txt`
- **Berechtigungen für alle anpassen:** `chmod u+rwx,o+r meine.txt`
- **Berechtigung über numerischen Modus ändern:** `chmod 754 meine.txt`

## setfacl: Feinere Kontrolle über Dateiberechtigungen ermöglichen
- **Berechtigungen für Benutzer erteilen:** `setfacl -m u:dan:rw meine.txt`
- **Spezifische ACL entfernen:** `setfacl -x u:dan meine.txt`
- **Alle ACLs entfernen:** `setfacl -b meine.txt`
- **Ausführungsberechtigung für Gruppe erteilen:** `setfacl -m g:entwickler:x mein.sh`

## find & chmod: Dateiberechtigungen für mehrere Dateien basierend auf Kriterien ändern
- **Ausführungsberechtigungen für alle `.sh`-Dateien setzen:**  
  `find . -type f -name "*.sh" -exec chmod +x {} \;`
- **Schreibgeschützte Berechtigungen für alle Dateien setzen, die älter als 30 Tage sind:**  
  `find . -type f -mtime +30 -exec chmod 444 {} \;`
- **Dateiberechtigungen für alle Dateien von Dan ändern:**  
  `find . -type f -user dan -exec chmod 700 {} \;`

## umask: Standardberechtigungen für neu erstellte Dateien und Verzeichnisse setzen
- **Standard-Dateiberechtigung:** `umask 022`

## install: Dateien kopieren und ihre Berechtigungen und Eigentümerschaft in einem Schritt setzen
- **Datei mit spezifischen Berechtigungen kopieren:** `install -m 755 meine.conf /etc`

## rsync: Datei- und Verzeichnisberechtigungen beim Kopieren setzen
- **Rsync mit Berechtigungsänderungen:** `rsync -av --chmod=D2775,F664 quelle/ ziel/`

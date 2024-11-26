# Debian OS Spickzettel



## 1. Grundlegende Systembefehle

- **System aktualisieren:**
  ```bash
  sudo apt update && sudo apt upgrade
  ```
  Aktualisiert die Liste der verfügbaren Pakete und installiert die neuesten Versionen der installierten Pakete.

- **Neustart des Systems:**
  ```bash
  sudo reboot
  ```
  Startet das System neu.

- **System herunterfahren:**
  ```bash
  sudo shutdown -h now
  ```
  Fährt das System sofort herunter.

- **Überprüfen der Debian-Version:**
  ```bash
  lsb_release -a
  ```
  Zeigt die installierte Debian-Version und -Details an.

## 2. Paketverwaltung

- **Ein Paket installieren:**
  ```bash
  sudo apt install <paketname>
  ```
  Installiert das angegebene Paket.

- **Ein Paket entfernen:**
  ```bash
  sudo apt remove <paketname>
  ```
  Entfernt das angegebene Paket, behält jedoch die Konfigurationsdateien.

- **Alle ungenutzten Pakete entfernen:**
  ```bash
  sudo apt autoremove
  ```
  Entfernt alle automatisch installierten Pakete, die nicht mehr benötigt werden.

## 3. Systemüberwachung und Informationen

- **Systeminformationen anzeigen:**
  ```bash
  uname -a
  ```
  Zeigt grundlegende Systeminformationen wie Kernel-Version und Architektur an.

- **Speichernutzung überwachen:**
  ```bash
  free -h
  ```
  Zeigt die Speichernutzung im human-readable Format an.

- **Festplattennutzung anzeigen:**
  ```bash
  df -h
  ```
  Zeigt die Festplattennutzung aller Dateisysteme an.

## 4. Benutzer- und Rechteverwaltung

- **Neuen Benutzer hinzufügen:**
  ```bash
  sudo adduser <benutzername>
  ```
  Erstellt einen neuen Benutzer auf dem System.

- **Benutzer zur sudo-Gruppe hinzufügen:**
  ```bash
  sudo usermod -aG sudo <benutzername>
  ```
  Fügt den Benutzer zur Gruppe "sudo" hinzu.

- **Dateien und Verzeichnisse auflisten (mit Rechten):**
  ```bash
  ls -l
  ```
  Listet Dateien und Verzeichnisse mit detaillierten Informationen und Rechten auf.

## 5. Netzwerkverwaltung

- **Netzwerkkonfiguration anzeigen:**
  ```bash
  ip a
  ```
  Zeigt die Konfiguration aller Netzwerk-Schnittstellen an.

- **Ping-Befehl zur Netzwerktestung:**
  ```bash
  ping -c 4 google.com
  ```
  Sendet 4 Pakete an google.com zur Überprüfung der Netzwerkverbindung.

- **Firewall-Status überprüfen:**
  ```bash
  sudo ufw status
  ```
  Zeigt den Status der UFW (Uncomplicated Firewall) an.

# Debian 12 Systemverwaltung Cheat Sheet



## 1. Paketverwaltung mit `dpkg`

- **Alle installierten Pakete auflisten:**
  ```bash
  dpkg -l | grep ^ii
  ```
  Listet alle installierten Pakete im System auf.

- **Überprüfen, ob ein Paket installiert ist:**
  ```bash
  dpkg -l | grep <paket-name>
  ```
  Ersetzen Sie `<paket-name>` durch den Namen des zu überprüfenden Pakets.

- **Ein `.deb` Paket installieren:**
  ```bash
  sudo dpkg -i /pfad/zum/paket.deb
  ```
  Installiert ein `.deb` Paket aus einer Datei.

- **Ein Paket entfernen (Konfigurationsdateien behalten):**
  ```bash
  sudo dpkg --remove <paket-name>
  ```
  Entfernt das Paket, behält jedoch die Konfigurationsdateien bei.

- **Ein Paket vollständig entfernen (Konfigurationsdateien löschen):**
  ```bash
  sudo dpkg --purge <paket-name>
  ```
  Entfernt das Paket und seine Konfigurationsdateien.

- **Beschädigte Abhängigkeiten reparieren:**
  ```bash
  sudo apt --fix-broken install
  ```
  Repariert durch unvollständige Installationen verursachte Abhängigkeitsprobleme.

## 2. Paketverwaltung mit `apt`

- **Paketliste aktualisieren:**
  ```bash
  sudo apt update
  ```
  Aktualisiert die Liste der verfügbaren Pakete aus den Repositories.

- **Alle installierten Pakete aktualisieren:**
  ```bash
  sudo apt upgrade
  ```
  Aktualisiert alle installierten Pakete auf die neueste Version.

- **Vollständige Aktualisierung (einschließlich Abhängigkeiten):**
  ```bash
  sudo apt full-upgrade
  ```
  Aktualisiert Pakete, einschließlich der Abhängigkeiten, auf neue Versionen.

- **Nach einem Paket suchen:**
  ```bash
  apt search <paket-name>
  ```
  Sucht nach einem Paket in den Repositories.

- **Nicht verwendete Pakete entfernen:**
  ```bash
  sudo apt autoremove
  ```
  Entfernt Pakete, die automatisch installiert wurden, um Abhängigkeiten zu erfüllen und nicht mehr benötigt werden.

## 3. Erweiterte Paketverwaltung

- **Manuell installierte Pakete finden und entfernen:**
  ```bash
  comm -23 <(apt-mark showmanual | sort) <(apt-cache pkgnames | sort)
  ```
  Listet manuell installierte Pakete auf, die möglicherweise entfernt werden können.

- **Problematische Pakete zwangsweise entfernen:**
  ```bash
  sudo dpkg --purge --force-all <paket-name>
  ```
  Entfernt ein Paket und alle zugehörigen Dateien zwangsweise.

- **Den Paket-Cache bereinigen:**
  ```bash
  sudo apt clean
  ```
  Löscht das lokale Repository der heruntergeladenen Paketdateien.

## 4. Systembereinigung und -wartung

- **Verbleibende Konfigurationsdateien bereinigen:**
  ```bash
  dpkg -l | grep '^rc' | awk '{print $2}' | xargs sudo dpkg --purge
  ```
  Entfernt verbleibende Konfigurationsdateien von zuvor entfernten Paketen.

- **Speichernutzung anzeigen:**
  ```bash
  df -h
  ```
  Zeigt die Speichernutzung aller Dateisysteme in einem lesbaren Format an.

- **Große Dateien finden und entfernen:**
  ```bash
  sudo find / -type f -size +100M
  ```
  Findet alle Dateien, die größer als 100 MB sind, um große Dateien zu identifizieren und ggf. zu entfernen.

## 5. Systeminformationen und -überwachung

- **Systeminformationen überprüfen:**
  ```bash
  lsb_release -a
  ```
  Zeigt detaillierte Informationen zur Debian-Version an.

- **Systemressourcen überwachen:**
  ```bash
  top
  ```
  Echtzeit-Systemmonitor, der die CPU- und Speichernutzung der Prozesse anzeigt.

- **Detaillierten Systemstatus anzeigen:**
  ```bash
  htop
  ```
  Eine verbesserte, interaktive Version von `top` (Installation erforderlich: `sudo apt install htop`).

- **Speichernutzung nach Verzeichnis anzeigen:**
  ```bash
  du -sh /*
  ```
  Zeigt die Speichernutzung für jedes Verzeichnis auf der Root-Ebene an.

## 6. Verwaltung von Diensten und Systemd

- **Alle laufenden Dienste auflisten:**
  ```bash
  systemctl list-units --type=service
  ```
  Listet alle aktiven Dienste auf, die von `systemd` verwaltet werden.

- **Einen Dienst starten/stoppen/neustarten:**
  ```bash
  sudo systemctl start|stop|restart <dienst-name>
  ```
  Startet, stoppt oder startet einen Dienst neu (ersetzen Sie `<dienst-name>` durch den tatsächlichen Dienstnamen).

- **Einen Dienst beim Start aktivieren/deaktivieren:**
  ```bash
  sudo systemctl enable|disable <dienst-name>
  ```
  Aktiviert oder deaktiviert einen Dienst, damit er beim Start ausgeführt wird.

## 7. Benutzerverwaltung

- **Einen neuen Benutzer hinzufügen:**
  ```bash
  sudo adduser <benutzername>
  ```
  Fügt einen neuen Benutzer zum System hinzu.

- **Einen Benutzer löschen:**
  ```bash
  sudo deluser <benutzername>
  ```
  Löscht einen Benutzer, behält jedoch dessen Home-Verzeichnis bei.

- **Einen Benutzer und sein Home-Verzeichnis löschen:**
  ```bash
  sudo deluser --remove-home <benutzername>
  ```
  Löscht einen Benutzer und dessen Home-Verzeichnis.

## 8. Datei- und Verzeichnisverwaltung

- **Besitz von Datei/Verzeichnis ändern:**
  ```bash
  sudo chown <benutzer>:<gruppe> /pfad/zu/datei_oder_verzeichnis
  ```
  Ändert den Besitz einer Datei oder eines Verzeichnisses.

- **Berechtigungen von Datei/Verzeichnis ändern:**
  ```bash
  sudo chmod 755 /pfad/zu/datei_oder_verzeichnis
  ```
  Ändert die Berechtigungen einer Datei oder eines Verzeichnisses.

## 9. Netzwerkverwaltung

- **Netzwerkkonfiguration anzeigen:**
  ```bash
  ip a
  ```
  Zeigt alle Netzwerkschnittstellen und deren Konfiguration an.

- **Netzwerkdienst neu starten:**
  ```bash
  sudo systemctl restart networking
  ```
  Startet den Netzwerkdienst neu.

- **Netzwerkkonnektivität testen:**
  ```bash
  ping -c 4 google.com
  ```
  Sendet 4 Pakete an `google.com`, um die Netzwerkkonnektivität zu überprüfen.

## 10. Sicherheit und System-Updates

- **System sicher aktualisieren und upgraden:**
  ```bash
  sudo apt update && sudo apt upgrade
  ```
  Stellt sicher, dass alle Pakete auf dem neuesten Stand und sicher gepatcht sind.

- **Verfügbare Sicherheitsupdates prüfen:**
  ```bash
  apt list --upgradable | grep -i security
  ```
  Listet nur die verfügbaren Sicherheitsupdates auf.

## Nützliche Tools zur Installation

- **GDebi**: Ein leichtes Tool zur Installation von `.deb` Dateien und automatischen Auflösung von Abhängigkeiten.
  ```bash
  sudo apt install gdebi
  ```

- **Aptitude**: Ein fortgeschritteneres, benutzerfreundliches terminalbasiertes Paketverwaltungstool.
  ```bash
  sudo apt install aptitude
  ```

- **HTop**: Ein interaktiver Prozess-Viewer und Systemmonitor.
  ```bash
  sudo apt install htop
  ```

- **Stacer**: Ein grafischer Systemoptimierer und Monitor.
  ```bash
  sudo apt install stacer
  ```

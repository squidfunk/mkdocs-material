# DEB-Paketverwaltung Spickzettel



## 1. Grundlegende Befehle zur Paketverwaltung

- **Ein `.deb`-Paket installieren:**
  ```bash
  sudo dpkg -i /pfad/zu/paket.deb
  ```
  Installiert ein `.deb`-Paket von einer lokalen Datei.

- **Fehlende Abhängigkeiten nach der Installation beheben:**
  ```bash
  sudo apt --fix-broken install
  ```
  Repariert Abhängigkeitsprobleme, die durch die Installation eines `.deb`-Pakets verursacht wurden.

- **Ein installiertes Paket entfernen (Konfigurationsdateien bleiben erhalten):**
  ```bash
  sudo dpkg --remove <paketname>
  ```
  Entfernt ein installiertes Paket, behält aber die Konfigurationsdateien.

- **Ein Paket vollständig entfernen (einschließlich Konfigurationsdateien):**
  ```bash
  sudo dpkg --purge <paketname>
  ```
  Entfernt ein installiertes Paket und alle zugehörigen Konfigurationsdateien.

## 2. Paketinformationen und Abfragen

- **Alle installierten Pakete auflisten:**
  ```bash
  dpkg -l
  ```
  Listet alle auf dem System installierten Pakete auf.

- **Informationen zu einem bestimmten Paket anzeigen:**
  ```bash
  dpkg -s <paketname>
  ```
  Zeigt detaillierte Informationen zu einem installierten Paket an.

- **Dateien, die zu einem installierten Paket gehören, auflisten:**
  ```bash
  dpkg -L <paketname>
  ```
  Listet alle Dateien auf, die zu einem installierten Paket gehören.

## 3. Arbeit mit `.deb`-Dateien

- **Inhalt eines `.deb`-Pakets anzeigen:**
  ```bash
  dpkg-deb --contents /pfad/zu/paket.deb
  ```
  Zeigt den Inhalt einer `.deb`-Datei an, ohne sie zu installieren.

- **Ein `.deb`-Paket extrahieren:**
  ```bash
  dpkg-deb -x /pfad/zu/paket.deb /zielverzeichnis
  ```
  Extrahiert den Inhalt eines `.deb`-Pakets in ein Zielverzeichnis.

- **Ein `.deb`-Paket erstellen:**
  ```bash
  dpkg-deb --build /pfad/zum/verzeichnis/
  ```
  Erstellt ein `.deb`-Paket aus einem Verzeichnis.

## 4. Fortgeschrittene Paketverwaltung

- **Ein kaputtes Paket zwangsweise entfernen:**
  ```bash
  sudo dpkg --remove --force-remove-reinstreq <paketname>
  ```
  Entfernt ein kaputtes oder teilweise installiertes Paket zwangsweise.

- **Konfigurationsdateien bereinigen:**
  ```bash
  dpkg -l | grep '^rc' | awk '{print $2}' | xargs sudo dpkg --purge
  ```
  Entfernt alle verbliebenen Konfigurationsdateien von zuvor entfernten Paketen.

- **Paketinformationen neu konfigurieren:**
  ```bash
  sudo dpkg-reconfigure <paketname>
  ```
  Führt die Paketkonfiguration für ein installiertes Paket erneut aus.

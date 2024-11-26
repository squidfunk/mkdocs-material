# Nala Paketverwaltung Spickzettel



## 1. Grundlegende Befehle

- **Paketlisten aktualisieren:**
  ```bash
  sudo nala update
  ```
  Aktualisiert die Liste der verfügbaren Pakete aus den Repositories.

- **Alle installierten Pakete aktualisieren:**
  ```bash
  sudo nala upgrade
  ```
  Aktualisiert alle installierten Pakete auf die neueste Version.

- **Paket installieren:**
  ```bash
  sudo nala install <paketname>
  ```
  Installiert das angegebene Paket.

- **Paket entfernen:**
  ```bash
  sudo nala remove <paketname>
  ```
  Entfernt das Paket, behält aber die Konfigurationsdateien bei.

- **Paket vollständig entfernen (einschließlich Konfigurationsdateien):**
  ```bash
  sudo nala purge <paketname>
  ```
  Entfernt das Paket und seine Konfigurationsdateien.

## 2. Erweiterte Paketverwaltung

- **Nach einem Paket suchen:**
  ```bash
  nala search <paketname>
  ```
  Durchsucht die Repositories nach einem Paket.

- **Pakete auflisten, die aktualisiert werden können:**
  ```bash
  nala list --upgradable
  ```
  Listet alle Pakete auf, die aktualisiert werden können.

- **Nicht verwendete Pakete entfernen:**
  ```bash
  sudo nala autoremove
  ```
  Entfernt Pakete, die automatisch installiert wurden, um Abhängigkeiten zu erfüllen und jetzt nicht mehr benötigt werden.

## 3. Systemwartung

- **Paketcache bereinigen:**
  ```bash
  sudo nala clean
  ```
  Entfernt alle heruntergeladenen Paketdateien aus dem lokalen Cache.

- **Fehlende Abhängigkeiten reparieren:**
  ```bash
  sudo nala fix
  ```
  Repariert fehlende Abhängigkeiten, die durch unvollständige Installationen verursacht wurden.

## 4. Paketquellen und Repositories

- **Repository zu den Paketquellen hinzufügen:**
  ```bash
  sudo nala add-repo <repository-url>
  ```
  Fügt ein neues Repository zu den Paketquellen hinzu.

- **Paketliste von einem bestimmten Repository aktualisieren:**
  ```bash
  sudo nala update
  ```
  Aktualisiert die Paketlisten von allen konfigurierten Quellen.

## 5. Nützliche Optionen und Parameter

- **Nur die Paketlisten aktualisieren, ohne zu installieren:**
  ```bash
  sudo nala update
  ```
  Führt eine Aktualisierung der Paketlisten durch, ohne Pakete zu installieren.

- **Details während der Installation anzeigen:**
  ```bash
  sudo nala install <paketname> -y
  ```
  Führt die Installation durch und beantwortet alle Fragen automatisch mit "Ja".

- **Simulierte Installation anzeigen (ohne Installation durchzuführen):**
  ```bash
  sudo nala install --simulate <paketname>
  ```
  Zeigt, was passieren würde, wenn das Paket installiert wird, ohne die Installation tatsächlich durchzuführen.

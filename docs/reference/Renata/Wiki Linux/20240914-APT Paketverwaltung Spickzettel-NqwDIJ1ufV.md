# APT Paketverwaltung Spickzettel



## 1. Grundlegende Befehle

- **Paketlisten aktualisieren:**
  ```bash
  sudo apt update
  ```
  Aktualisiert die Liste der verfügbaren Pakete aus den Repositories.

- **Alle installierten Pakete aktualisieren:**
  ```bash
  sudo apt upgrade
  ```
  Aktualisiert alle installierten Pakete auf die neueste Version.

- **Vollständiges Upgrade (einschließlich Abhängigkeiten):**
  ```bash
  sudo apt full-upgrade
  ```
  Führt ein vollständiges Upgrade durch, bei dem Pakete und Abhängigkeiten aktualisiert werden.

- **Paket installieren:**
  ```bash
  sudo apt install <paketname>
  ```
  Installiert das angegebene Paket.

- **Paket entfernen:**
  ```bash
  sudo apt remove <paketname>
  ```
  Entfernt das Paket, behält aber die Konfigurationsdateien bei.

- **Paket vollständig entfernen (einschließlich Konfigurationsdateien):**
  ```bash
  sudo apt purge <paketname>
  ```
  Entfernt das Paket und seine Konfigurationsdateien.

## 2. Erweiterte Paketverwaltung

- **Nach einem Paket suchen:**
  ```bash
  apt search <paketname>
  ```
  Durchsucht die Repositories nach einem Paket.

- **Informationen zu einem Paket anzeigen:**
  ```bash
  apt show <paketname>
  ```
  Zeigt detaillierte Informationen zu einem Paket an.

- **Pakete auflisten, die aktualisiert werden können:**
  ```bash
  apt list --upgradable
  ```
  Listet alle Pakete auf, die aktualisiert werden können.

- **Nicht verwendete Pakete entfernen:**
  ```bash
  sudo apt autoremove
  ```
  Entfernt Pakete, die automatisch installiert wurden, um Abhängigkeiten zu erfüllen und jetzt nicht mehr benötigt werden.

## 3. Systemwartung

- **Paketcache bereinigen:**
  ```bash
  sudo apt clean
  ```
  Entfernt alle heruntergeladenen Paketdateien aus dem lokalen Cache.

- **Veraltete Pakete entfernen:**
  ```bash
  sudo apt autoclean
  ```
  Entfernt nur die veralteten Paketdateien aus dem lokalen Cache.

- **Fehlende Abhängigkeiten reparieren:**
  ```bash
  sudo apt --fix-broken install
  ```
  Repariert fehlende Abhängigkeiten, die durch unvollständige Installationen verursacht wurden.

## 4. Paketquellen und Repositories

- **Repository zu den Paketquellen hinzufügen:**
  ```bash
  sudo add-apt-repository <repository-url>
  ```
  Fügt ein neues Repository zu den Paketquellen hinzu.

- **Paketliste von einem bestimmten Repository aktualisieren:**
  ```bash
  sudo apt update
  ```
  Aktualisiert die Paketlisten von allen konfigurierten Quellen.

## 5. Nützliche Optionen und Parameter

- **Nur die Paketlisten aktualisieren, ohne zu installieren:**
  ```bash
  sudo apt update
  ```
  Führt eine Aktualisierung der Paketlisten durch, ohne Pakete zu installieren.

- **Details während der Installation anzeigen:**
  ```bash
  sudo apt install <paketname> -y
  ```
  Führt die Installation durch und beantwortet alle Fragen automatisch mit "Ja".

- **Simulierte Installation anzeigen (ohne Installation durchzuführen):**
  ```bash
  sudo apt install --simulate <paketname>
  ```
  Zeigt, was passieren würde, wenn das Paket installiert wird, ohne die Installation tatsächlich durchzuführen.

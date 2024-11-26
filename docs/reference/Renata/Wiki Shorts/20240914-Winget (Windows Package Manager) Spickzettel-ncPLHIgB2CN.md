# Winget (Windows Package Manager) Spickzettel



## 1. Grundlegende Befehle

- **Winget installieren:**
  Windows 10 und 11 haben Winget standardmäßig installiert. Wenn nicht, können Sie das App-Installer-Paket aus dem Microsoft Store installieren.

- **Paket suchen:**
  ```bash
  winget search <paketname>
  ```
  Sucht nach einem Paket im Winget-Repository.

- **Paket installieren:**
  ```bash
  winget install <paketname>
  ```
  Installiert das angegebene Paket.

- **Paket deinstallieren:**
  ```bash
  winget uninstall <paketname>
  ```
  Deinstalliert das angegebene Paket.

## 2. Verwaltung und Aktualisierung von Paketen

- **Installierte Pakete auflisten:**
  ```bash
  winget list
  ```
  Listet alle mit Winget installierten Pakete auf.

- **Paket aktualisieren:**
  ```bash
  winget upgrade <paketname>
  ```
  Aktualisiert das angegebene Paket auf die neueste Version.

- **Alle Pakete aktualisieren:**
  ```bash
  winget upgrade --all
  ```
  Aktualisiert alle installierten Pakete auf die neueste Version.

## 3. Fortgeschrittene Verwaltung

- **Paketdetails anzeigen:**
  ```bash
  winget show <paketname>
  ```
  Zeigt detaillierte Informationen zu einem bestimmten Paket an.

- **Exportieren aller installierten Pakete in eine Datei:**
  ```bash
  winget export --output pfad/zu/installed-software.md
  ```
  Exportiert eine Liste aller installierten Pakete in eine Markdown-Datei.

- **Importieren und Installieren von Paketen aus einer Datei:**
  ```bash
  winget import --import pfad/zu/installed-software.md
  ```
  Installiert alle Pakete, die in der Exportdatei aufgeführt sind.

## 4. Nützliche Optionen und Parameter

- **Installation eines Pakets erzwingen:**
  ```bash
  winget install <paketname> --force
  ```
  Erzwingt die Installation eines Pakets, auch wenn es bereits installiert ist.

- **Bestätigungen während der Installation unterdrücken:**
  ```bash
  winget install <paketname> --silent
  ```
  Führt die Installation ohne Benutzerinteraktion durch.

- **Winget-Quelle aktualisieren:**
  ```bash
  winget source update
  ```
  Aktualisiert die Paketquellen für Winget.

# Flatpak Software-Verwaltung Spickzettel



## 1. Grundlegende Befehle

- **Flatpak installieren:**
  ```bash
  sudo apt install flatpak
  ```
  Installiert Flatpak auf dem System.

- **Flatpak-Repository hinzufügen:**
  ```bash
  flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
  ```
  Fügt das Flathub-Repository hinzu, das die meisten Flatpak-Anwendungen bereitstellt.

- **Flatpak-Anwendung installieren:**
  ```bash
  flatpak install flathub <anwendungsname>
  ```
  Installiert die angegebene Anwendung von Flathub.

## 2. Verwaltung und Aktualisierung von Anwendungen

- **Installierte Flatpak-Anwendungen auflisten:**
  ```bash
  flatpak list
  ```
  Listet alle installierten Flatpak-Anwendungen auf.

- **Flatpak-Anwendung aktualisieren:**
  ```bash
  flatpak update
  ```
  Aktualisiert alle installierten Flatpak-Anwendungen auf die neueste Version.

- **Flatpak-Anwendung deinstallieren:**
  ```bash
  flatpak uninstall <anwendungsname>
  ```
  Deinstalliert die angegebene Flatpak-Anwendung.

## 3. Weitere nützliche Befehle

- **Detaillierte Informationen zu einer Flatpak-Anwendung anzeigen:**
  ```bash
  flatpak info <anwendungsname>
  ```
  Zeigt detaillierte Informationen zu einer installierten Flatpak-Anwendung an.

- **Flatpak-Anwendungsberechtigungen ändern:**
  ```bash
  flatpak override <anwendungsname> --<berechtigung>
  ```
  Ändert die Berechtigungen einer Flatpak-Anwendung.

- **Flatpak-Anwendungen suchen:**
  ```bash
  flatpak search <suchbegriff>
  ```
  Sucht nach Anwendungen im Flathub-Repository.

## 4. Flatpak Systemverwaltung

- **Nicht verwendete Flatpak-Runtime-Versionen entfernen:**
  ```bash
  flatpak uninstall --unused
  ```
  Entfernt alle nicht mehr benötigten Flatpak-Runtime-Versionen.

- **Flatpak-Systemressourcen bereinigen:**
  ```bash
  flatpak remove --unused
  ```
  Entfernt nicht benötigte Daten und bereinigt den Speicherplatz.

- **Alle installierten Flatpak-Remotes anzeigen:**
  ```bash
  flatpak remotes
  ```
  Listet alle konfigurierten Flatpak-Remotes auf.

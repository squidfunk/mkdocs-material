# PowerShell Spickzettel



## 1. Grundlegende Befehle

- **PowerShell starten:**
  ```bash
  powershell
  ```
  Startet die PowerShell-Sitzung.

- **Verzeichnis anzeigen:**
  ```bash
  Get-ChildItem
  ```
  Listet die Dateien und Verzeichnisse im aktuellen Verzeichnis auf (Alias: `ls` oder `dir`).

- **Verzeichnis wechseln:**
  ```bash
  Set-Location <pfad>
  ```
  Wechselt in das angegebene Verzeichnis (Alias: `cd`).

- **Dateiinhalt anzeigen:**
  ```bash
  Get-Content <datei>
  ```
  Zeigt den Inhalt einer Datei an (Alias: `cat`, `type`).

## 2. Verwaltung und Bearbeitung

- **Datei kopieren:**
  ```bash
  Copy-Item <quelle> <ziel>
  ```
  Kopiert eine Datei oder ein Verzeichnis.

- **Datei verschieben:**
  ```bash
  Move-Item <quelle> <ziel>
  ```
  Verschiebt eine Datei oder ein Verzeichnis.

- **Datei löschen:**
  ```bash
  Remove-Item <pfad>
  ```
  Löscht eine Datei oder ein Verzeichnis.

## 3. Systeminformationen und Überwachung

- **Systeminformationen abrufen:**
  ```bash
  Get-ComputerInfo
  ```
  Zeigt Informationen über das System an.

- **Prozesse anzeigen:**
  ```bash
  Get-Process
  ```
  Listet alle laufenden Prozesse auf.

- **Netzwerkadapter-Informationen anzeigen:**
  ```bash
  Get-NetAdapter
  ```
  Zeigt Informationen zu den Netzwerkadaptern an.

## 4. Skripte und Automatisierung

- **Skript ausführen:**
  ```bash
  .\skriptname.ps1
  ```
  Führt ein PowerShell-Skript aus.

- **Skriptausführungsrichtlinien anzeigen:**
  ```bash
  Get-ExecutionPolicy
  ```
  Zeigt die aktuelle Richtlinie für die Ausführung von Skripten an.

- **Skriptausführungsrichtlinien ändern:**
  ```bash
  Set-ExecutionPolicy <richtlinie>
  ```
  Ändert die Ausführungsrichtlinie (z.B. `RemoteSigned` oder `Unrestricted`).

## 5. Nützliche Kurzbefehle

- **Hilfe zu einem Befehl anzeigen:**
  ```bash
  Get-Help <befehl>
  ```
  Zeigt die Hilfeseite für den angegebenen Befehl an.

- **Alias für Befehle anzeigen:**
  ```bash
  Get-Alias
  ```
  Listet alle Aliase für PowerShell-Befehle auf.

- **Historie anzeigen:**
  ```bash
  Get-History
  ```
  Zeigt die Historie der zuletzt ausgeführten Befehle an.

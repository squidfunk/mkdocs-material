# Grundlegender Spickzettel für MkDocs



## Was ist MkDocs?

MkDocs ist ein statischer Site-Generator, der speziell für die Erstellung von Projektdokumentationen mit Markdown entwickelt wurde. Es ermöglicht die einfache Verwaltung und Darstellung von Dokumentationen in einem leserfreundlichen Format.

## 1. Installation

- **Python installieren:**
  - Stellen Sie sicher, dass Python installiert ist (Python 3.6 oder höher).

- **MkDocs installieren:**
  - Installieren Sie MkDocs mit dem folgenden Befehl:
  ```bash
  pip install mkdocs
  ```

## 2. Projekt erstellen

- **Neues MkDocs-Projekt erstellen:**
  - Erstellen Sie ein neues Projekt mit:
  ```bash
  mkdocs new my-project
  ```
  - Wechseln Sie in das Projektverzeichnis:
  ```bash
  cd my-project
  ```

## 3. Vorschau der Dokumentation

- **Lokale Vorschau starten:**
  - Starten Sie die lokale Entwicklungsumgebung mit:
  ```bash
  mkdocs serve
  ```
  - Öffnen Sie `http://127.0.0.1:8000/` in Ihrem Browser, um die Vorschau anzuzeigen.

## 4. Veröffentlichung

- **Dokumentation bauen und veröffentlichen:**
  - Erstellen Sie eine statische Version der Website:
  ```bash
  mkdocs build
  ```
  - Die erstellte Website befindet sich im Ordner `site`.

## 5. Tipps für Anfänger

- **Markdown lernen:**
  - Verwenden Sie grundlegende Markdown-Syntax, um Seiten zu erstellen und Inhalte zu formatieren.
- **Themes anpassen:**
  - Wählen Sie ein Theme aus der MkDocs-Dokumentation, um das Erscheinungsbild Ihrer Website zu ändern.

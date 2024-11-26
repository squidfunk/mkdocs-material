# Renata SA MkDocs Local Setup Version-1

### Schritt-für-Schritt-Installationsanleitung

#### Schritt 1: Python installieren

1. **Python herunterladen und installieren**:
   - Besuche die [Python-Website](https://www.python.org/downloads/) und lade die neueste Version von Python herunter.
   - Führe den Installer aus, stelle sicher, dass "Add Python to PATH" aktiviert ist, und schließe die Installation ab.

#### Schritt 2: MkDocs und MkDocs Material installieren

1. **Eingabeaufforderung öffnen**:
   - Öffne PowerShell als Admin

2. **MkDocs installieren**:
   ```Powershell
   pip install mkdocs
   ```

3. **MkDocs Material installieren**:
   ```Powershell
   pip install mkdocs-material
   ```

#### Schritt 3: Zusätzliche Plugins installieren

1. **MkDocs Minify Plugin installieren**:
   ```Powershell
   pip install mkdocs-minify-plugin
   ```

2. **Pymdown Extensions installieren**:
   ```Powershell
   pip install pymdown-extensions
   ```

3. **Mermaid Plugin installieren**:
   ```Powershell
   pip install mkdocs-mermaid2-plugin
   ```

4. **Markdownlint CLI installieren**:
   - Installiere Node.js von der [Node.js-Website](https://nodejs.org/).
   - Installiere dann Markdownlint CLI:
     ```Powershell
     npm install -g markdownlint-cli
     ```

### Beispiel `mkdocs.yml` Konfigurationsdatei

Hier ist eine vollständige `mkdocs.yml` Konfigurationsdatei mit allen gewünschten Plugins und Funktionen:

```yaml
site_name: 'Meine Projektdokumentation'
theme:
  name: 'material'
  palette:
    - media: "(prefers-color-scheme: light)"
      scheme: default
      primary: 'indigo'
      accent: 'indigo'
    - media: "(prefers-color-scheme: dark)"
      scheme: slate
      primary: 'indigo'
      accent: 'indigo'
  features:
    - navigation.instant
    - navigation.tracking
    - search.suggest
    - search.highlight
    - toc.integrate
    - tabs
    - content.code.annotate
    - content.tabs.link
    - navigation.top
    - navigation.tabs
    - content.code.copy
    - header.autohide
    - navigation.expand
    - content.table
    - palette.toggle

plugins:
  - search
  - minify:
      minify_html: true
  - mermaid2:
      arguments:
        javascript: https://cdnjs.cloudflare.com/ajax/libs/mermaid/8.13.5/mermaid.min.js

markdown_extensions:
  - pymdownx.highlight:
      anchor_linenums: true
  - pymdownx.inlinehilite
  - pymdownx.snippets
  - admonition
  - pymdownx.arithmatex:
      generic: true
  - footnotes
  - pymdownx.details
  - pymdownx.superfences
  - pymdownx.mark
  - attr_list
  - pymdownx.emoji:
      emoji_index: !!python/name:material.extensions.emoji.twemoji
      emoji_generator: !!python/name:material.extensions.emoji.to_svg
  - codehilite
  - meta
  - toc:
      permalink: true
  - pymdownx.betterem:
      smart_enable: all
  - pymdownx.caret
  - pymdownx.critic
  - pymdownx.magiclink
  - pymdownx.smartsymbols
  - pymdownx.tasklist
  - pymdownx.tilde

extra_javascript:
  - https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/highlight.min.js
  - https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/languages/python.min.js
  - https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/languages/javascript.min.js

extra_css:
  - https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/default.min.css
  - https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css
  - https://fonts.googleapis.com/icon?family=Material+Icons
```

### Nächste Schritte

1. **Dokumentation lokal servieren**:
   ```Powershell 
   mkdocs serve
   ```

   - Öffne deinen Webbrowser und navigiere zu `http://127.0.0.1:8000`, um deine Dokumentation anzusehen.

2. **Seite erstellen**:
   ```Powershell
   mkdocs build
   ```

   - Dieser Befehl erstellt deine Dokumentationsseite als statische Dateien im `site` Verzeichnis.

3. **Markdown-Dateien linten**:
   ```Powershell
   markdownlint "docs/**/*.md"
   ```

   - Dieser Befehl lintet alle Markdown-Dateien im `docs` Verzeichnis, um konsistente Formatierungen sicherzustellen.
  
![8DBCACFB-48FA-4F58-9AF2-835B03E4A97A](b8u2VGe6--8DBCACFB-48FA-4F58-9AF2-835B03E4A97A.png)
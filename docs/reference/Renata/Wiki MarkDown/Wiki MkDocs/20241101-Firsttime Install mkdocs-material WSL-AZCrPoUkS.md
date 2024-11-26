# Firsttime Install mkdocs-material WSL

Um **Material for MkDocs** unter Windows Subsystem for Linux (WSL) mit Ubuntu zu installieren, folgen Sie diesen Schritten:

1. **WSL und Ubuntu installieren**:
   - Falls noch nicht geschehen, installieren Sie WSL und Ubuntu gemäß der [Microsoft-Dokumentation](https://docs.microsoft.com/de-de/windows/wsl/install).

2. **Ubuntu in WSL starten**:
   - Öffnen Sie die Ubuntu-Terminalanwendung.

3. **System aktualisieren**:
   - Aktualisieren Sie die Paketlisten und installieren Sie Updates:
     ```bash
     sudo apt update && sudo apt upgrade -y
     ```

4. **Python und pip installieren**:
   - Installieren Sie Python 3 und pip:
     ```bash
     sudo apt install python3 python3-pip -y
     ```

5. **Virtuelle Umgebung erstellen**:
   - Erstellen Sie eine virtuelle Umgebung, um Abhängigkeiten isoliert zu verwalten:
     ```bash
     sudo apt install python3.12-venv
     ```

6. **Virtuelle Umgebung aktivieren**:
   - Aktivieren Sie die virtuelle Umgebung:
     ```bash
     source mkdocs-env/bin/activate
     ```
   - Nach der Aktivierung sollte Ihr Terminal-Prompt den Namen der virtuellen Umgebung anzeigen.

7. **MkDocs und Material-Theme installieren**:
   - Installieren Sie MkDocs und das Material-Theme innerhalb der virtuellen Umgebung:
     ```bash
     pip install mkdocs mkdocs-material
     ```

8. **Neues MkDocs-Projekt erstellen**:
   - Erstellen Sie ein neues Projektverzeichnis und initialisieren Sie ein MkDocs-Projekt:
     ```bash
     mkdir GLPI
     cd GLPI
     mkdocs new .
     ```

9. **Entwicklungsserver starten**:
   - Starten Sie den MkDocs-Entwicklungsserver:
     ```bash
     mkdocs serve
     ```

10. **Dokumentation anzeigen**:
    - Öffnen Sie einen Browser unter Windows und navigieren Sie zu `http://localhost:8000/`, um Ihre Dokumentation zu betrachten.

**Hinweis**: Um die virtuelle Umgebung zu verlassen, geben Sie `deactivate` ein.

Weitere Informationen finden Sie in der offiziellen [Material for MkDocs Dokumentation](https://squidfunk.github.io/mkdocs-material/getting-started/). 
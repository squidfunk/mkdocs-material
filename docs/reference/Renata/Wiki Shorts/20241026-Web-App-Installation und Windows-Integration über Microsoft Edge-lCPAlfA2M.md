# Web-App-Installation und Windows-Integration über Microsoft Edge

## **Überblick**

Dieses Dokument bietet eine umfassende technische Erklärung, wie eine **Progressive Web App (PWA)** installiert und in **Windows** registriert wird, wenn sie über **Microsoft Edge** installiert wird. Es beschreibt die Schritte, die Edge nach der Installation einer Web-App ausführt, einschließlich der Erstellung von Verknüpfungen, Dateiverwaltung, Registry-Updates und der Interaktion mit dem Windows-Betriebssystem.

---

## **Schritt-für-Schritt-Technische Erklärung**

### **1. Registrierung der Web-App in Windows**

Sobald der Installationsprozess beginnt, führt **Microsoft Edge** mehrere wichtige Schritte durch, um die Web-App im Windows-System zu **registrieren**.

#### **1.1. Erstellung von Verknüpfungen**

- **Verknüpfungsdateien**: Edge erstellt Verknüpfungen für die Web-App an Standardorten in Windows:
  - **Startmenü**: Die App erscheint im Windows **Startmenü**, wie jede andere installierte Anwendung.
  - **Desktop**: Wenn der Benutzer diese Option wählt, wird eine Desktop-Verknüpfung erstellt.
  - **Taskleiste**: Die App kann auch an die **Taskleiste** angeheftet werden, um einen schnelleren Zugriff zu ermöglichen.

- **Verknüpfungsverzeichnis**: Diese Verknüpfungen werden im folgenden Verzeichnis gespeichert:
  - `C:\Users\<IhrBenutzername>\AppData\Local\Microsoft\Edge\User Data\Default\Web Applications\`
  - Das Verzeichnis enthält spezifische Informationen zur Anwendung, einschließlich:
    - Das **Icon** der Web-App.
    - Die **JSON-Datei** mit Metadaten wie Start-URLs und App-Berechtigungen.

- **Befehlszeilenargumente**: 
  - Die Verknüpfungen sind so konfiguriert, dass sie auf eine bestimmte **Edge-Executable** (`msedge.exe`) mit dem Argument `--app=<App-URL>` verweisen. Dieses Argument stellt sicher, dass die Web-App in einem **eigenständigen Fenster** ohne die normale Browseroberfläche (keine Adressleiste, Tabs oder Menüs) geöffnet wird.
  - Beispiel: 
    ```plaintext
    "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --app=https://example.com
    ```

#### **1.2. Erstellung von Dateien und Ordnern**

Nachdem die App installiert wurde, erstellt Edge spezifische Verzeichnisse und Dateien:
- **Icons und Metadaten**: 
  - Die im Manifest der Web-App definierten **Icons** werden lokal gespeichert, um sie im Startmenü, in der Taskleiste und für Desktop-Verknüpfungen zu verwenden.
  - Eine **JSON-Datei** wird erstellt, die wichtige Informationen über die App speichert, einschließlich der `start_url` der App, etwaiger erteilter Berechtigungen (z. B. Benachrichtigungen) und Anzeigeeinstellungen.
  
- **App-Verzeichnis**: 
  - Dieses Verzeichnis befindet sich im AppData-Ordner des Benutzers und enthält alle Dateien, die Edge benötigt, um die Web-App unabhängig von der Haupt-Browser-Sitzung zu verwalten und zu starten.
  - Beispielpfad: 
    ```plaintext
    C:\Users\<IhrBenutzername>\AppData\Local\Microsoft\Edge\User Data\Default\Web Applications\<app_id>
    ```

#### **1.3. Registrierungseinträge in Windows**

**Microsoft Edge** registriert die Web-App in der **Windows-Registry**, sodass sie vom Betriebssystem als vollständig integrierte Anwendung erkannt wird.

- **Registry-Pfad**: 
  - Die App wird im Registry-Schlüssel `HKCU\Software\Microsoft\Windows\CurrentVersion\Uninstall` registriert. Dadurch wird sichergestellt, dass die App in den **Einstellungen > Apps & Features** erscheint.
  - Der Schlüssel enthält:
    - **App-Name**: Der in den Windows-Apps-Listen angezeigt wird.
    - **Pfad zur ausführbaren Datei**: Verweist auf die Edge-Executable mit den notwendigen Flags, um die App zu starten.
    - **Icon-Standort**: Der Speicherort der Icon-Datei der App, die im Startmenü und in der Taskleiste verwendet wird.
    - **Deinstallationsbefehl**: Gibt den Pfad an, über den Edge die App entfernt.

- **Beispiel für einen Registry-Eintrag**:
  ```plaintext
  [HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Uninstall\<app_id>]
  "DisplayName"="<App-Name>"
  "DisplayIcon"="C:\\Users\\<IhrBenutzername>\\AppData\\Local\\Microsoft\\Edge\\User Data\\Default\\Web Applications\\<app_id>\\icons\\icon.png"
  "UninstallString"="C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe --uninstall --app-id=<app_id>"
  ```

#### **1.4. Dateityp- und Protokollzuordnungen (Optional)**

Wenn die Web-App bestimmte Dateitypen oder Protokolle unterstützt, kann Edge **Zuordnungen** in Windows erstellen:

- **Dateihandler**: Wenn die Web-App in ihrem Manifest Dateityp-Handler definiert (`"file_handlers"`), registriert Edge die App, um bestimmte Dateitypen zu verarbeiten. Zum Beispiel:
  - Eine Web-App für einen Dokumenteneditor könnte als Standardhandler für `.docx`-Dateien registriert werden.
  
- **Protokoll-Handler**: Wenn die Web-App benutzerdefinierte URL-Schemata unterstützt (`"protocol_handlers"`), kann Edge die App registrieren, um bestimmte Protokolle zu verarbeiten. Zum Beispiel:
  - Eine Web-Mail-App könnte für die Verarbeitung von `mailto:`-Links eingerichtet werden.

Diese Zuordnungen werden ebenfalls über die Windows-Registry verwaltet und ermöglichen es dem Betriebssystem, die Web-App für diese Aufgaben zu erkennen.

---

### **2. Verhalten der Web-App in Windows**

Nach der Installation verhält sich die Web-App unabhängig innerhalb des Windows-Ökosystems, obwohl sie weiterhin auf den **Edge-Browser** im Hintergrund angewiesen ist.

#### **2.1. Eigenständiges Fenstererlebnis**
- Die Web-App wird in einem **eigenständigen Fenster** geöffnet, das keine normalen Browser-Steuerelemente wie Tabs, Adressleiste und Menüs enthält.
- Das Fenster der App verhält sich wie ein typisches Anwendungsfenster mit einem eigenen **Icon** und einer **Taskleisten-Präsenz**, sodass es sich von Edge-Browser-Fenstern unterscheidet.

#### **2.2. Integration in die Taskleiste und das Startmenü**
- Die App erscheint in der **Windows-Taskleiste** und im **Startmenü** und verhält sich wie jede native Windows-Anwendung.
- **Anheften**: Benutzer können die Web-App an das Startmenü oder die Taskleiste anheften, um einen schnellen Zugriff zu ermöglichen.

#### **2.3. Integration von Benachrichtigungen**
- Wenn die Web-App **Push-Benachrichtigungen** unterstützt, integriert sie sich in das **Windows-Benachrichtigungssystem**:
  - Benachrichtigungen der App werden im **Windows Action Center** angezeigt.
  - Der **Service Worker** der App sorgt dafür, dass Benachrichtigungen auch dann empfangen werden können, wenn die App geschlossen ist, solange Edge im Hintergrund läuft.

#### **2.4. Offline-Zugriff**
- Wenn die App über **Offline-Funktionen** (durch **Service Workers** aktiviert) verfügt, kann sie bestimmte Ressourcen (Seiten, Bilder, Daten) für die Offline-Nutzung speichern.
  - Dadurch kann die App auch dann funktionieren, wenn keine Internetverbindung besteht, und bietet ein ähnliches Erlebnis wie native Apps.

---

### **3. Aktualisierung und Deinstallation der Web-App**

#### **3.1. Automatische Updates**
- Über Edge installierte Web-Apps werden automatisch aktualisiert, wenn sich deren **Webinhalte** oder **Manifest** ändern. Edge prüft regelmäßig auf Updates:
  - Wenn eine Änderung festgestellt wird (z. B. eine neue Version der App oder ein aktualisiertes Manifest), wird die App automatisch aktualisiert, ohne dass der Benutzer eingreifen muss.
  
- **Service Worker Updates**: Wenn die App einen **Service Worker** verwendet, wird der Aktualisierungsprozess vom Worker verwaltet, wodurch sichergestellt wird, dass der Benutzer stets die neueste App-Version hat.

#### **3.2. Deinstallationsprozess**
- Die Web-App kann auf folgende Weise deinstalliert werden:
  1. **Startmenü**: Rechtsklicken Sie auf die App und wählen Sie **Deinstallieren**.
  2. **Einstellungen > Apps & Features**: Die App wird im Abschnitt **Apps & Features** in Windows aufgeführt, wo sie wie jede andere Anwendung deinstalliert werden kann.
  3. **Edge-App-Verwaltung**: In Edge navigieren Sie zu `edge://apps`, wählen die Web-App aus und klicken auf **Deinstallieren**.

- **Was passiert während der Deinstallation?**
  - Alle **Verknüpfungen** (aus dem Startmenü, Desktop und Taskleiste) werden entfernt.
  - Die **Registry-Einträge** im Zusammenhang mit der

 App werden gelöscht.
  - Die **Dateien** und **Daten**, die im Edge User Data Directory gespeichert sind, werden entfernt.

---

### **4. Unterschiede zu nativen Anwendungen**

Obwohl über Microsoft Edge installierte Web-Apps in vielerlei Hinsicht wie native Apps funktionieren, gibt es einige wichtige Unterschiede:

#### **4.1. Ressourcennutzung**
- Web-Apps verbrauchen im Allgemeinen **weniger Systemressourcen** (RAM, CPU) im Vergleich zu nativen Anwendungen, da sie im Browserkontext ausgeführt werden.
- Sie erfordern keine großen Installationen, da sie auf den Browser zugreifen, um Ressourcen aus dem Web zu laden.

#### **4.2. Sandboxing**
- Web-Apps werden innerhalb des **Sicherheitsmodells des Browsers** isoliert (sandboxed). Dies bedeutet, dass sie von kritischen Systemkomponenten isoliert sind, es sei denn, der Benutzer erteilt spezifische Berechtigungen (z. B. den Zugriff auf Dateien oder Hardware).

#### **4.3. Eingeschränkter Zugriff auf Systemressourcen**
- Web-Apps können nicht auf das Dateisystem, Hardware oder andere Betriebssystemressourcen zugreifen, wie es native Anwendungen können. Berechtigungen wie Geolokalisierung, Benachrichtigungen und Speicherung werden über das Berechtigungsmodell von Edge verwaltet.

#### **4.4. Leichte Installation**
- Die Größe der installierten Web-App ist relativ klein, da der Großteil der Ressourcen der App über das Web bereitgestellt wird und der **Service Worker** zwischengespeicherte Daten lokal verwaltet.

---

## **Fazit**

Der Installationsprozess von Web-Apps über Microsoft Edge ermöglicht es ihnen, sich ähnlich wie native Windows-Anwendungen zu verhalten. Dazu gehören die Integration in das Startmenü, die Taskleiste und Systembenachrichtigungen sowie die Handhabung von Dateien und Protokollen. Im Gegensatz zu nativen Apps bleiben Web-Apps jedoch innerhalb der Browserumgebung isoliert und bieten den Benutzern eine leichte, sichere Alternative.

Diese Kombination aus **browserbasierter Funktionalität** und **Betriebssystem-Integration** macht Edge-Web-Apps zu einem leistungsstarken Werkzeug für Benutzer, die die Flexibilität von Web-Technologien mit dem Komfort von nativer Benutzerfreundlichkeit verbinden möchten.


Hier ist die Anleitung auf **Deutsch**, wie du deine installierten Web-Apps von **Microsoft Edge** sichern und auf einen neuen PC übertragen kannst:

---

# Sicherung: Installierten Web-Apps

### **Schritt 1: Sicherung der installierten Web-Apps**

1. **Sicherung des Edge-Benutzerdatenverzeichnisses**:
   - Alle Web-Apps werden im **User Data**-Verzeichnis von Edge gespeichert. Der Pfad lautet in der Regel:
     ```plaintext
     C:\Users\<DeinBenutzername>\AppData\Local\Microsoft\Edge\User Data\Default\Web Applications\
     ```
   - Du solltest den gesamten **`Web Applications`-Ordner** sowie eventuell vorhandene **Verknüpfungen** von Desktop und Taskleiste sichern.

2. **Exportieren der Registrierungseinträge** (optional):
   - Web-Apps werden auch in der **Windows-Registry** registriert. Um diese Verknüpfungen auf dem neuen PC wiederherzustellen, kannst du die zugehörigen Registrierungseinträge sichern.
   - Exportiere die Registry-Schlüssel aus folgendem Pfad:
     ```plaintext
     HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Uninstall
     ```
   - Suche nach den Schlüsseln, die den Namen oder die ID der Web-Apps enthalten, die du gesichert hast. Klicke mit der rechten Maustaste auf die Schlüssel und wähle **Exportieren**.

3. **Sicherung der benutzerdefinierten Datei-/Protokollzuordnungen** (falls vorhanden):
   - Wenn deine Web-Apps bestimmte Dateitypen oder Protokolle verarbeiten (z. B. `mailto:`), solltest du auch die entsprechenden Registrierungseinträge sichern, die diese Zuordnungen verwalten.

---

### **Schritt 2: Importieren der Web-Apps auf den neuen PC**

1. **Kopiere die Dateien auf den neuen PC**:
   - Installiere auf dem neuen PC **Microsoft Edge**, falls es noch nicht installiert ist.
   - Kopiere den gesicherten **`Web Applications`-Ordner** in den entsprechenden Pfad auf dem neuen PC:
     ```plaintext
     C:\Users\<DeinBenutzername>\AppData\Local\Microsoft\Edge\User Data\Default\Web Applications\
     ```
   - Falls du Desktop- oder Taskleistenverknüpfungen gesichert hast, stelle diese ebenfalls wieder her, indem du sie in die entsprechenden Ordner auf dem neuen PC kopierst.

2. **Importiere die Registrierungseinträge** (falls zutreffend):
   - Wenn du die Registry-Einträge exportiert hast, kannst du die **.reg-Dateien** auf dem neuen PC durch Doppelklick importieren.
   - Dies stellt sicher, dass die Web-Apps in **Einstellungen > Apps & Features** erscheinen und genauso funktionieren wie zuvor.

3. **Funktion der Web-Apps überprüfen**:
   - Öffne Microsoft Edge und gehe zu `edge://apps/`, um zu überprüfen, ob die Web-Apps wiederhergestellt wurden und korrekt aufgeführt sind.
   - Starte die Web-Apps, um sicherzustellen, dass sie in eigenständigen Fenstern geöffnet werden und wie erwartet funktionieren.

---

### **Alternative Methode: Microsoft-Konto-Synchronisierung**

Falls du dich mit deinem **Microsoft-Konto** bei **Microsoft Edge** anmeldest, werden bestimmte Teile deines Browsing-Erlebnisses (einschließlich installierter Apps) möglicherweise auf verschiedene Geräte synchronisiert. Es ist jedoch wichtig zu wissen, dass die vollständigen Installationsdaten der Web-Apps in der Regel **nicht** in den Synchronisierungsprozess einbezogen werden. Daher ist die manuelle Sicherung und Wiederherstellung, wie oben beschrieben, oft notwendig, um die Web-Apps vollständig zu übertragen.


---

# PowerShell: Backup and Wiederherstellen

## Backup Web Apps

### **PowerShell-Skript 1: Web-Apps sichern**

Dieses Skript:
- Sichert den Ordner **Web Applications** aus dem Benutzerdatenverzeichnis.
- Exportiert die relevanten **Registry-Einträge** der installierten Web-Apps.

```powershell
# PowerShell-Skript zur Sicherung von Microsoft Edge Web-Apps

# Pfade für die Sicherung definieren
$EdgeWebAppsPath = "$env:LOCALAPPDATA\Microsoft\Edge\User Data\Default\Web Applications"
$BackupPath = "C:\EdgeWebAppsBackup"  # Passe diesen Pfad an den Speicherort der Sicherung an
$RegistryBackupPath = "$BackupPath\RegistryBackup.reg"

# Erstelle das Sicherungsverzeichnis, falls es nicht existiert
if (-not (Test-Path -Path $BackupPath)) {
    New-Item -Path $BackupPath -ItemType Directory
}

# Kopiere das Web Applications-Verzeichnis
Write-Host "Sichern der Web Applications..."
Copy-Item -Path $EdgeWebAppsPath -Destination $BackupPath\WebApplications -Recurse -Force

# Exportiere die Registrierungsschlüssel für die installierten Web-Apps
Write-Host "Exportiere Registrierungsschlüssel für installierte Web-Apps..."
reg export "HKCU\Software\Microsoft\Windows\CurrentVersion\Uninstall" $RegistryBackupPath /y

Write-Host "Sicherung abgeschlossen. Dateien gespeichert unter $BackupPath"
```

## Wiederherstellen Web Apps

### **PowerShell-Skript 2: Web-Apps wiederherstellen**

Dieses Skript:
- Stellt den Ordner **Web Applications** im Benutzerverzeichnis auf dem neuen PC wieder her.
- Importiert die **Registry-Einträge**, um die Web-Apps in Windows wieder zu registrieren.

```powershell
# PowerShell-Skript zur Wiederherstellung von Microsoft Edge Web-Apps

# Pfade für die Wiederherstellung definieren
$RestorePath = "C:\EdgeWebAppsBackup"  # Pfad zum Speicherort der Sicherung
$EdgeWebAppsPath = "$env:LOCALAPPDATA\Microsoft\Edge\User Data\Default\Web Applications"
$RegistryBackupPath = "$RestorePath\RegistryBackup.reg"

# Prüfe, ob der Sicherungspfad existiert
if (-not (Test-Path -Path $RestorePath)) {
    Write-Host "Sicherungsordner existiert nicht unter $RestorePath. Beende Skript."
    exit
}

# Stelle das Web Applications-Verzeichnis wieder her
Write-Host "Wiederherstellung der Web Applications..."
Copy-Item -Path "$RestorePath\WebApplications" -Destination $EdgeWebAppsPath -Recurse -Force

# Importiere die Registrierungsschlüssel für die Web-Apps
Write-Host "Importiere Registrierungsschlüssel für installierte Web-Apps..."
reg import $RegistryBackupPath

Write-Host "Wiederherstellung abgeschlossen. Web-Apps sollten in Edge registriert sein."
```

### **Anleitung zum Ausführen der Skripte**

1. **Speichere die Skripte**:
   - Speichere das **Backup-Skript** als `BackupEdgeWebApps.ps1`.
   - Speichere das **Wiederherstellungs-Skript** als `RestoreEdgeWebApps.ps1`.

2. **Backup-Skript ausführen**:
   - Öffne PowerShell als **Administrator**.
   - Führe das Backup-Skript aus, um deine Web-Apps zu sichern:
     ```powershell
     .\BackupEdgeWebApps.ps1
     ```

3. **Sicherung auf den neuen PC übertragen**:
   - Kopiere den Ordner `C:\EdgeWebAppsBackup` (oder wo immer du deine Sicherung gespeichert hast) auf den neuen PC.

4. **Wiederherstellungs-Skript auf dem neuen PC ausführen**:
   - Platziere den Sicherungsordner am selben Speicherort (oder passe den Pfad im Skript an).
   - Öffne PowerShell als **Administrator**.
   - Führe das Wiederherstellungs-Skript aus:
     ```powershell
     .\RestoreEdgeWebApps.ps1
     ```

### **Wichtige Hinweise**:
- **Registry-Berechtigungen**: Stelle sicher, dass du PowerShell als **Administrator** ausführst, damit Änderungen an der Registry vorgenommen werden können.
- **Backup-Speicherort**: Passe `$BackupPath` und `$RestorePath` in den Skripten an deine Bedürfnisse an.
- **Benutzerübergreifende Installationen**: Diese Skripte sind für den aktuellen Benutzer (`HKCU`) spezifisch. Wenn du für andere Benutzer sichern möchtest, passe die Registry-Pfade entsprechend an.

Diese Skripte automatisieren die Sicherung und Wiederherstellung deiner Microsoft Edge Web-Apps, einschließlich der App-Daten und der notwendigen Registry-Einträge.
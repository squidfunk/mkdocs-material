# Erweiterte SharePoint Fehlerbehebung für Gäste und Berechtigungen



## 1. Detaillierte Überprüfung der Berechtigungen

- **Berechtigungen auf Website- und Bibliotheksebene analysieren:**
  - Gehen Sie zu **Websiteeinstellungen > Websiteberechtigungen** und wählen Sie **Berechtigungsstufen verwalten**.
  - Überprüfen Sie die Berechtigungsstufen (z.B. Vollzugriff, Mitwirken, Lesen) und stellen Sie sicher, dass Gastbenutzer die korrekten Berechtigungen haben.

- **Berechtigungen auf Elementebene überprüfen:**
  - Navigieren Sie zu einer Dokumentbibliothek und klicken Sie auf ein Dokument oder einen Ordner. Wählen Sie **Details > Zugriff verwalten**.
  - Überprüfen Sie die individuellen Berechtigungen für das ausgewählte Element und stellen Sie sicher, dass Gastbenutzer die notwendigen Zugriffsrechte haben.

- **Sicherheits- und Berechtigungsvererbung prüfen:**
  - Gehen Sie zu **Websiteeinstellungen > Websiteberechtigungen** und klicken Sie auf **Vererbung stoppen** oder **Vererbung wiederherstellen**, um sicherzustellen, dass die Berechtigungen korrekt vererbt werden.

## 2. Verwendung von PowerShell zur Fehlerbehebung

- **Berechtigungen mit PowerShell überprüfen:**
  - Nutzen Sie das SharePoint Online PowerShell-Modul, um detaillierte Berechtigungen für Benutzer und Gruppen zu prüfen:
  ```powershell
  Get-SPOSiteGroup -Site <Site-URL> | Get-SPOUser
  ```
  - Dieser Befehl listet alle Benutzer und deren Berechtigungen für eine bestimmte Website auf.

- **Berechtigungen für Gastbenutzer anzeigen:**
  ```powershell
  Get-SPOUser -Site <Site-URL> -Group "Besucher" | Where-Object { $_.LoginName -like "*#ext#*" }
  ```
  - Dieser Befehl zeigt alle Gastbenutzer in der Gruppe "Besucher" einer bestimmten Website an.

## 3. Detaillierte Freigabeeinstellungen anpassen

- **Freigabeoptionen auf Organisationsebene konfigurieren:**
  - Gehen Sie zu **Microsoft 365 Admin Center > SharePoint Admin Center > Richtlinien > Freigabe**.
  - Passen Sie die Freigaberichtlinien an, um festzulegen, welche Arten von Links (intern, extern, anonym) verwendet werden dürfen.

- **Gastbenutzer-Einladungen erneut senden:**
  - Gehen Sie zu **Websiteeinstellungen > Benutzer und Gruppen** und wählen Sie den Gastbenutzer aus.
  - Klicken Sie auf **Benutzer erneut einladen**, um eine neue Einladung zu senden, falls der ursprüngliche Link abgelaufen ist.

## 4. Überwachungs- und Diagnose-Tools nutzen

- **Erweiterte Überwachungsprotokolle verwenden:**
  - Aktivieren Sie erweiterte Überwachungsprotokolle im **SharePoint Admin Center**. Gehen Sie zu **Überwachung > Überwachungsprotokolle suchen** und analysieren Sie die Protokolle für Gastbenutzeraktionen.

- **Health Analyzer-Berichte prüfen:**
  - Nutzen Sie den **SharePoint Health Analyzer** zur Überwachung der Integrität und zur Identifizierung von Problemen, die die Berechtigungen oder den Zugriff beeinträchtigen könnten.

## 5. Beheben spezifischer Berechtigungsprobleme

- **Problem: Gastbenutzer können nicht auf bestimmte Dokumente zugreifen**
  - **Lösung:**
    - Überprüfen Sie die Berechtigungen auf Dokumentebene und stellen Sie sicher, dass die Berechtigungen nicht versehentlich eingeschränkt wurden.
    - Verwenden Sie **Freigabe prüfen** in der Bibliothek, um die aktuellen Freigabeeinstellungen zu überprüfen.

- **Problem: Gastbenutzer erhalten Fehlermeldungen "Zugriff verweigert"**
  - **Lösung:**
    - Stellen Sie sicher, dass der Gastbenutzer der richtigen Gruppe zugewiesen ist und dass keine widersprüchlichen Berechtigungen auf Website- oder Elementebene bestehen.
    - Überprüfen Sie, ob die Sicherheitsrichtlinien der Organisation den Zugriff externer Benutzer blockieren.

## 6. Tipps zur Vermeidung von Berechtigungsproblemen

- **Regelmäßige Audits durchführen:**
  - Führen Sie regelmäßige Audits der Benutzerberechtigungen durch und verwenden Sie PowerShell-Skripte zur Automatisierung.

- **Verwaltung von Gastbenutzern verbessern:**
  - Erstellen Sie eine Richtlinie zur Verwaltung von Gastbenutzern und stellen Sie sicher, dass alle Einladungen zeitnah überprüft und akzeptiert werden.

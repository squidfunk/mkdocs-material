# SharePoint Fehlerbehebung für Gäste und Berechtigungen



## 1. Schritte zur Fehlerbehebung bei Gastbenutzern

- **Überprüfen Sie die Gastzugriffsrichtlinien:**
  - Stellen Sie sicher, dass die Gastzugriffsrichtlinie Ihrer Organisation das Hinzufügen von Gastbenutzern erlaubt.
  - Gehen Sie zu **Microsoft 365 Admin Center > Einstellungen > Organisationsprofil > Gastfreigabe** und überprüfen Sie die Richtlinien.

- **Gastbenutzer zur Website hinzufügen:**
  - Überprüfen Sie, ob der Gastbenutzer der Website korrekt hinzugefügt wurde.
  - Gehen Sie zu **Websiteeinstellungen > Benutzer und Gruppen** und stellen Sie sicher, dass der Gastbenutzer in der entsprechenden Gruppe vorhanden ist.

- **Gastzugriff auf Dokumentbibliotheken prüfen:**
  - Stellen Sie sicher, dass Gastbenutzer auf die erforderlichen Dokumentbibliotheken zugreifen können.
  - Gehen Sie zu **Bibliothekseinstellungen > Berechtigungen für Dokumentbibliothek** und stellen Sie sicher, dass der Gastbenutzer entsprechende Berechtigungen hat.

## 2. Berechtigungsprobleme beheben

- **Berechtigungen auf Website- und Elementebene prüfen:**
  - Überprüfen Sie die Berechtigungen auf Website-, Bibliotheks- und Elementebene.
  - Gehen Sie zu **Websiteeinstellungen > Websiteberechtigungen** und stellen Sie sicher, dass die Berechtigungen korrekt konfiguriert sind.

- **Vererbung von Berechtigungen prüfen:**
  - Stellen Sie sicher, dass die Berechtigungsvererbung korrekt eingerichtet ist.
  - Navigieren Sie zu **Websiteeinstellungen > Websiteberechtigungen > Vererbung verwalten** und prüfen Sie, ob die Berechtigungen ordnungsgemäß vererbt werden.

- **Verwendung von Verknüpfungen und Freigabeoptionen:**
  - Stellen Sie sicher, dass die korrekten Freigabeoptionen verwendet werden.
  - Gehen Sie zu **Freigabe** und prüfen Sie die Einstellungen für **Linkarten** (intern, extern, etc.).

## 3. Überprüfung von Benutzerrollen und Gruppenmitgliedschaften

- **Mitgliedschaft in Berechtigungsgruppen prüfen:**
  - Stellen Sie sicher, dass der Gastbenutzer der richtigen SharePoint-Gruppe zugewiesen ist.
  - Gehen Sie zu **Websiteeinstellungen > Benutzer und Gruppen** und überprüfen Sie die Gruppenmitgliedschaften.

- **Benutzerrollen verwalten:**
  - Überprüfen und passen Sie die Benutzerrollen an, um sicherzustellen, dass sie den erforderlichen Zugriff haben.
  - Gehen Sie zu **Websiteeinstellungen > Websiteberechtigungen** und wählen Sie **Berechtigungsstufe bearbeiten**.

## 4. Diagnosetools und Protokolle

- **Nutzung von Überwachungsprotokollen:**
  - Verwenden Sie die **Überwachungsprotokolle** im SharePoint Admin Center, um zu überprüfen, wann und wie Gastbenutzer auf die Website oder die Bibliothek zugegriffen haben.

- **Diagnosetools verwenden:**
  - Nutzen Sie Tools wie **SharePoint Health Analyzer** und **Diagnoseprotokolle**, um detaillierte Fehlerberichte zu generieren.

## 5. Tipps zur Fehlervermeidung

- **Regelmäßige Überprüfung der Berechtigungen:**
  - Führen Sie regelmäßige Überprüfungen der Benutzer- und Gruppenberechtigungen durch, um unbefugten Zugriff zu vermeiden.

- **Gastbenutzerzugriff beschränken:**
  - Verwenden Sie die Option **Externer Benutzerzugriff einschränken** unter **Websiteeinstellungen > Zugriff und Freigabe**, um den Zugriff auf bestimmte Bereiche zu begrenzen.

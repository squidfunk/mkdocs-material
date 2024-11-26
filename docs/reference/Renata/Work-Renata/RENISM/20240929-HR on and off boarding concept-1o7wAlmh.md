# HR on and off boarding concept

## Vorbereitung
### Zielsetzung definieren
- Prozesseffizienz steigern: Manuelle Aufgaben reduzieren, Durchlaufzeiten verkürzen
- Transparenz erhöhen: Statusverfolgung, Genehmigungsworkflows, Berichterstellung
- Mitarbeitererlebnis verbessern: Reibungsloser, intuitiver Onboarding/Offboarding-Prozess

### Beteiligte Personen identifizieren
- HR-Abteilung: Erstellen und Verwalten von Onboarding/Offboarding-Anforderungen
- Führungskräfte: Genehmigen von Onboarding/Offboarding-Vorgängen
- IT-Team: Verwaltung von Benutzerkonten, Berechtigungen, Laptop-Rückgabe
- Neue/ausscheidende Mitarbeiter: Eingabe von Informationen, Bestätigung von Aktionen

### Technische Voraussetzungen prüfen
- SharePoint-Integration: Sicherstellen, dass Power Automate und Power Apps reibungslos mit Ihren SharePoint-Umgebungen zusammenarbeiten
- Datenzugriff: Gewährleisten, dass alle relevanten Daten aus SharePoint-Listen, -Bibliotheken und -Formularen abgerufen werden können

## Prozessanalyse
### Bestehende Onboarding-Abläufe
- Neue Mitarbeiter-Eintragung in HR-Liste
- Informationsverteilung an Führungskraft und IT-Team
- Manuelle Erstellung von Benutzerkonten, Berechtigungen, Arbeitsplatzausstattung

### Bestehende Offboarding-Abläufe  
- Mitarbeiteraustrittsmeldung an HR
- Manuelle Deaktivierung von Benutzerkonten, Entfernung von Berechtigungen
- Laptop-Rückgabe-Erinnerung an Mitarbeiter

### Automatisierbare Schritte
- Auslösen des Onboarding/Offboarding-Prozesses bei Personallisten-Änderungen
- Automatische Erstellung und Verteilung von Genehmigungsanforderungen
- Statusupdates in SharePoint-Umgebung
- Benachrichtigungen an beteiligte Personen
- Automatisierte IT-Aufgaben wie Benutzerkonten-Deaktivierung

## Konfiguration in Power Automate
### Onboarding-Flow
1. Trigger: "Wenn ein neues Element in der Personalliste erstellt wird"
2. Genehmigungsanforderung an Vorgesetzte senden
   - Titel: "Onboarding-Anforderung für [Mitarbeitername]"
   - Beschreibung: "Bitte genehmigen Sie den Onboarding-Prozess für den neuen Mitarbeiter [Mitarbeitername]."
   - Genehmiger: Direkter Vorgesetzter des neuen Mitarbeiters
3. Benachrichtigungen senden
   - E-Mail an neuen Mitarbeiter: "Willkommen im Unternehmen! Ihr Onboarding-Prozess wurde eingeleitet."
   - Teams-Nachricht an IT-Team: "Neuer Mitarbeiter [Mitarbeitername] wurde eingestellt. Bitte richten Sie Benutzerkonto und Arbeitsplatz ein."
4. Bedingungen für Genehmigungsantworten
   - Wenn genehmigt:
     - Aktualisieren der Personalliste-Einträge mit Onboarding-Status
     - Benachrichtigung an neuen Mitarbeiter: "Onboarding-Anforderung genehmigt. Bitte warten Sie auf weitere Informationen vom IT-Team."
   - Wenn abgelehnt:
     - Benachrichtigung an neuen Mitarbeiter: "Onboarding-Anforderung leider abgelehnt. Bitte wenden Sie sich an Ihren Vorgesetzten."

### Offboarding-Flow
1. Trigger: "Wenn ein Element aus der Personalliste entfernt wird"
2. Genehmigungsanforderung an Führungskraft senden
   - Titel: "Offboarding-Anforderung für [Mitarbeitername]"
   - Beschreibung: "Bitte genehmigen Sie den Offboarding-Prozess für den ausscheidenden Mitarbeiter [Mitarbeitername]."
   - Genehmiger: Direkter Vorgesetzter des ausscheidenden Mitarbeiters
3. Benachrichtigungen senden
   - E-Mail an ausscheidenden Mitarbeiter: "Ihr Offboarding-Prozess wurde eingeleitet. Bitte stellen Sie sicher, dass Sie Ihren Laptop und andere Firmeneigentümer zurückgeben."
   - Teams-Nachricht an IT-Team: "Mitarbeiter [Mitarbeitername] hat das Unternehmen verlassen. Bitte deaktivieren Sie dessen Benutzerkonto und entfernen Sie alle Berechtigungen."
4. Bedingungen für Genehmigungsantworten
   - Wenn genehmigt:
     - Aktualisieren der Personalliste-Einträge mit Offboarding-Status
     - Benachrichtigung an ausscheidenden Mitarbeiter: "Offboarding-Anforderung genehmigt. Bitte nehmen Sie Kontakt mit dem IT-Team auf, um Ihren Laptop zurückzugeben."
   - Wenn abgelehnt:
     - Benachrichtigung an ausscheidenden Mitarbeiter: "Offboarding-Anforderung leider abgelehnt. Bitte wenden Sie sich an Ihren Vorgesetzten."

## Konfiguration in Power Apps (optional)
### Onboarding/Offboarding-App
1. Erstellen einer neuen Leinwand-App in Power Apps
2. Direkte Anbindung an SharePoint-Umgebungen
3. Formular-basierte Eingabe von Onboarding- oder Offboarding-Informationen
4. Übersichtliche Darstellung von Status und nächsten Schritten
5. Nahtlose Integration mit Power Automate Flows

## Testen, Implementierung und Monitoring
### Testszenarien
- Durchlaufen des kompletten Onboarding- und Offboarding-Prozesses
- Prüfung von Genehmigungsworkflows, Benachrichtigungen, Statusaktualisierungen
- Überprüfung der IT-Team-Aufgaben wie Benutzerkonto-Deaktivierung

### Implementierung und Schulung
- Dokumentation des Gesamtprozesses für Anwender erstellen
- Durchführung von Schulungen für HR, Führungskräfte und IT-Team
- Einführung des neuen Workflows und kontinuierliche Unterstützung der Nutzer

### Monitoring und Optimierung
- Regelmäßige Überprüfung der Flow-Ausführungen in Power Automate
- Analyse von Nutzerfeedback und Identifizierung von Verbesserungspotenzial
- Anpassung und Weiterentwicklung des Onboarding/Offboarding-Workflows
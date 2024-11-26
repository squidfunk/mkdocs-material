# Pre-Prod-Share

# ITTL MQTT IIoT-Projekt: Vollständiger Projektlebenszyklus-Baum

## Einführung

Dieser Dokumentbaum repräsentiert den vollständigen Lebenszyklus des MQTT IIoT-Projekts bei Renata SA. Er bietet eine umfassende Übersicht über alle Projektphasen, von der Initiierung bis zum Abschluss und der kontinuierlichen Verbesserung. Jeder Hauptordner repräsentiert eine Schlüsselphase des Projekts, während die Unterordner und Dateien spezifische Aufgaben und Dokumente darstellen.

## Projektstruktur

```
RenataMqtt_IIoT_Projekt/
├── 1-Projektinitiierung/
│   ├── 1.1-Geschäftsanalyse/
│   │   ├── 1.1.1-Bedarfsermittlung.md
│   │   └── 1.1.2-ROI-Berechnung.md
│   ├── 1.2-Stakeholder-Analyse/
│   │   ├── 1.2.1-Identifizierung-der-Stakeholder.md
│   │   └── 1.2.2-Erwartungsmanagement.md
│   └── 1.3-Projektcharta/
│       ├── 1.3.1-Projektziele-Definition.md
│       └── 1.3.2-Ressourcenzuweisung.md
│
├── 2-Planungsphase/
│   ├── 2.1-Anforderungsanalyse/
│   │   ├── 2.1.1-Funktionale-Anforderungen.md
│   │   ├── 2.1.2-Nicht-funktionale-Anforderungen.md
│   │   └── 2.1.3-Technische-Spezifikationen.md
│   ├── 2.2-Architekturdefinition/
│   │   ├── 2.2.1-MQTT-Broker-Architektur.md
│   │   ├── 2.2.2-Cloud-Infrastruktur.md
│   │   └── 2.2.3-Netzwerktopologie.md
│   ├── 2.3-Projektplanung/
│   │   ├── 2.3.1-Zeitplanung.md
│   │   ├── 2.3.2-Ressourcenplanung.md
│   │   └── 2.3.3-Budgetplanung.md
│   └── 2.4-Risikoanalyse/
│       ├── 2.4.1-Risikoidentifikation.md
│       └── 2.4.2-Risikominderungsstrategien.md
│
├── 3-Design-und-Entwicklung/
│   ├── 3.1-MQTT-Broker-Setup/
│   │   ├── 3.1.1-EMQX-Installation.md
│   │   ├── 3.1.2-Broker-Konfiguration.md
│   │   └── 3.1.3-Cluster-Setup.md
│   ├── 3.2-Azure-IoT-Hub-Integration/
│   │   ├── 3.2.1-IoT-Hub-Provisionierung.md
│   │   ├── 3.2.2-Geräteverwaltung.md
│   │   └── 3.2.3-Nachrichtenrouting.md
│   ├── 3.3-Datenmodellierung/
│   │   ├── 3.3.1-Nachrichtenformate.md
│   │   └── 3.3.2-Datenbank-Schema.md
│   ├── 3.4-Anwendungsentwicklung/
│   │   ├── 3.4.1-Backend-Services.md
│   │   ├── 3.4.2-Frontend-Dashboards.md
│   │   └── 3.4.3-Mobile-Apps.md
│   └── 3.5-Sicherheitsimplementierung/
│       ├── 3.5.1-Authentifizierung.md
│       ├── 3.5.2-Verschlüsselung.md
│       └── 3.5.3-Zugriffskontrolle.md
│
├── 4-Test-und-Qualitätssicherung/
│   ├── 4.1-Unittests/
│   │   ├── 4.1.1-Backend-Tests.md
│   │   └── 4.1.2-Frontend-Tests.md
│   ├── 4.2-Integrationstests/
│   │   ├── 4.2.1-MQTT-Azure-Integration.md
│   │   └── 4.2.2-Endpunkt-zu-Endpunkt-Tests.md
│   ├── 4.3-Lasttests/
│   │   ├── 4.3.1-Broker-Leistung.md
│   │   └── 4.3.2-Skalierbarkeit.md
│   ├── 4.4-Sicherheitstests/
│   │   ├── 4.4.1-Penetrationstests.md
│   │   └── 4.4.2-Schwachstellenanalyse.md
│   └── 4.5-Akzeptanztests/
│       ├── 4.5.1-Benutzerakzeptanztests.md
│       └── 4.5.2-Geschäftsszenario-Validierung.md
│
├── 5-Deployment-und-Migration/
│   ├── 5.1-Umgebungsvorbereitung/
│   │   ├── 5.1.1-Produktionsumgebung-Setup.md
│   │   └── 5.1.2-Netzwerkkonfiguration.md
│   ├── 5.2-Datenmigration/
│   │   ├── 5.2.1-Migrationsstrategie.md
│   │   └── 5.2.2-Datenvalidierung.md
│   ├── 5.3-Rollout-Planung/
│   │   ├── 5.3.1-Phasenweise-Einführung.md
│   │   └── 5.3.2-Rollback-Strategie.md
│   └── 5.4-Go-Live/
│       ├── 5.4.1-Produktionsfreigabe.md
│       └── 5.4.2-Überwachung-und-Stabilisierung.md
│
├── 6-Betrieb-und-Wartung/
│   ├── 6.1-Monitoring/
│   │   ├── 6.1.1-Leistungsüberwachung.md
│   │   ├── 6.1.2-Warnmeldungen-und-Benachrichtigungen.md
│   │   └── 6.1.3-Protokollierung.md
│   ├── 6.2-Support/
│   │   ├── 6.2.1-Helpdesk-Einrichtung.md
│   │   ├── 6.2.2-Problemeskalationsprozesse.md
│   │   └── 6.2.3-Fernwartung.md
│   ├── 6.3-Wartung-und-Updates/
│   │   ├── 6.3.1-Regelmäßige-Wartung.md
│   │   ├── 6.3.2-Sicherheitspatches.md
│   │   └── 6.3.3-Funktions-Updates.md
│   └── 6.4-Kapazitätsmanagement/
│       ├── 6.4.1-Ressourcenüberwachung.md
│       └── 6.4.2-Skalierungsplanung.md
│
├── 7-Optimierung-und-Erweiterung/
│   ├── 7.1-Leistungsoptimierung/
│   │   ├── 7.1.1-Bottleneck-Analyse.md
│   │   └── 7.1.2-Feinabstimmung.md
│   ├── 7.2-Funktionserweiterungen/
│   │   ├── 7.2.1-Neue-Funktionen.md
│   │   └── 7.2.2-Integration-neuer-Technologien.md
│   ├── 7.3-Skalierung/
│   │   ├── 7.3.1-Horizontale-Skalierung.md
│   │   └── 7.3.2-Vertikale-Skalierung.md
│   └── 7.4-Prozessoptimierung/
│       ├── 7.4.1-Workflow-Verbesserungen.md
│       └── 7.4.2-Automatisierung.md
│
└── 8-Projektabschluss-und-Evaluation/
    ├── 8.1-Abschlussbericht/
    │   ├── 8.1.1-Zielerreichung.md
    │   └── 8.1.2-Lessons-Learned.md
    ├── 8.2-Übergabe/
    │   ├── 8.2.1-Dokumentationsübergabe.md
    │   └── 8.2.2-Schulungen.md
    └── 8.3-Nachprojektbewertung/
        ├── 8.3.1-ROI-Analyse.md
        └── 8.3.2-Kundenzufriedenheit.md
```

## Erläuterung der Hauptphasen

1. **Projektinitiierung**: Diese Phase umfasst die anfängliche Geschäftsanalyse, Stakeholder-Identifikation und die Definition der Projektziele. Hier wird die Grundlage für das gesamte Projekt gelegt.

2. **Planungsphase**: In dieser Phase werden detaillierte Anforderungen erfasst, die Architektur definiert und eine umfassende Projektplanung durchgeführt. Auch potenzielle Risiken werden hier identifiziert und Gegenmaßnahmen geplant.

3. **Design und Entwicklung**: Hier findet die technische Umsetzung statt. Dies umfasst das MQTT-Broker-Setup, die Azure IoT Hub-Integration, Datenmodellierung, Anwendungsentwicklung und die Implementierung von Sicherheitsmaßnahmen.

4. **Test und Qualitätssicherung**: Diese Phase beinhaltet umfassende Teststrategien, von Unit-Tests über Integrations- und Lasttests bis hin zu Sicherheits- und Akzeptanztests.

5. **Deployment und Migration**: Hier werden die Schritte zur Vorbereitung und Durchführung des Go-Live geplant und umgesetzt, einschließlich der Datenmigration und einer sorgfältigen Rollout-Planung.

6. **Betrieb und Wartung**: Nach dem Go-Live konzentriert sich diese Phase auf die kontinuierliche Überwachung, den Support und regelmäßige Wartungsaktivitäten, um einen reibungslosen Betrieb zu gewährleisten.

7. **Optimierung und Erweiterung**: In dieser Phase geht es um die kontinuierliche Verbesserung des Systems, einschließlich Leistungsoptimierung, Funktionserweiterungen und Skalierung.

8. **Projektabschluss und Evaluation**: Die letzte Phase umfasst die Erstellung eines Abschlussberichts, die Übergabe an das Betriebsteam und eine abschließende Bewertung des Projekterfolgs.

Dieser Strukturbaum bietet einen umfassenden Überblick über alle Aspekte des MQTT IIoT-Projekts und dient als Leitfaden für die Projektdurchführung und -dokumentation. Er ermöglicht es dem Team, den Fortschritt zu verfolgen und sicherzustellen, dass alle wichtigen Aspekte des Projekts berücksichtigt werden.

## Script
1. Copy&Past to a text editor and save with a name.ps1 .
2. Run as Admin in PowerShell in the Folder where you like to generate the folder Stucture.
```powershell
# MQTT IIoT-Projekt: Vollständiger Projektlebenszyklus-Baum Generator

# Definiere die Projektstruktur
$struktur = @{
    "1-Projektinitiierung" = @{
        "1.1-Geschäftsanalyse" = @("1.1.1-Bedarfsermittlung.md", "1.1.2-ROI-Berechnung.md")
        "1.2-Stakeholder-Analyse" = @("1.2.1-Identifizierung-der-Stakeholder.md", "1.2.2-Erwartungsmanagement.md")
        "1.3-Projektcharta" = @("1.3.1-Projektziele-Definition.md", "1.3.2-Ressourcenzuweisung.md")
    }
    "2-Planungsphase" = @{
        "2.1-Anforderungsanalyse" = @("2.1.1-Funktionale-Anforderungen.md", "2.1.2-Nicht-funktionale-Anforderungen.md", "2.1.3-Technische-Spezifikationen.md")
        "2.2-Architekturdefinition" = @("2.2.1-MQTT-Broker-Architektur.md", "2.2.2-Cloud-Infrastruktur.md", "2.2.3-Netzwerktopologie.md")
        "2.3-Projektplanung" = @("2.3.1-Zeitplanung.md", "2.3.2-Ressourcenplanung.md", "2.3.3-Budgetplanung.md")
        "2.4-Risikoanalyse" = @("2.4.1-Risikoidentifikation.md", "2.4.2-Risikominderungsstrategien.md")
    }
    "3-Design-und-Entwicklung" = @{
        "3.1-MQTT-Broker-Setup" = @("3.1.1-EMQX-Installation.md", "3.1.2-Broker-Konfiguration.md", "3.1.3-Cluster-Setup.md")
        "3.2-Azure-IoT-Hub-Integration" = @("3.2.1-IoT-Hub-Provisionierung.md", "3.2.2-Geräteverwaltung.md", "3.2.3-Nachrichtenrouting.md")
        "3.3-Datenmodellierung" = @("3.3.1-Nachrichtenformate.md", "3.3.2-Datenbank-Schema.md")
        "3.4-Anwendungsentwicklung" = @("3.4.1-Backend-Services.md", "3.4.2-Frontend-Dashboards.md", "3.4.3-Mobile-Apps.md")
        "3.5-Sicherheitsimplementierung" = @("3.5.1-Authentifizierung.md", "3.5.2-Verschlüsselung.md", "3.5.3-Zugriffskontrolle.md")
    }
    "4-Test-und-Qualitätssicherung" = @{
        "4.1-Unittests" = @("4.1.1-Backend-Tests.md", "4.1.2-Frontend-Tests.md")
        "4.2-Integrationstests" = @("4.2.1-MQTT-Azure-Integration.md", "4.2.2-Endpunkt-zu-Endpunkt-Tests.md")
        "4.3-Lasttests" = @("4.3.1-Broker-Leistung.md", "4.3.2-Skalierbarkeit.md")
        "4.4-Sicherheitstests" = @("4.4.1-Penetrationstests.md", "4.4.2-Schwachstellenanalyse.md")
        "4.5-Akzeptanztests" = @("4.5.1-Benutzerakzeptanztests.md", "4.5.2-Geschäftsszenario-Validierung.md")
    }
    "5-Deployment-und-Migration" = @{
        "5.1-Umgebungsvorbereitung" = @("5.1.1-Produktionsumgebung-Setup.md", "5.1.2-Netzwerkkonfiguration.md")
        "5.2-Datenmigration" = @("5.2.1-Migrationsstrategie.md", "5.2.2-Datenvalidierung.md")
        "5.3-Rollout-Planung" = @("5.3.1-Phasenweise-Einführung.md", "5.3.2-Rollback-Strategie.md")
        "5.4-Go-Live" = @("5.4.1-Produktionsfreigabe.md", "5.4.2-Überwachung-und-Stabilisierung.md")
    }
    "6-Betrieb-und-Wartung" = @{
        "6.1-Monitoring" = @("6.1.1-Leistungsüberwachung.md", "6.1.2-Warnmeldungen-und-Benachrichtigungen.md", "6.1.3-Protokollierung.md")
        "6.2-Support" = @("6.2.1-Helpdesk-Einrichtung.md", "6.2.2-Problemeskalationsprozesse.md", "6.2.3-Fernwartung.md")
        "6.3-Wartung-und-Updates" = @("6.3.1-Regelmäßige-Wartung.md", "6.3.2-Sicherheitspatches.md", "6.3.3-Funktions-Updates.md")
        "6.4-Kapazitätsmanagement" = @("6.4.1-Ressourcenüberwachung.md", "6.4.2-Skalierungsplanung.md")
    }
    "7-Optimierung-und-Erweiterung" = @{
        "7.1-Leistungsoptimierung" = @("7.1.1-Bottleneck-Analyse.md", "7.1.2-Feinabstimmung.md")
        "7.2-Funktionserweiterungen" = @("7.2.1-Neue-Funktionen.md", "7.2.2-Integration-neuer-Technologien.md")
        "7.3-Skalierung" = @("7.3.1-Horizontale-Skalierung.md", "7.3.2-Vertikale-Skalierung.md")
        "7.4-Prozessoptimierung" = @("7.4.1-Workflow-Verbesserungen.md", "7.4.2-Automatisierung.md")
    }
    "8-Projektabschluss-und-Evaluation" = @{
        "8.1-Abschlussbericht" = @("8.1.1-Zielerreichung.md", "8.1.2-Lessons-Learned.md")
        "8.2-Übergabe" = @("8.2.1-Dokumentationsübergabe.md", "8.2.2-Schulungen.md")
        "8.3-Nachprojektbewertung" = @("8.3.1-ROI-Analyse.md", "8.3.2-Kundenzufriedenheit.md")
    }
}

function Erstelle-Projektstruktur {
    param (
        [string]$basisPfad,
        [hashtable]$struktur
    )

    foreach ($schlüssel in $struktur.Keys) {
        $pfad = Join-Path -Path $basisPfad -ChildPath $schlüssel
        if ($struktur[$schlüssel] -is [hashtable]) {
            New-Item -Path $pfad -ItemType Directory -Force | Out-Null
            Erstelle-Projektstruktur -basisPfad $pfad -struktur $struktur[$schlüssel]
        }
        elseif ($struktur[$schlüssel] -is [array]) {
            New-Item -Path $pfad -ItemType Directory -Force | Out-Null
            foreach ($datei in $struktur[$schlüssel]) {
                $dateiPfad = Join-Path -Path $pfad -ChildPath $datei
                New-Item -Path $dateiPfad -ItemType File -Force | Out-Null
            }
        }
    }
}

# Setze den Basispfad für das Projekt
$projektName = "RenataMqtt_IIoT_Projekt"
$desktopPfad = [Environment]::GetFolderPath("Desktop")
$basisPfad = Join-Path -Path $desktopPfad -ChildPath $projektName

# Erstelle den Hauptprojektordner
New-Item -Path $basisPfad -ItemType Directory -Force | Out-Null

# Erstelle die Projektstruktur
Erstelle-Projektstruktur -basisPfad $basisPfad -struktur $struktur

Write-Host "Der vollständige Projektlebenszyklus-Baum wurde erfolgreich erstellt unter: $basisPfad" -ForegroundColor Green

# Öffne den Projektordner im Windows Explorer
Invoke-Item $basisPfad
```
# ChecklisteI ITTL OT Projekt IoT-Produktion
## 1. Erste Planung und Anforderungserhebung
- [ ] Projektumfang und Ziele definieren
- [ ] Stakeholder identifizieren und Projektteam bilden
- [ ] Bewertung der aktuellen Infrastruktur und Systeme
- [ ] Sicherheitsanforderungen definieren
- [ ] Skalierbarkeitsanforderungen ermitteln
- [ ] Integrationspunkte mit bestehenden OT/IT-Systemen identifizieren
- [ ] Projektzeitplan und Budget erstellen

## 2. Architekturdesign
- [ ] MQTT-Broker auswählen (z.B. Mosquitto, HiveMQ, VerneMQ)
- [ ] Netzwerktopologie entwerfen
- [ ] Redundanz und hohe Verfügbarkeit planen
- [ ] Datenmodelle und Themenstruktur definieren
- [ ] Sicherheitsarchitektur entwerfen (Authentifizierung, Autorisierung, Verschlüsselung)
- [ ] Datenspeicherung und -analyse planen
- [ ] Systemarchitekturdiagramm erstellen

## 3. Einrichtung der Entwicklungsumgebung
- [ ] Entwicklungsserver einrichten
- [ ] MQTT-Broker für Tests installieren und konfigurieren
- [ ] Versionskontrollsystem einrichten (z.B. Git)
- [ ] CI/CD-Pipeline etablieren
- [ ] Entwicklungs-, Staging- und Produktionsumgebungen erstellen

## 4. MQTT-Broker-Setup
- [ ] MQTT-Broker auf Produktionsservern installieren
- [ ] Broker-Einstellungen konfigurieren (Ports, Protokolle, etc.)
- [ ] Clustering für hohe Verfügbarkeit einrichten (falls zutreffend)
- [ ] Sicherheitseinstellungen konfigurieren (TLS/SSL, Authentifizierung)
- [ ] Überwachung und Protokollierung einrichten
- [ ] Erste Leistungstests und -optimierungen durchführen

## 5. Client-Entwicklung und Integration
- [ ] MQTT-Clients für verschiedene Geräte/Sensoren entwickeln/anpassen
- [ ] MQTT-Protokoll in bestehende Systeme implementieren (falls erforderlich)
- [ ] Middleware für OT-Systemintegration entwickeln
- [ ] Datenaufnahme- und Verarbeitungspipelines erstellen
- [ ] Fehlerbehandlung und Wiederholungsmechanismen implementieren
- [ ] Administrations- und Überwachungstools entwickeln

## 6. Sicherheitsimplementierung
- [ ] TLS/SSL für alle Verbindungen implementieren
- [ ] Zertifikatsverwaltungssystem einrichten
- [ ] Geräte-/Client-Authentifizierung implementieren
- [ ] Autorisierung und Zugriffskontrolllisten (ACLs) konfigurieren
- [ ] Netzwerksegmentierung und Firewalls implementieren
- [ ] Sicherheitsaudits und Penetrationstests durchführen

## 7. Tests und Qualitätssicherung
- [ ] Testpläne entwickeln (Unit-, Integrations-, System-, Leistungstests)
- [ ] Automatisierte Testsuites erstellen
- [ ] Lasttests und Stresstests durchführen
- [ ] Failover- und Wiederherstellungstests durchführen
- [ ] Sicherheitsmaßnahmen testen
- [ ] Datenintegrität und -übertragung validieren

## 8. Bereitstellung
- [ ] Bereitstellungsstrategie und Rollback-Plan entwickeln
- [ ] Bereitstellungsskripte und -verfahren erstellen
- [ ] Stufenweise Einführung in der Produktionsumgebung durchführen
- [ ] Produktionsüberwachung und -alarmierung konfigurieren
- [ ] Abschließende Systemprüfungen und -validierung durchführen

## 9. Dokumentation und Schulung
- [ ] Systemarchitekturdokumentation erstellen
- [ ] Betriebsverfahren und -richtlinien entwickeln
- [ ] Benutzerhandbücher für benutzerdefinierte Tools und Schnittstellen schreiben
- [ ] Schulungsmaterialien für Bediener und Administratoren vorbereiten
- [ ] Schulungen für relevante Mitarbeiter durchführen

## 10. Go-Live und Anfangsunterstützung
- [ ] Abschließende Go-Live-Checkliste durchführen
- [ ] System während des anfänglichen Betriebs überwachen
- [ ] Verstärkte Unterstützung während der frühen Einführungsphase bieten
- [ ] Feedback von Benutzern und Stakeholdern sammeln und bearbeiten
- [ ] System auf Basis der realen Leistung optimieren

## 11. Laufende Wartung und Unterstützung
- [ ] Regelmäßigen Wartungsplan erstellen
- [ ] Automatisierte Gesundheitschecks und Alarme einrichten
- [ ] Log-Rotation und -Archivierung implementieren
- [ ] Update- und Patch-Management-Verfahren entwickeln
- [ ] Kapazitätsplanungs- und Skalierungsverfahren erstellen
- [ ] Leistungsoptimierungsroutinen etablieren

## 12. Kontinuierliche Verbesserung
- [ ] Mechanismen zur Sammlung von Benutzerfeedback einrichten
- [ ] Leistungskennzahlen (KPIs) für die Systemleistung festlegen
- [ ] Systemmetriken regelmäßig überprüfen und analysieren
- [ ] Systemverbesserungen planen und umsetzen
- [ ] Über Entwicklungen des MQTT-Protokolls und Branchenstandards auf dem Laufenden bleiben
- [ ] Regelmäßige Sicherheitsbewertungen und -aktualisierungen durchführen



Ich habe den umfassenden Projektplan für die Einrichtung von MQTT für die IIoT-Produktion ins Deutsche übersetzt. Dieser Plan deckt alles von der anfänglichen Planung bis zur laufenden Wartung und kontinuierlichen Verbesserung ab. Hier sind einige wichtige Punkte zu beachten:

1. Der Plan ist in 12 Hauptabschnitte unterteilt, die jeweils einen wichtigen Aspekt des Projekts abdecken.
2. Er beginnt mit Planung und Anforderungserhebung, was für die Schaffung der richtigen Grundlage wesentlich ist.
3. Besondere Aufmerksamkeit wird der Implementierung der Sicherheit gewidmet, da dies in industriellen Umgebungen von entscheidender Bedeutung ist.
4. Der Plan enthält Schritte für Tests, Bereitstellung und Unterstützung nach der Bereitstellung.
5. Laufende Wartung und kontinuierliche Verbesserung sind eingeschlossen, um langfristigen Erfolg zu gewährleisten.

# ITTL RenataMqtt IIoT-Projekt: Vollständiger Implementierungsleitfaden
## Inhaltsverzeichnis

1. [Einführung](#1-einführung)
2. [Projektstruktur](#2-projektstruktur)
3. [Vorbereitungsphase](#3-vorbereitungsphase)
4. [EMQX-Implementierung](#4-emqx-implementierung)
5. [Azure IoT Hub-Integration](#5-azure-iot-hub-integration)
6. [Datenverarbeitung und -analyse](#6-datenverarbeitung-und--analyse)
7. [Monitoring und Betrieb](#7-monitoring-und-betrieb)
8. [Sicherheit und Compliance](#8-sicherheit-und-compliance)
9. [Leistungsoptimierung](#9-leistungsoptimierung)
10. [Testphase](#10-testphase)
11. [Schulung und Dokumentation](#11-schulung-und-dokumentation)
12. [Go-Live und Support](#12-go-live-und-support)
13. [Kontinuierliche Verbesserung](#13-kontinuierliche-verbesserung)

## 1. Einführung

Dieser Leitfaden beschreibt die detaillierten Schritte zur Implementierung des RenataMqtt IIoT-Projekts bei Renata SA. Er basiert auf der Verwendung von EMQX als MQTT-Broker und der Integration mit Azure IoT-Diensten.

## 2. Projektstruktur

```
RenataMqtt_IIoT_Implementierungsleitfaden/
├── 1-Einführung/
│   └── 1.1-Projektübersicht.md
│
├── 2-Vorbereitungsphase/
│   ├── 2.1-Anforderungsanalyse/
│   │   ├── 2.1.1-Stakeholder-Anforderungen.md
│   │   ├── 2.1.2-Geräte-und-Nachrichtenvolumen.md
│   │   └── 2.1.3-Sicherheits-und-Compliance-Anforderungen.md
│   └── 2.2-Infrastrukturplanung/
│       ├── 2.2.1-OT-Netzwerktopologie.md
│       ├── 2.2.2-Azure-Ressourcenplanung.md
│       └── 2.2.3-EMQX-Cluster-Architektur.md
│
├── 3-EMQX-Implementierung/
│   ├── 3.1-Installation-und-Konfiguration/
│   │   ├── 3.1.1-EMQX-auf-AKS-Installation.md
│   │   ├── 3.1.2-Cluster-Konfiguration.md
│   │   └── 3.1.3-SSL-TLS-Konfiguration.md
│   └── 3.2-Sicherheitskonfiguration/
│       ├── 3.2.1-X509-Zertifikatauthentifizierung.md
│       ├── 3.2.2-ACL-Konfiguration.md
│       └── 3.2.3-TLS-Aktivierung.md
│
├── 4-Azure-IoT-Hub-Integration/
│   ├── 4.1-IoT-Hub-Einrichtung/
│   │   ├── 4.1.1-IoT-Hub-Erstellung.md
│   │   └── 4.1.2-Skalierungskonfiguration.md
│   ├── 4.2-Gerätebereitstellung/
│   │   ├── 4.2.1-DPS-Implementierung.md
│   │   └── 4.2.2-Geräteidentitäten-Erstellung.md
│   └── 4.3-Nachrichtenrouting/
│       ├── 4.3.1-IoT-Hub-Routen.md
│       └── 4.3.2-Event-Hubs-Integration.md
│
├── 5-Datenverarbeitung-und-Analyse/
│   ├── 5.1-Stream-Analytics/
│   │   ├── 5.1.1-Job-Erstellung.md
│   │   └── 5.1.2-Analyseabfragen.md
│   └── 5.2-Datenspeicherung/
│       ├── 5.2.1-Blob-Storage-Konfiguration.md
│       └── 5.2.2-Datenpartitionierung.md
│
├── 6-Monitoring-und-Betrieb/
│   ├── 6.1-EMQX-Monitoring/
│   │   ├── 6.1.1-Dashboard-Konfiguration.md
│   │   ├── 6.1.2-Prometheus-Grafana-Setup.md
│   │   └── 6.1.3-Alerting-Konfiguration.md
│   └── 6.2-Azure-Monitoring/
│       ├── 6.2.1-Azure-Monitor-Aktivierung.md
│       └── 6.2.2-OT-spezifische-Dashboards.md
│
├── 7-Sicherheit-und-Compliance/
│   ├── 7.1-Netzwerksicherheit/
│   │   ├── 7.1.1-Netzwerksegmentierung.md
│   │   └── 7.1.2-Firewall-Konfiguration.md
│   └── 7.2-Datenschutz/
│       ├── 7.2.1-Datenverschlüsselung.md
│       └── 7.2.2-DSGVO-Compliance.md
│
├── 8-Leistungsoptimierung/
│   ├── 8.1-MQTT-Optimierung/
│   │   ├── 8.1.1-MQTT5-Features.md
│   │   └── 8.1.2-EMQX-Leistungstuning.md
│   └── 8.2-Azure-Optimierung/
│       ├── 8.2.1-Message-Enrichment.md
│       └── 8.2.2-IoT-Edge-Integration.md
│
├── 9-Testphase/
│   ├── 9.1-Lasttests/
│   │   ├── 9.1.1-Testplanung.md
│   │   └── 9.1.2-Leistungsverifikation.md
│   └── 9.2-Sicherheitstests/
│       ├── 9.2.1-Penetrationstests.md
│       └── 9.2.2-Sicherheitsüberprüfung.md
│
├── 10-Schulung-und-Dokumentation/
│   ├── 10.1-Technische-Dokumentation/
│   │   ├── 10.1.1-Betriebshandbücher.md
│   │   └── 10.1.2-Konfigurationsdokumentation.md
│   └── 10.2-Schulungsprogramme/
│       ├── 10.2.1-OT-IT-Schulungen.md
│       └── 10.2.2-Schulungsunterlagen.md
│
├── 11-Go-Live-und-Support/
│   ├── 11.1-Rollout-Plan/
│   │   ├── 11.1.1-Stufenweiser-Rollout.md
│   │   └── 11.1.2-Go-No-Go-Kriterien.md
│   └── 11.2-Support-Struktur/
│       ├── 11.2.1-24-7-Supportteam.md
│       └── 11.2.2-Ticketsystem-Implementierung.md
│
└── 12-Kontinuierliche-Verbesserung/
    ├── 12.1-Feedback-Mechanismen/
    │   ├── 12.1.1-Leistungsüberwachung.md
    │   └── 12.1.2-Stakeholder-Reviews.md
    └── 12.2-Technologie-Updates/
        ├── 12.2.1-Update-Planung.md
        └── 12.2.2-Best-Practices-Monitoring.md
```

## 3. Vorbereitungsphase

### 3.1 Anforderungsanalyse
- Erfassen Sie detaillierte Anforderungen von allen Stakeholdern
- Definieren Sie die erwartete Anzahl von Geräten und Nachrichtenvolumen
- Identifizieren Sie spezifische Sicherheits- und Compliance-Anforderungen

### 3.2 Infrastrukturplanung
- Entwerfen Sie die Netzwerktopologie für das OT-Netzwerk
- Planen Sie die Azure-Ressourcen (IoT Hub, Event Hubs, etc.)
- Definieren Sie die EMQX-Cluster-Architektur

## 4. EMQX-Implementierung

### 4.1 Installation und Konfiguration
- Installieren Sie EMQX auf Azure Kubernetes Service (AKS)
- Konfigurieren Sie die EMQX-Cluster für Hochverfügbarkeit
- Implementieren Sie die folgende Beispielkonfiguration für SSL/TLS:
  ```
  listener.ssl.external = 8883
  listener.ssl.external.keyfile = /path/to/server.key
  listener.ssl.external.certfile = /path/to/server.crt
  listener.ssl.external.cacertfile = /path/to/ca.crt
  listener.ssl.external.verify = verify_peer
  listener.ssl.external.fail_if_no_peer_cert = true
  ```

### 4.2 Sicherheitskonfiguration
- Richten Sie die X.509-Zertifikatauthenifizierung ein
- Konfigurieren Sie Zugriffskontrolllisten (ACLs) für Topic-Autorisierung
- Aktivieren Sie TLS 1.2 oder höher für alle Verbindungen

## 5. Azure IoT Hub-Integration

### 5.1 IoT Hub-Einrichtung
- Erstellen Sie einen neuen IoT Hub in Ihrem Azure-Abonnement
- Konfigurieren Sie die Skalierungsoptionen basierend auf der erwarteten Gerätezahl

### 5.2 Gerätebereitstellung
- Implementieren Sie den Device Provisioning Service (DPS) für automatische Geräteregistrierung
- Erstellen Sie Geräteidentitäten im IoT Hub für Ihre IIoT-Geräte

### 5.3 Nachrichtenrouting
- Konfigurieren Sie Nachrichtenrouten im IoT Hub zu anderen Azure-Diensten
- Richten Sie Event Hubs für die Weiterleitung von Gerätedaten ein

## 6. Datenverarbeitung und -analyse

### 6.1 Stream Analytics
- Erstellen Sie Azure Stream Analytics-Jobs für Echtzeit-Datenverarbeitung
- Definieren Sie Abfragen zur Datenanalyse und -aggregation

### 6.2 Datenspeicherung
- Konfigurieren Sie Azure Blob Storage oder Azure Data Lake für Langzeitspeicherung
- Implementieren Sie Datenpartitionierung für effiziente Abfragen

## 7. Monitoring und Betrieb

### 7.1 EMQX-Monitoring
- Konfigurieren Sie das EMQX-Dashboard für Echtzeit-Monitoring
- Richten Sie Prometheus und Grafana für erweiterte Metriken ein
- Implementieren Sie Alerts für kritische Ereignisse

### 7.2 Azure-Monitoring
- Aktivieren Sie Azure Monitor für IoT Hub und andere Azure-Ressourcen
- Erstellen Sie benutzerdefinierte Dashboards für OT-spezifische Metriken

## 8. Sicherheit und Compliance

### 8.1 Netzwerksicherheit
- Implementieren Sie Netzwerksegmentierung zwischen OT und IT
- Konfigurieren Sie Azure Firewall oder Network Security Groups

### 8.2 Datenschutz
- Implementieren Sie Datenverschlüsselung in Ruhe und während der Übertragung
- Stellen Sie DSGVO-Compliance durch geeignete Datenverarbeitungspraktiken sicher

## 9. Leistungsoptimierung

### 9.1 MQTT-Optimierung
- Nutzen Sie MQTT 5-Features wie Shared Subscriptions für bessere Skalierbarkeit
- Optimieren Sie die EMQX-Konfiguration für maximale Leistung:
  ```
  node.process_limit = 2048000
  node.max_ports = 1048576
  ```

### 9.2 Azure-Optimierung
- Implementieren Sie Message Enrichment im IoT Hub zur Reduzierung der Nachrichtengröße
- Nutzen Sie Azure IoT Edge für Datenvorverarbeitung am Netzwerkrand

## 10. Testphase

### 10.1 Lasttests
- Führen Sie Lasttests mit simulierten Geräten durch
- Verifizieren Sie die Systemleistung unter erwarteter Last

### 10.2 Sicherheitstests
- Führen Sie Penetrationstests durch
- Überprüfen Sie die Wirksamkeit der Sicherheitsmaßnahmen

## 11. Schulung und Dokumentation

### 11.1 Technische Dokumentation
- Erstellen Sie detaillierte Betriebshandbücher
- Dokumentieren Sie alle Konfigurationen und Anpassungen

### 11.2 Schulungsprogramme
- Führen Sie Schulungen für OT- und IT-Personal durch
- Erstellen Sie Schulungsunterlagen für kontinuierliche Weiterbildung

## 12. Go-Live und Support

### 12.1 Rollout-Plan
- Entwickeln Sie einen gestaffelten Rollout-Plan
- Definieren Sie klare Go/No-Go-Kriterien

### 12.2 Support-Struktur
- Etablieren Sie ein 24/7-Supportteam
- Implementieren Sie ein Ticketsystem für Problemverfolgung

## 13. Kontinuierliche Verbesserung

### 13.1 Feedback-Mechanismen
- Implementieren Sie Prozesse zur kontinuierlichen Leistungsüberwachung
- Richten Sie regelmäßige Reviews mit Stakeholdern ein

### 13.2 Technologie-Updates
- Planen Sie regelmäßige Updates von EMQX und Azure-Komponenten
- Bleiben Sie über neue Funktionen und Best Practices auf dem Laufenden


## Script
1. Copy&Past to a text editor and save with a name.ps1 .
2. Run as Admin in PowerShell in the Folder where you like to generate the folder Stucture.
```powershell
# MQTT IIoT-Projekt: Vollständiger Implementierungsleitfaden Generator

# Definiere die Projektstruktur
$struktur = @{
    "1-Einführung" = @("1.1-Projektübersicht.md")
    "2-Vorbereitungsphase" = @{
        "2.1-Anforderungsanalyse" = @("2.1.1-Stakeholder-Anforderungen.md", "2.1.2-Geräte-und-Nachrichtenvolumen.md", "2.1.3-Sicherheits-und-Compliance-Anforderungen.md")
        "2.2-Infrastrukturplanung" = @("2.2.1-OT-Netzwerktopologie.md", "2.2.2-Azure-Ressourcenplanung.md", "2.2.3-EMQX-Cluster-Architektur.md")
    }
    "3-EMQX-Implementierung" = @{
        "3.1-Installation-und-Konfiguration" = @("3.1.1-EMQX-auf-AKS-Installation.md", "3.1.2-Cluster-Konfiguration.md", "3.1.3-SSL-TLS-Konfiguration.md")
        "3.2-Sicherheitskonfiguration" = @("3.2.1-X509-Zertifikatauthentifizierung.md", "3.2.2-ACL-Konfiguration.md", "3.2.3-TLS-Aktivierung.md")
    }
    "4-Azure-IoT-Hub-Integration" = @{
        "4.1-IoT-Hub-Einrichtung" = @("4.1.1-IoT-Hub-Erstellung.md", "4.1.2-Skalierungskonfiguration.md")
        "4.2-Gerätebereitstellung" = @("4.2.1-DPS-Implementierung.md", "4.2.2-Geräteidentitäten-Erstellung.md")
        "4.3-Nachrichtenrouting" = @("4.3.1-IoT-Hub-Routen.md", "4.3.2-Event-Hubs-Integration.md")
    }
    "5-Datenverarbeitung-und-Analyse" = @{
        "5.1-Stream-Analytics" = @("5.1.1-Job-Erstellung.md", "5.1.2-Analyseabfragen.md")
        "5.2-Datenspeicherung" = @("5.2.1-Blob-Storage-Konfiguration.md", "5.2.2-Datenpartitionierung.md")
    }
    "6-Monitoring-und-Betrieb" = @{
        "6.1-EMQX-Monitoring" = @("6.1.1-Dashboard-Konfiguration.md", "6.1.2-Prometheus-Grafana-Setup.md", "6.1.3-Alerting-Konfiguration.md")
        "6.2-Azure-Monitoring" = @("6.2.1-Azure-Monitor-Aktivierung.md", "6.2.2-OT-spezifische-Dashboards.md")
    }
    "7-Sicherheit-und-Compliance" = @{
        "7.1-Netzwerksicherheit" = @("7.1.1-Netzwerksegmentierung.md", "7.1.2-Firewall-Konfiguration.md")
        "7.2-Datenschutz" = @("7.2.1-Datenverschlüsselung.md", "7.2.2-DSGVO-Compliance.md")
    }
    "8-Leistungsoptimierung" = @{
        "8.1-MQTT-Optimierung" = @("8.1.1-MQTT5-Features.md", "8.1.2-EMQX-Leistungstuning.md")
        "8.2-Azure-Optimierung" = @("8.2.1-Message-Enrichment.md", "8.2.2-IoT-Edge-Integration.md")
    }
    "9-Testphase" = @{
        "9.1-Lasttests" = @("9.1.1-Testplanung.md", "9.1.2-Leistungsverifikation.md")
        "9.2-Sicherheitstests" = @("9.2.1-Penetrationstests.md", "9.2.2-Sicherheitsüberprüfung.md")
    }
    "10-Schulung-und-Dokumentation" = @{
        "10.1-Technische-Dokumentation" = @("10.1.1-Betriebshandbücher.md", "10.1.2-Konfigurationsdokumentation.md")
        "10.2-Schulungsprogramme" = @("10.2.1-OT-IT-Schulungen.md", "10.2.2-Schulungsunterlagen.md")
    }
    "11-Go-Live-und-Support" = @{
        "11.1-Rollout-Plan" = @("11.1.1-Stufenweiser-Rollout.md", "11.1.2-Go-No-Go-Kriterien.md")
        "11.2-Support-Struktur" = @("11.2.1-24-7-Supportteam.md", "11.2.2-Ticketsystem-Implementierung.md")
    }
    "12-Kontinuierliche-Verbesserung" = @{
        "12.1-Feedback-Mechanismen" = @("12.1.1-Leistungsüberwachung.md", "12.1.2-Stakeholder-Reviews.md")
        "12.2-Technologie-Updates" = @("12.2.1-Update-Planung.md", "12.2.2-Best-Practices-Monitoring.md")
    }
}

function Erstelle-Projektstruktur {
    param (
        [string]$basisPfad,
        [hashtable]$struktur
    )

    foreach ($schlüssel in $struktur.Keys) {
        $pfad = Join-Path -Path $basisPfad -ChildPath $schlüssel
        if ($struktur[$schlüssel] -is [hashtable]) {
            New-Item -Path $pfad -ItemType Directory -Force | Out-Null
            Erstelle-Projektstruktur -basisPfad $pfad -struktur $struktur[$schlüssel]
        }
        elseif ($struktur[$schlüssel] -is [array]) {
            New-Item -Path $pfad -ItemType Directory -Force | Out-Null
            foreach ($datei in $struktur[$schlüssel]) {
                $dateiPfad = Join-Path -Path $pfad -ChildPath $datei
                New-Item -Path $dateiPfad -ItemType File -Force | Out-Null
            }
        }
    }
}

# Setze den Basispfad für das Projekt
$projektName = "RenataMqtt_IIoT_Implementierungsleitfaden"
$desktopPfad = [Environment]::GetFolderPath("Desktop")
$basisPfad = Join-Path -Path $desktopPfad -ChildPath $projektName

# Erstelle den Hauptprojektordner
New-Item -Path $basisPfad -ItemType Directory -Force | Out-Null

# Erstelle die Projektstruktur
Erstelle-Projektstruktur -basisPfad $basisPfad -struktur $struktur

Write-Host "Der vollständige Implementierungsleitfaden wurde erfolgreich erstellt unter: $basisPfad" -ForegroundColor Green

# Öffne den Projektordner im Windows Explorer
Invoke-Item $basisPfad
```

# ITTL MQTT IIoT-Projekt: Architekturdesign-Plan


## Einführung

Dieser Architekturdesign-Plan beschreibt die technische Struktur und die Komponenten des MQTT IIoT-Projekts für Renata SA. Er dient als Leitfaden für die Entwicklung und Implementierung der IIoT-Infrastruktur unter Verwendung von MQTT als Kommunikationsprotokoll und Azure als Cloud-Plattform.

## Strukturbaum

```
MQTT_IIoT_Architektur/
├── 1-Systemübersicht/
│   ├── 1.1-Architektur-Diagramm.md
│   ├── 1.2-Komponenten-Beschreibung.md
│   └── 1.3-Technologie-Stack.md
│
├── 2-MQTT-Broker-Architektur/
│   ├── 2.1-Broker-Auswahl/
│   │   ├── 2.1.1-Vergleichsmatrix.md
│   │   └── 2.1.2-EMQX-Spezifikationen.md
│   ├── 2.2-Cluster-Konfiguration/
│   │   ├── 2.2.1-Hochverfügbarkeit.md
│   │   └── 2.2.2-Lastverteilung.md
│   ├── 2.3-Topic-Struktur/
│   │   ├── 2.3.1-Naming-Konventionen.md
│   │   └── 2.3.2-Hierarchie-Design.md
│   └── 2.4-QoS-Konfiguration.md
│
├── 3-Cloud-Infrastruktur/
│   ├── 3.1-Azure-IoT-Hub/
│   │   ├── 3.1.1-Hub-Konfiguration.md
│   │   └── 3.1.2-Gerätebereitstellung.md
│   ├── 3.2-Azure-Event-Hubs/
│   │   └── 3.2.1-Datenerfassung-und-Streaming.md
│   ├── 3.3-Azure-Stream-Analytics/
│   │   └── 3.3.1-Echtzeitverarbeitung.md
│   ├── 3.4-Azure-Data-Lake/
│   │   └── 3.4.1-Langzeitspeicherung.md
│   └── 3.5-Azure-Kubernetes-Service/
│       └── 3.5.1-EMQX-Deployment.md
│
├── 4-Edge-Computing/
│   ├── 4.1-Edge-Geräte-Spezifikationen.md
│   ├── 4.2-Lokale-Datenverarbeitung.md
│   └── 4.3-Edge-zu-Cloud-Synchronisation.md
│
├── 5-Datenfluss-und-Integration/
│   ├── 5.1-Datenerfassungs-Pipeline.md
│   ├── 5.2-Datenverarbeitungs-Workflow.md
│   ├── 5.3-Datenbank-Integration/
│   │   ├── 5.3.1-Schema-Design.md
│   │   └── 5.3.2-Datenbankauswahl.md
│   └── 5.4-API-Design/
│       ├── 5.4.1-REST-API-Spezifikation.md
│       └── 5.4.2-GraphQL-Schema.md
│
├── 6-Sicherheitsarchitektur/
│   ├── 6.1-Authentifizierung/
│   │   ├── 6.1.1-Geräte-Authentifizierung.md
│   │   └── 6.1.2-Benutzer-Authentifizierung.md
│   ├── 6.2-Verschlüsselung/
│   │   ├── 6.2.1-TLS-Konfiguration.md
│   │   └── 6.2.2-Datenverschlüsselung.md
│   ├── 6.3-Zugriffskontrolle/
│   │   ├── 6.3.1-RBAC-Modell.md
│   │   └── 6.3.2-ACL-Konfiguration.md
│   └── 6.4-Netzwerksicherheit/
│       ├── 6.4.1-Firewalls.md
│       └── 6.4.2-VPN-Konfiguration.md
│
├── 7-Skalierbarkeit-und-Leistung/
│   ├── 7.1-Lastverteilung.md
│   ├── 7.2-Auto-Skalierung.md
│   ├── 7.3-Caching-Strategien.md
│   └── 7.4-Leistungsmetriken.md
│
├── 8-Monitoring-und-Logging/
│   ├── 8.1-Zentrales-Logging-System.md
│   ├── 8.2-Überwachungs-Dashboards.md
│   ├── 8.3-Alarmierung.md
│   └── 8.4-Audit-Trails.md
│
└── 9-Disaster-Recovery-und-Backup/
    ├── 9.1-Backup-Strategien.md
    ├── 9.2-Wiederherstellungsprozesse.md
    └── 9.3-Business-Continuity-Plan.md
```

## Komponentenbeschreibung

1. **Systemübersicht**: Bietet einen Überblick über die Gesamtarchitektur und die verwendeten Technologien.

2. **MQTT-Broker-Architektur**: Detailliert die Konfiguration und das Setup des EMQX MQTT-Brokers.

3. **Cloud-Infrastruktur**: Beschreibt die Azure-Dienste, die für das IIoT-Projekt genutzt werden.

4. **Edge-Computing**: Erläutert die Architektur und Funktionen der Edge-Geräte.

5. **Datenfluss und Integration**: Zeigt, wie Daten durch das System fließen und mit anderen Systemen integriert werden.

6. **Sicherheitsarchitektur**: Umfasst alle Sicherheitsaspekte des Systems, von der Authentifizierung bis zur Netzwerksicherheit.

7. **Skalierbarkeit und Leistung**: Beschreibt Strategien zur Gewährleistung der Systemleistung unter hoher Last.

8. **Monitoring und Logging**: Definiert, wie das System überwacht und wie Ereignisse protokolliert werden.

9. **Disaster Recovery und Backup**: Legt Strategien für den Notfall und die Datensicherung fest.

## Nächste Schritte

1. Detaillierte Ausarbeitung jeder Komponente
2. Review und Validierung des Designs mit allen Stakeholdern
3. Erstellung eines Proof of Concept für kritische Komponenten
4. Feinabstimmung des Designs basierend auf PoC-Ergebnissen
5. Festlegung von Implementierungsprioritäten

Dieser Architekturdesign-Plan bietet eine solide Grundlage für die Entwicklung und Implementierung des MQTT IIoT-Projekts bei Renata SA. Er berücksichtigt alle wichtigen Aspekte eines robusten, skalierbaren und sicheren IIoT-Systems.


## Script
1. Copy&Past to a text editor and save with a name.ps1 .
2. Run as Admin in PowerShell in the Folder where you like to generate the folder Stucture.
```powershell
# MQTT IIoT-Projekt: Architekturdesign-Plan Generator

# Definiere die Projektstruktur
$struktur = @{
    "1-Systemübersicht" = @("1.1-Architektur-Diagramm.md", "1.2-Komponenten-Beschreibung.md", "1.3-Technologie-Stack.md")
    "2-MQTT-Broker-Architektur" = @{
        "2.1-Broker-Auswahl" = @("2.1.1-Vergleichsmatrix.md", "2.1.2-EMQX-Spezifikationen.md")
        "2.2-Cluster-Konfiguration" = @("2.2.1-Hochverfügbarkeit.md", "2.2.2-Lastverteilung.md")
        "2.3-Topic-Struktur" = @("2.3.1-Naming-Konventionen.md", "2.3.2-Hierarchie-Design.md")
        "2.4-QoS-Konfiguration.md" = $null
    }
    "3-Cloud-Infrastruktur" = @{
        "3.1-Azure-IoT-Hub" = @("3.1.1-Hub-Konfiguration.md", "3.1.2-Gerätebereitstellung.md")
        "3.2-Azure-Event-Hubs" = @("3.2.1-Datenerfassung-und-Streaming.md")
        "3.3-Azure-Stream-Analytics" = @("3.3.1-Echtzeitverarbeitung.md")
        "3.4-Azure-Data-Lake" = @("3.4.1-Langzeitspeicherung.md")
        "3.5-Azure-Kubernetes-Service" = @("3.5.1-EMQX-Deployment.md")
    }
    "4-Edge-Computing" = @("4.1-Edge-Geräte-Spezifikationen.md", "4.2-Lokale-Datenverarbeitung.md", "4.3-Edge-zu-Cloud-Synchronisation.md")
    "5-Datenfluss-und-Integration" = @{
        "5.1-Datenerfassungs-Pipeline.md" = $null
        "5.2-Datenverarbeitungs-Workflow.md" = $null
        "5.3-Datenbank-Integration" = @("5.3.1-Schema-Design.md", "5.3.2-Datenbankauswahl.md")
        "5.4-API-Design" = @("5.4.1-REST-API-Spezifikation.md", "5.4.2-GraphQL-Schema.md")
    }
    "6-Sicherheitsarchitektur" = @{
        "6.1-Authentifizierung" = @("6.1.1-Geräte-Authentifizierung.md", "6.1.2-Benutzer-Authentifizierung.md")
        "6.2-Verschlüsselung" = @("6.2.1-TLS-Konfiguration.md", "6.2.2-Datenverschlüsselung.md")
        "6.3-Zugriffskontrolle" = @("6.3.1-RBAC-Modell.md", "6.3.2-ACL-Konfiguration.md")
        "6.4-Netzwerksicherheit" = @("6.4.1-Firewalls.md", "6.4.2-VPN-Konfiguration.md")
    }
    "7-Skalierbarkeit-und-Leistung" = @("7.1-Lastverteilung.md", "7.2-Auto-Skalierung.md", "7.3-Caching-Strategien.md", "7.4-Leistungsmetriken.md")
    "8-Monitoring-und-Logging" = @("8.1-Zentrales-Logging-System.md", "8.2-Überwachungs-Dashboards.md", "8.3-Alarmierung.md", "8.4-Audit-Trails.md")
    "9-Disaster-Recovery-und-Backup" = @("9.1-Backup-Strategien.md", "9.2-Wiederherstellungsprozesse.md", "9.3-Business-Continuity-Plan.md")
}

function Erstelle-Projektstruktur {
    param (
        [string]$basisPfad,
        [hashtable]$struktur
    )

    foreach ($schlüssel in $struktur.Keys) {
        $pfad = Join-Path -Path $basisPfad -ChildPath $schlüssel
        if ($struktur[$schlüssel] -is [hashtable]) {
            New-Item -Path $pfad -ItemType Directory -Force | Out-Null
            Erstelle-Projektstruktur -basisPfad $pfad -struktur $struktur[$schlüssel]
        }
        elseif ($struktur[$schlüssel] -is [array]) {
            New-Item -Path $pfad -ItemType Directory -Force | Out-Null
            foreach ($datei in $struktur[$schlüssel]) {
                $dateiPfad = Join-Path -Path $pfad -ChildPath $datei
                New-Item -Path $dateiPfad -ItemType File -Force | Out-Null
            }
        }
        elseif ($null -eq $struktur[$schlüssel]) {
            New-Item -Path $pfad -ItemType File -Force | Out-Null
        }
    }
}

# Setze den Basispfad für das Projekt
$projektName = "MQTT_IIoT_Architekturdesign_Plan"
$desktopPfad = [Environment]::GetFolderPath("Desktop")
$basisPfad = Join-Path -Path $desktopPfad -ChildPath $projektName

# Erstelle den Hauptprojektordner
New-Item -Path $basisPfad -ItemType Directory -Force | Out-Null

# Erstelle die Projektstruktur
Erstelle-Projektstruktur -basisPfad $basisPfad -struktur $struktur

Write-Host "Der Architekturdesign-Plan wurde erfolgreich erstellt unter: $basisPfad" -ForegroundColor Green

# Öffne den Projektordner im Windows Explorer
Invoke-Item $basisPfad
```

> [!NOTE]
> Marc Strub OTM 
Renata SA Swatch Group

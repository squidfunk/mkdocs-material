# Multiple Device Assignment Audit Report DE

**Document Classification:** VERTRAULICH
**Organization:** Renata SA
**Prepared By:** ISM Team
**Role:** Information Security Management
**Reference:** REN-MDA-AUDIT-2024-001
**Date:** October 29, 2024
**Audit Period:** January 2024 - October 2024
**Data Source:** Microsoft Entra ID (Azure AD) CSV Export
**Export File:** AD_ExportDevice_2024-10-29.csv
**Export Date:** October 29, 2024
**Compliance Framework:** ISO/IEC 27001:2022


## Zusammenfassung
Dieser Bericht analysiert Benutzer mit Mehrfachgerätezuweisungen innerhalb der Organisation. Alle Daten basieren auf aktiven Geräten mit Anmeldeaktivitäten im Jahr 2024. Die Analyse zeigt, dass 16 Benutzer mehrere Geräte zugewiesen bekommen haben, wobei die meisten Zuweisungen klaren geschäftlichen Mustern folgen (Desktop + Mobile-Gerätekombinationen).

## Wichtigste Erkenntnisse
1. **Compliance-Rate:** 100% der Mehrfachgerätezuweisungen zeigen aktive Nutzung in 2024
2. **Geräteaktivität:** 94% der Geräte zeigen Anmeldeaktivitäten innerhalb der letzten 30 Tage
3. **Zuweisungsmuster:** Die meisten Benutzer (15 von 16) haben 2 Geräte; ein Benutzer hat 3 Geräte

## Detaillierte Analyse

### 1. Gerätetypverteilung

#### Mobile Geräte
| Gerätetyp | Anzahl | Prozentsatz |
|------------|--------|------------|
| Surface Pro (9 & 10) | 6 | 18,2% |
| EliteBook Serie | 15 | 45,5% |
| Mobile Geräte Gesamt | 21 | 63,7% |

#### Desktop/Workstation
| Gerätetyp | Anzahl | Prozentsatz |
|------------|--------|------------|
| EliteDesk Serie | 11 | 33,3% |
| Z2 Tower Workstation | 1 | 3,0% |
| Desktop Gesamt | 12 | 36,3% |

### 2. Zuweisungskategorien

#### A. Standard Desktop + Mobile Kombinationen
*Benutzer mit komplementären Gerätetypen für verschiedene Arbeitsszenarien*

| Benutzername | Desktop-Gerät | Mobiles Gerät | Letzte Aktivität (Beide Geräte) |
|-----------|---------------|---------------|----------------------------|
| Grundmann, Sebastian | EliteDesk 800 G4 | EliteBook x360 1040 G8 | Innerhalb der letzten 14 Tage |
| Leupi, Daniel | EliteDesk 800 G4 | EliteBook x360 1040 G6 | Innerhalb der letzten 7 Tage |
| Chramosta, Thomas | EliteDesk 800 G4 | EliteBook x360 1040 G6 | Innerhalb der letzten 7 Tage |
| Furer, Patrick | Z2 Tower G4 | EliteBook 850 G6 | Innerhalb der letzten 14 Tage |

#### B. Mehrere Mobile Geräte
*Benutzer mit mehreren tragbaren Geräten*

| Benutzername | Primäres Gerät | Sekundäres Gerät | Anmerkungen |
|-----------|---------------|------------------|--------|
| Wu, Qiong | Surface Pro 9 | Surface Pro 9 | Beide aktiv genutzt |
| Dema, Diona | Surface Pro 10 | EliteBook 860 G10 | Unterschiedliche Formfaktoren |
| Strub, Marc | Surface Pro 9 | Nicht spezifiziertes Gerät | Kürzliche Aktivität auf beiden |

#### C. Workstation-Upgrades/Übergänge
*Benutzer mit aufeinanderfolgenden Geräte-Upgrades*

| Benutzername | Älteres Modell | Neueres Modell | Übergangsstatus |
|-----------|------------|-------------|-------------------|
| Fiechter, Dominik | EliteDesk 800 G3 | EliteDesk 800 G4 | Aktive Nutzung beider |
| Causevic, Amel | EliteDesk 800 G3 | EliteDesk 800 G4 | Aktive Nutzung beider |

#### D. Sonderfälle
*Benutzer mit drei oder einzigartigen Gerätekombinationen*

| Benutzername | Geräte | Anmerkungen |
|-----------|---------|--------|
| Schwandt, Juan-Luis | 3 Geräte: EliteBook 840 G10, EliteBook x360 1030 G2, EliteDesk 800 G4 | Einziger Benutzer mit 3 Geräten |

### 3. Aktivitätsanalyse

#### Aktuelle Aktivitätsmuster
- 85% der Geräte zeigen Anmeldeaktivitäten im Oktober 2024
- 12% zeigen Aktivitäten im September 2024
- 3% zeigen Aktivitäten vor September 2024

#### Nutzungskonsistenz
| Aktivitätsmuster | Anzahl Benutzer | Prozentsatz |
|-----------------|-----------------|------------|
| Beide Geräte innerhalb von 7 Tagen genutzt | 12 | 75% |
| Beide Geräte innerhalb von 30 Tagen genutzt | 3 | 18,75% |
| Unregelmäßiges Nutzungsmuster | 1 | 6,25% |

## Compliance-Überlegungen

### Risikobewertung
1. **Bereiche mit geringem Risiko:**
   - Alle Geräte zeigen aktuelle Aktivität
   - Klare geschäftliche Begründung für die meisten Kombinationen
   - Konsistente Nutzungsmuster

2. **Zu überprüfende Bereiche:**
   - Drei-Geräte-Zuweisungen (1 Fall)
   - Doppelte Modellzuweisungen (Surface Pro 9 Fall)

### Empfehlungen

1. **Dokumentationsverbesserung:**
   - Implementierung formaler Begründungsdokumentation für Mehrfachgerätezuweisungen
   - Erstellung eines Standard-Genehmigungsworkflows für Mehrfachgeräteanfragen

2. **Richtlinienaktualisierungen:**
   - Festlegung klarer Kriterien für Mehrfachgerätezuweisungen
   - Einführung regelmäßiger Überprüfungszyklen für Mehrfachgerätezuweisungen

3. **Überwachungsverbesserungen:**
   - Implementierung vierteljährlicher Überprüfung der Gerätenutzungsmuster
   - Erstellung automatisierter Warnungen für ungewöhnliche Gerätekombinationen

## Anhang A: Gerätemodellverteilung
| Modell | Anzahl | Prozentsatz |
|-------|--------|------------|
| EliteBook x360 1040 (alle Serien) | 8 | 24,2% |
| EliteDesk 800 G4 DM 65W | 7 | 21,2% |
| Surface Pro (alle Modelle) | 6 | 18,2% |
| EliteBook 860 G10 | 4 | 12,1% |
| EliteBook 850 G6 | 3 | 9,1% |
| Andere Modelle | 5 | 15,2% |

## Anhang B: Analysemethodik

### Datenerfassung und -verarbeitung
Diese Prüfung verwendet einen fortschrittlichen analytischen Ansatz zur Untersuchung aller Gerätenutzungen anhand von Anmeldemustern, unabhängig von der zugewiesenen Eigentümerschaft. Während die Standard-Sicherheitskontrollen und ISO-Compliance-Anforderungen über alle Swatch Group-Unternehmen hinweg unverändert bleiben, wurde diese spezifische Analysemethodik von und für Renata SA entwickelt, um zusätzliche Einblicke in unsere spezifische Betriebsumgebung zu gewinnen.

1. **Datenextraktion:**
   - Vollständiger Gerätelistenexport aus Microsoft Entra ID (`AD_ExportDevice_2024-10-29.csv`)
   - Vollständiger Anmeldeverlauf für alle Geräte
   - Hardware-Spezifikationen und Geräte-Metadaten
   - Benutzerzugriffsmuster und Zeitstempel

2. **Musteranalyse:**
   - Python-basierte Anmeldesequenzanalyse
   - Querverweise von Anmeldezeitstempeln mit Gerätezuweisungen
   - Hardware-Typ-Korrelation
   - Zeitliche Mustererkennung
   - Benutzerbewegungsverfolgung zwischen Geräten

3. **Compliance-Überprüfung:**
   - Identifizierung von Anmeldemusteranomalien
   - Erkennung von Azure AD-systemgenerierten Inkonsistenzen
   - Kreuzvalidierung von Geräteeigentum versus tatsächlicher Nutzung
   - Analyse von Zugriffsmustern-Unregelmäßigkeiten

Diese zusätzliche Analyseebene, die spezifisch für Renata SA ist, operiert innerhalb und erweitert unser Standard-Sicherheitsframework und ermöglicht die Identifizierung von:
- Compliance-Problemen, die bei traditionellen Audits übersehen werden
- Systemgenerierten Fehlern in Azure AD
- Diskrepanzen zwischen zugewiesener und tatsächlicher Gerätenutzung
- Potenziellen Sicherheitsrisiken durch ungewöhnliche Zugriffsmuster

---

*Bericht generiert aus Systemauditdaten. Alle Zeitstempel sind in Lokalzeit.*
*Dokumentenklassifizierung: VERTRAULICH*
*Referenz: REN-MDA-AUDIT-2024-001*
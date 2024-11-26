# Template-Netzwerkanforderungen-konfigurationen

## Inhaltsverzeichnis
1. [Übersicht](#1-Übersicht)
2. [Geräte und Konfigurationen](#2-Geräte-und-Konfigurationen)
   - [Gerät 1](#21-gerät-1)
   - [Gerät 2](#22-gerät-2)
   - [Gerät 3](#23-gerät-3)
3. [Netzwerkkonfiguration](#3-netzwerkkonfiguration)
4. [Wichtige Hinweise](#4-wichtige-hinweise)
5. [Technische Spezifikationen](#5-technische-spezifikationen)
   - [Netzwerkdiagramm](#51-netzwerkdiagramm)
   - [IP-Adresszuweisung](#52-ip-adresszuweisung)
   - [VLAN-Konfiguration](#53-vlan-konfiguration)
   - [Switch-Konfiguration](#54-switch-konfiguration)
   - [Firewall-Regeln](#55-firewall-regeln)
   - [Überwachung und Fehlerbehebung](#56-überwachung-und-fehlerbehebung)
6. [Fehlerbehebungsdokumentation](#6-fehlerbehebungsdokumentation)
7. [Netzwerkliste](#7-netzwerkliste)
8. [Checkliste für die Einrichtung und Genehmigung](#8-checkliste-für-die-einrichtung-und-genehmigung)

---
## 1. Übersicht
Dieses Dokument beschreibt die Netzwerkanforderungen und -konfigurationen für die [Systemname]-Produktionslinie. Die Einhaltung dieser Spezifikationen ist entscheidend für die nahtlose Integration in unsere IIoT-Infrastruktur und die zuverlässige Datenübertragung zwischen den lokalen Geräten und unseren zentralen Systemen. Diese Dokumentation erfüllt die ITIL- und ISO 27001/02-Standards und dient als Vorlage für zukünftige Implementierungen.

## 2. Geräte und Konfigurationen

### 2.1 Gerät 1
- **Funktion**: [Beschreibung der Funktion]
- **Statische IP-Adresse**: [IP-Adresse]
- **Grund**: [Grund für die Wahl der IP-Adresse]

### 2.2 Gerät 2
- **Modell**: [Modellbezeichnung]
  - **Prozessor**: [Prozessor]
  - **Arbeitsspeicher**: [Arbeitsspeicher]
  - **Speicherkapazität**: [Speicherkapazität]
  - **Betriebssystem**: [Betriebssystem]
  - **Netzwerkanschlüsse**: [Anzahl der Netzwerkanschlüsse]
- **Funktion**: [Beschreibung der Funktion]
- **Statische IP-Adresse**: [IP-Adresse]
- **Grund**: [Grund für die Wahl der IP-Adresse]

### 2.3 Gerät 3
- **Modell**: [Modellbezeichnung]
  - **Ports**: [Anzahl und Typ der Ports]
  - **Erweiterbarkeit**: [Erweiterungsmöglichkeiten]
- **Statische IP-Adresse für Management-Zwecke**: [IP-Adresse]
- **Grund**: [Grund für die Wahl der IP-Adresse]
- **VLAN-Konfiguration**:
  - VLAN 1: [VLAN 1 Beschreibung] ([Subnetz]/24)
  - VLAN 100: [VLAN 100 Beschreibung] (IP-Bereich wird vom 5G-Router zugewiesen)
  - VLAN 200: [VLAN 200 Beschreibung] (IP-Bereich wird vom OT-Netzwerk zugewiesen)

## 3. Netzwerkkonfiguration
- **Backup-Netzwerk (VLAN 100)**:
  - Bleibt die meiste Zeit offline und wird nur bei Nichtverfügbarkeit des OT-Netzwerks oder für spezielle Wartungsaufgaben aktiviert.
  - Verbindung über einen 5G-Router, der die IP-Adressen für das Backup-Netzwerk bereitstellt.
- **Edge-Gerät**:
  - Muss so konfiguriert sein, dass es MQTT-Daten von der SPS empfängt und über das OT-Netzwerk (VLAN 200) weiterleitet.
  - Diese Konfiguration stellt sicher, dass die Daten zuverlässig an die zentralen Systeme übertragen werden.
  - Darüber hinaus muss das Edge-Gerät so konfiguriert sein, dass es auch Daten aus dem OT-Netzwerk empfängt und verarbeitet.

## 4. Wichtige Hinweise
- **Konfiguration**: Achten Sie darauf, dass alle Geräte mit den richtigen IP-Adressen und VLAN-Konfigurationen versehen sind, um eine reibungslose Kommunikation zu gewährleisten.
- **Dokumentation**: Dokumentieren Sie die zugewiesenen IP-Adressen und VLAN-Zuordnungen sorgfältig für zukünftige Referenzen. Eine präzise Dokumentation erleichtert die Fehlerbehebung und Wartung.
- **Tests**: Führen Sie umfangreiche Tests durch, um sicherzustellen, dass die Datenübertragung zwischen den Geräten und dem OT-Netzwerk wie erwartet funktioniert. Testen Sie verschiedene Szenarien, einschließlich des Ausfalls des primären OT-Netzwerks, um die Wirksamkeit des Backup-Netzwerks zu überprüfen.

## 5. Technische Spezifikationen

### 5.1 Netzwerkdiagramm
```plaintext
                   +-----------------------------------+
                   |            OT-Netzwerk            |
                   |         (IP-Bereich wird          |
                   |           zugewiesen)             |
                   +-----+----------------------------++
                         |                             
                         |                             
                         |                             
+----------------------+-+                         +--+----------------------+
|        VLAN 200        |                         |        VLAN 100         |
|     OT-Netzwerkport    |                         |   Backup-Netzwerkport   |
|   (IP-Bereich wird     |                         |  (IP-Bereich wird       |
|   zugewiesen)          |                         |  vom 5G-Router          |
|                        |                         |  zugewiesen)            |
+----------------------+-+                         +--+----------------------+
                         |                            |
                         |                            |
                         |                            |
                   +-----+----------------------------+-----+
                   |          [Gerät 3]                    |
                   |              Switch                   |
                   |               (Layer 3)               |
                   +-----+---------+-------------+---------+-+
                         | VLAN 1 ([Subnetz]/24)  |         
                         |                       |
                         |                       |
                  +------+---+               +---+----+      
                  |  Port 1   |               | Port 2 |      
                  |  Gerät 1  |               | Gerät 2|      
                  | [IP-Adresse] |               |[IP-Adresse]|      
                  +-----------+               +---------+      
                         |                          |
                         |                          |
                         +--------------------------+
                                   
                   +-----------------------------------+
                   |  Lokales [Systemname]-Produktionsnetz    |
                   |         ([Subnetz]/24)             |
                   +-----------------------------------+
```

### 5.2 IP-Adresszuweisung
- Gerät 1: [IP-Adresse]
- Gerät 2: [IP-Adresse]
- Gerät 3: [IP-Adresse] (Management-IP)

### 5.3 VLAN-Konfiguration
- VLAN 1: Lokales Produktionsnetzwerk ([Subnetz]/24)
  - Ports: 1-16
- VLAN 100: Backup-Netzwerk (IP-Bereich wird vom 5G-Router zugewiesen)
  - Port: 17
- VLAN 200: OT-Netzwerk (IP-Bereich wird vom OT-Netzwerk zugewiesen)
  - Port: 18

### 5.4 Switch-Konfiguration (Gerät 3)
- **Aktivieren des IP-Routings**: Ermöglicht die Kommunikation zwischen den VLANs.
- **VLAN-Konfiguration**: Entsprechend den oben genannten Spezifikationen.
- **Port-Zuweisung**: Weisen Sie die Ports den entsprechenden VLANs zu, um die gewünschte Netzwerksegmentierung zu erreichen.
- **IP-Adressen Konfiguration**:
  - VLAN 1: [IP-Adresse]/24

### 5.5 Firewall-Regeln
- **Erlaubte Verbindungen**:
  - MQTT-Datenverkehr (Port 1883) zwischen Gerät 1 und Gerät 2.
  - MQTT-Datenverkehr vom Gerät 2 zum OT-Netzwerk und zum Backup-Netzwerk sowie Datenverkehr vom OT-Netzwerk zum Gerät 2.
- **Sicherheit**:
  - Beschränken Sie den Zugriff auf das Backup-Netzwerk auf autorisierte Geräte und Benutzer, um die Sicherheit zu erhöhen und unbefugten Zugriff zu verhindern.

### 5.6 Überwachung und Fehlerbehebung
- **Netzwerküberwachung**: Richten Sie eine Überwachung für das lokale Netzwerk ein, um Konnektivitätsprobleme und ungewöhnlichen Datenverkehr frühzeitig zu erkennen.
- **SNMP-Konfiguration**: Konfigurieren Sie SNMP (Simple Network Management Protocol) auf dem Switch, um die Überwachung und das Sammeln von Diagnoseinformationen zu erleichtern.
- **Fehlerbehebungsdokumentation**: Dokumentieren Sie die Schritte zur Fehlerbehebung für häufige Netzwerkprobleme, um die Wiederherstellungszeiten zu minimieren und einen konsistenten Ansatz für die Problembehebung zu gewährleisten.

---

## 6. Fehlerbehebungsdokumentation
Bitte dokumentieren Sie die Schritte zur Fehlerbehebung für häufige Netzwerkprobleme, um die Wiederherstellungszeiten zu minimieren und einen konsistent

en Ansatz für die Problembehebung zu gewährleisten. Senden Sie das ausgefüllte Dokument zurück an das IT-Team.

1. **Problem 1**:
   - **Beschreibung**:
   - **Ursache**:
   - **Lösungsschritte**:
   - **Wiederherstellungszeit**:
   
2. **Problem 2**:
   - **Beschreibung**:
   - **Ursache**:
   - **Lösungsschritte**:
   - **Wiederherstellungszeit**:
   
3. **Problem 3**:
   - **Beschreibung**:
   - **Ursache**:
   - **Lösungsschritte**:
   - **Wiederherstellungszeit**:

---

## 7. Netzwerkliste
Bitte füllen Sie die folgende Tabelle mit allen Geräten im lokalen Netzwerk aus. Diese Informationen sind entscheidend für die Verwaltung und Fehlersuche im Netzwerk.

### 7.1 Beispiel
| Gerät                   | Modell               | IP-Adresse  | MAC-Adresse        | Standort            | VLAN  |
|-------------------------|----------------------|-------------|--------------------|---------------------|-------|
| Gerät 1                 | [Modell]             | [IP-Adresse]   | [MAC-Adresse]    | [Standort]          | VLAN 1|
| Gerät 2                 | [Modell]             | [IP-Adresse]   | [MAC-Adresse]    | [Standort]          | VLAN 1|
| Gerät 3                 | [Modell]             | [IP-Adresse]   | [MAC-Adresse]    | [Standort]          | VLAN 1, VLAN 100, VLAN 200|

### 7.2 Netzwerkliste
| Gerät                   | Modell               | IP-Adresse  | MAC-Adresse        | Standort            | VLAN  |
|-------------------------|----------------------|-------------|--------------------|---------------------|-------|
|                         |                      |             |                    |                     |       |
|                         |                      |             |                    |                     |       |
|                         |                      |             |                    |                     |       |
|                         |                      |             |                    |                     |       |
|                         |                      |             |                    |                     |       |
|                         |                      |             |                    |                     |       |
|                         |                      |             |                    |                     |       |
|                         |                      |             |                    |                     |       |
|                         |                      |             |                    |                     |       |
|                         |                      |             |                    |                     |       |

---

## 8. Checkliste für die Einrichtung und Genehmigung

**Checkliste für das OT-Team:**
1. Wurden alle Geräte mit den richtigen statischen IP-Adressen konfiguriert?
   - [ ] Ja
   - [ ] Nein
   - [ ] Nicht anwendbar
2. Sind die VLANs korrekt konfiguriert und den entsprechenden Ports zugewiesen?
   - [ ] Ja
   - [ ] Nein
   - [ ] Nicht anwendbar
3. Ist das IP-Routing auf dem Switch aktiviert?
   - [ ] Ja
   - [ ] Nein
   - [ ] Nicht anwendbar
4. Wurden die Firewall-Regeln entsprechend den Anforderungen konfiguriert?
   - [ ] Ja
   - [ ] Nein
   - [ ] Nicht anwendbar
5. Wurde das Backup-Netzwerk erfolgreich getestet?
   - [ ] Ja
   - [ ] Nein
   - [ ] Nicht anwendbar
6. Sind alle Verbindungen zwischen den Geräten funktionsfähig?
   - [ ] Ja
   - [ ] Nein
   - [ ] Nicht anwendbar
7. Wurden umfangreiche Tests zur Datenübertragung durchgeführt?
   - [ ] Ja
   - [ ] Nein
   - [ ] Nicht anwendbar
8. Wurden die Konfigurationsdateien und Dokumentationen erhalten und überprüft?
   - [ ] Ja
   - [ ] Nein
   - [ ] Nicht anwendbar
9. Sind die Testszenarien und Ergebnisse dokumentiert und genehmigt?
   - [ ] Ja
   - [ ] Nein
   - [ ] Nicht anwendbar
10. Ist die Netzwerküberwachung eingerichtet und funktionsfähig?
    - [ ] Ja
    - [ ] Nein
    - [ ] Nicht anwendbar
11. Wurden alle potenziellen Sicherheitsrisiken bewertet und adressiert?
    - [ ] Ja
    - [ ] Nein
    - [ ] Nicht anwendbar
12. Wurden alle erforderlichen Mitarbeiter über die neue Konfiguration informiert?
    - [ ] Ja
    - [ ] Nein
    - [ ] Nicht anwendbar
13. Wurden alle relevanten Dokumente in das IT-System hochgeladen und gesichert?
    - [ ] Ja
    - [ ] Nein
    - [ ] Nicht anwendbar
14. Genehmigung für die Produktion:
    - [ ] Ja
    - [ ] Nein

**Unterschrift des OT-Managers**: __________________________________

**Datum**: _______________

---
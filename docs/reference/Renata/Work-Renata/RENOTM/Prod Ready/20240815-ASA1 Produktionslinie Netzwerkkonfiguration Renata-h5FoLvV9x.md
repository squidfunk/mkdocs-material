# ASA1 Produktionslinie Netzwerkkonfiguration Renata

### IP-Adresszuweisung (10.0.1.0/24)

## Inhaltsverzeichnis

1. [Übersicht](#1-Übersicht)
2. [Geräte und Konfigurationen](#2-Geräte-und-Konfigurationen)
   - [Siemens S7-1500 SPS (Speicherprogrammierbare Steuerung)](#21-siemens-s7-1500-sps-speicherprogrammierbare-steuerung)
   - [Siemens Industrial PC (Edge-Gerät)](#22-siemens-industrial-pc-edge-gerät)
   - [Siemens SCALANCE XM416-4C Switch](#23-siemens-scalance-xm416-4c-switch)
3. [Netzwerkkonfiguration](#3-netzwerkkonfiguration)
4. [Wichtige Hinweise](#4-wichtige-hinweise)
5. [Technische Spezifikationen für die ASA 1-Produktionslinie](#5-technische-spezifikationen-für-die-asa-1-produktionslinie)
   - [Netzwerkdiagramm](#51-netzwerkdiagramm)
   - [IP-Adresszuweisung](#52-ip-adresszuweisung)
   - [VLAN-Konfiguration](#53-vlan-konfiguration)
   - [Switch-Konfiguration (Siemens SCALANCE XM416-4C)](#54-switch-konfiguration-siemens-scalance-xm416-4c)
   - [Firewall-Regeln](#55-firewall-regeln)
   - [Überwachung und Fehlerbehebung](#56-überwachung-und-fehlerbehebung)
6. [Fehlerbehebungsdokumentation](#6-fehlerbehebungsdokumentation)
7. [Netzwerkliste](#7-netzwerkliste)
8. [Checkliste für die Einrichtung und Genehmigung](#8-checkliste-für-die-einrichtung-und-genehmigung)

---

## 1. Übersicht

Dieses Dokument beschreibt die Netzwerkanforderungen und -konfigurationen für die ASA 1-Produktionslinie. Die Einhaltung dieser Spezifikationen ist entscheidend für die nahtlose Integration in unsere IIoT-Infrastruktur und die zuverlässige Datenübertragung zwischen den lokalen Geräten und unseren zentralen Systemen. Diese Dokumentation erfüllt die ITIL- und ISO 27001/02-Standards und dient als Vorlage für zukünftige Implementierungen.

## 2. Geräte und Konfigurationen

### 2.1 Siemens S7-1500 SPS (Speicherprogrammierbare Steuerung)

- **Funktion**: Überträgt MQTT-Daten an das Edge-Gerät zur weiteren Verarbeitung.
- **Statische IP-Adresse**: 10.0.1.10
- **MAC-Adresse**: ec:1c:5d:8c:f9:84
- **Grund**: Diese Adresse wurde gewählt, um eine klare und strukturierte Zuordnung im Netzwerk zu ermöglichen, die Verwaltung zu erleichtern und Adresskonflikte zu vermeiden.

### 2.2 Siemens Industrial PC (Edge-Gerät)

- **Modell**: SIMATIC IPC127E
  - **Prozessor**: Atom E3930
  - **Arbeitsspeicher**: 4 GB RAM mit TPM
  - **Speicherkapazität**: 128 GB SSD
  - **Betriebssystem**: Windows 10 IoT Enterprise 2021 LTSC
  - **Netzwerkanschlüsse**: 2x Ethernet RJ45
- **Funktion**: Agiert als lokaler MQTT-Broker (EMQX) und leitet Daten an das OT-Netzwerk und das Backup-Netzwerk weiter.
- **Statische IP-Adresse**: 10.0.1.20
- **Grund**: Diese Adresse wurde gewählt, um die Zuordnung im Netzwerk konsistent zu halten, die Verwaltung zu erleichtern und eine klare Trennung der Geräte im Netzwerk sicherzustellen.

### 2.3 Siemens SCALANCE XM416-4C Switch

- **Managed modular IE Switch**
  - **Ports**: 16x 10/100/1000 Mbit/s RJ45, 4x 100/1000 Mbit/s SFP, enthält 4 Combo-Ports
  - **Erweiterbarkeit**: Auf 24 Ports (elektrisch oder optisch) erweiterbar
- **Statische IP-Adresse für Management-Zwecke**: 10.0.1.1
- **Grund**: Diese Adresse wurde gewählt, um die zentrale Verwaltung des Switches zu ermöglichen und eine klare Trennung der Management-Funktionalität sicherzustellen.
- **VLAN-Konfiguration**:
  - VLAN 1: Lokales Produktionsnetzwerk (10.0.1.0/24)
  - VLAN 100: Backup-Netzwerk (IP-Bereich wird vom 5G-Router zugewiesen)
  - VLAN 200: OT-Netzwerk (IP-Bereich wird vom OT-Netzwerk der Swatch Group zugewiesen)

## 3. Netzwerkkonfiguration

- **Backup-Netzwerk (VLAN 100)**:
  - Bleibt die meiste Zeit offline und wird nur bei Nichtverfügbarkeit des OT-Netzwerks oder für spezielle Wartungsaufgaben aktiviert.
  - Verbindung über einen 5G-Router, der die IP-Adressen für das Backup-Netzwerk bereitstellt.
- **Edge-Gerät**:
  - Muss so konfiguriert sein, dass es MQTT-Daten von der SPS empfängt und über das OT-Netzwerk (VLAN 200) weiterleitet.
  - Diese Konfiguration stellt sicher, dass die Daten zuverlässig an die zentralen Systeme der Swatch Group übertragen werden.
  - Darüber hinaus muss das Edge-Gerät so konfiguriert sein, dass es auch Daten aus dem OT-Netzwerk empfängt und verarbeitet.

## 4. Wichtige Hinweise

- **Konfiguration**: Achten Sie darauf, dass alle Geräte mit den richtigen IP-Adressen und VLAN-Konfigurationen versehen sind, um eine reibungslose Kommunikation zu gewährleisten.
- **Dokumentation**: Dokumentieren Sie die zugewiesenen IP-Adressen und VLAN-Zuordnungen sorgfältig für zukünftige Referenzen. Eine präzise Dokumentation erleichtert die Fehlerbehebung und Wartung.
- **Tests**: Führen Sie umfangreiche Tests durch, um sicherzustellen, dass die Datenübertragung zwischen den Geräten und dem OT-Netzwerk wie erwartet funktioniert. Testen Sie verschiedene Szenarien, einschließlich des Ausfalls des primären OT-Netzwerks, um die Wirksamkeit des Backup-Netzwerks zu überprüfen.

## 5. Technische Spezifikationen für die ASA 1-Produktionslinie

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
                   |        Siemens SCALANCE XM416-4C        |
                   |                Switch                   |
                   |               (Layer 3)                 |
                   +-----+---------+-------------+---------+-+
                         | VLAN 1 (10.0.1.0/24)  |
                         |                       |
                         |                       |
                  +------+---+               +---+----+
                  |  Port 1   |               | Port 2 |
                  | Siemens   |               | Siemens|
                  |   SPS     |               |   IPC  |
                  | 10.0.1.10 |               |10.0.1.20|
                  +-----------+               +---------+
                         |                          |
                         |                          |
                         +--------------------------+

                   +-----------------------------------+
                   |  Lokales ASA 1-Produktionsnetz    |
                   |         (10.0.1.0/24)             |
                   +-----------------------------------+
```

### 5.2 IP-Adresszuweisung

- Siemens S7-1500 SPS: 10.0.1.10
- Siemens Industrial PC (Edge-Gerät): 10.0.1.20
- Siemens SCALANCE XM416-4C Switch: 10.0.1.1 (Management-IP)

### 5.3 VLAN-Konfiguration

- VLAN 1: Lokales Produktionsnetzwerk (10.0.1.0/24)
  - Ports: 1-16
- VLAN 100: Backup-Netzwerk (IP-Bereich wird vom 5G-Router zugewiesen)
  - Port: 17
- VLAN 200: OT-Netzwerk (IP-Bereich wird vom OT-Netzwerk der Swatch Group zugewiesen)
  - Port: 18

### 5.4 Switch-Konfiguration (Siemens SCALANCE XM416-4C)

- **Aktivieren des IP-Routings**: Ermöglicht die Kommunikation zwischen den VLANs.
- **VLAN-Konfiguration**: Entsprechend den oben genannten Spezifikationen.
- **Port-Zuweisung**: Weisen Sie die Ports den entsprechenden VLANs zu, um die gewünschte Netzwerksegmentierung zu erreichen.
- **IP-Adressen Konfiguration**:
  - VLAN 1: 10.0.1.1/24

### 5.5 Firewall-Regeln

- **Erlaubte Verbindungen**:
  - MQTT-Datenverkehr (Port 1883) zwischen der SPS und dem Edge-Gerät.
  - MQTT-Datenverkehr vom Edge-Gerät zum OT-Netzwerk und zum Backup-Netzwerk sowie Datenverkehr vom OT-Netzwerk zum Edge-Gerät.
- **Sicherheit**:
  - Beschränken Sie den Zugriff auf das Backup-Netzwerk auf autorisierte Geräte und Benutzer, um die Sicherheit zu erhöhen und unbefugten Zugriff zu verhindern.

### 5.6 Überwachung und Fehlerbehebung

- **Netzwerküberwachung**: Richten Sie eine Überwachung für das lokale Netzwerk ein, um Konnektivitätsprobleme und ungewöhnlichen Datenverkehr frühzeitig zu erkennen.
- **SNMP-Konfiguration**: Konfigurieren Sie SNMP (Simple Network Management Protocol) auf dem Switch, um die Überwachung und das Sammeln von Diagnoseinformationen zu erleichtern.
- **Fehlerbehebungsdokumentation**: Dokumentieren Sie die Schritte zur Fehlerbehebung für häufige Netzwerkprobleme, um die Wiederherstellungszeiten zu minimieren und einen konsistenten Ansatz für die Problembehebung zu gewährleisten.

---

## 6. Fehlerbehebungsdokumentation

Bitte dokumentieren Sie die Schritte zur Fehlerbehebung für häufige Netzwerkprobleme, um die Wiederherstellungszeiten zu minimieren und einen konsistenten Ansatz für die Problembehebung zu gewährleisten. Senden Sie das ausgefüllte Dokument zurück an das IT-Team.

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

Die folgende Tabelle enthält alle Geräte im lokalen Netzwerk. Diese Informationen sind entscheidend für die Verwaltung und Fehlersuche im Netzwerk.

| Gerät                     | Modell                           | IP-Adresse | MAC-Adresse       | Standort         | VLAN             |
| :------------------------ | :------------------------------- | :--------- | :---------------- | :--------------- | :--------------- |
| Siemens SCALANCE Switch   | XM416-4C                         | 10.0.1.1   | -                 | Produktionslinie | VLAN 1, 100, 200 |
| Siemens SPS               | S7-1500                          | 10.0.1.10  | ec:1c:5d:8c:f9:84 | Produktionslinie | VLAN 1           |
| Siemens Industrial PC     | SIMATIC IPC127E                  | 10.0.1.20  | -                 | Produktionslinie | VLAN 1           |
| Siemens HMI Anschluss-Box | Standard (Mobile Panels)         | 10.0.1.61  | 30:13:89:16:e2:92 | Produktionslinie | VLAN 1           |
| Siemens HMI               | KTP900F Mobile                   | 10.0.1.62  | ec:1c:5d:47:33:3e | Produktionslinie | VLAN 1           |
| WAGO Feldbuskoppler       | I/O-System 750/753               | 10.0.1.31  | 00:30:de:4f:a4:f2 | Produktionslinie | VLAN 1           |
| WAGO Feldbuskoppler       | I/O-System 750/753               | 10.0.1.32  | 00:30:de:5d:06:e8 | Produktionslinie | VLAN 1           |
| WAGO Feldbuskoppler       | I/O-System 750/753               | 10.0.1.33  | 00:30:de:5d:05:fe | Produktionslinie | VLAN 1           |
| Prüftechnik PC Spectra    | NIC-Profinet PNS                 | 10.0.1.81  | 00:02:a2:55:cc:09 | Produktionslinie | VLAN 1           |
|                           | NIC 1 Station 10 Oben            | 10.0.1.82  | -                 | Produktionslinie | VLAN 1           |
|                           | NIC 2 Verpacker                  | 10.0.1.83  | -                 | Produktionslinie | VLAN 1           |
|                           | NIC 3 Station 3                  | 10.0.1.84  | -                 | Produktionslinie | VLAN 1           |
|                           | NIC 4 Station 6                  | 10.0.1.85  | -                 | Produktionslinie | VLAN 1           |
|                           | Kamera 1 Basler Station 10 Oben  | 10.0.1.86  | -                 | Produktionslinie | VLAN 1           |
|                           | Kamera 2 Basler Verpacker        | 10.0.1.87  | -                 | Produktionslinie | VLAN 1           |
|                           | Kamera 3 Baumer Station 3        | 10.0.1.88  | -                 | Produktionslinie | VLAN 1           |
|                           | Kamera 4 Baumer Station 6        | 10.0.1.89  | -                 | Produktionslinie | VLAN 1           |
|                           | NIC 5 Bandeinzug Plus            | 10.0.1.90  | -                 | Produktionslinie | VLAN 1           |
|                           | NIC 6 Bandeinzug Minus           | 10.0.1.91  | -                 | Produktionslinie | VLAN 1           |
|                           | NIC 7 Station 10 Unten           | 10.0.1.92  | -                 | Produktionslinie | VLAN 1           |
|                           | NIC 8 --                         | 10.0.1.93  | -                 | Produktionslinie | VLAN 1           |
|                           | Kamera 5 Basler Bandeinzug Plus  | 10.0.1.94  | -                 | Produktionslinie | VLAN 1           |
|                           | Kamera 6 Basler Bandeinzug Minus | 10.0.1.95  | -                 | Produktionslinie | VLAN 1           |
|                           | Kamera 7 Basler Station 10 Unten | 10.0.1.96  | -                 | Produktionslinie | VLAN 1           |
|                           | Kamera Reserve                   | 10.0.1.97  | -                 | Produktionslinie | VLAN 1           |
| Stöber Antriebsregler     | SI6                              | 10.0.1.101 | 00:11:39:74:6d:4a | Produktionslinie | VLAN 1           |
| Stöber Antriebsregler     | SI6                              | 10.0.1.102 | 00:11:39:5e:f8:82 | Produktionslinie | VLAN 1           |
| Stöber Antriebsregler     | SI6                              | 10.0.1.103 | 00:11:39:5e:f7:c2 | Produktionslinie | VLAN 1           |
| Stöber Antriebsregler     | SI6                              | 10.0.1.104 | 00:11:39:5e:f8:3a | Produktionslinie | VLAN 1           |
| Stöber Antriebsregler     | SI6                              | 10.0.1.105 | 00:11:39:5e:f7:d2 | Produktionslinie | VLAN 1           |
| Stöber Antriebsregler     | SI6                              | 10.0.1.106 | 00:11:39:5e:f7:fa | Produktionslinie | VLAN 1           |
| Stöber Antriebsregler     | SI6                              | 10.0.1.107 | 00:11:39:5e:f8:62 | Produktionslinie | VLAN 1           |
| Stöber Antriebsregler     | SI6                              | 10.0.1.108 | 00:11:39:5e:cd:02 | Produktionslinie | VLAN 1           |
| Stöber Antriebsregler     | SI6                              | 10.0.1.109 | 00:11:39:5e:cc:b2 | Produktionslinie | VLAN 1           |
| Stöber Antriebsregler     | SI6                              | 10.0.1.110 | 00:11:39:5e:cc:9a | Produktionslinie | VLAN 1           |
| Mitsubishi Roboter        | NIC Ethernet                     | 10.0.1.120 | -                 | Produktionslinie | VLAN 1           |
| Mitsubishi Roboter        | NIC Profinet TZ535-PN            | 10.0.1.121 | 00:30:11:52:45:47 | Produktionslinie | VLAN 1           |
| Keyence QR-Code-Scanner   | SR-X1H3HX                        | 10.0.1.239 | 00:01:fc:be:64:be | Produktionslinie | VLAN 1           |
| Keyence Laser-Scanner     | LJ-V7001P NIC Ethernet           | 10.0.1.240 | -                 | Produktionslinie | VLAN 1           |
| Keyence Laser-Scanner     | LJ-V7001P NIC Profinet CB-PN100  | 10.0.1.241 | 00:01:fc:9b:7e:6d | Produktionslinie | VLAN 1           |
| Keyence Profinet Einheit  | DL-PN1                           | 10.0.1.242 | 00:01:fc:f9:70:a6 | Produktionslinie | VLAN 1           |
| Etikettendrucker          | -                                | 10.0.1.249 | -                 | Produktionslinie | VLAN 1           |

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
6. Sind alle Verbindungen zwischen SPS, Edge-Gerät und Switch funktionsfähig?
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

**Unterschrift des OT-Managers**: **\*\***\*\*\*\***\*\***\_\_**\*\***\*\*\*\***\*\***

**Datum**: **\*\***\_\_\_**\*\***

---

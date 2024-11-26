# ASA-1 Netzwerk-Spezifikationen und Logik für Produktionsliniek

## Netzwerk-Spezifikationen und Logik

### Autor: Marc Strub, OT Manager bei Renata SA

---

### Einführung
Dieses Dokument spezifiziert die Netzwerk-Spezifikationen und Logik der Produktionslinie ASA 1 im IP-Bereich 10.0.1.0/24. Es dient dazu, die notwendigen Details für die Einrichtung und Verwaltung dieser Produktionslinie bereitzustellen.

### Netzwerksegmentierung

#### Subnetz: 10.0.1.0/24 (Lokales ASA-Netzwerk)

**Zugewiesene IPs und Geräte:**
- **Siemens Switch**: 10.0.1.254 (Gateway)
- **Siemens Edge Device**: 10.0.1.1
- **Siemens SPS**: 10.0.1.2

Diese Geräte sind manuell mit IP-Adressen konfiguriert und bilden das lokale ASA-Netzwerk.

### VLAN-Benennung und Segmentierung:

- **VLAN 100 (Backup Netzwerk)**
  - **Name**: `Backup_Network`
  - **Subnetz**: 10.0.100.0/24
  - **Gateway**: 10.0.100.254
  - **Funktion**: Transportiert Daten zwischen dem lokalen Netzwerk (10.0.1.0/24) und dem Internet über den 5G-Router. Diese VLAN wird nur aktiviert, wenn VLAN 200 (OT Netzwerk) ausfällt oder nicht zugänglich ist.

- **VLAN 200 (OT Netzwerk)**
  - **Name**: `OT_Network`
  - **Subnetz**: 10.0.200.0/24
  - **Gateway**: 10.0.200.254
  - **Funktion**: Transportiert Daten zwischen dem lokalen Netzwerk (10.0.1.0/24) und dem OT-Netzwerk.

### Port-Konfiguration des Siemens SCALANCE XM416-4C Switch:

- **Port 1**: Verbunden mit dem Swatch Group Netzwerk (VLAN 200 - OT Netzwerk)
- **Port 2**: Verbunden mit dem 5G-Router für Internetzugang (Backup)
- **Ports 3-16**: Interne Geräteanschlüsse (z.B. Siemens Edge Device, Siemens SPS)

### Siemens SCALANCE XM416-4C Spezifikationen:

- **Typ**: Managed modular IE Switch
- **Anschlüsse**:
  - 16x 10/100/1000 Mbit/s RJ45
  - 4x 100/1000 Mbit/s SFP
  - Enthält 4 Combo-Ports
  - Insgesamt 16 Ports nutzbar
  - Erweiterbar auf 24 Ports (elektrisch oder optisch)
- **Montage**: Hut-/S7-Profilschiene
- **Funktionen**:
  - PROFINET IO Device
  - Redundanzfunktionen
  - Office Features (RSTP, VLAN, IGMP, etc.)
- **Zusätzliches**: C-PLUG im Lieferumfang

### Netzwerkgeräte und IP-Adressen:

- **Siemens Switch**: 10.0.1.254 (Gateway)
- **Siemens Edge Device**: 10.0.1.1
- **Siemens SPS**: 10.0.1.2

### Geräteverwaltung:

- Alle IP-Adressen müssen manuell konfiguriert werden. DHCP wird nicht verwendet.

---

### Konfigurationsanweisungen für den Anbieter:

1. **Netzwerksegmentierung**:
   - Das lokale ASA-Netzwerk verwendet den IP-Bereich 10.0.1.0/24.
   - Geräte im lokalen Netzwerk müssen manuell konfiguriert werden.

2. **VLAN-Konfiguration**:
   - **VLAN 100 (Backup_Network)**: Dieses VLAN ist für die Kommunikation über den 5G-Router mit dem Internet vorgesehen und wird nur im Falle eines Ausfalls von VLAN 200 aktiviert.
   - **VLAN 200 (OT_Network)**: Dieses VLAN ist für die Kommunikation zwischen dem lokalen Netzwerk und dem OT-Netzwerk zuständig.

3. **Port-Zuweisung**:
   - **Port 1**: Zuordnung zu VLAN 200 für die Verbindung zum Swatch Group Netzwerk.
   - **Port 2**: Zuordnung zu VLAN 100 für die Verbindung zum 5G-Router.
   - **Ports 3-16**: Zuordnung zu VLAN 1 für die internen Geräte des lokalen Netzwerks.

4. **Manuelle IP-Konfiguration**:
   - Alle Geräte im lokalen ASA-Netzwerk erhalten feste IP-Adressen im Bereich 10.0.1.0/24.
   - Der Siemens Switch fungiert als Gateway mit der IP-Adresse 10.0.1.254.

Dieses Dokument dient als Spezifikation für die Netzwerk-Spezifikationen und Logik der Produktionslinie ASA 1. Es stellt sicher, dass alle relevanten Details für die Einrichtung und Verwaltung bereitgestellt sind, um eine effiziente und sichere Kommunikation innerhalb dieser Produktionslinie zu gewährleisten.
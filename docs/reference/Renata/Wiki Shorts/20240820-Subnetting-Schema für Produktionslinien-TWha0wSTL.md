# Subnetting-Schema für Produktionslinien

Dieses Schema weist jeder Produktionslinie ein vollständiges /24 Netzwerk zu, beginnend mit 10.0.0.1/24, und verwendet zwei VLANs (100 und 200) innerhalb jedes Netzwerks.

## Produktionslinie 1 ASA: 10.0.0.1/24

- Netzwerkadresse: 10.0.0.0
- Erste nutzbare IP: 10.0.0.1
- Letzte nutzbare IP: 10.0.0.254
- Broadcast-Adresse: 10.0.0.255
- Subnetzmaske: 255.255.255.0
- VLAN 100: Primäre Produktion
- VLAN 200: Sekundäre Systeme

## Produktionslinie 2 HLL2: 10.0.0.2/24

- Netzwerkadresse: 10.0.0.0
- Erste nutzbare IP: 10.0.0.1
- Letzte nutzbare IP: 10.0.0.254
- Broadcast-Adresse: 10.0.0.255
- Subnetzmaske: 255.255.255.0
- VLAN 100: Primäre Produktion
- VLAN 200: Sekundäre Systeme

## Produktionslinie 3: 10.0.0.3/24

- Netzwerkadresse: 10.0.0.0
- Erste nutzbare IP: 10.0.0.1
- Letzte nutzbare IP: 10.0.0.254
- Broadcast-Adresse: 10.0.0.255
- Subnetzmaske: 255.255.255.0
- VLAN 100: Primäre Produktion
- VLAN 200: Sekundäre Systeme

## Fortsetzung des Schemas

Das Schema setzt sich für jede weitere Produktionslinie fort, wobei der letzte Oktett inkrementiert wird:

- Produktionslinie 4: 10.0.0.4/24
- Produktionslinie 5: 10.0.0.5/24
- ...
- Produktionslinie 254: 10.0.0.254/24

## Implementierungsrichtlinien

1. **VLAN-Konfiguration:**
   - VLAN 100: Für primäre Produktionssysteme (z.B. SPS, Maschinen)
   - VLAN 200: Für sekundäre Systeme (z.B. HMIs, Datenerfassung)

2. **IP-Zuweisung:**
   - Router/Layer 3 Switch Interface: Typischerweise .1 (z.B. 10.0.0.1 für Linie 1)
   - Wichtige Infrastrukturgeräte: Reservieren Sie die ersten IPs (z.B. .2 bis .10)
   - DHCP-Bereich: Konfigurieren Sie einen angemessenen Bereich (z.B. .50 bis .200)

3. **Sicherheit:**
   - Implementieren Sie ACLs zwischen VLANs zur Kontrolle des Datenverkehrs
   - Nutzen Sie Port Security auf Switches

4. **Dokumentation:**
   - Führen Sie eine detaillierte Dokumentation für jede Produktionslinie

5. **Routing:**
   - Konfigurieren Sie Inter-VLAN-Routing auf Layer 3 Switches oder Routern

6. **Monitoring:**
   - Setzen Sie SNMP-Monitoring für alle Netzwerkgeräte ein

7. **QoS:**
   - Priorisieren Sie kritischen Verkehr in VLAN 100

8. **Skalierbarkeit:**
   - Dieses Schema erlaubt bis zu 254 Produktionslinien im 10.0.0.0/24 Netzwerk
   - Bei Bedarf können Sie auf 10.0.1.0/24, 10.0.2.0/24 usw. erweitern
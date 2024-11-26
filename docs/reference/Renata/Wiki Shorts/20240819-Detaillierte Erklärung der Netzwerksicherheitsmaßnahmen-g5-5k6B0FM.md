# Detaillierte Erklärung der Netzwerksicherheitsmaßnahmen



## VLAN-Segmentierung
- **Funktionsweise:** Unterteilung eines physischen Netzwerks in mehrere logische Netzwerke mittels VLAN-Tags (IEEE 802.1Q).
- **Vorteile:** 
  - Erhöhte Sicherheit durch Isolation von Datenverkehr
  - Verbesserte Leistung durch Reduzierung der Broadcast-Domänen
  - Flexiblere Netzwerkadministration
- **Anwendung:** Trennung von Abteilungen, Gastnetze, IoT-Geräte-Isolation

## Dynamische ARP-Inspektion (DAI)
- **Funktionsweise:** Überprüfung von ARP-Paketen gegen eine vertrauenswürdige Datenbank (z.B. DHCP Snooping Binding Database).
- **Vorteile:**
  - Verhindert ARP-Spoofing und Man-in-the-Middle-Angriffe
  - Erhöht die Integrität der ARP-Tabellen
- **Herausforderungen:** Konfiguration und Wartung der vertrauenswürdigen Datenbank

## IP Source Guard
- **Funktionsweise:** Filtert eingehende Pakete basierend auf DHCP Snooping Binding-Einträgen oder manuell konfigurierten IP/MAC-Bindungen.
- **Vorteile:**
  - Verhindert IP-Spoofing-Angriffe
  - Ergänzt DHCP Snooping für umfassende Sicherheit
- **Beachtung:** Kann Probleme bei statischen IP-Konfigurationen verursachen, wenn nicht korrekt konfiguriert

## MACsec (IEEE 802.1AE)
- **Funktionsweise:** Verschlüsselung und Authentifizierung von Ethernet-Frames auf der Datenverbindungsschicht.
- **Vorteile:**
  - End-to-End-Sicherheit auf Layer 2
  - Schutz vor Abhören, Manipulation und Replay-Angriffen
- **Einsatzgebiete:** Sichere Verbindungen zwischen Rechenzentren, Campus-Netzwerke

## Private VLANs
- **Funktionsweise:** Unterteilung eines VLANs in Subdomänen (isoliert, community, promiscuous).
- **Vorteile:**
  - Feinere Kontrolle über die Kommunikation innerhalb eines VLANs
  - Erhöhte Sicherheit für Hosting-Umgebungen
- **Komplexität:** Erfordert sorgfältige Planung und Konfiguration

## Sturm-Kontrolle
- **Funktionsweise:** Überwachung und Begrenzung von Broadcast-, Multicast- und unbekanntem Unicast-Verkehr.
- **Vorteile:**
  - Verhindert Netzwerküberlastungen und DoS-Angriffe
  - Verbessert die Netzwerkstabilität
- **Konfiguration:** Schwellenwerte müssen sorgfältig festgelegt werden, um legitimen Verkehr nicht zu beeinträchtigen

## BPDU Guard
- **Funktionsweise:** Deaktiviert Ports, die unerwartete BPDU-Pakete empfangen.
- **Vorteile:**
  - Schützt die STP-Topologie vor unautorisierten Änderungen
  - Verhindert Spanning-Tree-Manipulationen
- **Anwendung:** Aktivierung an Access-Ports, an denen keine Switches angeschlossen sein sollten

## DHCP Snooping
- **Funktionsweise:** Überwacht DHCP-Verkehr und erstellt eine Binding-Datenbank vertrauenswürdiger IP-MAC-Port-Zuordnungen.
- **Vorteile:**
  - Verhindert DHCP-Spoofing und rogue DHCP-Server
  - Grundlage für andere Sicherheitsfunktionen wie DAI und IP Source Guard
- **Beachtung:** Korrekte Konfiguration von vertrauenswürdigen und nicht vertrauenswürdigen Ports ist entscheidend

## 802.1X-Authentifizierung
- **Funktionsweise:** Port-basierte Netzwerkzugangskontrolle mittels EAP (Extensible Authentication Protocol).
- **Vorteile:**
  - Starke Authentifizierung vor Netzwerkzugang
  - Unterstützung verschiedener Authentifizierungsmethoden (Zertifikate, Passwörter, etc.)
- **Herausforderungen:** Komplexe Implementierung, insbesondere in heterogenen Umgebungen

## Port-Sicherheit
- **Funktionsweise:** Begrenzt die Anzahl der erlaubten MAC-Adressen pro Switch-Port.
- **Vorteile:**
  - Verhindert MAC-Flooding-Angriffe
  - Kontrolliert den Zugang zum Netzwerk auf Port-Ebene
- **Flexibilität:** Verschiedene Konfigurationsoptionen (statisch, dynamisch, sticky)

## MAC-Adressfilterung
- **Funktionsweise:** Erlaubt oder blockiert Verkehr basierend auf Source- oder Destination-MAC-Adressen.
- **Vorteile:**
  - Einfache Implementierung für grundlegende Zugangskontrolle
  - Nützlich für kleine Netzwerke oder spezifische Ports
- **Einschränkungen:** Nicht skalierbar für große Netzwerke, anfällig für MAC-Spoofing
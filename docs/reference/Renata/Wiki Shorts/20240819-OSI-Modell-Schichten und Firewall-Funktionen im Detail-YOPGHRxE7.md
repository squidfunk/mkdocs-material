# OSI-Modell-Schichten und Firewall-Funktionen im Detail

## 1. Anwendungsschicht
- **Beschreibung:** Die oberste Schicht, die direkt mit Anwendungen interagiert.
- **Firewall-Funktionen:** 
  - Tiefe Paketinspektion (Deep Packet Inspection, DPI) analysiert den Inhalt der Datenpakete auf Anwendungsebene.
  - Web Application Firewalls (WAFs) schützen spezifisch vor Angriffen auf Webanwendungen wie SQL-Injection oder Cross-Site Scripting.

## 2. Darstellungsschicht
- **Beschreibung:** Verantwortlich für Datenkodierung, Kompression und Verschlüsselung.
- **Firewall-Funktionen:** 
  - Filterung basierend auf Datenformaten oder Kodierungsschemata.
  - Kann verdächtige Dateitypen oder unerwünschte Kodierungen blockieren.

## 3. Sitzungsschicht
- **Beschreibung:** Verwaltet Sitzungen zwischen Anwendungen.
- **Firewall-Funktionen:** 
  - Überwachung und Kontrolle von Sitzungszuständen.
  - Kann anomale Sitzungsaktivitäten erkennen und blockieren.

## 4. Transportschicht
- **Beschreibung:** Verantwortlich für die zuverlässige Datenübertragung zwischen Endpunkten.
- **Firewall-Funktionen:** 
  - Zustandsbehaftete (Stateful) Firewall überwacht TCP-Verbindungszustände.
  - Zugriffssteuerung basierend auf dem "Fünf-Tupel": Quell-IP, Ziel-IP, Quellport, Zielport und Protokoll.

## 5. Netzwerkschicht
- **Beschreibung:** Behandelt Routing und logische Adressierung.
- **Firewall-Funktionen:** 
  - Paketfilterung basierend auf IP-Adressen und anderen Paketheader-Informationen.
  - Implementierung von Zugriffskontrolllisten (ACLs) für grundlegende Netzwerkfilterung.

## 6. Sicherungsschicht
- **Beschreibung:** Verantwortlich für die zuverlässige Übertragung von Daten zwischen benachbarten Netzwerkknoten.
- **Firewall-Funktionen:** 
  - MAC-Adress-Filterung an Layer-2-Switches zur Kontrolle des Zugriffs auf Netzwerksegmente.
  - VLAN-Segmentierung zur logischen Trennung von Netzwerkbereichen.

## 7. Physikalische Schicht
- **Beschreibung:** Definiert die physikalischen und elektrischen Spezifikationen für Datenübertragung.
- **Firewall-Funktionen:** 
  - Physische Sicherheitsmaßnahmen wie das Deaktivieren unbenutzter Switch-Ports.
  - Physische Segmentierung des Netzwerks in verschiedene Sicherheitszonen.
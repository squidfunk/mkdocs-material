# IPv6 Spickzettel



## 1. Grundlegende Konzepte von IPv6

- **IPv6 (Internet Protocol Version 6):**
  Das neueste Internetprotokoll, das IPv4 ersetzen soll. IPv6 verwendet 128-Bit-Adressen, die in acht Gruppen zu jeweils vier hexadezimalen Ziffern geschrieben werden (z.B. `2001:0db8:85a3:0000:0000:8a2e:0370:7334`).

- **Warum IPv6?**
  - **Größerer Adressraum:** Bietet etwa 340 Undezillionen (3.4 x 10^38) einzigartige Adressen.
  - **Bessere Effizienz:** Verbessertes Routing und keine Notwendigkeit für NAT (Network Address Translation).
  - **Integrierte Sicherheit:** IPv6 hat IPsec (Internet Protocol Security) als obligatorischen Bestandteil.

## 2. Wichtige IPv6-Befehle

- **IPv6-Adresse anzeigen:**
  ```bash
  ip -6 a
  ```
  Zeigt die IPv6-Adressen der Netzwerkschnittstellen an.

- **IPv6-Routen anzeigen:**
  ```bash
  ip -6 route show
  ```
  Zeigt die IPv6-Routing-Tabelle des Systems an.

- **Ping6-Befehl verwenden:**
  ```bash
  ping6 <ziel-ipv6>
  ```
  Sendet ICMPv6-Pakete an eine Ziel-IPv6-Adresse, um die Verbindung zu testen.

## 3. IPv6-Adressarten

- **Global Unicast:**
  Weltweit eindeutige Adressen, die direkt im Internet geroutet werden können.

- **Link-Local:**
  Adressen, die nur für die Kommunikation innerhalb eines lokalen Netzwerks verwendet werden (`fe80::/10`).

- **Unique Local:**
  Ähnlich wie private IPv4-Adressen, für den Einsatz in lokalen Netzwerken bestimmt (`fc00::/7`).

- **Multicast:**
  Adressen, die zur gleichzeitigen Zustellung von Paketen an mehrere Hosts verwendet werden (`ff00::/8`).

## 4. Netzwerkanalyse und Fehlerbehebung

- **Traceroute6 verwenden:**
  ```bash
  traceroute6 <ziel-ipv6>
  ```
  Zeigt den Pfad, den Datenpakete zu einer bestimmten IPv6-Adresse nehmen.

- **DNS-Abfrage mit IPv6:**
  ```bash
  dig AAAA <domainname>
  ```
  Führt eine DNS-Abfrage durch, um die IPv6-Adresse (AAAA-Eintrag) einer Domain zu ermitteln.

- **IPv6-Nachbarschaftstabelle anzeigen:**
  ```bash
  ip -6 neigh show
  ```
  Zeigt die IPv6-Nachbarschaftstabelle an.

## 5. Nützliche Tools und Befehle

- **IPv6-Konfiguration erneuern:**
  ```bash
  sudo dhclient -6 -r && sudo dhclient -6
  ```
  Fordert eine neue IPv6-Adresse von einem DHCPv6-Server an.

- **TCPDUMP für IPv6-Verkehr:**
  ```bash
  sudo tcpdump -i <schnittstelle> ip6
  ```
  Erfasst IPv6-Pakete auf einer bestimmten Netzwerkschnittstelle.

- **IPv6-Header analysieren:**
  Wireshark verwenden, um detaillierte Informationen zu IPv6-Headern und Paketen zu erhalten.

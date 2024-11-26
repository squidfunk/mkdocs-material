# IPv4 Spickzettel



## 1. Grundlegende Konzepte von IPv4

- **IPv4 (Internet Protocol Version 4):**
  Ein Netzwerkprotokoll, das zur Adressierung und Weiterleitung von Paketen im Internet verwendet wird. IPv4-Adressen bestehen aus 32 Bit, die in vier Oktette aufgeteilt sind (z.B. `192.168.1.1`).

- **Subnetzmaske:**
  Eine Zahl, die verwendet wird, um den Netzwerk- und Hostteil einer IPv4-Adresse zu trennen (z.B. `255.255.255.0`).

- **CIDR (Classless Inter-Domain Routing):**
  Eine Methode zur IP-Adressierung, die flexiblere Subnetzmasken ermöglicht (z.B. `192.168.1.0/24`).

## 2. Wichtige IPv4-Befehle

- **IP-Adresse anzeigen:**
  ```bash
  ip a
  ```
  Zeigt die IPv4-Adressen der Netzwerkschnittstellen an.

- **Standard-Gateway anzeigen:**
  ```bash
  ip route show
  ```
  Zeigt die Standard-Route (Gateway) des Systems an.

- **Netzwerkverbindungen anzeigen:**
  ```bash
  netstat -r
  ```
  Zeigt die Routing-Tabelle des Systems an.

## 3. Subnetting und CIDR

- **Subnetting:**
  Der Prozess der Aufteilung eines Netzwerks in kleinere Subnetzwerke, um die Netzwerkauslastung zu optimieren und die Sicherheit zu erhöhen.

- **CIDR-Notation:**
  Bezeichnet die Anzahl der Bits, die für den Netzwerkteil einer IP-Adresse verwendet werden (z.B. `/24` bedeutet 24 Bits für das Netzwerk, 8 Bits für Hosts).

- **IP-Adressbereiche:**
  - **Öffentlich:** Wird im Internet verwendet (z.B. `8.8.8.8`).
  - **Privat:** Wird in privaten Netzwerken verwendet (z.B. `192.168.0.0/16`, `10.0.0.0/8`).

## 4. Netzwerkanalyse und Fehlerbehebung

- **Ping-Befehl zur Verbindungstestung:**
  ```bash
  ping <ziel-ip>
  ```
  Sendet ICMP-Pakete an eine Ziel-IP-Adresse, um die Netzwerkverbindung zu testen.

- **Traceroute verwenden:**
  ```bash
  traceroute <ziel-ip>
  ```
  Zeigt den Pfad, den Datenpakete zu einer bestimmten IP-Adresse nehmen.

- **DNS-Abfrage durchführen:**
  ```bash
  nslookup <domainname>
  ```
  Führt eine DNS-Abfrage durch, um die IPv4-Adresse einer Domain zu ermitteln.

## 5. Nützliche Tools und Befehle

- **IP-Konfiguration erneuern:**
  ```bash
  sudo dhclient -r && sudo dhclient
  ```
  Fordert eine neue IP-Adresse von einem DHCP-Server an.

- **ARP-Cache anzeigen:**
  ```bash
  arp -a
  ```
  Zeigt die ARP-Tabelle des Systems an.

- **Netzwerkverkehr überwachen:**
  ```bash
  sudo tcpdump -i <schnittstelle> ip
  ```
  Erfasst IPv4-Pakete auf einer bestimmten Netzwerkschnittstelle.

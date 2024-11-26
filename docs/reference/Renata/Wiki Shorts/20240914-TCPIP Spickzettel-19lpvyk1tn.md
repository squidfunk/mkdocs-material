# TCP/IP Spickzettel



## 1. Grundlegende TCP/IP-Befehle

- **IP-Adresse anzeigen:**
  ```bash
  ip a
  ```
  Zeigt die IP-Adresse aller Netzwerkschnittstellen an.

- **Ping-Befehl zur Verbindungstestung:**
  ```bash
  ping <zieladresse>
  ```
  Sendet Pakete an die angegebene Adresse, um die Netzwerkverbindung zu testen.

- **Traceroute verwenden:**
  ```bash
  traceroute <zieladresse>
  ```
  Zeigt den Weg der Pakete zu einer bestimmten IP-Adresse an.

- **Netzwerkverbindungen anzeigen:**
  ```bash
  netstat -tuln
  ```
  Zeigt alle aktiven TCP- und UDP-Verbindungen an.

## 2. TCP/IP Protokolle

- **TCP (Transmission Control Protocol):**
  Bietet zuverlässige, verbindungsorientierte Kommunikation zwischen Hosts.

- **UDP (User Datagram Protocol):**
  Bietet eine unzuverlässige, verbindungslose Kommunikation, die schneller, aber weniger sicher ist.

- **IP (Internet Protocol):**
  Verwaltet das Routing und die Adressierung von Datenpaketen im Netzwerk.

- **ICMP (Internet Control Message Protocol):**
  Wird zur Fehlererkennung und Diagnose verwendet (z.B. `ping`).

## 3. Netzwerkanalyse und Fehlerbehebung

- **Netzwerkschnittstellen neu starten:**
  ```bash
  sudo systemctl restart NetworkManager
  ```
  Startet den Netzwerkmanager und alle Netzwerkschnittstellen neu.

- **Firewall-Regeln anzeigen:**
  ```bash
  sudo iptables -L -v
  ```
  Zeigt alle konfigurierten Firewall-Regeln an.

- **Wireshark zur Protokollanalyse verwenden:**
  Wireshark ist ein leistungsstarkes Tool zur Analyse von TCP/IP-Paketen.

## 4. Nützliche Tools und Befehle

- **Port-Scan durchführen:**
  ```bash
  nmap <zieladresse>
  ```
  Scannt die angegebenen IP-Adressen auf offene Ports.

- **DNS-Auflösung überprüfen:**
  ```bash
  nslookup <domainname>
  ```
  Führt eine DNS-Abfrage für eine Domain durch.

- **TCP-Dumps zur Paketanalyse verwenden:**
  ```bash
  sudo tcpdump -i <schnittstelle>
  ```
  Zeichnet alle Pakete auf einer bestimmten Netzwerkschnittstelle auf.

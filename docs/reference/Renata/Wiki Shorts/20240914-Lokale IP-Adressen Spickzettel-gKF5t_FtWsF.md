# Lokale IP-Adressen Spickzettel



## 1. Grundlegende Konzepte von lokalen IP-Adressen

- **Lokale IP-Adressen:**
  IP-Adressen, die innerhalb eines lokalen Netzwerks verwendet werden und nicht direkt über das Internet zugänglich sind. Sie werden häufig in Heimnetzwerken, Büros und anderen privaten Netzwerken verwendet.

- **Private IP-Adressbereiche:**
  Die privaten IP-Adressen sind in drei Bereiche unterteilt:
  - **Klasse A:** `10.0.0.0` bis `10.255.255.255` (Subnetzmaske: `255.0.0.0`)
  - **Klasse B:** `172.16.0.0` bis `172.31.255.255` (Subnetzmaske: `255.240.0.0`)
  - **Klasse C:** `192.168.0.0` bis `192.168.255.255` (Subnetzmaske: `255.255.0.0`)

- **Warum lokale IP-Adressen verwenden?**
  - Reduzierung der Nutzung öffentlicher IP-Adressen.
  - Erhöhung der Sicherheit durch Isolation von Geräten innerhalb eines privaten Netzwerks.
  - Ermöglicht die Wiederverwendung derselben Adressbereiche in verschiedenen Netzwerken.

## 2. Wichtige Befehle zur Verwaltung von IP-Adressen

- **Lokale IP-Adresse anzeigen:**
  ```bash
  ip a
  ```
  Zeigt die IP-Adressen der Netzwerkschnittstellen an.

- **Lokale IP-Adresse ändern:**
  ```bash
  sudo ip addr add <neue-ip>/<subnetzmaske> dev <schnittstelle>
  ```
  Fügt eine neue IP-Adresse zu einer Netzwerkschnittstelle hinzu.

- **Standard-Gateway für lokales Netzwerk setzen:**
  ```bash
  sudo ip route add default via <gateway-ip>
  ```
  Setzt das Standard-Gateway für ausgehenden Netzwerkverkehr.

## 3. Fehlerbehebung und Netzwerkanalyse

- **Ping-Test im lokalen Netzwerk:**
  ```bash
  ping <ziel-ip>
  ```
  Testet die Konnektivität zu einem Gerät innerhalb des lokalen Netzwerks.

- **ARP-Tabelle anzeigen:**
  ```bash
  arp -a
  ```
  Zeigt die ARP-Tabelle mit den zugeordneten IP-Adressen und MAC-Adressen an.

- **Netzwerkschnittstellen neu starten:**
  ```bash
  sudo systemctl restart NetworkManager
  ```
  Startet alle Netzwerkschnittstellen neu.

## 4. Nützliche Tools und Befehle

- **Lokale Geräte scannen:**
  ```bash
  nmap -sP 192.168.1.0/24
  ```
  Scannt ein gesamtes lokales Subnetz nach aktiven Geräten.

- **DNS-Auflösung im lokalen Netzwerk überprüfen:**
  ```bash
  nslookup <hostname>
  ```
  Führt eine DNS-Abfrage innerhalb des lokalen Netzwerks durch.

- **Lokalverkehr mit TCPDUMP überwachen:**
  ```bash
  sudo tcpdump -i <schnittstelle> net 192.168.1.0/24
  ```
  Erfasst den gesamten Netzwerkverkehr im lokalen Subnetz.

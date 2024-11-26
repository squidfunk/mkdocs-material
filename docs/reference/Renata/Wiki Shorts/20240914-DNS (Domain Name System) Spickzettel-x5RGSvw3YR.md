# DNS (Domain Name System) Spickzettel



## 1. Grundlegende DNS-Befehle

- **DNS-Abfrage durchführen:**
  ```bash
  nslookup <domainname>
  ```
  Führt eine DNS-Abfrage für die angegebene Domain durch.

- **DNS-Server ändern:**
  ```bash
  sudo nano /etc/resolv.conf
  ```
  Öffnet die Datei `resolv.conf` zur Bearbeitung und ermöglicht das Ändern des DNS-Servers.

- **DNS-Einträge anzeigen:**
  ```bash
  dig <domainname> ANY
  ```
  Zeigt alle DNS-Einträge für die angegebene Domain an.

## 2. Arten von DNS-Einträgen

- **A-Eintrag:**
  Verweist eine Domain auf eine IPv4-Adresse.

- **AAAA-Eintrag:**
  Verweist eine Domain auf eine IPv6-Adresse.

- **CNAME-Eintrag:**
  Definiert einen Alias für eine andere Domain.

- **MX-Eintrag:**
  Gibt den Mailserver für eine Domain an.

- **NS-Eintrag:**
  Listet die autoritativen Nameserver für eine Domain auf.

- **TXT-Eintrag:**
  Enthält beliebige textbasierte Informationen, häufig für Verifizierungszwecke.

## 3. DNS-Fehlerbehebung

- **DNS-Cache leeren:**
  ```bash
  sudo systemd-resolve --flush-caches
  ```
  Löscht den lokalen DNS-Cache.

- **DNS-Probleme debuggen:**
  ```bash
  dig +trace <domainname>
  ```
  Verfolgt die DNS-Auflösung einer Domain.

- **Verbindungstest zu DNS-Server:**
  ```bash
  nslookup <domainname> <dns-server>
  ```
  Führt eine Abfrage für eine Domain auf einem spezifischen DNS-Server durch.

## 4. Nützliche Tools und Befehle

- **DNS-Server überprüfen:**
  ```bash
  cat /etc/resolv.conf
  ```
  Zeigt die aktuell konfigurierten DNS-Server an.

- **Reverse DNS-Lookup:**
  ```bash
  nslookup <ip-adresse>
  ```
  Führt eine Rückwärts-DNS-Abfrage für eine IP-Adresse durch.

- **Überprüfen von DNS-Propagierung:**
  Verwenden Sie Online-Dienste wie [WhatsMyDNS.net](https://www.whatsmydns.net/), um die DNS-Propagierung zu überprüfen.

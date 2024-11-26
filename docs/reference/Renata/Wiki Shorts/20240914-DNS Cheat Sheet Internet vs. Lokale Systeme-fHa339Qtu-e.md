# DNS Cheat Sheet: Internet vs. Lokale Systeme



## 1. Wie DNS im Internet funktioniert

- **DNS (Domain Name System):**
  Ein System, das Domänennamen in IP-Adressen übersetzt, um die Kommunikation zwischen Geräten im Internet zu ermöglichen.

- **Ablauf einer DNS-Anfrage:**
  1. **DNS-Abfrage starten:** Browser sendet eine Anfrage an den **rekursiven DNS-Resolver** des ISPs oder eines Drittanbieters.
  2. **Rekursiver Resolver:** Prüft seinen Cache auf eine Antwort; wenn nicht vorhanden, wird die Anfrage an den **Root-DNS-Server** gesendet.
  3. **Root-DNS-Server:** Verweist die Anfrage an den **TLD (Top-Level Domain) DNS-Server** (z. B. `.com`, `.org`).
  4. **TLD-DNS-Server:** Leitet die Anfrage an den **autoritativen DNS-Server** der spezifischen Domain weiter (z. B. `example.com`).
  5. **Autoritativer DNS-Server:** Gibt die IP-Adresse der angefragten Domain an den rekursiven Resolver zurück.
  6. **Rückgabe der IP-Adresse:** Der Resolver sendet die IP-Adresse an den Browser, der dann die Verbindung zur Website herstellt.

## 2. Wie DNS in lokalen Netzwerken funktioniert

- **Lokale DNS-Funktionalität:**
  Ähnlich wie im Internet, aber oft mit zusätzlichen Schritten und lokalen DNS-Servern.

- **Ablauf einer lokalen DNS-Anfrage:**
  1. **Lokaler DNS-Cache:** Das Betriebssystem prüft zuerst den lokalen DNS-Cache.
  2. **Lokaler DNS-Resolver:** Falls die IP-Adresse nicht im Cache ist, wird die Anfrage an den **lokalen DNS-Resolver** (oft auf dem Router oder einem internen Server) gesendet.
  3. **Interner DNS-Server:** Kann DNS-Abfragen für interne Namen (z. B. `printer.local`) direkt beantworten oder an externe DNS-Server weiterleiten.
  4. **Weiterleitung an externe DNS-Server:** Falls der interne DNS-Server die Anfrage nicht beantworten kann, leitet er die Anfrage an einen externen rekursiven DNS-Resolver weiter.

## 3. Vergleich: DNS im Internet vs. lokal

| Aspekt                    | Internet DNS                                  | Lokales DNS                                |
|---------------------------|-----------------------------------------------|--------------------------------------------|
| **Geltungsbereich**       | Löst globale Domänennamen auf (`example.com`). | Löst sowohl globale als auch lokale Namen auf (`printer.local`). |
| **Beteiligte DNS-Server** | Root, TLD und autoritative DNS-Server.        | Lokaler DNS-Resolver, interne DNS-Server, externe DNS-Server.   |
| **Cache-Nutzung**         | Cache in rekursiven Resolvern und Browsern.   | Lokaler DNS-Cache auf Geräten, lokaler DNS-Resolver cachet Ergebnisse. |
| **Sicherheit**            | DNSSEC zur Überprüfung von DNS-Antworten.     | Zusätzliche Sicherheitsmaßnahmen, wie Firewalls oder private IP-Adressen. |
| **Auflösungszeit**        | Kann länger sein, da mehrere DNS-Server beteiligt sind. | Oft schneller dank Caching und Nähe lokaler DNS-Server.         |

## 4. Nützliche Tools und Befehle

- **DNS-Cache leeren (Windows):**
  ```bash
  ipconfig /flushdns
  ```

- **DNS-Cache anzeigen (Linux):**
  ```bash
  systemd-resolve --statistics
  ```

- **DNS-Abfrage durchführen:**
  ```bash
  nslookup <domainname>
  ```

# NAT (Network Address Translation) Spickzettel



## 1. Grundlegende Konzepte von NAT

- **NAT (Network Address Translation):**
  Ein Mechanismus, der es ermöglicht, mehrere Geräte in einem lokalen Netzwerk mit einer einzigen öffentlichen IP-Adresse mit dem Internet zu verbinden. NAT übersetzt private IP-Adressen in eine öffentliche IP-Adresse und umgekehrt.

- **Arten von NAT:**
  - **Static NAT:** Übersetzt eine feste private IP-Adresse in eine feste öffentliche IP-Adresse.
  - **Dynamic NAT:** Verwendet einen Pool von öffentlichen IP-Adressen und weist jedem Gerät bei Bedarf eine zu.
  - **PAT (Port Address Translation) / NAT Overload:** Eine Form der dynamischen NAT, bei der viele private IP-Adressen über eine einzige öffentliche IP-Adresse durch die Verwendung verschiedener Ports übersetzt werden.

## 2. Wie NAT funktioniert

1. **Anfrage vom internen Netzwerk:**
   Ein Gerät im internen Netzwerk sendet eine Anfrage an das Internet (z.B., eine Website aufrufen).

2. **Übersetzung der IP-Adressen:**
   Der Router oder die Firewall, die NAT durchführt, ändert die private IP-Adresse des Geräts in eine öffentliche IP-Adresse.

3. **Kommunikation mit dem Zielserver:**
   Die Anfrage wird mit der öffentlichen IP-Adresse an den Zielserver gesendet.

4. **Antwort an das interne Gerät:**
   Der Zielserver antwortet an die öffentliche IP-Adresse, die der NAT-Router/Firewall wieder in die private IP-Adresse des Geräts übersetzt und die Antwort an das ursprüngliche Gerät weiterleitet.

## 3. Vorteile und Anwendungen von NAT

- **Sicherheitsverbesserung:**
  NAT verbirgt interne IP-Adressen, wodurch es schwieriger wird, auf Geräte im internen Netzwerk zuzugreifen.

- **IP-Adressen sparen:**
  NAT ermöglicht es mehreren Geräten, eine einzige öffentliche IP-Adresse zu verwenden, was besonders bei begrenzten IP-Ressourcen nützlich ist.

- **Erleichterte Netzwerkverwaltung:**
  Interne Netzwerke können ihre eigenen privaten IP-Adressenschemata unabhängig vom Internet verwenden.

## 4. Nützliche NAT-Befehle und Tools

- **Aktuelle NAT-Tabelle anzeigen (Cisco-Router):**
  ```bash
  show ip nat translations
  ```
  Zeigt die aktuellen NAT-Übersetzungen auf einem Cisco-Router an.

- **NAT-Konfiguration auf einem Router anzeigen:**
  ```bash
  show running-config | include ip nat
  ```
  Zeigt die NAT-Konfiguration in der laufenden Konfiguration des Routers an.

- **Portweiterleitung einrichten (Linux):**
  ```bash
  sudo iptables -t nat -A PREROUTING -p tcp --dport <port> -j DNAT --to-destination <interne-ip>:<port>
  ```
  Richtet die Portweiterleitung für eingehenden Datenverkehr ein.

## 5. Überlegungen zu NAT

- **Probleme mit bestimmten Protokollen:**
  Einige Protokolle, wie SIP (Session Initiation Protocol) oder FTP, können durch NAT behindert werden und erfordern möglicherweise zusätzliche Konfigurationen.

- **Einfluss auf die Leistung:**
  Da NAT die Übersetzung von Adressen und die Verwaltung von Verbindungen erfordert, kann dies zu einem leichten Leistungsabfall führen.

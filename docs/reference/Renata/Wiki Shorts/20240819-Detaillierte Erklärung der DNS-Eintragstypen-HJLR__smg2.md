# Detaillierte Erklärung der DNS-Eintragstypen

## A-Eintrag (Address Record)
- **Technische Details:** 32-Bit-Wert, der eine IPv4-Adresse darstellt.
- **TTL (Time to Live):** Definiert, wie lange der Eintrag gecacht werden soll.
- **Mehrfache Einträge:** Möglich für Load-Balancing und Failover.
- **Reverse Mapping:** Korrespondiert mit PTR-Einträgen für Reverse-DNS.
- **Sicherheitsaspekte:** Anfällig für DNS-Spoofing, daher wichtig für DNSSEC.

## AAAA-Eintrag (IPv6 Address Record)
- **Technische Details:** 128-Bit-Wert für IPv6-Adressen.
- **Koexistenz:** Oft parallel zu A-Einträgen für Dual-Stack-Netzwerke.
- **Performance:** Kann in einigen Netzwerken zu längeren Ladezeiten führen.
- **Adoption:** Zunehmend wichtig mit der Erschöpfung von IPv4-Adressen.

## CNAME-Eintrag (Canonical Name)
- **Einschränkungen:** Kann nicht zusammen mit anderen Einträgen für denselben Namen existieren.
- **Ketten:** CNAME-Ketten sind möglich, aber nicht empfohlen (Performance-Gründe).
- **Apex-Domain:** Nicht verwendbar für Apex-Domains (z.B. example.com ohne www).
- **Alternativen:** ANAME oder ALIAS-Einträge in einigen DNS-Systemen.

## MX-Eintrag (Mail Exchanger)
- **Priorität:** Niedrigere Zahlen haben höhere Priorität.
- **Mehrfache Einträge:** Üblich für Redundanz und Load-Balancing.
- **Besonderheiten:** Muss auf einen A- oder AAAA-Eintrag verweisen, nicht auf CNAME.
- **Null MX:** Spezielle Konfiguration für Domains ohne E-Mail-Dienst.

## NS-Eintrag (Name Server)
- **Glue Records:** Notwendig, wenn Nameserver in der eigenen Domain liegen.
- **Delegation:** Ermöglicht Subdomain-Delegation an andere DNS-Server.
- **Redundanz:** Mindestens zwei NS-Einträge empfohlen für Ausfallsicherheit.
- **Performance:** Beeinflusst die DNS-Abfragegeschwindigkeit.

## PTR-Eintrag (Pointer Record)
- **Reverse DNS Zone:** Verwendet in der in-addr.arpa Domain für IPv4 und ip6.arpa für IPv6.
- **E-Mail:** Wichtig für Anti-Spam-Maßnahmen und E-Mail-Zustellbarkeit.
- **Struktur:** Inverse Notation der IP-Adresse (z.B. 2.0.168.192.in-addr.arpa).
- **Eindeutigkeit:** Idealerweise 1:1-Beziehung mit A-Einträgen.

## TXT-Eintrag (Text Record)
- **Länge:** Bis zu 255 Zeichen pro String, mehrere Strings möglich.
- **Verwendungen:** SPF, DKIM, DMARC für E-Mail-Authentifizierung.
- **Verification:** Genutzt von Diensten zur Domain-Verifizierung.
- **Flexibilität:** Kann beliebige Textinformationen enthalten.

## SRV-Eintrag (Service Record)
- **Format:** _service._proto.name TTL class SRV priority weight port target
- **Gewichtung:** Ermöglicht Load-Balancing zwischen Servern.
- **Anwendungen:** Wichtig für VoIP, XMPP, LDAP und andere Protokolle.
- **Auto-Discovery:** Erleichtert die automatische Konfiguration von Clients.

## SOA-Eintrag (Start of Authority)
- **Felder:** MNAME, RNAME, SERIAL, REFRESH, RETRY, EXPIRE, MINIMUM
- **SERIAL:** Wichtig für Zone-Transfers und Replikation.
- **RNAME:** Enthält E-Mail-Adresse des Administrators (mit @ durch . ersetzt).
- **Timing:** Beeinflusst DNS-Caching und Zonenaktualisierungen.

## CAA-Eintrag (Certification Authority Authorization)
- **Flags:** Kritisches Flag (0 oder 128) beeinflusst Behandlung durch CAs.
- **Tags:** "issue", "issuewild", "iodef" für verschiedene Autorisierungstypen.
- **Vererbung:** Gilt für Subdomains, wenn nicht überschrieben.
- **Compliance:** Seit 2017 von CAs verpflichtend zu prüfen.
# Linux ufw Firewall-Befehl


**`ufw`** ist ein benutzerfreundliches Frontend für `iptables` unter Linux.

## Grundlagen: `ufw` aktivieren/deaktivieren und Einstellungen ändern
- `ufw status [verbose|numbered]`  
  Firewall-Regeln mit optionaler Ausführlichkeit anzeigen.

- `ufw [enable|disable]`  
  `ufw` aktivieren oder deaktivieren.

- `ufw reload`  
  Geänderte `ufw`-Regeln aktualisieren, ohne den `ufw`-Dienst zu stoppen.

- `ufw logging [on|off] <log-level>`  
  Protokollierung aktivieren (`log-level`: low/medium/high/full).

## Regel-Hinzufügung: Erlauben/Verweigern/Begrenzen-Regeln hinzufügen
- `ufw default [allow|deny|reject] [incoming|outgoing]`  
  Standard-Ein-/Ausgangs-Aktion ändern.

- `ufw deny on eth0 from 1.1.1.0/24`  
  Gesamten Verkehr auf eth0 aus dem Subnetz 1.1.1.0/24 verwerfen.

- `ufw reject in from 1.1.1.1`  
  Gesamten Verkehr von 1.1.1.1 ablehnen und ein Fehlerpaket zurücksenden.

- `ufw deny ssh reject`  
  Alle eingehenden SSH-Verbindungen standardmäßig blockieren.

- `ufw allow 5555/udp`  
  UDP-Verbindung zum Port 5555 erlauben.

- `ufw allow from 1.1.1.1 proto tcp to any port 22`  
  SSH-Verkehr nur von 1.1.1.1 erlauben.

- `ufw limit ssh/tcp`  
  SSH-Verbindungen ratenbegrenzen (nur 6 Verbindungen in 30 Sekunden zulassen).

## Regel-Entfernung: Eine oder mehrere Regeln entfernen
- `ufw delete deny on eth0 from 1.1.1.0/24`  
  Eine bestimmte Regel entfernen.

- `ufw delete <rule-number>`  
  Eine Regel anhand der Regelnummer entfernen.

- `ufw reset`  
  Alle bestehenden Regeln entfernen und Firewall-Regeln auf Standardwerte zurücksetzen.

## App-Profile: Regeln basierend auf App-Profilen aktivieren/deaktivieren
- `ufw app list`  
  App-Profile in `/etc/ufw/applications.d` anzeigen.

- `ufw allow <profile-name>`  
  Ein App-Profil aktivieren.

- `ufw delete allow <profile-name>`  
  Ein App-Profil deaktivieren.

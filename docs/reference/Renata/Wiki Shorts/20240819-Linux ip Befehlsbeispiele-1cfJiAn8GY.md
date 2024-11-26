# Linux ip Befehlsbeispiele


## `ip addr`: IP-Adressen verwalten

- `ip addr show`  
  Alle IP-Adressen anzeigen.

- `ip addr show dev eth0`  
  IP-Adressen auf `eth0` anzeigen.

- `ip addr add 1.1.1.1/24 dev eth0`  
  Eine IP-Adresse hinzufügen.

- `ip addr del 1.1.1.1/24 dev eth0`  
  Eine IP-Adresse löschen.

- `ip addr flush dev eth0`  
  Alle IP-Adressen entfernen.

## `ip link`: Netzwerkschnittstelle verwalten

- `ip link show`  
  Alle Netzwerkschnittstellen anzeigen.

- `ip link show eth0`  
  Details zu `eth0` anzeigen.

- `ip link set eth0 up/down`  
  `eth0` aktivieren/deaktivieren.

- `ip link set eth0 mtu 9000`  
  MTU ändern.

- `ip link set eth0 promisc on`  
  Promiskuösen Modus aktivieren.

- `ip -s link show eth0`  
  Verkehrsstatistiken anzeigen.

- `ip link set eth0 addr 11:22:33:44:55:66`  
  MAC-Adresse ändern.

## `ip route`: Netzwerkrouten verwalten

- `ip route`  
  Alle Routen anzeigen.

- `ip route show default`  
  Die Standardroute anzeigen.

- `ip route flush dev eth0`  
  Alle Routen für `eth0` entfernen.

- `ip route get 1.1.1.1`  
  Eine Route anzeigen, die mit `1.1.1.1` übereinstimmt.

- `ip route show 1.1.1.0/24 show`  
  Routeneintrag für `1.1.1.0/24` anzeigen.

- `ip route add 1.1.1.0/24 dev eth0`  
  Einen Routeneintrag für `1.1.1.0/24` über `eth0` hinzufügen.

- `ip route add default via 192.168.0.1 dev eth0`  
  Das Standard-Gateway hinzufügen.

- `ip route add/del 1.1.0.1/24 via 192.168.0.1`  
  Einen Routeneintrag über einen nächsten Hop hinzufügen/entfernen.

- `ip route replace 1.1.1.0/24 via 192.168.1.1 dev eth0`  
  Einen Routeneintrag für `1.1.1.0/24` ersetzen.

- `ip route add 1.1.1.0/24 via 192.168.1.1 dev eth0 metric 100`  
  Einen Metrikwert angeben.

## `ip neigh`: ARP-Nachbarn verwalten

- `ip neigh show`  
  Alle ARP-Einträge in der ARP-Tabelle anzeigen.

- `ip neigh show dev eth0`  
  Nur ARP-Einträge für `eth0` anzeigen.

- `ip neigh del 192.168.0.2 eth0`  
  Einen ARP-Eintrag entfernen.

- `ip neigh add 192.168.0.2 lladdr <mac-addr> dev eth0 nud permanent`  
  Einen statischen ARP-Eintrag hinzufügen.

- `ip neigh change 192.168.0.2 lladdr <mac-addr> dev eth0`  
  Einen bestehenden ARP-Eintrag aktualisieren.

- `ip neigh flush to 192.168.0.0/24`  
  Alle ARP-Einträge für ein bestimmtes Subnetz löschen.

## `ip tunnel`: Tunnel verwalten

- `ip tunnel show`  
  Alle konfigurierten Tunnel-Schnittstellen anzeigen.

- `ip tunnel add gre1 mode gre remote 10.0.0.2 local 10.0.0.1 ttl 255`  
  Einen GRE-Tunnel erstellen.

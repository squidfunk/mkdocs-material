# IPv4 und IPv6 Vergleich

## I. Detaillierter Header-Vergleich

### IPv4 Header

1. **Version (4 Bit)**
   - Wert: 4
   - **Admin-Tipp:** Überprüfen Sie dieses Feld bei Problemen mit Dual-Stack-Konfigurationen.

2. **IHL (4 Bit)**
   - Minimaler Wert: 5 (20 Byte)
   - **Admin-Tipp:** Ungewöhnliche Werte können auf fehlerhafte Geräte oder Malware hinweisen.
   - **Troubleshooting:** Nutzen Sie Wireshark zur Analyse verdächtiger Pakete.

3. **DSCP/ECN (8 Bit)**
   - Früher Type of Service (ToS)
   - **QoS-Konfiguration (Cisco):**
     ```
     interface GigabitEthernet0/1
      mls qos trust dscp
     !
     class-map match-all VOICE
      match dscp ef
     !
     policy-map QOS-POLICY
      class VOICE
       priority percent 10
     !
     interface GigabitEthernet0/1
      service-policy output QOS-POLICY
     ```

4. **Total Length (16 Bit)**
   - Max: 65,535 Bytes
   - **MTU-Konfiguration (Linux):**
     ```
     ip link set eth0 mtu 9000
     ```
   - **Jumbo Frames (Cisco Switch):**
     ```
     system mtu jumbo 9000
     ```

5. **Identification (16 Bit), Flags (3 Bit), Fragment Offset (13 Bit)**
   - **Fragmentierungsvermeidung (Cisco):**
     ```
     interface GigabitEthernet0/1
      ip mtu 1400
     ```
   - **Troubleshooting:** Nutzen Sie `ping` mit DF-Flag:
     ```
     ping -M do -s 1500 192.168.1.1
     ```

6. **TTL (8 Bit)**
   - **Security-Konfiguration (Cisco):**
     ```
     access-list 100 permit ip any any ttl gt 10
     ```
   - **Traceroute-Alternative (Linux):**
     ```
     tracepath 8.8.8.8
     ```

7. **Protocol (8 Bit)**
   - Wichtige Werte: 6 (TCP), 17 (UDP), 1 (ICMP)
   - **Firewall-Regel (iptables):**
     ```
     iptables -A INPUT -p tcp --dport 22 -j ACCEPT
     ```

8. **Header Checksum (16 Bit)**
   - **Troubleshooting:** Überprüfen Sie Router-Logs auf "IP checksum errors"
   - **Cisco IOS Befehl:**
     ```
     show interface | include CRC
     ```

9. **Source/Destination Address (je 32 Bit)**
   - **Subnetz-Konfiguration (Cisco):**
     ```
     interface Vlan10
      ip address 192.168.10.1 255.255.255.0
     ```
   - **DHCP-Pool (Cisco):**
     ```
     ip dhcp pool LAN10
      network 192.168.10.0 255.255.255.0
      default-router 192.168.10.1
     ```

10. **Options (variabel)**
    - **Security-Tipp:** Blockieren Sie Pakete mit ungewöhnlichen Optionen an der Firewall.

### IPv6 Header

1. **Version (4 Bit)**
   - Wert: 6
   - **Dual-Stack-Konfiguration (Cisco):**
     ```
     ipv6 unicast-routing
     interface GigabitEthernet0/1
      ip address 192.168.1.1 255.255.255.0
      ipv6 address 2001:db8:1::1/64
      ipv6 enable
     ```

2. **Traffic Class (8 Bit)**
   - **QoS-Konfiguration (Cisco):**
     ```
     ipv6 access-list CLASSIFY-TRAFFIC
      permit ipv6 any any dscp ef
     !
     class-map IPV6-VOICE
      match access-group name CLASSIFY-TRAFFIC
     !
     policy-map IPV6-QOS
      class IPV6-VOICE
       priority percent 10
     ```

3. **Flow Label (20 Bit)**
   - **Load-Balancing (Linux):**
     ```
     ip6tables -t mangle -A PREROUTING -m u32 --u32 "0&0x000FFFFF=0x1:0xFFFFE" -j MARK --set-mark 1
     ```

4. **Payload Length (16 Bit)**
   - **Jumbo Frame Konfiguration (Cisco):**
     ```
     system mtu jumbo 9000
     ```

5. **Next Header (8 Bit)**
   - Ähnlich wie Protocol in IPv4
   - **ICMPv6 Firewall-Regel (ip6tables):**
     ```
     ip6tables -A INPUT -p icmpv6 --icmpv6-type echo-request -j ACCEPT
     ```

6. **Hop Limit (8 Bit)**
   - **Konfiguration (Cisco):**
     ```
     ipv6 hop-limit 64
     ```

7. **Source/Destination Address (je 128 Bit)**
   - **Adresskonfiguration (Cisco):**
     ```
     interface GigabitEthernet0/1
      ipv6 address 2001:db8:1::1/64
      ipv6 address fe80::1 link-local
     ```
   - **DHCPv6 Server (Cisco):**
     ```
     ipv6 dhcp pool IPV6-LAN
      address prefix 2001:db8:1::/64
     !
     interface GigabitEthernet0/1
      ipv6 dhcp server IPV6-LAN
     ```

## II. Erweiterte Konfigurationen und Best Practices

### Routing

1. **OSPFv3 für IPv6 (Cisco)**
   ```
   ipv6 router ospf 1
    router-id 1.1.1.1
   !
   interface GigabitEthernet0/1
    ipv6 ospf 1 area 0
   ```

2. **BGP für IPv6 (Juniper)**
   ```
   protocols {
     bgp {
       group PEER {
         type external;
         peer-as 65000;
         neighbor 2001:db8:1::2;
       }
     }
   }
   ```

### Sicherheit

1. **ICMPv6 Firewall-Regeln (ip6tables)**
   ```
   ip6tables -A INPUT -p icmpv6 --icmpv6-type echo-request -j ACCEPT
   ip6tables -A INPUT -p icmpv6 --icmpv6-type neighbor-solicitation -j ACCEPT
   ip6tables -A INPUT -p icmpv6 --icmpv6-type neighbor-advertisement -j ACCEPT
   ip6tables -A INPUT -p icmpv6 --icmpv6-type router-advertisement -j ACCEPT
   ```

2. **IPv6 Access Control List (Cisco)**
   ```
   ipv6 access-list PROTECT-MGMT
    permit tcp 2001:db8::/32 host 2001:db8:1::2 eq 22
    deny ipv6 any any log
   !
   interface GigabitEthernet0/1
    ipv6 traffic-filter PROTECT-MGMT in
   ```

### Transition-Mechanismen

1. **6to4 Tunnel (Cisco)**
   ```
   interface Tunnel0
    ipv6 address 2002:C0A8:0101::1/64
    tunnel source GigabitEthernet0/1
    tunnel mode ipv6ip 6to4
   !
   ipv6 route 2002::/16 Tunnel0
   ```

2. **NAT64 (Cisco)**
   ```
   interface GigabitEthernet0/1
    nat64 enable
   !
   nat64 prefix stateful 2001:db8:1::/96
   nat64 v4 pool IPV4-POOL 203.0.113.1 203.0.113.254
   nat64 v6v4 list NAT64-ACL pool IPV4-POOL
   ```

### Performance-Optimierung

1. **IPv6 Flow Monitoring (Cisco)**
   ```
   flow exporter EXPORTER
    destination 2001:db8:2::50
    transport udp 9996
    export-protocol netflow-v9
   !
   flow record IPV6-RECORD
    match ipv6 protocol
    match ipv6 source address
    match ipv6 destination address
    collect counter bytes long
    collect counter packets long
   !
   flow monitor IPV6-MONITOR
    record IPV6-RECORD
    exporter EXPORTER
   !
   interface GigabitEthernet0/1
    ipv6 flow monitor IPV6-MONITOR input
   ```

2. **IPv6 Traffic Shaping (Linux tc)**
   ```
   tc qdisc add dev eth0 root handle 1: htb default 30
   tc class add dev eth0 parent 1: classid 1:1 htb rate 100mbit burst 15k
   tc class add dev eth0 parent 1:1 classid 1:10 htb rate 30mbit burst 15k
   tc class add dev eth0 parent 1:1 classid 1:20 htb rate 50mbit burst 15k
   tc filter add dev eth0 protocol ipv6 parent 1:0 prio 1 u32 match ip6 dst 2001:db8:1::/64 flowid 1:10
   tc filter add dev eth0 protocol ipv6 parent 1:0 prio 1 u32 match ip6 dst 2001:db8:2::/64 flowid 1:20
   ```

## III. Troubleshooting und Diagnostik

1. **ICMPv6 Neighbor Discovery Probleme**
   - Überprüfen Sie Router Advertisements:
     ```
     tcpdump -i eth0 icmp6 and 'ip6[40] = 134'
     ```
   - Neighbor Solicitation/Advertisement:
     ```
     tcpdump -i eth0 icmp6 and 'ip6[40] = 135 or ip6[40] = 136'
     ```

2. **Path MTU Discovery Probleme**
   - Testen Sie mit verschiedenen Paketgrößen:
     ```
     ping6 -M do -s 1400 2001:db8::1
     ```
   - Überprüfen Sie ICMPv6 Packet Too Big Nachrichten:
     ```
     tcpdump -i eth0 icmp6 and 'ip6[40] = 2'
     ```

3. **DNS-Probleme**
   - Überprüfen Sie AAAA-Records:
     ```
     dig AAAA www.example.com
     ```
   - Reverse DNS-Lookup:
     ```
     dig -x 2001:db8::1
     ```

4. **Performance-Analyse**
   - IPv6 Throughput-Test (iperf3):
     ```
     iperf3 -6 -c 2001:db8::1
     ```
   - Traceroute für IPv6:
     ```
     traceroute6 2001:db8::1
     ```

## IV. Best Practices für IPv6-Deployment

1. **Adressplanung**
   - Nutzen Sie ULA (Unique Local Addresses) für interne Kommunikation
   - Implementieren Sie eine klare Subnetz-Strategie (z.B. /64 für Endgeräte-Netze)

2. **Sicherheit**
   - Aktivieren Sie IPv6 First Hop Security Features (RA Guard, DHCPv6 Guard)
   - Implementieren Sie IPv6-spezifische Firewall-Regeln

3. **Monitoring**
   - Passen Sie SNMP und Syslog für IPv6-Unterstützung an
   - Implementieren Sie IPv6-fähige Netzwerk-Monitoring-Tools

4. **Dokumentation**
   - Erstellen und pflegen Sie IPv6-Adressplan-Dokumente
   - Dokumentieren Sie Dual-Stack-Konfigurationen sorgfältig

5. **Training**
   - Schulen Sie das IT-Personal in IPv6-Grundlagen und fortgeschrittenen Konzepten
   - Führen Sie regelmäßige IPv6-Sicherheitsaudits durch
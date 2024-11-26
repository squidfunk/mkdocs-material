# Network Switch Types

## Layer 1 Switch (Hub)
- Most basic networking device
- Simply repeats signals received on any port to all other ports
- No traffic management or filtering
- Creates a single collision domain
- Does not understand MAC or IP addresses
- Used primarily in legacy networks
- Advantages: Simple, inexpensive
- Disadvantages: High network congestion, no traffic management

## Layer 2 Switch (Data Link Layer)
- Uses MAC addresses to forward frames
- Creates separate collision domains for each port
- Maintains MAC address table (CAM table)
- Features:
  - Store-and-forward capability
  - Wire-speed switching
  - Auto-negotiation of speed/duplex
  - Support for VLANs
- Advantages: 
  - Reduces network congestion
  - Provides dedicated bandwidth per port
  - Low latency
- Common uses: Local area networks, creating separate broadcast domains

## Layer 3 Switch (Network Layer)
- Combines switching and routing functions
- Makes forwarding decisions based on IP addresses
- Features:
  - Hardware-based routing
  - Static and dynamic routing protocols
  - Access Control Lists (ACLs)
  - Quality of Service (QoS)
  - VLAN routing
- Advantages:
  - Faster than traditional routers
  - Inter-VLAN routing
  - Enhanced security features
- Common uses: Enterprise networks, data centers

## Layer 4 Switch (Transport Layer)
- Makes decisions based on TCP/UDP ports
- Load balancing capabilities
- Features:
  - Session awareness
  - Application-level load balancing
  - Network Address Translation (NAT)
  - TCP connection management
- Advantages:
  - Advanced load balancing
  - Application-level routing
  - Enhanced security
- Common uses: Data centers, web server farms

# ISO Network Layers and Protocols 

## Layer 1 - Physical
- Ports: RJ45, Fiber, Coaxial
- Protocols: 
  - Ethernet (10BASE-T, 100BASE-TX, 1000BASE-T)
  - DSL
  - SONET/SDH
- Function: Physical transmission of bits

## Layer 2 - Data Link
- Ports: Switch ports, Bridge ports
- Protocols:
  - Ethernet
  - PPP
  - HDLC
  - Frame Relay
- Function: Node-to-node delivery, error detection

## Layer 3 - Network
- Protocols:
  - IP (IPv4, IPv6)
  - ICMP
  - OSPF
  - BGP
  - RIP
- Function: End-to-end delivery, routing

## Layer 4 - Transport
- Protocols:
  - TCP
  - UDP
  - SCTP
- Function: End-to-end connection, reliability

## Layer 5 - Session
- Protocols:
  - NetBIOS
  - RPC
  - SQL
- Function: Session management, dialog control

## Layer 6 - Presentation
- Protocols:
  - SSL/TLS
  - JPEG
  - ASCII
- Function: Data translation, encryption

## Layer 7 - Application
- Protocols:
  - HTTP/HTTPS
  - FTP
  - SMTP
  - DNS
- Function: User interface, application services

# Traffic Flow in Layer 3 Switch

1. **Packet Reception**
   - Packet arrives at ingress port
   - Switch examines Layer 2 (MAC) header
   - Switch examines Layer 3 (IP) header

2. **Processing**
   - CAM table lookup for MAC addresses
   - Routing table lookup for IP addresses
   - Access Control List (ACL) checking
   - Quality of Service (QoS) processing

3. **Switching Decision**
   - If destination is on same VLAN:
     - Forward based on MAC address (Layer 2 switching)
   - If destination is on different VLAN:
     - Process routing information
     - Perform Layer 3 lookup
     - Rewrite MAC headers

4. **Forwarding**
   - Packet queued for egress
   - QoS applied if configured
   - Packet transmitted on appropriate port

5. **Special Cases**
   - Broadcast handling
   - Multicast routing
   - VLAN trunking
   - Load balancing (if configured)
# How ARP Works

## Address Resolution Protocol (ARP)
ARP is a network protocol used to map an IPv4 address to a physical MAC address on a LAN.

### ARP Process
1. **Broadcast ARP Request:**  
   Host1 (192.168.1.50) sends a broadcast ARP request: "Who has 192.168.1.80?"

2. **Unicast ARP Response:**  
   Host3 (192.168.1.80) responds: "I have 192.168.1.80," sending its MAC address to Host1.

### Components in ARP Message
- **ETH Header:** Contains source and destination MAC addresses.
- **Payload:** Contains source IP, sender MAC, target IP, and target MAC (0.0.0.0 for requests).

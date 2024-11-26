# TCP/IP Cheat Sheet



## 1. Basic TCP/IP Commands

- **Display IP Address:**
  ```bash
  ip a
  ```
  Shows the IP address of all network interfaces.

- **Ping Command for Connection Testing:**
  ```bash
  ping <target-address>
  ```
  Sends packets to the specified address to test network connectivity.

- **Use Traceroute:**
  ```bash
  traceroute <target-address>
  ```
  Displays the route taken by packets to a specific IP address.

- **Show Network Connections:**
  ```bash
  netstat -tuln
  ```
  Displays all active TCP and UDP connections.

## 2. TCP/IP Protocols

- **TCP (Transmission Control Protocol):**
  Provides reliable, connection-oriented communication between hosts.

- **UDP (User Datagram Protocol):**
  Provides unreliable, connectionless communication that is faster but less secure.

- **IP (Internet Protocol):**
  Manages the routing and addressing of data packets in the network.

- **ICMP (Internet Control Message Protocol):**
  Used for error detection and diagnostics (e.g., `ping`).

## 3. Network Analysis and Troubleshooting

- **Restart Network Interfaces:**
  ```bash
  sudo systemctl restart NetworkManager
  ```
  Restarts the network manager and all network interfaces.

- **Show Firewall Rules:**
  ```bash
  sudo iptables -L -v
  ```
  Displays all configured firewall rules.

- **Use Wireshark for Protocol Analysis:**
  Wireshark is a powerful tool for analyzing TCP/IP packets.

## 4. Useful Tools and Commands

- **Perform Port Scan:**
  ```bash
  nmap <target-address>
  ```
  Scans the specified IP addresses for open ports.

- **Check DNS Resolution:**
  ```bash
  nslookup <domain-name>
  ```
  Performs a DNS query for a domain.

- **Use TCP Dumps for Packet Analysis:**
  ```bash
  sudo tcpdump -i <interface>
  ```
  Captures all packets on a specific network interface.

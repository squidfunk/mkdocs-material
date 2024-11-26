# IPv4 Cheat Sheet



## 1. Basic Concepts of IPv4

- **IPv4 (Internet Protocol Version 4):**
  A network protocol used for addressing and routing packets on the internet. IPv4 addresses consist of 32 bits divided into four octets (e.g., `192.168.1.1`).

- **Subnet Mask:**
  A number used to separate the network and host parts of an IPv4 address (e.g., `255.255.255.0`).

- **CIDR (Classless Inter-Domain Routing):**
  A method of IP addressing that allows more flexible subnet masks (e.g., `192.168.1.0/24`).

## 2. Important IPv4 Commands

- **Display IP Address:**
  ```bash
  ip a
  ```
  Shows the IPv4 addresses of network interfaces.

- **Display Default Gateway:**
  ```bash
  ip route show
  ```
  Shows the system's default route (gateway).

- **Show Network Connections:**
  ```bash
  netstat -r
  ```
  Displays the system's routing table.

## 3. Subnetting and CIDR

- **Subnetting:**
  The process of dividing a network into smaller sub-networks to optimize network utilization and increase security.

- **CIDR Notation:**
  Denotes the number of bits used for the network part of an IP address (e.g., `/24` means 24 bits for the network, 8 bits for hosts).

- **IP Address Ranges:**
  - **Public:** Used on the internet (e.g., `8.8.8.8`).
  - **Private:** Used in private networks (e.g., `192.168.0.0/16`, `10.0.0.0/8`).

## 4. Network Analysis and Troubleshooting

- **Ping Command for Connection Testing:**
  ```bash
  ping <target-ip>
  ```
  Sends ICMP packets to a target IP address to test network connectivity.

- **Use Traceroute:**
  ```bash
  traceroute <target-ip>
  ```
  Displays the path that data packets take to a specific IP address.

- **Perform DNS Lookup:**
  ```bash
  nslookup <domain-name>
  ```
  Performs a DNS query to determine the IPv4 address of a domain.

## 5. Useful Tools and Commands

- **Renew IP Configuration:**
  ```bash
  sudo dhclient -r && sudo dhclient
  ```
  Requests a new IP address from a DHCP server.

- **Show ARP Cache:**
  ```bash
  arp -a
  ```
  Displays the system's ARP table.

- **Monitor Network Traffic:**
  ```bash
  sudo tcpdump -i <interface> ip
  ```
  Captures IPv4 packets on a specific network interface.

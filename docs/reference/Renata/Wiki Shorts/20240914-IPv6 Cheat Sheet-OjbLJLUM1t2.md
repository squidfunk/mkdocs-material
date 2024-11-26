# IPv6 Cheat Sheet



## 1. Basic Concepts of IPv6

- **IPv6 (Internet Protocol Version 6):**
  The latest internet protocol designed to replace IPv4. IPv6 uses 128-bit addresses written in eight groups of four hexadecimal digits (e.g., `2001:0db8:85a3:0000:0000:8a2e:0370:7334`).

- **Why IPv6?**
  - **Larger Address Space:** Provides approximately 340 undecillion (3.4 x 10^38) unique addresses.
  - **Better Efficiency:** Improved routing and no need for NAT (Network Address Translation).
  - **Integrated Security:** IPv6 has IPsec (Internet Protocol Security) as a mandatory feature.

## 2. Important IPv6 Commands

- **Display IPv6 Address:**
  ```bash
  ip -6 a
  ```
  Shows the IPv6 addresses of network interfaces.

- **Show IPv6 Routes:**
  ```bash
  ip -6 route show
  ```
  Displays the IPv6 routing table of the system.

- **Use Ping6 Command:**
  ```bash
  ping6 <target-ipv6>
  ```
  Sends ICMPv6 packets to a target IPv6 address to test connectivity.

## 3. Types of IPv6 Addresses

- **Global Unicast:**
  Globally unique addresses that can be routed on the internet.

- **Link-Local:**
  Addresses used for communication within a local network only (`fe80::/10`).

- **Unique Local:**
  Similar to private IPv4 addresses, intended for use within local networks (`fc00::/7`).

- **Multicast:**
  Addresses used to deliver packets to multiple hosts simultaneously (`ff00::/8`).

## 4. Network Analysis and Troubleshooting

- **Use Traceroute6:**
  ```bash
  traceroute6 <target-ipv6>
  ```
  Displays the path that data packets take to a specific IPv6 address.

- **Perform DNS Lookup for IPv6:**
  ```bash
  dig AAAA <domain-name>
  ```
  Performs a DNS query to determine the IPv6 address (AAAA record) of a domain.

- **Show IPv6 Neighbor Table:**
  ```bash
  ip -6 neigh show
  ```
  Displays the IPv6 neighbor table.

## 5. Useful Tools and Commands

- **Renew IPv6 Configuration:**
  ```bash
  sudo dhclient -6 -r && sudo dhclient -6
  ```
  Requests a new IPv6 address from a DHCPv6 server.

- **Capture IPv6 Traffic with TCPDUMP:**
  ```bash
  sudo tcpdump -i <interface> ip6
  ```
  Captures IPv6 packets on a specific network interface.

- **Analyze IPv6 Headers:**
  Use Wireshark to get detailed information on IPv6 headers and packets.

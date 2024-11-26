# Local IP Addresses Cheat Sheet



## 1. Basic Concepts of Local IP Addresses

- **Local IP Addresses:**
  IP addresses used within a local network that are not directly accessible over the internet. They are commonly used in home networks, offices, and other private networks.

- **Private IP Address Ranges:**
  Private IP addresses are divided into three ranges:
  - **Class A:** `10.0.0.0` to `10.255.255.255` (Subnet Mask: `255.0.0.0`)
  - **Class B:** `172.16.0.0` to `172.31.255.255` (Subnet Mask: `255.240.0.0`)
  - **Class C:** `192.168.0.0` to `192.168.255.255` (Subnet Mask: `255.255.0.0`)

- **Why Use Local IP Addresses?**
  - Reduces the use of public IP addresses.
  - Increases security by isolating devices within a private network.
  - Allows reuse of the same address ranges in different networks.

## 2. Important Commands for Managing IP Addresses

- **Display Local IP Address:**
  ```bash
  ip a
  ```
  Shows the IP addresses of network interfaces.

- **Change Local IP Address:**
  ```bash
  sudo ip addr add <new-ip>/<subnet-mask> dev <interface>
  ```
  Adds a new IP address to a network interface.

- **Set Default Gateway for Local Network:**
  ```bash
  sudo ip route add default via <gateway-ip>
  ```
  Sets the default gateway for outgoing network traffic.

## 3. Troubleshooting and Network Analysis

- **Ping Test in Local Network:**
  ```bash
  ping <target-ip>
  ```
  Tests connectivity to a device within the local network.

- **Display ARP Table:**
  ```bash
  arp -a
  ```
  Shows the ARP table with associated IP addresses and MAC addresses.

- **Restart Network Interfaces:**
  ```bash
  sudo systemctl restart NetworkManager
  ```
  Restarts all network interfaces.

## 4. Useful Tools and Commands

- **Scan Local Devices:**
  ```bash
  nmap -sP 192.168.1.0/24
  ```
  Scans an entire local subnet for active devices.

- **Check DNS Resolution in Local Network:**
  ```bash
  nslookup <hostname>
  ```
  Performs a DNS query within the local network.

- **Monitor Local Traffic with TCPDUMP:**
  ```bash
  sudo tcpdump -i <interface> net 192.168.1.0/24
  ```
  Captures all network traffic in the local subnet.

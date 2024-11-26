# Subnetting Cheat Sheet



## 1. Basic Concepts of Subnetting

- **Subnetting:**
  The process of dividing a large network into smaller, more efficient sub-networks. Subnetting helps improve network performance and security.

- **Subnet Mask:**
  A 32-bit number used to identify the network and host portions of an IP address (e.g., `255.255.255.0`).

- **CIDR (Classless Inter-Domain Routing) Notation:**
  A method for representing IP addresses and subnet masks that is more flexible than the old class-based system (e.g., `192.168.1.0/24`).

## 2. Commonly Used Subnet Masks and CIDR

| CIDR       | Subnet Mask         | Number of Hosts  | Description                           |
|------------|---------------------|------------------|---------------------------------------|
| /8         | 255.0.0.0           | 16,777,214       | Very large network (e.g., Class A)    |
| /16        | 255.255.0.0         | 65,534           | Medium-sized network (e.g., Class B)  |
| /24        | 255.255.255.0       | 254              | Small network (e.g., Class C)         |
| /30        | 255.255.255.252     | 2                | Point-to-point connection             |

## 3. Subnet Calculation

- **Network Address:**
  The first IP address of a subnet that represents the network (e.g., `192.168.1.0` for a `/24` subnet).

- **Broadcast Address:**
  The last IP address of a subnet used to reach all devices within that subnet (e.g., `192.168.1.255` for a `/24` subnet).

- **Number of Hosts:**
  Calculated using the formula `2^(32 - Subnet Bits) - 2`. Example: For a `/24` subnet, `2^(32 - 24) - 2 = 254` hosts are possible.

## 4. Subnetting Tools and Commands

- **Display IP Address and Subnet Mask:**
  ```bash
  ip a
  ```

- **Perform Subnet Calculations (Linux):**
  Use `ipcalc`, a tool that provides IP address information and subnet details.
  ```bash
  ipcalc 192.168.1.0/24
  ```

- **Convert Subnet Masks:**
  Convert subnet masks from CIDR notation to decimal and vice versa:
  - /24 to `255.255.255.0`
  - /16 to `255.255.0.0`

## 5. Useful Tips for Subnetting

- **Plan subnets based on network size and security requirements.**
- **Use subnet masks that optimally meet your network needs.**
- **Consider future growth when creating subnet plans.**

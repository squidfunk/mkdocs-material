# Internal Technical Document: Network Configuration for Production Lines incluoding Tailscale.EN

## Author: Marc Strub, OT Manager at Renata SA


##### Introduction:
###### This document outlines the network configuration for our production lines using the 10.0.0.0/8 IP range. It details the setup involving Siemens switches, Tailscale for secure VPN connectivity over a 5G connection, and the integration with the Swatch Group OT network. The network is designed to ensure efficient, reliable, and secure communication within and between production lines, and to provide backup connectivity for critical tasks.

##### OT_Network from the SGS:
###### No changes apply, and they are not included in this version of the document. This outline provides the basis for implementing a standard for the Internal Production Network, aimed at assisting hardware vendors in standardization.

## Network Overview

### Key Components 
1. **Production Line Subnets**: Each production line is assigned a unique subnet within the 10.0.0.0/8 range, isolated from each other.
2. **Siemens 3-Layer Switches**: These switches manage internal communication within each production line, act as DHCP servers, connect to the Swatch Group network (part of the OT network), and handle traffic routing.
3. **Tailscale and 5G Connection**: Provides secure VPN connectivity for remote access using a 5G internet connection.
4. **Tailscale Subnet Routers**: These routers allow devices on the internal production network that cannot run Tailscale to be accessed over the Tailscale VPN.

### Network Segmentation..

> 1. **Production ASA1 1**: 10.0.1.0/24  res
> 2. **Production HLL2 2**: 10.0.2.0/24. res
3. **Production Line 3**: 10.0.3.0/24
4. **Production Line 4**: 10.0.4.0/24
5. **Production Line 5**: 10.0.5.0/24

### Importance of Network Segmentation 
1. **Security**: Isolates production lines, minimizing the risk of cross-contamination from security breaches.
2. **Manageability**: Easier to manage and troubleshoot specific segments without affecting the entire network.
3. **Performance**: Reduces broadcast traffic and network congestion, enhancing overall performance.
4. **Scalability**: Simplifies the addition of new production lines or devices without major network reconfiguration.

### Configuration Details

#### VLAN Naming and Segmentation:

**VLAN 100 (Tailscale VPN)**
**Name**: `VPN_Network`
**Subnet**: 10.0.100.0/24
**Gateway**: 10.0.100.254

**VLAN 200 (OT Network)**
**Name**: `OT_Network`
**Subnet**: 10.0.200.0/24
**Gateway**: 10.0.200.254

# Siemens 3-Layer Switch Setup

### Port Configuration:

1.  **Port 1**: Connects the internal production line to the Swatch Group network (VLAN 200 - OT Network).
2.  **Port 2**: Connects to the 5G router, providing internet access for Tailscale.

### VLAN Setup:

1. **VLAN 100**: `VPN_Network` (Tailscale)
2. **VLAN 200**: `OT_Network`

### Traffic Management:

**Access Control**: Implement ACLs to ensure only authorized devices and personnel can access each VLAN.
**Network Security**: Use firewalls, intrusion detection systems (IDS), and intrusion prevention systems (IPS) to protect the network.
**Asset Management**: Maintain an inventory of all devices connected to each VLAN.

### Tailscale Configuration:

**Installation**: 
Install Tailscale on all devices requiring remote access and on the subnet routers.

**IP Range**:
Configure Tailscale to use the 10.0.100.0/24 range for the VPN network, ensuring each device has a unique local IP. 3. 

**ACLs**: Define Access Control Lists to manage access between different VLANs and external connections.

## Example Scenario for Production Line 1


#### Subnet: 10.0.1.0/24 (Isolated Production Line ASA)

**Devices Example**:
- **Siemens Switch**: 10.0.1.254 (DHCP server and gateway)
- **Siemens Edge Device**: 10.0.1.1 (Local IP only, accessible via Tailscale Subnet Router)
- **Siemens SPS**: 10.0.1.2 (Local IP only, accessible via Tailscale Subnet Router)
- **Video Camera**: 10.0.1.3 (Local IP only, accessible via Tailscale Subnet Router)
- **Ubuntu Edge Device 1**: 10.0.1.4 (Tailscale installed)
- **Ubuntu Edge Device 2**: 10.0.1.5 (Tailscale installed)
- **Windows Edge Device 1**: 10.0.1.6 (Tailscale installed)
- **Windows Edge Device 2**: 10.0.1.7 (Tailscale installed)
- **Windows Server 2022**: 10.0.1.8 (Tailscale installed)

#### **Configuration**:

  - **Siemens Switch**: Manages internal communication and routes traffic to the OT network (Swatch Group) or Tailscale VLAN.
  - **Tailscale Subnet Router**: Connects local subnet to Tailscale network, enabling access for devices that cannot install Tailscale directly.
  - **5G Router**: Provides internet access for Tailscale, enabling remote access and backup connectivity. Note that the OT network will never route or have access to the 5G network.

### Diagram for Production Line


```
              +-------------------+
               |  Swatch Group     |
               |    Network        |
               +---------+---------+
                         |
                 +-------+-------+
                 | Siemens Switch |
                 | (10.0.1.254)   |
                 +-------+-------+
                         |
                         |
   +-------------+       |       +-------------+
   | Internal OT Network |       | Tailscale   |
   |       VLAN 200      |       | VLAN 100    |
   +-------------+       |       +-------------+
                         |
                 +-------+-------+
                 |       |       |
                 |       |       |
   +-------------+       |       +-------------+
   | 5G Router   |       |       | Tailscale   |
   | (Internet   |       |       | VPN         |
   | Connectivity|       |       +-------------+
   +-------------+       |
                         |
    +--------------------+
    |Production Line 1   | 
    |  (10.0.1.0/24)     | 
    |  +--------------+  |
    |  | Siemens Edge  | |
    |  | Device        | |
    |  | (10.0.1.1)    | |
    |  +--------------+  |
    |  +--------------+  |
    |  | Siemens SPS   | |
    |  | (10.0.1.2)    | |
    |  +--------------+  |
    |  +--------------+  |
    |  | Video Camera  | |
    |  | (10.0.1.3)    | |
    |  +--------------+  |
    |  +--------------+  |
    |  | Ubuntu Edge   | |
    |  | Device 1      | |
    |  | (10.0.1.4)    | |
    |  +--------------+  |
    |  +--------------+  |
    |  | Ubuntu Edge   | |
    |  | Device 2      | |
    |  | (10.0.1.5)    | |
    |  +--------------+  |
    |  +--------------+  |
    |  | Windows Edge  | |
    |  | Device 1      | |
    |  | (10.0.1.6)    | |
    |  +--------------+  |
    |  +--------------+  |
    |  | Windows Edge  | |
    |  | Device 2      | |
    |  | (10.0.1.7)    | |
    |  +--------------+  |
    |  +--------------+  |
    |  | Windows Server| |
    |  | 2022          | |
    |  | (10.0.1.8)    | |
    +--------------------+
```


### Tailscale Mesh Network for 5 Production Lines Example

**When we have multiple production lines, Tailscale can mesh these networks together, allowing devices across different lines to communicate securely.**

 ```
+-------------------------+            +-------------------------+
      |      Production Line 1  |            |      Production Line 2  |
      |       (10.0.1.0/24)     |            |       (10.0.2.0/24)     |
      |                         |            |                         |
      |  +-------+    +-------+ |            |  +-------+    +-------+ |
      |  |Device1|    |Device2| |            |  |Device1|    |Device2| |
      |  +-------+    +-------+ |            |  +-------+    +-------+ |
      |      |           |      |            |      |           |      |
      +------|-----------|------+            +------|-----------|------+
             |           |                          |           | 
             |  +--------+--------+                 |  +--------+--------+
             |  |Tailscale Router |                 |  |Tailscale Router |
             |  +--------+--------+                 |  +--------+--------+
             |           |                          |           |
             +-----------|--------------------------|-----------+
                         |                          |
                 +-------+-------+          +-------+-------+
                 |               |          |               |
      +----------+----+   +------+----------+----+   +------+----------+
      |      Prod     |   |      Tailscale       |   |      Prod       |
      |      Line 3   |   |       Network        |   |      Line 5     |
      | (10.0.3.0/24) |   |   (10.0.100.0/24)    |   | (10.0.5.0/24)   |
      |               |   |                      |   |                 |
      |  +-------+    |   |  +---------------+   |   |  +-------+      |
      |  |Device1|    |   |  |Tailscale Ctrlr|   |   |  |Device1|      |
      |  +-------+    |   |  +---------------+   |   |  +-------+      |
      |      |        |   |               |      |   |    |            |            
      +------|--------+   +---+-----------+------+   +----|------------+
             |                |           | 
             |  +--------+    |  +--------+--------+      |
             |  |Tailscale    |  |Tailscale Router |      |
             |  |Router  |    |  +----------------+       |
             |  +--------+    |                           |
             |                |                           |
             +----------------+                           |
                                                          |
                          +-------------------------+     |
                          |      Production Line 4  |     |
                          |       (10.0.4.0/24)     |     |
                          |                         |     |
                          |  +-------+    +-------+ |     |
                          |  |Device1|    |Device2| |     |
                          |  +-------+    +-------+ |     |
                          |      |           |      |     |
                          +------|-----------|------+     |
                                 |           |            |
                                 |  +--------+--------+   |
                                 |  |Tailscale Router |   |
                                 |  +----------------+    |
                                 |                        |
                                 +------------------------+
```

**This diagram illustrates how Tailscale routers at each production line connect to the central Tailscale network (10.0.100.0/24), enabling secure communication between devices across all production lines. The Tailscale controller manages the overall Tailscale configuration and access control.**

Key points:

1. **Each production line maintains its isolated subnet (10.0.x.0/24) for internal communication.**

2. **Tailscale routers at each production line connect the local subnet to the central Tailscale network.**

3. **Devices within a production line can communicate with each other directly using their local IPs.**

4. **Cross-production line communication happens securely over the Tailscale network, with each device having a unique Tailscale IP.**

5. **The Tailscale controller manages the configuration, access control, and security policies for the entire Tailscale network.**

#### This setup provides a scalable, secure, and efficient way to connect multiple production lines while maintaining the isolation and manageability of each line's local network. It enables secure remote access, cross-line communication, and centralized management through the Tailscale controller. 





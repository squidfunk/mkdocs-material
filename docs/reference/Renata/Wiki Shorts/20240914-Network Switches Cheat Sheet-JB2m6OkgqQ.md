# Network Switches Cheat Sheet



## 1. Basic Terms for Network Switches

- **Network Switch:**
  A device that connects computers and other devices in a Local Area Network (LAN) and forwards data packets between them.

- **Managed Switch:**
  A configurable switch that allows network administrators to monitor and control network traffic.

- **Unmanaged Switch:**
  A plug-and-play switch with no configuration options, used for simple networks.

- **PoE (Power over Ethernet):**
  A switch that delivers power over Ethernet cables to connected devices like IP cameras and VoIP phones.

## 2. Key Configurations for Managed Switches

- **Configure Switch IP Address:**
  Access the switch via the console interface or web interface and set a static IP address:
  ```bash
  configure terminal
  interface vlan 1
  ip address <ip-address> <subnet-mask>
  ```

- **Configure VLAN (Virtual Local Area Network):**
  Create VLANs to separate network segments:
  ```bash
  configure terminal
  vlan <vlan-id>
  name <vlan-name>
  ```

- **Set Up Port Security:**
  Define how many MAC addresses are allowed per port:
  ```bash
  switchport port-security
  switchport port-security maximum <number>
  switchport port-security violation restrict
  ```

## 3. Troubleshooting and Maintenance

- **Display Current Switch Configuration:**
  ```bash
  show running-config
  ```
  Displays the current configuration of the switch.

- **Show Active VLANs:**
  ```bash
  show vlan brief
  ```
  Displays all configured and active VLANs on the switch.

- **Check Port Status:**
  ```bash
  show interfaces status
  ```
  Shows the status of all switch ports.

## 4. Useful Tools and Commands

- **Mirror Traffic on a Port:**
  Set up port mirroring to monitor traffic:
  ```bash
  monitor session 1 source interface <interface>
  monitor session 1 destination interface <interface>
  ```

- **Display MAC Address Table:**
  ```bash
  show mac address-table
  ```
  Displays the MAC address table known to the switch.

- **Restart Switch:**
  ```bash
  reload
  ```
  Restarts the switch.

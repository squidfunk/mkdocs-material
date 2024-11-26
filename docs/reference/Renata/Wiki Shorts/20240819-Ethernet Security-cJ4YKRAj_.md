# Ethernet Security

## Security Measures

- **VLAN Segmentation:** Isolate logical networks with VLAN tags.
- **Dynamic ARP Inspection:** Inspect ARP packets to block ARP spoofing.
- **IP Source Guard:** Match IP/MAC bindings to block spoofing.
- **MACsec:** Encrypt and authenticate packets at layer-2.
- **Private VLANs:** More granular isolation within a single VLAN.
- **Storm Control:** Prevent excess traffic (broadcast, multicast, unicast floods).
- **BPDU Guard:** Prevent network topology changes by rogue devices.
- **DHCP Snooping:** Set trusted ports to prevent DHCP spoofing.
- **802.1X Authentication:** Use port-based network access control.
- **Port Security:** Set max # of MAC addresses per port to prevent MAC flooding.
- **MAC Address Filtering:** Block unauthorized traffic based on MAC addresses.

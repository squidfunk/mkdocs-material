# Zero Trust Strategies for ICS/OT

### Zero Trust Strategies for ICS/OT

- **Mapping – Asset and Device Tracking**: This involves documenting all network connectivity between devices, users, applications, and data stores across the local LAN, WAN, and remote access points. This includes identifying protocols used on the OT network, workflows, and interdependencies. It's crucial to ensure every device is accounted for. \[1]
- **Microsegmentation/Undirectional Gateways**: Microsegmentation divides your network into small groups of related devices or resources. This makes all connections between segments known and managed. \[2] Unidirectional gateways, also known as data diodes, provide a hardware-based, one-way communication method for data transfer, preventing attacks from propagating back through them. \[2]
- **Multifactor Authentication (MFA)**: MFA should be implemented wherever possible for network access to eliminate the need for simple or reusable passwords. \[2]
- **People Policy and Procedures**: Comprehensive monitoring is essential to support a Zero Trust architecture. This involves aggregating logs from as many assets as possible using a Security Information and Event Management (SIEM) solution, taking a collaborative approach to review and respond to SIEM alerts, and using this information to inform dynamic policies that determine whether to allow or deny connections. \[3]

The sources emphasize that fully adopting Zero Trust in an OT environment is a gradual process requiring careful planning and resource allocation. Complete implementation may not be possible in every environment, but applying these Zero Trust principles can significantly enhance security and asset protection. \[3]

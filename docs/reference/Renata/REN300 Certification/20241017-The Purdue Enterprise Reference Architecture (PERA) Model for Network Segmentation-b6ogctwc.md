# The Purdue Enterprise Reference Architecture (PERA) Model for Network Segmentation

## The Purdue Enterprise Reference Architecture (PERA) Model for Network Segmentation

The "Industrial Control Systems Cybersecurity Training - 300" guide advocates the Purdue Enterprise Reference Architecture (PERA) Model as a best practice for network segmentation in industrial control system (ICS) environments. The PERA model aims to enhance security by dividing the network into distinct zones based on functionality and trust levels. This structured approach helps to control information flow, limit the impact of security breaches, and enforce the principle of least privilege.

**The PERA model segments industrial control devices into hierarchical "levels" of operations within a facility.** Using levels as common terminology breaks down and determines plant-wide information flow. Zones establish domains of trust for security access and smaller LANs to shape and manage network traffic \[1].

### Zones within the PERA Model

The PERA model defines the following zones:

- **Enterprise Zone (Levels 4 and 5):** This zone encompasses the IT network, business applications, and servers (e.g., email, enterprise resource planning - ERP), as well as the intranet \[2]. It represents the highest level of the hierarchy and typically houses systems that are not directly involved in control processes.
- **ICS Demilitarized Zone (IDMZ):** The IDMZ acts as a buffer zone between the Enterprise Zone and the ICS Zone \[2]. It allows for secure data and service sharing between these zones while preventing direct traffic traversal. All network traffic originating from either the Enterprise or ICS zones terminates in the IDMZ, ensuring controlled communication and limiting potential attack vectors.
- **ICS Zone (Level 3):** This zone houses plant-wide applications, including historians, asset management systems, authentication servers, and patch management systems \[2]. It typically consists of multiple Cell/Area Zones, which represent smaller, more granular segments within the ICS environment.
- **Cell/Area Zones (Levels 1 and 2):** These zones represent specific production areas or processes within the facility. They contain devices directly involved in controlling and monitoring physical processes, such as programmable logic controllers (PLCs), remote terminal units (RTUs), and human-machine interfaces (HMIs) \[3]. These zones require the highest level of security due to their direct impact on critical operations.

### Segmentation Principles and Firewall Implementation

The sources emphasize the importance of using firewalls or routers with access control lists (ACLs) to enforce segmentation between these zones \[4]. **The firewalls are placed at the front line of defence for each of the various zones. These firewalls provide the trusted path for users and applications to communicate with and between all of the various pieces.** \[5] Two key principles guide the implementation of firewalls:

1. **Functionality:** Segmenting the network based on the general functions of systems, such as serving external customers, handling facility environmental controls, supporting IT processes, processing HR data, and managing ICS process data \[4]. This separation ensures that systems performing different functions operate within distinct security boundaries.
2. **Trust Level:** Determining the sensitivity of data, systems, and data paths to establish appropriate levels of trust \[4]. Highly sensitive systems, such as those directly controlling critical processes, require stricter access controls and more stringent segmentation.

### Firewall Rule Considerations

The sources provide guidance on implementing effective firewall rules to enhance security in ICS environments \[4, 6]:

- **Block Direct Traffic from the Control Network to the Corporate Network:** All ICS traffic should terminate at the DMZ, preventing direct communication between the control network and the corporate network.
- **Deny All Unnecessary Protocols:** Every protocol permitted between the control network and the DMZ should be explicitly denied between the DMZ and corporate networks (and vice versa). This restrictive approach limits the potential for attackers to exploit vulnerabilities in unused protocols.
- **Avoid Direct Internet Connections:** ICS networks should never be directly connected to the Internet, even if protected by a firewall. This isolation helps to prevent external attackers from directly targeting critical systems.

### Benefits of Network Segmentation using the PERA Model

Implementing the PERA model for network segmentation offers several benefits for ICS security:

- **Containment of Security Breaches:** Segmentation limits the potential impact of a security breach by containing it within a specific zone, preventing lateral movement and protecting other parts of the network.
- **Reduced Attack Surface:** By isolating critical systems and limiting communication paths, the overall attack surface is reduced, making it more difficult for attackers to find and exploit vulnerabilities.
- **Enforcement of Least Privilege:** Segmentation enables the implementation of the principle of least privilege, granting users and devices access only to the specific systems and information necessary for their roles.
- **Improved Monitoring and Detection:** Segmentation facilitates more targeted and effective network monitoring and intrusion detection. By focusing on specific zones, security analysts can more readily identify anomalies and potential threats.
- **Enhanced Resilience:** Segmenting critical systems and data helps to improve the overall resilience of the ICS environment. By isolating critical components, organisations can mitigate the impact of a security incident and maintain essential operations.

The PERA model provides a comprehensive and structured framework for segmenting networks in ICS environments. By following its guidelines and implementing robust firewall rules, organisations can significantly enhance their security posture, reduce risk, and protect critical operations from cyber threats.

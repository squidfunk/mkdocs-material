# Legacy Systems and Cybersecurity Risks in ICS

> [!IMPORTANT]
> ### **Legacy systems and outdated software** present a significant challenge in securing ICS. 

- **Known Vulnerabilities**: The sources repeatedly emphasize the importance of vulnerability management and patch management in securing ICS. This is particularly crucial for legacy systems, as outdated software often contains known vulnerabilities that attackers can exploit \[1-5]. The sources note that attackers actively seek out and exploit these vulnerabilities, making patching and mitigation essential for reducing the attack surface \[2, 6].
- **Limited Patching Options**: Patching ICS and OT systems is a complex undertaking compared to traditional IT environments. Source \[5] strongly advises having a solid bare-metal backup before attempting to patch *any* ICS/OT system. This is because patches can inadvertently break other software components or third-party applications, potentially disrupting critical operations \[7]. The decision to patch requires careful consideration of the system's criticality, the potential complications, and the availability of mitigating controls if patching is not feasible \[7].
- **System Architecture**: Older ICS were often designed with the assumption of physical isolation, relying on air gaps for security. However, the increasing need for connectivity and remote access has eroded this isolation, exposing legacy systems to a broader range of threats \[8, 9]. The sources suggest network segmentation and the use of firewalls as essential strategies for mitigating these risks \[10-13].
- **Case Studies**: The case studies provided in the sources offer concrete examples of how legacy systems and outdated software can contribute to successful cyberattacks:
- **Kemuri Water Company**: This case study demonstrates the risks associated with direct internet access to ICS and weak password hygiene \[14-17]. The attackers exploited vulnerabilities in an outdated AS400 system to gain access to the water district's control systems and manipulate critical processes \[15, 17].
- **German Nuclear Power Plant**: This example highlights the risk of malware infections spreading through removable media \[18, 19]. Although the infected systems were isolated from the internet, the use of infected USB devices allowed the malware to enter the facility \[19].
- **German Steel Mill**: The attack on the German steel mill showcased the attackers' sophisticated knowledge of industrial control systems, allowing them to exploit vulnerabilities and cause significant physical damage \[20-22]. The attackers used a spear-phishing attack to gain initial access to the corporate network and then moved laterally to the production network, highlighting the need for network segmentation and strong security controls \[21, 23].


> [!CAUTION]
> > While complete replacement of these systems might not be feasible in many cases, implementing robust security controls, prioritizing vulnerability management, and adopting a defence-in-depth approach are essential strategies for mitigating these risks and protecting critical infrastructure.

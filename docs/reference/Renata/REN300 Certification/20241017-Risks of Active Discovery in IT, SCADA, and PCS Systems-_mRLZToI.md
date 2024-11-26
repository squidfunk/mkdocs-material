# Risks of Active Discovery in IT, SCADA, and PCS Systems

> [!NOTE]
> The sources, particularly the "Industrial Control Systems Cybersecurity Training - 300" document, highlight the **inherent dangers of using active discovery techniques in IT, SCADA (Supervisory Control and Data Acquisition), and PCS (Process Control System) environments**. While active discovery is a common practice in traditional IT security assessments, its application in ICS requires careful consideration due to the potential for **disrupting critical operations** and **exposing vulnerabilities**.

> [!IMPORTANT]
> Active discovery, unlike passive discovery, involves **actively probing target systems and networks to elicit responses**. This probing typically involves sending various network packets, such as ICMP echo requests (ping), TCP SYN packets (port scanning), and UDP probes. While these techniques are valuable for mapping network topology and identifying active services, they can have adverse effects in ICS environments.

This is my breakdown of why active discovery is considered dangerous to these systems:

**1. Disruption of Critical Operations**

- **Sensitivity of ICS Devices:** SCADA and PCS systems often control sensitive industrial processes, such as power generation, water treatment, and manufacturing operations. These devices are often designed with real-time constraints and specific communication protocols.
- **Unexpected Behaviour:** Active probes can trigger unexpected behaviour in ICS devices, leading to malfunctions, process interruptions, or even physical damage. For instance, a port scan targeting a PLC (Programmable Logic Controller) could cause it to reset or enter a fault state, halting the controlled process.
- **Safety Implications:** Disruptions in ICS operations can have severe safety implications, potentially endangering human lives or causing environmental damage.

**2. Exposure of Vulnerabilities**

- **Revealing Open Ports and Services:** Active scanning techniques, such as Nmap, can identify open ports and running services on target systems. This information can be valuable for security professionals but also provides attackers with a roadmap of potential vulnerabilities to exploit.
- **Triggering Exploits:** Some active probes can inadvertently trigger vulnerabilities in ICS devices, leading to unintended consequences. For example, certain Nmap scan options have been known to crash vulnerable ICS devices.
- **Providing Attackers with Information:** The responses elicited by active probes can reveal system details, such as operating system versions, device types, and network configurations, which attackers can use to tailor their attacks.

**3. Security Tool Limitations and Risks**

- **Nmap's Potential for Disruption:** The sources specifically caution against using Nmap, a popular network scanning tool, in ICS environments. They highlight instances where various Nmap options have caused ICS devices to crash or lose configuration. The guide advises using Nmap with extreme caution in ICS, employing specific options to minimise the risk of disruption.
- **Nessus Vulnerability Scanner Risks:** The sources also mention Nessus, a vulnerability scanning tool, as potentially dangerous to ICS systems, emphasising the need for careful consideration before deployment in such environments.

**4. Legal and Compliance Implications**

- **Unauthorized Access:** Conducting active discovery without proper authorization can violate legal and regulatory requirements, potentially leading to fines, penalties, or legal action.
- **Impact on Critical Infrastructure:** Attacks on critical infrastructure, such as power grids or water treatment facilities, can have significant national security and economic consequences.

> [!CAUTION]
> Its strongly advise against conducting active discovery on ICS networks without proper authorization and a thorough understanding of the potential risks.I emphasize the need for careful planning, mitigation strategies, and close coordination with ICS engineers and operators to minimise the risk of disruption or damage.

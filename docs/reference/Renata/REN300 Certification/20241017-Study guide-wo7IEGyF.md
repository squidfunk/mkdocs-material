# Study guide

## Industrial Control Systems Cybersecurity Training - 300 Study Guide

This study guide is designed to help you prepare for the ICS Cybersecurity Training - 300 course. It includes a list of central questions to review and a glossary of key terms and ideas from the provided text.

### Central Questions to Review

**Course Overview**

- What are the main objectives of the ICS Cybersecurity Training - 300 course?
- What are the legal implications of practicing the techniques taught in this course in unauthorised environments?
- What is the role of the "300\_R00M00\_Trainee Guide\_Fillable.pdf" document in the course?
- How are CEUs awarded for this course, and what is the passing grade required?

**Industrial Control Systems Overview**

- What are the key components of an ICS, and how do they interact?
- What are the main differences between DNP3 and Modbus protocols, and what are their respective security implications?
- Describe the concepts of "rungs," "scan cycle," and "IF-THEN logic" in the context of PLC programming.
- What are some recommended practices for enhancing cybersecurity in ICS procurement and architecture design?

**Network Discovery**

- What are the differences between passive and active network discovery techniques?
- What tools and techniques are used for passive discovery, and what type of information can they gather?
- What are the potential risks associated with active discovery, particularly in ICS environments?
- What tools are commonly used for active discovery, and how do they function?

**Network Defense, Detection, and Analysis**

- How does the NIST Cybersecurity Framework guide defensive strategies and incident response?
- What is the concept of defense-in-depth, and how does it apply to ICS security?
- Explain the principle of least privilege and its importance in ICS.
- What are the key differences between GrassMarlin and Security Onion as network monitoring and intrusion detection tools?
- Describe various safeguards for critical infrastructure, such as firewalls, data diodes, patching, and application whitelisting.
- What are the steps involved in identifying a cybersecurity event and executing actions during and after an event?

**Attack Stages, Tools, and Techniques**

- Describe the three main stages of a cyberattack: reconnaissance, exploitation and pivoting, and persistence.
- What is the Metasploit Framework, and how can it be used to simulate attacks and assess vulnerabilities?
- Explain common web hacking techniques like Cross-Site Scripting (XSS) and SQL Injection (SQLi).
- What is the importance of password security in ICS, and what are some common password cracking techniques?
- What is the concept of Zero Trust, and how does it apply to ICS/OT networks?
- Explain the Zero Trust Maturity Model (ZTMM) and how it guides the implementation of Zero Trust principles.

**Additional Topics**

- What are the key differences between IT and OT systems, particularly in terms of security considerations?
- Discuss the challenges and risks associated with legacy systems and outdated software in ICS environments.
- Explain the purpose and functionality of data diodes in ICS security, comparing them to firewalls.
- Describe the five steps of the OPSEC process and its importance in protecting sensitive information.
- What is the role of network forensics in ICS incident response, and what tools are commonly used for this purpose?
- Discuss the benefits and drawbacks of signature-based vs. anomaly-based detection methods in ICS security.

### Glossary of Key Terms and Ideas

**A**

- **Active Discovery:** A network discovery technique that involves actively sending probes to target systems to elicit responses and gather information. \[19, 25]
- **Application Whitelisting:** A security measure that allows only approved applications to run on systems, preventing the execution of unauthorized software. \[42]
- **ARP (Address Resolution Protocol):** A network protocol used to map IP addresses to MAC addresses on a local network. \[3, 9]

**B**

- **Bind Connection:** A network connection where the compromised system initiates a connection to the attacker's machine, typically used when the attacker has direct access to the target. \[2]
- **Blind SQL Injection:** A type of SQL injection attack where the attacker does not receive direct feedback from the database server but infers information based on the application's behaviour. \[63]
- **Boolean-Based SQL Injection:** A type of SQL injection attack that uses boolean logic (TRUE/FALSE) to extract information from the database. \[63, 64]

**C**

- **Challenge-Response:** A security mechanism used to verify the identity of a communicating device by requiring it to respond to a challenge with a specific answer. \[13]
- **Containment:** A phase of incident response focused on limiting the spread and impact of a security incident. \[5]
- **Cross-Site Scripting (XSS):** A web security vulnerability that allows attackers to inject malicious scripts into websites to hijack user sessions, steal data, or deface websites. \[63]

**D**

- **Data Diode:** A hardware-based security device that enforces one-way data flow, preventing any communication in the reverse direction. \[1, 2]
- **Defense-in-Depth:** A layered security approach that employs multiple security controls to protect against a wide range of threats. \[2, 13, 23]
- **DNP3:** A communication protocol commonly used in the electric power industry for communication between SCADA master stations and RTUs. \[12]
- **DNS (Domain Name System):** A hierarchical naming system that translates domain names (e.g., google.com) into IP addresses. \[4]

**E**

- **Exploit:** A piece of code or a technique that takes advantage of a vulnerability to gain unauthorized access or perform malicious actions. \[4]
- **Exploitation and Pivoting:** A stage of a cyberattack where attackers leverage vulnerabilities to gain initial access to a system and then move laterally within the network to compromise additional systems. \[4, 61]

**F**

- **Firewall:** A network security device that filters network traffic based on configured rules, blocking unauthorized access and segmenting network segments. \[9, 10, 42]
- **Full SQL Injection:** A type of SQL injection attack where the attacker can retrieve extensive feedback from the database server, potentially exposing sensitive data. \[63]

**G**

- **GrassMarlin:** An open-source ICS network monitoring tool that passively analyzes network traffic to provide insights into device communication patterns and potential anomalies. \[34]

**H**

- **Historian:** A database system that collects and stores real-time data from ICS processes, often used for analysis, reporting, and troubleshooting. \[9]
- **HMI (Human Machine Interface):** A graphical interface that allows operators to monitor and control industrial processes. \[4, 8]
- **Honeypot:** A decoy system intentionally set up to attract attackers and gather information about their tactics, techniques, and procedures. \[1]

**I**

- **ICCP (Inter-Control Center Protocol):** A communication protocol used in the electric power industry for exchanging time-critical data between control centers. \[9]
- **ICS (Industrial Control Systems):** Computer-based systems used to monitor and control industrial processes. \[2]
- **Identification:** A phase of incident response focused on determining whether a security incident has occurred and gathering information about its nature and scope. \[5]
- **IDMZ (ICS Demilitarized Zone):** A buffer zone between the Enterprise Zone and the ICS Zone, used to control communication and limit attack vectors. \[2]
- **IDS (Intrusion Detection System):** A system that monitors network traffic or system activity for suspicious patterns, alerting security personnel to potential attacks. \[11, 49]

**L**

- **Ladder Logic:** A graphical programming language commonly used for PLCs, resembling a ladder diagram with rungs representing logical conditions and associated instructions. \[8]
- **Legacy System:** An outdated computer system or application that may have known vulnerabilities and pose security risks. \[5, 9]
- **Least Privilege:** A security principle that dictates users and devices should only have access to the minimum necessary resources to perform their tasks. \[16, 33]

**M**

- **Metasploit Framework:** A penetration testing framework that provides tools and resources for simulating attacks, assessing vulnerabilities, and developing exploits. \[4, 62]
- **Modbus:** A widely used communication protocol for industrial devices, known for its simplicity but lacking inherent security features. \[15]
- **MFA (Multi-Factor Authentication):** A security mechanism that requires users to provide multiple forms of authentication (e.g., password and a one-time code) to verify their identity. \[15, 42]

**N**

- **Nessus:** A commercial vulnerability scanning tool that can identify security weaknesses in systems and applications. \[28]
- **Netlab:** A virtual lab platform used for cybersecurity training and exercises. \[17, 18]
- **Network Forensics:** The process of collecting and analyzing network data to investigate security incidents and gather evidence. \[56]
- **Network Segmentation:** Dividing a network into smaller, isolated segments to contain security breaches and limit the impact of attacks. \[3, 12, 42]
- **NIST Cybersecurity Framework:** A set of guidelines and best practices for managing cybersecurity risk, including five core functions: Identify, Protect, Detect, Respond, and Recover. \[31]
- **Nmap:** A powerful open-source tool for network discovery, port scanning, and security auditing. \[26]

**O**

- **OPC (Object Linking and Embedding for Process Control):** A standard interface for data exchange between different systems in industrial automation. \[11]
- **OPSEC (Operational Security):** A process for identifying and protecting sensitive information that could be used by adversaries to gain an advantage. \[1, 39]
- **OT (Operational Technology):** Systems used to control physical processes and devices in industrial environments. \[1]

**P**

- **Passive Discovery:** A network discovery technique that involves observing and analyzing existing network traffic without actively probing or interacting with target systems. \[19]
- **Persistence:** A stage of a cyberattack where attackers establish a persistent presence on compromised systems for long-term access and control. \[61]
- **PLC (Programmable Logic Controller):** A specialized computer used to control industrial machines and processes. \[4, 8]

**R**

- **Reconnaissance:** The initial stage of a cyberattack where attackers gather information about the target network and systems. \[60]
- **Reverse Connection:** A network connection where the compromised system initiates an outbound connection to the attacker's machine, bypassing inbound firewall rules. \[2]
- **RTOS (Real-Time Operating System):** An operating system designed for applications requiring predictable and timely responses, commonly used in ICS. \[5]
- **RTU (Remote Terminal Unit):** A device used to collect data from sensors and control actuators in remote locations, often communicating with a SCADA master station. \[12]

**S**

- **SCADA (Supervisory Control and Data Acquisition):** A system used to monitor and control industrial processes over large geographical areas. \[4]
- **Security Onion:** A Linux-based distribution designed for security monitoring and intrusion detection, including tools like Snort and Squert. \[37, 38]
- **Segmentation:** The process of dividing a network into smaller, isolated segments to limit the impact of security breaches. \[42]
- **Shellcode:** A small piece of code designed to exploit a vulnerability and execute arbitrary commands on a target system. \[1]
- **SIEM (Security Information and Event Management):** A system that collects and analyzes security data from various sources to identify threats, correlate events, and generate alerts. \[24]
- **Signature-Based Detection:** A security detection method that relies on identifying known attack patterns or signatures within network traffic or system activity. \[1, 2]
- **Snort:** An open-source network intrusion detection and prevention system that analyzes network traffic for malicious patterns based on rules. \[37, 38, 49]
- **SQL Injection (SQLi):** A web security vulnerability that exploits flaws in web applications' handling of database queries, allowing attackers to bypass authentication, retrieve sensitive data, or modify data. \[63, 64]

**T**

- **tcpdump:** A command-line tool used to capture and analyze network traffic. \[24]

**W**

- **Wireshark:** A graphical network protocol analyzer used for capturing, analyzing, and troubleshooting network traffic. \[20]

**Y**

- **YARA:** A tool used to identify and classify malware by creating rules based on patterns and characteristics found in malicious files. \[55]

**Z**

- **Zero Trust:** A security model that assumes no implicit trust for any user or device, requiring continuous verification and authorization for every connection attempt. \[1, 67]
- **Zero Trust Maturity Model (ZTMM):** A framework for implementing Zero Trust principles, guiding organizations through different maturity levels of adoption. \[67]

**Remember:** This study guide is a starting point for your preparation. Be sure to refer to the provided text and engage in further research to deepen your understanding of ICS cybersecurity concepts.

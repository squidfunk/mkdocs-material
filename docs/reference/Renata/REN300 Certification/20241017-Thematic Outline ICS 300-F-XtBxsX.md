# Thematic Outline ICS 300

## Thematic Outline of "300\_R00M00\_Trainee Guide\_Fillable.pdf"

This outline organises the content of the "300\_R00M00\_Trainee Guide\_Fillable.pdf" document by topic.

**I. Course Overview**

1. **A. Course Description**Target Audience: Participants in the Industrial Control Systems (ICS) Cybersecurity Training - 300 course.
2. Purpose: Provide supplemental information and activities to enhance learning.
3. Key Features: Fill-in-the-blank activities, downloadable and printable format, optional completion.
4. **B. Course Disclaimer**Controlled Environment: Techniques taught are for a controlled environment.
5. Legal Liability: Practicing these techniques in unauthorised environments can have serious legal consequences.
6. **C. Course Objectives**Understanding ICS: Describe basic ICS, cyber risks, and process control exploits.
7. Network Discovery: Employ passive and active discovery techniques.
8. Cybersecurity Management: Develop requirements for managing risk and safeguards for critical infrastructure.
9. Incident Response: Identify, execute actions during and after a cybersecurity event.
10. Attack Methodology and Tools: Recognise attack stages, describe and use Metasploit, understand basic web hacking techniques, and discuss password security.
11. Wireless Security and Zero Trust: Discuss wireless hacking techniques, define Zero Trust, describe the ZTMM, and apply Zero Trust principles to ICS/OT networks.
12. **D. Course Requirements**Active Participation: Strongly encouraged for maximum benefit.
13. Exam Completion: Required for CEUs and in-person training (80% or higher score).
14. **E. Support and CEUs**Contact: nhs-training\@inl.gov for content or technical support.
15. CEUs: 1.4 CEUs awarded upon successful completion (no partial credit).

**II. Session 1: Industrial Control Systems Overview**

1. **A. Learning Objectives**Describe basic ICS.
2. Discuss cyber risks to ICS.
3. Discuss a process control exploit.
4. **B. ICS Components**SCADA (Supervisory Control and Data Acquisition)
5. DCS (Distributed Control Systems)
6. PLCs (Programmable Logic Controllers)
7. HMIs (Human-Machine Interfaces)
8. Field Devices (sensors, actuators, etc.)
9. **C. PLC Programming Concepts**Rungs: Lines of code in PLC programs.
10. Scan Cycle: Execution of the entire program, left to right, top to bottom.
11. IF-THEN Logic: Execution of instructions based on condition evaluation.
12. **D. Ladder Logic Exercises**PLC Fiddle Simulator: Online tool for hands-on practice.
13. Exercises: Motor control, window alarm, cruise control, speedometer simulation.
14. **E. Network Protocols**DNP3: Communication between SCADA and RTUs, security features, versions.
15. Modbus: Widely used, clear text messages, security vulnerabilities.
16. **F. Cybersecurity Recommended Practices**Cybersecurity Procurement Language: Integrate security requirements into procurement.
17. Secure Architecture Design: Follow established principles for secure network architectures.

**III. Network Discovery**

1. **A. Passive Discovery Exercises**Lab Environment: Kali Linux VM in Netlab platform.
2. Objectives: Practice passive discovery without generating traffic.
3. Tools and Techniques: Wireshark (traffic analysis), tcpdump (traffic capture).
4. **B. Active Discovery Exercises**Objectives: Practice active discovery, understand potential impact.
5. Tools and Techniques:

- a. Nmap: Host discovery, port scanning, service detection, OS fingerprinting.
- b. Nessus Vulnerability Scanner: Comprehensive vulnerability scanning, ICS plugin modules.

**IV. Network Defence, Detection, and Analysis (Session 3)**

1. **A. Outcomes**Develop requirements for managing cybersecurity risk.
2. Implement safeguards for critical infrastructure.
3. Identify and respond to cybersecurity events.
4. Recognise current trends in cybersecurity.
5. **B. Content**NIST Cybersecurity Framework: Guide for defensive strategies and incident response.
6. Cybersecurity Incidents: Real-world data across different sectors.
7. Defence-in-Depth: Layered security approach.
8. Least Privilege: Granting minimum necessary access.
9. **C. Network Monitoring and Intrusion Detection**GrassMarlin: Open-source ICS network monitoring tool for passive analysis.
10. Security Onion: Linux distribution for security monitoring and intrusion detection (includes Snort, Squert).
11. **D. Safeguards for Critical Infrastructure**IT/OT Convergence: Addressing security challenges.
12. Human Element: Cybersecurity awareness and training.
13. Removable Media: Policies to prevent malware introduction.
14. OPSEC: Maintaining operational security.
15. Secure Passwords: Strong password policies and hygiene.
16. Vendor Connections: Secure practices for vendor access.
17. Secure Authentication: Multi-factor authentication.
18. Segmentation: Isolating critical systems.
19. Firewalls: Controlling network traffic.
20. Data Diodes: Unidirectional data flow.
21. Patching: Comprehensive patching strategy for ICS/OT.
22. Application Whitelisting: Prevent unauthorized software execution.
23. **E. Firewall Exercise**Objective: Apply firewall concepts to protect an ICS network.
24. Lab Environment: Security Onion VM in Netlab.
25. Guidelines: Define desired traffic flows between network segments.
26. Example Firewall Rules: Provided to enforce security policies.
27. **F. Cybersecurity Event Identification**NIST Cybersecurity Framework: Emphasis on the "Detect Function".
28. Intrusion Detection Systems (IDS): Using tools like Snort to identify suspicious activity.
29. **G. Network Monitoring Exercises**Snort: Using Snort from the command line, replaying captured traffic, analyzing alerts.
30. Squert: Web interface for viewing and analyzing Snort alerts.
31. Sguil: Desktop application for security monitoring and alert analysis.
32. **H. Network Forensics Exercises**YARA: Identifying and classifying malware using YARA rules.
33. NetworkMiner: Extracting information from pcap files for incident investigation.

**V. Attack Stages, Tools, and Techniques**

1. **A. Attacker Background**Evolution of cyberattacks: From uncoordinated attempts to organized operations.
2. **B. Three Main Stages of an Attack**Reconnaissance: Gathering information about the target.
3. Exploitation and Pivoting: Gaining initial access and moving laterally.
4. Persistence: Establishing long-term access and control.
5. **C. Metasploit Framework**Penetration testing framework for simulating attacks and assessing vulnerabilities.
6. Features: Exploit modules, payloads, auxiliary tools.
7. **D. Web Hacking Techniques**Cross-Site Scripting (XSS): Injecting malicious scripts into websites.
8. SQL Injection (SQLi): Exploiting flaws in database query handling.
9. **E. Password Security**Importance: Crucial role in protecting ICS networks.
10. Password Hashes: Storing passwords securely.
11. Password Cracking Techniques: Guessing, dictionary attacks, exploiting hash algorithm flaws.
12. Salting: Enhancing security by adding random data to passwords before hashing.
13. **F. Zero Trust in ICS/OT**Definition: Assuming no implicit trust for any user or device.
14. Zero Trust Maturity Model (ZTMM): Framework for implementing Zero Trust principles.
15. Implementing Zero Trust in ICS/OT: Micro-segmentation, MFA, data diodes.

**VI. Appendices**

- **A. Netlab Access Instructions**
- **B. Further Reading/Resources**
- **C. Industry-based ISACs (Information Sharing and Analysis Centers)**

1. **D. Additional Exercises**Using pcaps for network discovery.
2. ICS signature writing exercises.

**VII. Incident Reporting Contact Information**

- Contact CISA (Cybersecurity and Infrastructure Security Agency) for reporting control systems cyber incidents and vulnerabilities.

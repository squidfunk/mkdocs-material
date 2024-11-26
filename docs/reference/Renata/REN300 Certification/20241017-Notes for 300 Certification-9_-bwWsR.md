# Notes for 300 Certification

## Notes for 300 Certifification

This note compiles the information found within the "300\_R00M00\_Trainee Guide\_Fillable.pdf" document.

### Industrial Control Systems Cybersecurity Training - 300

This training guide is for participants in the Industrial Control Systems (ICS) Cybersecurity Training - 300 course. It is designed to provide supplemental information and activities to enhance the learning experience.

**Key Features:**

- **Fill-in-the-Blank Activities:** The guide includes fill-in-the-blank activities for participants to complete throughout the course. These activities are intended to reinforce learning and help participants apply the concepts covered in each session \[1].
- **Downloadable and Printable:** Participants can download the guide and complete the activities electronically or print it out for physical note-taking \[1].
- **Optional Completion:** While active participation is encouraged, completion of the guide is not mandatory for the course \[1].

**Course Disclaimer:**

- **Controlled Training Environment:** The training introduces techniques for discovering and accessing network devices and monitoring communications within a controlled environment \[2].
- **Legal Liability:** Practicing these techniques in unauthorized environments can expose individuals and employers to significant legal consequences, including criminal charges \[2].

### Course Objectives:

Upon completion of this course, participants will be able to:

- **Describe basic industrial control systems** \[3]
- **Discuss cyber risks to industrial control systems** \[3]
- **Discuss a process control exploit** \[3]
- **Employ passive discovery** \[3]
- **Employ active discovery** \[3]
- **Develop the requirements to manage cybersecurity risk** \[3]
- **Develop safeguards to ensure delivery of critical infrastructure services** \[3]
- **Identify a cybersecurity event** \[3]
- **Execute activities taken during and after a cybersecurity event** \[4]
- **Recognise current trends** \[4]
- **Discuss the three main stages of an attack** \[4]
- **Describe Metasploit** \[4]
- **Use the Metasploit Framework** \[4]
- **Discuss basic web hacking techniques** \[4]
- **Describe password security** \[4]
- **Discuss basic wireless hacking techniques** \[4]
- **Define Zero Trust** \[4]
- **Discuss the Zero Trust Material Model** \[4]
- **Describe how Zero Trust principles can be applied to an ICS/OT Network** \[4]

### Course Requirements:

- **Active Participation:** Full participation is strongly encouraged to gain the most out of the course \[4].
- **Exam Completion:** To earn Continuing Education Units (CEUs) and attend the in-person training, participants must successfully complete the exam with a score of 80% or higher \[4, 5].

**Instructional and Technical Support:**

- For content-related questions or technical support, contact the instructional support staff at nhs-training\@inl.gov \[5].

**Continuing Education Units:**

- The course offers 1.4 CEUs based on 14 student-engaged contact hours \[6].
- A certificate of completion is awarded upon successful completion of the course \[6].
- CEUs are not granted for partial completion \[6].

### Session 1: Industrial Control Systems Overview

This session covers definitions, components, and risks associated with ICS.

**Learning Objectives:**

- **Describe basic industrial control systems** \[7]
- **Discuss cyber risks to industrial control systems** \[7]
- **Discuss a process control exploit** \[7]

**Content:**

- The session includes definitions and explanations of various ICS components, including:
- **Supervisory Control and Data Acquisition (SCADA) systems**
- **Distributed Control Systems (DCS)**
- **Programmable Logic Controllers (PLCs)**
- **Human-Machine Interfaces (HMIs)**
- **Field Devices (sensors, actuators, etc.)**

### Programming Concepts in PLCs:

- **Rungs:** Lines of code in a PLC program are called rungs \[8].
- **Scan Cycle:** PLC programs execute left to right and top to bottom, with each completion of the program called a scan \[8].
- **IF-THEN Logic:** Each rung operates on an "IF -> THEN" principle, executing instructions on the right side if conditions on the left side are true \[8].

### Ladder Logic Exercises:

The guide provides hands-on exercises using the online ladder logic simulator, PLC Fiddle:

- **Platform Compatibility:** PLC Fiddle is supported on Firefox, Chrome, and Safari browsers but not fully supported on Microsoft Edge \[9].
- **No Account Required:** Users do not need to create an account to use PLC Fiddle \[10].
- **Saving Work:** A unique URL is generated each time the work is saved, allowing users to return to their created ladder logic \[11].
- **Exercises:** Several ladder logic exercises are included, such as:
- Controlling a motor
- Creating a window alarm
- Building a simulated cruise control system
- Designing a simulated speedometer

### Network Protocols:

- **DNP3:**Used for communication between SCADA master stations and remote terminal units (RTUs) \[12].
- Available over TCP and UDP \[12].
- Offers secure authentication to protect against spoofing, modification, and replay attacks \[13].
- Does not provide encryption or message confidentiality \[13].
- Employs a challenge-response model for authentication \[14].
- Version 5 is the current recommended version and is not backward compatible with previous versions \[14].
- **Modbus:**A widely used protocol for communication between industrial devices \[15].
- Messages are in clear text, making them easy to decode and susceptible to interception \[15].
- Lacks built-in authentication or authorization mechanisms, making it vulnerable to unauthorized access and manipulation \[15].

### Cybersecurity Recommended Practices:

The sources highlight several recommended practices for enhancing cybersecurity in industrial control systems.

- **Cybersecurity Procurement Language:**Integrate cybersecurity requirements into procurement processes using guidance documents like "Cybersecurity Procurement Language for Energy Delivery Systems" (ESCSWG 2014) and "Cybersecurity Procurement Language for Control Systems" (DHS 2009) \[16].
- **Secure Architecture Design:**Follow principles outlined in resources like "Secure Architecture Design" from US-CERT to create secure network architectures \[16].

### Passive Discovery Exercises:

These exercises are designed to familiarise participants with passive network discovery techniques using a Linux terminal.

**Lab Environment:**

- Participants utilise a Kali Linux virtual machine within the Netlab platform \[17, 18].
- The network layout and topology diagram are provided in each lab \[17].

**Objectives:**

- Practice passive discovery techniques without generating network traffic \[19].
- Learn to gather information about network devices and services discreetly.

**Tools and Techniques:**

- **Wireshark:**Used for analysing pre-captured network traffic files (.pcap files) \[20].
- Participants learn to create display filters to isolate specific traffic types, such as web traffic (port 80) and ICS protocols like DNP3 \[20-22].
- Resources: Wireshark cheat sheets and documentation are provided for reference \[23].
- **Tcpdump:**A command-line tool for capturing network traffic in real-time \[24].
- Participants learn to capture specific traffic types using filters \[24].

### Active Discovery Exercises:

These exercises focus on active network discovery techniques.

**Objectives:**

- Practice active discovery techniques \[25].
- Understand the potential impact of active scanning on ICS networks \[25].

**Tools and Techniques:**

- **Nmap:**A powerful network scanning tool used for host discovery and port scanning \[26].
- Participants learn to use various Nmap options for different scan types, including:
- Host discovery
- Port scanning for both TCP and UDP protocols
- Service and version detection
- Operating system fingerprinting
- Nmap output options: Participants learn to save scan results in different formats like normal, XML, and grepable formats \[27].
- **Nessus Vulnerability Scanner:**A comprehensive vulnerability scanning tool with plug-in modules for various ICS protocols \[28].
- Can identify potential security weaknesses in ICS systems but requires careful use due to its potential impact \[28].
- Examples of ICS-related Nessus plug-ins are provided \[29].

### Network Defense, Detection, and Analysis (Session 3):

This session explores defensive strategies, incident response, and network monitoring techniques.

**Outcomes:**

- Participants will gain the ability to:
- Develop requirements for managing cybersecurity risk \[30].
- Implement safeguards to ensure critical infrastructure services \[30].
- Identify cybersecurity events \[30].
- Execute actions during and after a cybersecurity event \[30].
- Recognise current trends in cybersecurity \[30].

**Content:**

- **NIST Cybersecurity Framework:** The training heavily relies on the NIST Cybersecurity Framework to guide defensive strategies and incident response processes \[31].
- **Incidents:** Real-world data on cybersecurity incidents across different sectors is presented \[31].
- **Defense-in-Depth:** The concept of layered security, or "defense-in-depth," is emphasised as a key strategy for protecting ICS networks \[32].
- **Least Privilege:** The principle of granting users only the minimum level of access necessary to perform their duties is highlighted \[33].

### Network Monitoring and Intrusion Detection:

- **GrassMarlin:**An open-source ICS network monitoring tool for passive network analysis \[34].
- Provides insights into:
- Devices on the network
- Communications between devices
- Metadata extracted from communications
- Participants learn to use GrassMarlin for building asset inventories and understanding network communication patterns \[35, 36].
- **Security Onion:**A Linux-based distribution specifically designed for security monitoring and intrusion detection \[37, 38].
- Includes tools like Snort (IDS) and Squert (web interface for viewing alerts) \[37, 38].

### Safeguards for Critical Infrastructure:

- **IT/OT Convergence:** Recognising the increasing convergence of IT and OT networks and the associated security challenges \[39].
- **Human Element:** The importance of cybersecurity awareness and training for employees \[40].
- **Removable Media:** Implementing policies to manage the use of removable media to prevent malware introduction \[39].
- **OPSEC (Operational Security):** Maintaining operational security to prevent information leakage \[39].
- **Secure Passwords:** Enforcing strong password policies and promoting good password hygiene \[41].
- **Vendor Connections:** Implementing secure practices for managing vendor connections and remote access \[39].
- **Secure Authentication:** Utilising multi-factor authentication where feasible \[42].
- **Segmentation:** Segmenting networks to isolate critical systems and limit the spread of attacks \[42].
- **Firewalls:** Deploying firewalls to control network traffic and enforce security policies \[42].
- **Data Diodes:** Implementing data diodes to provide unidirectional data flow and prevent attacks from propagating back into the OT network \[42, 43].
- **Patching:** Developing a comprehensive patching strategy for ICS/OT systems, considering operational impact and downtime \[44].
- **Application Whitelisting:** Implementing application whitelisting to prevent the execution of unauthorized software \[42].

### Firewall Exercise:

This exercise requires participants to write firewall rules based on a given network scenario.

**Objectives:**

- Apply firewall concepts to protect an ICS network \[45].
- Understand how to create rules to allow or deny specific traffic types.

**Lab Environment:**

- Participants use a Security Onion virtual machine within the Netlab platform \[37].

**Guidelines:**

- Specific guidelines are provided to define the desired traffic flows between different network segments, such as corporate network, control system DMZ, and control system network \[46].

**Example Firewall Rules:**

- The guide provides examples of firewall rules that can be used to enforce the specified security policies \[47].

### Cybersecurity Event Identification:

- **NIST Cybersecurity Framework:** The training emphasizes the "Detect Function" of the NIST framework, which focuses on the timely discovery of cybersecurity events \[48].
- **Intrusion Detection Systems (IDS):**The training covers the use of intrusion detection systems like Snort to identify suspicious network activity \[49].
- Examples of Snort rules for detecting specific ICS protocols like DNP3 and Modbus are provided \[50, 51].

### Network Monitoring Exercises:

- **Snort:**Participants learn to use Snort from the command line and replay captured network traffic (pcap files) to test Snort rules \[52].
- They also learn to import pcap files for analysis and review alerts generated by Snort \[52].
- **Squert:**A web-based interface for viewing Snort alerts is introduced \[53].
- Participants learn to navigate Squert to analyse alerts and investigate suspicious traffic \[53].
- **Sguil:**A desktop application for security monitoring and alert analysis \[54].
- Participants learn to write basic queries to filter alerts and investigate security events \[54].

### Network Forensics Exercises:

- **YARA:**An open-source tool for identifying and classifying malware \[55].
- Participants learn to use YARA rules to detect malicious files within a virtual machine environment \[56, 57].
- **NetworkMiner:**A network forensic analysis tool for extracting information from pcap files \[56].
- Participants use NetworkMiner to investigate security incidents and analyse the exploit demonstration traffic \[56, 58].

### Attack Stages and Metasploit:

- **Attacker Background:** The training highlights the evolution of cyberattacks from uncoordinated attempts to highly organised and targeted operations \[59].
- **Three Main Stages of an Attack:Reconnaissance:** Gathering information about the target network and systems \[60].
- **Exploitation and Pivoting:** Exploiting vulnerabilities to gain initial access and then moving laterally within the network to compromise further systems \[61].
- **Persistence:** Establishing a persistent presence on the compromised system for long-term access and control \[61].
- **Metasploit Framework:**A powerful penetration testing framework for simulating attacks and assessing security vulnerabilities \[62].
- Provides a wide range of exploit modules, payloads, and auxiliary tools \[62].

### Web Hacking Techniques:

- **Cross-Site Scripting (XSS):**A web vulnerability that allows attackers to inject malicious scripts into websites \[63].
- Exploiting XSS can lead to:
- Session hijacking
- Data theft
- Defacement of websites
- **SQL Injection (SQLi):**A vulnerability that exploits flaws in web applications' handling of database queries \[63, 64].
- Attackers can use SQLi to:
- Bypass authentication
- Retrieve sensitive data
- Modify or delete data
- Execute commands on the database server

### Password Security:

- **Importance:** The training emphasizes the crucial role of strong password security in protecting ICS networks \[65].
- **Password Hashes:**Storing passwords as hashes instead of clear text is recommended \[65].
- Common hash algorithms include MD5, SHA1, DES, LM, and NTLM \[65].
- **Password Cracking Techniques:**Techniques such as guessing, dictionary attacks, and exploiting flaws in hash algorithms are discussed \[65].
- **Salting:**Adding random salt to passwords before hashing enhances security by making password cracking more difficult \[66].

### Zero Trust in ICS/OT:

- **Definition:** Zero Trust is a security model that assumes no implicit trust for any user or device, regardless of location or network \[67].
- **Zero Trust Maturity Model (ZTMM):**A framework for implementing Zero Trust principles \[67].
- Provides guidance on different maturity levels for Zero Trust adoption.
- **Implementing Zero Trust in ICS/OT:**The training discusses specific techniques for applying Zero Trust concepts in ICS/OT environments, including:
- Micro-segmentation
- Multi-factor authentication (MFA)
- Data diodes

### Appendices:

The guide includes several appendices with additional information and resources:

- **Netlab Access Instructions:** Provides step-by-step instructions for accessing the Netlab virtual lab environment \[68].
- **Further Reading/Resources:** Lists various resources, such as websites, books, and tools, for further learning about ICS cybersecurity \[69].
- **Industry-based Information Sharing and Analysis Centers (ISACs):** Provides information about ISACs, which are organisations that share cybersecurity information and best practices within specific industries \[70].
- **Exercises:** Includes additional exercises to reinforce the concepts covered in the training, such as:
- Using pcaps for network discovery \[71]
- ICS signature writing exercises \[72]

### Contact Information for Reporting Incidents:

The guide concludes with contact information for reporting control systems cyber incidents and vulnerabilities to CISA (Cybersecurity and Infrastructure Security Agency) \[73].

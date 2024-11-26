# Industrial Control Systems (ICS)

> [!NOTE]
> Industrial Control Systems (ICS) are used to control industrial processes and critical infrastructure, such as power grids, water treatment plants, and manufacturing facilities \[1, 2]. These systems consist of various components, including field devices, field controllers, servers, HMIs, and engineering workstations, all connected through communication channels \[3, 4]. They are increasingly relying on traditional IT technologies, leading to a merging of IT and ICS environments \[5].

**Key components of ICS:**

- **Field devices:** Sensors and actuators that measure process parameters and control the process, serving as the interface between the ICS and the physical world \[6]. They are often called input devices as they "input" data into the ICS.
- **Field controllers:** Devices responsible for collecting and processing input/output (I/O) information, sending process data to the Human Machine Interface (HMI), and executing control commands from operators \[4, 6]. They are often located near field devices. Examples include PLCs, IEDs, RTUs, and PACs.
- **Servers, HMIs, and Engineering Workstations:** These components receive data from field controllers and present it to operators in a way that depicts the ongoing process \[4]. The HMI allows operators to view the process in real-time or near real-time, enabling them to assess operational status and make necessary adjustments \[3].

**Data Flow in ICS:**

While data flow can differ among vendors, the basic process involves:

1. Field devices communicating with field controllers or other field devices \[7].
2. Field controllers consolidating data and transmitting it to HMI components \[7].
3. The configuration database storing information for setting up and configuring the ICS components, and transferring this information to the devices on the network \[8].
4. HMI stations presenting data from field controllers using displays built on the configuration database station or another engineering workstation/server \[8].
5. Historians collecting real-time data in the protected ICS zone and replicating it to secondary historians residing on separate networks, often segmented by firewalls \[9].

**Protocols used in ICS:**

Many protocols, often proprietary, are used in ICS. Some of the commonly used ones are:

- **DNP3:** Designed for the electric power industry, DNP3 is used for communication between RTUs and IEDs, as well as master to remote communications \[10, 11]. It is becoming an open architecture standard and supports functions like sending requests, accepting responses, and error recovery \[11].
- **ICCP:** Facilitates the exchange of time-critical data in the electric power industry, typically used between control centres \[12]. It has a secure version incorporating digital certificate authentication and encryption \[12].
- **Modbus:** One of the oldest and most popular ICS protocols, Modbus is an application layer protocol used for both command and control and device level communications with field controllers \[13, 14]. It has evolved to include various versions, including Modbus ASCII, Modbus RTU, Modbus Plus, and Modbus TCP \[15]. One of the drawbacks of Modbus is that it lacks inherent security features, making it vulnerable to attacks \[15, 16].
- **OPC:** An open connectivity standard based on client-server technology, OPC is widely used due to its interoperability, allowing different systems to communicate seamlessly \[17, 18]. It provides a common interface and has evolved to include more secure versions like OPC .NET 4.0 and OPC Unified Architecture (UA) \[19].

**Cybersecurity Risks to ICS:**

The risk to critical infrastructure involves threats, vulnerabilities, and consequences \[20]. Different types of threat actors pose varying levels of risk:

- **Group 1:** This group, including script kiddies and hacktivists, has lower technical capabilities and poses a lower risk, often engaging in low-consequence activities \[20, 21].
- **Group 2:** Comprising insiders and criminals, this group has moderate technical skills and can pose a moderate risk, targeting systems for personal gain or financial profit \[21].
- **Group 3:** Nation-states and organized crime groups fall under this category, possessing advanced technical capabilities and posing a high risk, as their attacks can have significant consequences \[21].

> [!WARNING]
> The merging of IT and ICS systems, driven by external connections, corporate intranets, remote access, wireless capabilities, and the adoption of IT standards, introduces new cybersecurity challenges \[5]. The convergence of IT and ICS, while beneficial, has increased security risks as ICS networks become more interconnected and exposed to threats traditionally associated with IT environments.

> [!NOTE]
> > [!IMPORTANT]
> > **Recommended Practices for ICS Cybersecurity:**
> 
> To enhance ICS cybersecurity, several recommended practices can be implemented:
> 
> - **Cybersecurity Procurement Language:** Using specific language in procurement documents to ensure vendors meet cybersecurity standards \[22].
> - **Secure Architecture Design:** Implementing secure network architecture principles, including segmentation, firewalls, intrusion detection and prevention systems, and access control \[22].
> - **Defence-in-depth:** A multi-layered security approach that includes physical security, network security, and system security to create a comprehensive defence strategy \[2, 23].
> - **Vulnerability Management:** Regularly identifying and mitigating vulnerabilities through security assessments, penetration testing, and patch management \[24-26].
> - **Incident Response:** Establishing procedures for identifying, containing, and recovering from cybersecurity incidents \[24].
> - **Zero Trust:** Adopting the Zero Trust security framework, which eliminates implicit trust and requires continuous verification of all users and devices \[27, 28].
> 
> **Process Control Exploits:**
> 
> Process control exploits highlight the vulnerabilities within ICS environments \[29]. Attackers can target specific components and manipulate processes by exploiting weaknesses in protocols, systems, or applications.
> 
> A demonstration described in the source showcases a process control exploit within a segmented network representative of an industrial setup \[29]. This network includes the Corporate Network, the Control System Demilitarized Zone (DMZ), and the Control System or SCADA Network. The demonstration aims to highlight security considerations within such an environment.
> 
> **Importance of Cybersecurity in ICS:**
> 
> As ICS become increasingly interconnected and reliant on IT technologies, the importance of cybersecurity cannot be overstated. Implementing robust security measures is crucial to protect these systems from cyber threats and ensure the safe and reliable operation of critical infrastructure.


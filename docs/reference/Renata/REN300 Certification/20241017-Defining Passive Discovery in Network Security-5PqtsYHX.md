# Defining Passive Discovery in Network Security

## Passive Discovery in Network Security

> [!NOTE]
> The "Industrial Control Systems Cybersecurity Training - 300" guide, provide a comprehensive overview of **passive discovery** as a crucial technique in network security assessments, particularly within industrial control system (ICS) environments.

**Passive discovery** involves **observing and analysing existing network traffic and system configurations without actively interacting with or probing target devices**. It's akin to using your senses to gather information about your surroundings without making any noise or drawing attention to yourself.

**Key characteristics of passive discovery, as highlighted in the sources, include:**

- **Non-Intrusive:** Passive discovery techniques avoid sending any packets or making any active connections to the target network. This minimises the risk of disrupting critical ICS operations or triggering security alerts.
- **Stealthy:** The goal is to remain undetected while gathering information about the network's structure, devices, protocols, and potential vulnerabilities.
- **Reliance on Existing Traffic and Configurations:** Passive discovery leverages information already present in the network, such as ARP tables, DNS requests, routing tables, browser history, and system logs.
- **Focus on Information Gathering:** The primary objective is to create a comprehensive map of the network and identify potential targets for further analysis or active exploitation.

### Why Perform Passive Discovery?

> [!IMPORTANT]
> There are several reasons why passive discovery is essential in ICS security assessments:
> 
> - **Minimising Risk:** In sensitive ICS environments, active scanning or probing can potentially disrupt critical processes or trigger unintended consequences. Passive discovery allows for initial reconnaissance without introducing any risks.
> - **Understanding the Network:** It helps security professionals gain a baseline understanding of the network's architecture, devices, communication patterns, and potential security weaknesses.
> - **Identifying Anomalies:** By observing normal network behaviour, passive discovery can help detect unusual activities or deviations from established patterns, potentially indicating malicious activity.
> - **Supporting Active Discovery:** The information gathered through passive discovery can guide subsequent active scanning or penetration testing efforts, focusing on specific targets or vulnerabilities.

### Examples of Passive Discovery Techniques in the Sources:

The "Industrial Control Systems Cybersecurity Training - 300" guide provides numerous examples of passive discovery techniques, including:

- **Analysing ARP Tables:** The arp command in Linux can be used to view the ARP cache, which maps IP addresses to MAC addresses, revealing recently communicated devices without generating any traffic.
- **Examining DNS Configurations:** The cat /etc/resolve.conf command can display the DNS server being used by a host, indicating potential dependencies on DNS for name resolution.
- **Reviewing Netstat Output:** The netstat command can reveal active network sessions, listening ports, and associated processes, providing insights into running services and potential attack vectors.
- **Inspecting Browser History:** Examining browser history files, cookies, and cache directories can uncover visited websites, internal servers, and potentially sensitive user credentials stored in auto-complete fields.
- **Analysing System Logs:** Reviewing system logs, such as the .bash\_history file in Linux, can reveal previously executed commands, accessed files, and attempted connections, providing clues about past activities and potential targets.

> [!IMPORTANT]
> ### Importance of Passive Discovery in the Context of the "300 Training"
> 
> The emphasize that passive discovery is a foundational skill for security professionals working with ICS environments. It allows for a safe and stealthy approach to gathering information about the network, identifying potential security risks, and informing subsequent active assessment techniques.

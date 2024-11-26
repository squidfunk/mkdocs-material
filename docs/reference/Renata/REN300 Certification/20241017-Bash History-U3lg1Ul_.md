# Bash History

## File Definition

The .bash\_history file is a hidden file found in each user's home directory in Linux systems, represented by the tilde (\~) symbol \[1]. This file logs all the commands executed by the user within the bash command shell \[2].

The Industrial Control Systems Cybersecurity Training - 300 guide highlights the importance of the .bash\_history file during passive network discovery, explaining that this file serves as a valuable source of information for:

- **Identifying additional hosts and networks accessible from the current system.** By analysing commands associated with IP and hostname information, security professionals can uncover potential access points and network connections \[1, 2].
- **Uncovering past user activity and potential security risks.** Examining the commands stored in the .bash\_history file can reveal sensitive information, such as usernames, passwords, accessed databases, and file transfers, providing insights into previous actions and potential security vulnerabilities \[3, 4].

> [!WARNING]
> For instance, the guide mentions that examining the .bash\_history file can unveil activities like the use of the insecure telnet protocol \[5], file transfers via FTP \[6], and connections to specific IP networks \[7]. These insights are valuable for understanding potential security loopholes and identifying areas for improvement.

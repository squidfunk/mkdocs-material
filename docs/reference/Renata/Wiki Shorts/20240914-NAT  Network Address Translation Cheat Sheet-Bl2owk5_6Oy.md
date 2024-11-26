# NAT  Network Address Translation Cheat Sheet



## 1. Basic Concepts of NAT

- **NAT (Network Address Translation):**
  A mechanism that allows multiple devices on a local network to connect to the internet using a single public IP address. NAT translates private IP addresses to a public IP address and vice versa.

- **Types of NAT:**
  - **Static NAT:** Maps a fixed private IP address to a fixed public IP address.
  - **Dynamic NAT:** Uses a pool of public IP addresses and assigns one to each device as needed.
  - **PAT (Port Address Translation) / NAT Overload:** A form of dynamic NAT that translates many private IP addresses to a single public IP address by using different ports.

## 2. How NAT Works

1. **Request from Internal Network:**
   A device in the internal network sends a request to the internet (e.g., to access a website).

2. **Translating IP Addresses:**
   The router or firewall performing NAT changes the private IP address of the device to a public IP address.

3. **Communication with the Target Server:**
   The request is sent with the public IP address to the target server.

4. **Response to Internal Device:**
   The target server responds to the public IP address, which the NAT router/firewall translates back to the private IP address of the device and forwards the response to the original device.

## 3. Benefits and Applications of NAT

- **Improved Security:**
  NAT hides internal IP addresses, making it more difficult for external entities to access devices within the internal network.

- **IP Address Conservation:**
  NAT allows multiple devices to use a single public IP address, which is useful when IP resources are limited.

- **Simplified Network Management:**
  Internal networks can use their own private IP addressing schemes independently of the internet.

## 4. Useful NAT Commands and Tools

- **Show Current NAT Table (Cisco Router):**
  ```bash
  show ip nat translations
  ```
  Displays the current NAT translations on a Cisco router.

- **View NAT Configuration on a Router:**
  ```bash
  show running-config | include ip nat
  ```
  Shows the NAT configuration in the running configuration of the router.

- **Set Up Port Forwarding (Linux):**
  ```bash
  sudo iptables -t nat -A PREROUTING -p tcp --dport <port> -j DNAT --to-destination <internal-ip>:<port>
  ```
  Sets up port forwarding for incoming traffic.

## 5. Considerations for NAT

- **Issues with Certain Protocols:**
  Some protocols, such as SIP (Session Initiation Protocol) or FTP, may be hindered by NAT and require additional configurations.

- **Impact on Performance:**
  Since NAT requires address translation and connection management, it may cause a slight performance degradation.

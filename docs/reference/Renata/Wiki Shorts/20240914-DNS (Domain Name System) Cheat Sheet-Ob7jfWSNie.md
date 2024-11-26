# DNS (Domain Name System) Cheat Sheet



## 1. Basic DNS Commands

- **Perform a DNS Lookup:**
  ```bash
  nslookup <domain-name>
  ```
  Performs a DNS query for the specified domain.

- **Change DNS Server:**
  ```bash
  sudo nano /etc/resolv.conf
  ```
  Opens the `resolv.conf` file for editing to change the DNS server.

- **Display DNS Records:**
  ```bash
  dig <domain-name> ANY
  ```
  Displays all DNS records for the specified domain.

## 2. Types of DNS Records

- **A Record:**
  Points a domain to an IPv4 address.

- **AAAA Record:**
  Points a domain to an IPv6 address.

- **CNAME Record:**
  Defines an alias for another domain.

- **MX Record:**
  Specifies the mail server for a domain.

- **NS Record:**
  Lists the authoritative nameservers for a domain.

- **TXT Record:**
  Contains arbitrary text information, often for verification purposes.

## 3. DNS Troubleshooting

- **Clear DNS Cache:**
  ```bash
  sudo systemd-resolve --flush-caches
  ```
  Clears the local DNS cache.

- **Debug DNS Issues:**
  ```bash
  dig +trace <domain-name>
  ```
  Traces the DNS resolution of a domain.

- **Test Connection to DNS Server:**
  ```bash
  nslookup <domain-name> <dns-server>
  ```
  Queries a domain on a specific DNS server.

## 4. Useful Tools and Commands

- **Check DNS Servers:**
  ```bash
  cat /etc/resolv.conf
  ```
  Displays the currently configured DNS servers.

- **Reverse DNS Lookup:**
  ```bash
  nslookup <ip-address>
  ```
  Performs a reverse DNS lookup for an IP address.

- **Check DNS Propagation:**
  Use online services like [WhatsMyDNS.net](https://www.whatsmydns.net/) to check DNS propagation.

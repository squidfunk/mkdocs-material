# DNS Cheat Sheet: Internet vs. Local Systems



## 1. How DNS Works on the Internet

- **DNS (Domain Name System):**
  A system that translates domain names into IP addresses to enable communication between devices on the internet.

- **DNS Query Process:**
  1. **Query Initiation:** Browser sends a request to the **recursive DNS resolver** of the ISP or a third-party provider.
  2. **Recursive Resolver:** Checks its cache for an answer; if not found, forwards the request to the **root DNS server**.
  3. **Root DNS Server:** Directs the request to the **TLD (Top-Level Domain) DNS server** (e.g., `.com`, `.org`).
  4. **TLD DNS Server:** Forwards the request to the **authoritative DNS server** of the specific domain (e.g., `example.com`).
  5. **Authoritative DNS Server:** Returns the IP address of the requested domain to the recursive resolver.
  6. **Returning the IP Address:** The resolver sends the IP address to the browser, which then connects to the website.

## 2. How DNS Works on Local Networks

- **Local DNS Functionality:**
  Similar to the internet, but often involves additional steps and local DNS servers.

- **Local DNS Query Process:**
  1. **Local DNS Cache:** The operating system first checks the local DNS cache.
  2. **Local DNS Resolver:** If the IP address is not in the cache, the request is sent to the **local DNS resolver** (often on the router or an internal server).
  3. **Internal DNS Server:** Can directly resolve DNS queries for internal names (e.g., `printer.local`) or forward them to external DNS servers.
  4. **Forwarding to External DNS Servers:** If the internal DNS server can't resolve the query, it forwards it to an external recursive DNS resolver.

## 3. Comparison: DNS on the Internet vs. Local

| Aspect                    | Internet DNS                                 | Local DNS                                   |
|---------------------------|----------------------------------------------|---------------------------------------------|
| **Scope**                 | Resolves global domain names (`example.com`). | Resolves both global and local names (`printer.local`). |
| **DNS Servers Involved**  | Root, TLD, and authoritative DNS servers.     | Local DNS resolver, internal DNS servers, external DNS servers. |
| **Cache Usage**           | Cache in recursive resolvers and browsers.    | Local DNS cache on devices, local DNS resolver caches results.   |
| **Security**              | DNSSEC for verifying DNS responses.           | Additional security measures like firewalls or private IP addressing. |
| **Resolution Time**       | May be longer due to multiple DNS servers involved. | Often faster due to caching and proximity of local DNS servers.  |

## 4. Useful Tools and Commands

- **Clear DNS Cache (Windows):**
  ```bash
  ipconfig /flushdns
  ```

- **Show DNS Cache (Linux):**
  ```bash
  systemd-resolve --statistics
  ```

- **Perform DNS Query:**
  ```bash
  nslookup <domain-name>
  ```

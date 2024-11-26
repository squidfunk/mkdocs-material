# DNS Record Types

## Common DNS Records

### A Record
- **Function:** Maps a domain name to an IPv4 address.
- **Example:** `my.com → 192.168.0.2`

### AAAA Record
- **Function:** Maps a domain name to an IPv6 address.
- **Example:** `my.com → 2001::db8::1`

### CNAME Record
- **Function:** Maps an alias name to a canonical domain name.
- **Example:** `www.my.com → my.com`

### MX Record
- **Function:** Specifies mail exchange servers for a domain.
- **Example:** `mail.my.com`

### NS Record
- **Function:** Indicates DNS servers for a domain.
- **Example:** `my.com NS ns1.my.com`

### PTR Record
- **Function:** Shows reverse DNS lookup info for an IP address.
- **Example:** `192.168.0.2 → my.com`

### TXT Record
- **Function:** Allows admins to add any text info for verification.
- **Example:** `sender policy info`

### SRV Record
- **Function:** Specifies info about available services in a domain.
- **Example:** `SIP server host/port info`

### SOA Record
- **Function:** Stores essential domain info.
- **Example:** `Primary domain server, admin email, domain serial #`

### CAA Record
- **Function:** Specifies which certificate authorities are allowed to issue certificates for a domain.

# IP Packet Header: IPv4 vs. IPv6

## IPv4
- **Header Length:** 20-byte + up to 40-byte options.
- **Fields:**
  - Ver (Version)
  - IHL (Internet Header Length)
  - Type of Service
  - Total Length
  - Identification
  - Flags
  - Fragment Offset
  - Time to Live
  - Protocol
  - Header Checksum
  - Source Address
  - Destination Address
  - Options

## IPv6
- **Header Length:** 40-byte fixed header.
- **Fields:**
  - Ver (Version)
  - Traffic Class
  - Flow Label
  - Payload Length
  - Next Header
  - Hop Limit
  - Source Address
  - Destination Address

### Field Colors
- **Green:** Fields kept in both IPv4 and IPv6.
- **Red:** Fields removed in IPv6.
- **Blue:** Fields kept but renamed in IPv6.
- **Purple:** Fields newly added in IPv6.

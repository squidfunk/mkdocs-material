# Types of Firewalls in OSI Model

## OSI Model Layers and Firewall Functions

### 1. Application Layer
- **Functions:**
  - Deep packet inspection at application-layer.
  - WAFs blocking malicious HTTP/S traffic.

### 2. Presentation Layer
- **Functions:**
  - Filtering based on data formats or encoding schemes for content security.

### 3. Session Layer
- **Functions:**
  - Block or allow session-level activities based on app-level communication session states.

### 4. Transport Layer
- **Functions:**
  - Stateful firewall by TCP connection states.
  - Five-tuple-based access control.

### 5. Network Layer
- **Functions:**
  - Packet filtering based on packet header fields.
  - Stateless IP-based access control lists (ACLs).

### 6. Data Link Layer
- **Functions:**
  - MAC filtering firewall at layer-2 switches.
  - VLAN-based traffic isolation.

### 7. Physical Layer
- **Functions:**
  - Disable unused/unauthorized switch ports.
  - Physical network segregation into zones.

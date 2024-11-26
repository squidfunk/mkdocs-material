# Linux `ip` Command Examples

## `ip addr`: Manage IP Addresses

- `ip addr show`  
  Display all IP addresses.

- `ip addr show dev eth0`  
  Show IP addresses on `eth0`.

- `ip addr add 1.1.1.1/24 dev eth0`  
  Add an IP address.

- `ip addr del 1.1.1.1/24 dev eth0`  
  Delete an IP address.

- `ip addr flush dev eth0`  
  Remove all IP addresses.

## `ip link`: Manage Network Interface

- `ip link show`  
  Display all network interfaces.

- `ip link show eth0`  
  Show details on `eth0`.

- `ip link set eth0 up/down`  
  (De)activate `eth0`.

- `ip link set eth0 mtu 9000`  
  Change MTU.

- `ip link set eth0 promisc on`  
  Enable promiscuous mode.

- `ip -s link show eth0`  
  Show traffic statistics.

- `ip link set eth0 addr 11:22:33:44:55:66`  
  Change MAC address.

## `ip route`: Manage Network Routes

- `ip route`  
  Display all routes.

- `ip route show default`  
  Display the default route.

- `ip route flush dev eth0`  
  Remove all routes for `eth0`.

- `ip route get 1.1.1.1`  
  Show a route matched with `1.1.1.1`.

- `ip route show 1.1.1.0/24 show`  
  Display route entry for `1.1.1.0/24`.

- `ip route add 1.1.1.0/24 dev eth0`  
  Add a route entry for `1.1.1.0/24` via `eth0`.

- `ip route add default via 192.168.0.1 dev eth0`  
  Add the default gateway.

- `ip route add/del 1.1.0.1/24 via 192.168.0.1`  
  Add/remove a route entry via a next hop.

- `ip route replace 1.1.1.0/24 via 192.168.1.1 dev eth0`  
  Replace a route entry for `1.1.1.0/24`.

- `ip route add 1.1.1.0/24 via 192.168.1.1 dev eth0 metric 100`  
  Specify a metric value.

## `ip neigh`: Manage ARP Neighbors

- `ip neigh show`  
  Display all ARP entries in the ARP table.

- `ip neigh show dev eth0`  
  Display ARP entries for `eth0` only.

- `ip neigh del 192.168.0.2 eth0`  
  Remove an ARP entry.

- `ip neigh add 192.168.0.2 lladdr <mac-addr> dev eth0 nud permanent`  
  Add a static ARP entry.

- `ip neigh change 192.168.0.2 lladdr <mac-addr> dev eth0`  
  Update an existing ARP entry.

- `ip neigh flush to 192.168.0.0/24`  
  Flush all ARP entries for a specific subnet.

## `ip tunnel`: Manage Tunnels

- `ip tunnel show`  
  Display all configured tunnel interfaces.

- `ip tunnel add gre1 mode gre remote 10.0.0.2 local 10.0.0.1 ttl 255`  
  Create a GRE tunnel.
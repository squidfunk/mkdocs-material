# Terminology and Concepts

## [Access control lists](https://tailscale.com/kb/1017/install#access-control-lists)

An [access control list](https://tailscale.com/kb/1018/acls) (ACL) manages system access using rules in the [tailnet policy file](https://tailscale.com/kb/1017/install#tailnet-policy-file). You can use ACLs to filter traffic and enhance security by managing who and what can use which resources.

## [ACL tags](https://tailscale.com/kb/1017/install#acl-tags)

A [tag](https://tailscale.com/kb/1068/acl-tags) lets you assign an [identity](https://tailscale.com/kb/1017/install#identity-provider) (that's separate from human users) to [devices](https://tailscale.com/kb/1017/install#device). You can use tags in your [access rules](https://tailscale.com/kb/1018/acls) to restrict access.

## [Admin console](https://tailscale.com/kb/1017/install#admin-console)

The admin console is the central location to view and manage your [Tailscale network](https://tailscale.com/kb/1017/install#tailnet). You can manage nodes on your network, users and their permissions, and settings such as key expiry. The admin console also informs you if an update to the Tailscale client is available for your device. When you make changes from the admin console, the coordination server updates the changes to your tailnet immediately.

You can access your admin console at <https://login.tailscale.com/admin/>.

## [API](https://tailscale.com/kb/1017/install#api)

API is an acronym for application programming interface. APIs define a set of rules to interact with an application or service programmatically. The [Tailscale API](https://tailscale.com/api) lets you manage your Tailscale account and tailnet.

## [CLI](https://tailscale.com/kb/1017/install#cli)

CLI is an acronym for command line interface. The Tailscale [CLI](https://tailscale.com/kb/1080/cli) includes a robust set of commands with functionality that GUI applications might not have. The Tailscale CLI is installed automatically when you install Tailscale on Linux, macOS, or Windows.

## [Coordination server](https://tailscale.com/kb/1017/install#coordination-server)

A [coordination server](https://tailscale.com/kb/1017/install#coordination-server) is a central server that maintains a connection to all machines in your [Tailscale network](https://tailscale.com/kb/1017/install#tailnet). It manages encryption keys, network changes, access policy changes, and maintains a connection to all machines in your Tailscale network. The coordination server is part of the [control plane](https://tailscale.com/blog/how-tailscale-works#the-control-plane-key-exchange-and-coordination), not the data plane. It avoids being a performance bottleneck by not relaying traffic between machines.

## [Device](https://tailscale.com/kb/1017/install#device)

A device is anything other than a user. It can be physical or virtual and sends, receives, or processes data on your Tailscale network.

## [Device key](https://tailscale.com/kb/1017/install#device-key)

A device key is a unique public and private key pair for a specific [device](https://tailscale.com/kb/1017/install#device). More than one user can use a device key, but each device can only have one device key. The combination of a specific user with a device key represents a unique node.

## [Firewall](https://tailscale.com/kb/1017/install#firewall)

A firewall limits what network traffic can pass between two points. Firewalls can be hardware-based or software-based. Tailscale includes a built-in firewall, defined by the domain's [access rules](https://tailscale.com/kb/1018/acls).

## [Identity Provider](https://tailscale.com/kb/1017/install#identity-provider)

An identity provider is a method for users to authenticate to a tailnet. Examples of [identity providers](https://tailscale.com/kb/1013/sso-providers) include Google, Okta, and Microsoft. Tailscale is not an identity provider but relies other identity providers for authentication.

## [Key expiry](https://tailscale.com/kb/1017/install#key-expiry)

Key expiry is the end of the validity period for a cryptographic key. An expired key can no longer encrypt or decrypt data, nor authenticate a device to a Tailscale network.

Using Tailscale means you never have to manage encryption keys directly. Tailscale automatically expires keys and requires them to be regenerated at regular intervals. You can disable key expiry for long-lived devices from the admin console.

## [MagicDNS](https://tailscale.com/kb/1017/install#magicdns)

[MagicDNS](https://tailscale.com/kb/1081/magicdns) automatically registers memorable hostnames for devices in your Tailscale network. It also extends and improves DNS functionality.

## [NAT traversal](https://tailscale.com/kb/1017/install#nat-traversal)

NAT is an acronym for [network address translation](https://en.wikipedia.org/wiki/Network_address_translation). [NAT traversal](https://tailscale.com/blog/how-nat-traversal-works) is a way to connect nodes across the internet through barriers such as firewalls. Most internet devices can't talk to each other because of firewalls and devices that do network address translation. NAT traversal works around these barriers, allowing [data to traverse the network](https://tailscale.com/kb/1017/install#nat-traversal).

## [Network topology](https://tailscale.com/kb/1017/install#network-topology)

A network topology is an arrangement of nodes in a network. It shows the connections between them. Examples of network topologies include star, bus, hub-and-spoke, mesh, and hybrid.

Traditional virtual private networks (VPNs) use a [hub-and-spoke topology](https://tailscale.com/blog/how-tailscale-works#hub-and-spoke-networks). Each machine communicates with another in this setup by sending all traffic through a central gateway machine. Tailscale operates as a [mesh topology](https://tailscale.com/blog/how-tailscale-works#mesh-networks) where each machine can talk directly to others using [NAT traversal](https://tailscale.com/kb/1017/install#nat-traversal).

## [Node](https://tailscale.com/kb/1017/install#node)

A node is a combination of a user and a [device](https://tailscale.com/kb/1017/install#device).

## [Peer](https://tailscale.com/kb/1017/install#peer)

A peer is another [node](https://tailscale.com/kb/1017/install#node) that your node is trying to talk to. A peer might or might not be in the same domain.

## [Relay](https://tailscale.com/kb/1017/install#relay)

A relay is an intermediary server that passes data between two or more nodes in a network. Tailscale uses a special type of globally distributed relay server called [Designated Encrypted Relay for Packets (DERP)](https://tailscale.com/kb/1232/derp-servers). DERP relay servers function as a fallback to connect nodes when NAT traversal fails.

## [SSO](https://tailscale.com/kb/1017/install#sso)

SSO is an acronym for [single sign-on](https://tailscale.com/kb/1013/sso-providers). Single sign-on lets users log in to one site using the identity of another.

## [Tailnet](https://tailscale.com/kb/1017/install#tailnet)

A tailnet is another term for a Tailscale network, which is an interconnected collection of users, machines, and resources. The network has a control plane and a data plane that work in unison to manage access and send data between nodes.

There are personal and organization tailnets. A personal tailnet is a shared domain single-user tailnet (like `gmail.com`). An organization tailnet is a custom domain tailnet (like `example.com`),

## [Tailnet policy file](https://tailscale.com/kb/1017/install#tailnet-policy-file)

The tailnet policy file stores your Tailscale network's access rules, along with other tailnet configuration items. It uses [human JSON (HuJSON)](https://github.com/tailscale/hujson) and conforms to the [Tailscale policy syntax](https://tailscale.com/kb/1337/acl-syntax).

## [Tailscalar](https://tailscale.com/kb/1017/install#tailscalar)

A Tailscalar is a Tailscale employee.

## [Tailscale IP address](https://tailscale.com/kb/1017/install#tailscale-ip-address)

A [Tailscale IP address](https://tailscale.com/kb/1017/install#tailscale-ip-address) is a [unique IP address](https://tailscale.com/kb/1033/ip-and-dns-addresses) assigned to each machine in your Tailscale network. It's always in the form `100.x.y.z` (for example, `100.101.102.103`). It stays the same even when switching between your home internet connection, cellular networks, or coffee shop Wi-Fi networks.

## [Tunnel](https://tailscale.com/kb/1017/install#tunnel)

In networking, a tunnel is an encapsulated connection between one or more points in a network. It lets users, nodes, or resources communicate securely over a public data network.

## [WireGuard](https://tailscale.com/kb/1017/install#wireguard)

[WireGuard](https://www.wireguard.com/) is the underlying cryptographic protocol that Tailscale uses.

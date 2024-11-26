# What is Tailscale for Renata SA

Tailscale is a VPN service that makes the devices and applications you own accessible anywhere in the world, securely and effortlessly. It enables encrypted point-to-point connections using the open source [WireGuard](https://www.wireguard.com/) protocol, which means only devices on your private network can communicate with each other.

## [The Benefits](https://tailscale.com/kb/1017/install#the-benefits)

Building on top of a secure network fabric, Tailscale offers speed, stability, and simplicity over traditional VPNs.

Tailscale is fast and reliable. Unlike traditional VPNs, which tunnel all network traffic through a central gateway server, Tailscale creates a peer-to-peer mesh network (called a tailnet):

![A user in Charleston connecting to a computer in New York City through a gateway in San Diego. This results in high latency because the gateway is on the opposite coast.](https://tailscale.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ftraditional-vpn.0e10936c.png\&w=3840\&q=75)

Figure 1(a). The central gateway may or may not be close to users, thus resulting in higher latency. Because traffic is centralized, it can also act as a bottleneck, slowing down connections further.

![The same user in Charleston connecting to the New York City computer directly thanks to Tailscale.](https://tailscale.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ftailscale.4c5aa989.png\&w=3840\&q=75)

Figure 1(b). With Tailscale, each device is connected to the other directly, resulting in lower latency.

The Tailscale approach avoids centralization where possible, resulting in both higher throughput and lower latency as network traffic can flow directly between machines. Additionally, decentralization improves stability and reliability by reducing single points of failure.

Tailscale is simple and effortless. The service handles complex network configuration on your behalf so that you don’t have to. Network connections between devices pierce through firewalls and routers as if they weren’t there, allowing for direct connections without the need to manually configure port forwarding. It allows for connection migration so that existing connections stay alive even when switching between different networks (for example, wired, cellular, and Wi-Fi). With [MagicDNS](https://tailscale.com/kb/1081/magicdns), you don’t have to deal with IP addresses – you can SSH or FTP into your device, transfer files between devices, or access a web server or database by just using a memorable hostname.

To learn more, take a deep-dive into [how Tailscale works](https://tailscale.com/blog/how-tailscale-works) or see [what people say about Tailscale](https://tailscale.com/customers).

## [Who’s it for?](https://tailscale.com/kb/1017/install#whos-it-for)

Developers can use Tailscale to publish experimental services to their team without the hassle of configuring firewall rules and network configurations.

Small business owners can provide their work-from-home employees with a secure way to access sensitive resources in minutes without spending thousands of dollars on traditional VPN solutions.

Enterprise leaders can reduce their security risk by drastically reducing the complexity of internal networks. By using [Access Control Lists](https://tailscale.com/kb/1018/acls) and your existing identity provider, each user has the exact level of access they need -- your accountants can access the payroll system, your support team can access the bug tracker, and your developers can access servers and databases.

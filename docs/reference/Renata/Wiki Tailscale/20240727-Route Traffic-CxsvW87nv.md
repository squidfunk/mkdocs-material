# Route Traffic

Use Tailscale routing features to control how network traffic is routed to, from, and within your Tailscale network, known as a tailnet.

## [Access non-Tailscale devices](https://tailscale.com/kb/1018/acls#access-non-tailscale-devices)

In cases where you can't install Tailscale on every device on your physical network, you can set up a *subnet router* to access these devices from your tailnet. Subnet routers respect features like [access control policies](https://tailscale.com/kb/1018/acls), which make it easy to migrate a large network to Tailscale without installing the Tailscale client on every device.

#### [Subnet routers](https://tailscale.com/kb/1019/subnets)

[Learn how to access non-Tailscale devices from your network.](https://tailscale.com/kb/1019/subnets)

## [Route all internet traffic](https://tailscale.com/kb/1018/acls#route-all-internet-traffic)

Routing internet traffic through an *exit node* is useful when accessing untrusted Wi-Fi in a cafe or using an online service (such as banking) only available in your home country from overseas.

Exit nodes route **all** your network traffic, which is often not what you want. To configure Tailscale to only route traffic to certain subnets (the more common configuration), read about [Accessing non-Tailscale devices from your network](https://tailscale.com/kb/1018/acls#non-tailscale-devices) instead.

#### [Exit nodes](https://tailscale.com/kb/1103/exit-nodes)

[Learn how to route traffic through a specific device on your tailnet.](https://tailscale.com/kb/1103/exit-nodes)

#### [Mullvad exit nodes](https://tailscale.com/kb/1258/mullvad-exit-nodes)

[Learn how to use Mullvad VPN endpoints as exit nodes for your tailnet.](https://tailscale.com/kb/1258/mullvad-exit-nodes)

## [Control access to third-party applications](https://tailscale.com/kb/1018/acls#control-access-to-third-party-applications)

*App connectors* let you control device and user access to your third-party applications without requiring any end-user configuration. You can control access to software as a service (SaaS) applications available over your Tailscale network (known as a tailnet) in the same way you would administer access for your self-hosted applications.

#### [App connectors](https://tailscale.com/kb/1281/app-connectors)

[Learn how to control device and user access to your third-party applications.](https://tailscale.com/kb/1281/app-connectors)

*Preset Apps* extend the benefits of app connectors by letting you select a preconfigured app from a Tailscale app catalog for use in your tailnet. For example, you can select GitHub or Stripe as a preset app.

#### [Preset Apps](https://tailscale.com/kb/1339/preset-apps)

[Learn how to select a preconfigured app for use in your tailnet.](https://tailscale.com/kb/1339/preset-apps)

## [Manage DNS](https://tailscale.com/kb/1018/acls#manage-dns)

You can map Tailscale IP addresses to human-readable and memorable names using the Domain Name System (DNS). For example, instead of remembering which IP address maps to an internal expense report server hosted on your tailnet, you can use DNS to map the IP address to the server's name, like "Expenses".

#### [DNS in Tailscale](https://tailscale.com/kb/1054/dns)

[Learn how to manage DNS for your tailnet.](https://tailscale.com/kb/1054/dns)

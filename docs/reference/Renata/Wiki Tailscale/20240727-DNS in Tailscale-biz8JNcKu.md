# DNS in Tailscale

Managing DNS is available for [all plans](https://tailscale.com/pricing).

Tailscale provides each device on your network with [a unique IP address](https://tailscale.com/kb/1033/ip-and-dns-addresses) that stays the same no matter where your devices are. However, IP addresses aren't very memorable, and can be unwieldy to work with. You can map Tailscale IPs to human-readable names using DNS.

You can manage DNS for your Tailscale network in at least three ways:

- [Using MagicDNS (Tailscale's automatic DNS feature)](https://tailscale.com/kb/1019/subnets#use-magicdns)
- [Using the **DNS** settings page in the admin console](https://tailscale.com/kb/1019/subnets#use-dns-settings-in-the-admin-console)
- [Using public DNS records](https://tailscale.com/kb/1019/subnets#use-a-public-dns-subdomain)

## [Use MagicDNS](https://tailscale.com/kb/1019/subnets#use-magicdns)

Tailscale can automatically assign DNS names for devices in your network when you use the **MagicDNS** feature.

[Read more about MagicDNS →](https://tailscale.com/kb/1081/magicdns)

## [Use DNS settings in the admin console](https://tailscale.com/kb/1019/subnets#use-dns-settings-in-the-admin-console)

Tailscale's [admin console](https://login.tailscale.com/admin) has a [**DNS**](https://login.tailscale.com/admin/dns) page that lets you configure settings for your network:

![A screenshot of the admin console's DNS settings](https://tailscale.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdns-settings.e3683d16.png\&w=1200\&q=75)

### [MagicDNS](https://tailscale.com/kb/1019/subnets#magicdns)

MagicDNS determines whether your network uses [MagicDNS](https://tailscale.com/kb/1081/magicdns) to automatically assign DNS names to devices in your network. MagicDNS is optional and not required to use other DNS settings.

### [Nameservers](https://tailscale.com/kb/1019/subnets#nameservers)

Nameservers are the IPv4 or IPv6 addresses of DNS servers you want your Tailscale nodes to use for lookups when connected to your network. Many companies have internal private DNS servers with the names of their private machines.

There are two types of nameservers: restricted nameservers and global nameservers.

#### [Restricted nameservers](https://tailscale.com/kb/1019/subnets#restricted-nameservers)

Restricted Nameservers (also known as **split DNS**) only apply to DNS queries matching a certain search domain. If you configure `1.1.1.1` as a nameserver for `example.com`, only DNS queries like `foo.example.com` and `bar.example.com` will be handled by `1.1.1.1`.

#### [Global nameservers](https://tailscale.com/kb/1019/subnets#global-nameservers)

Global Nameservers handle DNS queries for any domain.

You can use a public DNS nameserver or run your own. Some [public global DNS nameservers](https://en.wikipedia.org/wiki/Public_recursive_name_server) include:

- [Quad9](https://www.quad9.net/service/service-addresses-and-features): `9.9.9.9`, `149.112.112.112`, `2620:fe::fe`, and `2620:fe::9`.
- [Google](https://developers.google.com/speed/public-dns/docs/using): `8.8.8.8`, `8.8.4.4`, `2001:4860:4860::8888`, and `2001:4860:4860::8844`.
- [Cloudflare](https://www.cloudflare.com/learning/dns/what-is-1.1.1.1): `1.1.1.1`, `1.0.0.1`, `2606:4700:4700::1111`, and `2606:4700:4700::1001`.

You can also set a personalized DNS nameserver, such as [NextDNS](https://tailscale.com/kb/1218/nextdns) or [Control D](https://tailscale.com/kb/1403/control-d), as your global nameserver.

Tailscale considers each global DNS nameserver's list of addresses as one entity. For example, if you add `8.8.8.8`, the other three Google nameserver addresses are also added—you wouldn't be able to add `8.8.8.8` while excluding `8.8.4.4` or the other Google addresses. This is true whether you add the addresses manually or through the [**DNS**](https://login.tailscale.com/admin/dns) page of the admin console.

These nameservers are available when you add a nameserver using the [**DNS**](https://login.tailscale.com/admin/dns) page of the admin console.

![A screenshot of the global nameservers dropdown](https://tailscale.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fnameserver-dropdown.84508d2f.png\&w=640\&q=75)

For redundancy, use more than one global nameserver (which can be from the same provider). However, keep in mind that using multiple global nameservers can bypass explicit content restrictions if they aren't the same across all the nameservers.

By default, clients of your network use their local DNS settings for all queries. To force clients to always use nameservers you define, you can enable the **"Override local DNS"** toggle.

Unless your nameservers are public, or using [Tailscale IP addresses](https://tailscale.com/kb/1033/ip-and-dns-addresses), you probably need to configure [subnet routing](https://tailscale.com/kb/1019/subnets) to allow your nodes to reach the private DNS servers.

### [Search Domains](https://tailscale.com/kb/1019/subnets#search-domains)

Search domains provide a convenient way for users to access local network resources without having to specify the full domain path every time they connect to a resource. A user can specify a list of domain suffixes that are automatically appended to any domain name that is not a fully qualified domain name (FQDN).

Only nodes that have been updated to Tailscale v1.34 or later will use search domains.

For example, if a tailnet has `example.com` and `test.com` configured as search domains, and an end user enters the phrase `server`, Tailscale uses the phrase to search for `server.example.com` against the tailnet's configured nameservers (such as `8.8.8.8` or `1.1.1.1`). If no match is returned, it searches for `server.test.com` against the tailnet's configured nameservers.

![A screenshot of search domains](https://tailscale.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fsearch-domains.6f696d46.png\&w=1200\&q=75)

- When MagicDNS is enabled, it is always the first domain in the **Search Domains** list. This is not configurable by a user.
- You can add, reorder, modify, and remove your search domains.

## [Use a public DNS subdomain](https://tailscale.com/kb/1019/subnets#use-a-public-dns-subdomain)

If you prefer not to manage DNS settings through the admin console, you can instead publish records on your public-facing DNS server if you have one. The DNS names can be looked up (converted to a private IP address) by anyone on the internet, but because Tailscale IP addresses are only accessible to users of your network, this is relatively harmless.

Almost every organization already has a public DNS server for routing email and publishing a website, so this is easier than setting up an internal private DNS server.

Tailscale does not offer a DNS server, so you need to use one you run yourself or one offered by your cloud, domain host, or a DNS provider.

Public DNS names might take a while to propagate after you add them.

## [FAQ](https://tailscale.com/kb/1019/subnets#faq)

### [How can I define a search domain without a nameserver?](https://tailscale.com/kb/1019/subnets#how-can-i-define-a-search-domain-without-a-nameserver)

Previous versions of the DNS settings page allowed defining search domains separately from nameservers. However, due to cross-platform compatibility reasons, this is no longer possible. To define a search domain, you'll need to add at least one nameserver along with it.

If you don't have a preference, we recommend using [well-trusted public DNS nameservers](https://www.lifewire.com/free-and-public-dns-servers-2626062) alongside your search domain.

### [Can I add arbitrary DNS records to MagicDNS?](https://tailscale.com/kb/1019/subnets#can-i-add-arbitrary-dns-records-to-magicdns)

Adding arbitrary records isn't currently possible. Subscribe to or comment on [this GitHub issue for updates](https://github.com/tailscale/tailscale/issues/1543).

### [How can I test my DNS configuration?](https://tailscale.com/kb/1019/subnets#how-can-i-test-my-dns-configuration)

Traditionally, network admins use tools like `nslookup` to review DNS responses for various domains. However, on some platforms, `nslookup` doesn't use DNS information provided by the operating system, and returns incorrect results. You'll likely notice this issue when using split DNS or MagicDNS, which rely on advanced DNS features.

To test DNS settings on different platforms, Tailscale recommends the following approaches:

[macOS](https://tailscale.com/kb/1054/dns?tab=macos)[Windows](https://tailscale.com/kb/1054/dns?tab=windows)[Linux](https://tailscale.com/kb/1054/dns?tab=linux)

Use the native `dscacheutil` command:

```shell
dscacheutil -q host -a name <domain-or-magic-dns-hostname>
```

For example, searching for the IP address for a MagicDNS hostname returns:

```shell
$ dscacheutil -q host -a name my-server

name: my-server.example.ts.net
ip_address: 100.15.193.72
```

### [Does it matter how I order my DNS resolvers?](https://tailscale.com/kb/1019/subnets#does-it-matter-how-i-order-my-dns-resolvers)

The short answer: No.

The longer answer: It depends. You might expect to be able to give an operating system a list of DNS nameservers in order, and that operating system will try each of those nameservers in sequence to find a given domain.

However, as increasingly more systems and software applications require a connection to the internet to function, even small delays or rare hiccups in DNS lookup can result in a degraded user experience. In response, many modern operating systems have adopted more complicated rules for how to optimize response time when multiple DNS nameservers are available.

For example, operating systems might:

- Query nameservers in order, with small delays in between each attempt.
- Query all nameservers in parallel.
- Change the order of nameservers based on past performance.
- Change the order of nameservers based on known geographic proximity.
- Load balance queries between nameservers.

Because each operating system handles resolver ordering a little differently, Tailscale cannot guarantee that the DNS resolvers you add to the [DNS settings page](https://login.tailscale.com/admin/dns) in the admin console will be queried in the exact order that you’ve specified. Depending on your DNS settings and your operating system, Tailscale either proxies all DNS requests (in which case Tailscale queries all nameservers in parallel and uses the quickest response) or defers to the operating system.

If you need nameservers to be in a specific order because you expect one of them (such as a private DNS service you run) to have different responses than the others. In that case, you’re probably better off using the [split DNS feature](https://tailscale.com/kb/1054/dns#using-dns-settings-in-the-admin-console) or setting up conditional forwarding on your private DNS service and only using that resolver in your settings.

# Subnet Setup and Configuration

# Subnet router BGP advertisement

When using [high availability subnet routers](https://tailscale.com/kb/1115/high-availability) in network environments using [Reverse Path Filtering (RPF)](https://www.ietf.org/rfc/rfc3704.txt), it is necessary to know which subnet router is active and to be used for return traffic. `tailscaled` can work with a local [BIRD](https://bird.network.cz/?get_doc\&f=bird.html\&v=20) daemon to make the active subnet router inject a route to `100.64.0.0/10`.

There is a sample [BIRD config file](https://github.com/tailscale/tailscale/blob/main/docs/bird/sample_bird.conf) and [tailscale stanza](https://github.com/tailscale/tailscale/blob/main/docs/bird/tailscale_bird.conf) available.

To configure `tailscaled` to communicate with a local BIRD process to manage route injection:

1. Make sure to copy both config files from `https://github.com/tailscale/tailscale/tree/main/docs/bird`

2. Update the following [BGP (border gateway protocol)](https://www.ietf.org/rfc/rfc1267.txt) settings in the `sample_bird.conf` file.

   1. AS numbers
   2. Neighbor/Router address

3. Launch BIRD: `sudo bird -c /path/to/sample_bird.conf`.

4. Launch `tailscaled` with the `--bird-socket` argument.

In addition to adding arguments to `tailscaled`, you can create a `/etc/default/tailscaled` file and add a `FLAGS` variable:

```shell
FLAGS="--bird-socket=/var/run/bird.ctl"
```

[BIRD](https://bird.network.cz/?get_doc\&f=bird.html\&v=20) supports [Bidirectional Forwarding Detection](https://www.ietf.org/rfc/rfc5880.txt), and has more options for BGP than the ones defined in the sample file
* * *
# 4via6 subnet routers

In a large network, you may have existing subnets with overlapping IPv4 addresses. If there are two entirely separate virtual private clouds (VPCs) using the identical set of IPs and each has their own subnet router, Tailscale considers those two subnet routers as an [overlapping subnet router pair](https://tailscale.com/kb/1115/high-availability). For example, when a Tailscale node tries to connect to `10.0.0.5`, its traffic will direct to whichever `10.0.0.5` device happens to be behind the primary subnet router of the failover pair at that moment.

The 4via6 ("4 via 6") subnet router feature provides an unambiguous, unique IPv6 address for each overlapping subnet, so a Tailscale node's traffic is routed to the correct device.

This feature is available for [the Personal, Premium, and Enterprise plans](https://tailscale.com/pricing).

4via6 subnet routers are currently [in alpha](https://tailscale.com/kb/1167/release-stages#alpha). To try it, follow the steps below to enable it for your network using Tailscale v1.24 or later.

This feature is useful when:

- A network contains subnets with overlapping IP or CIDR ranges
- Cloud resources or SaaS apps are rolled out to a network that contains subnets with overlapping IP or CIDR ranges
- A partner or contractor network contains subnets with IP or CIDR ranges that overlap those of an organization that would like to share access

## [How it works](https://tailscale.com/kb/1019/subnets#how-it-works)

When you use this feature, your subnet router advertises an IPv6 subnet (using a Tailscale-specific address) that maps to the desired IPv4 subnet. Devices connecting to the IPv6 subnet router will have the IPv6 packets rewritten by Tailscale for IPv4, so the IPv4 addresses do not need to be changed.

The Tailscale-specific IPv6 subnet address is of the form:

`fd7a:115c:a1e0:b1a:0:XXXX:YYYY:YYYY`

where:

- `fd7a:115c:a1e0:b1a` is the 64-bit fixed prefix used for Tailscale 4via6-routed packets.
- `0:XXXX` is the 32-bit translator identifier. The site ID is the location that the IPv6 packets should arrive at before being translated to IPv4. Only the lower 16 bits may be used to specify a site ID—allowed values are 0 to 65535 inclusive. You choose which site IDs to assign to your subnet routes. For example, you might want to use `1` for your first subnet route, so the translator identifier would be `0:1`. A site ID of `0` is valid, but note the resulting IPv6 address, while allowed, would have an empty string for the translator identifier: `fd7a:115c:a1e0:b1a::YYYY:YYYY`.
- `YYYY:YYYY` is the IPv4 address represented as 16 bit hex numbers.

For example, this would be the IPv6 subnet route for a site with ID `7` and IPv4 subnet address range `10.1.1.0/24` (which is represented as `a01:100/120` in 16 bit hex):

![fd7a:115c:a1e0:b1a:7:a01:100/120 where 'fd7a:115c:a1e0:b1a' is the 64-bit fixed prefix used for Tailscale 4via6-routed packets, '7' is the site ID, and 'a01:100/120' is the IPv4 range represented in 16 bit hex](https://tailscale.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F4via6-subnets.e0799db4.png\&w=3840\&q=75)

Tailscale uses the IPv6 subnet address to route your tailnet traffic to the appropriate IPv4 destination.

The [Tailscale CLI](https://tailscale.com/kb/1080/cli) provides the `tailscale debug via` command to help you create the IPv6 subnet route.

In versions of Tailscale prior to 1.58, only 4via6 addresses with site IDs from 0-255 (inclusive) could be advertised. This restriction only applies to advertising a 4via6 subnet; versions of Tailscale prior to 1.58 will be able to access 4via6 subnets with larger site IDs even if they cannot advertise those subnets.

## [Setting up overlapping subnet routers](https://tailscale.com/kb/1019/subnets#setting-up-overlapping-subnet-routers)

### [Step 1: Generate the IPv6 subnet route](https://tailscale.com/kb/1019/subnets#step-1-generate-the-ipv6-subnet-route)

Generate the IPv6 subnet route for your IPv4 subnet by running the Tailscale CLI command `tailscale debug via` with arguments for the site ID and IPv4 route. This example generates the IPv6 subnet route for a subnet with site ID `7` and IPv4 route `10.1.1.0/24`.

```shell
tailscale debug via 7 10.1.1.0/24
```

The resulting IPv6 subnet route is:

`fd7a:115c:a1e0:b1a:0:7:a01:100/120`

### [Step 2: Advertise the IPv6 subnet route](https://tailscale.com/kb/1019/subnets#step-2-advertise-the-ipv6-subnet-route)

Follow the steps for [setting up a subnet router](https://tailscale.com/kb/1019/subnets#set-up-a-subnet-router). However, when you advertise the route, use the IPv6 route that you created in Step 1 above. For example:

```shell
# Update to use the values for your subnet
tailscale up --advertise-routes=fd7a:115c:a1e0:b1a:0:7:a01:100/120
```

Now a device on your tailnet can connect to distinct overlapping subnets with the same IPv4 addresses.

You can advertise both IPv4 and IPv6 subnet routes in the same subnet router.

Note that if you expose the same IPv6 routes (that is, the same IPv4 routes with the same site ID) from multiple subnet routers, you are using [high availability](https://tailscale.com/kb/1115/high-availability).

## [MagicDNS name for the IPv4 subnet devices](https://tailscale.com/kb/1019/subnets#magicdns-name-for-the-ipv4-subnet-devices)

If you have enabled [MagicDNS](https://tailscale.com/kb/1081/magicdns), you can use an automatically-created MagicDNS name to access devices in the overlapped subnets that you advertised. This name is of the form:

`Q-R-S-T-via-X`

where:

- `Q-R-S-T` is the IPv4 address of the device
- `X` is the site ID of the subnet router used when you created the [Tailscale-specific IPv6 address](https://tailscale.com/kb/1019/subnets#4via6-address-format)

For example, if IP address `10.1.1.16` is in the subnet you advertised via `10.1.1.0/24`with site ID of 7, you can access it from your tailnet with the name `10-1-1-16-via-7`.

## [High availability with 4via6 subnet routers](https://tailscale.com/kb/1019/subnets#high-availability-with-4via6-subnet-routers)

[High availability](https://tailscale.com/kb/1115/high-availability) is supported for 4via6 subnet routers.

Let's say your tailnet has two separate VPCs, both using `172.16.0.0/16` as the subnet route. The subnet ranges overlap, so to prevent conflicts you use the 4via6 subnet router feature to create two 4via6 subnets routers. For this example, use site ID 1 for the first VPC and site ID 2 for the second VPC. To add subnet failover for the first VPC, advertise the route from another node that is attached to the first VPC as a 4via6 subnet router with ID 1 and the same `172.16.0.0/16` route. Tailscale will treat the two subnet routers with ID 1 as a subnet failover pair and pick one of them to be active. Similarly, you could create a subnet failover for the second VPC, by advertising an additional 4via6 subnet router with ID 2 and the `172.16.0.0/16` route on a node that is attached to the second VPC.

## [Limitations](https://tailscale.com/kb/1019/subnets#limitations)

- A 4via6 subnet router requires Tailscale v1.24 or later. Other Tailscale clients that use the 4via6 subnet router to reach the remote devices can use older releases.
- Currently, only the IPv6 subnet address is shown in the admin console, not the IPv4 address that it maps to.
- A tailnet can have a maximum of 65,536 site IDs. For each site ID, you can have any number of IPv4 CIDRs mapped.
* * *
# Site-to-site networking

You can use site-to-site layer 3 (L3) networking to securely connect two or more subnets on your tailnet.

To create a site-to-site connection between two or more subnets:

1. Select a device within each subnet to act as the [subnet router](https://tailscale.com/kb/1019/subnets).

2. Configure the subnet routers:

   1. Install the Tailscale client.
   2. Enable IP forwarding.
   3. Start the Tailscale client.  
      *With the appropriate configuration options, such as disabling SNAT*

3. Approve the subnet routers.

4. Configure the other devices on each subnet.

5. Test the connection between the subnets.

Site-to-site networking only works if:

- The subnets don’t have overlapping CIDR ranges.
- Each subnet has a Linux subnet router.
- The subnets don’t use [4via6 subnet routing](https://tailscale.com/kb/1201/4via6-subnets).

## [Example scenario](https://tailscale.com/kb/1019/subnets#example-scenario)

The following example walks you through connecting two subnets within a tailnet: subnet A and subnet B. Both subnets use subnet routers running Ubuntu 22.04 x64.

| Subnet                   | Subnet A       | Subnet B          |
| ------------------------ | -------------- | ----------------- |
| Subnet CIDR range        | `192.0.2.0/24` | `198.51.100.0/24` |
| Subnet router IP address | `192.0.2.2`    | `198.51.100.2`    |

### [Configure the subnet routers](https://tailscale.com/kb/1019/subnets#configure-the-subnet-routers)

The first step in connecting subnets within a tailnet is to configure a subnet router within each subnet. This example connects two subnets and requires two devices to serve as subnet routers (one in each subnet). Subnet A will use the device at `192.0.2.2`, and subnet B will use the device at `198.51.100.2`.

Set up both Linux subnet routers (`192.0.2.2` and `198.51.100.2`) with the following steps:

1. Install the Tailscale client.

   You can install the Tailscale client on Linux using the following `curl` command:

   ```shell
   curl -sSL https://tailscale.com/install.sh | sh
   ```

2. Enable IP forwarding.

   You can enable IP forwarding on Linux for IPv4 and IPv6 by updating the `/etc/sysctl.conf` file:

   ```shell
   echo 'net.ipv4.ip_forward = 1' | sudo tee -a /etc/sysctl.conf
   echo 'net.ipv6.conf.all.forwarding = 1' | sudo tee -a /etc/sysctl.conf
   sudo sysctl -p /etc/sysctl.conf
   ```

3. Start the Tailscale client using the [`tailscale up`](https://tailscale.com/kb/1241/tailscale-up) command with flags to advertise the correct subnet routes, disable SNAT, and enable accepting routes.

   Make sure to replace `<CIDR>` with the correct subnet routes. For the `192.0.2.2`subnet router, use `192.0.2.0/24`. For the `198.51.100.2` subnet router, use `198.51.100.0/24`.

   ```shell
   tailscale up --advertise-routes=<CIDR> --snat-subnet-routes=false --accept-routes
   ```

   - The `--advertise-routes` flag lists which addresses should be exposed to the Tailscale network. Who/what can access those addresses is controlled by Tailscale ACLs in the admin console.
   - The `--snat-subnet-routes=false` flag disables source NAT. By default, a device behind a subnet router sees traffic as originating from the subnet router. This simplifies routing but prevents traversing multiple networks. By disabling source NAT, the end device sees the IP address of the originating device as the source, which might be a Tailscale IP address or an address behind another subnet router.
   - The `--accept-routes` flag accepts the advertised routes of all other subnet routers on the tailnet.

4. Configure `iptables` on each subnet router to clamp the maximum segment size (MSS) to the maximum transmission unit (MTU).

   ```shell
   iptables -t mangle -A FORWARD -o tailscale0 -p tcp -m tcp \
   --tcp-flags SYN,RST SYN -j TCPMSS --clamp-mss-to-pmtu
   ```

### [Approve the subnet routes](https://tailscale.com/kb/1019/subnets#approve-the-subnet-routes)

After configuring the subnet routers within each subnet, you must enable subnet routes from the Tailscale admin console.

You don’t need to approve the subnet routers if you use [`autoApprovers`](https://tailscale.com/kb/1337/acl-syntax#autoapprovers).

1. Open the [**Machines**](https://login.tailscale.com/admin/machines) page of the admin console.

2. Locate the subnet router devices by locating the **Subnets** badge or using the [`property:subnet`](https://login.tailscale.com/admin/machines?q=property%3Asubnet) filter. In this example, the subnet routers are `192.0.2.2` and `198.51.100.2`.

3. For each subnet router:

   1. Select the ![ellipsis icon](https://tailscale.com/files/images/icons/fa-ellipsis-h.svg) menu > **Edit route settings**.
   2. Approve the device.

You might prefer to [disable key expiry](https://tailscale.com/kb/1028/key-expiry) on your subnet nodes to avoid having to periodically reauthenticate. If you are using [tags](https://tailscale.com/kb/1068/acl-tags), [key expiry is disabled by default](https://tailscale.com/kb/1068/acl-tags#key-expiry).

### [Configure subnet devices](https://tailscale.com/kb/1019/subnets#configure-subnet-devices)

You don't need to configure the subnet devices if the default gateway is also the Tailnet subnet router.

After enabling subnet routes, configure the devices within each subnet. These devices don’t need to run Tailscale. However, you do need to add a static route to each device to tell it to use the designated subnet router.

1. For each device in the `192.0.2.0/24` subnet (except the subnet router), run the following commands:

   ```shell
   ip route add 100.64.0.0/10 via 192.0.2.2
   ip route add 198.51.100.0/24 via 192.0.2.2
   ```

2. For each device in the `198.51.100.0/24` subnet (except the subnet router), run the following commands:

   ```shell
   ip route add 100.64.0.0/10 via 198.51.100.2
   ip route add 192.0.2.0/24 via 198.51.100.2
   ```

The `ip route` commands do not persist after rebooting—you must run them again if you reboot the device. Depending on your setup, you can make the route settings persistent by adding them to your network manager or `netplan` configuration. Alternatively, you can manage route settings with a DHCP server on your network.

### [Test the connection between the subnets](https://tailscale.com/kb/1019/subnets#test-the-connection-between-the-subnets)

Now a device in subnet A can connect to a device in subnet B (and vice versa) without either needing to install the Tailscale client. You can test the connection by running the `ping` command from a subnet A device to a subnet B device.

For example, ping `198.51.100.3` from `198.0.2.3`:

```shell
ping 198.51.100.3

PING 198.51.100.3 (198.51.100.3) 56(84) bytes of data.
64 bytes from 198.51.100.3: icmp_seq=1 ttl=64 time=9.34 ms
64 bytes from 198.51.100.3: icmp_seq=2 ttl=64 time=3.85 ms
```
* * *
# Exit nodes (route all traffic)

Exit nodes are available for [all plans](https://tailscale.com/pricing).

Exit nodes capture all your network traffic. To configure Tailscale to only route specific subnets (the more common configuration), refer to [subnet routers](https://tailscale.com/kb/1019/subnets) instead.

The exit node feature lets you route traffic through a specific device on your Tailscale network (known as a tailnet). The device routing your traffic is called an **exit node**. There are many ways to use exit nodes in a tailnet. For example, you can:

- Route all non-Tailscale traffic through an exit node.
- Use [suggested exit nodes](https://tailscale.com/kb/1392/auto-exit-nodes) to [automatically use the best exit node](https://tailscale.com/kb/1392/auto-exit-nodes) based on client information, such as location and latency.
- [Force devices to use an exit node](https://tailscale.com/kb/1413/mandatory-exit-nodes) based on system policies, which you can deploy using mobile device management (MDM) solutions.

**Routing app traffic?**

Consider using an [app connector](https://tailscale.com/kb/1281/app-connectors) to route traffic for a specific application. App connectors let you control device and user access to your third-party applications, without requiring any end-user configuration.

## [How exit nodes work](https://tailscale.com/kb/1019/subnets#how-exit-nodes-work)

By default, Tailscale acts as an overlay network: it only routes traffic between devices running Tailscale, but doesn't touch your public internet traffic, such as when you visit Google or Twitter. The overlay network configuration is ideal for most people who need secure communication between sensitive devices (such as company servers or home computers), but don't need extra layers of encryption or latency for their public internet connection.

![A diagram showing four devices in a Tailscale overlay network. A laptop is making a direct connection to google.com.](https://tailscale.com/_next/static/media/exit-node-01.0573451b.svg)

However, there might be times when you want Tailscale to route your public internet traffic. For example, you might want to route all your public internet traffic if:

- You're in a coffee shop with untrusted Wi-Fi.
- You're traveling overseas and need access to an online service (such as banking) only available in your home country.

![A diagram showing four devices in a Tailscale overlay network where one is highlighted in blue and designated as an exit node. The laptop makes its connection to google.com through the Desktop device designated as an exit node.](https://tailscale.com/_next/static/media/exit-node-02.0e4f672e.svg)

You can route all your public internet traffic by setting a device on your network as an exit node. When you route all traffic through an exit node, you're effectively using [default routes](https://en.wikipedia.org/wiki/Default_route) (`0.0.0.0/0`, `::/0`), similar to how you would if you were using a typical VPN.

## [Configure an exit node](https://tailscale.com/kb/1019/subnets#configure-an-exit-node)

Use the following steps to configure an exit node:

1. [Install the Tailscale client](https://tailscale.com/kb/1019/subnets#install-the-tailscale-client).
2. [Advertise the device as an exit node](https://tailscale.com/kb/1019/subnets#advertise-a-device-as-an-exit-node).
3. [Allow the exit node](https://tailscale.com/kb/1019/subnets#allow-the-exit-node-from-the-admin-console).
4. [Use the exit node](https://tailscale.com/kb/1019/subnets#use-the-exit-node).

You can also [get a suggested exit node](https://tailscale.com/kb/1392/auto-exit-nodes#use-a-suggested-exit-node).

### [Prerequisites](https://tailscale.com/kb/1019/subnets#prerequisites)

Before you can configure an exit node, you must:

- [Set up a Tailscale network, called a tailnet](https://tailscale.com/kb/1017/install).
- Ensure both the exit node and devices using the exit node run **Tailscale v1.20 or later**.
- Ensure the exit node is a Linux, macOS, Windows, or Android device.
- Ensure you allow (intended) users to use the exit node.

If your tailnet is using the [default ACL](https://tailscale.com/kb/1192/acl-samples#allow-all-default-acl), users of your tailnet already have access to any exit nodes that you configure. If you have modified your ACL, ensure you create an [access rule](https://tailscale.com/kb/1337/acl-syntax#acls)that includes exit node uses in the `autogroup:internet`. They do not need access to the exit node itself to use the exit node.

The following example configuration to add to your ACL that allows all users access to the internet through an exit node:

```json
// All users can use exit nodes
// If you are using the default ACL, this rule is not needed because the
// default ACL allows all users access to the internet through an exit node
{ "action": "accept", "src": ["autogroup:member"], "dst": ["autogroup:internet:*"] },
```

For security purposes, you must opt-in to exit node functionality. For example:

- Every device must explicitly opt-in to using an exit node.
- A device must advertise that it's willing to be an exit node.
- An [Owner, Admin, or Network admin](https://tailscale.com/kb/1138/user-roles) must allow a device to be an exit node for the network.

#### [Install the Tailscale client](https://tailscale.com/kb/1019/subnets#install-the-tailscale-client)

[Android](https://tailscale.com/kb/1103/exit-nodes?tab=android)[Linux](https://tailscale.com/kb/1103/exit-nodes?tab=linux)[macOS](https://tailscale.com/kb/1103/exit-nodes?tab=macos)[tvOS](https://tailscale.com/kb/1103/exit-nodes?tab=tvos)[Windows](https://tailscale.com/kb/1103/exit-nodes?tab=windows)

[Download and install Tailscale](https://tailscale.com/download/android) onto the exit node machine.

### [Advertise a device as an exit node](https://tailscale.com/kb/1019/subnets#advertise-a-device-as-an-exit-node)

[Android](https://tailscale.com/kb/1103/exit-nodes?tab=android)[Linux](https://tailscale.com/kb/1103/exit-nodes?tab=linux)[macOS](https://tailscale.com/kb/1103/exit-nodes?tab=macos)[tvOS](https://tailscale.com/kb/1103/exit-nodes?tab=tvos)[Windows](https://tailscale.com/kb/1103/exit-nodes?tab=windows)

Open the Tailscale client on the Android device, go to **Exit Node** and select **Run as exit node**.

If the device is authenticated by a user who can approve exit nodes in [`autoApprovers`](https://tailscale.com/kb/1337/acl-syntax#autoapprovers), the exit node will automatically be approved.

### [Allow the exit node from the admin console](https://tailscale.com/kb/1019/subnets#allow-the-exit-node-from-the-admin-console)

This step is not required if you use `autoApprovers`.

You must be an [Admin](https://tailscale.com/kb/1138/user-roles) to allow a device to be an exit node.

1. Open the [**Machines**](https://login.tailscale.com/admin/machines) page of the admin console and locate the exit node.
2. Locate the **Exit Node** badge in the machines list or use the [`property:exit-node`filter](https://login.tailscale.com/admin/machines?q=property%3Aexit-node) to list all devices advertised as exit nodes.

From the ![ellipsis icon](https://tailscale.com/files/images/icons/fa-ellipsis-h.svg) menu of the exit node, open the **Edit route settings** panel, and enable **Use as exit node**.

### [Use the exit node](https://tailscale.com/kb/1019/subnets#use-the-exit-node)

Each device must enable the exit node separately. The instructions for enabling an exit node vary depending on the device's operating system.

[Android](https://tailscale.com/kb/1103/exit-nodes?tab=android)[iOS](https://tailscale.com/kb/1103/exit-nodes?tab=ios)[Linux](https://tailscale.com/kb/1103/exit-nodes?tab=linux)[macOS](https://tailscale.com/kb/1103/exit-nodes?tab=macos)[tvOS](https://tailscale.com/kb/1103/exit-nodes?tab=tvos)[Windows](https://tailscale.com/kb/1103/exit-nodes?tab=windows)

1. Open the Tailscale app on the Android device and go to the **Exit Node** section.
2. Select the exit node that you want to use. If you want to allow direct access to your local network when routing traffic through an exit node, toggle **Allow LAN access** on.
3. On the app home screen, confirm that the selected device displays in the **Exit Node** section. When an exit node is being used for the device, the section will turn blue.

To stop a device from using an exit node, go to the **Exit Node** section and select **None**.

The option to use an exit node only displays if there's an available exit node in your tailnet.

You can verify that your traffic is routed by another device by checking your public IP address [using online tools](https://www.whatismyip.com/). You should see the exit node's public IP rather than your local device's IP.

You can turn off routing through an exit node by selecting **None** from the **Exit Node**drop-down.

## [Destination logging in network flow logs](https://tailscale.com/kb/1019/subnets#destination-logging-in-network-flow-logs)

Destination Logging is available for [Enterprise](https://tailscale.com/pricing).

Tailnets on the Enterprise plan can enable destination logging for exit nodes.

By default, destination logging is disabled for traffic flowing through an exit node across all tailnets, for privacy, abuse, and security purposes. Tailnets on the Enterprise plan can, however, enable destination logging across the tailnet for increased visibility of traffic across the tailnet and forensic analysis during security incidents. Destinations are logged in [Network flow logs](https://tailscale.com/kb/1219/network-flow-logs).

You must enable [Log Streaming](https://tailscale.com/kb/1255/log-streaming) before using exit node destination logging.

To enable destination logging for exit nodes:

1. Navigate to the [**Logs**](https://login.tailscale.com/admin/logs/network) page in the admin console.
2. Select **Network flow logs**.
3. Select the **Logging Actions** menu, then select **Enable exit node destination logging**.

To disable destination logging for exit nodes:

1. Navigate to the [**Logs**](https://login.tailscale.com/admin/logs/network) page in the admin console.
2. Select **Network flow logs**.
3. Select the **Logging Actions** menu, then select **Disable exit node destination logging**.

## [Caveats](https://tailscale.com/kb/1019/subnets#caveats)

[Android](https://tailscale.com/kb/1103/exit-nodes?tab=android)[macOS](https://tailscale.com/kb/1103/exit-nodes?tab=macos)[tvOS](https://tailscale.com/kb/1103/exit-nodes?tab=tvos)[Windows](https://tailscale.com/kb/1103/exit-nodes?tab=windows)

Tailscale support for running exit nodes on Android is still undergoing optimization. Make sure you plug the device into a power source if you plan to use it as an exit node for an extended time. Android exit nodes are limited to userspace routing.

Running an exit node on an Android device is not performant—it may be too slow for most cases.

### [Userspace](https://tailscale.com/kb/1019/subnets#userspace)

On Android, the exit node is implemented in userspace, which differs from the default Linux exit node implementation and is not as mature or fully optimized. For details, refer to [Kernel vs. netstack subnet routing and exit nodes](https://tailscale.com/kb/1177/kernel-vs-userspace-routers).
* * *

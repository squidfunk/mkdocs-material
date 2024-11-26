# Subnet routers and traffic relay nodes

Tailscale works best when you install the Tailscale client on every client, server, and virtual machine (VM) in your organization. This enforces end-to-end traffic encryption without additional configuration to move machines between physical locations.

In some situations, you can't or don't want to install Tailscale on each device:

- With embedded devices, like printers, which don't run external software.
- When connecting large quantities of devices, [like an entire AWS VPC](https://tailscale.com/kb/1021/install-aws).
- When incrementally deploying Tailscale (for example, on legacy networks).

In these cases, you can set up a subnet router (previously called a relay node) to access these devices from Tailscale. **Subnet routers act as a gateway**, relaying traffic from your Tailscale network to your physical subnet. Subnet routers respect features like [access control policies](https://tailscale.com/kb/1018/acls), which make it easy to migrate a large network to Tailscale without installing the Tailscale client on every device.

Devices behind a subnet router do not count toward your [pricing plan's device limit](https://tailscale.com/pricing). However, installing Tailscale directly on devices wherever possible offers better performance, security, and a zero-configuration setup.

This video explains some of the features of subnet routers and how to use them.

[What are subnet routers?](https://www.youtube.com/embed/UmVMaymH1-s?rel=0)

## [Set up a subnet router](https://tailscale.com/kb/1019/subnets#set-up-a-subnet-router)

To activate a subnet router on a Linux, macOS, tvOS, or Windows machine:

1. [Install the Tailscale client](https://tailscale.com/kb/1019/subnets#install-the-tailscale-client).
2. [Connect to Tailscale as a subnet router](https://tailscale.com/kb/1019/subnets#connect-to-tailscale-as-a-subnet-router).
3. [Enable subnet routes from the admin console](https://tailscale.com/kb/1019/subnets#enable-subnet-routes-from-the-admin-console).
4. [Add access rules for advertised subnet routes](https://tailscale.com/kb/1019/subnets#add-access-rules-for-the-advertised-subnet-routes).
5. [Verify your connection](https://tailscale.com/kb/1019/subnets#verify-your-connection).
6. [Use your subnet routes from other devices](https://tailscale.com/kb/1019/subnets#use-your-subnet-routes-from-other-machines).

### [Install the Tailscale client](https://tailscale.com/kb/1019/subnets#install-the-tailscale-client)

[Linux](https://tailscale.com/kb/1019/subnets?tab=linux)[macOS](https://tailscale.com/kb/1019/subnets?tab=macos)[tvOS](https://tailscale.com/kb/1019/subnets?tab=tvos)[Windows](https://tailscale.com/kb/1019/subnets?tab=windows)

[Download and install Tailscale](https://tailscale.com/download/linux) onto your subnet router machine.

### [Connect to Tailscale as a subnet router](https://tailscale.com/kb/1019/subnets#connect-to-tailscale-as-a-subnet-router)

After the installation completes, you can start (or restart) Tailscale as a subnet router:

[Linux](https://tailscale.com/kb/1019/subnets?tab=linux)[macOS](https://tailscale.com/kb/1019/subnets?tab=macos)[tvOS](https://tailscale.com/kb/1019/subnets?tab=tvos)[Windows](https://tailscale.com/kb/1019/subnets?tab=windows)

This feature requires IP forwarding to be enabled.

#### [Enable IP forwarding](https://tailscale.com/kb/1019/subnets#enable-ip-forwarding)

If your Linux system has a `/etc/sysctl.d` directory, use:

```shell
echo 'net.ipv4.ip_forward = 1' | sudo tee -a /etc/sysctl.d/99-tailscale.conf
echo 'net.ipv6.conf.all.forwarding = 1' | sudo tee -a /etc/sysctl.d/99-tailscale.conf
sudo sysctl -p /etc/sysctl.d/99-tailscale.conf
```

Otherwise, use:

```shell
echo 'net.ipv4.ip_forward = 1' | sudo tee -a /etc/sysctl.conf
echo 'net.ipv6.conf.all.forwarding = 1' | sudo tee -a /etc/sysctl.conf
sudo sysctl -p /etc/sysctl.conf
```

If your Linux node uses `firewalld`, you might need to allow masquerading due to a [known issue](https://github.com/tailscale/tailscale/issues/3416). As a workaround, you can allow masquerading with this command:

```shell
firewall-cmd --permanent --add-masquerade
```

Other Linux distributions might require different steps.

When enabling IP forwarding, ensure your firewall is set up to deny traffic forwarding by default. This is a default setting for common firewalls like `ufw` and `firewalld`. Denying traffic forwarding by default ensures your device doesn't route traffic unintentionally.

#### [Advertise subnet routes](https://tailscale.com/kb/1019/subnets#advertise-subnet-routes)

```shell
sudo tailscale up --advertise-routes=192.168.0.0/24,192.168.1.0/24
```

Replace the subnets in the example above with the right ones for your network. Both IPv4 and IPv6 subnets are supported on all platforms except Apple TV. Apple TV only supports IPv4 subnets.

If the device is authenticated by a user who can advertise the specified route in [`autoApprovers`](https://tailscale.com/kb/1337/acl-syntax#autoapprovers), then the subnet router's routes will automatically be approved. You can also advertise any subset of the routes allowed by `autoApprovers` in the tailnet policy file.

If you'd like to expose default routes (`0.0.0.0/0` and `::/0`), consider using [exit nodes](https://tailscale.com/kb/1103/exit-nodes)instead.

### [Enable subnet routes from the admin console](https://tailscale.com/kb/1019/subnets#enable-subnet-routes-from-the-admin-console)

This step is not required if you use `autoApprovers`.

1. Open the [**Machines**](https://login.tailscale.com/admin/machines) page of the admin console.
2. Locate the **Subnets** badge in the machines list or use the [`property:subnet` filter](https://login.tailscale.com/admin/machines?q=property%3Asubnet) to list all devices advertising subnet routes.
3. Select a machine with the `subnet` property, then navigate to the **Routing Settings**section.
4. Select **Edit**. This opens the **Edit route settings** panel.
5. Under **Subnet routes**, select the routes to approve, then select **Save**.

You might prefer to disable key expiry on your server to avoid having to periodically reauthenticate. Refer to [key expiry](https://tailscale.com/kb/1028/key-expiry) for more information about machine keys and how to disable their expiry. If you are using [ACL tags](https://tailscale.com/kb/1068/acl-tags), [key expiry is disabled by default](https://tailscale.com/kb/1068/acl-tags#key-expiry).

### [Add access rules for the advertised subnet routes](https://tailscale.com/kb/1019/subnets#add-access-rules-for-the-advertised-subnet-routes)

This step is not required if you already have rules that allow access to your advertised subnet routes.

1. Open the [**Access Controls**](https://login.tailscale.com/admin/acls) page of the admin console to update your [tailnet policy file](https://tailscale.com/kb/1018/acls).
2. Create an [access rule](https://tailscale.com/kb/1337/acl-syntax#acls) that allows access to the advertised subnet.

**What this access rule does:**

- Members of the development team `group:dev` can access devices in the subnets `192.168.0.0/24` and `192.168.1.0/24`.
- The subnet `192.168.0.0/24` can access the subnet `192.168.1.0/24` and vice versa, if[subnet route masquerading](https://tailscale.com/kb/1023/troubleshooting#how-can-i-disable-subnet-route-masquerading) is disabled.

```json
{
  "groups": {
    "group:dev": ["alice@example.com", "bob@example.com"]
  },
  "acls": [
    // Users in group:dev and devices in subnets 192.168.0.0/24 and
    // 192.168.1.0/24 can access devices in subnets 192.168.0.0/24 and
    // 192.168.1.0/24
    { "action": "accept",
      "src": ["group:dev","192.168.0.0/24", "192.168.1.0/24"],
      "dst": ["192.168.0.0/24:*", "192.168.1.0/24:*"]
    }
  ]
}
```

Select **Save** on your tailnet policy file so the Tailscale coordination server distributes the updated policy to the nodes in your tailnet.

### [Verify your connection](https://tailscale.com/kb/1019/subnets#verify-your-connection)

Check that you can ping the Tailscale IP address of your new subnet routers from your personal Tailscale device (such as a Linux, macOS, or Windows device). You can find the Tailscale IP in the [**admin console**](https://login.tailscale.com/admin) or by running the following command on the subnet router.

```shell
tailscale ip -4
```

### [Use your subnet routes from other machines](https://tailscale.com/kb/1019/subnets#use-your-subnet-routes-from-other-machines)

Clients on Android, iOS, macOS, tvOS, and Windows automatically pick up your new subnet routes.

Only Linux clients using the `--accept-routes` flag discover the new routes automatically because the default is to use only the [Tailscale IP addresses](https://tailscale.com/kb/1015/100.x-addresses). You can enable automatic route discovery on Linux by running the following command:

```shell
sudo tailscale up --accept-routes
```

## [Update subnet routes](https://tailscale.com/kb/1019/subnets#update-subnet-routes)

To update subnet routes:

1. [Connect to Tailscale as a subnet router](https://tailscale.com/kb/1019/subnets#connect-to-tailscale-as-a-subnet-router).
2. [Enable subnet routes from the admin console](https://tailscale.com/kb/1019/subnets#enable-subnet-routes-from-the-admin-console).
3. [Add access rules for advertised subnet routes](https://tailscale.com/kb/1019/subnets#add-access-rules-for-the-advertised-subnet-routes).
4. [Verify your connection](https://tailscale.com/kb/1019/subnets#verify-your-connection).
5. [Use your subnet routes from other devices](https://tailscale.com/kb/1019/subnets#use-your-subnet-routes-from-other-machines).

Previously enabled routes that you exclude when enabling subnet routes will no longer appear as advertised. You can remove unused routes or keep them enabled if you plan to re-advertise them.

## [Use advanced subnet routing](https://tailscale.com/kb/1019/subnets#use-advanced-subnet-routing)

After you set up a subnet router, you might consider:

- [Routing DNS lookups to an internal DNS server](https://tailscale.com/kb/1019/subnets#route-dns-lookups-to-an-internal-dns-server).
- [Setting up high availability for subnet routers](https://tailscale.com/kb/1019/subnets#set-up-high-availability).
- Connecting two or more subnets using [site-to-site](https://tailscale.com/kb/1214/site-to-site) networking.
- [Disabling source NAT (SNAT)](https://tailscale.com/kb/1019/subnets#disable-snat).

### [Route DNS lookups to an internal DNS server](https://tailscale.com/kb/1019/subnets#route-dns-lookups-to-an-internal-dns-server)

You can add [Tailscale IPs to public DNS records](https://tailscale.com/kb/1054/dns) because Tailscale IPs are only accessible to authenticated users of your network. You can use an internal DNS server on your subnet by configuring split DNS in the [**DNS**](https://login.tailscale.com/admin/dns) page of the admin console.

### [Set up high availability](https://tailscale.com/kb/1019/subnets#set-up-high-availability)

You can set up high availability to ensure your network is connectable even if one subnet router goes offline. For more information, refer to our article on [high availability failover](https://tailscale.com/kb/1115/high-availability).

### [Disable SNAT](https://tailscale.com/kb/1019/subnets#disable-snat)

By default, when you advertise subnet routes, Tailscale uses source network address translation (SNAT) (also called masquerading). You can disable SNAT by using the `--snat-subnet-routes=false` flag with the [`tailscale up`](https://tailscale.com/kb/1241/tailscale-up) command. Disabling SNAT preserves the source IP addresses of the hosts behind the subnet router.

```shell
tailscale up --snat-subnet-routes=false
```

The `--snat-subnet-routes` flag only works with Linux subnet routers.

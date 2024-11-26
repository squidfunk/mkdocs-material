# App connectors



This feature is currently [in beta](https://tailscale.com/kb/1167/release-stages#beta). To try it, follow the steps below to enable it for your network using Tailscale v1.54 or later.

App connectors are available for [all plans](https://tailscale.com/pricing).

App connectors let you control device and user access to your third-party applications, without requiring any end-user configuration. You can control access to software as a service (SaaS) applications available over your Tailscale network (known as a tailnet) in the same way that you would administer access for your self-hosted applications.

When you use an app connector, you specify which applications you wish to make accessible over the tailnet, and the domains for those applications. Any traffic for that application is then forced over the tailnet to a node running an app connector before egressing to the target domains. This is useful for cases where the application has an allowlist of IP addresses which can connect to it: the IP address of the node running the app connector can be added to the allowlist, and all nodes on the tailnet will use that IP address for their traffic egress. For more information, see [How app connectors work](https://tailscale.com/kb/1342/how-app-connectors-work).

## [Add an app connector](https://tailscale.com/kb/1281/app-connectors#add-an-app-connector)

You must be an [Owner, Admin, or Network admin](https://tailscale.com/kb/1138/user-roles) of a tailnet to add an app connector.

Any Linux server running client version 1.54 or later can serve as an app connector. Other platforms are not yet supported. A device must be owned by a tag to be an app connector.

1. Begin by [creating a tag](https://tailscale.com/kb/1068/acl-tags) to group all of your app connectors. Tags are used to select which app connectors to use when setting up [apps](https://tailscale.com/kb/1281/app-connectors#add-an-app-to-an-app-connector).

2. Install the app connector on the machine where you intend it to run. Advertise an app connector with the `--advertise-connector` flag, and set the appropriate tag that was created in the previous step.

   ```shell
   tailscale up --advertise-connector --advertise-tags=tag:connector
   ```

3. On Linux machines, enable [IP forwarding](https://tailscale.com/kb/1019/subnets#enable-ip-forwarding).

   ```shell
   echo 'net.ipv4.ip_forward = 1' | sudo tee -a /etc/sysctl.conf
   echo 'net.ipv6.conf.all.forwarding = 1' | sudo tee -a /etc/sysctl.conf
   sudo sysctl -p /etc/sysctl.conf
   ```

4. Within your ACL, configure the app connectors so they can automatically approve any route they resolve for the tailnet by adding these entries.

   ```json
   "autoApprovers": {
     "routes": {
       "0.0.0.0/0": ["tag:connector"],
       "::/0": ["tag:connector"],
     },
   },
   ```

5. Finally, in the ACL, enable clients to access the internet using the app connectors.

   ```json
   "acls": [
     {
       "action": "accept",
       "src": ["autogroup:member"],
       "dst": ["autogroup:internet:*"],
     },
   ],
   ```

After you've added and registered the app connector for your tailnet, you must configure domains to route through the app connector using the steps provided in the following section.

## [Add an app to an app connector](https://tailscale.com/kb/1281/app-connectors#add-an-app-to-an-app-connector)

You need to be an [Owner, Admin, or Network admin](https://tailscale.com/kb/1138/user-roles) of a tailnet in order to add a domain to an app connector.

1. Open the [**Apps**](https://login.tailscale.com/admin/apps) page of the admin console.

2. Select **Add app**.

   ![Navigate to the Apps page](https://tailscale.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fapps.b43832ae.png\&w=3840\&q=75)

3. In the **Name** section, input a memorable name for the app, which represents a set of domains you'd like to route through an app connector.

4. In the **Domains** section, add all the domains relevant to this app, comma-separated.

5. In the **Connectors** section, select a tag or set of tags referencing the app connectors you'd like to use for this app.

6. **Save** your settings.

   ![Configure your app](https://tailscale.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fedit-app.310c1c6d.png\&w=1080\&q=75)

The app is now configured to route through the app connector. Traffic to the configured domains will now be carried over the tailnet to the tagged app connectors before egressing over the internet to the target domains, even when an exit node is enabled. The source IP address will be one of the public IP addresses of the machines running the app connectors.

## [Route discovery](https://tailscale.com/kb/1281/app-connectors#route-discovery)

Once an app is configured to route through a set of app connectors, any DNS request to any domains in the configured app will trigger route discovery. The app connector will attempt to add identified routes and CIDR blocks to the Tailscale policy file, to be approved by an administrator.

For ease of use and flexibility, the [`autoApprovers`](https://tailscale.com/kb/1337/acl-syntax#autoapprovers) feature can be used to allow any discovered routes to be automatically added to your ACL. The following snippet can be added to your ACL to allow any discovered address space to be automatically approved on the tailnet if it is being advertised by an app connector.

```json
"autoApprovers": {
  "routes": {
    "0.0.0.0/0": ["tag:connector"],
    "::/0": ["tag:connector"]
  },
}
```

## [Access to apps](https://tailscale.com/kb/1281/app-connectors#access-to-apps)

To access the routes an app connector is advertising (and the apps behind them), users on the tailnet need access. A simple permission is to grant access to `autogroup:internet:*` for members of the tailnet (which will also grant users access to any exit nodes on the tailnet), like so:

```json
"acls": [
  {
    "action": "accept",
    "src": ["autogroup:member"],
    "dst": ["autogroup:internet:*"],
  },
],
```

## [Add an app connector to a SaaS IP allowlist](https://tailscale.com/kb/1281/app-connectors#add-an-app-connector-to-a-saas-ip-allowlist)

Many SaaS applications can be configured for access from only trusted IP addresses. The app connector lets you always egress from a single or small set of known IP addresses, ensuring traffic to the SaaS application is coming from users and devices on your tailnet. To configure the IP allowlist, locate your SaaS provider's IP allowlist configuration page and add the public IP addresses of every machine where an app connector is installed for that SaaS application's domains. If multiple app connectors are being used in high availability mode, add all of the app connector public IP addresses. You can often find the public IP address in your infrastructure provider's administrative console.

For ease of use, egress IP addresses are automatically discovered by Tailscale. For any app, navigate to the [**Apps**](https://login.tailscale.com/admin/apps) page in the admin console, select the app you'd like to configure, and copy the Egress IPs listed. This includes all IPs of all connectors configured on the associated tags. If new connectors are added to the tag, remember to update your IP allowlist.

![Copy Egress IPs from the admin console](https://tailscale.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fapp-detail.7c6e8a82.png\&w=3840\&q=75)

Note that the Tailscale IP of the app connectors are private to the tailnet and do not represent the public IP address from which an app connector will egress internet-bound traffic.

## [Remove an app from an app connector](https://tailscale.com/kb/1281/app-connectors#remove-an-app-from-an-app-connector)

You need to be an [Owner, Admin, or Network admin](https://tailscale.com/kb/1138/user-roles) of a tailnet in order to remove an app from an app connector.

1. Open the [**Apps**](https://login.tailscale.com/admin/apps) page of the admin console.

2. Select the ![ellipsis icon](https://tailscale.com/files/images/icons/fa-ellipsis-h.svg) menu next to the relevant app, and select **Remove**.

The app is no longer configured to route through any app connectors. Traffic to domain will now egress directly from the client device or over an exit node if one is enabled.

## [Remove an app connector](https://tailscale.com/kb/1281/app-connectors#remove-an-app-connector)

You must be an [Owner, Admin, or Network admin](https://tailscale.com/kb/1138/user-roles) of a tailnet in order to remove an app connector.

1. Open the [**Machines**](https://login.tailscale.com/admin/machines) page of the admin console and locate the app connector machine.

2. Select the ![ellipsis icon](https://tailscale.com/files/images/icons/fa-ellipsis-h.svg) menu next to the app connector machine.

3. Select **Remove**, then confirm the removal.

## [High availability](https://tailscale.com/kb/1281/app-connectors#high-availability)

App connectors support Tailscale [high availability](https://tailscale.com/kb/1115/high-availability) options.

## [Considerations](https://tailscale.com/kb/1281/app-connectors#considerations)

- When configuring a SaaS provider using this method, the provider often uses multiple domains. All of these domains need to be added to your app configuration. A helpful resource for this is the [v2fly project](https://github.com/v2fly/domain-list-community/tree/master/data), which curates a list of known domains used by various services.
- If a user disables [**accept routes**](https://tailscale.com/kb/1072/client-preferences#use-tailscale-subnets) on their client, they won't route through the connectors. You may use a [system policy](https://tailscale.com/kb/1315/mdm-keys#set-whether-the-device-accepts-tailscale-subnets) to prevent users from toggling that setting.
- If the user disables [**accept dns**](https://tailscale.com/kb/1072/client-preferences#use-tailscale-dns-settings), they will still route through the connectors if [**accept routes**](https://tailscale.com/kb/1072/client-preferences#use-tailscale-subnets) is enabled and the routes are already established on that connector.
- If an app connector becomes unavailable while in use, and no other app connectors are available, resolution to the domain will begin to fail until the app connector is again online.
- To view all of the routes configured for use with app connectors, go to the [**Apps**](https://login.tailscale.com/admin/apps) page of the admin console.

## [Migrating from SNI Proxy](https://tailscale.com/kb/1281/app-connectors#migrating-from-sni-proxy)

**Deprecation Notice:** Tailscale's [SNI Proxy](https://hub.docker.com/r/tailscale/sniproxy) is being sunset in favor of the in-client app connector described above. The SNI Proxy will be deprecated on March 1st, 2024. To migrate, follow the steps above to set up your new app connectors, configure apps, and then remove your legacy connectors and associated configuration.

## [Wildcard connectors no longer supported](https://tailscale.com/kb/1281/app-connectors#wildcard-connectors-no-longer-supported)

**Deprecation Notice:** App connector configurations using all available connectors are no longer supported. Users with app connector configurations that contain `connectors: ["*"]` need to update their configuration in the [**Access Controls**](https://login.tailscale.com/admin/acls/file) page of the admin console to use [tags](https://tailscale.com/kb/1068/acl-tags) instead.

If you experience the following error when attempting to update an app connector configuration, update all app connector configurations that use `connectors: ["*"]`directly in your [tailnet policy file](https://tailscale.com/kb/1155/terminology-and-concepts#tailnet-policy-file).

```markup
Failed to update app connector configuration: tailscale.com/app-connectors: connector ("\*") must be a tag
```

Here's an example of a configuration that contains `connectors: ["*"]`:

```json
"nodeAttrs": [
  {
    "target": ["*"],
    "app": {
      "tailscale.com/app-connectors": [
        {
          "name": "example",
          "connectors": ["*"],
          "domains": [
            "example.com",
            "*.example.com"
          ]
        }
      ]
    }
  }
]
```

To replace the deprecated `connectors: ["*"]` statement, [define a tag](https://tailscale.com/kb/1068/acl-tags#define-a-tag), `tag:connector`, and use it in the app configuration:

```json
"nodeAttrs": [
  {
    "target": ["*"],
    "app": {
      "tailscale.com/app-connectors": [
        {
          "name": "example",
          "connectors": ["tag:connector"],
          "domains": [
            "example.com",
            "*.example.com"
          ]
        }
      ]
    }
  }
]
```

The tag name can be any allowed tag name—it does not need to be `tag:connector`.

For details about editing the tailnet policy file, refer to [Edit tailnet policy file](https://tailscale.com/kb/1338/acl-edit).

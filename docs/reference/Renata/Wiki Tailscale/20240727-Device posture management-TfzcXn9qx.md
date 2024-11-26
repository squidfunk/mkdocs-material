# Device posture management

## [What is device posture?](https://tailscale.com/kb/1018/acls#what-is-device-posture)

Device posture is a view of how secure or trustworthy a device is. With Tailscale you can collect device attributes and use them as part of connectivity rules within your Tailscale network (known as a tailnet). You can use these rules to limit access for devices on your tailnet that do not meet security requirements.

Device attributes include pre-populated host information such as operating system version, as well as custom attributes from endpoint detection and response tools.

### [Authorize device API](https://tailscale.com/kb/1018/acls#authorize-device-api)

If you have an endpoint device posture solution, you may already know which machines on your tailnet do and do not meet your device posture requirements.

One approach to ensuring devices on your network comply with your device posture policy is to use the [Authorize device API](https://tailscale.com/api#tag/devices/POST/device/%7BdeviceId%7D/authorized). This lets you only authorize devices that meet your requirements, de-authorize devices that do not meet your requirements, by temporarily disabling tailnet access until you determine that their posture has been resolved, at which point you can re-authorize the devices.

## [Device posture attributes](https://tailscale.com/kb/1018/acls#device-posture-attributes)

Device posture attributes are key-value pairs of data attached to devices that you can either read and write for your own use, or use in posture access rules. These attributes are in namespaces. For example, the attribute key `node:os` is in the `node` namespace, and the key `custom:myAttribute` is in the `custom` namespace. Attribute values can be one of three different types: strings, numbers, or booleans.

Posture attributes bring together data from several different sources all in one place:

- Host information already available via the API such as OS version and Tailscale version in the `node` namespace.
- Custom posture attributes set by you, or software you have integrated with our API, in the `custom` namespace.

Posture attributes are distinct from [`nodeAttrs`](https://tailscale.com/kb/1337/acl-syntax/#nodeattrs). The existing `nodeAttrs` are set as flags only, not as key-value pairs.

The following posture attributes are currently available by default, for use in access rule postures, and via the node attribute API:

| **Attribute key**     | **Description**                                                                                          | **Allowed values**                                                                   |
| --------------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `node:os`             | The operating system the device is running                                                               | `macos`, `windows`, `linux`, `ios`, `android`, `freebsd`, `openbsd`, `illumos`, `js` |
| `node:osVersion`      | The version of the operating system                                                                      | A version as a quoted string                                                         |
| `node:tsAutoUpdate`   | The configuration state of [auto-update](https://tailscale.com/kb/1067/update#auto-updates)on the client | `true`, `false`                                                                      |
| `node:tsReleaseTrack` | The release track of the Tailscale client                                                                | `stable`, `unstable`                                                                 |
| `node:tsVersion`      | The version of Tailscale the client is running                                                           | A version as a quoted string                                                         |

The `node:tsAutoUpdate` attribute is only set to `true` when Tailscale's built-in [auto-update](https://tailscale.com/kb/1067/update#auto-updates) is enabled. It is set to `false` when Tailscale is updated using an external mechanism, such as the Apple App Store or Google Play Store.

A machine's attributes and respective values are visible in the Machine Details view for each device in your tailnet.

![](https://tailscale.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmachine-details-attrs.8e428320.png\&w=1200\&q=75)

### [Examples](https://tailscale.com/kb/1018/acls#examples)

The following examples demonstrate the formatting to use for each type of attribute key.

| **Attribute key**     | **Example**                       |
| --------------------- | --------------------------------- |
| `node:os`             | `node:os IN ['macos', 'linux']`   |
| `node:osVersion`      | `node:osVersion == '13.4.0'`      |
| `node:tsReleaseTrack` | `node:tsReleaseTrack == 'stable'` |
| `node:tsVersion`      | `node:tsVersion >= '1.42.2'`      |
| `node:tsAutoUpdate`   | `node:tsAutoUpdate == true`       |

## [Device posture conditions](https://tailscale.com/kb/1018/acls#device-posture-conditions)

Postures and posture conditions let you create automated network access control rules based on device posture.

A posture is a set of assertions based on device posture attributes. For example, you might specify that the operating system needs to be newer than a particular version.

Posture conditions are a feature for [access rules](https://tailscale.com/kb/1337/acl-syntax#acls), allowing you to make them conditional on device posture in addition to source, destination, and protocol. This lets you write flexible and fine-grained access controls for your tailnet.

You can use posture conditions to create simple rules, such as denying all access to devices that don’t meet your posture requirements, or control access within your tailnet with far more granularity. For example, you can require devices to meet stricter security requirements in order to be able to connect to production. Or you can disallow access to most of your corporate network for devices that don’t meet your posture requirements, but still allow them to reach the IT help desk.

### [Postures](https://tailscale.com/kb/1018/acls#postures)

A posture is a set of assertions made about posture attributes and only apply to devices initiating the connection. Each posture must start with `posture:` followed by a name, and a set of posture attributes and their values, given as a list of strings.

```json
"postures": {
    "posture:latestMac": [
        "node:os IN ['macos', 'linux']",
        "node:tsReleaseTrack == 'stable'",
        "node:tsVersion >= '1.40'",
    ],
},
```

Currently supported operators:

- `==`
- `!=`
- `IN`
- `NOT IN`
- `<`, `<=`, `>=`, `>` (only for numbers and version attributes: `node:osVersion` and `node:tsVersion`)

Versions are compared using [a compare function](https://github.com/tailscale/tailscale/blob/main/util/cmpver/version.go) which will take into account versions with both numeric and non-numeric fields.

For a posture to match a device, all posture attribute values must be met. In the above example:

- The operating system must be macOS or Linux
- The devices must use the stable release version of the Tailscale client
- Tailscale client version must be 1.40 or later

Posture conditions can be made against any posture attributes, default and custom.

Postures referencing custom and third-party attributes are available for [the Personal and Enterprise plans](https://tailscale.com/pricing).

If an attribute defined in the posture is unset for a particular device, the posture will not match that device, irrespective of the operator used. For example, a device that does not have the `custom:tier` attribute assigned to it, will not match a posture that includes an attribute `custom:tier`, even if that condition is negative (for example, `custom:tier != 'prod'`).

You can create multiple postures in one policy file:

```json
"postures": {
    "posture:latestMac": [
        "node:os == 'macos'",
        "node:osVersion == '13.4.0'",
        "node:tsReleaseTrack == 'stable'",
    ],
    "posture:anyMac": [
        "node:os == 'macos'",
        "node:tsReleaseTrack == 'stable'",
    ],
},
```

### [Posture conditions](https://tailscale.com/kb/1018/acls#posture-conditions)

A posture condition is an extension to the existing tailnet policy file syntax, allowing you to define access rules dependent on device posture:

```json
"acls": [
    {
        // Only requirement to access development servers is Mac + stable Tailscale
        "action": "accept",
        "src": ["autogroup:member"],
        "dst": ["tag:development"],
        "srcPosture": ["posture:anyMac"]
    },{
        // Only devs can access production
        // and production access requires macOS is also up to date
        "action": "accept",
        "src": ["group:dev"],
        "dst": ["tag:production"],
        "srcPosture": ["posture:latestMac"]
    },
],
```

Access rules can require that any of a list of postures is required for access to be permitted:

```json
"acls": [
    {
        "action": "accept",
        "src": ["group:dev"],
        "dst": ["tag:production"],
        "srcPosture": ["posture:approvedMacs", "posture:approvedWindows", "posture:approvedLinux"]
    },
],
```

In this example, access is permitted to production if the connecting device meets any of the 3 specified postures.

### [Default source posture](https://tailscale.com/kb/1018/acls#default-source-posture)

If you want to apply a baseline posture that applies to all of your access rules, you can set a default source posture:

```json
"defaultSrcPosture": [
    "posture:basicWindows",
    "posture:basicMac",
    "posture:basicLinux",
],
```

As with `srcPosture` in access rules, this permits access if any of the supplied postures are met.

If a default source posture is set, it will apply to any access rules that do not have a posture condition. Note that it is not additive, meaning if an access rule specifies a posture condition, only that condition will apply, and the default source posture condition will no longer apply. This can be used to create an access rule that is more permissive than the default:

```json
"acls": [
    {
        // defaultSrcPosture applies to this rule
        "action": "accept",
        "src": ["autogroup:member"],
        "dst": ["tag:intranet"],
    },{
        "action": "accept",
        "src": ["group:dev", "group:sre"],
        "dst": ["tag:production"],
        // This posture condition is instead of, not in addition to, the default source posture
        "srcPosture": ["posture:prodWin", "posture:prodMac"]
    },
],
```

### [Tailscale SSH and Posture Conditions](https://tailscale.com/kb/1018/acls#tailscale-ssh-and-posture-conditions)

Connections created with the [Tailscale SSH Console](https://tailscale.com/kb/1216/tailscale-ssh-console) are also subject to posture condition restrictions. To allow these connections, you can allow the posture condition `node:os == 'js'`.

### [Shared Nodes and Posture Conditions](https://tailscale.com/kb/1018/acls#shared-nodes-and-posture-conditions)

Posture conditions specified with `srcPosture` and `defaultSrcPosture` are only applied to `src` devices within your tailnet. If you have used Tailscale's [node sharing](https://tailscale.com/kb/1084/sharing) to grant access to a device to a user outside of your tailnet, that user's device will be able to connect regardless of their posture.

If you wish for your posture conditions to apply to external users, consider [inviting the user into your tailnet](https://tailscale.com/kb/1271/invite-any-user).

## [Posture attributes API](https://tailscale.com/kb/1018/acls#posture-attributes-api)

Documentation for the Device Posture Attribute API is available in our [API documentation on GitHub](https://tailscale.com/api#tag/devices/GET/device/%7BdeviceId%7D/attributes).

## [Audit log events](https://tailscale.com/kb/1018/acls#audit-log-events)

The following [audit log events](https://tailscale.com/kb/1203/audit-logging#events) are added for device posture.

| **Target** | **Action**            | **Description**                |
| ---------- | --------------------- | ------------------------------ |
| Node       | Update node attribute | Device posture attributes for  |

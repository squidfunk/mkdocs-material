# Manage permissions using ACLs

ACLs (access control lists) let you precisely define permissions for users and devices on your Tailscale network (known as a tailnet). Tailscale manages access rules for your network in the [tailnet policy file](https://tailscale.com/kb/1155/terminology-and-concepts#tailnet-policy-file) using [ACL syntax](https://tailscale.com/kb/1337/acl-syntax).

When you first create your tailnet, the [default tailnet policy file](https://tailscale.com/kb/1192/acl-samples#allow-all-default-acl) allows communication between all devices within the tailnet. You can modify your policy file (including [editing ACLs](https://tailscale.com/kb/1018/acls#edit-acls)) to fit your needs.

ACLs deny access by default, are directional, are locally enforced, and don't affect local network traffic.

- Deny access by default. Using a default deny policy prevents communication between devices without explicit access to each other.
- Directional. Allowing a source to connect to a destination doesn't mean the destination can connect to the source (unless a policy explicitly allows it).
- Locally enforced. A device enforces incoming connections based on the access rules distributed to all devices in your tailnet. Rule enforcement happens on each device directly, without further involvement from Tailscale's coordination server.
- ACLs do not affect what a device can or cannot access on its local network.

To learn more about Tailscale's approach to access control, read [RBAC like it was meant to be](https://tailscale.com/blog/rbac-like-it-was-meant-to-be).

## [Edit ACLs](https://tailscale.com/kb/1018/acls#edit-acls)

You can edit your tailnet's access rules by using the [**Access Controls**](https://login.tailscale.com/admin/acls) page of the admin console, [GitOps for Tailscale ACLs](https://tailscale.com/kb/1204/gitops-acls), or the [Tailscale API](https://tailscale.com/kb/1101/api). See [Editing ACLs](https://tailscale.com/kb/1338/acl-edit).


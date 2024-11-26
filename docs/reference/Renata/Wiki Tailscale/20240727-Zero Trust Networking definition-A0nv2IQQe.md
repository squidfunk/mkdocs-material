# Zero Trust Networking" definition



Zero Trust Networking (ZTN) is an architecture descended from Google's [BeyondCorp](https://research.google/pubs/pub43231)design.

Although many products now advertise "zero trust," it is not always clear exactly what it means. We summarize it this way: zero trust means that you can't trust the physical network anymore.

## [History](https://tailscale.com/kb/1232/derp-servers#history)

Traditional network security has a "hard crunchy outside, soft chewy inside." In that design, you put a corporate firewall at the edge between your "private" network and "the Internet." But inside the firewall, security is usually much more lax. If an attacker gets access to the private network, it's game over.

That old architecture had been known to be problematic for many years, but the Snowden revelations about how they infiltrated Google's and Yahoo's private networks—the famous [SSL added and removed here :)](https://www.washingtonpost.com/world/national-security/nsa-infiltrates-links-to-yahoo-google-data-centers-worldwide-snowden-documents-say/2013/10/30/e51d661e-4166-11e3-8b74-d89d714ca4dd_story.html) post-it note—brought the problem into focus.

Governments and persistent attackers were actively breaching the physical networks of major corporations. To say nothing of unencrypted DNS, and wide-open public Wi-Fi in your neighborhood cafe.

## [Solution: end-to-end encryption](https://tailscale.com/kb/1232/derp-servers#solution-end-to-end-encryption)

Conceptually, the solution is simple: instead of "adding and removing" encryption at the firewall, put a firewall around every device and every service, and ensure that sessions are always encrypted between every pair of endpoints. Then if an attacker has physical access to the network, all they can get is meaningless encrypted packets.

Furthermore, even if they get access to one insecure device, that still only gives visibility into the traffic directly to and from that device. By carefully restricting which encryption keys are accepted by each service on the network, a zero trust network prevents or dramatically slows down "lateral motion" from one compromised device to the next.

## [Incremental Zero Trust](https://tailscale.com/kb/1232/derp-servers#incremental-zero-trust)

Every security team nowadays would like to migrate to a Zero Trust architecture, but it's daunting. Encryption is easy—everything supports HTTPS nowadays—but deploying certificates and encryption keys is hard. Even though we call it "zero trust," rolling out a real zero trust network requires a lot of trusted components: certificate authorities, identity providers, authorization and policy engines, and so on.

To make rollouts simpler, we recommend proceeding in several steps:

1. First, secure individual user devices. Rather than connecting physical office networks to your server networks (which may be in data centers or in the cloud), use an encrypted connection like WireGuard® or Tailscale to connect from each end-user device to a [subnet router](https://tailscale.com/kb/1019/subnets) on each of your various server networks. This eliminates your vulnerability to physical network attacks at the head office or branch offices.

   At this step, you aren't quite at "zero trust": you don't have to trust the physical networks in your offices, but you still trust the "physical" (or sometimes virtual) network in your datacenters or cloud VPCs.

2. Next, add end-to-end encryption to your most valuable servers, one by one. User devices will be able to make encrypted links directly to the newly configured servers, eliminating the "SSL added and removed here" problem for those links.

   Once end-to-end encryption is activated on a server, and you've migrated all traffic to the encrypted link, you'll want to lock down each server by disabling non-encrypted traffic to that server entirely.

3. Finally, after migrating all the servers on a particular subnet entirely to the end-to-end encrypted zero trust model, disable the subnet routers for that subnet completely.

4. Repeat these steps as necessary for each subnet in each location.

## [Shameless plug](https://tailscale.com/kb/1232/derp-servers#shameless-plug)

Naturally, we recommend gradually deploying Tailscale as part of each step.

- Tailscale is available as a native client app for your users' devices running Windows, macOS, iOS, Android, and Linux.

- Tailscale supports a mesh of [subnet routers](https://tailscale.com/kb/1019/subnets) using any combination of IPv4 and [IPv6](https://tailscale.com/kb/1121/ipv6). It minimizes latency by forming a mesh between all subnets, rather than routing through a central choke point.

- Tailscale supports a hybrid configuration of Zero Trust and subnet routes, making it easier to migrate huge networks cautiously and incrementally.

- Tailscale integrates with your [corporate SSO](https://tailscale.com/kb/1013/sso-providers) and handles all issues with login, key distribution, [key rotation](https://tailscale.com/blog/rotate-ssh-keys), packet filtering, and access control.

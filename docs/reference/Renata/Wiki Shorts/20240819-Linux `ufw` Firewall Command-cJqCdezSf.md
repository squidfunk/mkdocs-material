# Linux `ufw` Firewall Command

**`ufw`** is a user-friendly frontend for `iptables` on Linux.

## Basics: Enable/Disable `ufw` and Modify its Settings
- `ufw status [verbose|numbered]`  
  Show firewall rules with optional verbosity.

- `ufw [enable|disable]`  
  Enable or disable `ufw`.

- `ufw reload`  
  Refresh modified `ufw` rules without stopping the `ufw` service.

- `ufw logging [on|off] <log-level>`  
  Enable logging (`log-level`: low/medium/high/full).

## Rule Addition: Add Allow/Deny/Limit Rules
- `ufw default [allow|deny|reject] [incoming|outgoing]`  
  Change default in/out action.

- `ufw deny on eth0 from 1.1.1.0/24`  
  Drop all traffic on eth0 from 1.1.1.0/24 subnet.

- `ufw reject in from 1.1.1.1`  
  Reject all traffic from 1.1.1.1 with an error packet sent back.

- `ufw deny ssh reject`  
  Block all incoming SSH connections by default.

- `ufw allow 5555/udp`  
  Allow UDP connection to port 5555.

- `ufw allow from 1.1.1.1 proto tcp to any port 22`  
  Allow SSH traffic from 1.1.1.1 only.

- `ufw limit ssh/tcp`  
  Rate-limit SSH connections (only allow 6 connections in 30 seconds).

## Rule Removal: Remove One or More Rules
- `ufw delete deny on eth0 from 1.1.1.0/24`  
  Remove a specified rule.

- `ufw delete <rule-number>`  
  Remove a rule by rule number.

- `ufw reset`  
  Remove all existing rules and reset firewall rules to defaults.

## App Profiles: Enable/Disable Rules Based on App Profiles
- `ufw app list`  
  Show app profiles in `/etc/ufw/applications.d`.

- `ufw allow <profile-name>`  
  Enable an app profile.

- `ufw delete allow <profile-name>`  
  Disable an app profile.

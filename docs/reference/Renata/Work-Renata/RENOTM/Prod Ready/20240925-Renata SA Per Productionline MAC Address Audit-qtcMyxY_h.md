# Renata SA Per Productionline MAC Address Audit

#### Network Audit Solution

This document provides a solution for auditing network devices using a Bash script that reads a Markdown input file, fetches vendor information for MAC addresses, and outputs the results in another Markdown file.

***

## Input Markdown File

The input is a Markdown file (`network_devices.md`) containing a table of network devices:

# Network Devices List

| Device Type              | Interface Type                  | IP Address | MAC Address       | Role             | VLAN   |
| ------------------------ | ------------------------------- | ---------- | ----------------- | ---------------- | ------ |
| Mitsubishi Roboter       | NIC Ethernet                    | 10.0.1.120 | -                 | Produktionslinie | VLAN 1 |
| Mitsubishi Roboter       | NIC Profinet TZ535-PN           | 10.0.1.121 | 00:30:11:52:45:47 | Produktionslinie | VLAN 1 |
| Keyence QR-Code-Scanner  | SR-X1H3HX                       | 10.0.1.239 | 00:01:fc:be:64:be | Produktionslinie | VLAN 1 |
| Keyence Laser-Scanner    | LJ-V7001P NIC Ethernet          | 10.0.1.240 | -                 | Produktionslinie | VLAN 1 |
| Keyence Laser-Scanner    | LJ-V7001P NIC Profinet CB-PN100 | 10.0.1.241 | 00:01:fc:9b:7e:6d | Produktionslinie | VLAN 1 |
| Keyence Profinet Einheit | DL-PN1                          | 10.0.1.242 | 00:01:fc:f9:70:a6 | Produktionslinie | VLAN 1 |
| Etikettendrucker         | -                               | 10.0.1.249 | -                 | Produktionslinie | VLAN 1 |

\`\`\`

***

## Bash Script

Save the following script as `mac_audit.sh`. It reads the input Markdown file, fetches vendor information for each MAC address, and writes the results to a Markdown file (`network_audit_log.md`).

```
#!/bin/bash

# Input and output Markdown files
INPUT_FILE="network_devices.md"
OUTPUT_FILE="network_audit_log.md"

# Initialize the output file with the Markdown table header
echo "# Network Audit Log" > $OUTPUT_FILE
echo "| Device Type | Interface Type | IP Address | MAC Address | Vendor | Role | VLAN |" >> $OUTPUT_FILE
echo "|-------------|----------------|------------|-------------|--------|------|------|" >> $OUTPUT_FILE

# Function to get the vendor from a MAC address
get_vendor() {
    local mac_address=$1
    if [[ $mac_address == "-" || -z $mac_address ]]; then
        echo "No MAC Address"
    else
        # Fetch vendor using macvendors API
        curl -s https://api.macvendors.com/$mac_address
    fi
}

# Read the input Markdown file (skip the header lines until the table content starts)
tail -n +5 "$INPUT_FILE" | while IFS='|' read -r _ device_type interface_type ip_address mac_address role vlan _
do
    # Remove leading/trailing whitespaces
    device_type=$(echo "$device_type" | xargs)
    interface_type=$(echo "$interface_type" | xargs)
    ip_address=$(echo "$ip_address" | xargs)
    mac_address=$(echo "$mac_address" | xargs)
    role=$(echo "$role" | xargs)
    vlan=$(echo "$vlan" | xargs)

    # Skip empty lines
    if [[ -z "$device_type" || "$device_type" == "Device Type" ]]; then
        continue
    fi

    echo "Auditing device: $device_type, IP: $ip_address, MAC: $mac_address"
    
    # Get vendor for the current MAC address
    vendor=$(get_vendor "$mac_address")

    # If no vendor was found, set it to "Unknown"
    if [[ -z $vendor ]]; then
        vendor="Unknown"
    fi

    # Log the result in the output file as a Markdown table row
    echo "| $device_type | $interface_type | $ip_address | $mac_address | $vendor | $role | $vlan |" >> $OUTPUT_FILE
done

echo "Network audit completed. Results saved in $OUTPUT_FILE."
```

***

## Example Output Markdown File

After running the script, the results will be saved in `network_audit_log.md`. Here's an example of the expected output:

```
# Network Audit Log
| Device Type | Interface Type | IP Address | MAC Address | Vendor | Role | VLAN |
|-------------|----------------|------------|-------------|--------|------|------|
| Mitsubishi Roboter | NIC Ethernet | 10.0.1.120 | - | No MAC Address | Produktionslinie | VLAN 1 |
| Mitsubishi Roboter | NIC Profinet TZ535-PN | 10.0.1.121 | 00:30:11:52:45:47 | Cisco Systems | Produktionslinie | VLAN 1 |
| Keyence QR-Code-Scanner | SR-X1H3HX | 10.0.1.239 | 00:01:fc:be:64:be | Keyence Corporation | Produktionslinie | VLAN 1 |
| Keyence Laser-Scanner | LJ-V7001P NIC Ethernet | 10.0.1.240 | - | No MAC Address | Produktionslinie | VLAN 1 |
| Keyence Laser-Scanner | LJ-V7001P NIC Profinet CB-PN100 | 10.0.1.241 | 00:01:fc:9b:7e:6d | Keyence Corporation | Produktionslinie | VLAN 1 |
| Keyence Profinet Einheit | DL-PN1 | 10.0.1.242 | 00:01:fc:f9:70:a6 | Keyence Corporation | Produktionslinie | VLAN 1 |
| Etikettendrucker | - | 10.0.1.249 | - | No MAC Address | Produktionslinie | VLAN 1 |
```

***

## Instructions for Use

1. **Prepare the Input File**: Save your list of devices in `network_devices.md` in the format provided above.

2. **Run the Script**:

   - Save the Bash script as `mac_audit.sh`.
   - Make the script executable: `bash chmod +x mac_audit.sh`
   - Run the script: `bash ./mac_audit.sh`

3. **View the Output**: The output will be saved in `network_audit_log.md`, showing the vendor information alongside each device.

***

This solution provides a clean and readable way to audit network devices using a Markdown-based input/output system. \`\`\`


Marc Strub

25/09/2024 11:33

**Yes, a list of OT suppliers is maintained.**

**The suppliers are managed and updated by the Project Team, which, in this case, is led by Daniel Hunziker**.

This team is responsible for ensuring that all OT-related suppliers are properly tracked, documented, and aligned with production requirements. The suppliers, especially those contributing critical hardware like the ASA1 (soon to go online), are closely monitored for compliance, security, and functionality.

It’s important to note that we do not solely rely on the information provided by either the vendors or the Project Team. The responsibility includes gathering data from multiple sources and conducting independent verifications to ensure full compliance.

**For instance:**

- It is mandatory for each production line to have a documented vendor compliance process. Vendors must fill out specific documents detailing critical hardware related to their products, ensuring alignment with production standards.
- Beyond vendor submissions, every piece of equipment connected to the local production network must be thoroughly documented. This includes, but is not limited to, providing details like MAC addresses.

**The documentation and compliance forms enable us to run regular audits. These audits serve to cross-check the declared information against actual installations. Furthermore, the MAC address information is crucial for verifying that the installed hardware has the latest firmware updates—an essential aspect of maintaining security and operational integrity.**

**\*\*In addition to internal scripts that are regularly executed to audit hardware details, this multi-layered approach helps ensure that all OT assets are compliant with company standards and that risks related to outdated firmware or incomplete hardware information are mitigated.**

Marc Strub

25/09/2024 11:41

By upholding this process, we are also able, alongside the Project Team, to evaluate whether vendors and their hardware are still supported, nearing end-of-life, or need to be removed/replaced based on the definitions explained above.

I have added two examples:

1. The vendor list, while not very large, is currently focused solely on parts that are in the OT, excluding others that have not yet been moved or installed. However, these will eventually fall under the same standard.
2. The uploaded file is the vendor list from the Project Team, but it can be extended to include any systems running in or outside the OT.

Additionally, I have developed a script used to audit the vendor list. I can upload the vendor list that they need to fill out for me in relation to OT compliance, but it is in German.

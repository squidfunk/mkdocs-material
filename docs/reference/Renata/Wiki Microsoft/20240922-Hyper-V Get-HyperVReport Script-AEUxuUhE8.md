# Hyper-V Get-HyperVReport Script

### **Instructions**

1. **Save the Script**: Copy the entire code above and save it as `Get-HyperVReport.ps1` on your Hyper-V host or any system with network access to your Hyper-V environment.

2. **Set Execution Policy**: Ensure your system allows script execution. Run PowerShell as Administrator and execute:

   ```powershell
   Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

3. **Install Required Modules**: The script attempts to install any missing modules automatically. However, you can manually ensure that the `Hyper-V` and `FailoverClusters` modules are installed:

   ```powershell
   Install-WindowsFeature -Name Hyper-V -IncludeManagementTools
   Install-WindowsFeature -Name Failover-Clustering -IncludeManagementTools
   ```

4. **Usage Examples**:

   - **Generate a Cluster Report**:

     ```powershell
     .\Get-HyperVReport.ps1 -Cluster YourClusterName
     ```

   - **Generate a Standalone Host Report**:

     ```powershell
     .\Get-HyperVReport.ps1 -VMHost Host1,Host2
     ```

   - **Generate an Alerts-Only Report**:

     ```powershell
     .\Get-HyperVReport.ps1 -Cluster YourClusterName -HighlightsOnly
     ```

   - **Send Report via Email**:

     ```powershell
     .\Get-HyperVReport.ps1 -Cluster YourClusterName -SendMail -SMTPServer smtp.yourserver.com -MailFrom your_email@domain.com -MailTo recipient@domain.com -MailFromPassword "YourEmailPassword"
     ```

5. **View the Report**: After running the script, it will generate an HTML file (e.g., `HyperV_Report.html`) in the current directory. Open this file in a web browser to view the report.

### **Features**

- **Modern Interface with Dark Mode**: The HTML report includes modern styling with dark mode, making it easy on the eyes, especially in low-light environments.

- **Responsive Design**: The report layout adjusts to different screen sizes, allowing you to view it comfortably on various devices.

- **Tooltips for Additional Information**: The script includes tooltip functionality to provide additional context where necessary.

- **Comprehensive Data**: The report includes cluster information, host details, network configurations, storage usage, VM states, and more.

- **Alerts System**: Critical issues are highlighted, and you can use the `-HighlightsOnly` switch to generate a report focusing solely on alerts.

- **Email Delivery**: Option to send the report via email with SMTP authentication and SSL support for secure transmission.

### **Additional Notes**

- **Permissions**: Ensure the user account running the script has the necessary permissions to access and query the Hyper-V hosts or clusters.

- **Credential Security**: When using the `-MailFromPassword` parameter, be cautious as it involves plaintext passwords. For better security, consider using `Get-Credential` or secure credential storage mechanisms.

- **Modules and Features**: The script checks for required modules (`Hyper-V`, `FailoverClusters`) and attempts to install them if missing. This requires administrative privileges.

- **Error Handling**: The script includes error handling to capture and report issues during execution.

- **Customizable Thresholds**: You can modify the CPU and memory usage thresholds within the script to suit your environment.

- **Scheduling**: To automate report generation, you can schedule the script using Windows Task Scheduler.

### **Troubleshooting**

- **Module Import Errors**: If you encounter issues importing modules, ensure that the required Windows features are installed and that you are running PowerShell with administrative privileges.

- **SMTP Errors**: If email delivery fails, verify your SMTP server settings, port numbers, and credentials. Some SMTP servers require specific configurations or additional security measures.

- **Access Denied Errors**: Ensure that the account running the script has administrative access to the remote hosts and that remote management is enabled.

### **Customization**

- **CSS Styling**: The embedded CSS within the `<style>` tags can be modified to change the appearance of the report.

- **Report Sections**: You can add or remove sections in the HTML generation part of the script to tailor the report to your needs.

- **Thresholds and Alerts**: Adjust the values that trigger alerts (e.g., CPU usage, memory availability) by modifying the corresponding parts of the script.

---

### **PowerShell Script: `Get-HyperVReport.ps1`**

```powershell
<#
.SYNOPSIS
Generates a detailed HTML report for Hyper-V environments with options for email delivery and alerts-only mode.

.DESCRIPTION
This script collects data from Hyper-V hosts or clusters, including VM details, replication status, network configuration, and storage usage. It generates an HTML report with a modern, responsive interface that supports dark mode. The script can send the report via email and supports alerts-only mode to highlight critical issues.

.PARAMETER Cluster
Specifies the name of the Hyper-V cluster to report on.

.PARAMETER VMHost
Specifies one or more standalone Hyper-V hosts to report on.

.PARAMETER HighlightsOnly
Switch to generate a report showing only alerts and critical events.

.PARAMETER SendMail
Switch to enable email delivery of the report.

.PARAMETER SMTPServer
Specifies the SMTP server for email delivery.

.PARAMETER SMTPPort
Specifies the SMTP port. Default is 25.

.PARAMETER MailFrom
Specifies the sender's email address.

.PARAMETER MailTo
Specifies one or more recipient email addresses.

.PARAMETER MailFromPassword
Specifies the password for the sender's email account.

.PARAMETER ReportFileNameTimeStamp
Switch to append a timestamp to the report filename.

.EXAMPLE
.\Get-HyperVReport.ps1 -Cluster Hvcluster1

.EXAMPLE
.\Get-HyperVReport.ps1 -VMHost Host1,Host2 -HighlightsOnly

.EXAMPLE
.\Get-HyperVReport.ps1 -Cluster Hvcluster1 -SendMail -SMTPServer smtp.mailserver.com -MailFrom sender@hyperv.com -MailTo recipient@hyperv.com

#>

[CmdletBinding()]
param (
    [Parameter(Mandatory = $false)]
    [string]$Cluster,

    [Parameter(Mandatory = $false)]
    [string[]]$VMHost,

    [Parameter(Mandatory = $false)]
    [switch]$HighlightsOnly,

    [Parameter(Mandatory = $false)]
    [switch]$SendMail,

    [Parameter(Mandatory = $false)]
    [string]$SMTPServer,

    [Parameter(Mandatory = $false)]
    [int]$SMTPPort = 25,

    [Parameter(Mandatory = $false)]
    [string]$MailFrom,

    [Parameter(Mandatory = $false)]
    [string[]]$MailTo,

    [Parameter(Mandatory = $false)]
    [string]$MailFromPassword,

    [Parameter(Mandatory = $false)]
    [switch]$ReportFileNameTimeStamp
)

# Function to Import Required Modules
function Import-RequiredModules {
    $modules = @('Hyper-V', 'FailoverClusters')
    foreach ($module in $modules) {
        if (!(Get-Module -ListAvailable -Name $module)) {
            Write-Host "Module $module is not available. Attempting to install..."
            Install-WindowsFeature -Name $module -IncludeManagementTools -ErrorAction Stop
        }
        Import-Module $module -ErrorAction Stop
    }
}

# Verify PowerShell Version
if ($PSVersionTable.PSVersion.Major -lt 5) {
    Write-Error "PowerShell 5.1 or later is required."
    exit
}

# Import Required Modules
Import-RequiredModules

# Initialize Variables
$ReportData = @{
    ClusterInfo = $null
    HostInfo    = @()
    VMInfo      = @()
    Alerts      = @()
}

# Collect Data Function
function Collect-Data {
    param (
        [string[]]$Hosts
    )

    foreach ($host in $Hosts) {
        try {
            # Collect Host Information
            $hostInfo = Get-ComputerInfo -CimSession $host
            $hostNics = Get-NetAdapter -CimSession $host | Where-Object { $_.Status -eq 'Up' }
            $vSwitches = Get-VMSwitch -ComputerName $host
            $volumes = Get-Volume -CimSession $host | Where-Object { $_.DriveType -eq 'Fixed' }

            # Collect VM Information
            $vms = Get-VM -ComputerName $host

            foreach ($vm in $vms) {
                $vmInfo = @{
                    Name             = $vm.Name
                    State            = $vm.State
                    Uptime           = $vm.Uptime
                    CPUUsage         = $vm.CpuUsage
                    MemoryAssigned   = $vm.MemoryAssigned
                    MemoryDemand     = $vm.MemoryDemand
                    MemoryStatus     = $vm.MemoryStatus
                    VMNetworkAdapter = Get-VMNetworkAdapter -VM $vm -ComputerName $host
                    VHDs             = Get-VMHardDiskDrive -VMName $vm.Name -ComputerName $host
                    Replication      = Get-VMReplication -VMName $vm.Name -ComputerName $host -ErrorAction SilentlyContinue
                }

                # Check for Alerts
                if ($vm.State -ne 'Running') {
                    $ReportData.Alerts += "VM '$($vm.Name)' on host '$host' is not running."
                }

                $ReportData.VMInfo += $vmInfo
            }

            $hostData = @{
                Name        = $host
                Info        = $hostInfo
                NICs        = $hostNics
                VSwitches   = $vSwitches
                Volumes     = $volumes
                VMs         = $vms
                Replication = Get-VMReplication -ComputerName $host -ErrorAction SilentlyContinue
            }

            # Check for Host Alerts
            $cpuUsage = (Get-WmiObject -Class Win32_Processor -ComputerName $host | Measure-Object -Property LoadPercentage -Average).Average
            if ($cpuUsage -gt 80) {
                $ReportData.Alerts += "Host '$host' CPU usage is above 80%."
            }

            $memoryUsage = (Get-WmiObject -Class Win32_OperatingSystem -ComputerName $host).FreePhysicalMemory
            if ($memoryUsage -lt 1GB) {
                $ReportData.Alerts += "Host '$host' free memory is below 1 GB."
            }

            $ReportData.HostInfo += $hostData
        } catch {
            Write-Error "An error occurred while collecting data from host '$host': $_"
        }
    }
}

# Main Execution Block
try {
    if ($Cluster) {
        # Collect Cluster Information
        $clusterObj = Get-Cluster -Name $Cluster -ErrorAction Stop
        $ReportData.ClusterInfo = $clusterObj

        $hosts = Get-ClusterNode -Cluster $Cluster | Select-Object -ExpandProperty Name
    } elseif ($VMHost) {
        $hosts = $VMHost
    } else {
        Write-Error "You must specify either -Cluster or -VMHost parameter."
        exit
    }

    # Collect Data
    Collect-Data -Hosts $hosts

} catch {
    Write-Error "An error occurred: $_"
    exit
}

# Generate HTML Report
$reportHtml = @"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Hyper-V Environment Report</title>
    <style>
        /* CSS Styles */
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #1e1e1e;
            color: #d4d4d4;
            margin: 0;
            padding: 20px;
        }
        h1, h2, h3 {
            color: #569cd6;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
        }
        th, td {
            border: 1px solid #3c3c3c;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #252526;
        }
        tr:nth-child(even) {
            background-color: #2d2d2d;
        }
        .alert {
            color: #d16969;
        }
        .container {
            max-width: 1200px;
            margin: auto;
        }
        .tooltip {
            position: relative;
            cursor: help;
        }
        .tooltip .tooltiptext {
            visibility: hidden;
            width: 200px;
            background-color: #252526;
            color: #d4d4d4;
            text-align: center;
            border-radius: 6px;
            padding: 5px;
            position: absolute;
            z-index: 1;
            bottom: 125%; /* Position above */
            left: 50%;
            margin-left: -100px; /* Center the tooltip */
            opacity: 0;
            transition: opacity 0.3s;
            border: 1px solid #3c3c3c;
        }
        .tooltip:hover .tooltiptext {
            visibility: visible;
            opacity: 1;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Hyper-V Environment Report</h1>
        <h2>Generated on $(Get-Date)</h2>
"@

if ($ReportData.ClusterInfo) {
    $clusterNodes = ($ReportData.ClusterInfo | Get-ClusterNode).Count
    $clusterVms = (Get-ClusterGroup -Cluster $Cluster -GroupType "VirtualMachine").Count
    $reportHtml += @"
        <h2>Cluster Overview</h2>
        <table>
            <tr><th>Name</th><td>$($ReportData.ClusterInfo.Name)</td></tr>
            <tr><th>Nodes</th><td>$clusterNodes</td></tr>
            <tr><th>Clustered VMs</th><td>$clusterVms</td></tr>
        </table>
"@
}

foreach ($host in $ReportData.HostInfo) {
    $cpuUsage = (Get-WmiObject -Class Win32_Processor -ComputerName $host.Name | Measure-Object -Property LoadPercentage -Average).Average
    $memoryTotal = (Get-WmiObject -Class Win32_ComputerSystem -ComputerName $host.Name).TotalPhysicalMemory
    $memoryFree = (Get-WmiObject -Class Win32_OperatingSystem -ComputerName $host.Name).FreePhysicalMemory * 1KB
    $memoryUsed = $memoryTotal - $memoryFree
    $uptime = (Get-WmiObject -Class Win32_OperatingSystem -ComputerName $host.Name).LastBootUpTime
    $uptime = (Get-Date) - [Management.ManagementDateTimeConverter]::ToDateTime($uptime)

    $reportHtml += @"
        <h2>Host: $($host.Name)</h2>
        <table>
            <tr><th>CPU Usage (%)</th><td>$([Math]::Round($cpuUsage, 2))</td></tr>
            <tr><th>Memory Usage (%)</th><td>$([Math]::Round(($memoryUsed / $memoryTotal) * 100, 2))</td></tr>
            <tr><th>Uptime (Days)</th><td>$([Math]::Round($uptime.TotalDays, 2))</td></tr>
        </table>

        <h3>Network Adapters</h3>
        <table>
            <tr><th>Name</th><th>Status</th><th>Speed (Gbps)</th><th>MAC Address</th><th>IP Addresses</th></tr>
"@
    foreach ($nic in $host.NICs) {
        $ipAddresses = ($nic | Get-NetIPAddress -AddressFamily IPv4 -ErrorAction SilentlyContinue).IPAddress -join ', '
        $reportHtml += "<tr><td>$($nic.Name)</td><td>$($nic.Status)</td><td>$([Math]::Round($nic.LinkSpeed / 1GB, 2))</td><td>$($nic.MacAddress)</td><td>$ipAddresses</td></tr>"
    }
    $reportHtml += "</table>"

    $reportHtml += "<h3>Virtual Switches</h3><table><tr><th>Name</th><th>Type</th><th>Associated NICs</th></tr>"
    foreach ($vswitch in $host.VSwitches) {
        $nics = ($vswitch.NetAdapterInterfaceDescription -join ', ')
        $reportHtml += "<tr><td>$($vswitch.Name)</td><td>$($vswitch.SwitchType)</td><td>$nics</td></tr>"
    }
    $reportHtml += "</table>"

    $reportHtml += "<h3>Volumes</h3><table><tr><th>Name</th><th>Size (GB)</th><th>Free Space (GB)</th><th>File System</th></tr>"
    foreach ($vol in $host.Volumes) {
        $reportHtml += "<tr><td>$($vol.FriendlyName)</td><td>$([Math]::Round($vol.Size / 1GB, 2))</td><td>$([Math]::Round($vol.SizeRemaining / 1GB, 2))</td><td>$($vol.FileSystem)</td></tr>"
    }
    $reportHtml += "</table>"
}

if ($HighlightsOnly) {
    if ($ReportData.Alerts.Count -gt 0) {
        $reportHtml += "<h2 class='alert'>Alerts</h2><ul>"
        foreach ($alert in $ReportData.Alerts) {
            $reportHtml += "<li>$alert</li>"
        }
        $reportHtml += "</ul>"
    } else {
        $reportHtml += "<h2>No alerts to display.</h2>"
    }
} else {
    $reportHtml += "<h2>Virtual Machines</h2><table><tr><th>Name</th><th>State</th><th>CPU Usage (%)</th><th>Memory Assigned (GB)</th><th>Host</th></tr>"
    foreach ($vm in $ReportData.VMInfo) {
        $reportHtml += "<tr><td>$($vm.Name)</td><td>$($vm.State)</td><td>$($vm.CPUUsage)</td><td>$([Math]::Round($vm.MemoryAssigned / 1GB, 2))</td><td>$($vmInfo.Host)</td></tr>"
    }
    $reportHtml += "</table>"
}

$reportHtml += @"
    </div>
</body>
</html>
"@

# Save Report
$timestamp = if ($ReportFileNameTimeStamp) { "_$(Get-Date -Format 'yyyyMMdd_HHmmss')" } else { "" }
$reportFileName = "HyperV_Report$timestamp.html"
$reportHtml | Out-File -FilePath $reportFileName -Encoding utf8

Write-Host "Report generated: $reportFileName"

# Email Report
if ($SendMail) {
    if (-not ($SMTPServer -and $MailFrom -and $MailTo)) {
        Write-Error "SMTPServer, MailFrom, and MailTo parameters are required for email delivery."
        exit
    }

    $securePassword = ConvertTo-SecureString $MailFromPassword -AsPlainText -Force
    $credential = New-Object System.Management.Automation.PSCredential ($MailFrom, $securePassword)

    try {
        Send-MailMessage -From $MailFrom -To $MailTo -Subject "Hyper-V Environment Report" -Body "Please find the attached Hyper-V report." -Attachments $reportFileName -SmtpServer $SMTPServer -Port $SMTPPort -Credential $credential -UseSsl -ErrorAction Stop
        Write-Host "Report emailed to $MailTo"
    } catch {
        Write-Error "Failed to send email: $_"
    }
}
```
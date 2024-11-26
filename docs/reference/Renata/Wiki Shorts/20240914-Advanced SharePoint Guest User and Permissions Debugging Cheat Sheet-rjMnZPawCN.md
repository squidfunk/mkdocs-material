# Advanced SharePoint Guest User and Permissions Debugging Cheat Sheet



## 1. Detailed Permissions Review

- **Analyze Permissions at Site and Library Level:**
  - Go to **Site Settings > Site Permissions** and select **Manage Permission Levels**.
  - Review permission levels (e.g., Full Control, Contribute, Read) and ensure guest users have the correct permissions.

- **Check Permissions at Item Level:**
  - Navigate to a document library and click on a document or folder. Select **Details > Manage Access**.
  - Verify individual permissions for the selected item and ensure guest users have the necessary access rights.

- **Check Security and Permission Inheritance:**
  - Go to **Site Settings > Site Permissions** and click **Stop Inheriting Permissions** or **Restore Inheritance** to ensure permissions are correctly inherited.

## 2. Using PowerShell for Troubleshooting

- **Check Permissions with PowerShell:**
  - Use the SharePoint Online PowerShell module to check detailed permissions for users and groups:
  ```powershell
  Get-SPOSiteGroup -Site <Site-URL> | Get-SPOUser
  ```
  - This command lists all users and their permissions for a specific site.

- **Display Guest User Permissions:**
  ```powershell
  Get-SPOUser -Site <Site-URL> -Group "Visitors" | Where-Object { $_.LoginName -like "*#ext#*" }
  ```
  - This command displays all guest users in the "Visitors" group of a specific site.

## 3. Adjusting Detailed Sharing Settings

- **Configure Sharing Options at the Organizational Level:**
  - Go to **Microsoft 365 Admin Center > SharePoint Admin Center > Policies > Sharing**.
  - Adjust sharing policies to specify which types of links (internal, external, anonymous) are allowed.

- **Resend Guest User Invitations:**
  - Go to **Site Settings > Users and Groups** and select the guest user.
  - Click **Resend Invitation** to send a new invitation if the original link has expired.

## 4. Utilize Monitoring and Diagnostic Tools

- **Use Advanced Audit Logs:**
  - Enable advanced audit logs in the **SharePoint Admin Center**. Go to **Monitoring > Search Audit Logs** and analyze logs for guest user actions.

- **Check Health Analyzer Reports:**
  - Use the **SharePoint Health Analyzer** to monitor site health and identify issues that might affect permissions or access.

## 5. Resolving Specific Permission Issues

- **Issue: Guest Users Cannot Access Specific Documents**
  - **Solution:**
    - Check document-level permissions and ensure permissions are not accidentally restricted.
    - Use **Check Permissions** in the library to review current sharing settings.

- **Issue: Guest Users Receive "Access Denied" Errors**
  - **Solution:**
    - Ensure the guest user is assigned to the correct group and that there are no conflicting permissions at the site or item level.
    - Verify if the organization's security policies block external user access.

## 6. Tips for Avoiding Permission Issues

- **Conduct Regular Audits:**
  - Perform regular audits of user permissions and use PowerShell scripts for automation.

- **Improve Guest User Management:**
  - Implement a policy for managing guest users and ensure all invitations are reviewed and accepted promptly.

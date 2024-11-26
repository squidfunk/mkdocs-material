# SharePoint Guest User and Permissions Debugging Cheat Sheet



## 1. Steps to Troubleshoot Guest User Issues

- **Check Guest Access Policies:**
  - Ensure that your organization's guest access policy allows adding guest users.
  - Go to **Microsoft 365 Admin Center > Settings > Organization Profile > Guest Sharing** and review the policies.

- **Add Guest User to the Site:**
  - Verify that the guest user has been properly added to the site.
  - Go to **Site Settings > Users and Groups** and ensure the guest user is listed in the appropriate group.

- **Check Guest Access to Document Libraries:**
  - Ensure guest users have access to the required document libraries.
  - Navigate to **Library Settings > Document Library Permissions** and confirm that the guest user has the appropriate permissions.

## 2. Resolve Permission Issues

- **Check Permissions at Site and Item Level:**
  - Review permissions at the site, library, and item level.
  - Go to **Site Settings > Site Permissions** and ensure permissions are correctly configured.

- **Verify Permission Inheritance:**
  - Ensure that permission inheritance is set up correctly.
  - Navigate to **Site Settings > Site Permissions > Manage Inheritance** and check if permissions are properly inherited.

- **Use of Links and Sharing Options:**
  - Ensure correct sharing options are being used.
  - Go to **Sharing** and check the settings for **Link Types** (internal, external, etc.).

## 3. Check User Roles and Group Memberships

- **Check Membership in Permission Groups:**
  - Ensure that the guest user is assigned to the correct SharePoint group.
  - Go to **Site Settings > Users and Groups** and review group memberships.

- **Manage User Roles:**
  - Review and adjust user roles to ensure they have the required access.
  - Go to **Site Settings > Site Permissions** and select **Edit Permission Level**.

## 4. Diagnostic Tools and Logs

- **Use Audit Logs:**
  - Utilize **Audit Logs** in the SharePoint Admin Center to check when and how guest users have accessed the site or library.

- **Use Diagnostic Tools:**
  - Leverage tools like **SharePoint Health Analyzer** and **Diagnostic Logs** to generate detailed error reports.

## 5. Tips for Avoiding Issues

- **Regularly Review Permissions:**
  - Conduct regular reviews of user and group permissions to prevent unauthorized access.

- **Restrict Guest User Access:**
  - Use the **Restrict External User Access** option under **Site Settings > Access and Sharing** to limit access to certain areas.

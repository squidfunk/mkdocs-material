# Restore the Deleted AD Account

Method 1: Using AD Recycle Bin (if enabled)

	1.	Open Active Directory Administrative Center:
	•	Open Server Manager on your domain controller.
	•	Click on Tools and select Active Directory Administrative Center.
	2.	Navigate to Deleted Objects:
	•	In the left pane, click on your domain name.
	•	Under the domain name, you will see an option called Deleted Objects. Click on it.
	3.	Restore the Deleted Account:
	•	Find the deleted user account in the Deleted Objects container.
	•	Right-click on the user account and select Restore or Restore to.

Method 2: Using PowerShell with AD Recycle Bin (if enabled)

	1.	Open PowerShell with Administrative Privileges:
	2.	Use the following PowerShell command to list deleted objects:

Get-ADObject -Filter {isDeleted -eq $True -and name -ne "Deleted Objects"} -IncludeDeletedObjects


	3.	Restore the Deleted Account:

Restore-ADObject -Identity "CN=DeletedUser,CN=Deleted Objects,DC=YourDomain,DC=com"

Replace "CN=DeletedUser,CN=Deleted Objects,DC=YourDomain,DC=com" with the actual distinguished name of the deleted account.

Method 3: Using Backup (if AD Recycle Bin is not enabled)

If the AD Recycle Bin is not enabled, you will need to restore the account from a backup. This can be done using a System State backup or an authoritative restore.

Prerequisites:

	•	Ensure you have a recent backup of the Active Directory.

Steps:

	1.	Reboot the Domain Controller in Directory Services Restore Mode (DSRM):
	•	Restart the domain controller.
	•	Press F8 during startup.
	•	Select Directory Services Restore Mode from the boot options.
	2.	Log in using the DSRM password.
	3.	Restore System State Backup:
	•	Open a Command Prompt with administrative privileges.
	•	Use the wbadmin command to start the restore process. Replace BackupVersion and BackupLocation with your actual backup details:

wbadmin start systemstaterecovery -version:BackupVersion -backupTarget:BackupLocation -quiet


	4.	Mark the Object for Authoritative Restore:
	•	Use the ntdsutil command to mark the user account as authoritative:
ntdsutil
activate instance ntds
authoritative restore
restore object "CN=DeletedUser,CN=Users,DC=YourDomain,DC=com"
quit
quit

Replace "CN=DeletedUser,CN=Users,DC=YourDomain,DC=com" with the distinguished name of the deleted user account.

	5.	Restart the Domain Controller:
	•	Exit DSRM and restart the domain controller normally.

Enabling AD Recycle Bin (if not already enabled)

To prevent future issues, consider enabling the AD Recycle Bin:

	1.	Open Active Directory Administrative Center.
	2.	In the left pane, click on your domain name.
	3.	In the right pane, under Tasks, click Enable Recycle Bin.
	4.	Follow the prompts to enable the AD Recycle Bin.

    
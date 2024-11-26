# Linux Commands for File Permission

## chmod: Set/Change File Permissions for Owner/Group/Others
- **Grant Read Permission:** `chmod u+r my.txt`
- **Remove Write Permission:** `chmod g-w my.txt`
- **Adjust Permissions for All:** `chmod u+rwx,o+r my.txt`
- **Change Permission via Numeric Mode:** `chmod 754 my.txt`

## setfacl: Provide More Fine-Grained Control Over File Permissions
- **Grant Permissions to User:** `setfacl -m u:dan:rw my.txt`
- **Remove Specific ACL:** `setfacl -x u:dan my.txt`
- **Remove All ACLs:** `setfacl -b my.txt`
- **Grant Execute Permission to Group:** `setfacl -m g:developers:x my.sh`

## find & chmod: Change File Permissions for Multiple Files Based on Criteria
- **Set Execute Permissions for All `.sh` Files:**  
  `find . -type f -name "*.sh" -exec chmod +x {} \;`
- **Set Read-Only Permissions for All Files Modified More Than 30 Days Ago:**  
  `find . -type f -mtime +30 -exec chmod 444 {} \;`
- **Change File Permissions for All of Dan’s Files:**  
  `find . -type f -user dan -exec chmod 700 {} \;`

## umask: Set Default Permissions for Newly Created Files and Directories
- **Default File Permission:** `umask 022`

## install: Copy Files and Set Their Permissions and Ownership in One Step
- **Copy File with Specific Permissions:** `install -m 755 my.conf /etc`

## rsync: Set File and Directory Permissions While Copying Them
- **Rsync with Permission Changes:** `rsync -av --chmod=D2775,F664 src/ dst/`

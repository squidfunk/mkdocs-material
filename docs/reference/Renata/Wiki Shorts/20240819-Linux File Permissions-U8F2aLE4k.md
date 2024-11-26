# Linux File Permissions

## File Permission Representation
- **Symbolic Notation:** `rwxrw-rw-`
- **Numeric (Octal) Notation:** `766`

## Fields in `ls -l` Output
- **drwxrwxr-x:** Directory with user/group/others permissions.
- **Owner:** The user who owns the file.
- **Group:** The group that owns the file.
- **Permissions:** The permissions for user, group, and others.
- **File Type:** d (directory), - (file), etc.

### Command to Modify Permissions
- **Disallow Modification by Others:** `chmod 764 run.py` or `chmod g-w run.py`.

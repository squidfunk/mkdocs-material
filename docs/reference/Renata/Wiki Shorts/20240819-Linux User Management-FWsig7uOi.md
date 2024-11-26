# Linux User Management

## Add, Remove or Modify User
- `useradd <username>`  
  Add a new user.

- `useradd -m <username>`  
  Add a new user with home directory.

- `useradd -a <groupname> <username>`  
  Add a new user with the primary group.

- `userdel <username>`  
  Remove the named user without removing the home directory.

- `userdel -r <username>`  
  Remove the named user and its home directory.

- `usermod -m -d /path/to/new/home <username>`  
  Move user’s home directory.

- `passwd -l <username>`  
  Lock the named user to disable login.

- `passwd -u <username>`  
  Unlock the named user to re-enable login.

## Add, Remove or Modify Group
- `groupadd <groupname>`  
  Add a new group.

- `groupdel <groupname>`  
  Remove the group.

- `usermod -aG <groupname> <username>`  
  Add user to the named group.

- `gpasswd -d <username> <groupname>`  
  Remove user from the named group.

- `groupmod -n <new-groupname> <old-groupname>`  
  Change group name.

## Display User and Group Information
- `whoami`  
  Display username of currently logged-in user (same as `echo $USER`).

- `id <username>`  
  Display UID, GID and groups user belongs to.

- `id -gn <username>`  
  Show a user’s primary group.

- `groups <username>`  
  List all (primary and secondary) groups user belongs to.

- `getent group <groupname>`  
  Display all users a particular group contains.

- `getent passwd`  
  Display all entries in the password database.

- `getent group`  
  Display all entries in the group database.

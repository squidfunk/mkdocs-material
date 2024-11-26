# Basic Winget Commands Guide


Winget is Windows Package Manager, a command-line tool that simplifies the process of installing, upgrading, and managing software on Windows. This guide covers the most common and essential Winget commands for beginners.

## Installing Winget

Winget comes pre-installed on Windows 11 and newer versions of Windows 10. If you don't have it, you can install it from the Microsoft Store by searching for "App Installer".

## Basic Commands

### 1. Search for an application

To search for an application:

```
winget search <app-name>
```

Example:
```
winget search firefox
```

### 2. Install an application

To install an application:

```
winget install <app-id>
```

Example:
```
winget install Mozilla.Firefox
```

### 3. Uninstall an application

To uninstall an application:

```
winget uninstall <app-id>
```

Example:
```
winget uninstall Mozilla.Firefox
```

### 4. List installed applications

To list all installed applications:

```
winget list
```

### 5. Upgrade an application

To upgrade a specific application:

```
winget upgrade <app-id>
```

Example:
```
winget upgrade Mozilla.Firefox
```

### 6. Upgrade all applications

To upgrade all installed applications:

```
winget upgrade --all
```

### 7. Show application information

To show detailed information about an application:

```
winget show <app-id>
```

Example:
```
winget show Mozilla.Firefox
```

## Tips

- Use double quotes around app names or IDs if they contain spaces.
- You can use partial names for searching, but you need the exact ID for installation or uninstallation.
- Always run the command prompt or PowerShell as an administrator when using Winget to install or uninstall applications.

Remember, these are just the basic commands to get you started. Winget has many more features and options for advanced users.

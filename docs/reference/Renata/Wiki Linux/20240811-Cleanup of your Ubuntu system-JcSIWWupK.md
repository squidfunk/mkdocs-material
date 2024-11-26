# Cleanup of your Ubuntu system

The script provided a cleanup of your Ubuntu system, focusing on removing unnecessary files, orphaned packages, old kernels, and cleaning up caches and logs. It is designed to free up disk space and improve system performance without disrupting the core functionality of the Ubuntu operating system.

---

Here is a recap of what the script does:

1. **APT Cleanup**: Removes unnecessary packages, cleans cached package files, and clears obsolete package files.
2. **Flatpak Cleanup**: Removes unused Flatpak runtimes.
3. **Snap Cleanup**: Removes old revisions of Snap packages and cleans the Snap cache directory.
4. **Log and Temp File Cleanup**: Deletes old log files, clears the `/tmp` directory, and cleans user cache directories.
5. **Orphaned Packages Cleanup**: Removes orphaned packages using `deborphan`.
6. **Unused Kernels Cleanup**: Removes old, unused kernels.
7. **Update Locate Database**: Updates the `locate` command's database.

### System Cleanup Script

```bash
#!/bin/bash

# Introduction
echo "Starting comprehensive cleanup for APT, Flatpak, Snap, and system files..."

# Step 1: Cleanup APT
echo "Cleaning up APT packages..."
sudo apt autoremove -y
sudo apt clean
sudo apt autoclean

# Step 2: Cleanup Flatpak
echo "Cleaning up Flatpak..."
flatpak uninstall --unused -y

# Step 3: Cleanup Snap
echo "Cleaning up Snap packages..."
sudo snap remove --purge $(sudo snap list --all | awk '/disabled/{print $1, $3}')
sudo rm -rf /var/cache/snapd/

# Step 4: Cleanup old logs and temporary files
echo "Cleaning up old logs and temporary files..."
# Remove old log files
sudo find /var/log -type f -name "*.log" -exec rm -f {} \;
# Clean /tmp directory
sudo rm -rf /tmp/*
# Clean user cache directories
sudo rm -rf /home/*/.cache/*
sudo rm -rf /root/.cache/*

# Step 5: Cleanup orphaned packages
echo "Cleaning up orphaned packages..."
sudo apt install -y deborphan
sudo deborphan | xargs sudo apt -y remove --purge
sudo deborphan --guess-data | xargs sudo apt -y remove --purge

# Step 6: Cleanup unused kernels
echo "Cleaning up unused kernels..."
sudo apt --purge autoremove -y

# Step 7: Update locate database
echo "Updating locate database..."
sudo updatedb

echo "Comprehensive cleanup complete!"
```

### Running the Script

1. Save the script to a file, for example, `comprehensive_cleanup.sh`.
2. Make the script executable:
   ```bash
   chmod +x comprehensive_cleanup.sh
   ```
3. Run the script with root privileges:
   ```bash
   sudo ./comprehensive_cleanup.sh
   ```

# Installing Arch Linux with GNOME on Intel-based Surface Pro 9: A Step-by-Step Guide

## Prerequisites

- Surface Pro 9 (Intel-based)
- USB Drive (minimum 2 GB)
- Stable Internet Connection
- Another Computer to prepare the installation media
- Backup any important data before proceeding

## Table of Contents

1. Prepare the Installation Media
2. Boot from the USB Drive
3. Set Up Networking
4. Update the System Clock
5. Partition the Disk
6. Format the Partitions
7. Mount the Filesystems
8. Install the Base System
9. Configure the System
10. Install Essential Packages
11. Install the Bootloader
12. Install the GNOME Desktop Environment
13. Set Up the Surface Kernel
14. Finalize and Reboot
15. Post-Installation Configuration
16. Conclusion

## Step 1: Prepare the Installation Media

### 1.1 Download Arch Linux ISO
Download the latest Arch Linux ISO from the official website.

### 1.2 Create a Bootable USB
On Linux:
```
sudo dd if=/path/to/archlinux.iso of=/dev/sdX bs=4M status=progress oflag=sync
```
Replace `/dev/sdX` with your USB drive identifier.

On Windows:
Use Rufus to create a bootable USB.

## Step 2: Boot from the USB Drive

### 2.1 Disable Secure Boot
1. Power off the Surface Pro 9.
2. Press and hold the Volume Up button.
3. Press the Power button once.
4. Release the Volume Up button when the UEFI menu appears.
5. Navigate to Security > Secure Boot and disable it.

### 2.2 Boot from USB
1. Insert the bootable USB drive.
2. Restart the device.
3. When the Surface logo appears, press and hold the Volume Down button to boot from USB.

## Step 3: Set Up Networking

### 3.1 Verify Network Interface
```
ip link
```

### 3.2 Connect to Wi-Fi
```
iwctl
device list
station wlan0 scan
station wlan0 get-networks
station wlan0 connect "Your_WiFi_SSID"
exit
```

### 3.3 Test Internet Connection
```
ping -c 3 archlinux.org
```

## Step 4: Update the System Clock
```
timedatectl set-ntp true
```

## Step 5: Partition the Disk

### 5.1 Identify the Disk
```
fdisk -l
```
Assuming the disk is `/dev/nvme0n1`.

### 5.2 Start cfdisk or gdisk
Use gdisk for GPT partitioning:
```
gdisk /dev/nvme0n1
```

### 5.3 Create Partitions
- EFI System Partition (ESP): 512 MB
- Root Partition: Remaining space

In gdisk:
1. Press `o` to create a new empty GUID partition table.
2. Press `n` to create a new partition.
   - Partition number: Press Enter for default.
   - First sector: Press Enter for default.
   - Last sector: `+512M` for ESP.
   - Hex code or GUID: `ef00` for EFI System Partition.
3. Press `n` again for the root partition.
   - Accept defaults to use the remaining space.
   - Hex code or GUID: `8300` for Linux filesystem.
4. Press `w` to write changes and exit.

## Step 6: Format the Partitions

### 6.1 Format the EFI System Partition
```
mkfs.fat -F32 /dev/nvme0n1p1
```

### 6.2 Format the Root Partition
```
mkfs.ext4 /dev/nvme0n1p2
```

## Step 7: Mount the Filesystems

### 7.1 Mount Root Partition
```
mount /dev/nvme0n1p2 /mnt
```

### 7.2 Create and Mount EFI Partition
```
mkdir /mnt/boot
mount /dev/nvme0n1p1 /mnt/boot
```

## Step 8: Install the Base System
```
pacstrap /mnt base linux linux-firmware
```

## Step 9: Configure the System

### 9.1 Generate fstab
```
genfstab -U /mnt >> /mnt/etc/fstab
```

### 9.2 Chroot into the System
```
arch-chroot /mnt
```

### 9.3 Set Timezone
```
ln -sf /usr/share/zoneinfo/Region/City /etc/localtime
hwclock --systohc
```
Replace `Region/City` with your location, e.g., `Europe/London`.

### 9.4 Localization
Edit `/etc/locale.gen`:
```
nano /etc/locale.gen
```
Uncomment your locale, e.g., `en_US.UTF-8 UTF-8`.

Generate the locales:
```
locale-gen
echo "LANG=en_US.UTF-8" > /etc/locale.conf
```

### 9.5 Network Configuration
Set the hostname:
```
echo "myhostname" > /etc/hostname
```

Edit `/etc/hosts`:
```
nano /etc/hosts
```
Add the following lines:
```
127.0.0.1   localhost
::1         localhost
127.0.1.1   myhostname.localdomain myhostname
```
Replace `myhostname` with your desired hostname.

## Step 10: Install Essential Packages
Install network management tools:
```
pacman -S networkmanager
systemctl enable NetworkManager
```

## Step 11: Install the Bootloader

### 11.1 Install GRUB and EFI Tools
```
pacman -S grub efibootmgr
```

### 11.2 Install GRUB to EFI
```
grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=GRUB
```

### 11.3 Generate GRUB Configuration
```
grub-mkconfig -o /boot/grub/grub.cfg
```

## Step 12: Install the GNOME Desktop Environment

### 12.1 Install Xorg and GNOME
```
pacman -S xorg gnome gnome-extra
```

### 12.2 Enable the Display Manager
```
systemctl enable gdm
```

## Step 13: Set Up the Surface Kernel

### 13.1 Import GPG Key
```
curl -s https://raw.githubusercontent.com/linux-surface/linux-surface/master/pkg/keys/surface.asc | pacman-key --add -
pacman-key --finger 9AF2B472
pacman-key --lsign-key 9AF2B472
```

### 13.2 Add the Surface Linux Repository
Edit `/etc/pacman.conf`:
```
nano /etc/pacman.conf
```
Add the following at the end:
```
[linux-surface]
Server = https://pkg.surfacelinux.com/arch/
```

### 13.3 Update Package Database
```
pacman -Syu
```

### 13.4 Install the Surface Kernel and Headers
```
pacman -S linux-surface linux-surface-headers iptsd
```

### 13.5 Rebuild GRUB Configuration
```
grub-mkconfig -o /boot/grub/grub.cfg
```

### 13.6 Enable Touchscreen Service
```
systemctl enable iptsd.service
```

## Step 14: Finalize and Reboot

### 14.1 Set Root Password
```
passwd
```

### 14.2 Exit Chroot and Unmount Partitions
```
exit
umount -R /mnt
```

### 14.3 Reboot the System
```
reboot
```
Remove the USB drive when the system restarts.

## Step 15: Post-Installation Configuration

### 15.1 Create a New User
```
useradd -m -G wheel -s /bin/bash username
passwd username
```

### 15.2 Configure Sudo Access
Install sudo:
```
pacman -S sudo
```
Edit the sudoers file:
```
EDITOR=nano visudo
```
Uncomment the following line:
```
%wheel ALL=(ALL) ALL
```

### 15.3 Enable Multilib Repository (Optional)
If you need 32-bit support, enable the multilib repository:
1. Edit `/etc/pacman.conf`:
   ```
   nano /etc/pacman.conf
   ```
2. Uncomment the following lines:
   ```
   [multilib]
   Include = /etc/pacman.d/mirrorlist
   ```
3. Update package databases:
   ```
   pacman -Syu
   ```

### 15.4 Install Additional Drivers and Firmware
Ensure all hardware components like Wi-Fi, Bluetooth, camera, and pen input are functioning.
```
pacman -S linux-firmware intel-ucode
```

### 15.5 Update the System
```
sudo pacman -Syu
```

## Conclusion

You have successfully installed Arch Linux with the GNOME desktop environment on your Intel-based Surface Pro 9. Your system should now support touch input, Wi-Fi, Bluetooth, and other hardware features unique to Surface devices, thanks to the linux-surface kernel.

Note: For the latest updates and support, refer to the linux-surface GitHub repository. The Surface community actively maintains patches and drivers for better hardware compatibility.

Disclaimer: This guide is accurate as of October 2023. Hardware compatibility and software packages may change over time. Always refer to official documentation and repositories for the most recent information.
# Installing Arch Linux with GNOME on the Microsoft Surface Pro 9

## Preparation

### 1. Download Arch Linux ISO:
Get the latest Arch Linux ISO from the official site.

### 2. Create Bootable USB:
Use a tool like Rufus or dd to create a bootable USB from the Arch ISO. For example, with dd on Linux:

```
sudo dd if=/path/to/archlinux.iso of=/dev/sdX bs=4M status=progress && sync
```

### 3. Disable Secure Boot:
Power off the Surface and hold the Volume Up button while pressing the Power button to access UEFI. Disable Secure Boot under the UEFI settings.

## Boot and Start Installation

### 1. Boot from USB:
Insert the USB into the Surface Pro 9 and boot into the Arch installation media. This may require selecting the USB from the boot menu.

### 2. Connect to Wi-Fi:
Use iwctl to connect to a Wi-Fi network:

```
iwctl
device list
station <device> scan
station <device> get-networks
station <device> connect <SSID>
```

## Partitioning

### 1. Partition the Disk:
Create partitions using fdisk or cgdisk. Here is an example with fdisk:

```
fdisk /dev/nvme0n1
```

Suggested layout:
- 512MB EFI partition (Type: EFI)
- Remaining space for Linux root (Type: Linux Filesystem)

### 2. Format Partitions:
Format the partitions:

```
mkfs.fat -F32 /dev/nvme0n1p1  # EFI
mkfs.ext4 /dev/nvme0n1p2     # Root
```

### 3. Mount Partitions:
```
mount /dev/nvme0n1p2 /mnt
mkdir /mnt/boot
mount /dev/nvme0n1p1 /mnt/boot
```

## Install Arch Linux

### 1. Install Base System:
```
pacstrap /mnt base linux linux-firmware
```

### 2. Generate fstab:
```
genfstab -U /mnt >> /mnt/etc/fstab
```

### 3. Chroot into the system:
```
arch-chroot /mnt
```

### 4. Set Timezone and Locale:
```
ln -sf /usr/share/zoneinfo/Region/City /etc/localtime
hwclock --systohc
echo "en_US.UTF-8 UTF-8" >> /etc/locale.gen
locale-gen
echo "LANG=en_US.UTF-8" > /etc/locale.conf
```

### 5. Create Hostname:
```
echo "surfacepro9" > /etc/hostname
```

## Install the Linux-Surface Kernel

1. Import the Linux-Surface Key:
```
curl -s https://raw.githubusercontent.com/linux-surface/linux-surface/master/pkg/keys/surface.asc | sudo pacman-key --add -
sudo pacman-key --lsign-key 56C464BAAC421453
```

2. Add the Linux-Surface Repository:
Add this line to the bottom of `/etc/pacman.conf`:
```
[linux-surface]
Server = https://pkg.surfacelinux.com/arch/
```

3. Install the Surface Kernel and Dependencies:
```
sudo pacman -Syu
sudo pacman -S linux-surface linux-surface-headers iptsd
```

4. Set Up Bootloader (GRUB):
```
pacman -S grub efibootmgr
grub-install --target=x86_64-efi --efi-directory=/boot --bootloader-id=GRUB
grub-mkconfig -o /boot/grub/grub.cfg
```

## GNOME Installation

1. Install GNOME:
```
pacman -S gnome gnome-extra
```

2. Enable GNOME Display Manager (GDM):
```
systemctl enable gdm
systemctl enable NetworkManager
```

## Final Steps

1. Set Root Password:
```
passwd
```

2. Create User:
```
useradd -mG wheel <username>
passwd <username>
```

3. Reboot:
```
exit
umount -R /mnt
reboot
```

4. Verify Kernel:
After rebooting, verify you're using the correct kernel:
```
uname -r
```
Ensure it shows something like "surface" in the version string.

This should get Arch Linux with GNOME running on your Surface Pro 9 with proper hardware support!
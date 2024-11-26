# GNOME Terminal Color Setup Script

## Overview

This script automatically configures custom colors for your GNOME Terminal. It sets up a color scheme that includes vibrant colors for better visibility and aesthetics.

## Prerequisites

- GNOME Terminal (Version 3.46.8 or compatible)
- Bash shell
- `dconf` command (usually pre-installed on systems with GNOME)

## Usage

1. Save the script to a file (e.g., `setup_gnome_terminal_colors.sh`).
2. Make the script executable:
   ```bash
   chmod +x setup_gnome_terminal_colors.sh
   ```
3. Run the script:
   ```bash
   ./setup_gnome_terminal_colors.sh
   ```
4. Restart GNOME Terminal for changes to take effect.

## What the Script Does

1. Detects your current GNOME Terminal profile UUID.
2. Disables the use of system theme colors for the terminal.
3. Sets custom foreground (white) and background (black) colors.
4. Configures a custom color palette with vibrant colors.

## Color Palette

The script sets up the following color palette:

- Black: rgb(0,0,0)
- Red: rgb(255,0,0)
- Green: rgb(0,255,0)
- Yellow: rgb(255,255,0)
- Blue: rgb(0,0,255)
- Magenta: rgb(255,0,255)
- Cyan: rgb(0,255,255)
- White: rgb(255,255,255)

Plus lighter versions of these colors for bold text.

## Troubleshooting

1. **Script fails to run:**
   - Ensure the script is executable (`chmod +x setup_gnome_terminal_colors.sh`).
   - Make sure you're running it from a bash shell.

2. **"Error: Could not find a GNOME Terminal profile":**
   - Verify that you're using GNOME Terminal.
   - Check if dconf is installed: `which dconf`
   - Manually check for profiles: `dconf list /org/gnome/terminal/legacy/profiles:/`

3. **Colors don't change after running the script:**
   - Restart GNOME Terminal.
   - If issue persists, manually verify dconf settings:
     ```bash
     dconf read /org/gnome/terminal/legacy/profiles:/:$(dconf list /org/gnome/terminal/legacy/profiles:/ | grep '^:' | sed 's/://g' | head -n 1)/palette
     ```

4. **Want to revert changes:**
   - Run: 
     ```bash
     dconf reset -f /org/gnome/terminal/legacy/profiles:/
     ```
   - Then restart GNOME Terminal.

## Customization

To modify colors, edit the RGB values in the `dconf write` commands within the script. Each color is represented as 'rgb(R,G,B)' where R, G, and B are values from 0 to 255.


```bash
#!/bin/bash

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_color() {
    printf "${1}%s${NC}\n" "${2}"
}

# Function to get the current profile UUID
get_profile_uuid() {
    dconf list /org/gnome/terminal/legacy/profiles:/ | grep '^:' | sed 's/://g' | head -n 1
}

# Main setup function
setup_terminal_colors() {
    local PROFILE_UUID=$(get_profile_uuid)

    if [ -z "$PROFILE_UUID" ]; then
        print_color "$RED" "Error: Could not find a GNOME Terminal profile."
        exit 1
    fi

    print_color "$BLUE" "Setting up custom colors for GNOME Terminal profile: $PROFILE_UUID"

    # Disable using colors from system theme
    dconf write /org/gnome/terminal/legacy/profiles:/:$PROFILE_UUID/use-theme-colors false

    # Set foreground and background colors
    dconf write /org/gnome/terminal/legacy/profiles:/:$PROFILE_UUID/foreground-color "'rgb(255,255,255)'"
    dconf write /org/gnome/terminal/legacy/profiles:/:$PROFILE_UUID/background-color "'rgb(0,0,0)'"

    # Set color palette
    dconf write /org/gnome/terminal/legacy/profiles:/:$PROFILE_UUID/palette "['rgb(0,0,0)', 'rgb(255,0,0)', 'rgb(0,255,0)', 'rgb(255,255,0)', 'rgb(0,0,255)', 'rgb(255,0,255)', 'rgb(0,255,255)', 'rgb(255,255,255)', 'rgb(85,85,85)', 'rgb(255,85,85)', 'rgb(85,255,85)', 'rgb(255,255,85)', 'rgb(85,85,255)', 'rgb(255,85,255)', 'rgb(85,255,255)', 'rgb(255,255,255)']"

    print_color "$GREEN" "Custom colors have been set successfully!"
    print_color "$YELLOW" "Please restart GNOME Terminal for the changes to take effect."
}

# Run the setup
setup_terminal_colors
```


# System Cleanup, Including Git, Docker, Containers and home files

This script performs a comprehensive system cleanup and update on a Debian 12 system:

1. Logs installed system and Python packages
2. Updates and upgrades the system
3. Removes unnecessary packages and cleans package cache
4. Updates pip and Poetry (Python package managers)
5. Updates global Python packages
6. Cleans up and reinstalls Git (if installed)
7. Cleans up and reinstalls Docker (if installed)
8. Removes unused Docker containers, images, and volumes
9. Cleans up the user's Home Directory:
   - Removes empty directories
   - Deletes old log files
   - Clears cache and trash

The script includes user confirmations before each major step, allowing for selective execution of cleanup tasks. It also uses color-coded output to clearly indicate successes, warnings, and errors during the process.

```bash
#!/bin/bash

# Define colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print success messages
print_success() {
    echo -e "${GREEN}$1${NC}"
}

# Function to print error messages
print_error() {
    echo -e "${RED}$1${NC}"
}

# Function to print warning messages
print_warning() {
    echo -e "${YELLOW}$1${NC}"
}

# Function to ask for confirmation
confirm() {
    read -p "$1 (y/n) " -n 1 -r
    echo
    [[ $REPLY =~ ^[Yy]$ ]]
}

# Create a directory to store logs
LOG_DIR="$HOME/system_logs"
mkdir -p "$LOG_DIR"

# Step 1: List all installed packages
echo "Listing all installed system packages..."
dpkg --get-selections > "$LOG_DIR/installed_packages_$(date +%Y%m%d).log"
print_success "System packages list saved to $LOG_DIR/installed_packages_$(date +%Y%m%d).log."

# Step 2: Check and list installed Python environments
echo "Checking for installed Python packages..."
if command -v pip3 &> /dev/null; then
    pip3 freeze > "$LOG_DIR/python_packages_$(date +%Y%m%d).log"
    print_success "Python packages list saved to $LOG_DIR/python_packages_$(date +%Y%m%d).log."
else
    print_warning "pip3 is not installed. Skipping Python package listing."
fi

# Step 3: Update and upgrade the system
if confirm "Do you want to update and upgrade the system?"; then
    echo "Updating system..."
    sudo apt update && sudo apt upgrade -y
    print_success "System updated and upgraded."
else
    print_warning "Skipping system update and upgrade."
fi

# Step 4: Remove unnecessary packages
if confirm "Do you want to remove unnecessary packages?"; then
    echo "Removing unnecessary packages..."
    sudo apt autoremove -y
    sudo apt autoclean -y
    print_success "Unused packages removed and system cleaned."
else
    print_warning "Skipping removal of unnecessary packages."
fi

# Step 5: Clean the package cache
if confirm "Do you want to clean the package cache?"; then
    echo "Cleaning package cache..."
    sudo apt clean
    print_success "Package cache cleaned."
else
    print_warning "Skipping package cache cleaning."
fi

# Step 6: Check and update pip
if command -v pip3 &> /dev/null; then
    if confirm "Do you want to update pip?"; then
        echo "Updating pip..."
        python3 -m pip install --upgrade pip
        print_success "pip updated to the latest version."
    else
        print_warning "Skipping pip update."
    fi
else
    print_warning "pip3 is not installed. Skipping pip update."
fi

# Step 7: Check and update Poetry
if command -v poetry &> /dev/null; then
    if confirm "Do you want to update Poetry?"; then
        echo "Updating Poetry..."
        poetry self update
        print_success "Poetry updated to the latest version."
    else
        print_warning "Skipping Poetry update."
    fi
else
    if confirm "Poetry is not installed. Do you want to install it?"; then
        echo "Installing Poetry..."
        curl -sSL https://install.python-poetry.org | python3 -
        print_success "Poetry installed."
    else
        print_warning "Skipping Poetry installation."
    fi
fi

# Step 8: Update global Python packages if pip is available
if command -v pip3 &> /dev/null; then
    if confirm "Do you want to update global Python packages?"; then
        echo "Updating global Python packages..."
        pip3 list --outdated --format=freeze | grep -v '^\-e' | cut -d = -f 1 | xargs -n1 pip3 install -U
        print_success "Global Python packages updated."
    else
        print_warning "Skipping global Python packages update."
    fi
else
    print_warning "pip3 is not installed. Skipping global Python packages update."
fi

# Step 9: Clean up old Git installation (if Git is installed)
if command -v git &> /dev/null; then
    if confirm "Do you want to clean up and reinstall Git?"; then
        echo "Cleaning up Git installation..."
        sudo apt-get remove --purge git -y
        sudo apt-get install git -y
        print_success "Git reinstalled."
    else
        print_warning "Skipping Git cleanup and reinstallation."
    fi
else
    print_warning "Git is not installed. Skipping Git cleanup."
fi

# Step 10: Clean up old Docker installation (if Docker is installed)
if command -v docker &> /dev/null; then
    if confirm "Do you want to clean up and reinstall Docker?"; then
        echo "Cleaning up Docker installation..."
        sudo apt-get remove --purge docker docker-engine docker.io containerd runc -y
        print_success "Old Docker versions removed."

        # Reinstall Docker
        echo "Installing Docker..."
        sudo apt-get install -y \
            apt-transport-https \
            ca-certificates \
            curl \
            gnupg \
            lsb-release

        curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

        echo \
          "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian \
          $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

        sudo apt-get update
        sudo apt-get install -y docker-ce docker-ce-cli containerd.io
        print_success "Docker installed."

        # Step 11: Clean up Docker containers, images, and volumes
        if confirm "Do you want to clean up Docker containers, images, and volumes?"; then
            echo "Cleaning up Docker containers, images, and volumes..."
            docker container prune -f
            print_success "Stopped Docker containers removed."

            docker image prune -a -f
            print_success "Unused Docker images removed."

            docker volume prune -f
            print_success "Unused Docker volumes removed."

            docker network prune -f
            print_success "Unused Docker networks removed."
        else
            print_warning "Skipping Docker cleanup."
        fi
    else
        print_warning "Skipping Docker cleanup and reinstallation."
    fi
else
    print_warning "Docker is not installed. Skipping Docker cleanup and installation."
fi

# Step 12: Clean up Home Directory
if confirm "Do you want to clean up your Home Directory?"; then
    echo "Cleaning up Home Directory..."

    # Delete empty directories
    find "$HOME" -type d -empty -delete
    print_success "Empty directories removed from Home Directory."

    # Delete old log files (modify as needed)
    if confirm "Do you want to delete log files older than 30 days?"; then
        find "$HOME" -type f -name "*.log" -mtime +30 -delete
        print_success "Old log files removed from Home Directory."
    else
        print_warning "Skipping deletion of old log files."
    fi

    # Delete cache and temporary files (be careful with these paths)
    if confirm "Do you want to clean up cache and Trash?"; then
        rm -rf "$HOME/.cache/*"
        rm -rf "$HOME/.local/share/Trash/*"
        print_success "Cache and Trash cleaned up."
    else
        print_warning "Skipping cache and Trash cleanup."
    fi

    echo "Home Directory cleanup completed!"
else
    print_warning "Skipping Home Directory cleanup."
fi

echo "System cleanup and updates completed!"
```
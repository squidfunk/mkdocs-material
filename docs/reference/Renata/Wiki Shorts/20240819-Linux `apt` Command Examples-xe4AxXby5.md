# Linux `apt` Command Examples

## Package Installation and Removal
- `apt install <pkg-name> or <deb-file>`  
  Install a package and its dependencies.

- `apt reinstall <pkg-name>`  
  Reinstall an already installed package.

- `apt remove <pkg-name>`  
  Remove a package but keep its configuration files.

- `apt purge <pkg-name>`  
  Remove a package and its configuration files.

- `apt autoremove`  
  Remove orphaned packages that are no longer needed.

- `apt autoclean`  
  Remove outdated and obsolete packages from package cache.

- `apt clean`  
  Remove all downloaded `.deb` package files from package cache.

## Package Upgrade
- `apt update`  
  Update the package index files.

- `apt upgrade`  
  Upgrade all upgradable packages.

- `apt full-upgrade`  
  Perform upgrade, but with smart conflict resolution.

- `apt dist-upgrade`  
  Same as `apt full-upgrade`.

- `apt-mark hold/unhold <package>`  
  Hold/unhold a package to block or allow upgrade.

## Package Information Query
- `apt show <pkg-name>`  
  Display detailed information about a package.

- `apt depends <pkg-name>`  
  List all packages that a package depends on.

- `apt rdepends <pkg-name>`  
  List all packages that depend on a package.

- `apt list [--installed|--upgradable]`  
  List packages with optional filters.

- `apt list <pkg-name>`  
  List packages whose names are matched with regex.

- `apt search <search-keyword>`  
  Search for packages with a keyword.

## Command Line Options
- `--download-only`  
  Download a package but don't continue installation.

- `--no-download`  
  Don't download and use already downloaded ones.

- `--fix-broken`  
  Try to fix broken dependencies.

- `--simulate`  
  Don't alter the system, but show what the output will be.

- `--assume-no`  
  Answer no to all prompts.

- `-y`  
  Answer yes to all prompts.

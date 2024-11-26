# Pandoc Linux "UbuntuBased"

To install Pandoc on Pop!_OS system-wide, you can download the `.deb` package from the [Pandoc GitHub release page](https://github.com/jgm/pandoc/releases/latest). Then, use the following command to install it:

```bash
sudo dpkg -i path_to_deb_file
```

Afterward, ensure that it is properly installed by running:

```bash
pandoc --version
```
To install the Pandoc `.deb` file you downloaded, use the following commands:

1. Navigate to the download directory:

   ```bash
  cd /home/groot/Downloads
   ```

2. Install the `.deb` package:

   ```bash
   sudo dpkg -i pandoc-3.4-1-amd64.deb
   ```

3. Fix any missing dependencies (if needed):

   ```bash
   sudo apt-get install -f
   ```
4. Check the Verion installed
 ```
pandoc --version
 ```
# Pandoc and Dependencies on Windows



## 1. Basic Installation of Pandoc

1. **Download and Install Pandoc**:
   - Visit the [Pandoc releases page](https://github.com/jgm/pandoc/releases/latest) and download the Windows installer (usually a `.msi` file).
   - Run the installer and follow the on-screen instructions to complete the installation.

2. **Verify Installation**:
   - Open Command Prompt and type:
     ```sh
     pandoc --version
     ```
   - This should display the version of Pandoc you have installed.

## 2. Installing LaTeX for PDF Conversion

To convert documents to PDF, Pandoc requires a LaTeX distribution. Two popular options are MiKTeX and TeX Live.

1. **Install MiKTeX**:
   - Download the MiKTeX installer from the [MiKTeX download page](https://miktex.org/download).
   - Run the installer and follow the instructions. During installation, choose the option to install missing packages on the fly.
   - After installation, open the MiKTeX console and update all packages to ensure you have the latest versions.

## 3. Additional Filters and Plugins

1. **Pandoc-Citeproc**: For handling citations
   - Open Command Prompt and run:
     ```sh
     choco install pandoc-citeproc
     ```
   - If you don't have Chocolatey installed, you can install it by following the instructions on the [Chocolatey installation page](https://chocolatey.org/install).

2. **Pandoc-crossref**: For managing cross-references
   - Open Command Prompt and run:
     ```sh
     choco install pandoc-crossref
     ```

## 4. Syntax Highlighting

1. **Pygments**: For syntax highlighting in code blocks
   - Install Python if it's not already installed. You can download Python from the [official website](https://www.python.org/downloads/).
   - Open Command Prompt and run:
     ```sh
     pip install Pygments
     ```

## 5. Optional Tools and Plugins

1. **Pandoc-fignos**: For numbered figures
   - Download the filter from the [Pandoc-fignos GitHub page](https://github.com/tomduck/pandoc-fignos).
   - Follow the installation instructions provided on the GitHub page.

2. **Pandoc-tablenos**: For numbered tables
   - Download the filter from the [Pandoc-tablenos GitHub page](https://github.com/tomduck/pandoc-tablenos).
   - Follow the installation instructions provided on the GitHub page.

3. **Pandoc-eqnos**: For numbered equations
   - Download the filter from the [Pandoc-eqnos GitHub page](https://github.com/tomduck/pandoc-eqnos).
   - Follow the installation instructions provided on the GitHub page.

## 6. Integrating Pandoc with Editors

1. **VS Code**:
   - Open Visual Studio Code and go to the Extensions view by clicking the square icon in the sidebar or pressing `Ctrl+Shift+X`.
   - Search for and install the "Pandoc" extension.
   - You can configure tasks and shortcuts for easier conversion. For example, add a task in `tasks.json` for converting Markdown to PDF:
     ```json
     {
       "version": "2.0.0",
       "tasks": [
         {
           "label": "Convert Markdown to PDF",
           "type": "shell",
           "command": "pandoc",
           "args": [
             "${file}",
             "-o",
             "${fileDirname}/${fileBasenameNoExtension}.pdf",
             "--pdf-engine=xelatex",
             "--citeproc"
           ],
           "group": {
             "kind": "build",
             "isDefault": true
           }
         }
       ]
     }
     ```

2. **Sublime Text**:
   - Install Package Control if you haven't already.
   - Use Package Control to install the "Pandoc" package.
   - Configure build systems for various conversions.

3. **Atom**:
   - Install the `markdown-preview-plus` package from the Atom package manager.
   - Configure it to use Pandoc for rendering previews.

## 7. Templates and Batch Scripts

1. **Using Templates**:
   - Create or download custom templates for consistent document formatting.
   - Use the `--template` option in your Pandoc commands to apply templates. For example:
     ```sh
     pandoc input.md -o output.pdf --template=mytemplate.tex
     ```

2. **Batch Scripts for Automation**:
   - Create batch scripts to automate frequent conversions. Save the following as `convert.bat`:
     ```cmd
     @echo off
     pandoc %1 -o %2 --pdf-engine=xelatex --citeproc
     ```
   - Run the script by dragging and dropping a Markdown file onto it, or from the Command Prompt:
     ```sh
     convert.bat input.md output.pdf
     ```

# Update to be to be check and added. 

"FIX!!"

### Installing Pandoc and Dependencies on Windows

## 1. Basic Installation of Pandoc

1. **Download and Install Pandoc**:
   - Visit the [Pandoc releases page](https://github.com/jgm/pandoc/releases/latest) and download the Windows installer (usually a `.msi` file).
   - Run the installer and follow the on-screen instructions to complete the installation.

2. **Verify Installation**:
   - Open Command Prompt and type:
     ```sh
     pandoc --version
     ```
   - This should display the version of Pandoc you have installed.

## 2. Installing LaTeX for PDF Conversion

To convert documents to PDF, Pandoc requires a LaTeX distribution. Two popular options are MiKTeX and TeX Live.

1. **Install MiKTeX**:
   - Download the MiKTeX installer from the [MiKTeX download page](https://miktex.org/download).
   - Run the installer and follow the instructions. During installation, choose the option to install missing packages on the fly.
   - After installation, open the MiKTeX console and update all packages to ensure you have the latest versions.

## 3. Installing Pandoc-Citeproc

`pandoc-citeproc` is a filter for Pandoc that processes citations. This is essential for handling bibliographies in various formats.

1. **Download Pandoc-Citeproc**:
   - Go to the [Pandoc releases page](https://github.com/jgm/pandoc/releases/latest).
   - Download the appropriate version of `pandoc-citeproc` for your system.

2. **Extract the Files**:
   - If you download a zip file, extract it to a directory of your choice, for example `C:\pandoc`.

3. **Add to PATH Using PowerShell**:
   - Use the following PowerShell script to add the directory to the system PATH:

     ```powershell
     # Define the path to the directory you want to add to the PATH
     $pathToAdd = "C:\pandoc"

     # Get the current PATH variable
     $existingPath = [System.Environment]::GetEnvironmentVariable("Path", [System.EnvironmentVariableTarget]::Machine)

     # Check if the path is already in the PATH variable
     if ($existingPath.Split(";") -notcontains $pathToAdd) {
         # Add the new path to the PATH variable
         $newPath = "$existingPath;$pathToAdd"
         [System.Environment]::SetEnvironmentVariable("Path", $newPath, [System.EnvironmentVariableTarget]::Machine)
         Write-Output "The path has been successfully added to the system PATH."
     } else {
         Write-Output "The path is already in the system PATH."
     }
     ```

4. **Verify Installation**:
   - Open Command Prompt and type:
     ```sh
     pandoc-citeproc --version
     ```
   - This should display the version of `pandoc-citeproc` you have installed.

## 4. Additional Filters and Plugins

1. **Pandoc-crossref**: For managing cross-references
   - Open Command Prompt and run:
     ```sh
     choco install pandoc-crossref
     ```

## 5. Syntax Highlighting

1. **Pygments**: For syntax highlighting in code blocks
   - Install Python if it's not already installed. You can download Python from the [official website](https://www.python.org/downloads/).
   - Open Command Prompt and run:
     ```sh
     pip install Pygments
     ```

## 6. Optional Tools and Plugins

1. **Pandoc-fignos**: For numbered figures
   - Download the filter from the [Pandoc-fignos GitHub page](https://github.com/tomduck/pandoc-fignos).
   - Follow the installation instructions provided on the GitHub page.

2. **Pandoc-tablenos**: For numbered tables
   - Download the filter from the [Pandoc-tablenos GitHub page](https://github.com/tomduck/pandoc-tablenos).
   - Follow the installation instructions provided on the GitHub page.

3. **Pandoc-eqnos**: For numbered equations
   - Download the filter from the [Pandoc-eqnos GitHub page](https://github.com/tomduck/pandoc-eqnos).
   - Follow the installation instructions provided on the GitHub page.

## 7. Integrating Pandoc with Editors

1. **VS Code**:
   - Open Visual Studio Code and go to the Extensions view by clicking the square icon in the sidebar or pressing `Ctrl+Shift+X`.
   - Search for and install the "Pandoc" extension.
   - You can configure tasks and shortcuts for easier conversion. For example, add a task in `tasks.json` for converting Markdown to PDF:
     ```json
     {
       "version": "2.0.0",
       "tasks": [
         {
           "label": "Convert Markdown to PDF",
           "type": "shell",
           "command": "pandoc",
           "args": [
             "${file}",
             "-o",
             "${fileDirname}/${fileBasenameNoExtension}.pdf",
             "--pdf-engine=xelatex",
             "--citeproc"
           ],
           "group": {
             "kind": "build",
             "isDefault": true
           }
         }
       ]
     }
     ```

2. **Sublime Text**:
   - Install Package Control if you haven't already.
   - Use Package Control to install the "Pandoc" package.
   - Configure build systems for various conversions.

3. **Atom**:
   - Install the `markdown-preview-plus` package from the Atom package manager.
   - Configure it to use Pandoc for rendering previews.

## 8. Templates and Batch Scripts

1. **Using Templates**:
   - Create or download custom templates for consistent document formatting.
   - Use the `--template` option in your Pandoc commands to apply templates. For example:
     ```sh
     pandoc input.md -o output.pdf --template=mytemplate.tex
     ```

2. **Batch Scripts for Automation**:
   - Create batch scripts to automate frequent conversions. Save the following as `convert.bat`:
     ```cmd
     @echo off
     pandoc %1 -o %2 --pdf-engine=xelatex --citeproc
     ```
   - Run the script by dragging and dropping a Markdown file onto it, or from the Command Prompt:
     ```cmd
     convert.bat input.md output.pdf
     ```



``` PowerShell
# PowerShell script to install Pandoc, MiKTeX, pandoc-citeproc, pandoc-crossref, and Pygments

# Function to download and install Pandoc
function Install-Pandoc {
    $pandocUrl = "https://github.com/jgm/pandoc/releases/download/2.11.4/pandoc-2.11.4-windows-x86_64.msi"
    $pandocInstaller = "$env:USERPROFILE\Downloads\pandoc-2.11.4-windows-x86_64.msi"
    Invoke-WebRequest -Uri $pandocUrl -OutFile $pandocInstaller
    Start-Process msiexec.exe -ArgumentList "/i $pandocInstaller /quiet" -Wait
    Remove-Item $pandocInstaller
}

# Function to download and install MiKTeX
function Install-MiKTeX {
    $miktexUrl = "https://miktex.org/download/ctan/systems/win32/miktex/setup/basic-miktex-x64.exe"
    $miktexInstaller = "$env:USERPROFILE\Downloads\basic-miktex-x64.exe"
    Invoke-WebRequest -Uri $miktexUrl -OutFile $miktexInstaller
    Start-Process $miktexInstaller -ArgumentList "/SILENT" -Wait
    Remove-Item $miktexInstaller
}

# Function to add a path to the system PATH variable
function Add-ToPath {
    param (
        [string]$newPath
    )
    $existingPath = [System.Environment]::GetEnvironmentVariable("Path", [System.EnvironmentVariableTarget]::Machine)
    if ($existingPath.Split(";") -notcontains $newPath) {
        $newPath = "$existingPath;$newPath"
        [System.Environment]::SetEnvironmentVariable("Path", $newPath, [System.EnvironmentVariableTarget]::Machine)
        Write-Output "Added $newPath to the system PATH."
    } else {
        Write-Output "$newPath is already in the system PATH."
    }
}

# Install Chocolatey if not already installed
if (-not (Get-Command choco -ErrorAction SilentlyContinue)) {
    Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
}

# Function to install packages via Chocolatey
function Install-ChocoPackage {
    param (
        [string]$packageName
    )
    choco install $packageName -y
}

# Install Pandoc, MiKTeX, pandoc-citeproc, pandoc-crossref, and Pygments
Install-Pandoc
Install-MiKTeX
Install-ChocoPackage "pandoc-crossref"
Install-ChocoPackage "python"
pip install Pygments

# Add pandoc to PATH
Add-ToPath "C:\Program Files\Pandoc"

Write-Output "Installation completed successfully. Please restart your computer to apply changes to the PATH."
```

### How to Run the Script

1. **Open PowerShell as Administrator**:

   - Press `Win + X` and select `Windows PowerShell (Admin)`.

2. **Copy and Paste the Script**:

   - Copy the entire script above and paste it into the PowerShell window.

3. **Run the Script**:

   - Press `Enter` to execute the script. The script will handle the downloading and installation of the necessary components.

4. **Restart Your Computer**:

   - Once the script completes, restart your computer to ensure all PATH changes take effect.

> This script will install Pandoc, MiKTeX, `pandoc-citeproc`, `pandoc-crossref`, and Pygments, and add Pandoc to your system PATH. It also installs Python, required for Pygments, via Chocolatey.
>

![B1C5F5B2-FFBF-4586-96FE-2C84DE524E9A](5nArHqFC_-B1C5F5B2-FFBF-4586-96FE-2C84DE524E9A.jpg)

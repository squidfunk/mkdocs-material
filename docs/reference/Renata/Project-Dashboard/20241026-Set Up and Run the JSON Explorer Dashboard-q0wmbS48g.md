# Set Up and Run the JSON Explorer Dashboard

Set Up and Run the JSON Explorer Dashboard

This professional guide details the steps for setting up and running the **JSON Explorer Dashboard**. This dashboard allows users to explore and download JSON files from a local directory, utilizing a simple and efficient webpage interface.

## Step 1: Set Up the Directory Structure

1. **Create the Main Directory**: Create a folder named `JsonRoot` on your machine.
2. **Add a JSON Folder**: Inside `JsonRoot`, create another folder named `json` to store all your JSON files.
3. **Add JSON Files**: Place your JSON files (e.g., `example.json`, `data.json`) into the `json` folder.
4. **Save the HTML File**: Save the `JSON Explorer Dashboard.html` file provided in the `JsonRoot` folder.

Your directory should look as follows:

```
JsonRoot/
  ├── json/
  │    ├── example.json
  │    ├── data.json
  ├── JSON_Explorer_Dashboard.html
```

## Step 2: Start a Local HTTP Server

To view the webpage, you need a local HTTP server. This step is necessary because modern browsers restrict JavaScript from accessing local files directly due to security concerns.

### Option 1: Using Python

If Python is installed, start a local server with the following steps:

1. **Open Terminal**: Launch a terminal or command prompt.
2. **Navigate to ****`JsonRoot`**: Use the `cd` command to change to your `JsonRoot` directory:
   ```bash
   cd path/to/JsonRoot
   ```
3. **Start the Server**: Execute the following command:
   ```bash
   python -m http.server 8000
   ```
   This will start the server at `http://localhost:8000`.

### Option 2: Using Node.js (Alternative)

If you have Node.js installed, you can use the `http-server` package:

1. **Install HTTP Server**: Run:
   ```bash
   npm install -g http-server
   ```
2. **Start the Server**: In the `JsonRoot` directory, run:
   ```bash
   http-server
   ```

## Step 3: Open the JSON Explorer Dashboard

1. **Open a Web Browser**: Launch your preferred web browser.
2. **Navigate to the URL**:
   ```
   http://localhost:8000/JSON_Explorer_Dashboard.html
   ```
3. **View the Dashboard**: The **JSON Explorer Dashboard** will load, displaying all JSON files present in the `json` folder.

## Step 4: Explore and Download JSON Files

- The dashboard automatically lists all JSON files in the `json` folder.
- JSON content is displayed in a formatted, easy-to-read manner.
- A **Download** button is available for each file, allowing you to download it directly to your computer.

## Step 5: Add or Update JSON Files

- **Add New Files**: Place new JSON files into the `json` folder.
- **Refresh the Page**: Reload the webpage to view the newly added files.
- This flexible setup allows easy updates to the dashboard content.

## JSON Explorer Dashboard HTML Code

save the following code as `JSON_Explorer_Dashboard.html` in your `JsonRoot` folder:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JSON Explorer Dashboard</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.3/css/bulma.min.css">
    <script>
        async function loadJSONFiles() {
            try {
                // Fetch all JSON files from the local JSON folder
                const response = await fetch('./json');
                if (!response.ok) {
                    throw new Error('Could not load JSON files. Ensure the directory listing is accessible.');
                }
                const files = await response.json();
                const container = document.getElementById('json-container');
                container.innerHTML = '';
                
                files.forEach(async (file) => {
                    const filePath = `./json/${file}`;
                    try {
                        const fileResponse = await fetch(filePath);
                        if (!fileResponse.ok) {
                            throw new Error(`Could not load file: ${file}`);
                        }
                        const fileContent = await fileResponse.json();
                        const fileContainer = document.createElement('div');
                        fileContainer.classList.add('box', 'json-container');
                        
                        const pre = document.createElement('pre');
                        pre.classList.add('json-box');
                        pre.innerHTML = `<strong>${file}</strong>\n\n${JSON.stringify(fileContent, null, 2)}`;
                        fileContainer.appendChild(pre);

                        // Add download button for each JSON file
                        const downloadButton = document.createElement('button');
                        downloadButton.classList.add('button', 'is-info', 'is-small');
                        downloadButton.innerText = 'Download';
                        downloadButton.onclick = () => downloadJSON(fileContent, file);
                        fileContainer.appendChild(downloadButton);

                        container.appendChild(fileContainer);
                    } catch (fileError) {
                        console.error('Error loading individual JSON file:', fileError);
                    }
                });
            } catch (error) {
                console.error('Error loading JSON files:', error);
            }
        }

        // Function to download a JSON file
        function downloadJSON(content, fileName) {
            const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = fileName;
            link.click();
        }

        // Runs the function when the page loads
        document.addEventListener('DOMContentLoaded', loadJSONFiles);
    </script>
    <style>
        .json-box {
            overflow-x: auto;
            margin-bottom: 10px;
            max-height: 400px;
        }
        .json-container {
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <section class="section">
        <div class="container">
            <h1 class="title">JSON Explorer Dashboard</h1>
            <h2 class="subtitle">Explore JSON files in the local directory</h2>
            <div id="json-container" class="content">
                <!-- JSON Files content will be dynamically added here -->
            </div>
        </div>
    </section>
</body>
</html>
```

## Dependencies (Windows Specific)

To successfully set up and run the JSON Explorer Dashboard on Windows, ensure you have the following dependencies installed:

1. **Python**:

   - **Version**: Python 3.x
   - **Installation**: [Download from Python.org](https://www.python.org/downloads/)
   - **Add to PATH**: During installation, add Python to your system PATH for easy terminal access.

2. **Node.js** (Optional, for alternative server setup):

   - **Version**: Latest stable version
   - **Installation**: [Download from Node.js](https://nodejs.org/)
   - **HTTP Server**: After installation, run `npm install -g http-server` to install the HTTP server package.

3. **Web Browser**:

   - **Recommended**: Use the latest version of Chrome, Firefox, or Edge for the best experience.

4. **Text Editor** (for modifying HTML or JSON files):

   - **Recommended**: Visual Studio Code (VS Code) for advanced editing capabilities. Alternatively, use Sublime Text or Notepad++.

Ensure all dependencies are properly installed and configured. If you encounter any issues, verify that the local server is running correctly and confirm that PATH variables are correctly set.


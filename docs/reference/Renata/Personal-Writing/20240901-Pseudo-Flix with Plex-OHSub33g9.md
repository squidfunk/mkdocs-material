# Pseudo-Flix with Plex

## Introduction
This document provides a comprehensive guide on how to set up Pseudo-Flix on a macOS server and integrate it with Plex Media Server. Pseudo-Flix is a powerful media streaming application that can enhance your Plex experience. By following these step-by-step instructions, you'll be able to run Pseudo-Flix on your local server and seamlessly integrate it with your existing Plex setup.

## Prerequisites
Before proceeding with the installation, ensure that your macOS server meets the following requirements:
- macOS operating system (preferably the latest version)
- Homebrew package manager installed
- Plex Media Server installed and set up

## Step 1: Install Required Software
1. Open Terminal on your macOS server.
2. Install Node.js and Git using Homebrew by running the following command:
   ```
   brew install node git
   ```
3. Install pnpm globally using npm:
   ```
   npm install -g pnpm
   ```

## Step 2: Clone the Pseudo-Flix Repository
1. In Terminal, navigate to the directory where you want to download Pseudo-Flix.
2. Clone the Pseudo-Flix repository by running the following command:
   ```
   git clone https://github.com/sussy-code/smov.git
   ```
3. Navigate to the cloned repository directory:
   ```
   cd smov
   ```

## Step 3: Install Dependencies
1. Inside the Pseudo-Flix directory, run the following command to install the required dependencies:
   ```
   pnpm install
   ```

## Step 4: Configure the Application
1. Create a `.env` file in the project directory.
2. Open the `.env` file in a text editor and add the following lines:
   ```
   PORT=5173
   NODE_ENV=production
   API_KEY=your_api_key_here
   ```
   Replace `your_api_key_here` with the appropriate API key if required.
3. Save the `.env` file.

## Step 5: Run Pseudo-Flix on Your Local Server
1. To start the development server, run the following command:
   ```
   pnpm run dev
   ```
   This will start the application locally on `http://localhost:5173`.
2. Optionally, if you want to run the application in production mode, build it first using the following command:
   ```
   pnpm run build
   ```
   Then, start the production server:
   ```
   pnpm start
   ```

## Step 6: Integrate with Plex
1. Open Plex Media Server in a web browser.
2. Go to Settings > Libraries and click on "Add Library".
3. Select the appropriate library type (e.g., Movies, TV Shows) that matches the content type from Pseudo-Flix.
4. In the "Add Folders" step, browse and select the folder where Pseudo-Flix stores its media content. This folder should be accessible by Plex.
5. Ensure that your media files are organized in a format that Plex can recognize. For example:
   ```
   Movies/
   ├── MovieName (Year)/
   │   └── MovieName (Year).mp4
   TV Shows/
   ├── ShowName/
   │   ├── Season 01/
   │   │   └── ShowName - s01e01.mp4
   ```
6. After adding the library, go to Settings > Manage > Libraries and click on the three dots next to your newly added library. Choose "Scan Library Files" to allow Plex to index and recognize the new media files.

## Step 7: Troubleshoot and Maintain
- If you encounter any issues or need further assistance, refer to the Sudo-Flix Community Documentation or join the Pseudo-Flix Discord channel for community support.
- To keep your Pseudo-Flix instance up to date, regularly update it by running the following commands in the project directory:
  ```
  git fetch upstream
  git merge upstream/main
  ```
  Resolve any conflicts that may arise during the merge process.

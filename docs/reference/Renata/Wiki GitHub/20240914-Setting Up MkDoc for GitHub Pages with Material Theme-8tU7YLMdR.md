# Setting Up MkDoc for GitHub Pages with Material Theme


## Step 1: Create a Private Repository on GitHub

1. Go to [GitHub](https://github.com).
2. Click the "+" icon in the upper-right corner and select "New repository."
3. Name your repository (e.g., `knowledge-base`).
4. Choose the "Private" option.
5. Click "Create repository."


### **MkDocs with Material Theme Setup**


This guide will help you create a knowledge base website using MkDocs and the Material theme, and host it on GitHub Pages.

## Step 1: Create a Private Repository on GitHub

1. Go to [GitHub](https://github.com).
2. Click the "+" icon in the upper-right corner and select "New repository."
3. Name your repository (e.g., `knowledge-base`).
4. Choose the "Private" option.
5. Click "Create repository."

## Step 2: Install MkDocs and MkDocs-Material

1. Install Python if it is not already installed. Download it from [python.org](https://www.python.org/downloads/).
2. Open a terminal or command prompt.
3. Install MkDocs and the Material theme using `pip`:
   ```sh
   pip install mkdocs
   pip install mkdocs-material

Step 3: Create a MkDocs Site

1. In your terminal, create a new MkDocs project:

mkdocs new my-knowledge-base
cd my-knowledge-base


2. This creates a new MkDocs site in a folder called my-knowledge-base.



Step 4: Customize MkDocs Configuration

1. Open the mkdocs.yml file in a text editor.


2. Change the site_name to your desired title.


3. Enable the Material theme by adding the following:



site_name: "My Knowledge Base"
theme:
  name: "material"

Step 5: Add Your Markdown Files

1. Place your Markdown files in the docs directory.


2. Update the mkdocs.yml file to reflect your navigation structure:



nav:
  - Home: index.md
  - Topic 1: topic1.md
  - Topic 2: topic2.md

Step 6: Preview Your Site Locally

1. Run the MkDocs development server:

mkdocs serve


2. Open http://127.0.0.1:8000/ in your browser to preview the site.



Step 7: Deploy MkDocs Site to GitHub Pages

1. Build the MkDocs site:

mkdocs build

This will generate a site directory with the built static files.


2. Deploy to GitHub Pages using MkDocs’ built-in deployment tool:

mkdocs gh-deploy --remote-branch main



Step 8: Configure GitHub Pages

1. Go to your repository on GitHub.


2. Click "Settings" > "Pages."


3. Select the branch (gh-pages) and click "Save."


4. Your site will be live at https://your-username.github.io/your-repository.



Step 9: Keep Your Site Updated

1. To update your site, make changes to your Markdown files in the docs directory.


2. Commit the changes and redeploy using:

mkdocs gh-deploy --remote-branch main



Your MkDocs site with Material theme is now set up and hosted on GitHub Pages!

---

You can copy and paste these Markdown instructions into your own documents or directly into your GitHub repository to guide others or yourself in setting up a Jekyll or MkDocs-based knowledge base. Let me know if you need further customization or details!


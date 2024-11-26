# Basic Github Document System

To create a knowledge base on GitHub using Jekyll or MkDocs with the Material theme, here’s a step-by-step guide for both approaches.

Option 1: Using Jekyll for GitHub Pages

Jekyll is a static site generator that integrates directly with GitHub Pages, making it easy to convert your Markdown files into a static website.

Step-by-Step Guide to Set Up Jekyll:

1. Create a Private GitHub Repository:

Go to GitHub.

Click the "+" icon and select "New repository."

Name your repository, select "Private," and click "Create repository."



2. Install Jekyll Locally:

Jekyll requires Ruby. Install Ruby and then install Jekyll and Bundler using these commands:

gem install jekyll bundler



3. Create a Jekyll Site Locally:

Open a terminal and navigate to your desired directory.

Run:

jekyll new my-knowledge-base
cd my-knowledge-base

This creates a new Jekyll site in a folder called my-knowledge-base.



4. Customize Your Jekyll Site:

Open _config.yml and edit basic settings like title, description, etc.

Add Markdown files to the _posts directory or create custom folders for them.



5. Install a Jekyll Theme (Optional):

Add a theme by editing _config.yml:

theme: jekyll-theme-minimal

Replace jekyll-theme-minimal with any other Jekyll theme you prefer.



6. Test the Site Locally:

Run:

bundle exec jekyll serve

Open http://localhost:4000 in your browser to see your site.



7. Push Your Jekyll Site to GitHub:

Initialize a Git repository:

git init
git remote add origin https://github.com/your-username/your-repository.git
git add .
git commit -m "Initial Jekyll site"
git push -u origin main

Make sure to replace your-username and your-repository with your GitHub details.



8. Configure GitHub Pages:

Go to your repository on GitHub.

Click "Settings" > "Pages."

Under "Source," select the branch (main) and click "Save."

Your site will be live at https://your-username.github.io/your-repository.




Option 2: Using MkDocs with Material Theme

MkDocs is a static site generator geared towards project documentation. The Material for MkDocs theme is a popular choice for creating visually appealing documentation sites.

Step-by-Step Guide to Set Up MkDocs with Material Theme:

1. Create a Private GitHub Repository:

Same as the Jekyll setup, create a new private repository on GitHub.



2. Install MkDocs and MkDocs-Material Locally:

Install Python if not already installed.

Use pip to install MkDocs and the Material theme:

pip install mkdocs
pip install mkdocs-material



3. Create a MkDocs Site Locally:

In your terminal, create a new MkDocs project:

mkdocs new my-knowledge-base
cd my-knowledge-base



4. Customize the MkDocs Configuration:

Open mkdocs.yml in a text editor.

Change the site_name to your desired title.

Enable the Material theme:

site_name: My Knowledge Base
theme:
  name: material



5. Add Your Markdown Files:

Place your Markdown files in the docs directory.

Update the mkdocs.yml file to reflect your navigation structure:

nav:
  - Home: index.md
  - Topic 1: topic1.md
  - Topic 2: topic2.md



6. Preview Your Site Locally:

Run the MkDocs development server:

mkdocs serve

Open http://127.0.0.1:8000/ in your browser to preview.



7. Deploy Your MkDocs Site to GitHub Pages:

In your terminal, build the MkDocs site:

mkdocs build

This creates a site directory with the generated files.



8. Push the MkDocs Site to GitHub:

Use MkDocs’ built-in deployment command to push to GitHub Pages:

mkdocs gh-deploy --remote-branch main

Make sure to configure your GitHub repository to use the gh-pages branch for GitHub Pages (in the repository settings).




Additional Tips:

Jekyll or MkDocs? Use Jekyll if you prefer GitHub's built-in support and a more blog-like structure. Use MkDocs with Material for a more robust, search-friendly documentation site.

Version Control: Both approaches let you use Git for version control, allowing collaboration and rollback of changes.

Search and Navigation: MkDocs with Material offers better built-in search and navigation options, making it ideal for larger documentation sites.



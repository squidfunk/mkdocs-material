# Setting Up Jekyll for GitHub Pages

## Step 1: Create a Private Repository on GitHub

1. Go to [GitHub](https://github.com).
2. Click the "+" icon in the upper-right corner and select "New repository."
3. Name your repository (e.g., `knowledge-base`).
4. Choose the "Private" option.
5. Click "Create repository."

## Step 2: Install Jekyll Locally

Jekyll requires Ruby. Follow these steps to install Ruby, Jekyll, and Bundler:

1. **Install Ruby:**
   - For macOS, use Homebrew:
     ```sh
     brew install ruby
     ```
   - For Windows, download RubyInstaller from [rubyinstaller.org](https://rubyinstaller.org/).
   - For Linux, use your distribution's package manager (e.g., `sudo apt-get install ruby`).

2. **Install Jekyll and Bundler:**
   ```sh
   gem install jekyll bundler

Step 3: Create a New Jekyll Site

1. Open a terminal.


2. Run the following commands to create a new Jekyll site:

jekyll new my-knowledge-base
cd my-knowledge-base



Step 4: Customize Your Jekyll Site

1. Open the _config.yml file in your project directory.


2. Edit basic settings like title, description, author, and more.



Example _config.yml:

title: "My Knowledge Base"
description: "A collection of useful knowledge and resources."
author: "Your Name"
theme: jekyll-theme-minimal

3. Add your Markdown files to the root directory or create custom folders for them.



Step 5: Install a Jekyll Theme (Optional)

1. To install a theme, add the theme to _config.yml:

theme: jekyll-theme-minimal

Replace jekyll-theme-minimal with your desired theme.



Step 6: Test Your Site Locally

1. In the terminal, run:

bundle exec jekyll serve


2. Open http://localhost:4000 in your browser to preview your site.



Step 7: Push Your Jekyll Site to GitHub

1. Initialize a Git repository:

git init
git remote add origin https://github.com/your-username/your-repository.git
git add .
git commit -m "Initial Jekyll site"
git push -u origin main

Replace your-username and your-repository with your GitHub details.



Step 8: Configure GitHub Pages

1. Go to your repository on GitHub.


2. Click "Settings" > "Pages."


3. Under "Source," select the branch (main) and click "Save."


4. Your site will be live at https://your-username.github.io/your-repository.



Step 9: Keep Your Site Updated

1. To update your site, make changes to your Markdown files locally.


2. Commit and push the changes to the GitHub repository:

git add .
git commit -m "Update knowledge base"
git push origin main



Your Jekyll site is now set up and hosted on GitHub Pages!

---


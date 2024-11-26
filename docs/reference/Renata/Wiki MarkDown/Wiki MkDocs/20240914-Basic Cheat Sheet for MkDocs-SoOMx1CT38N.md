# Basic Cheat Sheet for MkDocs



## What is MkDocs?

MkDocs is a static site generator designed specifically for project documentation written in Markdown. It allows easy management and display of documentation in a reader-friendly format.

## 1. Installation

- **Install Python:**
  - Ensure that Python is installed (Python 3.6 or higher).

- **Install MkDocs:**
  - Install MkDocs using the following command:
  ```bash
  pip install mkdocs
  ```

## 2. Create a Project

- **Create a New MkDocs Project:**
  - Create a new project with:
  ```bash
  mkdocs new my-project
  ```
  - Navigate into the project directory:
  ```bash
  cd my-project
  ```

## 3. Preview the Documentation

- **Start Local Preview:**
  - Start the local development server with:
  ```bash
  mkdocs serve
  ```
  - Open `http://127.0.0.1:8000/` in your browser to view the preview.

## 4. Publish

- **Build and Publish the Documentation:**
  - Build a static version of the site:
  ```bash
  mkdocs build
  ```
  - The generated site will be located in the `site` directory.

## 5. Tips for Beginners

- **Learn Markdown:**
  - Use basic Markdown syntax to create pages and format content.
- **Customize Themes:**
  - Choose a theme from the MkDocs documentation to change the appearance of your site.

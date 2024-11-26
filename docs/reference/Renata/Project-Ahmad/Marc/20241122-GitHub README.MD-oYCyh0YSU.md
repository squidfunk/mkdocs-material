# GitHub README.MD

# Training Environment Setup & Collaboration Guide

## 📚 Overview

Welcome to your training repository, Ahmad! This repository is here to provide you with all the resources, exercises, and collaboration tools needed to support your journey. Whether you are working independently or we are collaborating directly, everything here is designed to help you succeed and build your skills step by step.

Cheers,
Marc

## 🚀 Project Overview

We are focusing on the **Project Ahmad Kanban**, which serves as a central management tool to track our progress effectively. You can access the project board [here](https://github.com/users/mostrub/projects/14/views/1). Use the Kanban board to view your tasks, manage ongoing projects, and keep everything on track.

## 🔑 Repository Access & Forking

### Fork the Repository

Follow these steps to access and work with the repository:

1. Visit the [Project Ahmad Repository](https://github.com/mostrub/ProjectAhmad).
2. Click the **"Fork"** button in the top-right corner to create a copy under your GitHub account.
3. Select your account to fork the repository.

### Project Board Access

The **Project Ahmad Kanban** will be available to track all tasks:

- You'll maintain access to view and update tasks on the board.
- All project automation will be maintained with the original board.

### Working with Your Fork

To start working with your forked repository:

1. **Clone your forked repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/ProjectAhmad.git
   cd ProjectAhmad
   ```
2. **Add the original repository as an upstream remote:**
   ```bash
   git remote add upstream https://github.com/mostrub/ProjectAhmad.git
   ```
3. **Verify the remotes:**
   ```bash
   git remote -v
   ```

### Staying Updated

To keep your fork updated with the latest changes:

1. Fetch updates from the original repository:
   ```bash
   git fetch upstream
   ```
2. Merge updates into your main branch:
   ```bash
   git merge upstream/main
   ```

## 🛠️ Tools & Technologies

### Primary Collaboration Tools

- **Microsoft Teams** - Main platform for communication and video calls.
- **GitHub** - Version control and project management.
- **Visual Studio Code** - Primary development environment.

### GitHub Features We Use

- **📋 Project Boards** - Task management for tracking ongoing and future work.
- **🔄 GitHub Actions** - Automation for testing, linting, and deploying.
- **🌐 GitHub Pages** - Host documentation and project portfolios.
- **💬 Discussions** - Community-driven Q&A and collaboration.

### 🤖 Kanban Automation

We've implemented automated Kanban board management for streamlined task flow:

- View our **Project Ahmad Kanban** for status updates.
- Automated task movement across board columns.
- GitHub GraphQL API integration for better management.

### Using the Automation Tool

To set up the automation tool:

1. Navigate to the **kanban-automation** directory.
2. Set up your environment:
   ```bash
   cp .env.example .env
   # Add your GitHub token to .env
   ```
3. Install dependencies and run the automation script:
   ```bash
   npm install
   npm start
   ```

## 💻 Development Environment Setup

### VS Code Configuration

**Important:** Ahmad, follow these steps to configure VS Code:

1. Close VS Code completely.
2. Navigate to the `vscode-setup` folder.
3. Run the PowerShell script:
   - Right-click on the script and select **"Run as administrator"**, or
   - Open PowerShell as administrator and execute:
     ```bash
     .\setup-vscode.ps1
     ```
4. This will install all required settings and plugins automatically.

### Repository Structure

```
training-repo/
├── phase1_initial_setup/
│   ├── setup_instructions.md
│   ├── live_meeting_notes.md
│   └── month1_notes.md
├── phase2_systems_engineering/
│   ├── networking_fundamentals.md
│   ├── it_infrastructure.md
│   └── progress_documentation/
│       ├── month2_notes.md
│       ├── month3_notes.md
│       ├── month4_notes.md
│       └── ...
├── phase3_python_basics/
│   ├── calculator_project/
│   │   ├── calculator.py
│   │   └── README.md
│   ├── web_scraper_project/
│   │   ├── scraper.py
│   │   └── README.md
│   ├── automation_scripts/
│   │   ├── script1.py
│   │   └── script2.py
│   └── progress_documentation/
│       ├── month5_notes.md
│       ├── month6_notes.md
│       ├── month7_notes.md
│       ├── month8_notes.md
│       └── ...
├── phase4_technical_writing/
│   ├── project_documentation/
│   │   ├── readme_template.md
│   │   ├── function_documentation.md
│   │   └── tutorial_guide.md
│   ├── github_pages_site/
│   │   ├── index.html
│   └── progress_documentation/
│       ├── month9_notes.md
│       ├── month10_notes.md
│       └── ...
├── phase5_professional_development/
│   ├── linkedin_optimization.md
│   ├── github_project_curation.md
│   ├── capstone_project/
│   │   ├── capstone.py
│   │   ├── README.md
│   └── progress_documentation/
│       ├── month11_notes.md
│       ├── month12_notes.md
│       └── ...
├── phase6_kanban_automation/
│   ├── kanban_automation.md
│   ├── automation_scripts/
│   │   ├── kanban_script1.py
│   │   └── kanban_script2.py
│   └── progress_documentation/
│       ├── month13_notes.md
│       ├── month14_notes.md
│       └── ...
├── .github/
│   ├── workflows/
│   │   ├── linting.yml
│   │   ├── tests.yml
│   │   └── ...
├── README.md
└── GitHub-Pages/
    ├── index.html
    └── ...
```

## 🚀 Getting Started

1. **Clone the Repository**
   ```bash
   git clone https://github.com/mostrub/ProjectAhmad.git
   cd ProjectAhmad
   ```

## 📝 Documentation Guidelines

- Use Markdown for all documentation.
- Follow the templates in `phase4_technical_writing/`.
- Include clear, descriptive commit messages.
- Always update documentation alongside code changes.

## 🤝 Collaboration Features

### VS Code Live Share

- **Real-Time Coding**: Collaborate live, share terminals, and provide instant feedback.
- **Pair Programming**: Use Live Share for coding sessions with the mentor.

### GitHub Integration

- **Automated Workflows** via **GitHub Actions**: Continuous integration, testing, and deployment.
- **Project Boards**: Keep track of assignments and milestones.
- **Code Review Process**: Submit pull requests for mentor feedback.

## 🔒 Repository Permissions

- **Read Access**: Available to all participants for reviewing code.
- **Write Access**: Granted for specific sections within the training area.
- **Protected Branches**: The `main` branch is protected and requires mentor review for pull requests.

## 🌳 Branching Strategy

- **`main`** - Stable, production-ready code.
- **`develop`** - Integration of ongoing development work.
- **`feature/*`** - New features in progress.
- **`bugfix/*`** - Addressing reported issues.
- **`release/*`** - Preparation for new releases.
- **`hotfix/*`** - Quick fixes for production issues.

## 📏 Coding Standards

### Python

- Follow **PEP 8** style guidelines.
- Keep line length to a maximum of **88 characters**.
- **Use Type Hints** for all functions and methods.
- Document functions thoroughly using **docstrings**.

### Documentation

- Use **British English** for consistency.
- Adhere to the **Microsoft Writing Style Guide**.
- Include practical **code examples** where applicable.
- Ensure all **headings** are in **Title Case**.

---

_For more information, visit our [GitHub Pages site](https://mostrub.github.io/ProjectAhmad/) or reach out via LinkedIn._

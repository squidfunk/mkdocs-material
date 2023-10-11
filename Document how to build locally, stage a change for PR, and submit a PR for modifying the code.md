Documenting the Global Packages Needed to Be Installed
Before you can start modifying the code and submitting a PR, you'll need to have certain global packages installed on your system. These typically include Node.js and package managers like npm or yarn. You can document the required global packages like this:

Node.js: Ensure you have Node.js installed. You can download it from the official website: Node.js. Verify the installation using node -v and npm -v.

Package Manager: You'll need a package manager to install project dependencies. The two most common options are npm (comes with Node.js) and yarn. Install yarn with npm install -g yarn if you prefer it.

Explaining the Targets to Run for Local Modifications
The next step is to explain the targets you need to run to make local modifications to the code:

Clone the Repository: Start by cloning the project repository to your local machine using git clone <repository-url>.

Install Dependencies: Navigate to the project directory and run yarn install or npm install to install the project's dependencies.

Local Development: Most projects have a development server. You can typically start it using a command like yarn start or npm start. This command will run the project locally, and you can make modifications and see them in real-time by accessing the development server in your web browser.

Make Your Code Changes: Modify the code according to your requirements. In your case, you're adding a stroke width to text on social cards.

Test Locally: Test your changes locally to ensure they work as expected by using the development server. Make any necessary adjustments until you're satisfied with the results.

Providing Instructions on How to Submit a PR Without Many Deltas
When you're ready to submit a Pull Request (PR) with your changes, you can follow these steps:

Create a New Branch: Create a new branch for your changes using git checkout -b feature/your-branch-name.

Commit Your Changes: Commit your changes with descriptive commit messages. Use git commit -m "Description of the change".

Push Your Branch: Push your branch to the remote repository using git push origin feature/your-branch-name.

Create a PR: Visit the project's repository on GitHub (or your chosen version control platform). You should see an option to create a new PR. Provide a clear title and description for your PR, explaining the purpose of your changes.

Review and Resolve Conflicts: If there are any conflicts with the main branch, resolve them. This may require communication and collaboration with other contributors.

Rebase Your Branch: To minimize deltas, rebase your branch on the latest changes from the main branch using git rebase main.

Push Changes: After rebasing, push your changes again with git push origin feature/your-branch-name.

Clarifying Whether the material/ Directory Needs to Be Removed Before Submitting a PR
The material/ directory is likely a part of the project structure. Generally, you do not need to remove this directory when submitting a PR. However, it's essential to make sure that your changes do not interfere with or modify files within the material/ directory unless specifically required for your modification.

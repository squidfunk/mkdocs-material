# Getting started with Visual Studio Code

* Source: <https://code.visualstudio.com/docs/getstarted/getting-started>

In this article Prerequisites (#\_prerequisites)

[Edit](https://vscode.dev/github/microsoft/vscode-docs/blob/main/docs/getstarted/getting-started.md "Edit this document in vscode.dev")

# Tutorial: Get started with Visual Studio Code

In this tutorial, you learn about the key features of Visual Studio Code to help you get started with coding quickly. You learn about the different components of the user interface and how to customize it to your liking. You then write some code and use the built-in code editing features, such as IntelliSense and Code Actions, and you learn about running and debugging your code. By installing a language extension, you add support for a different programming language.

[Getting Started with Visual Studio Code](https://www.youtube-nocookie.com/embed/B-s71n0dHUk?autoplay=true)

## [Prerequisites](https://code.visualstudio.com/docs/getstarted/getting-started#\_prerequisites)

* [Download and install Visual Studio Code on your computer](https://code.visualstudio.com/download)

## [Step 1: Open a folder in VS Code](https://code.visualstudio.com/docs/getstarted/getting-started#\_step-1-open-a-folder-in-vs-code)

In VS Code, you can work with individual files seamlessly, for example for quick edits or to view a file. Alternatively, by opening a folder, also known as a *workspace*, you unlock more features, such as folder-specific configuration settings, restoring the UI state for that folder, debug configurations, and more. Get more info about [workspaces](https://code.visualstudio.com/docs/editor/workspaces).

Let's start by creating a folder and opening it in VS Code. You'll use this folder throughout the tutorial.

1. Create a new folder `vscode101` on your computer.

2. Open Visual Studio Code.

   When you first open VS Code, you should see the **Welcome** page with different actions to get started.

3. On the Welcome page, select **Open Folder...**, and then select the folder you created.

   The VS Code window reloads and you should see the folder name at the top of the **Explorer** view. You'll use the Explorer view to view and manage the files and folders in your workspace.

   ![Screenshot that shows VS Code after opening a folder, highlighting the Explorer view.](https://code.visualstudio.com/assets/docs/getstarted/getting-started/open-folder.png)

   Alternatively, you can select **Open Folder...** from the **File** menu or press Ctrl+K Ctrl+O to open a folder.

> **Tip**: If you use the command line to work with VS Code, pass the folder name as a parameter to directly launch VS Code for that folder. For example, enter `code .` to open the current folder in VS Code.

## [Step 2: Explore the user interface](https://code.visualstudio.com/docs/getstarted/getting-started#\_step-2-explore-the-user-interface)

Now that you have a folder open in VS Code, let's take a quick tour of the user interface.

### [Switch between views with the Activity Bar](https://code.visualstudio.com/docs/getstarted/getting-started#\_switch-between-views-with-the-activity-bar)

The **Activity Bar** is located on the side of the window and gives you quick access to different views, such as the **Explorer**, **Search**, **Source Control**, and **Run and Debug** views.

1. Use the Activity Bar to explore the different views.

   As you hover over the Activity Bar, you can see the name of each view and the keyboard shortcut to open each view. You'll find that many of the features in VS Code have keyboard shortcuts already assigned to them, and you can also customize these shortcuts to your liking.

   ![Screenshot that highlights the Activity Bar.](https://code.visualstudio.com/assets/docs/getstarted/getting-started/activity-bar.png)

2. Notice the **Primary Side Bar** that opens when you select a view in the Activity Bar.

   The Primary Side Bar shows view-specific information. For example, the Source Control view shows the changes in your Git repository, and the Run and Debug view enables you to configure and start debugging sessions.

   ![Screenshot that shows the Activity Bar and the Run and Debug view in the Primary Side Bar.](https://code.visualstudio.com/assets/docs/getstarted/getting-started/activity-bar-and-side-bar.png)

> **Tip**: Select the current view in the Activity Bar again to toggle the Primary Side Bar open and closed.

### [View and edit files with the Editor](https://code.visualstudio.com/docs/getstarted/getting-started#\_view-and-edit-files-with-the-editor)

The **Editor** is located in the main area of the window and is where you view and edit files in your workspace.

1. Select the Explorer view in the Activity Bar, and then select the **New File...** button to create a new file in your workspace.

   ![Screenshot that shows the New File button in the Explorer view.](https://code.visualstudio.com/assets/docs/getstarted/getting-started/explorer-new-file.png)

2. Enter the name `index.html` and press Enter.

   A file is added to your workspace and an Editor opens in the main area of the window, where you can start typing and editing the file.

   ![Screenshot that shows the Editor in the main area of the window.](https://code.visualstudio.com/assets/docs/getstarted/getting-started/new-file-editor.png)

3. Add more files to your workspace and notice that each file opens in a new Editor tab.

   You can open as many editors as you like and view them side by side vertically or horizontally. Learn more about [side by side editing](https://code.visualstudio.com/docs/getstarted/userinterface#\_side-by-side-editing).

   ![Screenshot that shows multiple Editor tabs.](https://code.visualstudio.com/assets/docs/getstarted/getting-started/multiple-editors.png)

### [Access the terminal from the Panel area](https://code.visualstudio.com/docs/getstarted/getting-started#\_access-the-terminal-from-the-panel-area)

The **Panel** area is located below the Editor and contains different views, such as the output and debug information, and also gives you access to the integrated terminal.

1. Open the Panel area by selecting **View** > **Appearance** > **Panel** from the menu (or press Ctrl+J).

   Notice the different view in the Panel area. As you use different features in VS Code, such as debugging your code, you'll use the information and functionality in these views.

   ![Screenshot that shows the Panel area with the Terminal view.](https://code.visualstudio.com/assets/docs/getstarted/getting-started/vscode-panel.png)

   > **Tip**: You can move the Panel area with the **View** > **Appearance** > **Panel Position** menu, for example to the left or right for more vertical space.

2. Open the integrated terminal by selecting **Terminal** in the Panel area > **New Terminal**, and try running some shell commands.

   The terminal enables you to run shell commands directly in VS Code, without switching to another terminal application. For example, you can use the terminal to install dependencies for your project, or run a development server. Notice that the terminal working directory is the root of your workspace.

   ![Screenshot that shows the integrated terminal in the Panel area.](https://code.visualstudio.com/assets/docs/getstarted/getting-started/vscode-terminal.png)

   You can choose between different shells, such as PowerShell, Command Prompt, or Bash, depending on your operating system configuration.

### [Access commands with the Command Palette](https://code.visualstudio.com/docs/getstarted/getting-started#\_access-commands-with-the-command-palette)

Many of the commands in VS Code are available through the Command Palette. For example, enter *Create new file* in the Command Palette to create a file in your workspace, or enter *Git* to view the list of Git actions you can trigger.

1. Select **View** > **Command Palette** or press Ctrl+Shift+P to open the **Command Palette**.

   ![Screenshot that shows the Command Palette, listing the entries for 'Create new file'.](https://code.visualstudio.com/assets/docs/getstarted/getting-started/command-palette.png)

   > **Tip**: Notice that the Command Palette shows the default keyboard shortcut for commands that have one. You can use the keyboard shortcut to run the command directly.

2. Press Ctrl+P to use the Command Palette to navigate to a file in your workspace. Start typing to filter the list.

   The **Quick Open** feature enables you to quickly open a file in your workspace, or search for symbols in files. Get more info the [Command Palette](https://code.visualstudio.com/docs/getstarted/userinterface#\_command-palette) in the VS Code documentation.

   ![Screenshot that shows the Quick Open feature in the Command Palette.](https://code.visualstudio.com/assets/docs/getstarted/getting-started/quick-open.png)

### [View status information with the Status Bar](https://code.visualstudio.com/docs/getstarted/getting-started#\_view-status-information-with-the-status-bar)

The **Status Bar** is located at the bottom of the window and shows information about the file you are editing, and the workspace you have open. For example, if the folder you opened is a Git repository, the Status Bar shows the Git status and current branch.

1. Open a file by selecting it in the Explorer view.

   The Status Bar shows the language mode, indentation, and the line ending of the current editor.

   ![Screenshot that shows the Status Bar at the bottom of the window.](https://code.visualstudio.com/assets/docs/getstarted/getting-started/status-bar.png)

2. Select the indentation field (shown as `Spaces: 4` in the screenshot) in the Status Bar to modify the indentation of the current file. For example, to use tabs instead of spaces.

   If you've opened a Git repository, you can select the branch name in the Status Bar to create a new branch.

## [Step 3: Customize the user interface](https://code.visualstudio.com/docs/getstarted/getting-started#\_step-3-customize-the-user-interface)

Each developer has their own preferences for how their coding environment should look. VS Code enables you to change the layout, colors, keyboard shortcuts, and nearly every other aspect of the editor through various settings.

Let's start by using **Color Themes** to customize the colors in VS Code. A Color Theme affects both the VS Code user interface elements and the editor highlighting colors.

To select a different Color Theme:

1. Select the **Manage** button (gear icon) in the Activity Bar, and then select **Themes** > **Color Theme** to display the Color Theme picker.

   ![Screenshot that shows the Manage menu to change the color theme, highlighting the Manage button in the Activity Bar.](https://code.visualstudio.com/assets/docs/getstarted/getting-started/change-color-theme.png)

   Alternatively, you can enter **Color Theme** in the Command Palette or press Ctrl+K Ctrl+T.

2. Use the Up and Down keys to navigate through the list and preview the colors of the theme.

   VS Code comes with a list of built-in themes that you can choose from. As you move through the list, the active theme is previewed in VS Code.

   ![Screen capture that shows how to switch between different color themes by using the Command Palette.](https://code.visualstudio.com/assets/docs/getstarted/themes/themes_hero.gif)

   > **Tip**: You can also select Color Themes from the VS Code Marketplace directly by selecting **Browse Additional Color Themes...** from the Color Theme picker.

Beyond changing the color theme of the user interface, you can customize almost every part of VS Code by using settings. Maybe you prefer a different font for the editor, change word wrapping, or enable [floating editor windows](https://code.visualstudio.com/docs/editor/custom-layout#\_floating-editor-windows).

Let's use the **Settings Editor** to modify the font size in the editor:

1. Select **File** > **Preferences** > **Settings** (or press Ctrl+,) to open the Settings Editor.

   ![Screenshot that shows the Settings Editor.](https://code.visualstudio.com/assets/docs/getstarted/getting-started/settings-editor.png)

2. Modify the value of the **Editor: Font Size** setting to *36*.

   When you switch to the `index.html` editor tab, notice how the font size change is immediately applied in the editor. You can select the gear icon next to the setting and select **Reset Setting** to reset the value back to its default value.

   By default, when you change a setting, it applies to all your VS Code workspaces (**User Settings**). Switch to the **Workspace** tab to change a setting that only applies to the current workspace.

   > **Tip**: Use the search box in the Settings Editor to quickly find a setting.

There are many more ways to customize your VS Code experience, such as [changing default keyboard shortcuts](https://code.visualstudio.com/docs/getstarted/keybindings), adding [code snippets](https://code.visualstudio.com/docs/editor/userdefinedsnippets), or by adding extensions from the [Visual Studio Marketplace](https://code.visualstudio.com/docs/getstarted/getting-started#\_step-5-install-a-language-extension).

## [Step 4: Write some code](https://code.visualstudio.com/docs/getstarted/getting-started#\_step-4-write-some-code)

VS Code is first and foremost a code editor, so let's start by writing some code! VS Code has built-in support for JavaScript, TypeScript, HTML, CSS, and more. In this tutorial, you create a sample JavaScript file and use some of the code editing features that VS Code offers.

VS Code supports many programming languages and in a next step, you'll install a language extension to add support for a different language, namely Python.

1. In the Explorer view, create a new file `app.js`, and start typing the following JavaScript code:

   ```
   function sayHello(name) {
     console.log('Hello, ' + name);
   }

   sayHello('VS Code');
   Copy
   ```

   As you type, you should see suggestions popping up that help you complete your code (*IntelliSense*). You can use the Up and Down keys to navigate the suggestions, and Tab to insert the selected suggestion.

   Notice also the formatting of the code (*syntax highlighting*), to help you distinguish between different parts of the code.

   ![Screen capture that shows IntelliSense in action for a JavaScript file.](https://code.visualstudio.com/assets/docs/getstarted/getting-started/javascript-intellisense.gif)

2. Put the cursor on the `Hello,` string, select the lightbulb icon, and then select **Convert to template string**.

   The lightbulb indicates that there are **Code Actions** available, which are suggestions that help you apply quick fixes to your code. You can also use the Ctrl+Space keyboard shortcut to open the lightbulb menu.

   In this case, the Code Action converts `""Hello, " + name` into a [template string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) `` `Hello, ${name}` ``, which is a special JavaScript construct to embed expressions in strings.

   ![Screenshot that shows the lightbulb Code Action to convert a string concatenation to a template string.](https://code.visualstudio.com/assets/docs/getstarted/getting-started/code-action-template-string.png)

   You can further experiment with IntelliSense in the different files in your workspace. For example, in the `index.html` file, start typing `<` to see suggestions for HTML tags.

   > **Tip**: Toggle the **File** > **Auto Save** menu item to automatically save files whenever you make changes.

## [Step 5: Use source control](https://code.visualstudio.com/docs/getstarted/getting-started#\_step-5-use-source-control)

As you're writing code, you'll want to save your work in a source control system to track changes or collaborate with others. Visual Studio Code has integrated source control management (SCM) and includes [Git](https://git-scm.com/) support out-of-the-box.

Let's use the built-in Git support to commit the changes you've made previously.

1. Make sure you have [Git](https://git-scm.com/) installed on your computer. You can check if Git is installed by opening the terminal and entering `git --version`.

2. Select the **Source Control** view in the Activity Bar, and select **Initialize Repository** to create a new Git repository for your workspace.

   You also have the option to directly publish your changes to a [GitHub repository](https://github.com/) by selecting **Publish to GitHub**.

   ![Screenshot that shows the Source Control view, highlighting the Initialize Repository button.](https://code.visualstudio.com/assets/docs/getstarted/getting-started/source-control-initialize.png)

3. After you initialize a repository, the Source Control view shows the changes you've made in your workspace.

   Notice the letter indicating the type of change alongside each file. For example, `U` indicates an untracked/new file.

   When you hover over a change, you can choose to discard or stage the change. Staging a change means that you've marked it as ready to be committed.

   ![Screenshot that shows the Source Control view with changes in the workspace.](https://code.visualstudio.com/assets/docs/getstarted/getting-started/source-control-changes.png)

4. Select **+** next to **Changes** to stage all changes at once.

5. Enter a commit message, for example `Add hello function`, and then select the **Commit** to commit the changes to your Git repository.

   ![Screenshot that shows the Source Control view with a commit message.](https://code.visualstudio.com/assets/docs/getstarted/getting-started/source-control-commit.png)

6. The **Source Control Graph** shows a visual representation of the commit history of your Git repository. You can use the graph to explore the commit history, compare changes, and more.

   ![Screenshot that shows the Source Control Graph in the Source Control view.](https://code.visualstudio.com/assets/docs/getstarted/getting-started/source-control-graph.png)

There's a lot more to discover about source control in VS Code. Get more info about [source control in VS Code](https://code.visualstudio.com/docs/sourcecontrol/overview).

## [Step 6: Install a language extension](https://code.visualstudio.com/docs/getstarted/getting-started#\_step-6-install-a-language-extension)

The features that VS Code includes out-of-the-box are just the start. VS Code has a rich ecosystem of extensions that let you add languages, debuggers, and tools to your installation to support your specific development workflow. There are thousands of extensions available in the [Visual Studio Marketplace](https://marketplace.visualstudio.com/vscode).

Let's install a language extension to add support for Python, or any other programming language you are interested in.

1. Select the **Extensions** view in the Activity Bar.

   The Extensions view enables you to browse and install extensions from within VS Code.

   ![Screenshot that shows the Extensions view, highlighting the Extensions icon in the Activity Bar.](https://code.visualstudio.com/assets/docs/getstarted/getting-started/extensions-view.png)

2. Enter *Python* in the Extension view search box to browse for Python-related extensions. Select the **Python** extension published by Microsoft, and then select the **Install** button.

   ![Screenshot that shows the Extensions view with a search for Python extensions.](https://code.visualstudio.com/assets/docs/getstarted/getting-started/extensions-search-python.png)

3. Now, create a new Python file `hello.py` in your workspace, and start typing the following Python code:

   ```
   def say_hello(name):
       print("Hello, " + name)

   say_hello("VS Code")
   Copy
   ```

   Notice that you now also get suggestions and IntelliSense for the Python code.

   ![Screen capture that shows IntelliSense in action for a Python file.](https://code.visualstudio.com/assets/docs/getstarted/getting-started/python-intellisense.gif)

Learn more about code [editing features](https://code.visualstudio.com/docs/editor/codebasics), [IntelliSense](https://code.visualstudio.com/docs/editor/intellisense), [code navigation](https://code.visualstudio.com/docs/editor/editingevolved), and [refactoring](https://code.visualstudio.com/docs/editor/refactoring) in VS Code.

## [Step 7: Run and debug your code](https://code.visualstudio.com/docs/getstarted/getting-started#\_step-7-run-and-debug-your-code)

One of the key features in VS Code is its great support for running and debugging code. VS Code has built-in support for running and debugging Node.js applications. In this tutorial, you use the Python extension you installed in the previous step to debug a Python program.

Let's debug the `hello.py` program that you created in the previous step.

1. Make sure that [Python 3](https://www.python.org/downloads/) is installed on your computer.

   To run and debug programs in VS Code, you need to have the necessary runtime installed on your computer. For example, to run and debug a Node.js program, you need to have the Node.js runtime installed.

2. In the `hello.py` file, place the cursor on the `print` line and press F9 to set a breakpoint.

   A red dot appears in the left margin of the editor, indicating that a breakpoint is set. With a breakpoint, you can pause the execution of your program at a specific line of code.

   ![Screenshot that shows a breakpoint in the editor.](https://code.visualstudio.com/assets/docs/getstarted/getting-started/python-set-breakpoint.png)

3. Press F5 to start a debugging session. Select **Python Debugger** in the Quick Pick menu, and then select **Python File** to debug the current Python file.

   Select the Python debugger:

   ![Screenshot that shows the Quick Pick menu to select the Python debug configuration.](https://code.visualstudio.com/assets/docs/getstarted/getting-started/python-select-debugger.png)

   Choose to run the current Python file:

   ![Screenshot that shows the Quick Pick menu to select the Python debug configuration.](https://code.visualstudio.com/assets/docs/getstarted/getting-started/python-debug-configuration.png)

4. Notice that the program starts and that the execution stops at the breakpoint you set.

   VS Code uses the Python Debugger you installed via the extension to run and debug the program.

   ![Screenshot that shows the program stopped at a breakpoint in the editor, highlighting the Variables view to inspect variables.](https://code.visualstudio.com/assets/docs/getstarted/getting-started/vscode-debugging.png)

   > **Tip**: Inspect the value of the `name` variable by hovering over it in the editor while the execution is paused. You can view the value of variables at any time in the **Variables** view in the **Run and Debug** view.

5. Press the **Continue** button in the Debug toolbar or press F5 to continue the execution.

   ![Screenshot that shows the Debug toolbar with the Continue button highlighted.](https://code.visualstudio.com/assets/docs/getstarted/getting-started/debug-toolbar-play.png)

There are many more debugging features in VS Code, such as watch variables, conditional breakpoints, and launch configurations. Dive into the details of [debugging in VS Code](https://code.visualstudio.com/docs/editor/debugging).

## [Enhance your coding with AI and GitHub Copilot](https://code.visualstudio.com/docs/getstarted/getting-started#\_enhance-your-coding-with-ai-and-github-copilot)

With [GitHub Copilot](https://code.visualstudio.com/docs/copilot/overview), you can further enhance your coding experience in VS Code and even discover VS Code features and settings you didn't know about.

GitHub Copilot in VS Code can help you with a wide range of tasks, such as:

* **Code completion**: Get suggestions for lines of code or entire functions.
* **Explain code**: Get explanations for code snippets to help you understand what they do.
* **Code refactoring & generation**: Refactor your code and generate code-related artifacts like tests or documentation.
* **Fix errors**: Get help with common coding tasks like finding and fixing bugs, or errors with shell commands.
* **Learn about VS Code**: Ask about VS Code features, settings, or commands.



> [Install the GitHub Copilot extension](vscode:extension/GitHub.copilot)

## [Next steps](https://code.visualstudio.com/docs/getstarted/getting-started#\_next-steps)

Congratulations! You've completed the tutorial and explored some of the key features of Visual Studio Code. Now that you've learned the basics of Visual Studio Code, get more info about how to:

* [Discover and run unit tests for your code](https://code.visualstudio.com/docs/editor/testing)
* [Use the integrated terminal](https://code.visualstudio.com/docs/terminal/getting-started)
* [Set up a remote development environment](https://code.visualstudio.com/docs/remote/remote-overview)

### Was this documentation helpful?

  
Yes , this page was helpfulNo , this page was not helpful

10/03/2024

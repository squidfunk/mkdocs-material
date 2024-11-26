# InkDrop CheatSheet Application

![cover](https://site-cdn.inkdrop.app/tutorial/welcome-banner.svg)

Thanks for downloading Inkdrop! Let's get started.

## Inkdrop has three parts

![Three Parts](https://site-cdn.inkdrop.app/tutorial/three-parts.svg)

- **Sidebar** (on the left): it lists notebooks, statuses and tags here. Notebooks are like folders you can create recursively. Statuses are additional information to treat notes as tasks. Tags are like labels which can link notes with related topic. Sidebar can be toggled by pressing <kbd>Cmd + /</kbd> on macOS or <kbd>Ctrl + /</kbd> on Windows and Linux.
- **Note list** (in the middle): all your notes live here, ordered by modification date by default. You can search notes with keywords from a search bar on the top of it.
- **Editor** (on the right): this is where your magic happens; you're looking at it. Press <kbd>Cmd + E</kbd> / <kbd>Ctrl + E</kbd> to toggle editor/preview, or press <kbd>Cmd + P</kbd> / <kbd>Ctrl + P</kbd> to toggle side-by-side mode.

Press <kbd>Cmd+Shift+D</kbd> / <kbd>Ctrl+Shift+D</kbd> to enter/leave _Distraction Free Mode_ which hides sidebar and note list.

## Creating notes and notebooks

To create a new note, you can either push a button on the right top of the note list or input keybind <kbd>Cmd+N</kbd> / <kbd>Ctrl+N</kbd>.

![AddNote](https://site-cdn.inkdrop.app/tutorial/basic-usage_addnote.png)

To create a new notebook, click 'Add' button on the right of 'Notebooks' section:

![AddBook](https://site-cdn.inkdrop.app/tutorial/basic-usage_addbook.png)

To create a sub notebook, right click on the notebook item which would be parent and choose "New Sub Notebook.." menu.

## Writing note

The editor supports standard Markdown syntax as well as
[GitHub Flavored Markdown (GFM)](https://docs.inkdrop.app/manual/markdown-cheatsheet) with inline formatting. Check out [the example note here](inkdrop://note:example).

### Live Preview

Inkdrop supports live preview of note. You can switch to Side-by-Side Preview with <kbd>Cmd+P</kbd> (on macOS) / <kbd>Ctrl+P</kbd> (on Windows/Linux) keybind to see the editor and preview side-by-side like this:

  * ![SideBySide](https://site-cdn.inkdrop.app/tutorial/writing-note_sidebyside.png)

You can also toggle preview mode by clicking buttons on bottom right corner of the editor:

![Toggle buttons](https://site-cdn.inkdrop.app/tutorial/writing-note_toggle_buttons.png)

Note that those buttons are hidden unless you move the mouse cursor on the editor in order not to distract your writing.

### Distraction Free Mode

To hide the sidebar and the note list, press <kbd>Cmd+Shift+D</kbd> / <kbd>Ctrl+Shift+D</kbd> to toggle _Distraction Free Mode_.
You can even hide the toolbar on the top of the editor from the preferences if you don't need it.

### Tagging

Inkdrop lets you assign tags to a note.
This is another way to organize your notes.

![Tagging](https://site-cdn.inkdrop.app/tutorial/writing-note_tags.png)

Tags are listed on the sidebar.

## Customizing Inkdrop

Inkdrop has a number of settings and preferences you can modify in the Preferences window.

To open the Preferences window:

- on macOS:
  - Use the _Inkdrop > Preferences_ menu item in the menu bar
  - Use the <kbd>Cmd+,</kbd> keybinding
- on Windows & Linux:
  - Use the _File > Settings_ menu item in the menu bar
  - Use the <kbd>Ctrl+,</kbd> keybinding


## Where is my data stored in my computer?

Inkdrop stores your data and config in local at the following path:

- on macOS: `~/Library/Application Support/inkdrop/`
- on Windows: `%APPDATA%\inkdrop\`
- on Linux:
  - deb/rpm: `~/.config/inkdrop/`
  - Snap: `~/snap/inkdrop/current/.config/inkdrop/`

You can open it up in a file manager from _Preferences -> General -> Open Config Folder_.

This directory has the following files and folders:

- `config.cson`: The app config file in [CSON format](https://github.com/bevry/cson#what-is-cson)
- `keymap.cson`: The keybindings config file in [CSON format](https://github.com/bevry/cson#what-is-cson)
- `packages/`: Installed plugins
- `db/`: The local database


## Get to know more

![cover](https://site-cdn.inkdrop.app/tutorial/learn-more.svg)

 * The [Inkdrop documentation](https://docs.inkdrop.app/) for Guides and the API reference.
 * The [Inkdrop forum](https://forum.inkdrop.app/). Please report issue or suggest feedback here.
 * The [Inkdrop plugins](https://my.inkdrop.app/plugins) for extending functionality.
 * Check out the [announcements](https://forum.inkdrop.app/c/announcements/) for the latest updates.
 
Enjoy! :)

<style>
  img {
    max-width: min(640px, 100%) !important;
  }
  img[alt=cover] {
    max-width: 200px !important;
  }
</style>
[Sign in to GitHub · GitHub](https://github.com/account)
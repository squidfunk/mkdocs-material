# Dracula Setup





[GitHub - helpotters/dracula-wallpapers: Wallpapers based off of the Dracula Color Palette](https://github.com/helpotters/dracula-wallpapers.git)



## Colors applied



| Palette    | Hex         | RGB             | HSL              | [![./colors/eyedropper.png](https://github.com/helpotters/dracula-wallpapers/raw/main/colors/eyedropper.png)](https://github.com/helpotters/dracula-wallpapers/blob/main/colors/eyedropper.png) |
| ---------- | ----------- | --------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Light Grey | \`#282a36\` | \`40 42 54\`    | \`231° 15% 18%\` | [![./colors/44475a.png](https://github.com/helpotters/dracula-wallpapers/raw/main/colors/44475a.png)](https://github.com/helpotters/dracula-wallpapers/blob/main/colors/44475a.png)             |
| Grey Blue  | \`#6272a4\` | \`98 114 164\`  | \`225° 27% 51%\` | [![./colors/6272a4.png](https://github.com/helpotters/dracula-wallpapers/raw/main/colors/6272a4.png)](https://github.com/helpotters/dracula-wallpapers/blob/main/colors/6272a4.png)             |
| Pink       | \`#282a36\` | \`40 42 54\`    | \`231° 15% 18%\` | [![./colors/ff79c6.png](https://github.com/helpotters/dracula-wallpapers/raw/main/colors/ff79c6.png)](https://github.com/helpotters/dracula-wallpapers/blob/main/colors/ff79c6.png)             |
| Purple     | \`#bd93f9\` | \`189 147 249\` | \`265° 89% 78%\` |                                                                                                                                                                                                 |
-


[GitHub - dracula/dracula-theme: 🧛🏻‍♂️ One theme. All platforms.](https://github.com/dracula/dracula-theme)


# Gnome Terminal

#### Install

This theme can be installed on Gnome 3 terminal and any other Gnome based terminal program like the Unity terminal bundled with Ubuntu.

You'll need the `dconf` command (if you run a recent Gnome version). In Ubuntu,this can be installed by running:

```
sudo apt-get install dconf-cli
```

In other distros you'll need to dig around to find it, search your repositories for **dconf** related packages.

After installing dconf, you can clone this repository to your machine.

```
git clone https://github.com/dracula/gnome-terminal
cd gnome-terminal
```

Then you can run the installation script:

```
./install.sh
```

And just follow the steps.

#### Addons

To complement your user experience I recommend installing [`zsh-syntax-highlighting`](https://github.com/zsh-users/zsh-syntax-highlighting/blob/master/INSTALL.md). This is going to allow commands to have their own colors and styles.

ZipFiles: https://github.com/dracula/gnome-terminal/archive/refs/heads/master.zip

GitHub:  [GitHub - dracula/gnome-terminal: 🧛🏻‍♂️ Dark theme for Gnome Terminal](https://github.com/dracula/gnome-terminal)



# Zsh

#### Install using Git

If you are a git user, you can install the theme and keep up to date by cloning the repo:

```
git clone https://github.com/dracula/zsh.git
```

And creating a symbolic link to [oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh/)'s theme folder:

```
ln -s $DRACULA_THEME/dracula.zsh-theme $OH_MY_ZSH/themes/dracula.zsh-theme
```

*P.S.: Remember that you should replace `$DRACULA_THEME` and `$OH_MY_ZSH` with the actual directories for this command to work.*

#### Install manually

1. Download using the [GitHub .zip download](https://github.com/dracula/zsh/archive/master.zip) option and unzip them.
2. Move `dracula.zsh-theme` file to [oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh/)'s theme folder: `oh-my-zsh/themes/dracula.zsh-theme`.
3. Move `/lib` to [oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh/)'s theme folder: `oh-my-zsh/themes/lib`.

#### Activating theme

Go to your `~/.zshrc` file and set `ZSH_THEME="dracula"`.

#### Install using [zplug](https://github.com/zplug/zplug)

Just add `zplug "dracula/zsh", as:theme` to your `~/.zshrc` file.


<https://github.com/dracula/zsh/archive/refs/heads/master.zip>

[GitHub - dracula/zsh: 🧛🏻‍♂️ Dark theme for ZSH](https://github.com/dracula/zsh)


# GTK

#### Install manually

1.- Two options for download:

- Download using the [GitHub .zip download](https://github.com/dracula/gtk/archive/master.zip) (Once extracted it must be renamed from `gtk-master` to `Dracula`)
- Download from [gnome-look](https://www.gnome-look.org/p/1687249/) - You can check the other theme variants there

2.- Extract the `.zip` file to the themes directory i.e. `/usr/share/themes/` or `~/.themes/` (create it if necessary).

#### Activating theme

To activate the theme in Gnome, run the following commands in Terminal:

```
gsettings set org.gnome.desktop.interface gtk-theme "Dracula"
gsettings set org.gnome.desktop.wm.preferences theme "Dracula"
```

or Change via distribution specific tweak-tool.

**For the latest versions of Gnome using Gtk4(libadwaita) some extra steps should be done in order to get it working properly, you could do it in two ways:**

1.- Manual way

- Copy the `assets` folder to the `~/.config` directory
- Copy the `gtk-4.0/gtk.css` and `gtk-4.0/gtk-dark.css` files to `~/.config/gtk-4.0/`

2.- Using [this script](https://github.com/odziom91/libadwaita-theme-changer) which will copy the needed folders to the right directories

## Icon Theme (optional)

#### Install manually

Download using the [GitHub .zip download](https://github.com/dracula/gtk/files/5214870/Dracula.zip) option and extract the `.zip` file to the icons directory i.e. `/usr/share/icons/`or `~/.icons/` (create it if necessary).

#### Activating icon theme

To activate the theme in Gnome, run the following commands in Terminal:

```
gsettings set org.gnome.desktop.interface icon-theme "Dracula"
```

or Change via distribution specific tweak tool.


# Chrome

#### Install

1. Install theme through the [Google Chrome Store](https://chrome.google.com/webstore/detail/dracula-chrome-theme-dark/gfapcejdoghpoidkfodoiiffaaibpaem).


# Wallpapers

#### Download

Wallpapers can be downloaded as [`.zip`](https://github.com/dracula/wallpaper/archive/master.zip), or you can clone the [GitHub repository](https://github.com/dracula/wallpaper) directly with the command below:

```

git clone https://github.com/dracula/wallpaper.git
```

#### Install using [Homebrew](https://brew.sh/)

Easily install from [dracula/homebrew-install](https://github.com/dracula/homebrew-install):

```
brew tap dracula/install
brew install --cask dracula-wallpaper
```

There are two collections, separated into folders with their respective names.


# FireFox


#### Install using Firefox Addon

Install the theme directly from [Firefox Addons](https://addons.mozilla.org/en-US/firefox/addon/dracula-dark-colorscheme/).

#### Install using userChrome

[Edge-Frfox](https://github.com/bmFtZQ/edge-frfox) fork CSS Theme that aims to recreate the look and feel of the Chromium version of [Microsoft Edge](https://www.microsoft.com/edge).

##### **Installation**

1. Go to `about:support` and click the "Open Folder/Show in Finder" button for the root directory of your browser profile/s.

2. Download and copy the `userChrome/chrome` folder into the profile folder.git clone https\://github.com/dracula/firefox.git

3. Go to `about:config` and change these preferences:

   For all operating systems:

   1. `toolkit.legacyUserProfileCustomizations.stylesheets` = `true`
   2. `svg.context-properties.content.enabled` = `true`
   3. `layout.css.color-mix.enabled` = `true`

   On macOS: 4. To use the Edge style context menu on macOS then set `widget.macos.native-context-menus` = `false`

   Recommended: 5. `browser.tabs.tabMinWidth` = `66` 6. `browser.tabs.tabClipWidth` = `86` 7. `browser.tabs.tabmanager.enabled` = `false`

##### **JSON Viewer**

1. Go to `about:config` page and set `devtools.jsonview.enabled` = `false`.
2. Install the JSON Lite extension from [here](https://addons.mozilla.org/en-US/firefox/addon/json-lite/).
3. Set the values as shown in the screenshot above, you can find the values to copy below.

```
Font: 13px JetBrains Mono,monospace
Text color: #f8f8f2
Background color: #282A36
Info color: #6272a4
Info hover color: #6272a4
Line numbers color: #6272a4
Line numbers background: #1D2128
String color: #f1fa8c
Number color: #bd93f9
Boolean color: #bd93f9
Null color: #bd93f9
Propertie name color: #8be9fd
Error color: #ed2655
```

##### **Tweaks**

Certain customizations like hiding the Firefox logo on the newtab page or switching to floating tabs can be done on the theme. More information on how to do this can be found in the original [repository](https://github.com/bmFtZQ/edge-frfox#tweaks).

You can also check out [Stylus](https://addons.mozilla.org/en-US/firefox/addon/styl-us/) themes (e.g. [StackOverflow](https://draculatheme.com/stackoverflow) or [GitHub](https://draculatheme.com/github)).


# GitHub Page
Install using Git

If you are a git user, you can install the theme and keep up to date by cloning the repo:

git clone https://github.com/dracula/gh-pages.git

Install manually

Download using the GitHub .zip download option and unzip them.
Activating theme

    Add the following to your site's _config.yml:

remote_theme: "dracula/gh-pages"

Optionally, if you'd like to preview your site on your computer, add the following to your site's Gemfile:

gem "github-pages", group: :jekyll_plugins



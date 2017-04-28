# Getting started

## Installation

!!! tip "Set up Material using Docker"

    The official [Docker image][1] for Material comes with all dependencies
    pre-installed and ready-to-use with the latest version published on PyPI,
    packaged in a very small image (28MB compressed).

  [1]: https://hub.docker.com/r/squidfunk/mkdocs-material/

### Installing MkDocs

Before installing [MkDocs][2], you need to make sure you have Python and `pip`
– the Python package manager – up and running. You can verify if you're already
good to go with the following commands:

``` sh
python --version
# Python 2.7.13
pip --version
# pip 9.0.1
```

Installing and verifying MkDocs is as simple as:

``` sh
pip install mkdocs && mkdocs --version
# mkdocs, version 0.16.0
```

!!! warning "MkDocs version requirements"

    Material requires MkDocs >= 0.16.

Furthermore, it is highly recommended to install [Pygments][3] and the
[PyMdown Extensions][4] to get the most out of the Material theme:

```sh
pip install pygments
pip install pymdown-extensions
```

  [2]: http://www.mkdocs.org
  [3]: http://pygments.org
  [4]: http://facelessuser.github.io/pymdown-extensions/

### Installing Material

#### using pip

Material can be installed with `pip`:

``` sh
pip install mkdocs-material
```

#### using choco

If you're on Windows you can use [Chocolatey][5] to install [Material][6]:

``` dos
choco install mkdocs-material
```

This will also install all required dependencies like [Python][7] and
[MkDocs][8].

  [5]: https://chocolatey.org
  [6]: https://chocolatey.org/packages/mkdocs-material
  [7]: https://chocolatey.org/packages/python
  [8]: https://chocolatey.org/packages/mkdocs

#### cloning from GitHub

Material can also be used without a system-wide installation by cloning the
repository into a subfolder of your project's root directory:

``` sh
git clone https://github.com/squidfunk/mkdocs-material.git
```

This is especially useful if you want to extend the theme and override some
parts of the theme. The theme will reside in the folder
`mkdocs-material/material`.

### Troubleshooting

!!! warning "Installation on macOS"

    When you're running the pre-installed version of Python on macOS, `pip`
    tries to install packages in a folder for which your user might not have
    the adequate permissions. There are two possible solutions for this:

    1. **Installing in user space** (recommended): Provide the `--user` flag
      to the install command and `pip` will install the package in a user-site
      location. This is the recommended way.

    2. **Switching to a homebrewed Python**: Upgrade your Python installation
      to a self-contained solution by installing Python with Homebrew. This
      should eliminate a lot of problems you may be having with `pip`.

!!! failure "Error: unrecognized theme 'material'"

    If you run into this error, the most common reason is that you installed
    MkDocs through some package manager (e.g. Homebrew or `apt-get`) and the
    Material theme through `pip`, so both packages end up in different
    locations. MkDocs only checks it's install location for themes.

## Usage

In order to enable the Material theme just add one of the following lines to
your `mkdocs.yml`. If you installed Material using pip:

``` yaml
theme: 'material'
```

If you cloned Material from GitHub:

``` yaml
theme_dir: 'mkdocs-material/material'
```

MkDocs includes a development server, so you can review your changes as you go.
The development server can be started with the following command:

``` sh
mkdocs serve
```

Now you can point your browser to [localhost:8000][9] and the Material theme
should be visible. From here on, you can start writing your documentation, or
read on and customize the theme through some options.

  [9]: http://localhost:8000

## Options

The Material theme adds some extra variables for configuration via your
project's `mkdocs.yml`. See the following sections for all available options.

### Changing the color palette

Material defines a default hue for every primary and accent color on Google's
Material Design [color palette][10]. This makes it very easy to change the
overall look of the theme. Just set the primary and accent colors using the
following variables in your `mkdocs.yml`:

``` yaml
extra:
  palette:
    primary: 'indigo'
    accent: 'light blue'
```

Color names are case-insensitive, but must match the names of the Material
Design color palette. Valid values are: `red`, `pink`, `purple`, `deep purple`,
`indigo`, `blue`, `light blue`, `cyan`, `teal`, `green`, `light green`, `lime`,
`yellow`, `amber`, `orange`, `deep orange`, `brown`, `grey` and `blue grey`.
The last three colors can only be used as a primary color.

If the color is set via this configuration, an additional CSS file that
defines the color palette is included. If you want to keep things lean, clone
the repository and recompile the theme with your custom colors set. See the
guide on [customization][11] for more information.

  [10]: http://www.materialui.co/colors
  [11]: customization.md

#### Primary colors

Click on a tile to change the primary color of the theme:

<button data-md-color-primary="red">Red</button>
<button data-md-color-primary="pink">Pink</button>
<button data-md-color-primary="purple">Purple</button>
<button data-md-color-primary="deep-purple">Deep Purple</button>
<button data-md-color-primary="indigo">Indigo</button>
<button data-md-color-primary="blue">Blue</button>
<button data-md-color-primary="light-blue">Light Blue</button>
<button data-md-color-primary="cyan">Cyan</button>
<button data-md-color-primary="teal">Teal</button>
<button data-md-color-primary="green">Green</button>
<button data-md-color-primary="light-green">Light Green</button>
<button data-md-color-primary="lime">Lime</button>
<button data-md-color-primary="yellow">Yellow</button>
<button data-md-color-primary="amber">Amber</button>
<button data-md-color-primary="orange">Orange</button>
<button data-md-color-primary="deep-orange">Deep Orange</button>
<button data-md-color-primary="brown">Brown</button>
<button data-md-color-primary="grey">Grey</button>
<button data-md-color-primary="blue-grey">Blue Grey</button>

<script>
  var buttons = document.querySelectorAll("button[data-md-color-primary]");
  Array.prototype.forEach.call(buttons, function(button) {
    button.addEventListener("click", function() {
      document.body.dataset.mdColorPrimary = this.dataset.mdColorPrimary;
    })
  })
</script>

#### Accent colors

Click on a tile to change the accent color of the theme:

<button data-md-color-accent="red">Red</button>
<button data-md-color-accent="pink">Pink</button>
<button data-md-color-accent="purple">Purple</button>
<button data-md-color-accent="deep-purple">Deep Purple</button>
<button data-md-color-accent="indigo">Indigo</button>
<button data-md-color-accent="blue">Blue</button>
<button data-md-color-accent="light-blue">Light Blue</button>
<button data-md-color-accent="cyan">Cyan</button>
<button data-md-color-accent="teal">Teal</button>
<button data-md-color-accent="green">Green</button>
<button data-md-color-accent="light-green">Light Green</button>
<button data-md-color-accent="lime">Lime</button>
<button data-md-color-accent="yellow">Yellow</button>
<button data-md-color-accent="amber">Amber</button>
<button data-md-color-accent="orange">Orange</button>
<button data-md-color-accent="deep-orange">Deep Orange</button>

<script>
  var buttons = document.querySelectorAll("button[data-md-color-accent]");
  Array.prototype.forEach.call(buttons, function(button) {
    button.addEventListener("click", function() {
      document.body.dataset.mdColorAccent = this.dataset.mdColorAccent;
    })
  })
</script>

### Changing the font family

Material uses the [Roboto font family][12] by default, specifically the regular
sans-serif type for text and the `monospaced` type for code. Both fonts are
loaded from [Google Fonts][13] and can easily be changed to other fonts, like
for example the [Ubuntu font family][14]:

``` yaml
extra:
  font:
    text: 'Ubuntu'
    code: 'Ubuntu Mono'
```

The text font will be loaded in font-weights 400 and **700**, the `monospaced`
font in regular weight. If you want to load fonts from other destinations or
don't want to use the Google Fonts loading magic, just set `font` to `false`:

``` yaml
extra:
  font: false
```

  [12]: https://fonts.google.com/specimen/Roboto
  [13]: https://fonts.google.com
  [14]: https://fonts.google.com/specimen/Ubuntu

### Adding a source repository

To include a link to the repository of your project within your documentation,
set the following variables via your project's `mkdocs.yml`:

``` yaml
repo_name: 'my-github-handle/my-project'
repo_url: 'https://github.com/my-github-handle/my-project'
```

Material will render the name of the repository next to the search bar on
big screens and as part of the main navigation drawer on smaller screen sizes.
Furthermore, if `repo_url` points to a GitHub, BitBucket or GitLab repository,
the respective service logo will be shown next to the name of the repository.
Additionally, for GitHub, the number of stars and forks is shown.

!!! warning "Why is there an edit button at the top of every article?"

    If the `repo_url` is set to a GitHub or BitBucket repository, and the
    `repo_name` is set to *GitHub* or *BitBucket* (implied by default), an
    edit button will appear at the top of every article. This is the automatic
    behavior that MkDocs implements. See the [MkDocs documentation][15] on more
    guidance regarding the `edit_uri` attribute, which defines whether the edit
    button is shown or not.

  [15]: http://www.mkdocs.org/user-guide/configuration/#edit_uri

### Adding a logo

Material makes it easy to add your logo. Your logo should have rectangular
shape with a minimum resolution of 128x128, leave some room towards the edges
and be composed of high contrast areas on a transparent ground, as it will be
placed on the colored header bar and drawer. Simply create the folder
`docs/images`, add your logo and embed it with:

``` yaml
extra:
  logo: 'images/logo.svg'
```

### Adding social links

If you want to link your social accounts, the Material theme provides an easy
way for doing this in the footer of the documentation using the automatically
included [FontAwesome][16] webfont. The syntax is simple – the `type` must
denote the name of the social service, e.g. `github`, `twitter` or `linkedin`
and the `link` must contain the URL you want to link to:

``` yaml
extra:
  social:
    - type: 'github'
      link: 'https://github.com/squidfunk'
    - type: 'twitter'
      link: 'https://twitter.com/squidfunk'
    - type: 'linkedin'
      link: 'https://de.linkedin.com/in/martin-donath-20a95039'
```

The links are generated in order and the `type` of the links must match the
name of the FontAwesome glyph. The `fa` is automatically added, so `github`
will result in `fa fa-github`.

  [16]: http://fontawesome.io/icons/

### Google Analytics integration

MkDocs makes it easy to integrate site tracking with Google Analytics.
Besides basic tracking, clicks on all outgoing links can be tracked as well as
how site search is used. Tracking can be activated in your project's
`mkdocs.yml`:

``` yaml
google_analytics:
  - 'UA-XXXXXXXX-X'
  - 'auto'
```

### Disqus integation

Material for MkDocs is integrated with [Disqus][17], so if you want to add a
comments section to your documentation set the shortname of your Disqus project
in your `mkdocs.yml`:

``` yaml
extra:
  disqus: 'your-disqus-shortname'
```

A new entry at the bottom of the table of contents is generated that is linking
to the comments section. The necessary JavaScript is automatically included.

  [17]: https://disqus.com

### Localization

Material for MkDocs supports internationalization (i18n). In order to translate
the labels (e.g. *Previous* and *Next* in the footer), you can override the
file `partials/language.html` and provide your own translations inside the
macro `t`:

``` jinja
{% macro t(key) %}{{ {
  "language": "en",
  "edit.link.title": "Edit this page",
  "footer.previous": "Previous",
  "footer.next": "Next",
  "meta.comments": "Comments",
  "meta.source": "Source",
  "search.placeholder": "Search",
  "search.result.placeholder": "Type to start searching",
  "search.result.none": "No matching documents",
  "search.result.one": "1 matching document",
  "search.result.other": "# matching documents",
  "source.link.title": "Go to repository",
  "toc.title": "Table of contents"
}[key] }}{% endmacro %}
```

Just copy the file from the original theme and make your adjustments. See the
section on [overriding partials][18] and the general guide on
[theme extension][19] in the customization guide.

  [18]: customization.md#overriding-partials
  [19]: customization.md#extending-the-theme

### Tabs

From version 1.1.0 on, Material supports another layer on top of the main
navigation for larger screens in the form of tabs. This is especially useful
for larger documentation projects with a few top-level sections. Tabs can be
enabled by setting the respective feature flag to true:

``` yaml
extra:
  feature:
    tabs: true
```

### More advanced customization

If you want to change the general appearance of the Material theme, see
[this article][20] for more information on advanced customization.

  [20]: customization.md

## Extensions

MkDocs supports several [Markdown extensions][21]. The following extensions
are not enabled by default (see the link for which are enabled by default)
but highly recommended, so they should be switched on at all times:

``` yaml
markdown_extensions:
  - admonition
  - codehilite(guess_lang=false)
  - toc(permalink=true)
```

For more information, see the following list of extensions supported by the
Material theme including more information regarding installation and usage:

* [Admonition][22]
* [Codehilite][23]
* [Footnotes][24]
* [Metadata][25]
* [Permalinks][26]
* [PyMdown Extensions][27]

  [21]: http://www.mkdocs.org/user-guide/writing-your-docs/#markdown-extensions
  [22]: extensions/admonition.md
  [23]: extensions/codehilite.md
  [24]: extensions/footnotes.md
  [25]: extensions/metadata.md
  [26]: extensions/permalinks.md
  [27]: extensions/pymdown.md

## Full example

Below is a full example configuration for a `mkdocs.yml`:

``` yaml
# Project information
site_name: 'My Project'
site_description: 'A short description of my project'
site_author: 'John Doe'
site_url: 'https://my-github-handle.github.io/my-project'

# Repository
repo_name: 'my-github-handle/my-project'
repo_url: 'https://github.com/my-github-handle/my-project'

# Copyright
copyright: 'Copyright &copy; 2016 - 2017 John Doe'

# Documentation and theme
theme: 'material'

# Options
extra:
  logo: 'images/logo.svg'
  palette:
    primary: 'indigo'
    accent: 'indigo'
  font:
    text: 'Roboto'
    code: 'Roboto Mono'
  social:
    - type: 'github'
      link: 'https://github.com/john-doe'
    - type: 'twitter'
      link: 'https://twitter.com/jonh-doe'
    - type: 'linkedin'
      link: 'https://de.linkedin.com/in/john-doe'

# Google Analytics
google_analytics:
  - 'UA-XXXXXXXX-X'
  - 'auto'

# Extensions
markdown_extensions:
  - admonition
  - codehilite(guess_lang=false)
  - toc(permalink=true)
```

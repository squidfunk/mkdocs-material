# Getting started

## Installation

!!! tip "Set up Material using Docker"

    The official [Docker image][1] for Material comes with all dependencies
    pre-installed and ready-to-use with the latest version published on PyPI,
    packaged in a very small image (36MB compressed).

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
# mkdocs, version 0.17.1
```

!!! warning "MkDocs version requirements"

    Material requires MkDocs >= 0.17.1

  [2]: http://www.mkdocs.org

### Installing Material

#### using pip

Material can be installed with `pip`:

``` sh
pip install mkdocs-material
```

#### using choco

If you're on Windows you can use [Chocolatey][3] to install [Material][4]:

``` dos
choco install mkdocs-material
```

This will install all required dependencies like [Python][5] and [MkDocs][6].

  [3]: https://chocolatey.org
  [4]: https://chocolatey.org/packages/mkdocs-material
  [5]: https://chocolatey.org/packages/python
  [6]: https://chocolatey.org/packages/mkdocs

#### cloning from GitHub

Material can also be used without a system-wide installation by cloning the
repository into a subfolder of your project's root directory:

``` sh
git clone https://github.com/squidfunk/mkdocs-material.git
```

This is especially useful if you want to [extend the theme][7] and
[override some parts][8] of the theme. The theme will reside in the folder
`mkdocs-material/material`.

  [7]: customization.md#extending-the-theme
  [8]: customization.md#overriding-partials

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
    locations. MkDocs only checks its install location for themes.

## Usage

In order to enable the theme just add one of the following lines to your
project's `mkdocs.yml`. If you installed Material using pip:

``` yaml
theme:
  name: 'material'
```

If you cloned Material from GitHub:

``` yaml
theme:
  name: null
  custom_dir: 'mkdocs-material/material'
```

MkDocs includes a development server, so you can review your changes as you go.
The development server can be started with the following command:

``` sh
mkdocs serve
```

Now you can point your browser to [http://localhost:8000][9] and the Material
theme should be visible. From here on, you can start writing your documentation,
or read on and customize the theme.

  [9]: http://localhost:8000

## Configuration

### Color palette

A default hue is defined for every primary and accent color on Google's
Material Design [color palette][10], which makes it very easy to change the
overall look of the theme. Just set the primary and accent colors using the
following variables:

``` yaml
theme:
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
defines the color palette is automatically included. If you want to keep things
lean, clone the repository and recompile the theme with your custom colors set.
See the guide on [customization][11] for more information.

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

### Font family

By default the [Roboto font family][12] is included with the theme, specifically
the regular sans-serif type for text and the `monospaced` type for code. Both
fonts are loaded from [Google Fonts][13] and can be changed to other fonts,
like for example the [Ubuntu font family][14]:

``` yaml
theme:
  font:
    text: 'Ubuntu'
    code: 'Ubuntu Mono'
```

The text font will be loaded in weights 400 and **700**, the `monospaced` font
in regular weight. If you want to load fonts from other destinations or don't
want to use the Google Fonts loading magic, just set `font` to `false`:

``` yaml
theme:
  font: false
```

  [12]: https://fonts.google.com/specimen/Roboto
  [13]: https://fonts.google.com
  [14]: https://fonts.google.com/specimen/Ubuntu

### Logo

Your logo should have rectangular shape with a minimum resolution of 128x128,
leave some room towards the edges and be composed of high contrast areas on a
transparent ground, as it will be placed on the colored header bar and drawer.
Simply create the folder `docs/images`, add your logo and embed it with:

``` yaml
theme:
  logo: 'images/logo.svg'
```

Additionally, the default icon can be changed by setting an arbitrary ligature
(or Unicode code point) from the [Material Design icon font][15], e.g.

``` yaml
theme:
  logo:
    icon: 'cloud'
```

  [15]: https://material.io/icons/

### Language

#### Localization

Material for MkDocs supports internationalization (i18n) and provides
translations for all template variables and labels in English `en`, French `fr`,
German `de`, Spanish `es`, Italian `it`, Danish `da`, Polish `pl`, Norwegian
`no`, Swedish `sv`, Korean `kr`, Chinese (Simplified) `zh` and Chinese
(Traditional) `zh-Hant`. Specify the language with:

``` yaml
theme:
  language: 'en'
```

If the language is not specified, Material falls back to English. To create a
translation for another language, copy the localization file of an existing
language, name the new file using the [2-letter language code][16] and adjust
all translations:

``` sh
cp partials/language/en.html partials/language/jp.html
```

Feel free to contribute your localization to Material for MkDocs by opening a
Pull Request.

  [16]: https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes

#### Site search

Site search is implemented using [lunr.js][17], which includes stemmers for the
English language by default, while stemmers for other languages are included
with [lunr-languages][18], both of which are integrated with this theme. Support
for other languages and even multilingual search can be activated in your
project's `mkdocs.yml`:

``` yaml
extra:
  search:
    languages: 'en, de, ru'
```

All defined languages are used only for stemming. This will automatically load
the stemmers for the specified languages and set them up with site search.

At the time of writing, the following languages are supported: English `en`,
French `fr`, German `de`, Spanish `es`, Italian `it`, Japanese `jp`, Dutch `du`,
Danish `da`, Portguese `pt`, Finnish `fi`, Romanian `ro`, Hungarian `hu`,
Russian `ru`, Norwegian `no`, Swedish `sv` and Turkish `tr`.

!!! warning "Only specify the languages you really need"

    Be aware that including support for other languages increases the general
    JavaScript payload by around 20kb (without gzip) and by another 15-30kb per
    language.

The separator for tokenization can be customized which makes it possible
to index parts of words that are separated by `-` or `.`:

``` yaml
extra:
  search:
    tokenizer: '[\s\-\.]+'
```

  [17]: https://lunrjs.com
  [18]: https://github.com/MihaiValentin/lunr-languages

### Favicon

The default favicon can be changed by setting the `favicon` variable to an
`.ico` or image file:

``` yaml
theme:
  favicon: 'images/favicon.ico'
```

### Features

#### Tabs

Material supports another layer on top of the main navigation for larger
screens in the form of tabs. This is especially useful for larger documentation
projects with only few top-level sections. Tabs can be enabled by setting the
respective feature flag to true:

``` yaml
theme:
  feature:
    tabs: true
```

## Customization

### Adding a source repository

To include a link to the repository of your project within your documentation,
set the following variables via your project's `mkdocs.yml`:

``` yaml
repo_name: 'my-github-handle/my-project'
repo_url: 'https://github.com/my-github-handle/my-project'
```

The name of the repository will be rendered next to the search bar on big
screens and as part of the main navigation drawer on smaller screen sizes.
Furthermore, if `repo_url` points to a GitHub, BitBucket or GitLab repository,
the respective service logo will be shown next to the name of the repository.
Additionally, for GitHub, the number of stars and forks is shown.

If the repository is hosted in a private environment, the service logo can be
set explicitly by setting `extra.repo_icon` to `github`, `gitlab` or
`bitbucket`.

!!! question "Why is there an edit button at the top of every article?"

    If the `repo_url` is set to a GitHub or BitBucket repository, and the
    `repo_name` is set to *GitHub* or *BitBucket* (implied by default), an
    edit button will appear at the top of every article. This is the automatic
    behavior that MkDocs implements. See the [MkDocs documentation][19] on more
    guidance regarding the `edit_uri` attribute, which defines whether the edit
    button is shown or not.

  [19]: http://www.mkdocs.org/user-guide/configuration/#edit_uri

### Adding social links

Social accounts can be linked in the footer of the documentation using the
automatically included [FontAwesome][20] webfont. The `type` must denote the
name of the social service, e.g. `github`, `twitter` or `linkedin` and the
`link` must contain the URL you want to link to:

``` yaml
extra:
  social:
    - type: 'github'
      link: 'https://github.com/squidfunk'
    - type: 'twitter'
      link: 'https://twitter.com/squidfunk'
    - type: 'linkedin'
      link: 'https://linkedin.com/in/squidfunk'
```

The links are generated in order and the `type` of the links must match the
name of the FontAwesome glyph. The `fa` is automatically added, so `github`
will result in `fa fa-github`.

  [20]: http://fontawesome.io/icons/

### More advanced customization

  If you want to change the general appearance of the Material theme, see
  [this article][21] for more information on advanced customization.

  [21]: customization.md

## Integrations

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

Material for MkDocs is integrated with [Disqus][22], so if you want to add a
comments section to your documentation set the shortname of your Disqus project
in your `mkdocs.yml`:

``` yaml
extra:
  disqus: 'your-disqus-shortname'
```

The comments section is inserted in *every page, except the index page*.
Additionally, a new entry at the bottom of the table of contents is generated
that is linking to the comments section. The necessary JavaScript is
automatically included.

!!! warning "Requirements"

    `site_url` value must be set in `mkdocs.yml` for the Disqus integration to
    load properly.

  [22]: https://disqus.com

## Migration

### From 1.x to 2.0

* Material for MkDocs 2.0 requires MkDocs 0.17.1, as this version introduced
  changes to the way themes can define options. The following variables inside
  your project's `mkdocs.yml` need to be renamed:

  * `extra.feature` becomes `theme.feature`
  * `extra.palette` becomes `theme.palette`
  * `extra.font` becomes `theme.font`
  * `extra.logo` becomes `theme.logo`

* Localization is now separate in theme language and search language. While
  there can only be a single language on theme-level, the search supports
  multiple languages which can be separated by commas.

* The search tokenizer can now be set through `extra.search.tokenizer`.

## Extensions

MkDocs supports several [Markdown extensions][23]. The following extensions
are not enabled by default (see the link for which are enabled by default)
but highly recommended, so they should be switched on at all times:

``` yaml
markdown_extensions:
  - admonition
  - codehilite:
      guess_lang: false
  - toc:
      permalink: true
```

For more information, see the following list of extensions supported by the
Material theme including more information regarding installation and usage:

* [Admonition][24]
* [Codehilite][25]
* [Footnotes][26]
* [Metadata][27]
* [Permalinks][28]
* [PyMdown Extensions][29]

  [23]: http://www.mkdocs.org/user-guide/writing-your-docs/#markdown-extensions
  [24]: extensions/admonition.md
  [25]: extensions/codehilite.md
  [26]: extensions/footnotes.md
  [27]: extensions/metadata.md
  [28]: extensions/permalinks.md
  [29]: extensions/pymdown.md

## Full example

Below is a full example configuration for a `mkdocs.yml`:

``` yaml
# Project information
site_name: 'My Project'
site_description: 'A short description of my project'
site_author: 'John Doe'
site_url: 'https://john-doe.github.io/my-project'

# Repository
repo_name: 'my-github-handle/my-project'
repo_url: 'https://github.com/john-doe/my-project'

# Copyright
copyright: 'Copyright &copy; 2016 - 2017 John Doe'

# Configuration
theme:
  name: 'material'
  language: 'en'
  palette:
    primary: 'indigo'
    accent: 'indigo'
  font:
    text: 'Roboto'
    code: 'Roboto Mono'
  logo: 'images/logo.svg'

# Customization
extra:
  social:
    - type: 'github'
      link: 'https://github.com/john-doe'
    - type: 'twitter'
      link: 'https://twitter.com/john-doe'
    - type: 'linkedin'
      link: 'https://linkedin.com/in/john-doe'

# Google Analytics
google_analytics:
  - 'UA-XXXXXXXX-X'
  - 'auto'

# Extensions
markdown_extensions:
  - admonition
  - codehilite:
      guess_lang: false
  - toc:
      permalink: true
```

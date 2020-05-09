---
template: overrides/main.html
---

# Getting started

## Installation

While there are several ways of installing Material for MkDocs, the recommended
methods are either by using `pip` – the Python package manager – or by pulling
the [official Docker image][1].

  [1]: https://hub.docker.com/r/squidfunk/mkdocs-material/

### with pip <small>recommended</small>

Material for MkDocs can be installed with `pip`:

``` sh
pip install mkdocs-material
```

Note that this will automatically install compatible versions of [MkDocs][2],
[Markdown][3], [Pygments][4] and [PyMdown Extensions][5]. Material for MkDocs
always strives to support the latest versions, so there's no need to install
those packages separately.

!!! tip "Installation in a virtual environment"

    The best way to make sure that you end up with the correct versions and
    without any incompatibility problems between packages it to use a **virtual
    environment**. Don't know what this is or how to set it up? We recommend
    to start by reading a [tutorial on virtual environments][6] for Python.

!!! warning "Installation on macOS"

    When you're running the pre-installed version of Python on macOS, `pip`
    tries to install packages in a folder for which your user might not have
    the adequate permissions. There are two possible solutions for this:

    1. **Installing in user space** (recommended): Provide the `--user` flag
      to the install command and `pip` will install the package in a user-site
      location. This is the recommended way.

    2. **Switching to a homebrewed Python**: Upgrade your Python installation
      to a self-contained solution by installing Python with Homebrew. This
      should eliminate a lot of problems you could be having with `pip`.

!!! failure "Error: unrecognized theme 'material'"

    If you run into this error, the most common reason is that you installed
    MkDocs through some package manager (e.g. Homebrew or `apt-get`) and
    Material for MkDocs through `pip`, so both packages end up in different
    locations. MkDocs only checks its install location for themes.

  [2]: https://www.mkdocs.org
  [3]: https://python-markdown.github.io/
  [4]: https://pygments.org/
  [5]: https://facelessuser.github.io/pymdown-extensions/
  [6]: https://docs.python-guide.org/dev/virtualenvs/

### with docker <small>recommended</small>

The official [Docker image][7] is a great way to get up and running in a few
minutes, as it comes with all dependencies pre-installed. Pull the image for the 
`latest` version with:

```
docker pull squidfunk/mkdocs-material
```

The `mkdocs` executable is provided as an entry point and `serve` is the default
command. Start the development server in your project root – the folder where
`mkdocs.yml` resides — with:

=== "Unix"

    ```
    docker run --rm -it -p 8000:8000 -v ${PWD}:/docs squidfunk/mkdocs-material
    ```

=== "Windows"

    ```
    docker run --rm -it -p 8000:8000 -v "%cd%":/docs squidfunk/mkdocs-material
    ```

  [7]: https://hub.docker.com/r/squidfunk/mkdocs-material/

### with git

Material for MkDocs can be directly used from [GitHub][8] by cloning the
repository into a subfolder of your project root which might be useful if you
want to use the very latest version:

``` sh
git clone https://github.com/squidfunk/mkdocs-material.git
```

The theme will reside in the folder `mkdocs-material/material`.

  [8]: https://github.com/squidfunk/mkdocs-material

## Configuration

Depending on your installation method, you can now add the following lines to
`mkdocs.yml` in your project root. If you installed Material for MkDocs using
a package manager, add:

``` yaml
theme:
  name: material
```

If you cloned Material for MkDocs from GitHub add:

``` yaml
theme:
  name: null
  custom_dir: mkdocs-material/material
```

MkDocs includes a development server, so you can preview your changes as you
write your documentation. The development server can be started with the
following command:

``` sh
mkdocs serve
```

Point your browser to http://localhost:8000 and your documentation should greet
you in a new look. If you're starting from scratch, the following configuration
can be used as a starting point:

??? summary "Example configuration"

    This is an excerpt from the [`mkdocs.yml`][9] used to render these pages:

    ``` yaml
    # Project information
    site_name: Material for MkDocs
    site_description: A Material Design theme for MkDocs
    site_author: Martin Donath
    site_url: https://squidfunk.github.io/mkdocs-material/

    # Repository
    repo_name: squidfunk/mkdocs-material
    repo_url: https://github.com/squidfunk/mkdocs-material

    # Copyright
    copyright: Copyright &copy; 2016 - 2020 Martin Donath

    # Configuration
    theme:
      name: material
      language: en
      palette:
        primary: indigo
        accent: indigo
      font:
        text: Roboto
        code: Roboto Mono

    # Extras
    extra:
      social:
        - icon: fontawesome/brands/github-alt
          link: https://github.com/squidfunk
        - icon: fontawesome/brands/twitter
          link: https://twitter.com/squidfunk
        - icon: fontawesome/brands/linkedin
          link: https://linkedin.com/in/squidfunk

    # Google Analytics
    google_analytics:
      - UA-XXXXXXXX-X
      - auto

    # Extensions
    markdown_extensions:
      - admonition
      - codehilite:
          guess_lang: false
      - toc:
          permalink: true
    ```

[9]: https://github.com/squidfunk/mkdocs-material/blob/master/mkdocs.yml

### Feature flags

These optional features are hidden behind flags and can be explicitly enabled
in `mkdocs.yml`.

#### Instant loading :hatching_chick:

The (still experimental) *instant loading* feature will intercept clicks on all 
internal links and dispatch them directly via XHR without a full page reload.
It can be enabled from `mkdocs.yml` with:

``` yaml
theme:
  features:
    - instant
```

The resulting page is parsed and injected and all event handlers and components
are automatically rebound. This means that **Material for MkDocs behaves like a
Single Page Application**, which is especially useful for large documentation
sites that come with a huge search index, as the search index will now remain
intact in-between document switches.

#### Tabs

The *tabs* feature will render *top-level subsections* in another navigational
layer below the header on big screens (but leave them untouched on mobile). It
can be enabled from `mkdocs.yml` with:

``` yaml
theme:
  features:
    - tabs
```

Note that all *top-level pages* (i.e. all top-level entries that directly refer
to an `*.md` file) defined inside the `nav` entry of `mkdocs.yml` will be
grouped under the first tab which will receive the title of the first page.

This means that there will effectively be no collapsible subsections for the
first tab, as each subsection is rendered as another tab. If you want more
fine-grained control, i.e.,  collapsible subsections for the first tab, you can
move all *top-level pages into a subsection*, so that the top-level is entirely
made up of subsections. Note that tabs are only shown for larger screens, so
make sure that navigation is plausible on mobile devices.

As an example, see the [`mkdocs.yml`][9] used to render these pages.

### Language

> Default: `en`

Material for MkDocs supports internationalization (i18n) and provides
translations for all template variables and labels. You can set the language
from `mkdocs.yml` with:

``` yaml
theme:
  language: en
```

The following language codes are supported:

<style>
  .md-language-list {
    -webkit-columns: 2;
       -moz-columns: 2;
            columns: 2;
  }
  .md-language-list li {
    -webkit-column-break-inside: avoid;
              page-break-inside: avoid;
                   break-inside: avoid;
  }
</style>
<ul class="md-language-list">
  <li><code>af</code> / Afrikaans</li>
  <li><code>ar</code> / Arabic</li>
  <li><code>my</code> / Burmese</li>
  <li><code>ca</code> / Catalan</li>
  <li><code>zh</code> / Chinese (Simplified)</li>
  <li><code>zh-Hant</code> / Chinese (Traditional)</li>
  <li><code>zh-TW</code> / Chinese (Taiwanese)</li>
  <li><code>hr</code> / Croatian</li>
  <li><code>cs</code> / Czech</li>
  <li><code>da</code> / Danish</li>
  <li><code>nl</code> / Dutch</li>
  <li><code>en</code> / English</li>
  <li><code>et</code> / Estonian</li>
  <li><code>fi</code> / Finnish</li>
  <li><code>fr</code> / French</li>
  <li><code>gl</code> / Galician</li>
  <li><code>de</code> / German</li>
  <li><code>gr</code> / Greek</li>
  <li><code>he</code> / Hebrew</li>
  <li><code>hi</code> / Hindi</li>
  <li><code>hu</code> / Hungarian</li>
  <li><code>id</code> / Indonesian</li>
  <li><code>it</code> / Italian</li>
  <li><code>ja</code> / Japanese</li>
  <li><code>kr</code> / Korean</li>
  <li><code>no</code> / Norwegian</li>
  <li><code>nn</code> / Norwegian (Nynorsk)</li>
  <li><code>fa</code> / Persian</li>
  <li><code>pl</code> / Polish</li>
  <li><code>pt</code> / Portuguese</li>
  <li><code>ro</code> / Romanian</li>
  <li><code>ru</code> / Russian</li>
  <li><code>sr</code> / Serbian</li>
  <li><code>sh</code> / Serbo-Croatian</li>
  <li><code>sk</code> / Slovak</li>
  <li><code>si</code> / Slovenian</li>
  <li><code>es</code> / Spanish</li>
  <li><code>sv</code> / Swedish</li>
  <li><code>th</code> / Thai</li>
  <li><code>tr</code> / Turkish</li>
  <li><code>uk</code> / Ukrainian</li>
  <li><code>vi</code> / Vietnamese</li>
  <li>
    <a href="https://bit.ly/38F5RCa">
      Add language
    </a>
  </li>
</ul>

While many languages are read `ltr` (left-to-right), Material for MkDocs also
supports `rtl` (right-to-left) directionality which is inferred from the
selected language, but can also be set with:

``` yaml
theme:
  direction: rtl
```

### Color palette

The Material Design [color palette][10] comes with 20 hues, all of which are
included with Material for MkDocs. Primary and accent colors can be set from
the project root's `mkdocs.yml`:

``` yaml
theme:
  palette:
    primary: indigo
    accent: indigo
```

If the colors are set with these configuration options, an additional CSS file
that includes the hues of the color palette is automatically included and linked
from the template.

??? tip "Custom colors with CSS variables"

    Material for MkDocs defines all colors as CSS variables. If you want to
    customize the colors beyond the palette (e.g. to use your brand's colors),
    you can add an [additional stylesheet][11] and override the defaults:

    ``` css
    :root {

      /* Default color shades */
      --md-default-fg-color:               ...;
      --md-default-fg-color--light:        ...;
      --md-default-fg-color--lighter:      ...;
      --md-default-fg-color--lightest:     ...;
      --md-default-bg-color:               ...;
      --md-default-bg-color--light:        ...;
      --md-default-bg-color--lighter:      ...;
      --md-default-bg-color--lightest:     ...;

      /* Primary color shades */
      --md-primary-fg-color:               ...;
      --md-primary-fg-color--light:        ...;
      --md-primary-fg-color--dark:         ...;
      --md-primary-bg-color:               ...;
      --md-primary-bg-color--light:        ...;

      /* Accent color shades */
      --md-accent-fg-color:                ...;
      --md-accent-fg-color--transparent:   ...;
      --md-accent-bg-color:                ...;
      --md-accent-bg-color--light:         ...;

      /* Code block color shades */
      --md-code-bg-color:                  ...;
      --md-code-fg-color:                  ...;
    }
    ```

  [10]: http://www.materialui.co/colors
  [11]: customization.md#additional-stylesheets

#### Primary color

> Default: `indigo`

Click on a color name to change the primary color of the theme:

<style>
  .md-typeset button[data-md-color-primary] {
    cursor: pointer;
    transition: opacity 250ms;
  }
  .md-typeset button[data-md-color-primary]:hover {
    opacity: 0.75;
  }
  .md-typeset button[data-md-color-primary] > code {
    display: block;
    color: var(--md-primary-bg-color);
    background-color: var(--md-primary-fg-color);
  }
</style>

<button data-md-color-primary="red"><code>red</code></button>
<button data-md-color-primary="pink"><code>pink</code></button>
<button data-md-color-primary="purple"><code>purple</code></button>
<button data-md-color-primary="deep-purple"><code>deep purple</code></button>
<button data-md-color-primary="indigo"><code>indigo</code></button>
<button data-md-color-primary="blue"><code>blue</code></button>
<button data-md-color-primary="light-blue"><code>light blue</code></button>
<button data-md-color-primary="cyan"><code>cyan</code></button>
<button data-md-color-primary="teal"><code>teal</code></button>
<button data-md-color-primary="green"><code>green</code></button>
<button data-md-color-primary="light-green"><code>light green</code></button>
<button data-md-color-primary="lime"><code>lime</code></button>
<button data-md-color-primary="yellow"><code>yellow</code></button>
<button data-md-color-primary="amber"><code>amber</code></button>
<button data-md-color-primary="orange"><code>orange</code></button>
<button data-md-color-primary="deep-orange"><code>deep orange</code></button>
<button data-md-color-primary="brown"><code>brown</code></button>
<button data-md-color-primary="grey"><code>grey</code></button>
<button data-md-color-primary="blue-grey"><code>blue grey</code></button>
<button data-md-color-primary="black"><code>black</code></button>
<button data-md-color-primary="white"><code>white</code></button>

<script>
  var buttons = document.querySelectorAll("button[data-md-color-primary]")
  buttons.forEach(function(button) {
    var attr = "data-md-color-primary"
    button.addEventListener("click", function() {
      document.body.setAttribute(attr, this.getAttribute(attr))
    })
  })
</script>

#### Accent color

> Default: `indigo`

Click on a color name to change the accent color of the theme:

<style>
  .md-typeset button[data-md-color-accent] {
    cursor: pointer;
    transition: opacity 250ms;
  }
  .md-typeset button[data-md-color-accent]:hover {
    opacity: 0.75;
  }
  .md-typeset button[data-md-color-accent] > code {
    display: block;
    color: var(--md-accent-fg-color);
  }
</style>

<button data-md-color-accent="red"><code>red</code></button>
<button data-md-color-accent="pink"><code>pink</code></button>
<button data-md-color-accent="purple"><code>purple</code></button>
<button data-md-color-accent="deep-purple"><code>deep purple</code></button>
<button data-md-color-accent="indigo"><code>indigo</code></button>
<button data-md-color-accent="blue"><code>blue</code></button>
<button data-md-color-accent="light-blue"><code>light blue</code></button>
<button data-md-color-accent="cyan"><code>cyan</code></button>
<button data-md-color-accent="teal"><code>teal</code></button>
<button data-md-color-accent="green"><code>green</code></button>
<button data-md-color-accent="light-green"><code>light green</code></button>
<button data-md-color-accent="lime"><code>lime</code></button>
<button data-md-color-accent="yellow"><code>yellow</code></button>
<button data-md-color-accent="amber"><code>amber</code></button>
<button data-md-color-accent="orange"><code>orange</code></button>
<button data-md-color-accent="deep-orange"><code>deep orange</code></button>

<script>
  var buttons = document.querySelectorAll("button[data-md-color-accent]")
  buttons.forEach(function(button) {
    var attr = "data-md-color-accent"
    button.addEventListener("click", function() {
      document.body.setAttribute(attr, this.getAttribute(attr))
    })
  })
</script>

### Fonts

> Default: `Roboto` and `Roboto Mono`

The [Roboto font family][12] is the default font included with the theme,
specifically the regular sans-serif type for text and the `monospaced` type for
code. Both fonts are loaded from [Google Fonts][13] and can be changed to any
valid webfont, like for example the [Ubuntu font family][14]:

``` yaml
theme:
  font:
    text: Ubuntu
    code: Ubuntu Mono
```

The text font will be loaded in weights 400 and **700**, the `monospaced` font
in regular weight. If you want to load fonts from other destinations or don't
want to use Google Fonts for data privacy reasons, just set `font` to `false`:

``` yaml
theme:
  font: false
```

  [12]: https://fonts.google.com/specimen/Roboto
  [13]: https://fonts.google.com
  [14]: https://fonts.google.com/specimen/Ubuntu

### Icons

> Default: `material/library` and `fontawesome/brands/git-alt`

Material for MkDocs uses icons in several places. Currently, the following icons
can be changed from `mkdocs.yml`: the logo icon, the repository icon and the
[social link icons][15]. While the social link icons are tied to the respective
entries, the other icons can be changed by referencing a valid path (without the 
trailing `.svg`) relative to the `.icons` folder which comes with the theme:

``` yaml
theme:
  icon:
    logo: material/library
    repo: fontawesome/brands/git-alt
```

All icons are directly inlined as `*.svg` files, so no further requests will be
made. Icon sets which are bundled with Material for MkDocs:

* [Material Design icons][16] (`material`): 5.1k icons
* [FontAwesome icons][17] (`fontawesome`): 1.6k icons
* [GitHub's Octicons][18] (`octicons`): 200 icons

__You can use all those icons [directly from :fontawesome-brands-markdown:
Markdown][19]!__

  [15]: #adding-social-links
  [16]: https://materialdesignicons.com/
  [17]: https://fontawesome.com/icons?d=gallery&m=free
  [18]: https://octicons.github.com/
  [19]: extensions/pymdown.md#icons

### Logo

> Default: icon set through `theme.icon.logo`

If you want to replace the icon in the header (screen) and drawer (mobile)
with your brand's logo, you can place an image file in your `docs` folder
and use the following option in `mkdocs.yml`:

``` yaml
theme:
  logo: images/logo.svg
```

Ideally, the image should be a square with a minimum resolution of 96x96, leave
some room towards the edges and be composed of high contrast areas on a
transparent ground, as it will be placed on the colored header and drawer.

### Favicon

> Default: `assets/images/favicon.png`

The default favicon can be changed with:

``` yaml
theme:
  favicon: images/favicon.png
```

## Extras

### Adding a source repository

To include a link to the repository of your project within your documentation,
set the following variables via your project's `mkdocs.yml`:

``` yaml
repo_name: squidfunk/mkdocs-material
repo_url: https://github.com/squidfunk/mkdocs-material
```

The name of the repository will be rendered next to the search bar on big
screens and as part of the main navigation drawer on smaller screen sizes.
Additionally, for GitHub and GitLab, the number of stars and forks is shown.
Note that the repository icon can be explicitly set through `theme.icon.repo`.

!!! question "Why is there an edit button at the top of every article?"

    If the `repo_url` is set to a GitHub or BitBucket repository, and the
    `repo_name` is set to *GitHub* or *BitBucket* (implied by default), an
    edit button will appear at the top of every article. This is the automatic
    behavior that MkDocs implements. See the [MkDocs documentation][20] on more
    guidance regarding the `edit_uri` attribute, which defines whether the edit
    button is shown or not.

  [20]: https://www.mkdocs.org/user-guide/configuration/#edit_uri

### Adding social links

Social accounts can be linked in the footer of the documentation using the
[icons][21] which are bundled with the theme. Note that each `icon` must point
to a valid path (without the trailing `.svg`) relative to the `.icons` folder
which comes with the theme:

``` yaml
extra:
  social:
    - icon: fontawesome/brands/github-alt
      link: https://github.com/squidfunk
    - icon: fontawesome/brands/twitter
      link: https://twitter.com/squidfunk
    - icon: fontawesome/brands/linkedin
      link: https://linkedin.com/in/squidfunk
```

By default, the link `title` will be set to the domain name, e.g. _github.com_.
If you want to set a discernable name, e.g., to improve your Lighthouse score,
you can set the `name` attribute on each social link.

  [21]: #icons

### Adding a Web App Manifest

A [Web App Manifest][22] is a simple JSON file that tells the browser about your
web application and how it should behave when installed on the user's mobile
device or desktop. You can specify such a manifest in `mkdocs.yml`:

``` yaml
extra:
  manifest: manifest.webmanifest
```

  [22]: https://developers.google.com/web/fundamentals/web-app-manifest/

## Integrations

### Google Analytics

MkDocs makes it easy to integrate site tracking with Google Analytics. To enable
tracking, which is disabled by default, you must add your tracking identifier
to `mkdocs.yml`:

``` yaml
google_analytics:
  - UA-XXXXXXXX-X
  - auto
```

Besides basic page views, *site search* can also be tracked to better understand
how people use your documentation and what they expect to find. To enable
search tracking:

1. Go to your Google Analytics **admin settings**
2. Select the property for the respective tracking code
3. Go to the **view settings** tab.
4. Scroll down and enable **site search settings**
5. Set the **query parameter** to `q`.

### Disqus

Material for MkDocs is integrated with [Disqus][23], so if you want to add a
comments section to your documentation set the *shortname* of your Disqus
project in `mkdocs.yml`:

``` yaml
extra:
  disqus: your-shortname
```

The comments section is inserted on *every page, except the index page*. The 
necessary JavaScript is automatically included.

!!! warning "Requirements"

    Note that `site_url` must be set in `mkdocs.yml` for the Disqus integration
    to load properly.

Disqus can also be enabled or disabled for specific pages using [Metadata][24].

  [23]: https://disqus.com
  [24]: extensions/metadata.md#disqus

## Extensions

[Markdown][3] comes with several very useful extensions, the following of which
are not enabled by default but highly recommended, so enabling them should
definitely be a good idea:

``` yaml
markdown_extensions:
  - admonition
  - codehilite:
      guess_lang: false
  - toc:
      permalink: true
```

See the following list of extensions supported by Material for MkDocs including
some more information on configuration and usage:

* [Admonition][25]
* [Codehilite][26]
* [Footnotes][27]
* [Metadata][28]
* [Permalinks][29]
* [PyMdown Extensions][30]

  [25]: extensions/admonition.md
  [26]: extensions/codehilite.md
  [27]: extensions/footnotes.md
  [28]: extensions/metadata.md
  [29]: extensions/permalinks.md
  [30]: extensions/pymdown.md

## Plugins

MkDocs' plugin architecture makes it possible to add pre- or post-processing
steps that sit between the theme and your documentation. For more information,
see the following list of plugins tested and supported by Material for MkDocs 
including more information regarding installation and usage:

* [Search][31] (enabled by default)
* [Minification][32]
* [Revision date][33]
* [Awesome pages][34]

For further reference, the MkDocs wiki contains a list of all
[available plugins][35].

  [31]: plugins/search.md
  [32]: plugins/minification.md
  [33]: plugins/revision-date.md
  [34]: plugins/awesome-pages.md
  [35]: https://github.com/mkdocs/mkdocs/wiki/MkDocs-Plugins

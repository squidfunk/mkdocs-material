---
template: overrides/main.html
---

# Customization

Project documentation is as diverse as the projects themselves and Material for
MkDocs is a great starting point for making it look beautiful. However, as you
write your documentation, you may reach a point where small adjustments are
necessary to preserve your brand's style.

## Adding assets

[MkDocs][1] provides several ways to customize a theme. In order to make a few
tweaks to Material for MkDocs, you can just add your stylesheets and JavaScript
files to the `docs` directory.

  [1]: https://www.mkdocs.org

### Additional stylesheets

If you want to tweak some colors or change the spacing of certain elements,
you can do this in a separate stylesheet. The easiest way is by creating a
new stylesheet file in the `docs` directory:

``` sh
.
├─ docs/
│  └─ stylesheets/
│     └─ extra.css
└─ mkdocs.yml
```

Then, add the following line to `mkdocs.yml`:

``` yaml
extra_css:
  - stylesheets/extra.css
```

Spin up the [live preview server][2] and start typing your changes in your
additional stylesheet file – you should see them almost instantly after saving.

  [2]: creating-your-site.md#previewing-as-you-write

### Additional JavaScript

The same is true for additional JavaScript. If you want to integrate another
syntax highlighter or add some custom logic to your theme, create a new
JavaScript file in the `docs` directory:

``` sh
.
├─ docs/
│  └─ javascripts/
│     └─ extra.js
└─ mkdocs.yml
```

Then, add the following line to `mkdocs.yml`:

``` yaml
extra_javascript:
  - javascripts/extra.js
```

Further assistance can be found in the [MkDocs documentation][3].

  [3]: https://www.mkdocs.org/user-guide/styling-your-docs/#customizing-a-theme

## Extending the theme

If you want to alter the HTML source (e.g. add or remove some parts), you can
extend the theme. MkDocs supports [theme extension][4], an easy way to override
parts of Material for MkDocs without forking from git. This ensures that you
can update to the latest version more easily.

  [4]: https://www.mkdocs.org/user-guide/styling-your-docs/#using-the-theme-custom_dir

### Setup and theme structure

Enable Material for MkDocs as usual in `mkdocs.yml`, and create a new folder
for `overrides` which you then reference using the `custom_dir` key:

``` yaml
theme:
  name: material
  custom_dir: overrides
```

!!! warning "Theme extension prerequisites"

    As the `custom_dir` variable is used for the theme extension process,
    Material for MkDocs needs to be installed via `pip` and referenced with the
    `name` parameter in `mkdocs.yml`. It will not work when cloning from `git`.

The structure in the `overrides` directory must mirror the directory structure
of the original theme, as any file in the `overrides` directory will replace the
file with the same name which is part of the original theme. Besides, further
assets may also be put in the `overrides` directory.

The directory layout of the theme is as follows:

``` sh
.
├─ .icons/                             # Bundled icon sets
├─ assets/
│  ├─ images/                          # Images and icons
│  ├─ javascripts/                     # JavaScript
│  └─ stylesheets/                     # Stylesheets
├─ partials/
│  ├─ integrations/                    # Third-party integrations
│  │  ├─ analytics.html                # - Google Analytics
│  │  └─ disqus.html                   # - Disqus
│  ├─ language/                        # Localized languages
│  ├─ footer.html                      # Footer bar
│  ├─ header.html                      # Header bar
│  ├─ hero.html                        # Hero teaser
│  ├─ language.html                    # Localized labels
│  ├─ logo.html                        # Logo in header and sidebar
│  ├─ nav.html                         # Main navigation
│  ├─ nav-item.html                    # Main navigation item
│  ├─ palette.html                     # Color palette
│  ├─ search.html                      # Search box
│  ├─ social.html                      # Social links
│  ├─ source.html                      # Repository information
│  ├─ source-date.html                 # Last updated date
│  ├─ source-link.html                 # Link to source file
│  ├─ tabs.html                        # Tabs navigation
│  ├─ tabs-item.html                   # Tabs navigation item
│  ├─ toc.html                         # Table of contents
│  └─ toc-item.html                    # Table of contents item
├─ 404.html                            # 404 error page
├─ base.html                           # Base template
└─ main.html                           # Default page
```

### Overriding partials

In order to override a partial, we can replace it with a file of the same name
and location in the `overrides` directory. For example. to replace the original
`footer.html`, create a `footer.html` file in the `overrides/partials`
directory:

``` sh
.
├─ overrides/
│  └─ partials/
│     └─ footer.html
└─ mkdocs.yml
```

MkDocs will now use the new partial when rendering the theme. This can be done
with any file.

### Overriding blocks

Besides overriding partials, it's also possible to override (and extend)
_template blocks_, which are defined inside the templates and wrap specific
features. To override a block, create a `main.html` file inside the `overrides`
directory:

``` sh
.
├─ overrides/
│  └─ main.html
└─ mkdocs.yml
```

Then, e.g. to override the site title, add the following line to `main.html`:

``` html
{% extends "base.html" %}

{% block htmltitle %}
  <title>Lorem ipsum dolor sit amet</title>
{% endblock %}
```

Material for MkDocs provides the following template blocks:

| Block name   | Wrapped contents                                |
| ------------ | ----------------------------------------------- |
| `analytics`  | Wraps the Google Analytics integration          |
| `announce`   | Wraps the announcement bar                      |
| `config`     | Wraps the JavaScript application config         |
| `content`    | Wraps the main content                          |
| `disqus`     | Wraps the Disqus integration                    |
| `extrahead`  | Empty block to add custom meta tags             |
| `fonts`      | Wraps the font definitions                      |
| `footer`     | Wraps the footer with navigation and copyright  |
| `header`     | Wraps the fixed header bar                      |
| `hero`       | Wraps the hero teaser (if available)            |
| `htmltitle`  | Wraps the `<title>` tag                         |
| `libs`       | Wraps the JavaScript libraries (header)         |
| `scripts`    | Wraps the JavaScript application (footer)       |
| `source`     | Wraps the linked source files                   |
| `site_meta`  | Wraps the meta tags in the document head        |
| `site_nav`   | Wraps the site navigation and table of contents |
| `styles`     | Wraps the stylesheets (also extra sources)      |
| `tabs`       | Wraps the tabs navigation (if available)        |

For more on this topic refer to the [MkDocs documentation][5].

  [5]: https://www.mkdocs.org/user-guide/styling-your-docs/#overriding-template-blocks

## Theme development

Material for MkDocs uses [Webpack][6] as a build tool to leverage modern web
technologies like [TypeScript][7] and [SASS][8]. If you want to make more
fundamental changes, it may be necessary to make the adjustments directly in
the source of the theme and recompile it.

  [6]: https://webpack.js.org/
  [7]: https://www.typescriptlang.org/
  [8]: https://sass-lang.com

### Environment setup

In order to start development on Material for MkDocs, a [Node.js][9] version of
at least 12 is required. First, clone the repository:

```
git clone https://github.com/squidfunk/mkdocs-material
```

Next, all dependencies need to be installed, which is done with:

```
cd mkdocs-material
pip install -r requirements.txt
pip install mkdocs-minify-plugin
npm install
```

  [9]: https://nodejs.org

### Development mode

Start the Webpack watchdog with:

```
npm start
```

Then, in a second session, start the MkDocs server with:

```
mkdocs serve
```

Point your browser to [localhost:8000][10] and you should see this documentation
in front of you.

!!! warning "Automatically generated files"

    Never make any changes in the `material` directory, as the contents of this
    directory are automatically generated from the `src` directory and will be
    overridden when the theme is built.

  [10]: http://localhost:8000

### Building the theme

When you're finished making your changes, you can build the theme by invoking:

```
npm run build
```

This triggers the production-level compilation and minification of all
stylesheets and JavaScript sources. When the command exits, the final files are
located in the `material` directory. Add the `theme_dir` variable pointing to
the aforementioned directory in the original `mkdocs.yml`.

Now you can run `mkdocs build` and you should see your documentation with your
changes to the original theme.

---
template: overrides/main.html
---

# Customization

## A great starting point

Project documentation is as diverse as the projects themselves and Material for
MkDocs is a good starting point for making it look great. However, as you write
your documentation, you may reach a point where some small adjustments are
necessary to preserve your brand's style.

## Adding assets

[MkDocs][1] provides several ways to interfere with themes. In order to make a
few tweaks to an existing theme, you can just add your stylesheets and
JavaScript files to the `docs` directory.

  [1]: https://www.mkdocs.org

### Additional stylesheets

If you want to tweak some colors or change the spacing of certain elements,
you can do this in a separate stylesheet. The easiest way is by creating a
new stylesheet file in your `docs` directory:

``` sh
mkdir docs/stylesheets
touch docs/stylesheets/extra.css
```

Then, add the following line to your `mkdocs.yml`:

``` yaml
extra_css:
  - stylesheets/extra.css
```

Spin up the development server with `mkdocs serve` and start typing your
changes in your additional stylesheet file – you can see them instantly after
saving, as the MkDocs development server supports live reloading.

### Additional JavaScript

The same is true for additional JavaScript. If you want to integrate another
syntax highlighter or add some custom logic to your theme, create a new
JavaScript file in your `docs` directory:

``` sh
mkdir docs/javascripts
touch docs/javascripts/extra.js
```

Then, add the following line to your `mkdocs.yml`:

``` yaml
extra_javascript:
  - javascripts/extra.js
```

Further assistance can be found in the [MkDocs documentation][2].

  [2]: https://www.mkdocs.org/user-guide/styling-your-docs/#customizing-a-theme

## Extending the theme

If you want to alter the HTML source (e.g. add or remove some part), you can
extend the theme. MkDocs supports [theme extension][3], an easy way to override
parts of a theme without forking and changing the main theme.

  [3]: https://www.mkdocs.org/user-guide/styling-your-docs/#using-the-theme-custom_dir

### Setup and theme structure

Reference the Material theme as usual in your `mkdocs.yml`, and create a
new folder for `overrides` which you reference using `custom_dir`:

``` yaml
theme:
  name: material
  custom_dir: overrides
```

!!! warning "Theme extension prerequisites"

    As the `custom_dir` variable is used for the theme extension process, the
    Material for MkDocs needs to be installed via `pip` and referenced with the
    `name` parameter in your `mkdocs.yml`.

The structure in the `overrides` directory must mirror the directory structure
of the original theme, as any file in the `overrides` directory will replace the
file with the same name which is part of the original theme. Besides, further
assets may also be put in the `overrides` directory.

The directory layout of the theme is as follows:

``` sh
.
├─ assets/
│  ├─ images/                          # Images and icons
│  ├─ javascripts/                     # JavaScript
│  └─ stylesheets/                     # Stylesheets
├─ partials/
│  ├─ integrations/                    # 3rd-party integrations
│  ├─ language/                        # Localized languages
│  ├─ footer.html                      # Footer bar
│  ├─ header.html                      # Header bar
│  ├─ hero.html                        # Hero teaser
│  ├─ language.html                    # Localized labels
│  ├─ nav-item.html                    # Main navigation item
│  ├─ nav.html                         # Main navigation
│  ├─ search.html                      # Search box
│  ├─ social.html                      # Social links
│  ├─ source-date.html                 # Last updated date
│  ├─ source-link.html                 # Link to source file
│  ├─ source.html                      # Repository information
│  ├─ tabs-item.html                   # Tabs navigation item
│  ├─ tabs.html                        # Tabs navigation
│  ├─ toc-item.html                    # Table of contents item
│  └─ toc.html                         # Table of contents
├─ 404.html                            # 404 error page
├─ base.html                           # Base template
└─ main.html                           # Default page
```

### Overriding partials

In order to override the footer, we can replace the `footer.html` partial with
our own partial. To do this, create the file `partials/footer.html` in the
`overrides` directory. MkDocs will now use the new partial when rendering the
theme. This can be done with any file.

### Overriding template blocks

Besides overriding partials, one can also override so called *template blocks*,
which are defined inside the templates and wrap specific features. To override a
template block, create a `main.html` inside the `overrides` directory and define
the block, e.g.:

``` jinja
{% extends "base.html" %}

{% block htmltitle %}
  <title>Lorem ipsum dolor sit amet</title>
{% endblock %}
```

Material for MkDocs provides the following template blocks:

| Block name   | Wrapped contents                                |
| ------------ | ----------------------------------------------- |
| `analytics`  | Wraps the Google Analytics integration          |
| `announce`   | Wraps the Announcement bar                      |
| `config`     | Wraps the JavaScript application config         |
| `content`    | Wraps the main content                          |
| `disqus`     | Wraps the disqus integration                    |
| `extrahead`  | Empty block to define additional meta tags      |
| `fonts`      | Wraps the webfont definitions                   |
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

For more on this topic refer to the [MkDocs documentation][4]

  [4]: https://www.mkdocs.org/user-guide/styling-your-docs/#overriding-template-blocks

## Theme development

Material for MkDocs uses [Webpack][5] as a build tool to leverage modern web
technologies like [TypeScript][6] and [SASS][7]. If you want to make more
fundamental changes, it may be necessary to make the adjustments directly in
the source of the theme and recompile it. This is fairly easy.

  [5]: https://webpack.js.org/
  [6]: https://www.typescriptlang.org/
  [7]: https://sass-lang.com

### Environment setup

In order to start development on Material for MkDocs, a [Node.js][8] version of
at least 12 is required. First, clone the repository:

``` sh
git clone https://github.com/squidfunk/mkdocs-material
```

Next, all dependencies need to be installed, which is done with:

``` sh
cd mkdocs-material
pip install -r requirements.txt
npm install
```

  [8]: https://nodejs.org

### Development mode

Start the Webpack watchdog with:

``` sh
npm start
```

Then, in a second session, start the MkDocs server with:

```sh
mkdocs serve
```

Point your browser to [localhost:8000][9] and you should see this documentation in front of you.

!!! warning "Automatically generated files"

    Never make any changes in the `material` directory, as the contents of this
    directory are automatically generated from the `src` directory and will be
    overridden when the theme is built.

  [9]: http://localhost:8000

### Build process

When you've finished making your changes, you can build the theme by invoking:

``` sh
npm run build
```

This triggers the production-level compilation and minification of all
stylesheets and JavaScript sources. When the command exits, the final files are
located in the `material` directory. Add the `theme_dir` variable pointing to
the aforementioned directory in your original `mkdocs.yml`.

Now you can run `mkdocs build` and you should see your documentation with your
changes to the original theme.

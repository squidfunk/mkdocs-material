# Customization

## A good starting point

Project documentation is as diverse as the projects themselves and the Material
theme is a good starting point for making it look good. However, as you write
your documentation, you may reach some point where some small adjustments are
necessary to preserve the style.

## Small tweaks

[MkDocs][] provides a simple way for making small adjustments, that is changing
some margins, centering text, etc. Simply put the CSS and Javascript files that
contain your adjustments in the `docs` directory (ideally in subdirectories of
their own) and include them via the `extra_css` and `extra_javascript`
variables in your `mkdocs.yml`:

``` yaml
extra_css: ['/stylesheets/extra.css']
extra_javascript: ['/javascripts/extra.js']
```

Further assistance on including extra CSS and Javascript can be found in the
[MkDocs documentation][].

## Fundamental changes

If you want to make larger adjustments like changing the color palette or
typography, you should check out or download the repository of the project and
compile the SASS sources with your changes. The project design is very modular,
so most things can be tweaked by changing a few variables.

### Setup

In order to compile the project, you need `node` with a version greater than
`0.11` up and running. Then, make sure `bower` is installed or install it:

``` sh
npm install -g bower
```

The project itself is hosted on GitHub, so the next
thing you should do is clone the project from GitHub:

``` sh
git clone https://github.com/squidfunk/mkdocs-material
```

Then you change the directory and install all dependencies specified in the
`package.json` and `bower.json` with the following command:

``` sh
cd mkdocs-material
npm install && bower install
```

### Development

The asset pipeline is contained in `Gulpfile.js`, which you can start with
`gulp watch`. If you specify the `--mkdocs` flag, this will also run
`mkdocs serve`, to monitor changes to the documentation. Point your browser to [localhost:8000](http://localhost:8000) and you should see this very
documentation in front of your eyes.

``` sh
gulp watch --mkdocs
```

For example, changing the color palette is as simple as changing the `$primary`
and `$accent` variables in `src/assets/stylesheets/_palette.scss`:

``` css
$primary: $red-400;
$accent:  $teal-a700;
```

The color variables are defined by the SASS library [quantum-colors][] and
resemble all the colors contained in the material design palette.
[This page][material-colors] offers a really good overview of the palette.

### Building

When you finished making your changes, you can build the theme by invoking:

``` sh
gulp build --production
```

The `--production` flag triggers the production-level compilation and
minification of all CSS and Javascript sources. When the command is ready,
the final theme is located in the `material` directory. Add the `theme_dir`
variable pointing to the aforementioned directory in your original
`mkdocs.yml`:

``` yaml
theme_dir: 'mkdocs-material/material'
```

Now you can run `mkdocs build` and you should see your documentation with your
changes to the original Material theme.

[MkDocs]: http://www.mkdocs.org
[MkDocs documentation]: http://www.mkdocs.org/user-guide/styling-your-docs/#customising-a-theme
[quantum-colors]: https://github.com/nkpfstr/quantum-colors
[material-colors]: http://www.materialui.co/colors
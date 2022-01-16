---
template: overrides/main.html
---

# Changing the colors

As any proper Material Design implementation, Material for MkDocs supports
Google's original [color palette], which can be easily configured through 
`mkdocs.yml`. Furthermore, colors can be customized with a few lines of CSS to
fit your brand's identity by using [CSS variables][custom colors].

  [color palette]: http://www.materialui.co/colors
  [custom colors]: #custom-colors

## Configuration

### Color palette

#### Color scheme

[:octicons-tag-24: 5.2.0][palette.scheme support] ·
:octicons-milestone-24: Default: `default`

Material for MkDocs supports two color schemes: a light mode, which is just
called `default`, and a dark mode, which is called `slate`. The color scheme
can be set via `mkdocs.yml`:

``` yaml
theme:
  palette:
    scheme: default
```

Click on a tile to change the color scheme:

<div class="mdx-switch">
  <button data-md-color-scheme="default"><code>default</code></button>
  <button data-md-color-scheme="slate"><code>slate</code></button>
</div>

<script>
  var buttons = document.querySelectorAll("button[data-md-color-scheme]")
  buttons.forEach(function(button) {
    button.addEventListener("click", function() {
      var attr = this.getAttribute("data-md-color-scheme")
      document.body.setAttribute("data-md-color-scheme", attr)
      var name = document.querySelector("#__code_1 code span.l")
      name.textContent = attr
    })
  })
</script>

  [palette.scheme support]: https://github.com/squidfunk/mkdocs-material/releases/tag/5.2.0

#### Primary color

[:octicons-tag-24: 0.2.0][palette.primary support] ·
:octicons-milestone-24: Default: `indigo`

The primary color is used for the header, the sidebar, text links and several
other components. In order to change the primary color, set the following value
in `mkdocs.yml` to a valid color name:

``` yaml
theme:
  palette:
    primary: indigo
```

Click on a tile to change the primary color:

<div class="mdx-switch">
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
</div>

<script>
  var buttons = document.querySelectorAll("button[data-md-color-primary]")
  buttons.forEach(function(button) {
    button.addEventListener("click", function() {
      var attr = this.getAttribute("data-md-color-primary")
      document.body.setAttribute("data-md-color-primary", attr)
      var name = document.querySelector("#__code_2 code span.l")
      name.textContent = attr.replace("-", " ")
    })
  })
</script>

  [palette.primary support]: https://github.com/squidfunk/mkdocs-material/releases/tag/0.2.0

#### Accent color

[:octicons-tag-24: 0.2.0][palette.accent support] ·
:octicons-milestone-24: Default: `indigo`

The accent color is used to denote elements that can be interacted with, e.g.
hovered links, buttons and scrollbars. It can be changed in `mkdocs.yml` by
choosing a valid color name:

``` yaml
theme:
  palette:
    accent: indigo
```

Click on a tile to change the accent color:

<style>
  .md-typeset button[data-md-color-accent] > code {
    background-color: var(--md-code-bg-color);
    color: var(--md-accent-fg-color);
  }
</style>

<div class="mdx-switch">
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
</div>

<script>
  var buttons = document.querySelectorAll("button[data-md-color-accent]")
  buttons.forEach(function(button) {
    button.addEventListener("click", function() {
      var attr = this.getAttribute("data-md-color-accent")
      document.body.setAttribute("data-md-color-accent", attr)
      var name = document.querySelector("#__code_3 code span.l")
      name.textContent = attr.replace("-", " ")
    })
  })
</script>

  [palette.accent support]: https://github.com/squidfunk/mkdocs-material/releases/tag/0.2.0

### Color palette toggle

[:octicons-tag-24: 7.1.0][palette.toggle support] ·
:octicons-milestone-24: Default: _none_

It's also possible to offer a list of color palettes to the user, each of which
can include a [`scheme`][palette.scheme], [`primary`][palette.primary] and
[`accent`][palette.accent] color each. The user can toggle between those color
palettes:

``` yaml
theme:
  palette: # (1)!
    - scheme: default
      toggle:
        icon: material/toggle-switch-off-outline # (2)!
        name: Switch to dark mode
    - scheme: slate # (3)!
      toggle:
        icon: material/toggle-switch
        name: Switch to light mode
```

1.  Note that the `theme.palette` setting is now defined as a list.

2.  Enter a few keywords to find the perfect icon using our [icon search] and
    click on the shortcode to copy it to your clipboard:

    <div class="mdx-iconsearch" data-mdx-component="iconsearch">
      <input class="md-input md-input--stretch mdx-iconsearch__input" placeholder="Search icon" data-mdx-component="iconsearch-query" value="toggle switch" />
      <div class="mdx-iconsearch-result" data-mdx-component="iconsearch-result" data-mdx-mode="file">
        <div class="mdx-iconsearch-result__meta"></div>
        <ol class="mdx-iconsearch-result__list"></ol>
      </div>
    </div>

3.  With __2__ (color schemes) __x 21__ (primary colors) __x 17__ (accent color)
    = __714__ combinations, it's impossible to ensure that all configurations
    provide a good user experience (e.g. _yellow on light background_). Make
    sure that the color combination of your choosing provides enough contrast
    and tweak CSS variables where necessary.

The following properties must be set for each toggle:

`icon`{ #toggle-icon }

:   :octicons-milestone-24: Default: _none_ · :octicons-alert-24: Required –
    This property must point to a valid icon path referencing any icon bundled
    with the theme, or the build will not succeed. Some popular combinations:

    * :material-toggle-switch-off-outline: + :material-toggle-switch: – `material/toggle-switch-off-outline` + `material/toggle-switch`
    * :material-weather-sunny: + :material-weather-night: – `material/weather-sunny` + `material/weather-night`
    * :material-eye-outline: + :material-eye: – `material/eye-outline` + `material/eye`
    * :material-lightbulb-outline: + :material-lightbulb: – `material/lightbulb-outline` + `material/lightbulb`
    * :material-brightness-4: + :material-brightness-7: – `material/brightness-4` + `material/brightness-7`

`name`{ #toggle-name }

:   :octicons-milestone-24: Default: _none_ · :octicons-alert-24: Required –
    This property is used as the toggle's `title` attribute and should be set to a
    discernable name to improve accessibility. It will appear on mouse hover.

  [palette.toggle support]: https://github.com/squidfunk/mkdocs-material/releases/tag/7.1.0
  [palette.scheme]: #color-scheme
  [palette.primary]: #primary-color
  [palette.accent]: #accent-color
  [icon search]: ../reference/icons-emojis.md#search

### System preference

[:octicons-tag-24: 7.1.0][palette.media support] ·
:octicons-milestone-24: Default: _none_

In order to automatically set the color palette to the user's system preference,
a media query can be set as part of the `media` property next to the toggle
definition in `mkdocs.yml`:

``` yaml
theme:
  palette:
    - media: "(prefers-color-scheme: light)" # (1)!
      scheme: default
      toggle:
        icon: material/toggle-switch-off-outline
        name: Switch to dark mode
    - media: "(prefers-color-scheme: dark)" # (2)!
      scheme: slate
      toggle:
        icon: material/toggle-switch
        name: Switch to light mode
```

1.  This media query is __checked first__. It's also the __fallback__ when no
    media query matches.
2.  This media query is __checked second__. If it doesn't match, the first one
    is automatically used.

When the user first visits your site, the media queries are evaluated in the
order of their definition. The first media query that matches selects the
default color palette.

  [palette.media support]: https://github.com/squidfunk/mkdocs-material/releases/tag/7.1.0

## Customization

### Custom colors

Material for MkDocs implements colors using [CSS variables] (custom
properties). If you want to customize the colors beyond the palette (e.g. to
use your brand-specific colors), you can add an [additional style sheet] and
tweak the values of the CSS variables.

Let's say you're :fontawesome-brands-youtube:{ style="color: #EE0F0F" }
__YouTube__, and want to set the primary color to your brand's palette. Just
add:

=== ":octicons-file-code-16: docs/stylesheets/extra.css"

    ``` css
    :root {
      --md-primary-fg-color:        #EE0F0F;
      --md-primary-fg-color--light: #ECB7B7;
      --md-primary-fg-color--dark:  #90030C;
    }
    ```

=== ":octicons-file-code-16: mkdocs.yml"

    ``` yaml
    extra_css:
      - stylesheets/extra.css
    ```

See the file containing the [color definitions] for a list of all CSS variables.

  [CSS variables]: https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties
  [color definitions]: https://github.com/squidfunk/mkdocs-material/blob/master/src/assets/stylesheets/main/_colors.scss
  [additional style sheet]: ../customization.md#additional-css


### Custom color schemes

Besides overriding specific colors, you can create your own, named color scheme
by wrapping the definitions in a `[data-md-color-scheme="..."]`
[attribute selector], which you can then set via `mkdocs.yml` as described
in the [color schemes][palette.scheme] section:

=== ":octicons-file-code-16: docs/stylesheets/extra.css"

    ``` css
    [data-md-color-scheme="youtube"] {
      --md-primary-fg-color:        #EE0F0F;
      --md-primary-fg-color--light: #ECB7B7;
      --md-primary-fg-color--dark:  #90030C;
    }
    ```

=== ":octicons-file-code-16: mkdocs.yml"

    ``` yaml
    theme:
      palette:
        scheme: youtube
    extra_css:
      - stylesheets/extra.css
    ```

Additionally, the `slate` color scheme defines all of it's colors via `hsla`
color functions and deduces its colors from the `--md-hue` CSS variable. You
can tune the `slate` theme with:

``` css
[data-md-color-scheme="slate"] {
  --md-hue: 210; /* (1)! */
}
```

1.  The `hue` value must be in the range of `[0, 360]`

  [attribute selector]: https://www.w3.org/TR/selectors-4/#attribute-selectors

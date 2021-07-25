---
template: overrides/main.html
---

# Setting up social cards

Social cards, also known as social previews, are images that are displayed when
a link to your project documentation is shared on social media. Material for
MkDocs can generate beautiful social cards automatically, using the [colors][1],
[fonts][2] and [logo][3][^1] defined in `mkdocs.yml`.

  [^1]:
    Both types of logos, images (`theme.logo`) and icons (`theme.icon.logo`)
    are supported. While an image logo is used as-is, icons are filled with the
    color used in the header (white or black), which depends on the primary
    color.

  [1]: changing-the-colors.md#primary-color
  [2]: changing-the-fonts.md#regular-font
  [3]: changing-the-logo-and-icons.md#logo

## Configuration

### Built-in social cards

[:octicons-file-code-24: Source][4] ·
[:octicons-cpu-24: Plugin][4] ·
:octicons-beaker-24: Experimental ·
[:octicons-heart-fill-24:{ .mdx-heart } Insiders only][4]{ .mdx-insiders }

The [built-in social cards plugin][4] generates a social card image for every
page and adds the necessary meta tags, so it's displayed on social media when
shared. Enable it via `mkdocs.yml`:

``` yaml
plugins:
  - social
```

For example, the page on [setting up site analytics][5] renders as:

<figure markdown="1">

[![Social Cards][6]][6]

  <figcaption markdown="1">

Want to try it out? Copy the current URL and paste it into [Twitter's Card
validator][7] to see how social cards look in action.

  </figcaption>
</figure>

This is a built-in plugin, which means that no third-party plugin needs to be 
installed, as Material for MkDocs already bundles it. The following options
are available:

`cards_directory`{ #cards_directory }

:   :octicons-milestone-24: Default: `assets/images/social` – This option
    specifies where the generated social card images will be written to. It
    should normally not be necessary to change this option.

    ``` yaml
    plugins:
      - social:
          cards_directory: assets/images/social
    ```

  [4]: ../insiders/index.md
  [5]: setting-up-site-analytics.md
  [6]: ../assets/screenshots/social-cards.png
  [7]: https://cards-dev.twitter.com/validator

#### Caching

When enabled, the [social cards plugin][8] automatically fetches the fonts you
define in `mkdocs.yml` from Google Fonts, and uses them to render the text that
is displayed on the social card. The font files and generated cards are both
written to the `.cache` directory, which is used in subsequent builds to detect
whether the social cards need to be regenerated. You might want to:

1. Ignore the `.cache` directory in your project, by adding it to `.gitignore`.
2. When building your site for publishing, use a build cache to save the
   `.cache` directory in between builds. Taking the example from the
   [publishing guide][9], add the following lines:

    ``` yaml hl_lines="15-18"
    name: ci
      on:
        push:
          branches:
            - master
            - main
      jobs:
        deploy:
          runs-on: ubuntu-latest
          steps:
            - uses: actions/checkout@v2
            - uses: actions/setup-python@v2
              with:
                python-version: 3.x
            - uses: actions/cache@v2
              with:
                key: ${{ github.ref }}
                path: .cache
            - run: pip install mkdocs-material
            - run: mkdocs gh-deploy --force
    ```

  [8]: #built-in-social-cards
  [9]: ../publishing-your-site.md#with-github-actions

## Usage

If you want to adjust the title or set a custom description for the social card,
you can use the [Metadata][10] extension, which takes precedence over the
default values.

- [Changing the title][11]
- [Changing the description][12]

  [10]: ../reference/meta-tags.md#metadata
  [11]: ../reference/meta-tags.md#setting-the-page-title
  [12]: ../reference/meta-tags.md#setting-the-page-description

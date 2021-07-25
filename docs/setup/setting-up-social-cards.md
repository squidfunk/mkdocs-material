---
template: overrides/main.html
---

# Setting up social cards

Social cards, also known as social previews, are images that are displayed when
a link to your project documentation is shared on social media. Material for
MkDocs can generate beautiful social cards automatically, using the colors,
fonts and logo defined in `mkdocs.yml`.

## Configuration

### Built-in social cards

[:octicons-file-code-24: Source][1] ·
[:octicons-cpu-24: Plugin][1] ·
:octicons-beaker-24: Experimental ·
[:octicons-heart-fill-24:{ .mdx-heart } Insiders only][1]{ .mdx-insiders }

The [built-in social cards plugin][1] generates a social card image for every
page and adds the necessary meta tags, so it's displayed on social media when
shared. Enable it via `mkdocs.yml`:

``` yaml
plugins:
  - social
```

For example, the page on [setting up site analytics][2] renders as:

<figure markdown="1">

[![Social Cards][3]][3]

  <figcaption markdown="1">

Want to try it out? Copy the current URL and enter it into [Twitter's Card
validator][4] to see how social cards look in action.

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

  [1]: ../insiders/index.md
  [2]: setting-up-site-analytics.md
  [3]: ../assets/screenshots/social-cards.png
  [4]: https://cards-dev.twitter.com/validator

# Basic social cards

Social cards are images that other systems such as social media can display as
a preview for content linked to. It is easy to get started with the social
plugin, true to the motto of Material with MkDocs: "batteries included."

## Basics

Before you start, there are just a couple of [dependencies to install]. These
are libraries for image processing that the plugin needs to produce the social
cards, as well as their Python bindings.

[dependencies to install]: https://squidfunk.github.io/mkdocs-material/plugins/requirements/image-processing/

With those prerequisites met, it is simply a matter of activating the plugin,
which will:

* produce the social cards as PNG images for each page in your site;
* create meta data in the headers of your site's pages that will provide
  social media systems with key information and tell them how to find the
  social card image.

!!! example "Add social cards"

    Simply add the social plugin to your list of plugins:

    ```yaml hl_lines="3"
        plugins:
            - search
            - social
            - ...
    ```

Now, when you run `mkdocs build` and look at the `site` directory, you will
see that it contains subfolders under `assets/images/social` that reflect
the structure of your Markdown files. Each page has a corresponding PNG file
that contains the social card image.

Have a look at the generated HTML and you will see the metadata produced in
the `head` element, including one entry that points to the image.

## Background color

The social plugin has configuration options for changing aspects such as colors,
images, fonts, logos, the title, even the description. You can configure them
for all social cards in the `mkdocs.yml` and, in the Insiders Edition, they can
be overridden in the page header for individual pages.

!!! example "Change the background color"

    To change the background color to an attention-grabbing hot pink,
    you might add:

    ```yaml hl_lines="4-5"
    plugins:
    ...
    - social:
        cards_layout_options:
            background_color: "#ff1493"
    ```

## Logos

By default, the plugin uses the logo that you set for the whole site, either
through the `theme.logo` or the `theme.icon.logo` setting. The difference
between the two is that the `theme.icon.logo` version will directly embed the
logo's SVG code into the HTML, allowing it to inherit CSS color settings. When
you use `theme.logo`, the Material includes the logo as an image.

You can set your own logo specific for the social cards as well. The path used
is relative to your project root and needs to point to an SVG file or a pixel
image. It should be rectangular and have a transparent background.

!!! example "Set your own logo"

    ```yaml hl_lines="3-4"
    plugins:
    - social:
        cards_layout_options:
          logo: docs/assets/images/ourlogo.png
    ```

## Background images

In addition to adding your own logo, the most impactful way to personalize your
social cards is to add a background image instead of the default solid color
background. Make sure you choose one that will contrast well with the other
elements of the card.

Also, the background color gets rendered *on top of* the background image,
allowing you to use a transparent color to tint an image. To use just the image,
use the color value `transparent`.

!!! example "Add background image"

    ```yaml hl_lines="4 5"
    plugins:
    - social:
        cards_layout_options:
          background_image: layouts/background.png
          background_color: transparent
    ```

The path to the background image is resolved from the root of your project,
so this is where you should make the `layouts` directory and place the
background image. The default site of the social cards included with the plugin
is 1200x630 pixels, so choose an image that size or one that scales well to it.

## Additional layouts and styles <!-- md:sponsors -->

The Insiders Edition provides additional layouts as well as the option to
configure different styles for different (kinds of) pages.

The Insiders Edition comes with a number of additional layouts for the social
cards. For example, the `default/variant` layout adds a page icon to the card.
You can use this to distinguish social cards visually, depending on what kind
of page you are sharing.

For example, imagine you have a set of pages that advertise events and you want
to include a calendar icon as a visual indication that a card advertises an
event. In the following, you will set up a directory for event pages and use
the meta plugin to assign them a calendar icon.

!!! example "Social cards for event pages"

    First, create a directory in your `docs` directory to hold the event pages:

    ```
    $ mkdir docs/events
    ```

    Then, add a file `.meta.yml` inside this new directory with settings for
    the page icon and a hot pink background color that will stand out on
    social media. Note that you can override the background image by setting it
    to `null` here since it is not visible anyway because of the opaque coloring.

    ```yaml
    ---
    icon: material/calendar-plus
    social:
      cards_layout_options:
        background_image: null
        background_color: "#ff1493"
    ---
    ```

    Now add a page within the `docs/events` directoy. It does not need to have
    any special content, just a top level header.

    To turn on the `default/variant` layout in `mkdocs.yml`, add the
    `cards_layout` option and also add the meta plugin:

    ```yaml
    plugins:
      - meta
      - social:
          cards_layout: default/variant
    ```

    After running `mkdocs build`, you can see that the social card at
    `site/assets/images/social/events/index.png` features the page icon.

Note that the icon will also appear next to the navigation element for the
page. If that is not what you want then you will need to modify the social
card template to gets its icons from another source. You can learn how to
do this in the [custom social cards tutorial](custom.md).

## Per-page settings <!-- md:sponsors -->

With the Insiders Edition, you can customize the card layout for each
page by adding settings to the page header. You have effectively done this
in the previous exercise, but using the meta plugin to affect a whole set of
pages.

Say that in addition to regular events you also have the odd webinar and
for this you want to set a different icon and also set the description to
indicate that the event is part of the webinar series.

!!! example "Override card style in page header"

    Add the following to the top of the page in `docs/events` or create a new
    one:

    ```yaml
    ---
    icon: material/web
    social:
      cards_layout_options:
        description: Our Webinar Series
    ---
    ```

## What's next?

With the Insiders Edition, you can also define custom layouts if the
configuration options introduced above as not enough to meet your needs.
Continue to the [custom social cards tutorial](custom.md) if you want to
find out how to do this.

Social cards are particularly useful for blog posts. If you have a blog,
you need to do nothing more than to turn on both plugins to create social cards
to advertise your latest blog posts. If you do not have one yet but would like
to, why not check out the [blog tutorials](../index.md#blogs)?

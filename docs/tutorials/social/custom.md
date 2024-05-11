# Custom cards

The Insiders Edition allows you to define custom layouts for your social cards
to suit your specific needs if the configuration options are not enough.
For example, you may want to include the date of an event on the social
card as well as a calendar icon to indicate that the card leads to an
event page when clicked on.

## Setup

You can either design a custom layout from scratch or use an existing layout
as the basis that you add to or otherwise modify. In this tutorial, you will
use the default layout as the basis.

!!! example "Copy default layout to customize <!-- md:sponsors -->"

    Copy the default social card layout from your installation of Material
    for MkDocs to a new directory `layouts`. The instructions below assume you
    are in your project root and have a virtual environment within this. The
    path on your machine, of course, may differ.

    ```
    $ mkdir layouts
    $ cp venv/lib/python3.12/site-packages/material/plugins/social/templates/default.yml \
      layouts/event.yml
    ```

    Before customizing the social cards, you need to tell the plugin where to
    find them as well as tell MkDocs to watch for any changes. Add the following
    to the plugin configuration in your `mkdocs.yml`:

    ``` yaml hl_lines="2-6"
    plugins:
      - social:
          cards_layout_dir: layouts

    watch:
      - layouts
    ```

Have a look at the contents of `event.yml`. You will see that there are:

* a number of definitions of content pulled from the site,
* definitions of tags that end up in the `meta` elements in the page header
  of each page,
* a specification that consists of a number of layers that are applied on
  top of each other in the order in which they are defined.

## Define page metadata

In the following, you will add an event date and location to the social card.
As each event will have its own date and location, it makes sense to define
these in the page header and then of this information in the custom layout.

!!! example "Defining the event data <!-- md:sponsors -->"

    Create a page with the following content:

    ```yaml
    ---
    social:
      cards_layout: event
    event:
      date: 2024-04-08
      location: Online
    ---

    # Introduction to Material for MkDocs
    ```

## Extract page metadata

With the data defined in the page header, you can now add code to the layout
that pulls it out and makes it available to render later on. This is to separate
the data manipulation from the actually layout instructions and so make the
layout file easier to read.

!!! example "Adding data definitions"

    Add the following at the top of the layout file:

    ```yaml hl_lines="2-99"
    definitions:
      - &event >-
        {%- if 'event' in page.meta %}
            {%- if 'date' in page.meta['event'] %}
                {{ "%s - " | format(page.meta['event']['date'].strftime('%d %B %Y')) }}
            {%- else -%}
                Date is undefined!
            {%- endif -%}
            {%- if 'location' in page.meta['event'] -%}
                {{ page.meta['event']['location'] }}
            {%- else -%}
                Location is undefined!
            {%- endif -%}
        {%- else -%}
            No event data defined!
        {%- endif -%}
    ```

The code presented here checks whether the page header contains the necessary
entries and spits out a message to the social card if not. Unfortunately, there
is no straightforward way to raise an exception or log an error, so the messages
merely appear in the social card produced.

## Add event data layer

The next step is to use these data definitions in a new layer and add it to the
ones already present.

!!! example "Render date and location"

    Finally, add the following to the layout template:

    ```yaml
      - size: { width: 990, height: 50 }
        offset: { x: 50, y: 360 }
        typography:
        content: *event
        align: start
        color: *color
    ```

You should now see the social plugin use the custom layout on the event page
you set up.

!!! tip "Debugging layout files"

    Should you find that your layouts are causing your MkDocs build to fail,
    there are a number of things you can do:

    1. Run Mkdocs with the `--verbose` option to get more detailed reporting.
    2. Comment out things you recently added or that you suspect are the cause
    3. Install the `jinja2` command-line tool with `pip install Jinja2` and
       run it over your layout file, for example: `jinja2 event.yml`.

## What's next?

If you do not have a blog yet, why not check out the
[blog tutorials](../index.md#blogs) and learn how to set one up? The social
plugin will help you draw attention to your posts on social media.

Check out the [other tutorials](../index.md) we have prepared for you.
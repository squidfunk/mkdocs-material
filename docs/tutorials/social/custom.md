# Custom cards <!-- md:sponsors -->

The Insiders Edition allows you to define custom layouts for your social cards
to suit your specific needs if the configuration options are not enough.
For example, you may want to include the date of an event on the social
card as well as a calendar icon to indicate that the card leads to an
event page when clicked on.

!!! example "Custom layout for events <!-- md:sponsors -->"

    First, copy the default social card layout from your installation of Material
    for MkDocs to a new directory `layouts`. The instructions below assume you
    are in your project root and have a virtual environment within this. The
    path on your machine, of course may differ.

    ```
    $ mkdir layouts
    $ cp venv/lib/python3.12/site-packages/material/plugins/social/templates/default.yml \
      layouts/event.yml
    ```
    Have a look at the file contents. You will see that there are:

    * a number of definitions of content that is pulled from the site,
    * definitions of tags that end up in the `meta` elements in the page header
      of each page when it is generated,
    * a specification that consists of a number of layers that are applied on
      top of each other in the order in which they are defined.

    Before configuring the social cards, you need to tell the plugin where to
    find them, so add the following to the plugin configuration in your
    `mkdocs.yml`:

    ``` yaml hl_lines="2"
    - social:
        cards_layout_dir: layouts
    ```

    To include an event date and location, it makes sense to use information in
    the page header, where you might also specify that your custom card layout
    it to be used. Create a page with the following content:

    ```yaml
    ---
    tags:
      - events
    social:
      cards_layout: event
    event:
      date: 2024-04-08
      location: Online
    ---

    # Introduction to Material for MkDocs
    ```

    Given this data, we can add some code to the layout that pulls it out and
    makes it available to be rendered later on. Add the following at the top
    of the layout file:

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

    Now, add a new layer to the ones already present that renders the date and
    location:

    ```yaml
      - size: { width: 990, height: 50 }
        offset: { x: 50, y: 360 }
        typography:
        content: *event
        align: start
        color: *color
    ```

!!! tip "Debugging layout files"

    Should you find that your layouts are causing your MkDocs build to fail,
    there are a number of things you can do:

    1. Run Mkdocs with the `--verbose` option to get more detailed reporting.
    2. Comment out things you recently added or that you suspect are the cause
    3. Install the `jinja2` command-line tool with `pip install Jinja2` and
       run it over your layout file, for example: `jinja2 event.yml`.
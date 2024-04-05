# Blog tutorial

## 1. Overview
__Content:__ The tutorial guides you through the process of configuring the
[blog plugin], creating posts, setting up authors, providing secondary navigation
with tags and producing an RSS feed.

[blog plugin]: ../plugins/blog.md

__Prerequisites:__ This tutorial assumes that you have installed either the
[public version] or the [Insiders edition] of Material for MkDocs and that you have
worked through the [Creating your site] setup guide. Note that where the features
we use the Insiders edition, we mark these with the heart icon:
<!-- md:sponsors --> If you are using the public version then you can skip these
steps. Sometimes there will be ways of achieving the same goal that differ
between the public version and the Insider edition. In that case, we will show
them in a tabbed view so you can see one or the other.

[public version]: ../getting-started.md
[Insiders edition]: ../insiders/getting-started.md
[Creating your site]: ../creating-your-site.md


__Outcomes:__ After working through the tutorial, you will have learned how to
produce a professional or personal blog to engage with your audience. You will
know and have experienced how you can use the blog plugin in combination with
other features and third-party plugins to achieve this.

__Time required:__ To run through this tutorial in full you will typically need
to have about XX minutes of time. Note that the time it takes depends on a
number of factors, so this is only a rough estimation based on our experience
and testing.

## 2. Introduction

Blogs are a great way to engage with your audience. Software developers can use
a blog to announce new features, demonstrate their usage and provide background
information. You can demonstrate competence by commenting on the state of the
art or document your own work as best practice. Posts on current topics can help
draw in visitors for your main website and can keep your audience engaged. Of
course, you can blog about any topics close to your heart.

The [blog plugin] makes running a blog alongside your other content easy but you
can also configure it to run a stand-alone blog if posts are the only kind
of content you need. It becomes even more powerful when used in combination with
other features of Material for MkDocs such as the [tags plugin] or with third
party plugins such as the [RSS plugin].

[tags plugin]: ../../plugins/tags
[RSS plugin]: https://guts.github.io/mkdocs-rss-plugin/

!!! example "Explore the Material for MkDocs Blog"

    Take a moment to look at the [Material for MkDocs blog] to see what elements
    a blog consists of before moving on to the next section. What makes the blog
    different from the rest of the site?

[Material for MkDocs blog]: https://squidfunk.github.io/mkdocs-material/blog/

## 3. Key concepts

A blog consists of a number of self-contained _posts_ (also often called
articles).

An index page shows the posts in reverse chronological order, with the most
recent post at the top. It usually shows only a short _excerpt_ and a link that
the user can click to navigate to the full post.

Both the index page and the post itself usually list information such as
when you published the post, when you updated it, who the author is and what the
expected reading time is.

Since the blog posts are primarily arranged by time and not into a hierarchy,
their URLs do not reflect such a structure. Instead, each post's URL usually
contains a shortened description, the _slug_, which is usually derived from
the first heading in the post.

The main navigation structure is the timeline, which you can subdivide into
_categories_. In addition, posts can be _tagged_ to provide an additional
navigation structure based on content.

The navigation elements in the blog are the timeline, with the main index page
showing a given number of posts and an _archive_ section allowing access to
older posts, organized by year. The _categories_ section provides access to
index pages for the categories. In addition, when using tagging, you can also
create tag index pages.

Navigation by _author_ helps users to find posts by a specific user when there
are more than one. Each author index page lists posts by that author in reverse
chronological order and can provide more information about them.

Finally, an _RSS feed_ allows users to subscribe to a blog so that they get
notified when you publish new posts. RSS Feed readers are often used to access
blogs that a user follows. They usually support downloading the blog content for
offline consumption.

## 4. Setting up your blog

The blog plugin is part of Material for MkDocs but you need to configure it
in the `mkdocs.yml`.

!!! example "Set up a blog"

    If you have not done so already, create a project for your blog:

    === "MacOS/Linux"
        ```bash
        $ mkdocs new myblog
        $ cd myblog
        ```

    === "Windows"
        TODO

    Then edit the `mkdocs.yml` file in the newly created directory to make sure
    if has the following content:

    ```yaml
    site_name: Blog Tutorial
    site_description: an example blog set up following the tutorial
    site_url: http://www.example.com

    theme:
      name: material

    plugins:
      - search
      - blog
    ```

The blog plugin will create a directory structure for your blog posts if it does
not exist, so simply run a MkDocs build:

!!! example "Create directory structure"

    === "MacOS/Linux"
        ```bash
        $ mkdocs build
        $ ls -R docs
        blog		index.md

        docs/blog:
        index.md	posts

        docs/blog/posts:
        ```
    === "Windows"
        TODO

Now you can create your first blog post in `docs/blog/posts`. You can use any
naming convention and directory structure you like for your posts, as long as
they are inside `docs/blog/posts`.

Each post _must_ have a page header, which appears at the top of the Markdown
code between lines with three dashes. Within this header, you need to have at
least a `date` entry but you can add other data, as you will see below.
Following the header comes the page content. Note, however, that it is important
to have a level one heading as the plugin uses it to produce the _slug_. Also,
by adding `<!-- more -->` to the page, you can define where the excerpt will end
that the index page shows.

!!! example "Write your first post"

    Create a file `docs/blog/posts/myfirst.md` with the following contents:

    ```
    ---
    date: 2023-12-31
    ---

    # Happy new years eve!

    We hope you are all having fun and wish you all the best for the new year!
    <!-- more -->

    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua.
    ```

    Then, run `mkdocs serve` and point your web browser at
    `http://localhost:8000/blog`.

    Observe how the blog plugin automatically creates navigation elements for
    the blog. Later on we will see how this can be integrated into navigation
    for a site that contains not just a blog. Note the other elements of a blog
    are present and only an extract is shown. When you select the "Continue
    reading" link, you will get to the full blog post. Note how it has a URL
    generated from the first-level heading.

## 5. Post metadata

### Drafts

You may want to produce a draft of a blog post and work with it locally but
exclude it from the build that you publish. You can add a field to the page
header to indicate that a post is still in draft form.

!!! example "Create a draft"

    Create a second blog post in `docs/blogs/posts/draft.md` with the following
    contents:

    ```
    ---
    date: 2024-01-01
    draft: true
    ---

    # Happy new year!

    Happy 2024 to everyone. Wishing you all the best!
    <!-- more -->

    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua.
    ```

    Now, note how the draft appears on the index page but with a label that
    indicates that it is a draft. When you run `mkdocs build`, the draft will
    _not_ appear in the output:

    === "MacOS/Linux"
        ```
        $ mkdocs build
        $ ls site/blog
        2023		archive		index.html
        ```

    === "Windows"
        TODO

    The first blog post for 2024 is not there yet because it is still in draft
    stage. Remember to remove the `draft` setting in the header when it is time
    to publish it.

If you are using the [Insiders edition], you can also create
a folder to keep your drafts in and use the [Meta plugin] to add the
`draft` header setting to all the posts in that folder. We will cover the
Meta plugin later on.

[Meta plugin]: ../plugins/meta.md

### Edits

Sometimes, bloggers need to update a post. This might happen when they have made
a mistake or when something changes they need to reflect in the post. To
indicate you have edited a post, you can include an edit date in the page header:

!!! example "Editing a post"

    Make a change to your first blog post, then add an edit date to the header:

    ```hl_lines="3"
    ---
    date: 2023-12-31
    updated: 2024-01-02
    ---
    ```

### Reading time

To give the reader some idea of how long it might take them to read a post,
you can specify a reading time. Of course, reading times vary by individual as
well as by the subject matter and writing style. So, how do you set a reading
time for your content? Absent any other data, it seems sensible to start with
a reading speed used by big blogging platforms and adjust downward somewhat
if the content is fairly technical. [Medium use] a reading speed of 265 words
per minute. So, count the number of words in a post and divide by your reading
speed value to get the time, then round to the nearest minute. For content
in Chinese, Korean, and Japanese, use the value of 500 characters per minute
instead of words per minute.

[Medium use]:https://help.medium.com/hc/en-us/articles/214991667-Read-time

!!! example "Setting reading time"

    Add a reading time

    ```
    ---
    date: 2023-12-31
    updated: 2024-01-02
    readtime: 15
    ---
    ```

### Pinning

Sometimes, blog authors want to 'pin' a specific post so that it will always
appear at the top of the index page, no matter what else gets published. If you
are using the [Insiders edition], you can achieve this by adding the `pin`
attribute in the page header:

!!! example "Pin a post <!-- md:sponsors -->"

    Add the `pin` attribute to your first blog post:

    ```hl_lines="5"
    ---
    date: 2023-12-31
    updated: 2024-01-02
    readtime: 15
    pin: true
    ---
    ```

    Observe how this makes the post appear on top of the index page even though
    its publication date is prior to other posts.

### Custom slugs

Another useful header attribute is `slug`, which allows you to define the slug
for your post instead of having it auto-generated by the Blog plugin from the
first heading.

!!! example "Change slug"

    If, for example, you wanted the slug to be 'ny-eve'  instead of the somewhat
    lengthy 'happy-new-years-eve', you could add the following:

    ```hl_lines="6"
    ---
    date: 2023-12-31
    updated: 2024-01-02
    readtime: 15
    pin: true
    slug: ny-eve
    ---
    ```

    The URL for this post should now be
    `http://localhost:8000/blog/2023/01/31/ny-eve/`.

### Related links

When your blog is part of a wider site such as technical documentation, you
will want to provide links from blog posts into your other content. One way you
can do this is to have a related links section. The blog plugin creates one
for you if you provide link targets in your page header:

!!! example "Add a related links section"

    Add the following to a blog post:

    ``` hl_lines="4-6"
    ---
    date: 2023-12-31
    ...
    links:
      - index.md
      - tags.md
    ---
    ```

The nice thing here is that you do not need to provide a page title. The plugin
will deduce the link text by applying the same logic that MkDocs uses for the
main navigation. In fact, the syntax is the same as that of the `nav` section
in the `mkdocs.yml`, so you can override the title if you want and even define
subsections:

!!! example "Override the page titles"

    Change the link section to override the page titles:

    ```hl_lines="4-6"
    ---
    date: 2023-12-31
    ...
    links:
      - Homepage: index.md
      - Explore tags: tags.md
      - External links:
        - Material documentation: https://squidfunk.github.io/mkdocs-material
    ---
    ```

As you can see, subsections are rendered in a way similar to mobile navigation
menus.

## 6. Defining authors

If your blog has more than one author then you may want to identify the author
for each blog post. The blog plugin allows you to create a file that contains
the author information and to then reference the authors of a particular post in
the page header.

!!! example "Create author info"

    Create a file `docs/blog/.authors.yml` with this content:

    ```yaml
    authors:
      material:
        name: Material Team
        description: Creator
        avatar: https://simpleicons.org/icons/materialformkdocs.svg
      quidfunk:
        name: Martin Donath
        description: Creator
        avatar: https://github.com/squidfunk.png
    ```

    and then add a line to the header of the first post:


    ```hl_lines="4-5"
    ---
    date: 2023-12-31
    updated: 2024-01-02
    authors:
      - material
    ---
    ```

    Note that `authors` is a list, so you can specify multiple authors.

With the Insiders edition, you can create custom author index pages that
can highlight the contributions of an author as well as provide additional
information about them.

!!! example "Add author page <!-- md:sponsors -->"

    First, you need to enable author profiles in the `mkdocs.yml`:

    ```yaml hl_lines="4"
    plugins:
      - search
      - blog:
          authors_profiles: true
    ```

    Check your blog to see that there is now an extra entry in the main
    navigation next to `archive` and `categories` that lists the authors and
    their contributions.

    To customize the author page, you can create a page that overrides the one
    generated by default. First, create the `author` directory that the profile
    pages will live in:

    === "MacOS/Linux"
        ```
        $ mkdir docs/blog/author
        ```

    === "Windows"
        TODO

    Then create a page `docs/blog/author/material.md`:

    ```
    # The Material Team

    A small group of people dedicated to making writing documentation easy, if
    not outright fun! Here are some of the things we have blogged about:
    ```

    As you can see, the author index gets appended to the content you have
    written in the Markdown file.

## 7. Integrating navigation

So far, you have let the Blog plugin and MkDocs worry about navigation. For some
use cases, this might be enough and it is simply sufficient to not declare a
`nav` section in the `mkdocs.yml`.

However, you may want to integrate a blog with other content and a navigation
structure that you have defined in the `nav` section of the configuration.
In such cases, you need to provide a place where the Blog plugin should
attach the blog navigation to the rest of the navigation structure.

!!! example "Integrate with site navigation"

    Add the following to your `mkdocs.yml` to see how the Blog plugin can
    integrate the blog navigation with the overall navigation structure.
    Note that you do not need to add the individual blog posts to the navigation
    structure, nor placeholders for index pages. The Blog plugin will take care
    of that.

    ```yaml hl_lines="5"
    nav:
      - Home: index.md
      - Install: install.md
      - Usage: usage.md
      - Blog:
         - blog/index.md
    ```

    You will notice that "Blog" is duplicated in the navigation structure. To
    avoid this, you can use the `navigation.indexes` feature:

    ```yaml hl_lines="3 4"
    theme:
      name: material
      features:
        - navigation.indexes
    ```

!!! tip "Stand-alone blog"

    If what you need is a stand-alone blog instead of one that is integrated with
    a larger site, this can be done by using the `blog_dir` configuration option.
    To see how this is done, see [setting up a blog].
    The rest of the tutorial assumes that you are integrating the blog with
    a wider site.

[Setting up a blog]: ../setup/setting-up-a-blog.md#blog-only

!!! tip "Adding pages"

    You can add pages to the blog section by putting them into `docs/blog`
    and adding them to the navigation. The generated blog index pages
    (archive and categories) will be added to the navigation after these
    pages. We will see this below when we add a tag index.


## 8. Using categories

Categories are a way to make blog posts accessible by topic while retaining
the navigation structure based on chronology within each category listing.
Use categories when there is a limited set of non-overlapping categories that
you can categorize your posts into.

Categories appear in the main navigation, so are directly accessible from there.
This implies that there are relatively few categories as otherwise the
`categories` section in your main navigation will become too crowded.


!!! tip "Single or multiple categories?"

    While it is traditionally the case that a blog post would belong to only
    one category, Material for MkDocs actually allows you to assign multiple
    categories. While this gives you a degree of freedom, you should
    probably not use this too much, not least because you can use tags to
    deal with multiple classifications. We will cover them in the next step.


!!! example "Add a category"

    Add a category to your first blog post by adding it to the page header:

    ``` hl_lines="6 7""
    ---
    date: 2023-12-31
    updated: 2024-01-02
    authors:
      - material
    categories:
      - Holidays
    ---
    ```

    Now that the blog post has been categorised, the `Holidays` category appears
    under `Categories` in the main navigation and the blog post appears in the
    index page for this category.

Material allows you to control what categories can be used by declaring them in
the `mkdocs.yml`. This way you can make sure that authors stick to agreed
categories and that the plugin detects typos.

!!! example "Control your categories"

    Add a `categories_allowed` entry to the configuration of the Blog plugin
    with the entries "Holidays" and "News":

    ```yaml hl_lines="5-7"
    plugins:
      - search
      - blog:
          authors_profiles: true
          categories_allowed:
            - Holidays
            - News
    ```

    Now, then you add a category to a blog post that does not match one of these
    two, you should get a build error.

## 8. Using tags

The [Tags plugin] provides another way to classify blog posts and to make
them accessible independently of the main navigation structure. Tags are useful
for making related content easily discoverable even if it is in different parts
of the navigation hierarchy.

[Tags plugin]: https://squidfunk.github.io/mkdocs-material/plugins/tags/

You may have a tutorial, like this one, showcasing features, a more
comprehensive setup guide, as well as reference documentation. Adding the same
tag to all three shows that they are related. As you will see, it is possible to
navigate from a tagged page to the tag index and, from there, to other
pages that carry the same tag.

!!! example "Enable the plugin and add tags"

    First, you need to add the plugin to your `mkdocs.yml`:

    ```yaml hl_lines="8"
    plugins:
      - search
      - blog:
          authors_profiles: true
          categories_allowed:
            - Holidays
            - News
      - tags
    ```

    Once this is done, you can add tags to posts in the page header:

    ``` hl_lines="8-11""
    ---
    date: 2023-12-31
    updated: 2024-01-02
    authors:
      - material
    categories:
      - Holidays
    tags:
      - new year
      - hogmanay
      - festive season
    ---
    ```

You should see the tags that you defined at the top of the post. However, at the
moment that is it. While the blog plugin automatically creates an index page for
categories, the tags plugin does not do the same for tags. This is because the
tags plugin is not specific for blogs. You can use it for any site content, so
it is not obvious were the tag index should go.

You can configure a basic tag index using the public version of Material for
MkDocs. The Insider Edition supports this as well, of course, but also provides
an alternative index mechanism that allows for an arbitrary number of tag
indexes, scoped listings, shadow tags, nested tags, and much more.

!!! example "Adding a tags index"
    === "Basic tag index"

        To configure a tag index using the public version, add a `tags_file` entry
        to your configuration of the tags plugin and configure it in your `nav`
        section. Remember to add a colon at the end of the existing `tags` entry.

        ```yaml hl_lines="8-9 17"
        plugins:
            - search
            - blog:
                authors_profiles: true
                categories_allowed:
                    - Holidays
                    - News
            - tags:
                tags_file: blog/tags.md

        nav:
            - Home: index.md
            - Install: install.md
            - Usage: usage.md
            - Blog:
                - blog/index.md
                Tags: blog/tags.md
        ```

        The tag index will be appended to the configured page, which you should
        now create at the location specified.

        Note that you can put the tag index page anywhere in your primary
        navigation, so if you are using tags elsewhere instead of just in your
        blog then you may want to have the tag index outside the blog section
        of the navigation.


    === "Insider Edition"

        To add a tag index, you add a placeholder in a Markdown file to tell
        the plugin to insert an index at that point. This means that you
        can add content before and after the index. Crucially, you can add
        placeholders in multiple pages, each with a configuration of what
        subset of tags should be displayed in the index.

        The simplest index page looks like this. Create it under `docs/tags.md`.

        ```markdown
        # Tag index
        <!-- material/tags -->
        ```

        Now, you may want to keep the tags for your blog separate from tags
        you use in the rest of your page. You can achieve this by assigning
        the tag index a scope. Put the following under `docs/blog/tags.md`:

        ```markdown
        # Tag index  for the blog
        <!-- material/tags { scope: true } -->
        ```

        You now have two index pages. One that covers the whole site and one
        that covers only the blog.

        The tags plugin in the Insider Edition is an incredibly powerful tool
        and we can only scratch the surface of what is possible with it. If you
        want to explore more after you have worked for this part of the tutorial,
        have a look at the [tags plugin reference].

[tags plugin reference]: ../plugins/tags.md

## 10. Pagination

Once your blog starts growing, you may not want to pay attention to the number
of posts displayed per page. By default, the plugin displays up to 10 posts on
the archive and




## 11. Social Media

The blog plugin works well with the social plugin, which creates social cards
for all pages, including blog posts. Social cards are images that other systems
such as social media can display as a preview for content linked to.
It is easy to get started with the social plugin, true to the motto of
Material with MkDocs: "batteries included."

!!! example "Add social cards"

    To add social cards to your blog you need to install some dependencies.
    These differ depending on what operating system you use.

    TODO: paste in installation instructions here - use snippets since this is
    a lot of duplicated material?

    Once these prerequisites are fulfilled, you can simply add the social plugin
    to your list of plugins:

    ```yaml hl_lines="10"
        plugins:
            - search
            - blog:
                authors_profiles: true
                categories_allowed:
                    - Holidays
                    - News
            - tags:
                tags_file: blog/tags.md
            - social
    ```

    Now, then you run `mkdocs build` and look at the `site` directory, you will
    see that it contains subfolders under `assets/images/social` that reflect
    the structure of your Markdown files. Each page has a corresponding PNG file
    that contains the social card image. Of interest here are the social cards
    for the blog posts, so have a look at them.

    TODO: posting them to social media - demo with Mastodon?

Now, the social plugin provides a number of default layouts and configuration
options for changing aspects such as colors, images, fonts, logos, the title,
even the description.


!!! example "Changing background color"

    For example, to set the background color to an attention-grabbing hot pink,
    you might add:

    ```yaml hl_lines="4 5"
    plugins:
    ...
    - social:
        cards_layout_options:
            background_color: "#ff1493"
    ```

!!! tip "Override card layout in page header <!-- md:sponsors -->"

    With the Insider Edition, you can customize the card layout for each
    page by adding settings to the page header. So, you want only certain
    cards to be in hot pink:

    ```yaml
    ---
    social:
      cards_layout_options:
        background_color: "#ff1493"
    ---
    ```

### Custom cards <!-- md:sponsors -->

In the context of a blog, you may want to have more than just the blog post
title on the card. In the Insiders Edition, the social plugin allows you not
just to configure the existing layouts but also to develop your own from scratch
that contain the content that you need.

!!! example "Custom layout for events <!-- md:sponsors -->"

    For example, you may want to include the date of an event on the social
    card as well as a calendar icon to indicate that the card leads to an
    event page when clicked on.

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
    the header of a post, also specifying that the new event layout is to be
    used. Create a new blog post:

    ```yaml
    ---
    date: 2024-04-03
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

    Now, add a new layer to te ones already present that renders the date and
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

## 12. Meta Plugin

The Meta plugin is available in the Insiders Edition <!-- md:sponsors -->.
It helps simplify the management of metadata that is common to a group of
files that reside in the same subdirectory. Instead of having to repeat the
same metadata in the page headers of a number of files, you can add a
`.meta.yml` file in the directory and the contents will be merged into the
headers of all the pages contained.

For example, you may want to manage drafts by keeping them in a directory
together so that they are not only flagged as drafts but also easier to find.
(Otherwise, you would need to inspect the page headers or trace back from the
output to the files.)

!!! example "Drafts using the Meta plugin <!-- md:sponsors -->"

    You first need to activate the plugin in your `mkdocs.yaml`:

    ```yaml hl_lines="4"
    plugins:
      - search
      - blog
      - meta
    ```

    Now create the folder for the drafts:

    === "MacOS/Linux"

        ```bash
        $ mkdir docs/blog/posts/drafts
        ```

    === "Windows"
        TODO

    Now, within this folder, crate a file `.meta.yml` that contains:

    ```yaml
    draft: true
    ```

    Add another blog post and store it in `docs/blog/posts/drafts`. When you
    look at it locally, you will see the label that identifies it as a draft,
    while in the version built for publication it does not appear. To move a
    post from draft status to published, simply move it outside `drafts/`.

Another example of the use of the Meta plugin is setting the metadata for the
social plugin. Imagine you have a custom layout for events and need to apply
this to specific blog posts. You can simply keep all posts that are event
announcements in a subdirectory `events` and add a `.meta.yml` that contains
the necessary metadata:

!!! example "Creating event social cards with the Meta plugin <!-- md:sponsors -->"

    First, create the folder for the events:

    === "MacOS/Linux"

        ```bash
        $ mkdir docs/blog/posts/events
        ```

    === "Windows"

        TODO

    Now, add a `.meta.yaml` file with content to configure the social cards
    for these posts. You may also want to add the `event` tag while you are at
    it:

    ```yaml
    social:
        cards_layout: event
    tags:
      - events
    ```

    Now, create a post in `docs/blog/posts/events` with the following header:

    ```yaml
    ----
    date: 2024-04-03
    tags:
        - material
        - documentation
        - made easy
    event:
        date: 2024-04-08
        location: Online
    ----
    ```

    Build and inspect the result. You should see that the correct social card
    layout was used and that the `events` tag was added to the list of tags
    defined in the post itself.

While merging the data from the `.meta.yml` file, settings from the page header
take precedence, so you can always override settings by adding them to the
post itself.

## 13. RSS Feeds

Your readers can subscribe to a blog if you configure an RSS feed for it. An
easy way to do this is with the [MkDocs RSS Plugin], which is will integrated
with Material for MkDocs. Being a third-party plugin, it needs to be installed
before it can be used.

[MkDocs RSS Plugin]: https://guts.github.io/mkdocs-rss-plugin

!!! example "Add an RSS feed"

    Install the RSS plugin into your project:

    ```
    $ pip install mkdocs-rss-plugin
    ```

    It is important that have the `site_name`, `site_description` and
    `site_url` settings configured as instructed in [4. Setting up your blog].
    The RSS plugin makes use of this information to construct the feed, so make
    sure you have configured them:

    [4. Setting up your blog]: #4-setting-up-your-blog

    Now, configure it in the `mkdocs.yml` in the `plugins` section.

    ```yaml hl_lines="9"
    plugins:
        - search
        - blog:
            authors_profiles: true
            categories_allowed:
            - Holidays
            - News
        - tags
        - rss
    ```

    Have a look at http://localhost:8000/feed_rss_created.xml to see the RSS
    feed in all its XML glory. You can use a browser like Firefox or Chrome.

    Unfortunately, Safari will always look for an app for RSS feeds and will not
    display anything itself. Alternatively, you can use `curl` to get the feed
    and `xmllint` to format it:

    ```
    curl -s http://localhost:8000/feed_rss_created.xml | xmllint --format -
    ```

    You way want to try your feed with a feed reader. There are various desktop
    and mobile apps as well as online services. Of course, to use the latter you
    will need to deploy your project somewhere that is accessible to them.

This minimal configuration should work well if you have not made any changes
to the default configuration of the blog plugin.

The table below summarizes how the plugin constructs information for the feed
itself and what configuration options you can use modify the defaults. Required
RSS element are marked with an asterisk.

| RSS element      | default                    | configure |
| ---------------- | -------------------------- | :-------: |
| `title`*         | `site_name`                |           |
| `description`*   | `site_description`         |           |
| `link`*          | `site_url`                 |           |
| `atom:link`      | `site_url` + feed path     |           |
| `managingEditor` | `site_author`              |           |
| `copyright`      | `copyright`                |           |
| `language`       | `theme/language`           |           |
| `pubDate`        | MkDocs build timestamp     |           |
| `lastBuildDate`  | MkDocs build timestamp     |           |
| `ttl`            | 1440                       |           |
| `generator`      | MkDocs RSS plugin - v1.8.0 | NA        |

An RSS feed can have an image associated with it. The default image that the
RSS plugin uses is the site logo. You can use the `image` option if you want
a different image associated with the feed.

??? tip "`pubDate` vs. `lastBuildDate`"

    The RSS standard specifies to dates that can describe a feed: `pubDate` and
    `lastBuildDate`. The RSS standard does not define these well as the
    definitions given are largely tautological. In his book [Developing Feeds
    with RSS and Atom], Ben Hammersley gives a better explanation of the values
    of these fields:

    `pubDate` is the publication date and can be in the future, while the
    `lastBuildDate` states when the feed was last updated, so is always in the
    past.  Because these fields are not well defined, it is not certain what an
    RSS reader will make of them.

[Developing Feeds with RSS and Atom]: https://learning.oreilly.com/library/view/developing-feeds-with/0596008813/


## 14. Add a discussion system
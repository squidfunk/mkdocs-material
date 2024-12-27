# Basic blogs

Blogs are a great way to engage with your audience. Software developers can use
a blog to announce new features, demonstrate their usage and provide background
information. You can demonstrate competence by commenting on the state of the
art or document your own work as best practice. Posts on current topics can help
draw in visitors for your main website and can keep your audience engaged. Of
course, you can blog about any topics close to your heart.

The [blog plugin] makes running a blog alongside your other content easy but you
can also configure it to run a stand-alone blog if posts are the only kind
of content you need.

After a brief overview of the basic concepts of a blog, this tutorial guides you
through the process of configuring the [blog plugin], setting up your blog,
creating posts, and defining post metadata.

[blog plugin]: ../../plugins/blog.md

__Time required:__ typically 20 minutes

## Key concepts

**Post, excerpt**: a blog consists of a number of self-contained _posts_ (often called
articles) and an index page that shows the posts in reverse chronological order, with
the most recent post at the top. The index page usually shows only a short _excerpt_ and a
link that the user can click to navigate to the full post.

**Metadata**: both the index page and the post itself list information such as
when you published the post, when you updated it, who the author is, and what the
expected reading time is.

**Slug**: since the blog posts are primarily arranged by time and not into a hierarchy,
their URLs do not reflect such a structure. Instead, each post's URL
contains a shortened description, the _slug_, which is usually derived from
the first heading in the post.

**Navigation**: the main navigation structure is the timeline, which you can
subdivide into _categories_. The main index page shows the more recent posts
while an _archive_ section allows access to older ones, organized by year.
In addition, posts can be _tagged_ and _tag index pages_ provide an additional
navigation structure based on content.

You can see all these elements on the [Material for MkDocs blog].

[Material for MkDocs blog]: https://squidfunk.github.io/mkdocs-material/blog/

## Setting up your blog

The blog plugin is part of Material for MkDocs but you need to configure it
in the `mkdocs.yml`.

!!! example "Set up a blog"

    If you have not done so already, create a project for your blog,
    then edit the `mkdocs.yml` file to make sure it has the following content:

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

    The blog plugin will create a directory structure for your blog posts if it
    does not exist, so simply run `mkdocs serve` to get:

    ```
    docs
    ├── blog
    │   ├── index.md
    │   └── posts
    └── index.md
    ```

Now create your first blog post in `docs/blog/posts`. You can use any
naming convention and directory structure you like for your posts, as long as
they are inside `docs/blog/posts`.

Each post _must_ have a page header, which appears at the top of the Markdown
code between lines with three dashes. Within this header, you need to have at
least a `date` entry but you can add other data, as you will see below.
Following the header comes the page content. Note that it is important
to have a level one heading as the plugin uses it to produce the _slug_. Also,
by adding `<!-- more -->` to the page, you can define where the excerpt will end
that the index page shows.

!!! example "Write your first post"

    Create a file `docs/blog/posts/myfirst.md` with the following contents:

    ```
    ---
    date:
      created: 2023-12-31
    ---

    # Happy new years eve!

    We hope you are all having fun and wish you all the best for the new year!
    <!-- more -->

    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua.
    ```

    Then, run `mkdocs serve` and point your web browser at
    `http://localhost:8000/blog`.

    The blog plugin automatically creates navigation elements for
    the blog. The index page shows only the extract. When you select the
    "Continue reading" link, you will get to the full blog post. Note how it
    has a URL generated from the first-level heading.

!!! tip "Navigation"

    We also have a [tutorial on navigation] that shows you how to change the
    automatically created navigation and integrate the blog into your existing
    navigation structure. It shows how to create secondary navigation, produce
    author pages, and control pagination.

[tutorial on navigation]: navigation.md

## Post metadata

In addition to the date, you can provide other metadata and give the plugin
instructions, such as to treat a post as a draft or to pin it.

### Drafts

You may want to produce a draft of a blog post and work with it locally but
exclude it from the build that you publish. Simply add a field to the page
header to indicate that a post is still in draft form.

!!! example "Create a draft"

    Create a second blog post in `docs/blogs/posts/draft.md` with the following
    contents:

    ```hl_lines="3"
    ---
    date:
      created: 2024-01-01
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

    ```
    $ mkdocs build
    $ ls site/blog
    site/blog
    ├── 2023
    │   └── 12
    │       └── 31
    │           └── happy-new-years-eve
    │               └── index.html
    ...
    ```

    The first blog post for 2024 is not there yet because it is still in draft
    stage. Remember to remove the `draft` setting in the header when it is time
    to publish it.

If you are using the [Insiders Edition], you can also create
a folder to keep your drafts in and use the [Meta plugin] to add the
`draft` header setting to all the posts in that folder. This has the advantage
that it is easier to see which posts are still in draft form. We will cover the
Meta plugin later on.

[Meta plugin]: ../../plugins/meta.md

### Edits

Sometimes, bloggers need to update a post. This might happen when you make
a mistake or when something changes that you need to reflect in the post. To
indicate you have edited a post, you can include an `updated` date in the page
header.

!!! example "Editing a post"

    Make a change to your first blog post, then add an edit date to the header:

    ```hl_lines="3 4"
    ---
    date:
      created: 2023-12-31
      updated: 2024-01-02
    ---
    ```

The Metadata section of the blog post itself will contain the edit date,
though the index page omits this detail by default.

### Reading time

To give the reader some idea of how long it might take them to read a post,
a read time is automatically calculated. If you want to override this, you can
do so in the page header by specifying the number of minutes you estimate
your readers will take the read the post.

!!! example "Overriding the reading time"

    Add a reading time override to your first blog post:

    ```hl_lines="5"
    ---
    date:
      created: 2023-12-31
      updated: 2024-01-02
    readtime: 15
    ---
    ```

### Pinning

Sometimes, blog authors want to 'pin' a specific post so that it will always
appear at the top of the index page, no matter what else gets published. If you
are using the [Insiders Edition], you can achieve this by adding the `pin`
attribute in the page header:

!!! example "Pin a post <!-- md:sponsors -->"

    Add the `pin` attribute to your first blog post:

    ```hl_lines="6"
    ---
    date:
      created: 2023-12-31
      updated: 2024-01-02
    readtime: 15
    pin: true
    ---
    ```

    Observe how this makes the post appear on top of the index page even though
    its publication date is prior to other posts. A small pin icon shows that the
    post has been pinned.

### Related links

<!-- md:sponsors -->
<!-- md:version insiders-4.23.0 -->
<!-- md:flag experimental -->

When your blog is part of a wider site such as technical documentation, you
will want to provide links from blog posts into your other content. One way you
can do this is to have a related links section. In the [Insiders Edition], the
blog plugin can create one for you if you provide link targets in your page
header:

!!! example "Add a related links section <!-- md:sponsors -->"

    Add the following to a blog post:

    ``` hl_lines="5-7"
    ---
    date:
      created: 2023-12-31
    ...
    links:
      - index.md
      - blog/index.md
    ---
    ```

    The related links appear underneath the Metadata section.

The nice thing here is that you do not need to provide a page title. The plugin
will deduce the link text by applying the same logic that MkDocs uses for the
main navigation. In fact, the syntax is the same as that of the `nav` section
in the `mkdocs.yml`, so you can override the title if you want and even define
subsections:

!!! example "Override the page titles"

    Change the link section to override the page titles:

    ```hl_lines="6-9"
    ---
    date:
      created: 2023-12-31
    ...
    links:
      - Homepage: index.md
      - Blog index: blog/index.md
      - External links:
        - Material documentation: https://squidfunk.github.io/mkdocs-material
    ---
    ```

The plugin renders related links in the left sidebar on screens that are wide
enough and at the bottom of the post on narrow screens. Change the size of your
browser window to see this in action.

## Meta plugin

<!-- md:sponsors -->
<!-- md:version insiders-4.21.0 -->
<!-- md:plugin [meta] – built-in -->
<!-- md:flag experimental -->

The Meta plugin is available in the [Insiders Edition].
It helps simplify the management of metadata that is common to a group of
files in the same subdirectory. Instead of having to repeat the
same metadata in the page headers of a number of files, you can add a
`.meta.yml` file in the directory and the Meta plugin will merge its contents
into the headers of all the pages contained.
Settings from the page header take precedence, so you can always override
settings by adding them to a post's header.

For example, you may want to manage drafts by keeping them in a directory
together so that they are not only flagged as drafts but also easier to find.
(Otherwise, you would need to inspect the page headers or trace back from the
output to the files to figure out which posts are drafts.)

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
        ```powershell
        $ mkdir docs\blog\posts\drafts
        ```

    Now, within this folder, crate a file `.meta.yml` that contains:

    ```yaml
    draft: true
    ```

    Add another blog post and store it in `docs/blog/posts/drafts`. When you
    look at it locally, you will see the label that identifies it as a draft,
    while in the version built for publication it does not appear. To move a
    post from draft status to published, simply move it outside `drafts/`.

[meta]: ../../plugins/meta.md
[Insiders Edition]: ../../insiders/index.md

## What's next?

You should now have a working blog. However, as it accumulates content, you
may want to make sure that people can find posts they are interested in, so
you may want to add secondary navigation with tags and categories. You may
have more than one author and want to attribute posts to them as well as
generate author pages for them. We have a [tutorial on navigation, pagination,
and authors] that covers these topics.

[tutorial on navigation, pagination, and authors]: navigation.md

You may want to increase engagement with your blog by allowing people to
subscribe to an RSS feed or by setting up a comment system. The [engagement
and dissemination tutorial] walks you through setting these up.

[engagement and dissemination tutorial]: engage.md

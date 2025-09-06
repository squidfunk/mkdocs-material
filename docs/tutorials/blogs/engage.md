# Engagement and dissemination

You can foster reader engagement and improve the dissemination of content
on your blog by providing an RSS feed that people can subscribe to and by
integrating a discussion system. To learn more about who is or is not reading
your posts, you may want to integrate an analytics system. You may also want
to post on social media when you publish a new blog post. This tutorial gives
you a leg up on all of these topics.

__Time required:__ typically 30 minutes

## RSS feeds

An _RSS feed_ allows users to subscribe to a blog so that they get notified when
you publish new posts. RSS Feed readers are often used to access blogs that a
user follows. They usually support downloading the blog content for offline
consumption.

An easy way to create an RSS feed for your blog is to use the
[MkDocs RSS Plugin], which is well integrated with Material for MkDocs.
Since it is a third-party plugin, you need to install it before using it.

[MkDocs RSS Plugin]: https://guts.github.io/mkdocs-rss-plugin


!!! example "Add an RSS feed"

    Install the RSS plugin into your project:

    ```
    $ pip install mkdocs-rss-plugin
    ```

    It is important that have the `site_name`, `site_description` and
    `site_url` settings configured as [instructed in the basic blog tutorial].
    The RSS plugin makes use of this information to construct the feed, so make
    sure you have configured them.

    [instructed in the basic blog tutorial]: basic.md#setting-up-your-blog

    Now, configure the plugin in the `mkdocs.yml`. The options provided restrict
    the pages that RSS entries are created for to the blog posts, which is
    probably what you want. Also note the configuration of the date fields to
    match the format that Material for MkDocs uses to accommodate both a
    creation date and a date for updates.

    ```yaml hl_lines="9"
    plugins:
        - ...
        - rss:
            match_path: "blog/posts/.*"
            date_from_meta:
              as_creation: date.created
              as_update: date.updated
    ```

    Have a look at http://localhost:8000/feed_rss_created.xml to see the RSS
    feed in all its XML glory. You can use a browser like Firefox or Chrome that
    can display the raw RSS feed or use `curl` to get the feed and `xmllint` to
    format it. (You may need to install these tools.)

    ```
    curl -s http://localhost:8000/feed_rss_created.xml | xmllint --format -
    ```

    You may also want to try your feed with a feed reader. There are various desktop
    and mobile apps as well as online services. Of course, to use the latter you
    will need to deploy your project somewhere that is accessible to them.

This minimal configuration should work well if you have not made any changes
to the default configuration of the blog plugin. For more information on adapting
the feed to your needs, see [the RSS plugin's documentation].

[the RSS plugin's documentation]: https://guts.github.io/mkdocs-rss-plugin/

## Social media buttons

Social media buttons can serve two purposes: to allow your readers to navigate
to your social media profiles or to share content you have published via their
own accounts.

### Profile links

Links to social media profiles a usually provided in the footer of pages and
Material for MkDocs makes this easy. All you need to do is to provide the
necessary links and define the icons to use.

!!! example "Adding social media profile links"

    Add an `extra` section to your `mkdocs.yml` and, within it, a `social`
    section to contain a list of link definitions. These consist of the logo
    to use and the link to the profile.

    ```yaml
    extra:
      social:
        - icon: fontawesome/brands/mastodon
          name: squidfunk on Mastodon
          link: https://fosstodon.org/@squidfunk
    ```

    For the `icon`, you can choose any valid path to an icon bundled with the
    theme. The `name` will be used as the title attribute for the icon and
    including this improves accessibility.
    For popular social media systems, the link needs to be absolute and
    needs to include the scheme, most likely `https://`.

    You can also use other schemes. For example, to create an icon that allows
    people to create an email, add this:

    ```yaml
    extra:
      social:
      - icon: /fontawesome/regular/envelope
        name: send me an email
        link: mailto:<email-address>
    ```

    Finally, you can specify a URL within your site, such as to your contact
    page. It is possible to specify only the path to the page:

    ```yaml
    extra:
      social:
      - icon: /material/mailbox
        name: contact us
        link: /contact
    ```

### Share and like buttons

Adding buttons that let people share your content on social media is a bit
more involved, which is why there are companies offering components for this.


!!! tip "Data Protection"

    "Share" and "Like" buttons that use integrations provided by social media
    companies often leave copious data traces even when the user does not
    interact with these buttons. If you choose to integrate such feature on
    your site please be aware of the data protection implications and your
    duties as a provider to ensure that processing occurs only once the user
    has granted consent.

This implementation of share buttons deliberately does not use third party code.
It supports sharing to Twitter/X and Facebook without causing a data flow to
these companies whenever someone views the pages. Only when someone clicks a
share button will there be interactions with those companies' servers.

!!! example "Add share buttons"

    In order to add the share buttons, you can add a hook that appends buttons
    for sharing the current page.

    Create a directory `hooks` in your project root and configure it
    in your `mkdocs.yml`:

    ```yaml
    hooks:
      - hooks/socialmedia.py
    ```

    Add the file `hooks/socialmedia.py` with the following Python code:

    ```python
    from textwrap import dedent
    import urllib.parse
    import re

    x_intent = "https://x.com/intent/tweet"
    fb_sharer = "https://www.facebook.com/sharer/sharer.php"
    include = re.compile(r"blog/[1-9].*")

    def on_page_markdown(markdown, **kwargs):
        page = kwargs['page']
        config = kwargs['config']
        if not include.match(page.url):
            return markdown

        page_url = config.site_url+page.url
        page_title = urllib.parse.quote(page.title+'\n')

        return markdown + dedent(f"""
        [Share on :simple-x:]({x_intent}?text={page_title}&url={page_url}){{ .md-button }}
        [Share on :simple-facebook:]({fb_sharer}?u={page_url}){{ .md-button }}
        """)
    ```

    The hook first checks if the current page is a blog post and then appends
    Markdown code for the share buttons. The buttons use icons, so you also need
    to configure the following markdown extensions:

    ```yaml
    markdown_extensions:
      - attr_list
      - pymdownx.emoji:
          emoji_index: !!python/name:material.extensions.emoji.twemoji
          emoji_generator: !!python/name:material.extensions.emoji.to_svg
    ```


## Add a discussion system

Allowing your readers to comment on your posts is a great way of receiving
feedback, learning something, as well as giving readers the opportunity to
discuss the content and the topic it is about.

There are plenty of discussion system out there and you will need to consider
your audience when choosing one appropriate for your blog. Likewise, you will
also need to consider existing commitments to communication channels. If you
are a heavy user Slack, for example, you may have a string preference for this
system. Consider that when you add a communication channel, you will need to
be prepared to use it regularly and to moderate discussions.

### Giscus integration

In this tutorial, we will be using [Giscus] because it is free, open source,
and uses [GitHub Discussions] as a backend. Because a lot of users of Material
for MkDocs use GitHub, this seems like an obvious choice.

[Giscus]: https://giscus.app/
[GitHub Discussions]: https://docs.github.com/en/discussions

To add Giscuss to your blog you will need to go through a number of steps:

1. Create a GitHub repository if there is not already one
2. Turn on discussions and install the [Giscus app]
3. Configure the code needed to embed Giscus into your blog
4. Add the code to your MkDocs project

[Giscus app]: https://github.com/apps/giscus

You may want to create a test repository for this tutorial that you can
scrap later on. The instructions below assume that you are user "example"
and that you create a repository "giscus-test." The repository will need
to be public for people to be able to use the discussions.

In the instructions given below, you will need to replace at least the username
but also the repository name if you chose another name such as when you
want to work directly on an existing repository.

!!! example "Turn on discussions and install the Giscus app"

    Once the repository is set up, go to its settings page and find
    `Features` in the `General` section. Tick the checkbox for `Discussions`.
    You will see that `Discussions` appears in the top navigation for the
    repository. If you are using a live repository then you may want to add some
    minimal content to the discussions section at this point and come back to the
    tutorial.

    Next, you need to install the [Giscus app] by following the link in this
    sentence, and choosing `Install`, then following the instructions to choose
    where the Giscus app is to be installed:

    1. Choose the account or organization for the repository you want to use.
    2. Choose to install only on select repositories and select the one you
       want to use. Note that you can choose more than one repository here.
    3. Select `Install` at the end. You may need to authenticate to give
       permission for this to happen.
    4. You will end up on the `Applications` page in your settings, where you
       can control the Gicsus app and uninstall it if so desired.

That is all the preparation you will need for the repository. Next, it is time
to generate a piece of code that embeds Giscuss in your site. The resulting code
snippet will look something like this:

```html
<script src="https://giscus.app/client.js"
        data-repo="<username>/<repository>"
        data-repo-id="..."
        data-category="Announcements"
        data-category-id="..."
        data-mapping="title"
        data-strict="1"
        data-reactions-enabled="1"
        data-emit-metadata="1"
        data-input-position="top"
        data-theme="preferred_color_scheme"
        data-lang="en"
        data-loading="lazy"
        crossorigin="anonymous"
        async>
</script>
```

!!! example "Configure the code needed to embed Giscus into your blog"

    Go to the [Giscus homepage] and configure the embedding code. There are a
    number of settings:

    1. Choose the language
    2. Enter the username / organization name and repository name
    3. Choose how the discussions are to be mapped to the page on your blog.
       Because for a blog post the title is the basis of the URL, it makes
       sense to use the `Discussion title contains page <title>` option.
    4. Under `Discussion Category` choose `Announcements` to limit the creation
       of new discussions to Giscuss and people with maintainer or admin
       permissions.
    5. Under `Features`, select the following:
         1. Enable reactions for the main post
         2. Emit discussion metadata
         3. Place the comment box above the comments
    6. Under `Theme`, select `Preferred color scheme` so that Giscus matches
       the color scheme selected by the user for your site.

[Giscus homepage]: https://giscus.app/

With these settings in place, you now need to integrate the code into your
site. There is a partial `partials/comments.html` that exists for this purpose
and is empty be default. It is included by the `content.html` partial, so will
be included for every page on your site. You may or may not want this. In this
tutorial, you will limit the Giscus integration to only blog posts but it is
easy enough to leave out the code that achieves this if you want to have Giscus
discussions active for every page.

!!! example "Add Giscus integration code"

    First, you need to create an `overrides` directory that will contain the
    templates and partials you want to override.

    ```
    mkdir -p overrides/partials
    ```

    You need to declare it in your `mkdocs.yaml`:

    ```yaml hl_lines="3"
    theme:
      name: material
      custom_dir: overrides
    ```

    Now add a file `overrides/partials/comments.html` and paste in the code
    snippet you obtained from the Giscus homepage. Look at the result locally
    and you will see that the integration is active on all pages of the site.
    If you want to restrict it to your blog posts, you need to add a conditional
    around the Giscus script that tests if comments should be included. A simple
    way of doing this is to test for a metadata flag:

    ```html
    {% if page.meta.comments %}
    <script>...</script>
    {% endif %}
    ```

    The disadvantage is that you now need to manually turn on comments for each
    blog post - unless you want to turn them off on some. To get the comments
    section on all blog posts, use code like this:

    ```html
    {% if page.file.src_uri.startswith('blog/posts') %}
    <script>...</script>
    {% endif %}
    ```

    You should see now that the Giscus comments are added at the bottom of your
    blog posts but not on other pages.

## What's next?

This is the end of the blog tutorial. We hope you have enjoyed it and manage to
set up your blog the way you like it. There are numerous other features and
options that we have not been able to cover here. The [blog plugin reference]
provides comprehensive documentation for the plugin. You may also want to
look at the [social plugin tutorial] to generate social cards for your blog
posts that get displayed when you post links to social media systems.

[blog plugin reference]: https://squidfunk.github.io/mkdocs-material/plugins/blog/
[social plugin tutorial]: ../social/basic.md

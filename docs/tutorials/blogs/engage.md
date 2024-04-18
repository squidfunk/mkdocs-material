# Engagement and dissemination

You can foster reader engagement and improve the dissemination of content
on your blog by providing an RSS feed that people can subscribe to and by
integrating a discussion system. To learn more about who is or is not reading
your posts, you may want to integrate an analytics system. You may also want
to post on social media when you public a new blog post. This tutorial gives
you a leg up on all of these topics.

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

    Now, configure the plugin in the `mkdocs.yml`:

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
    feed in all its XML glory. You can use a browser like Firefox or Chrome that
    can display the raw RSS feed or use `curl` to get the feed and `xmllint` to
    format it. You may need to install these tools:

    ```
    curl -s http://localhost:8000/feed_rss_created.xml | xmllint --format -
    ```

    You may also want to try your feed with a feed reader. There are various desktop
    and mobile apps as well as online services. Of course, to use the latter you
    will need to deploy your project somewhere that is accessible to them.

This minimal configuration should work well if you have not made any changes
to the default configuration of the blog plugin. For more information on
adapting the feed to your needs, see [the RSS plugin's documentation].

[the RSS plugin's documentation]: https://guts.github.io/mkdocs-rss-plugin/

## Add a discussion system
---
date: 2022-09-12
authors: [squidfunk]
description: >
  Our new blog is built with the brand new built-in blog plugin. You can build
  a blog alongside your documentation or standalone
categories:
  - Blog
links:
  - Getting started with Insiders: insiders/getting-started.md#requirements
  - setup/setting-up-a-blog.md#built-in-blog-plugin
---

# Blog support just landed

__Hey there! You're looking at our new blog, built with the brand new
[built-in blog plugin]. With this plugin, you can easily build a blog alongside
your documentation or standalone.__

Proper support for blogging, as requested by many users over the past few years,
was something that was desperately missing from Material for MkDocs' feature set.
While everybody agreed that blogging support was a blind spot, it was not
obvious whether MkDocs could be extended in a way to allow for blogging as we
know it from [Jekyll] and friends. The [built-in blog plugin] proves that it is,
after all, possible to build a blogging engine on top of MkDocs, in order to
create a technical blog alongside your documentation, or as the main thing.

<!-- more -->

_This article explains how to build a standalone blog with Material for MkDocs.
If you want to build a blog alongside your documentation, please refer to
[the plugin's documentation][built-in blog plugin]._

  [built-in blog plugin]: ../../setup/setting-up-a-blog.md#built-in-blog-plugin
  [Jekyll]: https://jekyllrb.com/

## Quick start

### Setting up Insiders

Before we can start bootstrapping a blog and [write our first post], we need to
set up [Insiders], since the [built-in blog plugin] is currently reserved to
sponsors. Without the funds this project receives through sponsorships, this
plugin wouldn't exist. Three steps are necessary:

1.  [Subscribe to a monthly sponsorship]
2.  [Create a personal access token]
3.  [Install Insiders]

  [write our first post]: #writing-your-first-post
  [Insiders]: ../../insiders/index.md
  [Subscribe to a monthly sponsorship]: ../../insiders/index.md#how-to-become-a-sponsor
  [Create a personal access token]: ../../insiders/getting-started.md#requirements
  [Install Insiders]: ../../insiders/getting-started.md#installation

### Creating a standalone blog

After Insiders is installed, you can bootstrap a new project using the `mkdocs`
executable:

```
mkdocs new .
```

This will create the following structure:

```
.
├─ docs/
│  └─ index.md
└─ mkdocs.yml
```

#### Configuration

In this article, we're going to build a standalone blog, which means that the
blog lives at the root of your project. For this reason, open `mkdocs.yml`,
and replace its contents with:

``` yaml
site_name: My Blog
theme:
  name: material
  features:
    - navigation.sections
plugins:
  - meta
  - blog:
      blog_dir: . # (1)!
  - search
  - tags
nav:
  - index.md
```

1.  This is the important part – we're hosting the blog at the root of the
    project, and not in a subdirectory. For more information, see the
    [`blog_dir`][blog_dir] configuration option.

  [blog_dir]: ../../setup/setting-up-a-blog.md#+blog.blog_dir

#### Blog setup

The blog index page lives in `docs/index.md`. This page was pre-filled by
MkDocs with some content, so we're going to replace it with what we need to
bootstrap the blog:

``` markdown
# Blog
```

That's it.

### Writing your first post

Now that we have set up the [built-in blog plugin], we can start writing our
first post. All blog posts are written with the [exact same Markdown flavor] as
already included with Material for MkDocs. First, create a folder called `posts`
with a file called `hello-world.md`:

``` sh
.
├─ docs/
│  ├─ posts/
│  │  └─ hello-world.md # (1)!
│  └─ index.md
└─ mkdocs.yml
```

1.  If you'd like to arrange posts differently, you're free to do so. The URLs
    are built from the format specified in [`post_url_format`][post slugs] and
    the titles and dates of posts, no matter how they are organized
    inside the `posts` directory.

Then, open up `hello-world.md`, and add the following lines:

``` yaml
---
draft: true # (1)!
date: 2022-01-31
categories:
  - Hello
  - World
---

# Hello world!

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec
maximus ex. Sed consequat, nulla quis malesuada dapibus, elit metus vehicula
erat, ut egestas tellus eros at risus. In hac habitasse platea dictumst.
Phasellus id lacus pulvinar erat consequat pretium. Morbi malesuada arcu mauris
Nam vel justo sem. Nam placerat purus non varius luctus. Integer pretium leo in
sem rhoncus, quis gravida orci mollis. Proin id aliquam est. Vivamus in nunc ac
metus tristique pellentesque. Suspendisse viverra urna in accumsan aliquet.

<!-- more -->

Donec volutpat, elit ac volutpat laoreet, turpis dolor semper nibh, et dictum
massa ex pulvinar elit. Curabitur commodo sit amet dolor sed mattis. Etiam
tempor odio eu nisi gravida cursus. Maecenas ante enim, fermentum sit amet
molestie nec, mollis ac libero. Vivamus sagittis suscipit eros ut luctus.

Nunc vehicula sagittis condimentum. Cras facilisis bibendum lorem et feugiat.
In auctor accumsan ligula, at consectetur erat commodo quis. Morbi ac nunc
pharetra, pellentesque risus in, consectetur urna. Nulla id enim facilisis
arcu tincidunt pulvinar. Vestibulum laoreet risus scelerisque porta congue.
In velit purus, dictum quis neque nec, molestie viverra risus. Nam pellentesque
tellus id elit ultricies, vel finibus erat cursus.
```

1.  If you mark a post as a [draft], a red marker appears next to the post date 
    on index pages. When the site is built, drafts are not included in the 
    output. [This behavior can be changed], e.g. for rendering drafts when 
    building deploy previews.

When you spin up the [live preview server], you should be greeted by your first
post! You'll also realize, that [archive] and [category] indexes have been
automatically generated for you:

  ![Blog]

However, this is just the start. The [built-in blog plugin] packs a lot of
functionality needed in day-to-day blogging. Visit the documentation of the
plugin to learn about the following topics:

<div class="mdx-columns" markdown>

- [Adding an excerpt]
- [Adding authors]
- [Adding categories]
- [Adding tags]
- [Adding related links]
- [Linking from and to posts]
- [Setting the reading time]
- [Setting defaults]

</div>

Additionally, the [built-in blog plugin] has dozens of [configuration options]
which allow for fine-tuning the output. You can configure post slugs, general
behavior and much more.

  [exact same Markdown flavor]: ../../reference/index.md
  [post slugs]: ../../setup/setting-up-a-blog.md#+blog.post_url_format
  [draft]: ../../setup/setting-up-a-blog.md#drafts
  [This behavior can be changed]: ../../setup/setting-up-a-blog.md#+blog.draft
  [live preview server]: ../../creating-your-site.md#previewing-as-you-write
  [archive]: ../../setup/setting-up-a-blog.md#archive
  [category]: ../../setup/setting-up-a-blog.md#categories
  [Blog]: blog-support-just-landed/blog.png
  [Blog post]: blog-support-just-landed/blog-post.png
  [Adding an excerpt]: ../../setup/setting-up-a-blog.md#adding-an-excerpt
  [Adding authors]: ../../setup/setting-up-a-blog.md#adding-authors
  [Adding categories]: ../../setup/setting-up-a-blog.md#adding-categories
  [Adding tags]: ../../setup/setting-up-a-blog.md#adding-tags
  [Adding related links]: ../../setup/setting-up-a-blog.md#adding-related-links
  [Linking from and to posts]: ../../setup/setting-up-a-blog.md#linking-from-and-to-posts
  [Setting the reading time]: ../../setup/setting-up-a-blog.md#setting-the-reading-time
  [Setting defaults]: ../../setup/setting-up-a-blog.md#setting-defaults
  [configuration options]: ../../setup/setting-up-a-blog.md#configuration

## What's next?

Getting basic blogging support out the door was quite a challenge – the
[built-in blog plugin] is probably the biggest release this year and already
packs a lot of functionality. However, Material for MkDocs is used in many
different contexts, which is why we'd expect to iterate, as always.

Some ideas already proposed by users:

- __Blog series__: Authors should be able to create so called blog series and
  assign posts to a blog series using simple identifiers. For each post that is
  part of a series, a list with links to all other posts should be included in
  the post's content.

- __Author indexes__: Besides [archive] and [category] indexes, authors should 
  be able to create per-author indexes, which list all posts linked to an
  author. Additionally, a profile should be created for each author and linked
  from posts.

- __Social share buttons__: It should be easy to share blog posts via social
  media or other ways. For this reason, it should be possible to automatically
  include social sharing buttons with each post.

What's still missing from the brand new [built-in blog plugin]? Feel free to
share your ideas in the comments. Together, we can build one of the best modern
engines for technical blogging!

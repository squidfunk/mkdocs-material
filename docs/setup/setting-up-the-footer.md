# Setting up the footer

The footer of your project documentation is a great place to add links to
websites or platforms you or your company are using as additional marketing
channels, e.g. :fontawesome-brands-mastodon:{ style="color: #5A4CE0" } or
:fontawesome-brands-youtube:{ style="color: #EE0F0F" }, which you can easily
configure via `mkdocs.yml`.

## Configuration

### Navigation

<!-- md:version 9.0.0 -->
<!-- md:feature -->

The footer can include links to the previous and next page of the current page.
If you wish to enable this behavior, add the following lines to `mkdocs.yml`:

``` yaml
theme:
  features:
    - navigation.footer
```

### Social links

<!-- md:version 1.0.0 -->
<!-- md:default none -->

Social links are rendered next to the copyright notice as part of the
footer of your project documentation. Add a list of social links in `mkdocs.yml`
with:

``` yaml
extra:
  social:
    - icon: fontawesome/brands/mastodon # (1)!
      link: https://fosstodon.org/@squidfunk
```

1.  Enter a few keywords to find the perfect icon using our [icon search] and
    click on the shortcode to copy it to your clipboard:

    <div class="mdx-iconsearch" data-mdx-component="iconsearch">
      <input class="md-input md-input--stretch mdx-iconsearch__input" placeholder="Search icon" data-mdx-component="iconsearch-query" value="mastodon" />
      <div class="mdx-iconsearch-result" data-mdx-component="iconsearch-result" data-mdx-mode="file">
        <div class="mdx-iconsearch-result__meta"></div>
        <ol class="mdx-iconsearch-result__list"></ol>
      </div>
    </div>

The following properties are available for each link:

<!-- md:option social.icon -->

:   <!-- md:default none --> <!-- md:flag required -->
    This property must contain a valid path to any icon bundled with the theme,
    or the build will not succeed. Some popular choices:

    * :fontawesome-brands-github: – `fontawesome/brands/github`
    * :fontawesome-brands-gitlab: – `fontawesome/brands/gitlab`
    * :fontawesome-brands-x-twitter: – `fontawesome/brands/x-twitter`
    * :fontawesome-brands-mastodon: – `fontawesome/brands/mastodon`
      <small>automatically adds [`rel=me`][rel=me]</small>
    * :fontawesome-brands-docker: – `fontawesome/brands/docker`
    * :fontawesome-brands-facebook: – `fontawesome/brands/facebook`
    * :fontawesome-brands-instagram: – `fontawesome/brands/instagram`
    * :fontawesome-brands-linkedin: – `fontawesome/brands/linkedin`
    * :fontawesome-brands-slack: – `fontawesome/brands/slack`
    * :fontawesome-brands-discord: – `fontawesome/brands/discord`
    * :fontawesome-brands-pied-piper-alt: – `fontawesome/brands/pied-piper-alt`

<!-- md:option social.link -->

:   <!-- md:default none --> <!-- md:flag required -->
    This property must be set to a relative or absolute URL including the URI
    scheme. All URI schemes are supported, including `mailto` and `bitcoin`:

    === ":fontawesome-brands-mastodon: Mastodon"

        ``` yaml
        extra:
          social:
            - icon: fontawesome/brands/mastodon
              link: https://fosstodon.org/@squidfunk
        ```

    === ":octicons-mail-16: Email"

        ``` yaml
        extra:
          social:
            - icon: fontawesome/solid/paper-plane
              link: mailto:<email-address>
        ```

<!-- md:option social.name -->

:   <!-- md:default _domain name from_ `link`_, if available_ -->
    This property is used as the link's `title` attribute and can be set to a
    discernable name to improve accessibility:

    ``` yaml
    extra:
      social:
        - icon: fontawesome/brands/mastodon
          link: https://fosstodon.org/@squidfunk
          name: squidfunk on Fosstodon
    ```

  [icon search]: ../reference/icons-emojis.md#search
  [rel=me]: https://docs.joinmastodon.org/user/profile/#verification

### Copyright notice

<!-- md:version 0.1.0 -->
<!-- md:default none -->

A custom copyright banner can be rendered as part of the footer, which is
displayed next to the social links. It can be defined as part of `mkdocs.yml`:

``` yaml
copyright: Copyright &copy; 2016 - 2020 Martin Donath
```

### Generator notice

<!-- md:version 7.3.0 -->
<!-- md:default `true` -->

The footer displays a _Made with Material for MkDocs_ notice to denote how
the site was generated. The notice can be removed with the following option
via `mkdocs.yml`:

``` yaml
extra:
  generator: false
```

!!! info "Please read this before removing the generator notice"

    The subtle __Made with Material for MkDocs__ hint in the footer is one of
    the reasons why this project is so popular, as it tells the user how the
    site is generated, helping new users to discover this project. Before
    removing please consider that you're enjoying the benefits of @squidfunk's
    work for free, as this project is Open Source and has a permissive license.
    Thousands of hours went into this project, most of them
    without any financial return.

    Thus, if you remove this notice, please consider [sponsoring][Insiders] the
    project. __Thank you__ :octicons-heart-fill-24:{ .mdx-heart .mdx-insiders }

  [Insiders]: ../insiders/index.md

## Usage

### Hiding prev/next links

The footer navigation showing links to the previous and next page can be hidden
with the front matter `hide` property. Add the following lines at the top of a
Markdown file:

``` yaml
---
hide:
  - footer
---

# Page title
...
```

## Customization

### Custom copyright

<!-- md:version 8.0.0 -->
<!-- md:flag customization -->

In order to customize and override the [copyright notice], [extend the theme]
and [override the `copyright.html` partial][overriding partials], which normally
includes the `copyright` property set in `mkdocs.yml`.

  [copyright notice]: #copyright-notice
  [generator notice]: #generator-notice
  [extend the theme]: ../customization.md#extending-the-theme
  [overriding partials]: ../customization.md#overriding-partials

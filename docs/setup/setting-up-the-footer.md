---
template: overrides/main.html
---

# Setting up the footer

The footer of your project documentation is a great place to add links to
websites or platforms you or your company are using as additional marketing 
channels, e.g. :fontawesome-brands-medium:{ style="color: #00AB6C" },
:fontawesome-brands-twitter:{ style="color: #1DA1F2" } or
:fontawesome-brands-facebook:{ style="color: #4267B2" }, which can be
configured via `mkdocs.yml`.

## Configuration

### Social links

[:octicons-tag-24: 1.0.0][social support] ·
:octicons-milestone-24: Default: _none_

Social links are rendered next to the copyright notice as part of the 
footer of your project documentation. Add a list of social links in `mkdocs.yml` 
with:

``` yaml
extra:
  social:
    - icon: fontawesome/brands/twitter # (1)!
      link: https://twitter.com/squidfunk
```

1.  Enter a few keywords to find the perfect icon using our [icon search] and
    click on the shortcode to copy it to your clipboard:

    <div class="mdx-iconsearch" data-mdx-component="iconsearch">
      <input class="md-input md-input--stretch mdx-iconsearch__input" placeholder="Search icon" data-mdx-component="iconsearch-query" value="brands twitter" />
      <div class="mdx-iconsearch-result" data-mdx-component="iconsearch-result" data-mdx-mode="file">
        <div class="mdx-iconsearch-result__meta"></div>
        <ol class="mdx-iconsearch-result__list"></ol>
      </div>
    </div>

The following properties must be set for each link:

`icon`{ #social-icon }

:   [:octicons-tag-24: 5.0.0][social.icon support] · :octicons-milestone-24:
    Default: _none_ · :octicons-alert-24: Required – This property must contain
    a valid path to any icon bundled with the theme, or the
    build will not succeed. Some popular choices:

    * :fontawesome-brands-behance: – `fontawesome/brands/behance`
    * :fontawesome-brands-docker: – `fontawesome/brands/docker`
    * :fontawesome-brands-github: – `fontawesome/brands/github`
    * :fontawesome-brands-instagram: – `fontawesome/brands/instagram`
    * :fontawesome-brands-linkedin: – `fontawesome/brands/linkedin`
    * :fontawesome-brands-medium: – `fontawesome/brands/medium`
    * :fontawesome-brands-pied-piper-alt: – `fontawesome/brands/pied-piper-alt`
    * :fontawesome-brands-product-hunt: – `fontawesome/brands/product-hunt`
    * :fontawesome-brands-slack: – `fontawesome/brands/slack`
    * :fontawesome-brands-twitter: – `fontawesome/brands/twitter`

`link`{ #social-link }

:   :octicons-milestone-24: Default: _none_ · :octicons-alert-24: Required –
    This property must be set to a relative or absolute URL including the URI 
    scheme. All URI schemes are supported, including `mailto` and `bitcoin`:

    === ":fontawesome-brands-twitter: Twitter"

        ``` yaml
        extra:
          social:
            - icon: fontawesome/brands/twitter
              link: https://twitter.com/squidfunk
        ```

    === ":octicons-mail-16: Email"

        ``` yaml
        extra:
          social:
            - icon: fontawesome/solid/paper-plane
              link: mailto:<email-address>
        ```

`name`{ #social-name }

:   [:octicons-tag-24: 5.1.5][social.name support] · :octicons-milestone-24: 
    Default: _domain name from_ `link`_, if available_ – This property is used
    as the link's `title` attribute and can be set to a discernable name to
    improve accessibility:

    ``` yaml
    extra:
      social:
        - icon: fontawesome/brands/twitter
          link: https://twitter.com/squidfunk
          name: squidfunk on Twitter
    ```

  [social support]: https://github.com/squidfunk/mkdocs-material/releases/tag/1.0.0
  [social.icon support]: https://github.com/squidfunk/mkdocs-material/releases/tag/5.0.0
  [social.name support]: https://github.com/squidfunk/mkdocs-material/releases/tag/5.1.5

### Copyright notice

[:octicons-tag-24: 0.1.0][Copyright notice support] ·
:octicons-milestone-24: Default: _none_

A custom copyright banner can be rendered as part of the footer, which is
displayed next to the social links. It can be defined as part of `mkdocs.yml`:

``` yaml
copyright: Copyright &copy; 2016 - 2020 Martin Donath
```

  [Copyright notice support]: https://github.com/squidfunk/mkdocs-material/releases/tag/0.1.0
  [3]: https://github.com/squidfunk/mkdocs-material/blob/master/src/partials/footer.html

### Generator notice

[:octicons-tag-24: 7.3.0][Generator notice support] ·
:octicons-milestone-24: Default: `true`

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

  [Generator notice support]: https://github.com/squidfunk/mkdocs-material/releases/tag/7.3.0
  [Insiders]: ../insiders/index.md

## Customization

### Custom copyright

[:octicons-tag-24: 8.0.0][Custom copyright support] ·
:octicons-file-symlink-file-24: Customization

In order to customize and override the [copyright notice], [extend the theme]
and [override the `copyright` block][overriding blocks], which is normally set
to the `copyright` property set in `mkdocs.yml`:

``` html
{% extends "base.html" %}

{% block copyright %}
  <!-- Add copyright here, including arbitrary HTML -->
{% endblock %}
```

  [Custom copyright support]: https://github.com/squidfunk/mkdocs-material/releases/tag/8.0.0
  [copyright notice]: #copyright-notice
  [generator notice]: #generator-notice
  [extend the theme]: ../customization.md#extending-the-theme
  [overriding blocks]: ../customization.md#overriding-blocks

# Compliance with GDPR

## Material does not process any personal data

Material is a theme for MkDocs, a static site generator. In itself, Material
does not perform any tracking or processing of personal data. However, some of
the third-party services that Material integrates with may actually be in breach
with the [General Data Protection Regulation][1] (GDPR) and need to be evaluated
carefully.

  [1]: https://en.wikipedia.org/wiki/General_Data_Protection_Regulation

## Third-party services

### Google Fonts

Material makes fonts [easily configurable][2] by relying on Google Fonts CDN.
However, embedding fonts from Google is currently within a gray area as there's
no official statement or ruling regarding GDPR compliance and the topic is still
[actively discussed][3]. For this reason, if you need to ensure GDPR compiance,
you should disable the usage of the Google Font CDN with:

``` yaml
theme:
  font: false
```

When Google Fonts are disabled, Material will default to **Helvetica Neue** and
**Monaco** with their corresponding fall backs, relying on system fonts. You
could however include your own, self-hosted webfont by [overriding][4] the
`fonts` block.

The icon fonts (Material and FontAwesome) are bundled with the theme, and thus
self-hosted so there's no third-party involved.

  [2]: getting-started.md#font-family
  [3]: https://github.com/google/fonts/issues/1495
  [4]: customization.md/#overriding-template-blocks

### Google Analytics and Disqus

Material comes with [Google Analytics][4] and [Disqus][5] integrations that need
to be *enabled explicitly*. Disable both integrations in order to be in
compliance with the GDPR.

  [5]: getting-started.md#google-analytics
  [6]: getting-started.md#disqus

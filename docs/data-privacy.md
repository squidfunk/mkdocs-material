---
template: overrides/main.html
---

# Data privacy

In itself, Material for MkDocs does not perform any tracking and should adhere
to the [General Data Protection Regulation][1] (GDPR), but it integrates with
some third-party services that may not.

  [1]: https://en.wikipedia.org/wiki/General_Data_Protection_Regulation

## Third-party services

### Google Fonts

Material for MkDocs makes fonts [easily configurable][2] by relying on Google
Fonts CDN. Embedding fonts from Google is currently within a gray area as there's
no official statement or ruling regarding GDPR compliance and the topic is still
[actively discussed][3]. If you need to ensure GDPR compliance, you may disable
the usage of the Google Font CDN with:

``` yaml
theme:
  font: false
```

When Google Fonts are disabled, Material for MkDocs will default to **Helvetica
Neue** and **Monaco** with their corresponding fall backs, relying on system
fonts. You can easily include your own, self-hosted webfont by [overriding][4]
the `fonts` block.

  [2]: getting-started.md#fonts
  [3]: https://github.com/google/fonts/issues/1495
  [4]: customization.md#overriding-template-blocks

### Google Analytics and Disqus

Material for MkDocs comes with optional [Google Analytics][5] and [Disqus][6] 
integrations, both of which must be enabled explicitly.

  [5]: getting-started.md#google-analytics
  [6]: getting-started.md#disqus

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

Material for MkDocs makes fonts [configurable][2] by relying on Google Fonts
CDN, which may be in breach with GDPR. The usage of Google's CDN can be [easily 
disabled][3] via `mkdocs.yml`.

  [2]: setup/changing-the-fonts.md
  [3]: setup/changing-the-fonts.md#disabling-font-loading

### Google Analytics and Disqus

Material for MkDocs comes with optional [Google Analytics][4] and [Disqus][5] 
integrations, both of which must be enabled explicitly, so there's no immediate
action if you don't use those.

  [4]: setup/setting-up-site-analytics.md#google-analytics
  [5]: setup/adding-a-comment-system.md#disqus

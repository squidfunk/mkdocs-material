---
name: Translate
about: 'Help translate Material into more languages '
title: 'New translation: {Insert language}'
labels: enhancement
assignees: ''
---

## Instructions

1. Check, if your language is already available: [here](https://bit.ly/33vFDD0)
2. If it isn't, please translate the labels on the right:

``` jinja
{% macro t(key) %}{{ {
  "language": "en",
  "direction": "ltr",
  "clipboard.copy": "Copy to clipboard",
  "clipboard.copied": "Copied to clipboard",
  "edit.link.title": "Edit this page",
  "footer.previous": "Previous",
  "footer.next": "Next",
  "footer.title": "Footer",
  "header.title": "Header",
  "meta.comments": "Comments",
  "meta.source": "Source",
  "nav.title": "Navigation",
  "search.config.lang": "en",
  "search.config.pipeline": "trimmer, stopWordFilter",
  "search.config.separator": "[\s\-]+",
  "search.placeholder": "Search",
  "search.reset": "Clear",
  "search.result.placeholder": "Type to start searching",
  "search.result.none": "No matching documents",
  "search.result.one": "1 matching document",
  "search.result.other": "# matching documents",
  "search.result.more.one": "1 more on this page",
  "search.result.more.other": "# more on this page",
  "skip.link.title": "Skip to content",
  "source.link.title": "Go to repository",
  "source.file.date.updated": "Last update",
  "source.file.date.created": "Created",
  "tabs.title": "Tabs",
  "toc.title": "Table of contents"
}[key] }}{% endmacro %}
```

<!-- Thanks you! You've made Material for MkDocs even better! -->

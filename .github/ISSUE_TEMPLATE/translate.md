---
name: Translate
about: 'Help translate Material into more languages '
title: 'New translation: {Insert language}'
labels: enhancement
assignees: ''
---

## Instructions

1. Check, if your language is already available: [here](https://bit.ly/3c2ox0C)
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
  "skip.link.title": "Skip to content",
  "source.link.title": "Go to repository",
  "source.revision.date": "Last update",
  "tabs.title": "Tabs",
  "toc.title": "Table of contents"
}[key] }}{% endmacro %}
```

Thanks!

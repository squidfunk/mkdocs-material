# Revision date

[mkdocs-git-revision-date-localized-plugin](https://github.com/timvink/mkdocs-git-revision-date-localized-plugin) is an extension that enables adding a revision date to a markdown file.
As the name says, it takes this revision date from GIT.

## Installation

Add the following lines to your `mkdocs.yml`:

``` yaml
plugins:
  - git-revision-date-localized
```

## Usage

Material for MkDocs will add the revision date to the bottom of every markdown page, for example: 

```
Last updated: 9 December 2019
``` 

To change the language, set the theme language, see [Getting started - Language][1].

  [1]: https://squidfunk.github.io/mkdocs-material/getting-started/#language
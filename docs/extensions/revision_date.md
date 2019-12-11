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


To change the date format, set the `type` parameter to one of `date`, `datetime`, `iso_date`, `iso_datetime` or `timeago`. Default is `date`. Example outputs:

```bash
28 November, 2019 # type: date
28 November, 2019 13:57:28 # type: datetime
2019-11-28 # type: iso_date
2019-11-28 13:57:26 # type: iso_datetime
20 hours ago # type: timeago
```

Example setting:

```yaml
# mkdocs.yml
plugins:
  - git-revision-date-localized:
    type: timeago
```
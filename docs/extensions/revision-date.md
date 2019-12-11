# Revision date

[mkdocs-git-revision-date-localized-plugin][1] is an extension that shows the
date on which a Markdown file was last updated in _Git_ at the bottom of each
page. The date is extracted at the time of the build, so `mkdocs build` must
be triggered from within a Git repository.

  [1]: https://github.com/timvink/mkdocs-git-revision-date-localized-plugin

## Installation

Install the plugin with the following command:

``` sh
pip install mkdocs-git-revision-date-localized-plugin
```

Next, add the following lines to your `mkdocs.yml`:

``` yaml
plugins:
  - git-revision-date-localized
```

## Usage

The date is automatiaclly added at the bottom of each page, e.g.:

```
Last updated: 9 December, 2019
``` 

### Changing the language

The date is printed according to the locale which is determined through the
[theme language][1] that was set in `mkdocs.yml`.

  [1]: https://squidfunk.github.io/mkdocs-material/getting-started/#language

### Changing the format

To change the date format, set the `type` parameter to one of `date`,
`datetime`, `iso_date`, `iso_datetime` or `timeago`, i.e.:

``` gnuplot
28 November, 2019                  # type: date
28 November, 2019 13:57:28         # type: datetime
2019-11-28                         # type: iso_date
2019-11-28 13:57:26                # type: iso_datetime
20 hours ago                       # type: timeago
```

Example:

``` yaml
plugins:
  - git-revision-date-localized:
      type: timeago
```

Result:

```
20 hours ago
```

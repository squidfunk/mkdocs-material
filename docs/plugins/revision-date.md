---
template: overrides/main.html
---

# Revision date

The [mkdocs-git-revision-date-localized-plugin][1] will add the date on which a
Markdown file was last updated at the bottom of each page.

!!! success "Bundled with the official Docker image"

    This plugin is already installed for your convenience when you use the
    official [Docker image][2], so the installation step can be skipped. Read
    the [getting started guide][3] to get up and running with Docker.

  [1]: https://github.com/timvink/mkdocs-git-revision-date-localized-plugin
  [2]: https://hub.docker.com/r/squidfunk/mkdocs-material/
  [3]: ../getting-started.md#with-docker-recommended

!!! warning "Requirements"

    The date is extracted at the time of the build, so `mkdocs build` must be
    triggered from within a git repository.

## Installation

Install the plugin using `pip`:

``` sh
pip install mkdocs-git-revision-date-localized-plugin
```

## Configuration

Add the following lines to `mkdocs.yml`:

``` yaml
plugins:
  - search # necessary for search to work
  - git-revision-date-localized
```

Note that the date is printed according to the locale which is determined
through the [theme language][2] that was set in `mkdocs.yml`.

  [2]: ../getting-started.md/#language

### Language

The language (i.e. locale) is deduced from the `theme.language` option.

### Format

> Default: `date`

To change the date format, set the `type` parameter to one of `date`,
`datetime`, `iso_date`, `iso_datetime` or `timeago`, e.g.:

``` yaml
plugins:
  - search # necessary for search to work
  - git-revision-date-localized:
      type: date
```

The following formats are supported:

``` gnuplot
28 November, 2019                      # type: date
28 November, 2019 13:57:28             # type: datetime
2019-11-28                             # type: iso_date
2019-11-28 13:57:26                    # type: iso_datetime
20 hours ago                           # type: timeago
```

## Usage

When enabled, the respective date is automatically added at the bottom of each
page, e.g.:

---

<small>
  Last updated: 28 November, 2019
</small>

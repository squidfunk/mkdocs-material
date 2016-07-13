# Material for MkDocs

## Beautiful documentation

Material is a theme for [MkDocs][], an excellent static site generator geared
towards project documentation. It is built using Google's [material design][]
guidelines, full responsive, optimized for touch and pointer devices as well
as all sorts of screen sizes.

![Material Screenshot](images/screen.png)

Material is very lightweight – it is built from scratch using Javascript and
CSS that weighs less than 30kb (minified, gzipped and excluding Google Fonts
and Analytics). Yet, it is highly customizable and degrades gracefully in older
browsers.

## Quick start

Install with `pip`:

``` sh
pip install mkdocs-material
```

Add the following line to your `mkdocs.yml`:

``` yaml
theme: 'material'
```

## Features

- Beautiful, readable and very user-friendly design based on Google's material
  design guidelines, packed in a full responsive template with a well-defined
  and [easily customizable color palette][], great typography, as well as a
  beautiful search interface and footer.

- Well-tested and optimized Javascript and CSS including a cross-browser
  fixed/sticky header, a drawer that even works without Javascript using
  the [checkbox hack][] with fallbacks, responsive tables that scroll when
  the screen is too small and well-defined print styles.

- Extra configuration options like a [project logo][], links to the authors
  [GitHub and Twitter accounts][], display of the amount of stars the
  project has on GitHub and [Google Analytics integration][].

- Easily [extendable and customizable][] due to a well-designed asset pipeline
  built on-top of [Gulp][] with `npm` and `bower` and modular and abstracted
  style definitions built with [SASS][].

- Web application capability on iOS – when the page is saved to the homescreen,
  it behaves and looks like a native application.

See the [getting started guide](getting-started.md) for instructions how to get
it up and running.

[MkDocs]: http://www.mkdocs.org
[material design]: https://www.google.com/design/spec/material-design
[checkbox hack]: http://tutorialzine.com/2015/08/quick-tip-css-only-dropdowns-with-the-checkbox-hack/
[project logo]: getting-started.md#adding-a-logo
[easily customizable color palette]: getting-started.md#changing-the-color-palette
[GitHub and Twitter accounts]: getting-started.md#adding-a-github-and-twitter-account
[Google Analytics integration]: getting-started.md#google-analytics-integration
[extendable and customizable]: customization.md
[Gulp]: http://gulpjs.com
[SASS]: http://sass-lang.com
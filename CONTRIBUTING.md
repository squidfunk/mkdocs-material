# Contributing

Interested in contributing to the Material for MkDocs? Have a question? Want to 
report a bug? Before you do, please read the following guidelines.

## Submission context

### Got a question or problem?

For quick questions there's no need to open an issue as you can reach us on
[gitter.im].

  [gitter.im]: https://gitter.im/squidfunk/mkdocs-material

### Found a bug?

If you found a bug in the source code, you can help us by submitting an issue
to the [issue tracker] in our GitHub repository. Even better, you can submit
a Pull Request with a fix. However, before doing so, please read the
[submission guidelines].

  [issue tracker]: https://github.com/squidfunk/mkdocs-material/issues
  [submission guidelines]: #submission-guidelines

### Missing a feature?

You can request a new feature by submitting an issue to our GitHub Repository.
If you would like to implement a new feature, please submit an issue with a
proposal for your work first to be sure that it is of use to everyone, as
Material for MkDocs is highly opinionated. Please consider what kind of change
it is:

* For a **major feature**, first open an issue and outline your proposal so
  that it can be discussed. This will also allow us to better coordinate our
  efforts, prevent duplication of work, and help you to craft the change so
  that it is successfully accepted into the project.

* **Small features and bugs** can be crafted and directly submitted as a Pull
  Request. However, there is no guarantee that your feature will make it into
  the `master`, as it's always a matter of opinion whether if benefits the
  overall functionality of the project.

### Missing translations?

Material for MkDocs supports 50+ languages with the help of community
contributions. When new features are added, sometimes, new translations are
necessary as well. It's impossible for the maintainers of the project to update
all translations (we just don't speak 50+ languages), so we have to rely on
our contributors to update translations incrementally. This process is pretty
simple, so if you find a translation missing in your language, follow these
guidelines:

1.  Fork the repository.

2.  Open up the [translation file for your language] as well as the
    [English translations], as they are always up-to-date. Compare them
    side-by-side and add the missing translations. __Important__: only add the
    translations that are different from the defaults, e.g. if your language
    is left-to-right, don't add the `direction` translation, as English is
    left-to-right as well. The following translations are for technical
    purposes and should not be updated, so if they're missing from your
    language, it's for good reason:

    - `search.config.lang`
    - `search.config.pipeline`
    - `search.config.separator`

3.  Create a PR (see below) with your changes.

  [translation file for your language]: https://github.com/squidfunk/mkdocs-material/tree/master/src/partials/languages
  [English translations]: https://github.com/squidfunk/mkdocs-material/tree/master/src/partials/languages/en.html

## Submission guidelines

### Submitting an issue

Before you submit an issue, please search the issue tracker, maybe an issue for
your problem already exists, and the discussion might inform you of workarounds
readily available.

We want to fix all the issues as soon as possible, but before fixing a bug, we
need to reproduce and confirm it. In order to reproduce bugs, we will
systematically ask you to provide a minimal reproduction scenario using the
custom issue template. Please stick to the issue template.

Unfortunately, we are not able to investigate / fix bugs without a minimal
reproduction scenario, so if we don't hear back from you, we may close the issue.

### Submitting a Pull Request (PR)

Search GitHub for an open or closed PR that relates to your submission. You
don't want to duplicate effort. If you do not find a related issue or PR,
go ahead.

1.  **Development**: Fork the project, set up the [development environment],
    make your changes in a separate git branch and add descriptive messages to
    your commits.

2.  **Build**: Before submitting a pull request, [build the theme]. This is
    a mandatory requirement for your PR to get accepted, as the theme should be 
    installable through GitHub at all times.

3.  **Pull Request**: After building the theme, commit the compiled output,
    push your branch to GitHub and send a PR to `mkdocs-material:master`. If we
    suggest changes, make the required updates, rebase your branch and push the
    changes to your GitHub repository, which will automatically update your PR.

After your PR is merged, you can safely delete your branch and pull the changes
from the main (upstream) repository.

  [development environment]: https://squidfunk.github.io/mkdocs-material/customization/#environment-setup
  [build the theme]: https://squidfunk.github.io/mkdocs-material/customization/#building-the-theme

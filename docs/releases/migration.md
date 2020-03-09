# Migration

### Material 3.x to 4.x

* Material for MkDocs 4.x finally fixes incorrect layout on Chinese systems.
  The fix includes a mandatory change of the base font-size from `10px` to
  `20px` which means all `rem` values needed to be updated. Within the theme,
  `px` to `rem` calculation is now encapsulated in a new function called
  `px2rem` which is part of the SASS code base.

* If you use Material with custom CSS that is based on `rem` values, note that
  those values must now be divided by 2. Now, `1.0rem` doesn't map to `10px`,
  but `20px`. To learn more about the problem and implications, please refer
  to [the issue][2] in which the problem was discovered and fixed.

  [2]: https://github.com/squidfunk/mkdocs-material/issues/911

### Material 2.x to 3.x

* Material for MkDocs 3.x requires MkDocs 1.0 because the way paths are resolved
  internally changed significantly. Furthermore, `pages` was renamed to `nav`,
  so remember to adjust your `mkdocs.yml` file.

* All extended templates *should* continue to work but in order to make them
  future-proof the `url` filter should be introduced on all paths. Please see
  the [official release notes][1] for further guidance.

  [1]: https://www.mkdocs.org/about/release-notes/#version-10-2018-08-03

### Material 1.x to 2.x

* Material for MkDocs 2.x requires MkDocs 0.17.1, as this version introduced
  changes to the way themes can define options. The following variables inside
  your project's `mkdocs.yml` need to be renamed:

    * `extra.feature` becomes `theme.feature`
    * `extra.palette` becomes `theme.palette`
    * `extra.font` becomes `theme.font`
    * `extra.logo` becomes `theme.logo`

* Favicon support has been dropped by MkDocs, it must now be defined in
  `theme.favicon` (previously `site_favicon`).

* Localization is now separated into theme language and search language. While
  there can only be a single language on theme-level, the search supports
  multiple languages which can be separated by commas. See the getting started
  guide for more guidance.

* The search tokenizer can now be set through `extra.search.tokenizer`.

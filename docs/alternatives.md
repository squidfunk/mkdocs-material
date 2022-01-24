---
template: overrides/main.html
---

# Alternatives

There are tons of static site generators and themes out there and choosing the
right one for your tech stack is a tough decision. If you're unsure if Material
for MkDocs is the right solution for you, this section should help you evaluate
alternative solutions.

## Docusaurus

[Docusaurus] by Facebook is a very popular documentation generator and a good
choice if you or your company are already using [React] to build your site.
It will generate a [single page application] which is fundamentally different
from the site Material for MkDocs generates for you.

__Advantages__

- Very powerful, customizable and extendable
- Provides many components that aid in technical writing
- Large and rich ecosystem, backed by Facebook

__Challenges__

- High learning curve, JavaScript knowledge mandatory
- JavaScript ecosystem is very volatile, rather high maintenance
- More time needed to get up and running

While [Docusaurus] is one of the best choices when it comes to documentation
sites that output a single page applications, there are many more solutions,
including [Docz], [Gatsby], [Vuepress] and [Docsify] that approach
this problem similarily.

  [Docusaurus]: https://docusaurus.io/
  [React]: https://reactjs.org/
  [single page application]: https://en.wikipedia.org/wiki/Single-page_application
  [Docz]: https://www.docz.site/
  [Gatsby]: https://www.gatsbyjs.com/
  [VuePress]: https://vuepress.vuejs.org/
  [Docsify]: https://docsify.js.org/

## Jekyll

[Jekyll] is probably one of the most mature and widespread static site
generators and is written in [Ruby]. It is not specifically geared towards
technical project documentation and has many themes to choose from, which
can be challenging.

__Advantages__

- Battle-tested, rich ecosystem, many themes to choose from
- Brings great capabilities for blogging  (permalinks, tags, etc.)
- Generates a SEO-friendly site, similar to Material for MkDocs

__Challenges__

- Not specifically geared towards technical project documentation
- Limited Markdown capabilities, not as advanced as Python Markdown
- More time needed to get up and running

  [Jekyll]: https://jekyllrb.com/
  [Ruby]: https://www.ruby-lang.org/de/

## Sphinx

[Sphinx] is an alternative static site generator specifically geared towards
generating reference documentation, offering powerful capabilities that are
lacking in MkDocs. It uses [reStructured text], a format similar to Markdown,
which some users find harder to use.

__Advantages__

- Very powerful, customizable and extendable
- Generates reference documentation from [Python Docstrings]
- Large and rich ecosystem, used by many Python projects

__Challenges__

- High learning curve, [reStructured text] syntax might be challenging
- Search is less powerful than the one provided by MkDocs
- More time needed to get up and running

[Sphinx Immaterial] is a great port of Material for MkDocs to Sphinx, as it
follows the upstream repository closely. [Furo] is another great theme.
Alternatively, [mkdocstrings] builds on top of MkDocs to allow
the generation of reference documentation.

  [Sphinx]: https://www.sphinx-doc.org/
  [reStructured text]: https://en.wikipedia.org/wiki/ReStructuredText
  [Python Docstrings]: https://www.python.org/dev/peps/pep-0257/
  [Sphinx Immaterial]: https://github.com/jbms/sphinx-immaterial
  [Furo]: https://pradyunsg.me/furo/
  [mkdocstrings]: https://github.com/mkdocstrings/mkdocstrings

## GitBook

[GitBook] offers a hosted documentation solution that generates a beautiful and
functional site from Markdown files in your GitHub repository. However, it was
once Open Source, but turned into a closed source solution some time ago.

__Advantages__

- Hosted solution, minimal technical knowledge required
- Custom domains, authentication and other enterprise features
- Great collaboration features for teams

__Challenges__

- Closed source, not free for proprietary projects
- Limited Markdown capabilities, not as advanced as Python Markdown
- Many Open Source projects moved away from GitBook

Many users switched from [GitBook] to Material for MkDocs, as they want to keep
control and ownership of their documentation, favoring an Open Source solution.

  [GitBook]: https://www.gitbook.com/

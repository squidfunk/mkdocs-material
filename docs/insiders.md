---
template: overrides/main.html
---

# <span hidden>Insiders</span> :logo: :material-plus: :octicons-heart-fill-24:{: .tx-heart }

Material for MkDocs uses the [sponsorware][1] release strategy, which means
that _new features are first exclusively released to sponsors_ as part of
__Material for MkDocs Insiders__. Read on to learn [how sponsorship works][2],
and how you can [become a sponsor][3].

  [1]: https://github.com/sponsorware/docs
  [2]: #how-sponsorship-works
  [3]: #how-to-become-a-sponsor

<div style="width:100%;height:0px;position:relative;padding-bottom:56.138%;">
  <iframe src="https://streamable.com/e/lz4me5" frameborder="0" width="100%" height="100%" allowfullscreen style="width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;"></iframe>
</div>
<p style="text-align: center; font-style: oblique">
  A demo is worth a thousand words — check it out at <br />
  <a href="https://squidfunk.github.io/mkdocs-material-insiders/">
    squidfunk.github.io/mkdocs-material-insiders
  </a>
</p>

## How sponsorship works

New features will first land in Material for MkDocs Insiders, which means that
_sponsors will have access immediately_. Every feature is tied to a funding
goal in monthly subscriptions. If a funding goal is hit, the features that are
tied to it are merged back into Material for MkDocs and released for general
availability. Bugfixes will always be released simultaneously in both editions.

See the [roadmap][4] for a list of already available and upcoming features, and
for demonstration purposes, [the official documentation][5] built with Material
for MkDocs Insiders.

  [4]: #roadmap
  [5]: https://squidfunk.github.io/mkdocs-material-insiders/

## How to become a sponsor

So you've decided to become a sponsor? Great! You're just __three easy steps__
away from enjoying the latest features of Material for MkDocs Insiders.
Complete the following steps and you're in:

- Visit [squidfunk's sponsor profile][6] and pick a tier that includes exclusive
  access to squidfunk's sponsorware, which is _any tier from $10/month_. Select
  the tier and complete the checkout.
- Within 24 hours, you will become a collaborator of the private Material for
  MkDocs Insiders GitHub repository, a fork of Material for MkDocs with
  [brand new and exclusive features][7].
- Create a [personal access token][8], which allows installing Material for
  MkDocs Insiders from any destination, including other CI providers like
  [GitLab][9] or [Bitbucket][10].

__Congratulations! :partying_face: You're now officially a sponsor and will
get updates for Material for MkDocs Insiders, until you decide to cancel your
monthly subscription, which you can do at any time.__

  [6]: https://github.com/sponsors/squidfunk
  [7]: #roadmap
  [8]: https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token
  [9]: https://gitlab.com
  [10]: https://bitbucket.org

## Roadmap

The following list of funding goals – named after varieties of chili peppers 
[I'm growing on my balcony][11] – shows which features are already available
in Material for MkDocs Insiders.

  [11]: https://www.instagram.com/squidfunk/

### Madame Jeanette

[:octicons-fire-24: Funding goal: __$500__][6] ·
:octicons-lock-24: Status: _exclusive_

New features and improvements for _search_, including:

- [x] Improved search result grouping (pages + headings)
- [x] Improved search result relevance and scoring
- [x] Display of missing query terms in search results
- [ ] Improved search result summaries
- [ ] ... more to come

### Prairie Fire

[:octicons-fire-24: Funding goal: __$1,000__][6] ·
:octicons-lock-24: Status: _exclusive_

New features and improvements for _content and toc_, including:

- [x] Highlighting of matched search terms in content area
- [x] Navigation can always be expanded via configuration
- [x] Header can be automatically hidden on scrolling
- [x] Table of contents can be automatically hidden when empty
- [ ] Table of contents can be moved into navigation for more space
- [ ] Table of contents shows which sections have search results
- [ ] Table of contents auto-collapses and expands only the active section
- [ ] Better support for wide screens, i.e. more horizontal space
- [ ] ... more to come

### Bhut Jolokia

[:octicons-fire-24: Funding goal: __$1,500__][6] ·
:octicons-lock-24: Status: _exclusive_

New features and improvements for _hosting multiple versions_, including:

- [ ] Support for multiple languages of documents 
- [ ] Support for multiple versions of documents
- [ ] Support for one or more management plugins
- [ ] ... more to come

### Black Pearl

[:octicons-fire-24: Funding goal: __$2,000__][6] ·
:octicons-lock-24: Status: _exclusive_

New features and improvements for _user preferences_, including:

- [x] Support for user-toggleable themes
- [ ] Support for user-toggleable code-block styles (light/dark)
- [ ] Display last searches when search is empty
- [ ] ... more to come

### Caribbean Red

[:octicons-fire-24: Funding goal: __$3,000__][6] ·
:octicons-lock-24: Status: _exclusive_

Alternative, completely different _vertical layout_, optimized to read
documentation and code side-by-side, e.g. for the documentation of APIs with
the same functionality as Material for MkDocs.

## Frequently asked questions

### Compatibility

_We're running an open source project and want to make sure that users can build
the documentation without having access to Insiders. Is that still possible?_

Yes. Material for MkDocs Insiders strives to be compatible with Material for
MkDocs, so all new features are implemented as feature flags and all
improvements (e.g. search) do not require any changes to existing configuration.
This means that your users will be able to build the docs locally with the
regular version and when they push their changes to CI/CD, they will be built
with Material for MkDocs Insiders. For this reason, it's recommended to
[install Insiders][12] only in CI, as you don't want to expose your `GH_TOKEN`
to users.

### Terms

_We're using Material for MkDocs to build the developer documentation of a
commercial project. Can we use Material for MkDocs Insiders under the same
terms?_

Yes. Whether you're an individual or a company, you may use _Material for MkDocs
Insiders_ precisely under the same terms as Material for MkDocs, which are given
by the [MIT license][13]. However, we kindly ask you to respect the following
guidelines:

- Please __don't distribute the source code__ from Material for MkDocs Insiders.
  You may freely use it for public, private or commercial projects, fork it,
  mirror it, do whatever you want with it, but please don't release the source
  code, as it would cannibalize the sponsorware strategy.

- If you cancel your subscription, you're removed as a collaborator and will
  miss out on future updates of Material for MkDocs Insiders. However, you may
  __use the latest version__ that's available to you __as long as you like__.
  Just remember that __[GitHub deletes private forks][14]__.

  [12]: publishing-your-site.md#github-pages
  [13]: license.md
  [14]: https://docs.github.com/en/github/setting-up-and-managing-your-github-user-account/removing-a-collaborator-from-a-personal-repository

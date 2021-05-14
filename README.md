<p align="center">
  <a href="https://squidfunk.github.io/mkdocs-material/">
    <img src="https://raw.githubusercontent.com/squidfunk/mkdocs-material/master/.github/assets/logo.svg" width="320" alt="Material for MkDocs">
  </a>
</p>

<p align="center">
  <strong>
    A 
    <a href="https://material.io/">Material Design</a> 
    theme for 
    <a href="https://www.mkdocs.org/">MkDocs</a>
  </strong>
</p>

<p align="center">
  <a href="https://github.com/squidfunk/mkdocs-material/actions"><img
    src="https://github.com/squidfunk/mkdocs-material/workflows/build/badge.svg?branch=master"
    alt="Build"
  /></a>
  <a href="https://pypistats.org/packages/mkdocs-material"><img
    src="https://img.shields.io/pypi/dm/mkdocs-material.svg" 
    alt="Downloads"
  /></a>
  <a href="https://gitter.im/squidfunk/mkdocs-material"><img 
    src="https://badges.gitter.im/squidfunk/mkdocs-material.svg" 
    alt="Chat on Gitter"
  /></a>
  <a href="https://pypi.org/project/mkdocs-material"><img 
    src="https://img.shields.io/pypi/v/mkdocs-material.svg" 
    alt="Python Package Index"
  /></a>
  <a href="https://hub.docker.com/r/squidfunk/mkdocs-material/"><img 
    src="https://img.shields.io/docker/pulls/squidfunk/mkdocs-material" 
    alt="Docker Pulls"
  /></a>
  <a href="https://squidfunk.github.io/mkdocs-material/insiders/"><img
    src="https://img.shields.io/static/v1?label=%E2%86%92&message=insiders&color=e91e63"
  /></a>
</p>

<p align="center">
  Create a branded static site from a set of Markdown files to host the
  documentation of your Open Source or commercial project – customizable,
  searchable, mobile-friendly, 40+ languages. Set up in 5 minutes.
</p>

<p align="center">
  <a href="https://squidfunk.github.io/mkdocs-material/getting-started/">
    <img src="https://raw.githubusercontent.com/squidfunk/mkdocs-material/master/.github/assets/screenshot.png" width="700" />
  </a>
</p>

<p align="center">
  <em>
    A demo is worth a thousand words — check it out at
    <a
      href="https://squidfunk.github.io/mkdocs-material/"
    >squidfunk.github.io/mkdocs-material</a>.
  </em>
</p>

## Features

* **It's just Markdown ...** — write your technical documentation in Markdown –
  no need to know HTML, JavaScript or CSS. Material for MkDocs will do the heavy
  lifting and create a beautiful and functional website.

* **... but there's more** — integrates natively with Python Markdown
  Extensions, adding callouts, tabbed content containers, mathematical formulas,
  critic markup, task lists, and [more than 10k icons and emojis][2].

* **Responsive by design** — built from the ground up to work on all kinds of
  devices – from mobile phones to widescreens. The underlying fluid layout will
  always adapt perfectly to the available screen space.

* **Static, but searchable** — almost magically, your technical documentation
  website will be searchable without any further ado. Material for MkDocs comes
  with built-in search – no server needed.

* **Many configuration options** — change the color palette, font families,
  language, icons, favicon and logo. Add a source repository link, links to your
  social profiles, Google Analytics and Disqus - all with a few lines of config.

* **Truly international** — thanks to many contributors, Material for MkDocs
  includes translations for more than 40 languages and offers full native RTL
  (right-to-left) support.

* **Accessible** — Material for MkDocs provides extensible keyboard navigation
  and semantic markup including role attributes and landmarks. Furthermore, the
  layout respects the user's default font size.

* **Modern architecture** — Material for MkDocs's underlying codebase is built
  on top of TypeScript, RxJS, and SCSS, bringing excellent possibilities for
  theme extension and customization.

_Material for MkDocs uses the [sponsorware][3] release strategy, which means
that new features are first exclusively released to sponsors as part of Material
for MkDocs Insiders. Read on to learn [how sponsorship works][4], and how you
can [become a sponsor][5]._

  [2]: https://squidfunk.github.io/mkdocs-material/reference/icons-emojis/#search
  [3]: https://github.com/sponsorware/docs
  [4]: https://squidfunk.github.io/mkdocs-material/insiders/#how-sponsorship-works
  [5]: https://squidfunk.github.io/mkdocs-material/insiders/#how-to-become-a-sponsor

## Quick start

Material for MkDocs can be installed with `pip`:

``` sh
pip install mkdocs-material
```

Add the following line to `mkdocs.yml`:

``` yaml
theme:
  name: material
```

For other installation methods, configuration options, and a demo, visit
[squidfunk.github.io/mkdocs-material][1]

  [1]: https://squidfunk.github.io/mkdocs-material/

## Premium Sponsors

<p>
  <a href="https://docs.baslerweb.com/" target=_blank><img
    src="https://raw.githubusercontent.com/squidfunk/mkdocs-material/master/.github/assets/sponsors/basler.png" width="155"
  /></a>
  <a href="https://cirrus-ci.org/" target=_blank><img
    src="https://raw.githubusercontent.com/squidfunk/mkdocs-material/master/.github/assets/sponsors/cirrus-ci.svg" width="155"
  /></a>
</p>

## Trusted by ...

### ... leading companies

[AWS](https://aws.github.io/copilot-cli/),
[Binance](https://docs.binance.org/),
[Datadog](https://datadoghq.dev/integrations-core/),
[Google](https://google.github.io/iree/),
[ING](https://ing-bank.github.io/baker/),
[LinkedIn](https://linkedin.github.io/school-of-sre/),
[Mozilla](https://mozillafoundation.github.io/engineering-handbook/),
[Microsoft](https://microsoft.github.io/code-with-engineering-playbook/),
[Netflix](https://netflix.github.io/titus/),
[Salesforce](https://policy-sentry.readthedocs.io/en/latest/),
[SoundCloud](https://intervene.dev/),
[Square](https://square.github.io/okhttp/),
[Zalando](https://opensource.zalando.com/skipper/)

### ... and successful Open Source projects

[AutoKeras](https://autokeras.com/),
[BFE](https://www.bfe-networks.net/),
[Crystal](https://crystal-lang.org/reference/),
[Electron](https://www.electron.build/),
[FastAPI](https://fastapi.tiangolo.com/),
[Kubernetes](https://kops.sigs.k8s.io/),
[kSQL](https://docs.ksqldb.io/),
[Nokogiri](https://nokogiri.org/),
[OpenFaaS](https://docs.openfaas.com/),
[Pi-Hole](https://docs.pi-hole.net/),
[Pydantic](https://pydantic-docs.helpmanual.io/),
[Renovatebot](https://docs.renovatebot.com/),
[Traefik](https://docs.traefik.io/),
[Vapor](https://docs.vapor.codes/),
[ZeroNet](https://zeronet.io/docs/),
[WTF](https://wtfutil.com/)

## License

**MIT License**

Copyright (c) 2016-2021 Martin Donath

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to
deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE.

# Copyright (c) 2016-2024 Martin Donath <martin.donath@squidfunk.com>

# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to
# deal in the Software without restriction, including without limitation the
# rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
# sell copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:

# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.

# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
# FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
# IN THE SOFTWARE.

import os
import re

from glob import iglob
from mkdocs.config.defaults import MkDocsConfig
from mkdocs.structure.pages import Page
from urllib.parse import urlencode, urlparse

# -----------------------------------------------------------------------------
# Hooks
# -----------------------------------------------------------------------------

# Determine missing translations and render language overview in the setup
# guide, including links to provide missing translations.
def on_page_markdown(markdown: str, *, page: Page, config: MkDocsConfig, files):
    issue_url = "https://github.com/squidfunk/mkdocs-material/issues/new"
    if page.file.src_uri != "setup/changing-the-language.md":
        return

    # Collect all existing languages
    names: dict[str, str] = {}
    known: dict[str, dict[str, str]] = {}
    for path in iglob("src/templates/partials/languages/*.html"):
        with open(path, "r", encoding = "utf-8") as f:
            data = f.read()

            # Extract language code and name
            name, = re.findall(r"<!-- Translations: (.+) -->", data)
            code, _ = os.path.splitext(os.path.basename(path))

            # Map names and available translations
            names[code] = name
            known[code] = dict(re.findall(
                r"^  \"([^\"]+)\": \"([^\"]*)\"(?:,|$)?", data,
                re.MULTILINE
            ))

            # Remove technical stuff
            for key in [
                "direction",
                "search.config.pipeline",
                "search.config.lang",
                "search.config.separator"
            ]:
                if key in known[code]:
                    del known[code][key]

    # Traverse all languages and compute missing translations
    languages = []
    reference = set(known["en"])
    for code, name in names.items():
        miss = reference - set(known[code])

        # Check each translations
        translations: list[str] = []
        for key, value in known["en"].items():
            if key in known[code]:
                translations.append(
                    f"  \"{key}\": \"{known[code][key]}\""
                )
            else:
                translations.append(
                    f"  \"{key}\": \"{value} ⬅️\""
                )

        # Assemble GitHub issue URL
        link = urlparse(issue_url)
        link = link._replace(query = urlencode({
            "template": "04-add-translations.yml",
            "title": f"Update {name} translations",
            "translations": "\n".join([
                "{% macro t(key) %}{{ {",
                    ",\n".join(translations),
                "}[key] }}{% endmacro %}"
            ]),
            "country-flag": f":flag_{countries[code]}:"
        }))

        # Add translation
        languages.append({
            "flag": countries[code],
            "code": code,
            "name": name,
            "link": link.geturl(),
            "miss": miss
        })

    # Load template and render translations
    env = config.theme.get_env()
    template = env.get_template( "hooks/translations.html")
    translations = template.module.render(
        sorted(languages, key = lambda language: language["name"])
    )

    # Replace translation marker
    return markdown.replace(
        "<!-- hooks/translations.py -->", "\n".join(
            [line.lstrip() for line in translations.split("\n")
        ]
    ))

# -----------------------------------------------------------------------------
# Data
# -----------------------------------------------------------------------------

# Map ISO 639-1 (languages) to ISO 3166 (countries)
countries = {
    "af": "za",
    "az": "az",
    "ar": "ae",
    "be": "by",
    "bg": "bg",
    "bn": "bd",
    "ca": "es",
    "cs": "cz",
    "da": "dk",
    "de": "de",
    "el": "gr",
    "en": "us",
    "eo": "eu",
    "es": "es",
    "et": "ee",
    "eu": "es",
    "fa": "ir",
    "fi": "fi",
    "fr": "fr",
    "gl": "es",
    "he": "il",
    "hi": "in",
    "hr": "hr",
    "hu": "hu",
    "hy": "am",
    "id": "id",
    "is": "is",
    "it": "it",
    "ja": "jp",
    "ka": "ge",
    "kn": "in",
    "ko": "kr",
    "ku-IQ": "iq",
    "lb": "lu",
    "lt": "lt",
    "lv": "lv",
    "mk": "mk",
    "mn": "mn",
    "ms": "my",
    "my": "mm",
    "nb": "no",
    "nl": "nl",
    "nn": "no",
    "pl": "pl",
    "pt-BR": "br",
    "pt": "pt",
    "ro": "ro",
    "ru": "ru",
    "sa": "in",
    "sh": "rs",
    "si": "lk",
    "sk": "sk",
    "sl": "si",
    "sr": "rs",
    "sv": "se",
    "te": "in",
    "th": "th",
    "ta": "in",
    "tl": "ph",
    "tr": "tr",
    "uk": "ua",
    "ur": "pk",
    "uz": "uz",
    "vi": "vn",
    "zh": "cn",
    "zh-Hant": "cn",
    "zh-TW": "tw"
}

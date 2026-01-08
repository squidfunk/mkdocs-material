# Copyright (c) 2016-2025 Martin Donath <martin.donath@squidfunk.com>

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
            "country-flag": f":{icons[code]}:"
        }))

        # Add translation
        languages.append({
            "flag": icons[code],
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
icons = {
    "af": "flag_za",
    "az": "flag_az",
    "ar": "flag_ae",
    "be": "flag_by",
    "bg": "flag_bg",
    "bn": "flag_bd",
    "ca": "flag_es",
    "cs": "flag_cz",
    "cy": "wales",
    "da": "flag_dk",
    "de": "flag_de",
    "el": "flag_gr",
    "en": "flag_us",
    "eo": "flag_eu",
    "es": "flag_es",
    "et": "flag_ee",
    "eu": "flag_es",
    "fa": "flag_ir",
    "fi": "flag_fi",
    "fr": "flag_fr",
    "gl": "flag_es",
    "he": "flag_il",
    "hi": "flag_in",
    "hr": "flag_hr",
    "hu": "flag_hu",
    "hy": "flag_am",
    "id": "flag_id",
    "is": "flag_is",
    "it": "flag_it",
    "ja": "flag_jp",
    "ka": "flag_ge",
    "kn": "flag_in",
    "ko": "flag_kr",
    "ku-IQ": "flag_iq",
    "lb": "flag_lu",
    "lt": "flag_lt",
    "lv": "flag_lv",
    "mk": "flag_mk",
    "mn": "flag_mn",
    "ms": "flag_my",
    "my": "flag_mm",
    "nb": "flag_no",
    "nl": "flag_nl",
    "nn": "flag_no",
    "pl": "flag_pl",
    "pt-BR": "flag_br",
    "pt": "flag_pt",
    "ro": "flag_ro",
    "ru": "flag_ru",
    "sa": "flag_in",
    "sh": "flag_rs",
    "sq": "flag_al",
    "si": "flag_lk",
    "sk": "flag_sk",
    "sl": "flag_si",
    "sr": "flag_rs",
    "sv": "flag_se",
    "te": "flag_in",
    "th": "flag_th",
    "ta": "flag_in",
    "tl": "flag_ph",
    "tr": "flag_tr",
    "uk": "flag_ua",
    "ur": "flag_pk",
    "uz": "flag_uz",
    "vi": "flag_vn",
    "zh": "flag_cn",
    "zh-Hant": "flag_cn",
    "zh-TW": "flag_tw"
}

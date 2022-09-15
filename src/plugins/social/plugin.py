# Copyright (c) 2016-2022 Martin Donath <martin.donath@squidfunk.com>

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

import logging
import os
import re
import requests
import sys

from collections import defaultdict
from hashlib import md5
from io import BytesIO
from mkdocs.commands.build import DuplicateFilter
from mkdocs.config.config_options import Type
from mkdocs.plugins import BasePlugin
from shutil import copyfile
from tempfile import TemporaryFile
from zipfile import ZipFile

try:
    from cairosvg import svg2png
    from PIL import Image, ImageDraw, ImageFont
    dependencies = True
except ImportError:
    dependencies = False

# -----------------------------------------------------------------------------
# Class
# -----------------------------------------------------------------------------

# Social plugin
class SocialPlugin(BasePlugin):

    # Configuration scheme
    config_scheme = (
        ("enabled", Type(bool, default = True)),
        ("cache_dir", Type(str, default = ".cache/plugin/social")),

        # Options for social cards
        ("cards", Type(bool, default = True)),
        ("cards_dir", Type(str, default = "assets/images/social")),
        ("cards_color", Type(dict, default = {})),
        ("cards_font", Type(str, default = None)),
    )

    # Retrieve configuration
    def on_config(self, config):
        self.color = colors.get("indigo")
        if not self.config["cards"]:
            return

        # Check if required dependencies are installed
        if not dependencies:
            log.error(
                "Required dependencies of \"social\" plugin not found. "
                "Install with: pip install pillow cairosvg"
            )
            sys.exit()

        # Ensure presence of cache directory
        self.cache = self.config["cache_dir"]
        if not os.path.isdir(self.cache):
            os.makedirs(self.cache)

        # Retrieve palette from theme configuration
        theme = config["theme"]
        if "palette" in theme:
            palette = theme["palette"]

            # Use first palette, if multiple are defined
            if isinstance(palette, list):
                palette = palette[0]

            # Set colors according to palette
            if "primary" in palette and palette["primary"]:
                primary = palette["primary"].replace(" ", "-")
                self.color = colors.get(primary, self.color)

        # Retrieve color overrides
        self.color = { **self.color, **self.config["cards_color"] }

        # Retrieve logo and font
        self.logo = self._load_logo(config)
        self.font = self._load_font(config)

    # Create social cards
    def on_page_markdown(self, markdown, page, config, files):
        if not self.config["cards"]:
            return

        # Resolve image directory
        directory = self.config["cards_dir"]
        file, _ = os.path.splitext(page.file.src_path)

        # Resolve path of image
        path = "{}.png".format(os.path.join(
            config["site_dir"],
            directory,
            file
        ))

        # Resolve path of image directory
        directory = os.path.dirname(path)
        if not os.path.isdir(directory):
            os.makedirs(directory)

        # Compute site name
        site_name = config.get("site_name")

        # Compute page title and description
        title = page.meta.get("title", page.title)
        description = config.get("site_description") or ""
        if "description" in page.meta:
            description = page.meta["description"]

        # Generate social card if not in cache - TODO: values from mkdocs.yml
        hash = md5("".join([
            site_name,
            str(title),
            description
        ]).encode("utf-8"))
        file = os.path.join(self.cache, f"{hash.hexdigest()}.png")
        if not os.path.isfile(file):
            image = self._render_card(site_name, title, description)
            image.save(file)

        # Copy file from cache
        copyfile(file, path)

        # Inject meta tags into page
        meta = page.meta.get("meta", [])
        page.meta["meta"] = meta + self._generate_meta(page, config)

    # -------------------------------------------------------------------------

    # Render social card
    def _render_card(self, site_name, title, description):
        logo = self.logo

        # Render background and logo
        image = self._render_card_background((1200, 630), self.color["fill"])
        image.alpha_composite(
            logo.resize((144, int(144 * logo.height / logo.width))),
            (1200 - 228, 64 - 4)
        )

        # Render site name
        font = ImageFont.truetype(self.font["Bold"], 36)
        image.alpha_composite(
            self._render_text((826, 48), font, site_name, 1, 20),
            (64 + 4, 64)
        )

        # Render page title
        font = ImageFont.truetype(self.font["Bold"], 92)
        image.alpha_composite(
            self._render_text((826, 328), font, title, 3, 30),
            (64, 160)
        )

        # Render page description
        font = ImageFont.truetype(self.font["Regular"], 28)
        image.alpha_composite(
            self._render_text((826, 80), font, description, 2, 14),
            (64 + 4, 512)
        )

        # Return social card image
        return image

    # Render social card background
    def _render_card_background(self, size, fill):
        return Image.new(mode = "RGBA", size = size, color = fill)

    # Render social card text
    def _render_text(self, size, font, text, lmax, spacing = 0):
        lines, words = [], []

        # Remove remnant HTML tags
        text = re.sub(r"(<[^>]+>)", "", text)

        # Create temporary image
        image = Image.new(mode = "RGBA", size = size)

        # Retrieve y-offset of textbox to correct for spacing
        yoffset = 0

        # Create drawing context and split text into lines
        context = ImageDraw.Draw(image)
        for word in text.split(" "):
            combine = " ".join(words + [word])
            textbox = context.textbbox((0, 0), combine, font = font)
            yoffset = textbox[1]
            if not words or textbox[2] <= image.width:
                words.append(word)
            else:
                lines.append(words)
                words = [word]

        # # Balance words on last line - TODO: overflows when broken word is too long
        # if len(lines) > 0:
        #     prev = len(" ".join(lines[-1]))
        #     last = len(" ".join(words))#

        #     print(last, prev)

        #     # Heuristic: try to find a good ratio
        #     if last / prev < 0.6:
        #         words.insert(0, lines[-1].pop())

        # Join words for each line and create image
        lines.append(words)
        lines = [" ".join(line) for line in lines]
        image = Image.new(mode = "RGBA", size = size)

        # Create drawing context and split text into lines
        context = ImageDraw.Draw(image)
        context.text(
            (0, spacing / 2 - yoffset), "\n".join(lines[:lmax]),
            font = font, fill = self.color["text"], spacing = spacing - yoffset
        )

        # Return text image
        return image

    # -------------------------------------------------------------------------

    # Generate meta tags
    def _generate_meta(self, page, config):
        directory = self.config["cards_dir"]
        file, _ = os.path.splitext(page.file.src_path)

        # Compute page title
        title = page.meta.get("title", page.title)
        if not page.is_homepage:
            title = f"{title} - {config.get('site_name')}"

        # Compute page description
        description = config.get("site_description")
        if "description" in page.meta:
            description = page.meta["description"]

        # Resolve image URL
        url = "{}.png".format(os.path.join(
            config.get("site_url"),
            directory,
            file
        ))

        # Ensure forward slashes
        url = url.replace(os.path.sep, "/")

        # Return meta tags
        return [

            # Meta tags for Open Graph
            { "property": "og:type", "content": "website" },
            { "property": "og:title", "content": title },
            { "property": "og:description", "content": description },
            { "property": "og:image", "content": url },
            { "property": "og:image:type", "content": "image/png" },
            { "property": "og:image:width", "content": "1200" },
            { "property": "og:image:height", "content": "630" },
            { "property": "og:url", "content": page.canonical_url },

            # Meta tags for Twitter
            { "name": "twitter:card", "content": "summary_large_image" },
            # { "name": "twitter:site", "content": user },
            # { "name": "twitter:creator", "content": user },
            { "name": "twitter:title", "content": title },
            { "name": "twitter:description", "content": description },
            { "name": "twitter:image", "content": url }
        ]

    # Retrieve logo image or icon
    def _load_logo(self, config):
        theme = config.get("theme")

        # Handle images (precedence over icons)
        if "logo" in theme:
            _, extension = os.path.splitext(theme["logo"])

            # Load SVG and convert to PNG
            path = os.path.join(config["docs_dir"], theme["logo"])
            if extension == ".svg":
                return self._load_logo_svg(path)

            # Load PNG, JPEG, etc.
            return Image.open(path).convert("RGBA")

        # Handle icons
        logo = "material/library"
        icon = theme["icon"] or {}
        if "logo" in icon and icon["logo"]:
            logo = icon["logo"]

        # Resolve path of package
        base = os.path.abspath(os.path.join(
            os.path.dirname(__file__),
            "../.."
        ))

        # Load icon data and fill with color
        path = f"{base}/.icons/{logo}.svg"
        return self._load_logo_svg(path, self.color["text"])

    # Load SVG file and convert to PNG
    def _load_logo_svg(self, path, fill = None):
        file = BytesIO()
        data = open(path).read()

        # Fill with color, if given
        if fill:
            data = data.replace("<svg", f"<svg fill=\"{fill}\"")

        # Convert to PNG and return image
        svg2png(bytestring = data, write_to = file, scale = 10)
        return Image.open(file)

    # Retrieve font
    def _load_font(self, config):
        name = self.config.get("cards_font")
        if not name:

            # Retrieve from theme (default: Roboto)
            theme = config["theme"]
            if theme["font"]:
                name = theme["font"]["text"]
            else:
                name = "Roboto"

        # Retrieve font files, if not already done
        files = os.listdir(self.cache)
        files = [file for file in files if file.endswith(".ttf") or file.endswith(".otf")] or (
            self._load_font_from_google(name)
        )

        # Map available font weights to file paths
        font = dict()
        for file in files:
            match = re.search("-(\w+)\.[ot]tf$", file)
            if match:
                font[match.group(1)] = os.path.join(self.cache, file)

        # Return available font weights with fallback
        return defaultdict(lambda: font["Regular"], font)

    # Retrieve font from Google Fonts
    def _load_font_from_google(self, name):
        url = "https://fonts.google.com/download?family={}"
        res = requests.get(url.format(name.replace(" ", "+")), stream = True)

        # Write archive to temporary file
        tmp = TemporaryFile()
        for chunk in res.iter_content(chunk_size = 128):
            tmp.write(chunk)

        # Unzip fonts from temporary file
        zip = ZipFile(tmp)
        files = [file for file in zip.namelist() if file.endswith(".ttf") or file.endswith(".otf")]
        zip.extractall(self.cache, files)

        # Close and delete temporary file
        tmp.close()
        return files

# -----------------------------------------------------------------------------
# Data
# -----------------------------------------------------------------------------

# Set up logging
log = logging.getLogger("mkdocs")
log.addFilter(DuplicateFilter())

# Color palette
colors = dict({
    "red":         { "fill": "#ef5552", "text": "#ffffff" },
    "pink":        { "fill": "#e92063", "text": "#ffffff" },
    "purple":      { "fill": "#ab47bd", "text": "#ffffff" },
    "deep-purple": { "fill": "#7e56c2", "text": "#ffffff" },
    "indigo":      { "fill": "#4051b5", "text": "#ffffff" },
    "blue":        { "fill": "#2094f3", "text": "#ffffff" },
    "light-blue":  { "fill": "#02a6f2", "text": "#ffffff" },
    "cyan":        { "fill": "#00bdd6", "text": "#ffffff" },
    "teal":        { "fill": "#009485", "text": "#ffffff" },
    "green":       { "fill": "#4cae4f", "text": "#ffffff" },
    "light-green": { "fill": "#8bc34b", "text": "#ffffff" },
    "lime":        { "fill": "#cbdc38", "text": "#000000" },
    "yellow":      { "fill": "#ffec3d", "text": "#000000" },
    "amber":       { "fill": "#ffc105", "text": "#000000" },
    "orange":      { "fill": "#ffa724", "text": "#000000" },
    "deep-orange": { "fill": "#ff6e42", "text": "#ffffff" },
    "brown":       { "fill": "#795649", "text": "#ffffff" },
    "grey":        { "fill": "#757575", "text": "#ffffff" },
    "blue-grey":   { "fill": "#546d78", "text": "#ffffff" },
    "black":       { "fill": "#000000", "text": "#ffffff" },
    "white":       { "fill": "#ffffff", "text": "#000000" }
})

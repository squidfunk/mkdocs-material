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

from __future__ import annotations

import re

from mkdocs.config.base import Config
from mkdocs.config.config_options import (
    Choice, DictOfItems, ListOfItems, SubConfig, Type
)
try:
    from PIL.Image import Image as _Image
except ImportError:
    pass

# -----------------------------------------------------------------------------
# Options
# -----------------------------------------------------------------------------

# Options for origin
Origin = (
    "start top",        "center top",       "end top",
    "start center",     "center",           "end center",
    "start bottom",     "center bottom",    "end bottom",
    "start",                                "end"
)

# Options for overflow
Overflow = (
    "truncate",
    "shrink"
)

# -----------------------------------------------------------------------------
# Classes
# -----------------------------------------------------------------------------

# Size
class Size(Config):
    width = Type(int, default = 0)
    height = Type(int, default = 0)

# Offset
class Offset(Config):
    x = Type(int, default = 0)
    y = Type(int, default = 0)

# # -----------------------------------------------------------------------------

# Background
class Background(Config):
    color = Type(str, default = "")
    image = Type(str, default = "")

# # -----------------------------------------------------------------------------

# Icon
class Icon(Config):
    value = Type(str, default = "")
    color = Type(str, default = "")

# # -----------------------------------------------------------------------------

# Line
class Line(Config):
    amount = Type((int, float), default = 1)
    height = Type((int, float), default = 1)

# Font
class Font(Config):
    family = Type(str, default = "Roboto")
    variant = Type(str, default = "")
    style = Type(str, default = "Regular")

# Typography
class Typography(Config):
    content = Type(str, default = "")
    align = Choice(Origin, default = "start top")
    overflow = Choice(Overflow, default = "truncate")
    color = Type(str, default = "")
    line = SubConfig(Line)
    font = SubConfig(Font)

# -----------------------------------------------------------------------------

# Layer
class Layer(Config):
    size = SubConfig(Size)
    offset = SubConfig(Offset)
    origin = Choice(Origin, default = "start top")
    background = SubConfig(Background)
    icon = SubConfig(Icon)
    typography = SubConfig(Typography)

# -----------------------------------------------------------------------------

# Layout
class Layout(Config):
    definitions = ListOfItems(Type(str), default = [])
    tags = DictOfItems(Type(str), default = {})
    size = SubConfig(Size)
    layers = ListOfItems(SubConfig(Layer), default = [])

# -----------------------------------------------------------------------------
# Functions
# -----------------------------------------------------------------------------

# Get layer or layout size as tuple
def get_size(layer: Layer | Layout):
    return layer.size.width, layer.size.height

# Get layer offset as tuple
def get_offset(layer: Layer, image: _Image):
    x, y = layer.offset.x, layer.offset.y

    # Compute offset from origin - if an origin is given, compute the offset
    # relative to the image and layer size to allow for flexible positioning
    if layer.origin != "start top":
        origin = re.split(r"\s+", layer.origin)

        # Get layer size
        w, h = get_size(layer)

        # Compute origin on x-axis
        if   "start"  in origin: pass
        elif "end"    in origin: x += (image.width  - w)  - 2 * x
        elif "center" in origin: x += (image.width  - w) >> 1

        # Compute origin on y-axis
        if   "top"    in origin: pass
        elif "bottom" in origin: y += (image.height - h)  - 2 * y
        elif "center" in origin: y += (image.height - h) >> 1

    # Return offset
    return x, y

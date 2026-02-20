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

from os import getenv
from sys import stderr
from colorama import Fore, Style

# Silence this warning with NO_MKDOCS_2_WARNING=1
if not getenv("NO_MKDOCS_2_WARNING"):
    print(
        "\n"
        f"{Fore.RED} │ ⚠ WARNING – MkDocs 2.0 is incompatible with Material for MkDocs{Style.RESET_ALL}\n"
        f"{Fore.RED} │ {Style.RESET_ALL}\n"
        f"{Fore.RED} │ {Style.RESET_ALL}  MkDocs 1.x is unmaintained. We recommend switching to Zensical, our\n"
        f"{Fore.RED} │ {Style.RESET_ALL}  new static site generator, as soon as possible. We're providing an\n"
        f"{Fore.RED} │ {Style.RESET_ALL}  analysis of the situation in this article:\n"
        f"{Fore.RED} │ {Style.RESET_ALL}  \n"
        f"{Fore.RED} │ {Style.RESET_ALL}  \033[4mhttps://squidfunk.github.io/mkdocs-material/blog/2026/02/18/mkdocs-2.0/{Style.RESET_ALL}\n"
        f"{Style.RESET_ALL}",
        file=stderr
    )

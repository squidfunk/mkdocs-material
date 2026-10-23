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
import sys

from colorama import Fore, Style
from importlib.util import find_spec
from pathlib import Path
from sys import stderr

# Check if we're running MkDocs. Disable the warning automatically for other
# contexts, e.g., to allow for forks of MkDocs to adjust behavior to fit
def is_mkdocs():
    path = Path(sys.argv[0])
    return path.name in ("mkdocs", "mkdocs.exe") or (
        path.name == "__main__.py" and path.parent.name == "mkdocs"
    )

# Check if we're running MkDocs and the warning hasn't been disabled
if is_mkdocs() and not os.getenv("NO_MKDOCS_2_WARNING"):
    properdocs_notice = ""
    if (
        os.getenv("DISABLE_MKDOCS_2_WARNING", "").lower() != "true"
        and find_spec("properdocs") is not None
    ):
        properdocs_notice = (
            f"{Fore.YELLOW} │{Style.RESET_ALL}\n"
            f"{Fore.YELLOW} │{Style.RESET_ALL}  A third-party plugin may print a separate notice recommending\n"
            f"{Fore.YELLOW} │{Style.RESET_ALL}  ProperDocs. That notice is not from the Material for MkDocs\n"
            f"{Fore.YELLOW} │{Style.RESET_ALL}  team and does not represent a recommendation from us.\n"
        )

    print(
        "\n"
        f"{Fore.YELLOW} │  {Style.BRIGHT}Material for MkDocs reaches end of life on May 5, 2027.{Style.RESET_ALL}\n"
        f"{Fore.YELLOW} │{Style.RESET_ALL}  Critical fixes and security updates continue until that date.\n"
        f"{Fore.YELLOW} │{Style.RESET_ALL}\n"
        f"{Fore.YELLOW} │{Style.RESET_ALL}  Zensical is its maintained successor, built by the same team.\n"
        f"{Fore.YELLOW} │{Style.RESET_ALL}  Try it alongside MkDocs with your existing mkdocs.yml:\n"
        f"{Fore.YELLOW} │{Style.RESET_ALL}  {Fore.CYAN}\033[4mhttps://zensical.org/docs/compatibility/mkdocs/migration/{Style.RESET_ALL}\n"
        f"{properdocs_notice}"
        "\n"
        f"{Fore.LIGHTBLACK_EX}  To disable this warning, set NO_MKDOCS_2_WARNING=1.{Style.RESET_ALL}\n",
        file=stderr
    )

# Disable for subsequent imports
os.environ["NO_MKDOCS_2_WARNING"] = "true"

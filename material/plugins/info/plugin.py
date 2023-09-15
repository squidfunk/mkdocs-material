# Copyright (c) 2016-2023 Martin Donath <martin.donath@squidfunk.com>

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

import json
import logging
import os
import platform
import requests
import sys

from colorama import Fore, Style
from importlib.metadata import distributions, version
from io import BytesIO
from markdown.extensions.toc import slugify
from mkdocs.plugins import BasePlugin, event_priority
from mkdocs.structure.files import get_files
from mkdocs.utils import get_theme_dir
from zipfile import ZipFile, ZIP_DEFLATED

from .config import InfoConfig

# -----------------------------------------------------------------------------
# Classes
# -----------------------------------------------------------------------------

# Info plugin
class InfoPlugin(BasePlugin[InfoConfig]):

    # Initialize plugin
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        # Initialize incremental builds
        self.is_serve = False

    # Determine whether we're serving the site
    def on_startup(self, *, command, dirty):
        self.is_serve = command == "serve"

    # Create a self-contained example (run earliest) - determine all files that
    # are visible to MkDocs and are used to build the site, create an archive
    # that contains all of them, and print a summary of the archive contents.
    # The user must attach this archive to the bug report.
    @event_priority(100)
    def on_config(self, config):
        if not self.config.enabled:
            return

        # By default, the plugin is disabled when the documentation is served,
        # but not when it is built. This should nicely align with the expected
        # user experience when creating reproductions.
        if not self.config.enabled_on_serve and self.is_serve:
            return

        # Resolve latest version
        url = "https://github.com/squidfunk/mkdocs-material/releases/latest"
        res = requests.get(url, allow_redirects = False)

        # Check if we're running the latest version
        _, current = res.headers.get("location").rsplit("/", 1)
        present = version("mkdocs-material")
        if not present.startswith(current):
            log.error("Please upgrade to the latest version.")
            self._help_on_versions_and_exit(present, current)

        # Exit if archive creation is disabled
        if not self.config.archive:
            sys.exit(1)

        # Print message that we're creating a bug report
        log.info("Started archive creation for bug report")

        # Check that there are no overrides in place - we need to use a little
        # hack to detect whether the custom_dir setting was used without parsing
        # mkdocs.yml again - we check at which position the directory provided
        # by the theme resides, and if it's not the first one, abort.
        if config.theme.dirs.index(get_theme_dir(config.theme.name)):
            log.error("Please remove 'custom_dir' setting.")
            self._help_on_customizations_and_exit()

        # Check that there are no hooks in place - hooks can alter the behavior
        # of MkDocs in unpredictable ways, which is why they must be considered
        # being customizations. Thus, we can't offer support for debugging and
        # must abort here.
        if config.hooks:
            log.error("Please remove 'hooks' setting.")
            self._help_on_customizations_and_exit()

        # Create in-memory archive and prompt user to enter a short descriptive
        # name for the archive, which is also used as the directory name. Note
        # that the name is slugified for better readability and stripped of any
        # file extension that the user might have entered.
        archive = BytesIO()
        example = input("\nPlease name your bug report (2-4 words): ")
        example, _ = os.path.splitext(example)
        example = "-".join([present, slugify(example, "-")])

        # Create self-contained example from project
        files: list[str] = []
        with ZipFile(archive, "a", ZIP_DEFLATED, False) as f:
            for path in ["mkdocs.yml", "requirements.txt"]:
                if os.path.isfile(path):
                    f.write(path, os.path.join(example, path))

            # Append all files visible to MkDocs
            for file in get_files(config):
                path = os.path.relpath(file.abs_src_path, os.path.curdir)
                f.write(path, os.path.join(example, path))

            # Add information on installed packages
            f.writestr(
                os.path.join(example, "requirements.lock.txt"),
                "\n".join(sorted([
                    "==".join([package.name, package.version])
                        for package in distributions()
                ]))
            )

            # Add information on platform
            f.writestr(
                os.path.join(example, "platform.json"),
                json.dumps(
                    {
                        "system": platform.platform(),
                        "python": platform.python_version()
                    },
                    default = str,
                    indent = 2
                )
            )

            # Retrieve list of processed files
            for a in f.filelist:
                files.append("".join([
                    Fore.LIGHTBLACK_EX, a.filename, " ",
                    _size(a.compress_size)
                ]))

        # Finally, write archive to disk
        buffer = archive.getbuffer()
        with open(f"{example}.zip", "wb") as f:
            f.write(archive.getvalue())

        # Print summary
        log.info("Archive successfully created:")
        print(Style.NORMAL)

        # Print archive file names
        files.sort()
        for file in files:
            print(f"  {file}")

        # Print archive name
        print(Style.RESET_ALL)
        print("".join([
            "  ", f.name, " ",
            _size(buffer.nbytes, 10)
        ]))

        # Print warning when file size is excessively large
        print(Style.RESET_ALL)
        if buffer.nbytes > 1000000:
            log.warning("Archive exceeds recommended maximum size of 1 MB")

        # Aaaaaand done
        sys.exit(1)

    # -------------------------------------------------------------------------

    # Print help on versions and exit
    def _help_on_versions_and_exit(self, have, need):
        print(Fore.RED)
        print("  When reporting issues, please first upgrade to the latest")
        print("  version of Material for MkDocs, as the problem might already")
        print("  be fixed in the latest version. This helps reduce duplicate")
        print("  efforts and saves us maintainers time.")
        print(Style.NORMAL)
        print(f"  Please update from {have} to {need}.")
        print(Style.RESET_ALL)
        print(f"  pip install --upgrade --force-reinstall mkdocs-material")
        print(Style.NORMAL)

        # Exit, unless explicitly told not to
        if self.config.archive_stop_on_violation:
            sys.exit(1)

    # Print help on customizations and exit
    def _help_on_customizations_and_exit(self):
        print(Fore.RED)
        print("  When reporting issues, you must remove all customizations")
        print("  and check if the problem persists. If not, the problem is")
        print("  caused by your overrides. Please understand that we can't")
        print("  help you debug your customizations. Please remove:")
        print(Style.NORMAL)
        print("  - theme.custom_dir")
        print("  - hooks")
        print(Fore.YELLOW)
        print("  Additionally, please remove all third-party JavaScript or")
        print("  CSS not explicitly mentioned in our documentation:")
        print(Style.NORMAL)
        print("  - extra_css")
        print("  - extra_javascript")
        print(Style.RESET_ALL)

        # Exit, unless explicitly told not to
        if self.config.archive_stop_on_violation:
            sys.exit(1)

# -----------------------------------------------------------------------------
# Helper functions
# -----------------------------------------------------------------------------

# Print human-readable size
def _size(value, factor = 1):
    color = Fore.GREEN
    if   value > 100000 * factor: color = Fore.RED
    elif value >  25000 * factor: color = Fore.YELLOW
    for unit in ["B", "kB", "MB", "GB", "TB", "PB", "EB", "ZB"]:
        if abs(value) < 1000.0:
            return f"{color}{value:3.1f} {unit}"
        value /= 1000.0

# -----------------------------------------------------------------------------
# Data
# -----------------------------------------------------------------------------

# Set up logging
log = logging.getLogger("mkdocs.material.info")

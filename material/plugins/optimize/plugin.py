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

import functools
import json
import logging
import os
import subprocess
import sys

from fnmatch import fnmatch
from colorama import Fore, Style
from concurrent.futures import Future
from concurrent.futures.thread import ThreadPoolExecutor
from hashlib import sha1
from mkdocs import utils
from mkdocs.config.defaults import MkDocsConfig
from mkdocs.exceptions import PluginError
from mkdocs.plugins import BasePlugin
from mkdocs.structure.files import File
from shutil import which
try:
    from PIL import Image
except ImportError:
    pass

from .config import OptimizeConfig

# -----------------------------------------------------------------------------
# Classes
# -----------------------------------------------------------------------------

# Optimize plugin
class OptimizePlugin(BasePlugin[OptimizeConfig]):
    supports_multiple_instances = True

    # Manifest
    manifest: dict[str, str] = {}

    # Initialize plugin
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        # Initialize incremental builds
        self.is_serve = False

    # Determine whether we're serving the site
    def on_startup(self, *, command, dirty):
        self.is_serve = command == "serve"

        # Initialize thread pool
        self.pool = ThreadPoolExecutor(self.config.concurrency)
        self.pool_jobs: dict[str, Future] = {}

    # Resolve and load manifest
    def on_config(self, config):
        if not self.config.enabled:
            return

        # Resolve cache directory (once) - this is necessary, so the cache is
        # always relative to the configuration file, and thus project, and not
        # relative to the current working directory, or it would not work with
        # the projects plugin.
        path = os.path.abspath(self.config.cache_dir)
        if path != self.config.cache_dir:
            self.config.cache_dir = os.path.join(
                os.path.dirname(config.config_file_path),
                os.path.normpath(self.config.cache_dir)
            )

            # Ensure cache directory exists
            os.makedirs(self.config.cache_dir, exist_ok = True)

        # Initialize manifest
        self.manifest_file = os.path.join(
            self.config.cache_dir, "manifest.json"
        )

        # Load manifest if it exists and the cache should be used
        if os.path.isfile(self.manifest_file) and self.config.cache:
            try:
                with open(self.manifest_file) as f:
                    self.manifest = json.load(f)
            except:
                pass

    # Initialize optimization pipeline
    def on_env(self, env, *, config, files):
        if not self.config.enabled:
            return

        # Skip if media files should not be optimized
        if not self.config.optimize:
            return

        # Filter all optimizable media files and steal reponsibility from MkDocs
        # by removing them from the files collection. Then, start a concurrent
        # job that checks if an image was already optimized and can be returned
        # from the cache, or optimize it accordingly.
        for file in files.media_files():
            if self._is_excluded(file):
                continue

            # Spawn concurrent job to optimize the given image and add future
            # to job dictionary, as it returns the file we need to copy later
            path = os.path.join(self.config.cache_dir, file.src_path)
            self.pool_jobs[file.abs_src_path] = self.pool.submit(
                self._optimize_image, file, path, config
            )

            # Steal responsibility from MkDocs
            files.remove(file)

    # Finish optimization pipeline
    def on_post_build(self, *, config):
        if not self.config.enabled:
            return

        # Skip if media files should not be optimized
        if not self.config.optimize:
            return

        # Reconcile concurrent jobs - we need to wait for all jobs to finish
        # before we can copy the optimized files to the output directory. If an
        # exception occurred in one of the jobs, we raise it here, so the build
        # fails and the author can fix the issue.
        for path, future in self.pool_jobs.items():
            if future.exception():
                raise future.exception()
            else:
                file: File = future.result()
                file.copy_file()

        # Save manifest if cache should be used
        if self.config.cache:
            with open(self.manifest_file, "w") as f:
                f.write(json.dumps(self.manifest, indent = 2, sort_keys = True))

        # Compute and print gains through optimization
        if self.config.print_gain_summary:
            print(Style.NORMAL)
            print(f"  Optimizations:")

            # Print summary for file extension
            for seek in [".png", ".jpg"]:
                size = size_opt = 0
                for path, future in self.pool_jobs.items():
                    file: File = future.result()

                    # Skip files that are not of the given type
                    _, extension = os.path.splitext(path)
                    extension = ".jpg" if extension == ".jpeg" else extension
                    if extension != seek:
                        continue

                    # Compute size before and after optimization
                    size     += os.path.getsize(path)
                    size_opt += os.path.getsize(file.abs_dest_path)

                # Compute absolute and relative gain
                if size and size_opt:
                    gain_abs = size - size_opt
                    gain_rel = (1 - size_opt / size) * 100

                    # Print summary for files
                    print(
                        f"    *{seek} {Fore.GREEN}{_size(size_opt)}"
                        f"{Fore.WHITE}{Style.DIM} ↓ "
                        f"{_size(gain_abs)} [{gain_rel:3.1f}%]"
                        f"{Style.RESET_ALL}"
                    )

            # Reset all styles
            print(Style.RESET_ALL)

    # Save manifest on shutdown
    def on_shutdown(self):
        if not self.config.enabled:
            return

        # Shutdown thread pool - if we're on Python 3.9 and above, cancel all
        # pending futures that have not yet been scheduled
        if sys.version_info >= (3, 9):
            self.pool.shutdown(cancel_futures = True)
        else:
            self.pool.shutdown()

        # Save manifest if cache should be used
        if self.manifest and self.config.cache:
            with open(self.manifest_file, "w") as f:
                f.write(json.dumps(self.manifest, indent = 2, sort_keys = True))

    # -------------------------------------------------------------------------

    # Check if a file can be optimized
    def _is_optimizable(self, file: File):

        # Check if PNG images should be optimized
        if file.url.endswith((".png")):
            return self.config.optimize_png

        # Check if JPG images should be optimized
        if file.url.endswith((".jpg", ".jpeg")):
            return self.config.optimize_jpg

        # File can not be optimized by the plugin
        return False

    # Check if the given file is excluded
    def _is_excluded(self, file: File):
        if not self._is_optimizable(file):
            return True

        # Check if file matches one of the inclusion patterns
        path = file.src_path
        if self.config.optimize_include:
            for pattern in self.config.optimize_include:
                if fnmatch(file.src_uri, pattern):
                    return False

            # File is not included
            log.debug(f"Excluding file '{path}' due to inclusion patterns")
            return True

        # Check if file matches one of the exclusion patterns
        for pattern in self.config.optimize_exclude:
            if fnmatch(file.src_uri, pattern):
                log.debug(f"Excluding file '{path}' due to exclusion patterns")
                return True

        # File is not excluded
        return False

    # Optimize image and write to cache
    def _optimize_image(self, file: File, path: str, config: MkDocsConfig):
        with open(file.abs_src_path, "rb") as f:
            data = f.read()
            hash = sha1(data).hexdigest()

            # Check if file hash changed, so we need to optimize again
            prev = self.manifest.get(file.url, "")
            if hash != prev or not os.path.isfile(path):
                os.makedirs(os.path.dirname(path), exist_ok = True)

                # Optimize PNG image using pngquant
                if file.url.endswith((".png")):
                    self._optimize_image_png(file, path, config)

                # Optimize JPG image using pillow
                if file.url.endswith((".jpg", ".jpeg")):
                    self._optimize_image_jpg(file, path, config)

                # Compute size before and after optimization
                size     = len(data)
                size_opt = os.path.getsize(path)

                # Compute absolute and relative gain
                gain_abs = size - size_opt
                gain_rel = (1 - size_opt / size) * 100

                # Print how much we gained, if we did and desired
                gain = ""
                if gain_abs and self.config.print_gain:
                    gain += " ↓ "
                    gain += " ".join([_size(gain_abs), f"[{gain_rel:3.1f}%]"])

                # Print summary for file
                log.info(
                    f"Optimized media file: {file.src_uri} "
                    f"{Fore.GREEN}{_size(size_opt)}"
                    f"{Fore.WHITE}{Style.DIM}{gain}"
                    f"{Style.RESET_ALL}"
                )

                # Update manifest by associating file with hash
                self.manifest[file.url] = hash

        # Compute project root
        root = os.path.dirname(config.config_file_path)

        # Compute source file system path
        file.abs_src_path = path
        file.src_path     = os.path.relpath(path, root)

        # Return file to be copied from cache
        return file

    # Optimize PNG image - we first tried to use libimagequant, but encountered
    # the occassional segmentation fault, which means it's probably not a good
    # choice. Instead, we just rely on pngquant which seems much more stable.
    def _optimize_image_png(self, file: File, path: str, config: MkDocsConfig):

        # Check if the required dependencies for optimizing are available, which
        # is, at the absolute minimum, the 'pngquant' binary, and raise an error
        # to the caller, so he can decide what to do with the error. The caller
        # can treat this as a warning or an error to abort the build.
        if not which("pngquant"):
            docs = os.path.relpath(config.docs_dir)
            path = os.path.relpath(file.abs_src_path, docs)
            raise PluginError(
                f"Couldn't optimize image '{path}' in '{docs}': 'pngquant' "
                f"not found. Make sure 'pngquant' is installed and in your path"
            )

        # Build command line arguments
        args = ["pngquant",
            "--force", "--skip-if-larger",
            "--output", path,
            "--speed", f"{self.config.optimize_png_speed}"
        ]

        # Add flag to remove optional metadata
        if self.config.optimize_png_strip:
            args.append("--strip")

        # Set input file and run, then check if pngquant actually wrote a file,
        # as we instruct it not to if the size of the optimized file is larger.
        # This can happen if files are already compressed and optimized by
        # the author. In that case, just copy the original file.
        subprocess.run([*args, file.abs_src_path])
        if not os.path.isfile(path):
            utils.copy_file(file.abs_src_path, path)

    # Optimize JPG image
    def _optimize_image_jpg(self, file: File, path: str, config: MkDocsConfig):

        # Check if the required dependencies for optimizing are available, which
        # is, at the absolute minimum, the 'pillow' package, and raise an error
        # to the caller, so he can decide what to do with the error. The caller
        # can treat this as a warning or an error to abort the build.
        if not _supports("Image"):
            docs = os.path.relpath(config.docs_dir)
            path = os.path.relpath(file.abs_src_path, docs)
            raise PluginError(
                f"Couldn't optimize image '{path}' in '{docs}': install "
                f"required dependencies – pip install 'mkdocs-material[imaging]'"
            )

        # Open and save optimized image
        image = Image.open(file.abs_src_path)
        image.save(path, "jpeg",
            quality     = self.config.optimize_jpg_quality,
            progressive = self.config.optimize_jpg_progressive
        )

# -----------------------------------------------------------------------------
# Helper functions
# -----------------------------------------------------------------------------

# Check for presence of optional imports
@functools.lru_cache(maxsize = None)
def _supports(name: str):
    return name in globals()

# -----------------------------------------------------------------------------

# Print human-readable size
def _size(value):
    for unit in ["B", "kB", "MB", "GB", "TB", "PB", "EB", "ZB"]:
        if abs(value) < 1000.0:
            return f"{value:3.1f} {unit}"
        value /= 1000.0

# -----------------------------------------------------------------------------
# Data
# -----------------------------------------------------------------------------

# Set up logging
log = logging.getLogger("mkdocs.material.optimize")

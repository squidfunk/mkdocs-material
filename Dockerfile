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

FROM python:3.11-alpine3.19 AS build
# Build-time flags
ARG WITH_PLUGINS=true

# Environment variables
ENV PACKAGES=/usr/local/lib/python3.11/site-packages

# Set build directory
WORKDIR /tmp

# Copy files necessary for build
COPY material material
COPY package.json package.json
COPY README.md README.md
COPY *requirements.txt ./
COPY pyproject.toml pyproject.toml

# Perform build and cleanup artifacts and caches

# Apk
RUN <<RUN_END
apk upgrade --update-cache -a
apk add --no-cache \
        cairo \
        freetype-dev \
        git \
        git-fast-import \
        jpeg-dev \
        openssh \
        tini \
        zlib-dev
apk add --no-cache --virtual .build \
        gcc \
        g++ \
        libffi-dev \
        musl-dev
RUN_END

# Python with uv <= 10-100x faster than pip
# docker system prune -f && build no cache:
# [+] Building 33.1s (22/22) FINISHED versus [+] Building 51.6s (15/15) FINISHED
# https://docs.astral.sh/uv/
# https://docs.astral.sh/uv/reference/cli/#uv-pip-install
# uv don't compile module by default => no *.pyc
ARG PYTHONDONTWRITEBYTECODE=1 
ARG UV_NO_CACHE=1
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /tmp/
RUN <<RUN_END
TO_INSTALL=' .'
if [ "${WITH_PLUGINS}" = "true" ]
then
  TO_INSTALL="$TO_INSTALL mkdocs-material[recommended] mkdocs-material[imaging]"
fi
if [ -e user-requirements.txt ]
then
  TO_INSTALL="$TO_INSTALL --requirements user-requirements.txt"
fi
echo "$TO_INSTALL" > /tmp/TO_INSTALL.txt
/tmp/uv pip install --system $TO_INSTALL
RUN_END

# Themes and Git
RUN <<RUN_END
for theme in mkdocs readthedocs
do
  rm -rf ${PACKAGES}/mkdocs/themes/$theme
  ln -s ${PACKAGES}/material/templates ${PACKAGES}/mkdocs/themes/$theme
done
git config --system --add safe.directory /docs
git config --system --add safe.directory /site
RUN_END

# Clean: apk, python modules, folders
RUN <<RUN_END
apk del \
  .build \
  python3-idle
/tmp/uv pip uninstall --system \
  pip \
  idlelib
rm -rf \
  /tmp/* \
  /usr/include/* \
  /usr/local/include/* \
  /var/cache/*
RUN_END

#  From empty image
FROM scratch 

# Copy all from build
COPY --from=build / /

# Set working directory
WORKDIR /docs

# Expose MkDocs development server port
EXPOSE 8000

# Start development server by default
ENTRYPOINT ["/sbin/tini", "--", "mkdocs"]
CMD ["serve", "--dev-addr=0.0.0.0:8000"]

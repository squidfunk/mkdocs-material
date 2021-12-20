# Copyright (c) 2016-2021 Martin Donath <martin.donath@squidfunk.com>

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

### 1. Docker build stage: Create MkDocs binary inluding material theme
FROM python:3.10-alpine AS builder

# Build-time flags
ARG WITH_PLUGINS=true

# Environment variables
ENV PACKAGES=/usr/local/lib/python3.9/site-packages
ENV PYTHONDONTWRITEBYTECODE=1

# Set build directory
WORKDIR /tmp

# Copy files necessary for build
COPY material material
COPY MANIFEST.in MANIFEST.in
COPY package.json package.json
COPY README.md README.md
COPY requirements.txt requirements.txt
COPY setup.py setup.py

# Perform build
RUN apk add --no-cache binutils upx \
 && apk add --no-cache --virtual .build gcc musl-dev
RUN python -m pip install --upgrade pip
RUN pip install --ignore-installed pyinstaller PyYAML \
 && pip install --no-cache-dir . \
 && if [ "${WITH_PLUGINS}" = "true" ]; then \
      pip install --no-cache-dir \
        "mkdocs-minify-plugin>=0.3" \
        "mkdocs-redirects>=1.0"; \
    fi

# Create self-contained MkDocs binary inluding material theme
RUN pyinstaller  --recursive-copy-metadata mkdocs --collect-all mkdocs \
  --copy-metadata mkdocs-material --collect-all material --onefile /usr/local/bin/mkdocs

### 2. Docker build stage: Serving MkDocs using binary from
FROM alpine
COPY --from=builder /tmp/dist/mkdocs /usr/local/bin/mkdocs

RUN apk add --no-cache git git-fast-import openssh

# Set build directory
WORKDIR /docs

# Expose MkDocs development server port
EXPOSE 8000

# Start development server by default
ENTRYPOINT ["mkdocs"]
CMD ["serve", "--dev-addr=0.0.0.0:8000"]

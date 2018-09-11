#!/bin/bash

# Copyright (c) 2016-2018 Martin Donath <martin.donath@squidfunk.com>

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

# Exit, if one command fails
set -e

# # Create directory for overrides, so we don't clutter up the base theme with
# # our custom adjustments for our own hosted documentation
# mkdir -p overrides
# cat > overrides/main.html <<-EOM
#   {% extends "base.html" %}
#   {% block scripts %}
#     {{ super() }}
#     <script>
#       (function(i,s,o,g,r,a,m){
#         i["GinsengAnalyticsObject"]=r;i[r]=i[r]||function(){(i[r].q=i[r].q||
#         []).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
#         m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;
#         m.parentNode.insertBefore(a,m)
#       })(window, document,
#         "script", "https://ginseng.ai/analytics.js", "gx");
#     </script>
#   {% endblock %}
# EOM

# Deploy documentation to GitHub pages
if [ "$TRAVIS_BRANCH" == "master" -a "$TRAVIS_PULL_REQUEST" == "false" ]; then
  REMOTE="https://${GH_TOKEN}@github.com/squidfunk/mkdocs-material"

  # Set configuration for repository and deploy documentation
  git config --global user.name "${GH_NAME}"
  git config --global user.email "${GH_EMAIL}"
  git remote set-url origin ${REMOTE}

  # Install Material, so we can use it as a base template and add overrides
  python setup.py install

  # # Override theme configuration
  # sed -i 's/name: null/name: material/g' mkdocs.yml
  # sed -i 's/custom_dir: material/custom_dir: overrides/g' mkdocs.yml

  # Build documentation with overrides and publish to GitHub pages
  mkdocs gh-deploy --force
  mkdocs --version
fi

# Remove overrides directory so it won't get included in the image
# rm -rf overrides

# Terminate if we're not on a release branch
echo "${TRAVIS_BRANCH}" | grep -qvE "^[0-9.]+$" && exit 0; :;

# Install dependencies for release build
pip install wheel twine

# Build and install theme and Docker image
python setup.py build sdist bdist_wheel --universal
docker build -t ${TRAVIS_REPO_SLUG} .

# Test Docker image build
docker run --rm -it -v $(pwd):/docs ${TRAVIS_REPO_SLUG} build --theme material

# Push release to PyPI
twine upload -u ${PYPI_USERNAME} -p ${PYPI_PASSWORD} dist/*

# Push image to Docker Hub
docker login -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD}
docker tag ${TRAVIS_REPO_SLUG} ${TRAVIS_REPO_SLUG}:${TRAVIS_BRANCH}
docker tag ${TRAVIS_REPO_SLUG} ${TRAVIS_REPO_SLUG}:latest
docker push ${TRAVIS_REPO_SLUG}

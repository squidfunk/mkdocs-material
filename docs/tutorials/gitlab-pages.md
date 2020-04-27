## Publishing the mkdocs in GitLab pages

You can easily publish your docs with [GitLab-CI](https://docs.gitlab.com/ee/ci/) for free!

Assuming you have a repository with mkdocs that is hosted at GitLab:

```bash
.
├── docs
│   └── index.md
├── mkdocs.yml
├── README.md
├── requirements.txt
```

In the `requirements.txt` file you must define at least the dependency `mkdocs-material`.

To use GitLab CI to publish your docs, just add a `.gitlab-ci.yml` file to your repo. Add the following content:

```yaml
# use the python latest base image
image: python:latest

# this pipeline consists of a build and deploy stage
stages:
  - build
  - deploy

# build your docs with mkdocs and keep the site folder as artifact
build:
  stage: build
  script:
    - pip install -r requirements.txt
    - mkdocs build --strict
  artifacts:
    expire_in: 3h
    paths:
      - site/

# copy the site folder to public to publish your docs to gitlab pages
pages:
  stage: deploy
  script:
    - mv site public/
  dependencies:
    - build
  artifacts:
    paths:
    - public
  only:
    - master
```

When you commit your change and push it to GitLab, a CI runner will automatically
detect the pipeline definition and starts building your docs. When the build stage
was successful the generated pages will be deployed to your repos GitLab pages.

### GitLab Pages with mkdocs-material example

To view an example repository for the usage of mkdocs material and GitLab pages
checkout [gitlab.com/ayeks/mkdocs-material-example](https://gitlab.com/ayeks/mkdocs-material-example).

GitLab-CI [builds and deploys](https://gitlab.com/ayeks/mkdocs-material-example/pipelines/latest)
the docs automatically to the project specific pages url:
[ayeks.gitlab.io/mkdocs-material-example](https://ayeks.gitlab.io/mkdocs-material-example/).

Feel free to [fork](https://gitlab.com/ayeks/mkdocs-material-example/-/forks/new) the example
repo to get started on mkdocs-material with GitLab-CI.

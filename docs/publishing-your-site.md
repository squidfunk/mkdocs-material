# Publishing your site

The great thing about hosting project documentation in a `git` repository is
the ability to deploy it automatically when new changes are pushed. MkDocs
makes this ridiculously simple.

## GitHub Pages

If you're already hosting your code on GitHub, [GitHub Pages] is certainly
the most convenient way to publish your project documentation. It's free of
charge and pretty easy to set up.

  [GitHub Pages]: https://pages.github.com/

### with GitHub Actions

Using [GitHub Actions] you can automate the deployment of your project
documentation. At the root of your repository, create a new GitHub Actions
workflow, e.g. `.github/workflows/ci.yml`, and copy and paste the following
contents:

=== "Material for MkDocs"

    ``` yaml
    name: ci # (1)!
    on:
      push:
        branches:
          - master # (2)!
          - main
    permissions:
      contents: write
    jobs:
      deploy:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - uses: actions/setup-python@v4
            with:
              python-version: 3.x
          - uses: actions/cache@v2
            with:
              key: ${{ github.ref }}
              path: .cache
          - run: pip install mkdocs-material # (3)!
          - run: mkdocs gh-deploy --force
    ```

    1.  You can change the name to your liking. 

    2.  At some point, GitHub renamed `master` to `main`. If your default branch
        is named `master`, you can safely remove `main`, vice versa.

    3.  This is the place to install further [MkDocs plugins] or Markdown
        extensions with `pip` to be used during the build:

        ``` sh
        pip install \
          mkdocs-material \
          mkdocs-awesome-pages-plugin \
          ...
        ```

=== "Insiders"

    ``` yaml
    name: ci
    on:
      push:
        branches:
          - master
          - main
    permissions:
      contents: write
    jobs:
      deploy:
        runs-on: ubuntu-latest
        if: github.event.repository.fork == false
        steps:
          - uses: actions/checkout@v3
          - uses: actions/setup-python@v4
            with:
              python-version: 3.x
          - uses: actions/cache@v2
            with:
              key: ${{ github.ref }}
              path: .cache
          - run: apt-get install pngquant # (1)!
          - run: pip install git+https://${GH_TOKEN}@github.com/squidfunk/mkdocs-material-insiders.git
          - run: mkdocs gh-deploy --force
    env:
      GH_TOKEN: ${{ secrets.GH_TOKEN }} # (2)!
    ```

    1.  This step is only necessary if you want to use the
        [built-in optimize plugin] to automatically compress images.

    2.  Remember to set the `GH_TOKEN` environment variable to the value of your
        [personal access token] when deploying [Insiders], which can be done
        using [GitHub secrets].

Now, when a new commit is pushed to either the `master` or `main` branches,
the static site is automatically built and deployed. Push your changes to see
the workflow in action.

If the GitHub Page doesn't show up after a few minutes, go to the settings of
your repository and ensure that the [publishing source branch] for your GitHub
Page is set to `gh-pages`.

Your documentation should shortly appear at `<username>.github.io/<repository>`.

  [GitHub Actions]: https://github.com/features/actions
  [MkDocs plugins]: https://github.com/mkdocs/mkdocs/wiki/MkDocs-Plugins
  [personal access token]: https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token
  [Insiders]: insiders/index.md
  [built-in optimize plugin]: setup/building-an-optimized-site.md#built-in-optimize-plugin
  [GitHub secrets]: https://docs.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets
  [publishing source branch]: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

### with MkDocs

If you prefer to deploy your project documentation manually, you can just invoke
the following command from the directory containing the `mkdocs.yml` file:

```
mkdocs gh-deploy --force
```

## GitLab Pages

If you're hosting your code on GitLab, deploying to [GitLab Pages] can be done
by using the [GitLab CI] task runner. At the root of your repository, create a
task definition named `.gitlab-ci.yml` and copy and paste the following
contents:

=== "Material for MkDocs"

    ``` yaml
    image: python:latest
    pages:
      stage: deploy
      script:
        - pip install mkdocs-material
        - mkdocs build --site-dir public
      artifacts:
        paths:
          - public
      rules:
        - if: '$CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH'
    ```

=== "Insiders"

    ``` yaml
    image: python:latest
    pages:
      stage: deploy
      script: # (1)!
        - pip install git+https://${GH_TOKEN}@github.com/squidfunk/mkdocs-material-insiders.git
        - mkdocs build --site-dir public
      artifacts:
        paths:
          - public
      rules:
        - if: '$CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH'
    ```

    1.  Remember to set the `GH_TOKEN` environment variable to the value of your
        [personal access token] when deploying [Insiders], which can be done
        using [masked custom variables].

Now, when a new commit is pushed to `master`, the static site is automatically
built and deployed. Commit and push the file to your repository to see the
workflow in action.

Your documentation should shortly appear at `<username>.gitlab.io/<repository>`.

## Vercel

Vercel is a cloud-based platform that provides hosting and deployment services for web applications and websites. It offers an intuitive user interface and supports a variety of programming languages and frameworks, including Next.js, React, Vue.js, and Angular. With Vercel, developers can quickly deploy and scale their applications in the cloud, and take advantage of advanced features such as instant global deployments, automatic SSL certificate provisioning, and serverless functions. Vercel also provides integrations with popular version control systems like Git, making it easy to connect to your existing code repositories and streamline your development workflow.

We can utilize Vercel to deploy our customized MkDocs static websites. Here's how to do it.

!!! warning "Create a Vercel Account"
    If you don't already have a Vercel account, you'll need to create one. Go to the Vercel website [https://vercel.com](https://vercel.com) and sign up for a free account.
    You'll be asked to verify your Git account in order to carry out the next several steps.

!!! tip "Step 1: Install Vercel CLI"
    To deploy your MkDocs static web app to Vercel, you'll need to install the Vercel CLI first. You can do this by running the following command in your terminal:

    ``` 
    npm install -g vercel

    ```
!!! tip "Step 2: Create your MkDocs project"
    Create a new MkDocs project or navigate to an existing one. Make sure it is fully functional and has been tested locally.

    Next, build your MkDocs project. To build your MkDocs project, run the following command:

    ```
    mkdocs build

    ```
    This will generate a ***site*** directory in your project root directory. Either isolate the directory or keep in mind that it alone will be used to deploy to Vercel. Make sure to change the directory to the ***site*** directory:

    ```
    cd site
    ```

!!! tip "Step 3: Initialize a new Git repository"
    Initialize a new Git repository in your project root directory using the following command:

    ```
    git init

    ```
    Add the ***site*** directory to Git using the following command:

    ```
    git add site/

    ```

    Commit your changes using the following command:

    ```
    git commit -m "Initial commit"

    ```

    After you commit the addition of the site directory, you need to push the local repository by running two commands, one after the other:

    > The below commands can be trieved when you create a repository online within [GitHub](https://github.com)
    
    ```
    git remote add origin https://github.com/<your-username>/<repository-name>.git

    git push -u origin main
    ```

!!! tip "Step 4: Deploy your app to Vercel"
    To deploy your app to Vercel, run the following command inside the ***site*** directory:

    ```
    vercel deploy
    ```


!!! danger "Vercel CLI Prompts" 
    After starting the deployment process, you'll be aken through a series of command prompts.
    
    > In which directory is your code located? Leave as is, i.e. your root folder ==./==
    
    > Want to modify these settings? Select ***N*** 


Once you have configured your deployment settings, Vercel will start deploying your app. This may take a few minutes. Once the deployment process is complete, you will be given a URL where you can view your app.

Congratulations! You have successfully deployed your MkDocs static web app to Vercel.

## Other

Since we can't cover all possible platforms, we rely on community contributed
guides that explain how to deploy websites built with Material for MkDocs to
other providers:

<div class="mdx-columns" markdown>

- [:simple-azuredevops: Azure][Azure]
- [:simple-cloudflarepages: Cloudflare Pages][Cloudflare Pages]
- [:simple-digitalocean: DigitalOcean][DigitalOcean]
- [:simple-netlify: Netlify][Netlify]
- [:simple-vercel: Vercel][Vercel]

</div>

  [GitLab Pages]: https://gitlab.com/pages
  [GitLab CI]: https://docs.gitlab.com/ee/ci/
  [masked custom variables]: https://docs.gitlab.com/ee/ci/variables/#create-a-custom-variable-in-the-ui
  [Azure]: https://bawmedical.co.uk/t/publishing-a-material-for-mkdocs-site-to-azure-with-automatic-branch-pr-preview-deployments/763
  [Cloudflare Pages]: https://www.starfallprojects.co.uk/projects/deploy-host-docs/deploy-mkdocs-material-cloudflare/
  [DigitalOcean]: https://www.starfallprojects.co.uk/projects/deploy-host-docs/deploy-mkdocs-material-digitalocean-app-platform/
  [Netlify]: https://www.starfallprojects.co.uk/projects/deploy-host-docs/deploy-mkdocs-material-netlify/
  [Vercel]: https://www.starfallprojects.co.uk/projects/deploy-host-docs/deploy-mkdocs-material-vercel/

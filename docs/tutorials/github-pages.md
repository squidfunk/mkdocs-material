You can publish your documentation to GitHub Pages in various ways.  
Some of those are listed below.

## Using GitHub Actions
This is the recommended way to do it.  
You can setup and use GitHub Actions in your repository to auto-publish your docs once you commit to a specific branch, merge pull requests, or whatever action you want to perform.

To begin will you need to create a new yaml file in the `.github/workflows` directory. If no such directory exists, you will need to create one.  
Alternatively can you also head over to the *Actions* tab of your repository (when enabled) and create a new workflow from there.

Next you will need to fill the newly created file with the following content:  
```yaml
name: Deploy MkDocs files

on:
  push:
    paths: 
    - 'docs/**'
    - 'mkdocs.yml'
    branches:
    - master

jobs:
  build:
    runs-on: [ubuntu-latest]
    steps:
    - uses: actions/checkout@v2
    - name: Set up Python 3.7
      uses: actions/setup-python@v1
      with:
        python-version: 3.7
    - name: Install dependencies
      run: |
        python -m pip install --upgrade pip setuptools
        python -m pip install -r requirements.txt
    - name: Deploy Files
      run: |
        git config user.name "github-actions[bot]" # We can use the Username and E-Mail of GitHub Actions for Git.
        git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
        git remote add repo "https://github.com/username/repo.git"
        git fetch repo && git fetch repo gh-pages:gh-pages
        python -m mkdocs gh-deploy --clean --remote-name repo
        git push repo gh-pages
```

!!! info "Notes"
    - **Your repository needs a `requirements.txt` file containing the dependencies for building the docs.**  
    You can just provide `mkdocs-material>=5.0.0` and all other dependencies (MkDocs, PyMdown, ...) will be downloaded too.
    - You need to make a first push towards the gh-pages branch before using the action.  
    You can just run a `gh-deploy` with MkDocs on your local repository.
    - Replace `username` and `repo` with the respective username and name of the repository the GitHub Pages is used in.
    - `push` can be switched out with any other valid action supported by GitHub Actions.
    - It's recommended to use the `paths` setting (only available for push) with `docs/**` and `mkdocs.yml` set.  
    This will make the Action only run when you push changes to files inside the `docs/` direcotory or towards the mkdocs.yml file.

The above action would now install Python, upgrade setuptools, download all listed dependencies in the requirements.txt and push the changes towards the gh-pages branch using git and the `mkdocs gh-deploy` command.

## Using `mkdocs gh-deploy`
If you want to directly push changes from your Desktop PC towards GitHub Pages can you use the `gh-deploy` command from MkDocs.  
This command needs to be executed in the same location where the mkdocs.yml is found and a GitHub repository has to be linked using the `repo_url` option in the mkdocs.yml file.

!!! info "Switching branches"
    By default does MkDocs push the site to the gh-pages branch of your repository.  
    To change this can you define a different branch that the built site should be pushed against, by adding a `remote_branch` option to your mkdocs.yml and give it any name you like.

## Pushing manually
If you want to push the built site yourself for reasons like having the GitHub Pages setup differently (not on gh-pages branch) you can do this using the `mkdocs build` command.  
This command needs to be executed in the same location where the mkdocs.yml can be found.

Running this command will build the site in the `site` directory.  
If you want a different folder to be used, set the `site_dir` setting in the mkdocs.yml.

After the site is built, you can push these pages to your GitHub repository.

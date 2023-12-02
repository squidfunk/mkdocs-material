# Making a Pull Request

You can contribute to Material for MkDocs by making a [pull request] that 
will be reviewed by developers and integrated into the main repository when 
the changes made are approved. You can contribute bug fixes, changes to the
documentation, or new functionality you have developed.

[pull request]: https://docs.github.com/en/pull-requests

!!! note "Considering a pull request"

    Before deciding to spend effort on making changes and creating a pull 
    request, please discuss what you intend to do. If you are responding to
    what you think might be a bug, please issue a [bug report] first. If you 
    indend to work on documentation, create a [documentation issue]. If you 
    want to work on a new feature, please create a [change request]. Keep in 
    mind the guidance given and let people advise you. It might be that 
    there are easier solutions to the problem you perceive and want to address.

[bug report]: reporting-a-bug.md
[documentation issue]: reporting-a-docs-issue.md
[change request]: requesting-a-change.md

## Learning about pull requests

Before you consider making a pull request, you should familiarize yourself
with the documentation on GitHub. The following articles there are of particular
importance:

1. [Creating a pull request]
2. [Creating a pull request from a fork]

[Creating a pull request from a fork]: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork

[Creating a pull request]: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request

In the following, we describe the process for making pull requests.

## Cloning the repository

To make changes to Material for MkDocs, you would first fork one of its 
repositories on GitHub. This is so that you have a repository on GitHub that 
you can push changes to. 

Fork the [repository for the public version] if you want to make changes to 
code that is in the public version or if you want to make changes to the 
documentation. 

[repository for the public version]: https://github.com/squidfunk/mkdocs-material

To make changes to functionality available only within the Insiders version, 
fork [the Insiders repository]. Note that the fork will be a private repository.
Please respect the [terms of the Insiders program] and the spirit of the 
Sponsorware approach used to maintain and develop Material for MkDocs.

[the Insiders repository]: https://github.com/squidfunk/mkdocs-material-insiders/
[terms of the Insiders program]: http://localhost:8000/mkdocs-material/insiders/faq/sponsoring/#licensing

## Set up a development environment

From this point onwards, please follow the [instructions for seting up the 
development environment]. 

[instructions for setting up the development environment]: ../customization.md#environment-setup

## Making changes

When you make changes to the code or the documentation please follow the
established style used in the project. Doing so increases readability and
also helps with making diffs easier to read for those who will review the pull
request. Avoid making any large-scale style changes such as asking your IDE
to re-format all code. 

Study the code that you are modifying well to ensure that you fully understand 
how it works before you try to change it. This will not only help you solve the
problem you aretrying to addressd but also minimize the risks of creating 
unintended side effects.

!!! tip "Linters"

    We are not using linters as part of the build process. However, this does
    not mean that you cannot use a linter in your development environment. 
    In fact, doing so is probably a good way to get close to the code style
    used in Material for MkDocs. 

## Committing to a branch

Development for pull requests is best done in a named branch separate from the
`main/master` branch. Create a new local branch with `git switch -c <name>` and
commit your changes to this branch.

When you want to push commits to your fork, you can do so with 
`git push -u origin <name>`.

## Testing and reviewing changes

Before you commit any changes, you should make sure that they work as expected
and do not create any unintended side effects. You should test them on at least
these three [smoke tests]:

- The documentation of Material for MkDocs itself. If you set up and run the 
development environment as outlines in the [instructions for setting up the 
development environment], `mkdocs serve` should be running and continuously
building the documentation. Check that there are no error messages and, ideally,
no (new) warnings.

- Test on a project that represents the problem or a test for a newly developed
feature. You may already have this if you have filed a bug report and created
a [minimal reproduction].

[minimal reproduction]: https://squidfunk.github.io/mkdocs-material/guides/creating-a-reproduction/

- Ideally, also test the examples in the [examples repository]. If you are 
working on the Insiders edition of Material for MkDocs, you can simply start a 
build at the top level and the [projects plugin] will build all of the examples
for you. If you are on the public version, you will need to build each 
sub-project individually. We appreciate that this is a growing collection of
examples and you may want to prioritize those that are most relevant to the
functionality you change.

[examples repository]: https://github.com/mkdocs-material/examples
[projects plugin]: https://squidfunk.github.io/mkdocs-material/plugins/projects/

## Creating the pull request

Initially, create the pull request **as a draft**.


## Deleting branches

Once the pull request has been merged into the master branch of the Material
for MkDocs repository, you should remove the branch both from the fork on 
GitHub and from the local clone on your computer. This avoids possible 
confusion about the state of development. 

First, switch back to the `master` branch with `git switch master` and then
delete the branch used for the PR using `git branch -d <name>`.

## Subsequent Pull Requests

It is important that subsequent pull requests are started from an up-to-date
history of the `master` branch. One way to achieve this is to delete the fork
and start with an entirely new one next time round. 

If you contribute to Material for MkDocs more often or just happen to be 
doing two or more pull requests in succession, you can also just make sure
to sync your fork (using the GitHub UI) and pull from it into your local 
repository. 

Anyother way of approaching it is to define the original Material for MkDocs 
repository as a remote repository and pull from it directly, then pushing 
any new commits into your fork. For example, using the public repository 
as an example:

```bash
$ git --set-upstream-to... 
```

# Bug reports

Material for MkDocs is an actively maintained project that we constantly strive
to improve. With a project of this size and complexity, bugs may occur. If you
think you have discovered a bug, you can help us by submitting an issue in our
public [issue tracker], following this guide.

  [issue tracker]: https://github.com/squidfunk/mkdocs-material/issues

## Before creating an issue

With more than 20,000 users, issues are created every other day. The maintainers
of this project are trying very hard to keep the number of open issues down by
fixing bugs as fast as possible. By following this guide, you will know exactly
what information we need to help you quickly.

__But first, please do the following things before creating an issue.__

### Upgrade to latest version

Chances are that the bug you discovered was already fixed in a subsequent
version. Thus, before reporting an issue, ensure that you're running the
[latest version] of Material for MkDocs. Please consult our [upgrade guide] to
learn how to upgrade to the latest version.

!!! warning "Bug fixes are not backported"

    Please understand that only bugs that occur in the latest version of
    Material for MkDocs will be addressed. Also, to reduce duplicate efforts,
    fixes cannot be backported to earlier versions.

### Remove customizations

If you're using [customizations] like [additional CSS], [JavaScript], or
[theme extension], please remove them from `mkdocs.yml` before reporting a bug.
We can't offer official support for bugs that might hide in your overrides, so
make sure to omit the following settings from `mkdocs.yml`:

  - [`theme.custom_dir`][theme.custom_dir]
  - [`hooks`][hooks]
  - [`extra_css`][extra_css]
  - [`extra_javascript`][extra_javascript]

If, after removing those settings, the bug is gone, the bug is likely caused by
your customizations. A good idea is to add them back gradually to narrow down
the root cause of the problem. If you did a major version upgrade, make sure you
adjusted all partials you have overridden.

!!! warning "Customizations mentioned in our documentation"

    A handful of the features Material for MkDocs offers can only be implemented
    with customizations. If you find a bug in any of the customizations [that
    our documentation explicitly mentions], you are, of course, encouraged to
    report it.

__Don't be shy to ask on our [discussion board] for help if you run into
problems.__

  [latest version]: ../changelog/index.md
  [upgrade guide]: ../upgrade.md
  [Customizations]: ../customization.md
  [additional CSS]: ../customization.md#additional-css
  [JavaScript]: ../customization.md#additional-javascript
  [theme extension]: ../customization.md#extending-the-theme
  [theme.custom_dir]: https://www.mkdocs.org/user-guide/configuration/#custom_dir
  [hooks]: https://www.mkdocs.org/user-guide/configuration/#hooks
  [extra_css]: https://www.mkdocs.org/user-guide/configuration/#extra_css
  [extra_javascript]: https://www.mkdocs.org/user-guide/configuration/#extra_javascript
  [discussion board]: https://github.com/squidfunk/mkdocs-material/discussions
  [StackOverflow]: https://stackoverflow.com
  [that our documentation explicitly mentions]: ?q="extends+base"

### Search for solutions

At this stage, we know that the problem persists in the latest version and is
not caused by any of your customizations. However, the problem might result from
a small typo or a syntactical error in a configuration file, e.g., `mkdocs.yml`.

Now, before you go through the trouble of creating a bug report that is answered
and closed right away with a link to the relevant documentation section or
another already reported or closed issue or discussion, you can save time for
us and yourself by doing some research:

1.  [Search our documentation] and look for the relevant sections that could
    be related to your problem. If found, make sure that you configured
    everything correctly.[^1]

  [^1]:
    When adding lines to `mkdocs.yml`, make sure you are preserving the
    indentation as mentioned in the documentation since YAML is a
    whitespace-sensitive language. Many reported issues turn out to be
    configuration errors.

1.  [Search our issue tracker][issue tracker], as another user might already
    have reported the same problem, and there might even be a known workaround
    or fix for it. Thus, no need to create a new issue.

2.  [Search our discussion board][discussion board] to learn if other users
    are struggling with similar problems and work together with our great
    community towards a solution. Many problems are solved here.

__Keep track of all <u>search terms</u> and <u>relevant links</u>, you'll need
them in the bug report.__[^2]

  [^2]:
    We might be using terminology in our documentation different from yours,
    but we mean the same. When you include the search terms and related links
    in your bug report, you help us to adjust and improve the documentation.

---

At this point, when you still haven't found a solution to your problem, we
encourage you to create an issue because it's now very likely that you
stumbled over something we don't know yet. Read the following section to learn
how to create a complete and helpful bug report.

  [Search our documentation]: ?q=

## Issue template

We have created a new issue template to make the bug reporting process as simple
as possible and more efficient for our community and us. It is the result of
our experience answering and fixing more than 1,600 issues (and counting) and
consists of the following parts:

- [Title]
- [Context] <small>optional</small>
- [Bug description]
- [Related links]
- [Reproduction]
- [Steps to reproduce]
- [Browser] <small>optional</small>
- [Checklist]

  [Title]: #title
  [Context]: #context
  [Bug description]: #bug-description
  [Related links]: #related-links
  [Reproduction]: #reproduction
  [Steps to reproduce]: #steps-to-reproduce
  [Browser]: #browser
  [Checklist]: #checklist

### Title

A good title is short and descriptive. It should be a one-sentence executive
summary of the issue, so the impact and severity of the bug you want to report
can be inferred from the title.

| <!-- --> | Example  |
| -------- | -------- |
| :material-check:{ style="color: #4DB6AC" } __Clear__ | Built-in `typeset` plugin changes precedence of nav title over `h1`
| :material-close:{ style="color: #EF5350" } __Wordy__ | The built-in `typeset` plugin changes the precedence of the nav title over the document headline
| :material-close:{ style="color: #EF5350" } __Unclear__ | Title does not work
| :material-close:{ style="color: #EF5350" } __Useless__ | Help

### Context <small>optional</small> { #context }

Before describing the bug, you can provide additional context for us to
understand what you were trying to achieve. Explain the circumstances
in which you're using Material for MkDocs, and what you _think_ might be
relevant. Don't write about the bug here.

> __Why this might be helpful__: some errors only manifest in specific settings,
> environments or edge cases, for example, when your documentation contains
> thousands of documents.

### Bug description

Now, to the bug you want to report. Provide a clear, focused, specific, and
concise summary of the bug you encountered. Explain why you think this is a bug
that should be reported to Material for MkDocs, and not to one of its
dependencies.[^3] Adhere to the following principles:

  [^3]:
    Sometimes, users report bugs on our [issue tracker] that are caused by one
    of our upstream dependencies, including [MkDocs], [Python Markdown],
    [Python Markdown Extensions] or third-party plugins. A good rule of thumb is
    to change the [`theme.name`][theme.name] to `mkdocs` or `readthedocs` and
    check if the problem persists. If it does, the problem is likely not
    related to Material for MkDocs and should be reported upstream. When in
    doubt, use our [discussion board] to ask for help.

-   __Explain the <u>what</u>, not the <u>how</u>__ – don't explain
    [how to reproduce the bug][Steps to reproduce] here, we're getting there.
    Focus on articulating the problem and its impact as clearly as possible.

-   __Keep it short and concise__ – if the bug can be precisely explained in one
    or two sentences, perfect. Don't inflate it – maintainers and future users
    will be grateful for having to read less.

-   __One bug at a time__ – if you encounter several unrelated bugs, please
    create separate issues for them. Don't report them in the same issue, as
    this makes attribution difficult.

---

:material-run-fast: __Stretch goal__ – if you found a workaround or a way to fix
the bug, you can help other users temporarily mitigate the problem before
we maintainers can fix the bug in our code base.

> __Why we need this__: in order for us to understand the problem, we
> need a clear description of it and quantify its impact, which is essential
> for triage and prioritization.

  [MkDocs]: https://www.mkdocs.org
  [Python Markdown]: https://python-markdown.github.io/extensions/
  [Python Markdown Extensions]: https://facelessuser.github.io/pymdown-extensions/
  [theme.name]: https://www.mkdocs.org/user-guide/configuration/#theme

### Related links

Of course, prior to reporting a bug, you have read our documentation and
[could not find a working solution][search for solutions]. Please share links
to all sections of our documentation that might be relevant to the bug, as it
helps us gradually improve it.

Additionally, since you have searched our [issue tracker] and [discussion board]
before reporting an issue, and have possibly found several issues or
discussions, include those as well. Every link to an issue or discussion creates
a backlink, guiding us maintainers and other users in the future.

---

:material-run-fast: __Stretch goal__ – if you also include the search terms you
used when [searching for a solution][search for solutions] to your problem, you
make it easier for us maintainers to improve the documentation.

> __Why we need this__: related links help us better understand what you were
> trying to achieve and whether sections of our documentation need to be
> adjusted, extended, or overhauled.

  [search for solutions]: #search-for-solutions

### Reproduction

A minimal reproduction is at the heart of every well-written bug report, as
it allows us maintainers to instantly recreate the necessary conditions to
inspect the bug to quickly find its root cause. It's a proven fact that issues
with concise and small reproductions can be fixed much faster.

[:material-bug: Create reproduction][Create reproduction]{ .md-button .md-button--primary }

---

After you have created the reproduction, you should have a `.zip` file, ideally
not larger than 1 MB. Just drag and drop the `.zip` file into this field, which
will automatically upload it to GitHub.

> __Why we need this__: if an issue contains no minimal reproduction or just
> a link to a repository with thousands of files, the maintainers would need to
> invest a lot of time into trying to recreate the right conditions to even
> inspect the bug, let alone fix it.

!!! warning "Don't share links to repositories"

    While we know that it is a good practice among developers to include a link
    to a repository with the bug report, we currently don't support those in our
    process. The reason is that the reproduction, which is automatically
    produced by the [built-in info plugin] contains all of the necessary
    environment information that is often forgotten to be included.

    Additionally, there are many non-technical users of Material for MkDocs that
    have trouble creating repositories.

  [Create reproduction]: ../guides/creating-a-reproduction.md
  [built-in info plugin]: ../plugins/info.md

### Steps to reproduce

At this point, you provided us with enough information to understand the bug
and provided us with a reproduction that we could run and inspect. However, when
we run your reproduction, it might not be immediately apparent how we can see
the bug in action.

Thus, please list the specific steps we should follow when running your
reproduction to observe the bug. Keep the steps short and concise, and make sure
not to leave anything out. Use simple language as you would explain it to a
five-year-old, and focus on continuity.

> __Why we need this__: we must know how to navigate your reproduction in order
> to observe the bug, as some bugs only occur at certain viewports or in
> specific conditions.

### Browser <small>optional</small> { #browser }

If you're reporting a bug that only occurs in one or more _specific_ browsers,
we need to know which browsers are affected. This field is optional, as it is
only relevant when the bug you are reporting does not involve a crash when
[previewing] or [building] your site.

---

:material-incognito: __Incognito mode__ – Please verify that a the bug is
not caused by a browser extension. Switch to incognito mode and try to reproduce
the bug. If it's gone, it's caused by an extension.

> __Why we need this__: some bugs only occur in specific browsers or versions.
> Since now, almost all browsers are evergreen, we usually don't need to know the
> version in which it occurs, but we might ask for it later. When in doubt, add
> the browser version as the first step in the field above.

  [previewing]: http://localhost:8000/mkdocs-material/creating-your-site/#previewing-as-you-write
  [building]: http://localhost:8000/mkdocs-material/creating-your-site/#building-your-site

### Checklist

Thanks for following the guide and creating a high-quality and complete bug
report – you are almost done. The checklist ensures that you have read this guide
and have worked to your best knowledge to provide us with everything we need to
know to help you.

__We'll take it from here.__

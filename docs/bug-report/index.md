# Bug reporting

Material for MkDocs is an actively maintained project that we constantly strive
to improve. With a project of this size and complexity, :material-bug: bugs may
occur. If you think you have discovered a bug, you can help us by reporting an
issue in our public [issue tracker].

  [issue tracker]: https://github.com/squidfunk/mkdocs-material/issues

## Before creating an issue

With more than 20.000 users, issues are raised almost every day. The maintainers
of this project are trying very hard to keep the number of open issues down by
fixing bugs as fast as possible. High quality and complete bug reports enable us
to help you much faster.

__Please make sure to try the following things before creating an issue__.

### Upgrade to latest version

Chances are, that the bug you discovered was already fixed in a subsequent
version. Thus, before reporting an issue, please ensure that you're running the
[latest version] of Material for MkDocs. Please consult our [upgrade guide] to
learn how to upgrade to the latest version.

!!! warning "Bug fixes are not backported"

    Please understand that only issues that occur in the latest version of
    Material for MkDocs will be addressed. Also, in order to reduce duplicate
    efforts, fixes are not backported to earlier versions.

### Remove customizations

If you're using [customizations] like [additional CSS] and [JavaScript], or
[theme extension], please remove them from `mkdocs.yml` before reporting a bug.
__We can't offer official support for bugs that might hide in your overrides__,
so please remove the following settings from `mkdocs.yml`:

  - [`theme.custom_dir`][theme.custom_dir]
  - [`theme.hooks`][theme.hooks]
  - [`extra_css`][extra_css]
  - [`extra_javascript`][extra_javascript]

If after removing those settings, the bug is gone, the bug is likely caused by
your customizations. A good idea is to add them back gradually to narrow down
the root cause. Don't be shy to ask on our [discussion board] or
[:simple-stackoverflow: StackOverflow][StackOverflow] for help if you're running
into problems.

!!! warning "Customizations mentioned in our documentation"

    A handful of the features Material for MkDocs offers can only be implemented
    with customizations. If you find a bug in any of the customizations [that
    our documentation explicitly mentions], you are of course encouraged to
    report it.

  [latest version]: ../changelog/index.md
  [upgrade guide]: ../upgrade.md
  [Customizations]: ../customization.md
  [additional CSS]: ../customization.md#additional-css
  [JavaScript]: ../customization.md#additional-javascript
  [theme extension]: ../customization.md#extending-the-theme
  [theme.custom_dir]: https://www.mkdocs.org/user-guide/configuration/#custom_dir
  [theme.hooks]: https://www.mkdocs.org/user-guide/configuration/#hooks
  [extra_css]: https://www.mkdocs.org/user-guide/configuration/#extra_css
  [extra_javascript]: https://www.mkdocs.org/user-guide/configuration/#extra_javascript
  [discussion board]: https://github.com/squidfunk/mkdocs-material/issues
  [StackOverflow]: https://stackoverflow.com
  [that our documentation explicitly mentions]: ?q="extends+base"

### Search for solutions

TBD

- Documentation
- Open issues

## Issue template

We have created a new issue template to make the bug reporting process as simple
as possible and more efficient for the community and for us. It is the result of
our experience answering and fixing more than 1,600 issues (and counting), and
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
| :material-check:{ style="color: #4DB6AC" } __Good__ | Built-in `typeset` plugin changes precedence of nav title over `h1`
| :material-close:{ style="color: #EF5350" } __Wordy__ | The built-in `typeset` plugin changes the precedence of the nav title over the document headline
| :material-close:{ style="color: #EF5350" } __Unclear__ | Title does not work
| :material-close:{ style="color: #EF5350" } __Generic__ | Please help

### Context <small>optional</small> { #context }

Before describing the bug, you can provide additional context that can be
helpful to understand what you were trying to achieve. Explain the circumstances
in which you're using Material for MkDocs. Don't write about the bug itself or
anything related.

> __Why this might be helpful__: some errors only manifest in specific settings,
> environments or edge cases, for example when your documentation contains
> thousands of documents.

### Bug description

Now, to the bug you want to report. Provide a clear, focused, specific and
concise summary of the bug you encountered. Explain why you think this is a bug
that should be reported to Material for MkDocs, and not to one of its
[dependencies]. Guideline for descriptions:

-   __Explain the <u>what</u>, not the <u>how</u>__ – don't explain
    [how to reproduce the bug][Steps to reproduce] here, we're getting there.
    Focus on articulating the problem and its impact as clearly as possible.

-   __Keep it short and concise__ – if the bug can be precisely explained in one
    or two sentences, perfect. Don't inflate it – the maintainers and users
    reading your words will be grateful.

-   __One :material-bug: bug at a time__ – if you encountered several unreleated
    bugs, please open an issue for each of them. Don't report them all in the
    same issue, as this makes communication difficult.

---

__Stretch :material-run-fast: goal__ – if you found a workaround or a way to fix
the bug, you can help other users to temporarily mitigate the problem before
Material for MkDocs fixes the bug in its code base.

> __Why we need this__: in order for us to understand the issue at hand, we
> need a clear description of the problem and its impact, which is essential
> for triage and prioritization.

  [dependencies]: #dependencies

### Related links

Of course, prior to reporting a bug, you have read our documentation and could
not find a working solution. Please share links to all sections of our
documentation that might be relevant to the bug, as it helps us gradually
improve it.

Additionally, since you have searched our [issue tracker] and [discussion board]
before reporting an issue, and have possibly found several issues or
discussions, include those as well. Every link to an issue or discussion creates
a backlink, guiding us maintainers and future users.

> __Why we need this__: related links help us better understand what you were
> trying to achieve and whether sections of our documentation need to be
> adjusted, extended or overhauled.

### Reproduction

TBD

### Steps to reproduce

TBD

### Browser <small>optional</small> { #browser }

TBD

### Checklist

TBD

## General

### Dependencies

TBD

## Incomplete issues

TBD

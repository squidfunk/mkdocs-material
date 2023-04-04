# Adding a translation

We can't believe it ourselves but with the help of community contribution, 
Material for MkDocs already supports 50+ languages. As you can imagine, it's
impossible for us maintainers to keep all languages up-to-date (we just don't 
speak 50+ languages). That's why we need the help of our international community 
to help us add new or update translations, as new feature releases sometimes 
require new translations.

If you would like to help us to make Material for MkDocs more globally 
accessible and have noticed a missing translation in your language or want to 
add a new one. In that case, we have simplified the contributing process for you. 
Just follow the few steps of the guide below.

## Before adding a translation

Given the constant expansion of our project and the frequent translation updates, 
it is essential to check the following things before submitting a translation 
contribution.

### List of supported languages

Chances are your language is already supported by Material for MkDocs. To check
if your language is supported or needs improvements and updates, we would advise 
you to check the [list of supported languages].

[:material-earth-plus:&nbsp; Search for your language][Search for your language]{ .md-button .md-button--primary }

  [list of supported languages]: https://squidfunk.github.io/mkdocs-material/setup/changing-the-language/#site-language
  [Search for your language]: https://squidfunk.github.io/mkdocs-material/setup/changing-the-language/#site-language

In case your language is already supported, you can add **missing translations**, 
displayed below each language. If your language is not on the list of supported 
languages, you can contribute translations by opening a new issue and 
[adding a translation] by following the guide below.

> __Please note,__ that we use region designators in conjunction with regions, 
> and cluster all languages using language designators with regions. Language 
> region designators consist of codes that represent countries and follow the 
> [ISO 3166-1 standard], which employs two-letter capitalized codes. If you need 
> to specify a particular dialect, please utilize this system by hyphenating a 
> language designator with a region designator. For instance, to specify the 
> British English, use the "en" language designator and indicate the locale as 
> "en-GB."

  [Adding a translation]: https://github.com/squidfunk/mkdocs-material/issues/new?assignees=&labels=change+request&template=04-add-a-translation.yml&title=Add+translations+for+...
  [ISO 3166-1 standard]: https://lingohub.com/developers/supported-locales/language-designators-with-regions

### Issue tracker

Our issue tracker might already contain an open issue with a contribution with 
missing translations for your language that still needs to be integrated by us 
maintainers. To avoid investing your time in duplicated work, please search the 
[issue tracker] beforehand.

[:octicons-issue-opened-24:&nbsp; Search our issue tracker][Search our issue tracker]{ .md-button .md-button--primary }
  
  [issue tracker]: https://github.com/squidfunk/mkdocs-material/issues
  [search our issue tracker]: https://github.com/squidfunk/mkdocs-material/issues

### Update supported languages

Have you noticed that other users haven't yet updated your language? You are 
welcome to contribute and add any missing translations by clicking the link 
provided underneath each language in the [list of supported languages]. This 
link will direct you to a new issue template that is pre-filled with all the 
necessary information. Any fields that can be adjusted will be highlighted for 
your convenience.

[:material-translate-variant:&nbsp; Add missing translations][Update your translations]{ .md-button .md-button--primary }

 [List of supported languages]: https://squidfunk.github.io/mkdocs-material/setup/changing-the-language/#site-language
 [Update your translations]: https://squidfunk.github.io/mkdocs-material/setup/changing-the-language/#site-language

---

At this point, when you have made sure that Material for MkDocs doesn't already 
support your language you can add translations for it by following the issue 
template.

## Issue template

We have created a new issue template to make contributing translations for new 
languages as simple as possible. It is the result of our experience with 50+
language contributions and updates over the last couple of years. We recently 
simplified the language contribution process, and the new template consists of the 
following parts:

- [Title]
- [Translations]
- [Country flag] <small>optional</small>
- [Checklist]

  [Title]: #title
  [Translations]: #translations
  [Country flag]: #country-flag
  [Checklist]: #checklist

### Title

Translation issue titles are simple. When adding a new language, the first part 
of the title with "Add translations for..." is already pre-filled in the 
template, and you need to replace the three dots with your language name. If 
adding missing translations for a language from the [list of supported languages], 
the title is already set with no need for adjustment. 

| <!-- --> | Example  |
| -------- | -------- | 
| :material-check:{ style="color: #4DB6AC" } __Clear__ | Add translations for German
| :material-close:{ style="color: #EF5350" } __Unclear__ | Add translations ...
| :material-close:{ style="color: #EF5350" } __Generic__ | German

 [List of supported languages]: https://squidfunk.github.io/mkdocs-material/setup/changing-the-language/#site-language

### Translations

With the preliminary work done, you can now add all missing translations for 
your language. Each label on the right side containing the `⬅️ icon` is missing 
a translation. To ensure the accuracy of your translation, consider double-checking 
the context of the words by looking at the [English version].

After adding the translation, remove the `⬅️ icon` from each translated line. If 
you don't know how to translate specific fields, simply leave them for other 
contributors to complete.

[English version]: https://github.com/squidfunk/mkdocs-material/tree/master/src/partials/languages/en.html

#### Translation context

TO DO MARTIN - explain the translation context
.
.


### Country flag

Congratulations on contributing translations for a new language! To make it 
easier for you and others to find the language in our list of supported 
languages, please select the best-fitting flag for your language from our 
documentation's [Icons, Emojis site] by entering the command `flag` in the 
search field.

!!! warning "Icon limitation by Twemoji"

    Please note that only icons provided by Twemoji can be used. If your flag is 
    not available on the list on the [Icons, Emojis site], please choose an 
    alternative.

> __Why this might be helpful__: adding a country flag next to the country name 
> can be helpful for you and for others to find the language in the list of 
> supported languages faster and easier. If your country's flag is not supported 
> by Temoji, it is best that you provide us with an alternative instead of us 
> choosing one for you.

 [Icons, Emojis site]: https://squidfunk.github.io/mkdocs-material/reference/icons-emojis/#search

### Checklist

Thanks for following the guide and creating a high-quality and complete 
translation issue – you are almost done. The checklist ensures that you have read 
this guide and have worked to your best knowledge to provide us with everything 
we need to know to integrate your contribution to Material for MkDocs.

__We'll take it from here.__

---

## Authors credits

Authors who submit a translation using the template above will be 
__credited as co-authors__ in commits for Material for MkDocs. To list your 
account as a co-author without knowing or revealing your email address, we will 
use your GitHub-provided no-reply email, following 
[GitHub's recommended workaround] to protect your privacy. This way, your 
commit will count as a contribution without opening a pull request.

 [GitHub's recommended workaround]: https://docs.github.com/en/pull-requests/committing-changes-to-your-project/creating-and-editing-commits/creating-a-commit-with-multiple-authors

## Contributing via pull request

If you want to contribute missing translations by creating a pull request to be 
listed as the sole author of the commit, you can open a PR after submitting the 
translation issue. Ensure you thoroughly read the pull request guide below to 
prevent breaking functionality in the translation file.

1.  Fill out a [translation issue] according to the guide and submit it in the 
    [issue tracker].

2.  Tick the box for the last point in the "Before submitting..." section.
    - [x]  __Optional__: I want to integrate this translation myself and create a 
            pull request following the [contribution guide](https://github.com/squidfunk/mkdocs-material/blob/master/CONTRIBUTING.md).

3.  Fork the Material for MkDocs repository, set up a [development environment] 
and create a separate git branch on which you make all your changes.

4.  Please review all [existing language files] in the repository and search for 
your language. If a file for your language already exists, please use it for 
your edits or create a new file if your language is not listed by copying one of 
the existing files.
    
5.  Add the missing translations for your language to the best of your knowledge
    and save the changes.

    !!! warning "Important"
        Only add the translations that are different from the defaults. For 
        example, if your language is left-to-right, don't add the `direction` 
        translation, as English is also left-to-right. The following 
        translations are for technical purposes, and __should not be updated__. 
        If they're missing from your language, it's for a good reason:

        - `search.config.lang`
        - `search.config.pipeline`
        - `search.config.separator`

6.  Open the [English translations] file and compare your translations with the 
    up-to-date English translations file. 

7.  Before submitting a pull request, build the theme. This is a mandatory 
requirement for your PR to get accepted, as the theme should be installable 
through GitHub at all times.

8.  After building the theme, commit the compiled output, push your branch to 
GitHub and send a PR to mkdocs-material:master. If we suggest changes, make the 
required updates, rebase your branch, and push the changes to your GitHub 
repository, which will automatically update your PR.

9. After your PR is merged, you can safely delete your branch and pull the 
changes from the main (upstream) repository.

  [translation issue]: https://github.com/squidfunk/mkdocs-material/issues/new?assignees=&labels=change+request&template=04-add-a-translation.yml&title=Add+translations+for+...
  [issue tracker]: https://github.com/squidfunk/mkdocs-material/issues/new/choose
  [existing language files]: https://github.com/squidfunk/mkdocs-material/tree/master/src/partials/languages
  [English translations]: https://github.com/squidfunk/mkdocs-material/tree/master/src/partials/languages/en.html
  [development environment]: https://squidfunk.github.io/mkdocs-material/customization/#environment-setup

__After your PR was merged by us maintainers, you can start using the new language.__

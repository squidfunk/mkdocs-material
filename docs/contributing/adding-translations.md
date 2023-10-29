# Translations

It's unbelievable – with the help of international community contributions,
Material for MkDocs has been translated into 60+ languages. As you can imagine,
it's impossible for us maintainers to keep all languages up-to-date, and new
features sometimes require new translations.

If you would like to help us to make Material for MkDocs even more globally
accessible and have noticed a missing translation in your language, or would
like to add a new language, you can help us by following the steps of the guide
below.

## Before creating an issue

Translations change frequently, which is why we want to make sure that you don't
invest your time in duplicating work. Before adding translations, please check
the following things:

### Check language availability

With more than 60 languages, the chances are good that your language is already
supported by Material for MkDocs. You can check if your language is available,
or needs improvements or additional translations by inspecting the list of
[supported languages]:

- __Your language is already supported__ – in this case, you can check if there
  are translations missing, and click the link underneath your language to add them, which takes 5 minutes.

- __Your language is missing__ – in that case, you can help us add support
  for your language to Material for MkDocs! Read on, to learn how to do this.

  [supported languages]: ../setup/changing-the-language.md#site-language

### Search our issue tracker

Another user might have already created an issue supplying the missing
translations for your language that still needs to be integrated by us
maintainers. To avoid investing your time in duplicated work, please search the
[issue tracker] beforehand.

  [issue tracker]: https://github.com/squidfunk/mkdocs-material/issues

---

At this point, when you have made sure that Material for MkDocs doesn't already
support your language, you can add new translations for it by following the
issue template.

## Issue template

We have created an issue template that makes contributing translations as simple
as possible. It is the result of our experience with 60+ language contributions
and updates over the last couple of years, and consists of the following parts:

- [Title]
- [Translations]
- [Country flag] <small>optional</small>
- [Checklist]

  [Title]: #title
  [Translations]: #translations
  [Country flag]: #country-flag
  [Checklist]: #checklist

### Title

When you update an already existing language, you can just leave the title as it
is. Adding support for a new language, replace the `...` in the pre-filled title
with the name of your language.

| <!-- --> | Example  |
| -------- | -------- |
| :material-check:{ style="color: #4DB6AC" } __Clear__ | Add translations for German
| :material-close:{ style="color: #EF5350" } __Unclear__ | Add translations ...
| :material-close:{ style="color: #EF5350" } __Useless__ | Help

### Translations

If a translation contains an :arrow_left: icon on the right side, it is missing.
You can translate this line and remove the :arrow_left: icon. If you don't know
how to translate specific lines, simply leave them for other contributors to
complete. To ensure the accuracy of your translation, consider double-checking the
context of the words by looking at our [English translations].

[English translations]: https://github.com/squidfunk/mkdocs-material/tree/master/src/partials/languages/en.html

### Country flag <small>optional</small> { #country-flag }

For a better overview, our list of [supported languages] includes country flags
next to the language names. You can help us select a flag for your language by
adding the shortcode for the country flag to this field. Go to our
[emoji search] and enter `flag` to find all available shortcodes.

!!! question "What if my flag is not available?"

    [Twemoji] provides flag emojis for 260 countries – subdivisions of countries,
    such as states, provinces, or regions, are not supported. If you're adding
    translations for a subdivision, please choose the most appropriate available
    flag.

  [Twemoji]: https://twemoji.twitter.com/
  [emoji search]: ../reference/icons-emojis.md#search

> __Why this might be helpful__: adding a country flag next to the country name
> can be helpful for you and for others to find the language in the list of
> supported languages faster and easier. If your country's flag is not supported
> by [Twemoji], you can help us choose an alternative.

### Checklist

Thanks for following the guide and helping us to add new translations to Material
for MkDocs – you are almost done. The checklist ensures that you have read this
guide and have worked to your best knowledge to provide us with everything we need
to integrate your contribution.

__We'll take it from here.__

---

## Attribution

If you submit a translation using the template above, you will be __credited as
a co-author__ in the commit, so you don't need to open a pull request. You have
done a significant contribution to the project, making Material for MkDocs
accessible to more people around the world. Thank you!

# TL;DR Cheat Sheet

For a 60 second quick start on Markdown
[commonmark has a great tutorial](http://commonmark.org/help/){.new-tab}

### Emphasis

<div markdown="1" class="two-column">

``` md
this is _italic_ and so is *this*  
this is __bold__ and so is **this**
^^underline^^,  ~~strike through~~  
==highlight==  and `inline code`  
==*you* **can** ^^combine^^ `too`==

```

</div>

<div markdown="1" class="two-column">

this is _italic_ and so is *this*  
this is __bold__ and so is **this**  
^^underline^^,  ~~strike through~~  
==highlight==  and `inline code`  
==*you* **can** ^^combine^^ ~~too~~==

</div>

---

### Soft & Hard Line Breaks

<div markdown="1" class="two-column">

``` md
Put 2 spaces at the end of a line  
to force a line break.  
If you simply
hit enter and
don't use 2 spaces
it merges the lines
like this.  
You can also force a break <br> anywhere
using the `<br>` tag like we just did
```

</div>

<div markdown="1" class="two-column">

Put 2 spaces at the end of a line  
to force a line break.  
If you simply
hit enter and
don't use 2 spaces
it merges the lines
like this <br>
You can also force a break <br> anywhere
using the `<br>` tag like we just did


</div>

---

### Lists

<div markdown="1" class="two-column">

``` md
* need a blank line above to start new list
+ valid bullet symbols
+ `*`, `-` or '+'
    - 4 spaces or 1 tab
    - to indent

1. use *numbers* for ordered
    * can nest
2. **numbers** can be in order
    3. can also nest
1. but it will fix them if not

-   list item with two paragraphs.

    anything like this paragraph
    should be indented by 4 spaces
    or a tab

-   you can add blocks too

    > :memo:
    >
    > * list under lists
    > * under lists

```

</div>

<div markdown="1" class="two-column">

* need a blank line above to start new list
+ valid bullet symbols
+ `*`, `-` or '+'
    - 4 spaces or 1 tab
    - to indent

1. use *numbers* for ordered
    * can nest
2. **numbers** can be in order
    3. can also nest
1. but it will fix them if not

-   list item with two paragraphs.

    anything like this paragraph
    should be indented by 4 spaces
    or a tab

-   you can add blocks too

    > :memo:
    >
    > * list under lists
    > * under lists

</div>

---

### Tasks

<div markdown="1" class="two-column">

``` md
- [ ] Task Lists `- [ ]`
    - [x] x instead of space
    - [x] will mark it complete
- [ ] work just like lists
    * can can contain indents
    * or anything else a list can

1. Or can be nested under others lists
    - [ ] like this
    - [ ] and this

2. This can help
    - [ ] like this
    - [ ] and this
```

</div>
<div markdown="1" class="two-column">

- [ ] Task Lists `- [ ]`
    - [x] x instead of space
    - [x] will mark it complete
- [ ] work just like lists
    * can can contain indents
    * or anything else a list can

1. Or can be nested under others lists
    - [ ] like this
    - [ ] and this

2. This can help
    - [ ] like this
    - [ ] and this

</div>

---

### Links

<div markdown="1" class="two-column">

``` md
[simple link](https://www.google.com )  
[with optional title](https://www.google.com "Google's Homepage")  
point to a [relative file or md](./embedding/lucid.md) or
mail link with emoji [📧](mailto:joshdev@9ci.com) or
links with icons [like this _cloud_{.icon}](https://material.io/icons/)
or [use an image ![](images/dingus/image-small.png)](images/dingus/image.png)

[Reference-Style Links][some reference id]
put link at bottom of paragraph or page.
you can use numbers or text for
[reference-style link definitions][1]  
or leave it empty and
just use the [link text itself]  

to [open in new tab](sandbox.md){.new-tab}
use `{target=_blank} or {.new-tab}` attributes
use it on [ref links][new tab]{.new-tab} too

Indenting _reference links_
2 spaces is not required
but a recommended convention

  [some reference id]: https://daringfireball.net/projects/markdown/syntax#link
  [1]: http://reason.com/blog
  [link text itself]: ./images/material.png
  [new tab]: sandbox.md

```

</div>
<div markdown="1" class="two-column">

[simple link](https://www.google.com )  
[with optional title](https://www.google.com "Google's Homepage")  
point to a [relative file or md](./embedding/lucid.md) or
mail link with emoji [📧](mailto:joshdev@9ci.com) or
links with icons [like this _cloud_{.icon}](https://material.io/icons/)
or [use an image ![](images/dingus/image-small.png)](images/dingus/image.png)

[Reference-Style Links][some reference id]
put link at bottom of paragraph or page.
you can use numbers or text for
[reference-style link definitions][1]  
or leave it empty and
just use the [link text itself]  

to [open in new tab](sandbox.md){.new-tab}
us `{target=_blank} or {.new-tab}` attributes
use it on [ref links][new tab]{.new-tab} too

_reference links_ can be at bottom
of paragraph. Indenting 2 spaces is not
required but a recommended convention

  [some reference id]: https://daringfireball.net/projects/markdown/syntax#link
  [1]: http://reason.com/blog
  [link text itself]: ./images/material.png
  [new tab]: sandbox.md

</div>

---

### Images

<div markdown="1" class="two-column">

``` md
inline ![](images/dingus/image-small.png)
with alt text ![foo](images/dingus/image-small.png)  
with ref links ![img-small][]  
can use [sizing attributes](blocks/#sizing-alignment)

Put `zoomify` in the alt text bracket to enable
clicking to zoom. Try clicking on any of 
these images ![zoomify][img-dingus]{.tiny}

![zoomify](images/dingus/image.png){.center .xsmall}

> :camera: **Figure Title**
> ![zoomify](images/dingus/image.png){.center .small}

  [img-small]: ./images/dingus/image-small.png
  [img-dingus]: ./images/dingus/image.png

```

</div>
<div markdown="1" class="two-column">

inline ![](images/dingus/image-small.png)
with alt text ![foo](images/dingus/image-small.png)  
with ref links ![img-small][]  
can use [sizing attributes](blocks/#sizing-alignment)

Put `zoomify` in the alt text bracket to enable
clicking to zoom. Try it on any of these images ![zoomify][img-dingus]{.tiny}

![zoomify](images/dingus/image.png){.center .xsmall}

> :camera: **Figure Title**
> ![zoomify](images/dingus/image.png){.center .small}

  [img-small]: ./images/dingus/image-small.png
  [img-dingus]: ./images/dingus/image.png

</div>

---

### Abbreviations

<div markdown="1" class="two-column">

```markdown
here are some abbr's
HTML and FUBAR

>:bulb: if your editor gets confused by
not having and enclosing * then
just add it to end of abbr def.

---

>:warning: Don't indent these, doesn't seem to work

*[abbr]: Abbreviations
*[def]: Definition
*[HTML]: Hyper Text Markup Language
*[FUBAR]:  You know what it means*

```

</div>
<div markdown="1" class="two-column">

here are some abbr's
HTML and FUBAR

>:bulb: if your editor gets confused by
not having and enclosing * then
just add it to end of abbr def.

---

>:warning: Don't indent these, doesn't seem to work

*[abbr]: Abbreviations
*[def]: Definition
*[HTML]: Hyper Text Markup Language
*[FUBAR]:  You know what it means*

</div>

---

### Footnotes

<div markdown="1" class="two-column">

```markdown
Footnotes[^1] work like reference links
They auto-number like ordered lists[^3]
You can use any
reference id[^text reference]  
like ref links they can be
organized at bottom
of paragraph or page.

  [^1]: footnote, click the return icon here to go back ->
  [^3]: the number will not necessarily be what you use
  [^text reference]: text reference
```

</div>
<div markdown="1" class="two-column">

Footnotes[^1] work like reference links
They auto-number like ordered lists[^3]
You can use any
reference id[^text reference]  
like ref links they can be
organized at bottom
of paragraph or page.

  [^1]: footnote, click the return icon here to go back ->
  [^3]: the number will not necessarily be what you use
  [^text reference]: text reference

</div>

---

### Tables

<div markdown="1" class="two-column">

```markdown
Colons can be used to align columns.
3 dashes min to separate headers.
Outer pipes (|) are optional,
and you don't need to make the
raw Markdown line up prettily.
You can also use inline Markdown.

|  Tables  |      Are      |   Cool    |
| -------- |:-------------:| ---------:|
| col 3 is | right-aligned |     $1600 |
| col 2 is |   centered    |       $12 |
|          |   **Total**   |   **$1612** |

==Table== | **Format** | 👀 _scramble_
--- | --- | ---
*Still* | `renders` | **nicely**
[with links](images/dingus/image-small.png) | images ![zoomify](images/dingus/image-small.png){.tiny} | emojis 🍔
icons _cloud_{.icon} | footnotes[^1] | use `<br>` <br> for multi-line <br> line breaks

```

</div>
<div markdown="1" class="two-column">

Colons can be used to align columns.
3 dashes min to separate headers.
Outer pipes (|) are optional,
 and you don't need to make the
raw Markdown line up prettily.
You can also use inline Markdown.

|  Tables  |      Are      |   Cool    |
| -------- |:-------------:| ---------:|
| col 3 is | right-aligned |     $1600 |
| col 2 is |   centered    |       $12 |
|          |   **Total**   | **$1612** |

==Table== | **Format** | 👀 _fun_
--- | --- | ---
*Still* | `renders` | **nicely**
[with links](images/dingus/image-small.png) | images ![zoomify](images/dingus/image-small.png){.tiny} | emojis 🍔
icons _cloud_{.icon} | footnotes[^1] | use `<br>` <br> for multi-line <br> line breaks

</div>

---

### Blockquotes

<div markdown="1" class="two-column">

```markdown
> Blockquotes are handy to callout text.
they are greedy and will keep
grabbing text. The '>' is optional unless trying join
>
paragraphs, tables etc.

a blank line and a new paragraph
or other markdown thing end them

>:bulb:
use a `---` seperator or `<br>`
if you want multiple sepearte block quotes

---

> can have nested
> > blockquotes inside of block quotes
block quotes can also contain any valid markdown

```

</div>
<div markdown="1" class="two-column">

> Blockquotes are handy to callout text.
they are greedy and will keep
grabbing text. The '>' is optional unless trying join
>
> paragraphs, tables etc.

a blank line and a new paragraph
or other markdown thing end them

> :bulb:
use a `---` seperator or `<br>`
if you want multiple seperate block quotes
to follow

---

> can have nested
> > blockquotes inside of block quotes
block quotes can also contain any valid markdown

</div>

---

### Blocks - admonitions, callouts, sidebars

<div markdown="1" class="two-column">

```markdown
> :memo: **Memo Admonition**
use blockquotes
with emoji indicators for
admonition memos, callout etc..

---

> :boom:
Title title like above is optional

---

> :bulb: See [the section about blocks](blocks.md#cheatsheet)
for the list of emojis that can be used.

```

</div>
<div markdown="1" class="two-column">

> :memo: **Memo Admonition**
use blockquotes
with emoji indicators for
admonition memos, callout etc..

---

> :boom:
Title title like above is optional

---

> :bulb: See [the section about blocks](blocks.md#cheatsheet)
for the list of emojis that can be used.

</div>

---

### Row Divs

through out this doc we have been using a `<div markdown="1" class="two-column">`.

    <div markdown="1" class="two-column">{++markdown="1" tells it to process what inside++}
        {== <-needs to be a blank line for github to parse==}

    ```markdown
    |foo | bar |
    |----|-----|
    |baz | buzz|
    ```

    </div>
    <div markdown="1" class="two-column">

    |foo | bar |
    |----|-----|
    |baz | buzz|

    </div>  {== closes the div ==}

    --- {== this clears the "float" REQUIRED when done==}

<div markdown="1" class="two-column">

```markdown
|foo | bar |
|----|-----|
|baz | buzz|
```

</div>
<div markdown="1" class="two-column">

|foo | bar |
|----|-----|
|baz | buzz|

</div>  

---

    <div markdown="1" class="row">

    > :bug: **here is another example**
    this uses the row class and will make
    any blocks, figures, etc equal spaced

    ---

    > :thumbsup: they will be equal sizes
    with whatever width is left from image
    and as you can see the heights get adjusted to be equal as well

    ---

    ![](images/dingus/image.png){.small}

    </div>

<div markdown="1" class="row">

> :bug: **here is another example**  
well just use admonitions and a table

---

> :thumbsup: they will be equal sizes
with whatever width is left from image
and as you can see the heights get adjusted to be equal as well

---

![](images/dingus/image.png){.small}

</div>

### Headings & Breaks

<div markdown="1" class="row">

> :camera:{.pct50}
>
> ```markdown
> # h1 Heading
> ## h2 Heading
> ### h3 Heading
> #### h4 Heading
>
> Horizontal Rules
>
> ---
>
> ```

---

> :camera:
> # h1 Heading
> ## h2 Heading
> ### h3 Heading
> #### h4 Heading
>
> Horizontal Rules
>
> ---

</div>

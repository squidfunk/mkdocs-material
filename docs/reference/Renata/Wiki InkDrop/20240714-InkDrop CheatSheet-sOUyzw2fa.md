# InkDrop CheatSheet

MarkDown

- [GitHub - mostrub/InkDrop-Docs](https://github.com/mostrub/InkDrop-Docs)

- [Get started - Inkdrop User Manual](https://docs.inkdrop.app/start-guide)

- [Daring Fireball: Markdown](https://daringfireball.net/projects/markdown/)

- [GitHub Flavored Markdown Spec](https://github.github.com/gfm/)

CheatSheet Db

- [QuickRef.ME - Quick Reference Cheat Sheet](https://quickref.me/)
- https://quickref.me/markdown

# h1

## h2

### h3

#### h4

##### h5

###### h6

## Header 2

> This is
> a blockquote
>
> > Nested
> > Blockquote

- Item 1
- Item 2
  - item 3a
  - item 3b

* Item 1
* Item 2

- Item 1
- Item 2

* [ ] Checkbox off
* [x] Checkbox on

1. Item 1
2. Item 2
   a. item 3a
   b. item 3b

You can write notes in [GitHub-flavored Markdown](https://docs.inkdrop.app/manual/markdown-cheatsheet).

# H1

## H2

### H3

#### H4

##### H5

###### H6

## Emphasis

Emphasis, aka italics, with _asterisks_ or _underscores_.

Strong emphasis, aka bold, with **asterisks** or **underscores**.

Combined emphasis with **asterisks and _underscores_**.

Strikethrough uses two tildes. ~~Scratch this.~~

## Lists

1. First ordered list item
2. Another item
   - Unordered sub-list.
3. Actual numbers don't matter, just that it's a number
   1. Ordered sub-list
4. And another item.

   You can have properly indented paragraphs within list items. Notice the blank line above, and the leading spaces (at least one, but we'll use three here to also align the raw Markdown).

   To have a line break without a paragraph, you will need to use two trailing spaces.  
   Note that this line is separate, but within the same paragraph.  
   (This is contrary to the typical GFM line break behaviour, where trailing spaces are not required.)

- Unordered list can use asterisks

* Or minuses

- Or pluses

## Links

[I'm an inline-style link](https://www.google.com)

[I'm an inline-style link with title](https://www.google.com "Google's Homepage")

[I'm a reference-style link][Arbitrary case-insensitive reference text]

[You can use numbers for reference-style link definitions][1]

Or leave it empty and use the [link text itself].

URLs and URLs in angle brackets will automatically get turned into links.
http://www.example.com or <http://www.example.com> and sometimes
example.com (but not on Github, for example).

Some text to show that the reference links can follow later.

[arbitrary case-insensitive reference text]: https://www.mozilla.org
[1]: http://slashdot.org
[link text itself]: http://www.reddit.com

[❞](https://csrc.nist.gov/News/2022/guide-to-operational-technology-ot-security)

## Images

Here's our logo (hover to see the title text):

Inline-style:
![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")

Reference-style:
![alt text][logo]

[logo]: https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 2"

## Code and Syntax Highlighting

Inline `code` has `back-ticks around` it.

```javascript
var s = "JavaScript syntax highlighting";
alert(s);
```

```python
s = "Python syntax highlighting"
print s
```

```
No language indicated, so no syntax highlighting.
```

## Tables

Colons can be used to align columns.

| Tables        |      Are      |  Cool |
| ------------- | :-----------: | ----: |
| col 3 is      | right-aligned | $1600 |
| col 2 is      |   centered    |   $12 |
| zebra stripes |   are neat    |    $1 |

There must be at least 3 dashes separating each header cell.
The outer pipes (|) are optional, and you don't need to make the
raw Markdown line up prettily. You can also use inline Markdown.

| Markdown | Less      | Pretty     |
| -------- | --------- | ---------- |
| _Still_  | `renders` | **nicely** |
| 1        | 2         | 3          |

## Blockquotes

> Blockquotes are very handy in email to emulate reply text.
> This line is part of the same quote.

Quote break.

> This is a very long line that will still be quoted properly when it wraps. Oh boy let's keep writing to make sure this is long enough to actually wrap for everyone. Oh, you can _put_ **Markdown** into a blockquote.

## Horizontal Rule

Three or more...

---

Hyphens

---

Asterisks

---

Underscores

## Line Breaks

Here's a line for us to start with.

This line is separated from the one above by two newlines, so it will be a _separate paragraph_.

This line is also a separate paragraph but ends with two spaces.  
It's parsed as a hard line break.

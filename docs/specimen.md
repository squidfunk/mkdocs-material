# Specimen should get a very long name, so we see how it behaves with the new edit url feature that is awesome

## Typography

### Body copy

Material's typographical system follows the idea of __vertical rhythm__, which
means it tries to establish a _consistent visual rhythm_ to the content of the
page to make reading pleasant and easy on the eyes. It's a simple concept but
rather hard to implement correctly. Luckily, the Material theme has already
done this for you, so sit back, relax, and start writing your documentation.

Naturally, the Material theme defines __bold__ and _italic_ styles, makes it
easy to write `fenced inline code blocks`, [links](#) and <kbd>Keyboard</kbd>
<kbd>+</kbd> <kbd>Commands</kbd>.

* test
* test
* Material's typographical system follows the idea of __vertical rhythm__, which
  means it tries to establish a _consistent visual rhythm_ to the content of the
  page to make reading pleasant and easy on the eyes. It's a simple concept but
  rather hard to implement correctly. Luckily, the Material theme has already
    1. test
    2. test
        1.  Material's typographical system follows the idea of __vertical rhythm__, which
            means it tries to establish a _consistent visual rhythm_ to the content of the
            page to make reading pleasant and easy on the eyes. It's a simple concept but
            rather hard to implement correctly. Luckily, the Material theme has already
        2.  Material's typographical system follows the idea of __vertical rhythm__, which
            means it tries to establish a _consistent visual rhythm_ to the content of the
            page to make reading pleasant and easy on the eyes. It's a simple concept but
            rather hard to implement correctly. Luckily, the Material theme has already
        3.  Material's typographical system follows the idea of __vertical rhythm__, which
            means it tries to establish a _consistent visual rhythm_ to the content of the
            page to make reading pleasant and easy on the eyes. It's a simple concept but
            rather hard to implement correctly. Luckily, the Material theme has already
    3. test
        1. test
        2. test
        3. test
    * test
* test

### Headings <small>w/ or w/o secondary text</small>

Besides the default HTML headings `<h2>` to `<h6>`, the representational
classes `.h2` to `.h6` are defined to allow easy inline styling. The `<h1>`
should be only defined once and is integrated into the collapsing header.

Secondary text can be introduced to all headings (including `<h1>`) by using
the `<small>` tag directly inside Markdown.

## Blockquotes

> Text can also be written in blockquotes, for example to paraphrase
> something or someone.
>
> > And blockquotes can be nested?
>
> This is correct. Furthermore, they can contain __bold__ and _italic_ text,
> `fenced inline code blocks`, [links](#), headings and all kind of stuff.

## Lists

### Ordered lists

This is an ordered list of sentences for the sake of checking the styling is &#128076;!

1. The first sentence, free from markup.
2. The second sentence includes _italic_ text, and a [link](#) that should hopefully help it trigger a second line overflow to make sure spacing is a-ok.
3. The third sentence highlights some enjoyable fruits:
    1. Mangoes, **yum**!
    2. Blueberries
    3. Strawberries
    4. Apples (in particular)
        1. Sundowner

            My favourite &#128149;

        2. Granny Smith
4. An this is just a footer sentence just to make sure.

### Unordered lists

Let's do that again, this time without the numbering.

- Free from markup, just like a bird.
- Let's try some [link](#) with some inline code `var home = '127.0.0.1'`, and now some extra __fluff__ to ensure we're using more than a single line.
- These are some varietes of beer.
    - Lager

        Lager is a type of beer that is conditioned at low temperatures, normally at the brewery. It may be pale, golden, amber, or dark.

    - Kölsch

        Kölsch is a beer brewed in Cologne, Germany. It is a clear, top-fermented beer with a bright, straw-yellow hue similar to other beers brewed from mainly Pilsener malt.

    - Siason

        Saison is a pale ale that is generally around 7% ABV, highly carbonated, fruity, spicy, and often bottle conditioned

    - IPA

- An this is just a footer sentence just to make sure.

We can also use the alternative Markdown styling for lists (`*`, `+` or `-`), even mixing them:

* As shown by this item, which is a `*`.
+ This item uses `+`.
    * And it also includes an nested item for good measure.
- The final item uses `-`.
- And for good measure, this also uses `-`.

Another default list:

* No checklist
* Foobar

    ``` js
    function() test {
      var foo = 12;
      return foo;
    }
    ```

## Checklists

Checklists are supported by the [PyMdown Extension][], [Tasklist][]:

* [ ] foo
* [x] bar
* [ ] baz
    * [ ] foo
    * [x] bar
    * [ ] baz

### Critic

Here is some {--*incorrect*--} Markdown.  I am adding this {++here.++}.  Here is some more {--text
that I am removing--}text.  And here is even more {++text that I
am ++}adding.{~~

~>  ~~}Paragraph was deleted and replaced with some spaces.{~~  ~>

~~}Spaces were removed and a paragraph was added.

And here is a comment on {==some
==text== ==} asdhsjakh dkah dkash dkjas hdkash dksa sahdka kas dksa hdksah dksa kdsa kdask dask {>>This works quite well. I just wanted to comment on it.<<}. Substitutions {~~is~>are~~} great!

### Test {--headline--} [`with code`](http://google.com) and ==foo== [without](http://google.com)

This is also ==something that is marked (tm)==. Very cool.

Escape \{>>This text is preserved<<}.

General block handling.

{--

* test
* test
* test
    * test
* test

--}

{++

* test
* test
* test
    * test
* test

++}

## Code

### Inline

Code can also be written `inline`, however syntax
highlighting will only work on code listings unless you are using [inlinehilite][], which allows magic like `#!js var test = 0;`!

There has also been some recent conjecture about how articles will style [links that include `inline code` samples](https://www.impressivewebs.com/fixing-styles-on-code-tags-nested-inside-links/), so let's make sure we get that right too.

### Listing

Pre-formatted code blocks can host code examples and use the pygments extension
(if installed and enabled in `mkdocs.yml`) for syntax highlighting:

``` c hl_lines="14 15 20"
/*!
 * Scan a buffer for a valid variable-sized integer.
 *
 * This function checks if an underrun might happen reading a variable-sized
 * integer from a buffer. Only underruns can be checked using this method,
 * overflows may still happen, but are properly reported by the unpack
 * functions. SSE2 intrinsics are used if the compiler supports it.
 *
 * \param[in] data[] Source buffer
 * \param[in] left   Remaining bytes
 * \return           Bytes read
 */
extern size_t
pb_varint_scan(const uint8_t data[], size_t left) {
  assert(data && left);
  left = left > 10 ? 10 : left;

#ifdef __SSE2__

  /* Mapping: remaining bytes ==> bitmask */
  static const int mask_map[] = {
    0x0000, 0x0001, 0x0003, 0x0007,
    0x000F, 0x001F, 0x003F, 0x007F,
    0x00FF, 0x01FF, 0x03FF
  };

  /* Load buffer into 128-bit integer and create high-bit mask */
  __m128i temp = _mm_loadu_si128((const __m128i *)data);
  __m128i high = _mm_set1_epi8(0x80);

  /* Intersect and extract mask with high-bits set */
  int mask = _mm_movemask_epi8(_mm_and_si128(temp, high));
  mask = (mask & mask_map[left]) ^ mask_map[left];

  /* Count trailing zeroes */
  return mask ? __builtin_ctz(mask) + 1 : 0;

#else

  /* Linear scan */
  size_t size = 0;
  while (data[size++] & 0x80)
    if (!--left)
      return 0;
  return size;

#endif /* __SSE2__ */

}
```

For more examples of coding highlighting, see the [codehilite][] extensions page.

## Tables

| Feature / Implementation | protobluff | protobuf-c | nanopb  | lwpb | pbc |
|--------------------------|------------|------------|---------|------|-----|
| Message types            | yes        | yes        | yes     | yes  | yes |
| Nested message types     | yes        | yes        | yes     | yes  | yes |
| Cyclic message types     | yes        | yes        | partial | yes  | yes |
| Scalar types             | yes        | yes        | yes     | yes  | yes |
| Default values           | yes        | yes        | yes     | yes  | yes |
| Enumerations             | yes        | yes        | yes     | yes  | yes |
| Extensions               | yes        | -          | yes     | -    | yes |
| Oneofs                   | yes        | yes        | yes     | -    | -   |
| Packages                 | yes        | yes        | yes     | yes  | yes |
| Packed option            | yes        | yes        | yes     | yes  | yes |
| Deprecations             | yes        | partial    | -       | -    | -   |

Tables might also include alignment indiciators:

| Left Align   | Center Align   | Right Align   |
| :----------- | :------------: | ------------: |
| Hi           | there          | friend        |
| How          | are            | you?          |

And if you're using something like [Pandoc](http://pandoc.org/), you might get tables with `colgroup`, which is fun?

<table>
  <colgroup>
    <col width="30%">
    <col width="70%">
  </colgroup>
  <thead>
    <tr class="header">
      <th>Company</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href='http://google.com'>Google</a></td>
      <td>A search engine (among other things).</td>
    </tr>
    <tr>
      <td><a href='http://bing.com'>Bing</a></td>
      <td>Another search engine, from Microsoft.</td>
    </tr>
  </tbody>
</table>

[codehilite]: extensions/codehilite.md
[inlinehilite]: extensions/pymdown/inlinehilite.md
[PyMdown Extension]: extensions/pymdown/overview.md
[Tasklist]: extensions/pymdown/tasklist.md

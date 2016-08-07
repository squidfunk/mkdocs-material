# Specimen

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

### Unordered lists

## Code

### Listing

Pre-formatted code blocks can host code examples and use the pygments extension
(if installed and enabled in `mkdocs.yml`) for syntax highlighting:

``` c
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

### Inline

Code can also be written within `fenced inline code blocks`, however syntax
highlighting will only work on code listings.

## Tables
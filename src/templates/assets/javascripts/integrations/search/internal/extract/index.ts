/*
 * Copyright (c) 2016-2024 Martin Donath <martin.donath@squidfunk.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Extraction type
 *
 * This type defines the possible values that are encoded into the first two
 * bits of a section that is part of the blocks of a tokenization table. There
 * are three types of interest: HTML opening and closing tags, as well as the
 * actual text content we need to extract for indexing.
 */
export const enum Extract {
  TAG_OPEN  = 0,                       /* HTML opening tag */
  TEXT      = 1,                       /* Text content */
  TAG_CLOSE = 2                        /* HTML closing tag */
}

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Visitor function
 *
 * @param block - Block index
 * @param type - Extraction type
 * @param start - Start offset
 * @param end - End offset
 */
type VisitorFn = (
  block: number, type: Extract, start: number, end: number
) => void

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Split a string into markup and text sections
 *
 * This function scans a string and divides it up into sections of markup and
 * text. For each section, it invokes the given visitor function with the block
 * index, extraction type, as well as start and end offsets. Using a visitor
 * function (= streaming data) is ideal for minimizing pressure on the GC.
 *
 * @param input - Input value
 * @param fn - Visitor function
 */
export function extract(
  input: string, fn: VisitorFn
): void {

  let block = 0                        /* Current block */
  let start = 0                        /* Current start offset */
  let end = 0                          /* Current end offset */

  /* Split string into sections */
  for (let stack = 0; end < input.length; end++) {

    /* Opening tag after non-empty section */
    if (input.charAt(end) === "<" && end > start) {
      fn(block, Extract.TEXT, start, start = end)

    /* Closing tag */
    } else if (input.charAt(end) === ">") {
      if (input.charAt(start + 1) === "/") {
        if (--stack === 0)
          fn(block++, Extract.TAG_CLOSE, start, end + 1)

      /* Tag is not self-closing */
      } else if (input.charAt(end - 1) !== "/") {
        if (stack++ === 0)
          fn(block, Extract.TAG_OPEN, start, end + 1)
      }

      /* New section */
      start = end + 1
    }
  }

  /* Add trailing section */
  if (end > start)
    fn(block, Extract.TEXT, start, end)
}

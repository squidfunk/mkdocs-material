/*
 * Copyright (c) 2016-2022 Martin Donath <martin.donath@squidfunk.com>
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
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Visitor function
 *
 * @param block - Block index
 * @param operation - Operation index
 * @param start - Start offset
 * @param end - End offset
 */
type VisitorFn = (
  block: number, operation: number, start: number, end: number
) => void

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Extract all non-HTML parts of a string
 *
 * This function preprocesses the given string by isolating all non-HTML parts,
 * in order to ensure that HTML tags are removed before indexing. Note that it
 * intentionally expects a visitor function argument, as opposed to collecting
 * and returning all sections, for better memory efficiency.
 *
 * @param value - String value
 * @param fn - Visitor function
 */
export function extract(
  value: string, fn: VisitorFn
): void {

  let block = 0                        /* Current block */
  let start = 0                        /* Current start offset */
  let end = 0                          /* Current end offset */

  /* Split string into sections */
  for (let stack = 0; end < value.length; end++) {

    /* Tag start after non-empty section */
    if (value.charAt(end) === "<" && end > start) {
      fn(block, 1, start, start = end)

      /* Tag end */
    } else if (value.charAt(end) === ">") {
      if (value.charAt(start + 1) === "/") {
        if (--stack === 0)
          fn(block++, 2, start, end + 1)

        /* Tag is not self-closing */
      } else if (value.charAt(end - 1) !== "/") {
        if (stack++ === 0)
          fn(block, 0, start, end + 1)
      }

      /* New section */
      start = end + 1
    }
  }

  /* Add trailing section */
  if (end > start)
    fn(block, 1, start, end)
}

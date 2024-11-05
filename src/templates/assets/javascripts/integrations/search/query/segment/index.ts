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
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Segment a search query using the inverted index
 *
 * This function implements a clever approach to text segmentation for Asian
 * languages, as it used the information already available in the search index.
 * The idea is to greedily segment the search query based on the tokens that are
 * already part of the index, as described in the linked issue.
 *
 * @see https://bit.ly/3lwjrk7 - GitHub issue
 *
 * @param query - Query value
 * @param index - Inverted index
 *
 * @returns Segmented query value
 */
export function segment(
  query: string, index: object
): Iterable<string> {
  const segments = new Set<string>()

  /* Segment search query */
  const wordcuts = new Uint16Array(query.length)
  for (let i = 0; i < query.length; i++)
    for (let j = i + 1; j < query.length; j++) {
      const value = query.slice(i, j)
      if (value in index)
        wordcuts[i] = j - i
    }

  /* Compute longest matches with minimum overlap */
  const stack = [0]
  for (let s = stack.length; s > 0;) {
    const p = stack[--s]
    for (let q = 1; q < wordcuts[p]; q++)
      if (wordcuts[p + q] > wordcuts[p] - q) {
        segments.add(query.slice(p, p + q))
        stack[s++] = p + q
      }

    /* Continue at end of query string */
    const q = p + wordcuts[p]
    if (wordcuts[q] && q < query.length - 1)
      stack[s++] = q

    /* Add current segment */
    segments.add(query.slice(p, q))
  }

  // @todo fix this case in the code block above, this is a hotfix
  if (segments.has(""))
    return new Set([query])

  /* Return segmented query value */
  return segments
}

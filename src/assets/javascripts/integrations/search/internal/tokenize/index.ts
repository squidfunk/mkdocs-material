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

import { split } from "../_"
import { extract } from "../extract"

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Split a string into tokens
 *
 * This tokenizer supersedes the default tokenizer that is provided by Lunr.js,
 * as it is aware of HTML tags and allows for multi-character splitting.
 *
 * @param input - String value or token
 *
 * @returns Tokens
 */
export function tokenize(
  input?: string | string[]
): lunr.Token[] {
  const tokens: lunr.Token[] = []

  /**
   * Initialize segmenter, if loaded
   *
   * Note that doing this here is not ideal, but it's okay as we just test it
   * before bringing the new search implementation in its final shape.
   */
  const segmenter = "TinySegmenter" in lunr
    ? new lunr.TinySegmenter()
    : undefined

  /* Tokenize an array of string values */
  if (Array.isArray(input)) {
    // @todo: handle multi-valued fields (e.g. tags)
    for (const value of input)
      tokens.push(...tokenize(value))

  /* Tokenize a string value */
  } else if (input) {
    const table = lunr.tokenizer.table

    /* Split string into sections and tokenize content blocks */
    extract(input, (block, type, start, end) => {
      if (type & 1) {
        const section = input.slice(start, end)
        split(section, lunr.tokenizer.separator, (index, until) => {

          /**
           * Apply segmenter after tokenization. Note that the segmenter will
           * also split words at word boundaries, which is not what we want, so
           * we need to check if we can somehow mitigate this behavior.
           */
          if (typeof segmenter !== "undefined") {
            const subsection = section.slice(index, until)
            if (/^[MHIK]$/.test(segmenter.ctype_(subsection))) {
              const segments = segmenter.segment(subsection)
              for (let i = 0, l = 0; i < segments.length; i++) {

                /* Add block to table */
                table[block] ||= []
                table[block].push(
                  start + index + l << 12 |
                  segments[i].length << 2 |
                  type
                )

                /* Add block as token */
                tokens.push(new lunr.Token(
                  segments[i].toLowerCase(), {
                    position: block << 20 | table[block].length - 1
                  }
                ))

                /* Keep track of length */
                l += segments[i].length
              }
              return // combine segmenter with other approach!?
            }
          }

          /* Add block to table */
          table[block] ||= []
          table[block].push(
            start + index << 12 |
            until - index <<  2 |
            type
          )

          /* Add block as token */
          tokens.push(new lunr.Token(
            section.slice(index, until).toLowerCase(), {
              position: block << 20 | table[block].length - 1
            }
          ))
        })

      /* Add non-content block to table */
      } else {
        table[block] ||= []
        table[block].push(
          start       << 12 |
          end - start <<  2 |
          type
        )
      }
    })
  }

  /* Return tokens */
  return tokens
}

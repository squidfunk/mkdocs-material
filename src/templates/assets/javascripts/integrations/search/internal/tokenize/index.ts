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

import { split } from "../_"
import {
  Extract,
  extract
} from "../extract"

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Split a string or set of strings into tokens
 *
 * This tokenizer supersedes the default tokenizer that is provided by Lunr.js,
 * as it is aware of HTML tags and allows for multi-character splitting.
 *
 * It takes the given inputs, splits each of them into markup and text sections,
 * tokenizes and segments (if necessary) each of them, and then indexes them in
 * a table by using a compact bit representation. Bitwise techniques are used
 * to write and read from the table during indexing and querying.
 *
 * @see https://bit.ly/3W3Xw4J - Search: better, faster, smaller
 *
 * @param input - Input value(s)
 *
 * @returns Tokens
 */
export function tokenize(
  input?: string | string[]
): lunr.Token[] {
  const tokens: lunr.Token[] = []
  if (typeof input === "undefined")
    return tokens

  /* Tokenize strings one after another */
  const inputs = Array.isArray(input) ? input : [input]
  for (let i = 0; i < inputs.length; i++) {
    const table = lunr.tokenizer.table
    const total = table.length

    /* Split string into sections and tokenize content blocks */
    extract(inputs[i], (block, type, start, end) => {
      table[block += total] ||= []
      switch (type) {

        /* Handle markup */
        case Extract.TAG_OPEN:
        case Extract.TAG_CLOSE:
          table[block].push(
            start       << 12 |
            end - start <<  2 |
            type
          )
          break

        /* Handle text content */
        case Extract.TEXT:
          const section = inputs[i].slice(start, end)
          split(section, lunr.tokenizer.separator, (index, until) => {

            /**
             * Apply segmenter after tokenization. Note that the segmenter will
             * also split words at word boundaries, which is not what we want,
             * so we need to check if we can somehow mitigate this behavior.
             */
            if (typeof lunr.segmenter !== "undefined") {
              const subsection = section.slice(index, until)
              if (/^[MHIK]$/.test(lunr.segmenter.ctype_(subsection))) {
                const segments = lunr.segmenter.segment(subsection)
                for (let s = 0, l = 0; s < segments.length; s++) {

                  /* Add block to section */
                  table[block] ||= []
                  table[block].push(
                    start + index + l  << 12 |
                    segments[s].length <<  2 |
                    type
                  )

                  /* Add token with position */
                  tokens.push(new lunr.Token(
                    segments[s].toLowerCase(), {
                      position: block << 20 | table[block].length - 1
                    }
                  ))

                  /* Keep track of length */
                  l += segments[s].length
                }
                return
              }
            }

            /* Add block to section */
            table[block].push(
              start + index << 12 |
              until - index <<  2 |
              type
            )

            /* Add token with position */
            tokens.push(new lunr.Token(
              section.slice(index, until).toLowerCase(), {
                position: block << 20 | table[block].length - 1
              }
            ))
          })
      }
    })
  }

  /* Return tokens */
  return tokens
}

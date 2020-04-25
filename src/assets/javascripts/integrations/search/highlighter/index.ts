/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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

import { SearchIndexConfig } from "../_"
import { SearchDocument } from "../document"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Search highlight function
 *
 * @template T - Search document type
 *
 * @param document - Search document
 *
 * @return Highlighted document
 */
export type SearchHighlightFn = <
  T extends SearchDocument
>(document: Readonly<T>) => T

/**
 * Search highlight factory function
 *
 * @param value - Query value
 *
 * @return Search highlight function
 */
export type SearchHighlightFactoryFn = (value: string) => SearchHighlightFn

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Create a search highlighter
 *
 * @param config - Search index configuration
 *
 * @return Search highlight factory function
 */
export function setupSearchHighlighter(
  config: SearchIndexConfig
): SearchHighlightFactoryFn {
  const separator = new RegExp(config.separator, "img")
  const highlight = (_: unknown, data: string, term: string) => {
    return `${data}<em>${term}</em>`
  }

  /* Return factory function */
  return (value: string) => {
    value = value
      .replace(/[\s*+-:~^]+/g, " ")
      .trim()

    /* Create search term match expression */
    const match = new RegExp(`(^|${config.separator})(${
      value
        .replace(/[|\\{}()[\]^$+*?.-]/g, "\\$&")
        .replace(separator, "|")
    })`, "img")

    /* Highlight document */
    return document => ({
      ...document,
      title: document.title.replace(match, highlight),
      text:  document.text.replace(match, highlight)
    })
  }
}

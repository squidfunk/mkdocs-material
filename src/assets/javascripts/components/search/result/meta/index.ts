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

import { MonoTypeOperatorFunction, Observable, pipe } from "rxjs"
import { map, withLatestFrom } from "rxjs/operators"

import {
  resetSearchResultMeta,
  setSearchResultMeta
} from "actions"
import { SearchResult } from "modules"
import { getElement } from "utilities"

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Options
 */
interface Options {
  query$: Observable<string>           /* Search query observable */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Paint search result metadata from source observable
 *
 * @param el - Search result metadata element
 * @param options - Options
 *
 * @return Operator function
 */
export function paintSearchResultMeta(
  el: HTMLElement, { query$ }: Options
): MonoTypeOperatorFunction<SearchResult[]> {
  const meta = getElement(".md-search-result__meta", el)!
  return pipe(
    withLatestFrom(query$),
    map(([result, query]) => {
      if (query) {
        setSearchResultMeta(meta, result.length)
      } else {
        resetSearchResultMeta(meta)
      }
      return result
    })
  )
}

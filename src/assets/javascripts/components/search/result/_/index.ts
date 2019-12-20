/*
 * Copyright (c) 2016-2019 Martin Donath <martin.donath@squidfunk.com>
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

import { identity } from "ramda"
import { Observable, OperatorFunction, pipe } from "rxjs"
import {
  distinctUntilChanged,
  filter,
  map,
  switchMap,
} from "rxjs/operators"

import { SearchResult } from "modules"
import { Agent, watchElementOffset } from "utilities"

import { paintSearchResultList } from "../list"
import { paintSearchResultMeta } from "../meta"

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Options
 */
interface Options {
  result$: Observable<SearchResult[]>  /* Search result observable */
  query$: Observable<string>           /* Search query observable */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Setup search result from source observable
 *
 * @param el - Search result element
 * @param agent - Agent
 *
 * @return Operator function
 */
export function setupSearchResult(
  agent: Agent, { result$, query$ }: Options
): OperatorFunction<HTMLElement, SearchResult[]> {
  return pipe(
    switchMap(el => {
      const parent = el.parentElement!

      /* Compute whether more elements need to be rendered */
      const render$ = watchElementOffset(parent, agent)
        .pipe(
          map(({ y }) => y >= parent.scrollHeight - parent.offsetHeight - 16),
          distinctUntilChanged(),
          filter(identity)
        )

      /* Paint search results */
      return result$
        .pipe(
          paintSearchResultMeta(el, { query$ }),
          paintSearchResultList(el, { render$ })
        )
    })
  )
}

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

import { identity } from "ramda"
import { Observable, OperatorFunction, pipe } from "rxjs"
import {
  distinctUntilChanged,
  filter,
  map,
  mapTo,
  pluck,
  startWith,
  switchMap
} from "rxjs/operators"

import { WorkerHandler, watchElementOffset } from "browser"
import {
  SearchMessage,
  SearchResult,
  isSearchReadyMessage,
  isSearchResultMessage
} from "integrations"

import { SearchQuery } from "../../query"
import { applySearchResult } from "../react"

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Mount options
 */
interface MountOptions {
  query$: Observable<SearchQuery>      /* Search query observable */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Mount search result from source observable
 *
 * @param handler - Worker handler
 * @param options - Options
 *
 * @return Operator function
 */
export function mountSearchResult(
  { rx$ }: WorkerHandler<SearchMessage>, { query$ }: MountOptions
): OperatorFunction<HTMLElement, SearchResult[]> {
  return pipe(
    switchMap(el => {
      const container = el.parentElement!

      /* Compute if search is ready */
      const ready$ = rx$
        .pipe(
          filter(isSearchReadyMessage),
          mapTo(true)
        )

      /* Compute whether there are more search results to fetch */
      const fetch$ = watchElementOffset(container)
        .pipe(
          map(({ y }) => {
            return y >= container.scrollHeight - container.offsetHeight - 16
          }),
          distinctUntilChanged(),
          filter(identity)
        )

      /* Apply search results */
      return rx$
        .pipe(
          filter(isSearchResultMessage),
          pluck("data"),
          applySearchResult(el, { query$, ready$, fetch$ }),
          startWith([])
        )
    })
  )
}

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
  pluck,
  shareReplay,
  switchMap
} from "rxjs/operators"

import { SearchResult } from "modules"
import {
  SearchQuery,
  Viewport,
  WorkerHandler,
  paintSearchResult,
  watchElementOffset
} from "observables"
import {
  SearchMessage,
  isSearchResultMessage
} from "workers"

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Mount options
 */
interface MountOptions {
  query$: Observable<SearchQuery>      /* Search query observable */
  viewport$: Observable<Viewport>      /* Viewport observable */
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
  { rx$ }: WorkerHandler<SearchMessage>,
  { query$, viewport$ }: MountOptions
): OperatorFunction<HTMLElement, SearchResult[]> {
  return pipe(
    switchMap(el => {
      const container = el.parentElement!

      /* Compute whether there are more search results to fetch */
      const fetch$ = watchElementOffset(container, { viewport$ })
        .pipe(
          map(({ y }) => {
            return y >= container.scrollHeight - container.offsetHeight - 16
          }),
          distinctUntilChanged(),
          filter(identity)
        )

      /* Paint search results */
      return rx$
        .pipe(
          filter(isSearchResultMessage),
          pluck("data"),
          paintSearchResult(el, { query$, fetch$ })
        )
    }),
    shareReplay(1)
  )
}

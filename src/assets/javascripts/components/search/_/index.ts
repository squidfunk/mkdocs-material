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

import { OperatorFunction, combineLatest, pipe } from "rxjs"
import { map, shareReplay, switchMap } from "rxjs/operators"

import { SearchResult } from "integrations/search"
import { SearchQuery, WorkerHandler } from "observables"
import { SearchMessage } from "workers"

import { useComponent } from "../../_"
import { mountSearchQuery } from "../query"
import { mountSearchReset } from "../reset"
import { mountSearchResult } from "../result"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Search
 */
export interface Search {
  query: SearchQuery                   /* Search query */
  result: SearchResult[]               /* Search result list */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Mount search from source observable
 *
 * @param handler - Worker handler
 * @param options - Options
 *
 * @return Search observable
 */
export function mountSearch(
  handler: WorkerHandler<SearchMessage>
): OperatorFunction<HTMLElement, Search> {
  return pipe(
    switchMap(() => {

      /* Mount search query */
      const query$ = useComponent<HTMLInputElement>("search-query")
        .pipe(
          mountSearchQuery(handler),
          shareReplay(1)
        )

      /* Mount search reset */
      const reset$ = useComponent("search-reset")
        .pipe(
          mountSearchReset()
        )

      /* Mount search result */
      const result$ = useComponent("search-result")
        .pipe(
          mountSearchResult(handler, { query$ })
        )

      /* Combine into a single hot observable */
      return combineLatest([query$, result$, reset$])
        .pipe(
          map(([query, result]) => ({ query, result })),
          shareReplay(1)
        )
    })
  )
}

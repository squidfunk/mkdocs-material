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

import { Observable, OperatorFunction, combineLatest, pipe } from "rxjs"
import {
  filter,
  map,
  mapTo,
  sample,
  startWith,
  switchMap,
  take
} from "rxjs/operators"

import { WorkerHandler } from "browser"
import {
  SearchMessage,
  SearchResult,
  isSearchQueryMessage,
  isSearchReadyMessage
} from "integrations/search"

import { SearchQuery } from "../query"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Search status
 */
export type SearchStatus =
  | "waiting"                          /* Search waiting for initialization */
  | "ready"                            /* Search ready */

/* ------------------------------------------------------------------------- */

/**
 * Search
 */
export interface Search {
  status: SearchStatus                 /* Search status */
  query: SearchQuery                   /* Search query */
  result: SearchResult[]               /* Search result list */
}

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Mount options
 */
interface MountOptions {
  query$: Observable<SearchQuery>      /* Search query observable */
  reset$: Observable<void>             /* Search reset observable */
  result$: Observable<SearchResult[]>  /* Search result observable */
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
 * @return Operator function
 */
export function mountSearch(
  { rx$, tx$ }: WorkerHandler<SearchMessage>,
  { query$, reset$, result$ }: MountOptions
): OperatorFunction<HTMLElement, Search> {
  return pipe(
    switchMap(() => {

      /* Compute search status */
      const status$ = rx$
        .pipe(
          filter(isSearchReadyMessage),
          mapTo<SearchStatus>("ready"),
          startWith("waiting")
        ) as Observable<SearchStatus>

      /* Re-emit the latest query when search is ready */
      tx$
        .pipe(
          filter(isSearchQueryMessage),
          sample(status$),
          take(1)
        )
          .subscribe(tx$.next.bind(tx$))

      /* Combine into single observable */
      return combineLatest([status$, query$, result$, reset$])
        .pipe(
          map(([status, query, result]) => ({
            status,
            query,
            result
          }))
        )
    })
  )
}

/*
 * Copyright (c) 2016-2021 Martin Donath <martin.donath@squidfunk.com>
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

import {
  Observable,
  Subject,
  animationFrameScheduler,
  merge,
  of
} from "rxjs"
import {
  bufferCount,
  filter,
  finalize,
  map,
  observeOn,
  startWith,
  switchMap,
  tap,
  withLatestFrom,
  zipWith
} from "rxjs/operators"

import {
  addToSearchResultList,
  resetSearchResultList,
  resetSearchResultMeta,
  setSearchResultMeta
} from "~/actions"
import {
  getElementOrThrow,
  watchElementThreshold
} from "~/browser"
import {
  SearchResult as SearchResultData,
  SearchWorker,
  isSearchResultMessage
} from "~/integrations"
import { renderSearchResult } from "~/templates"

import { Component } from "../../_"
import { SearchQuery } from "../query"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Search result
 */
export interface SearchResult {
  data: SearchResultData[]             /* Search result data */
}

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
 * Mount search result list
 *
 * This function performs a lazy rendering of the search results, depending on
 * the vertical offset of the search result container.
 *
 * @param el - Search result list element
 * @param worker - Search worker
 * @param options - Options
 *
 * @returns Search result list component observable
 */
export function mountSearchResult(
  el: HTMLElement, { rx$ }: SearchWorker, { query$ }: MountOptions
): Observable<Component<SearchResult>> {
  const internal$ = new Subject<SearchResult>()
  const boundary$ = watchElementThreshold(el.parentElement!)
    .pipe(
      filter(Boolean)
    )

  /* Update search result metadata */
  const meta = getElementOrThrow(":scope > :first-child", el)
  internal$
    .pipe(
      observeOn(animationFrameScheduler),
      withLatestFrom(query$)
    )
      .subscribe(([{ data }, { value }]) => {
        if (value)
          setSearchResultMeta(meta, data.length)
        else
          resetSearchResultMeta(meta)
      })

  /* Update search result list */
  const list = getElementOrThrow(":scope > :last-child", el)
  internal$
    .pipe(
      observeOn(animationFrameScheduler),
      tap(() => resetSearchResultList(list)),
      switchMap(({ data }) => merge(
        of(...data.slice(0, 10)),
        of(...data.slice(10))
          .pipe(
            bufferCount(4),
            zipWith(boundary$),
            switchMap(([chunk]) => of(...chunk))
          )
      ))
    )
      .subscribe(result => {
        addToSearchResultList(list, renderSearchResult(result))
      })

  /* Filter search result list */
  const result$ = rx$
    .pipe(
      filter(isSearchResultMessage),
      map(({ data }) => ({ data })),
      startWith({ data: [] })
    )

  /* Create and return component */
  return result$
    .pipe(
      tap(internal$),
      finalize(() => internal$.complete()),
      map(state => ({ ref: el, ...state }))
    )
}

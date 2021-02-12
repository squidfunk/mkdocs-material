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

import { Observable, merge } from "rxjs"
import { filter, sample, take } from "rxjs/operators"

import { configuration } from "~/_"
import {
  getElementOrThrow,
  requestJSON
} from "~/browser"
import {
  SearchIndex,
  isSearchQueryMessage,
  isSearchReadyMessage,
  setupSearchWorker
} from "~/integrations"

import { Component } from "../../_"
import { SearchQuery, mountSearchQuery } from "../query"
import { SearchResult, mountSearchResult } from "../result"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Search
 */
export type Search =
  | SearchQuery
  | SearchResult

/* ----------------------------------------------------------------------------
 * Helper functions
 * ------------------------------------------------------------------------- */

/**
 * Fetch search index
 *
 * @param url - Search index URL
 *
 * @returns Promise resolving with search index
 */
function fetchSearchIndex(url: string) {
  return __search?.index || requestJSON<SearchIndex>(url)
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Mount search
 *
 * @param el - Search element
 *
 * @returns Search component observable
 */
export function mountSearch(
  el: HTMLElement
): Observable<Component<Search>> {
  const config = configuration()
  const worker = setupSearchWorker(config.search, fetchSearchIndex(
    `${config.base}/search/search_index.json`
  ))

  /* Re-emit query when search is ready */
  const { tx$, rx$ } = worker
  tx$
    .pipe(
      filter(isSearchQueryMessage),
      sample(rx$.pipe(filter(isSearchReadyMessage))),
      take(1)
    )
      .subscribe(tx$.next.bind(tx$))

  /* Mount search query component */
  const query$ = mountSearchQuery(
    getElementOrThrow("[data-md-component=search-query]", el),
    worker
  )

  /* Mount search result and return component */
  return merge(
    query$,
    mountSearchResult(
      getElementOrThrow("[data-md-component=search-result]", el),
      worker, { query$ }
    )
  )
}

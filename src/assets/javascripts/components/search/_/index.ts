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

import {
  Observable,
  Subject,
  combineLatest,
  fromEvent,
  merge,
  defer
} from "rxjs"
import {
  delay,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  finalize,
  map,
  startWith,
  takeLast,
  takeUntil,
  tap
} from "rxjs/operators"

import {
  resetSearchQueryPlaceholder,
  setSearchQueryPlaceholder
} from "~/actions"
import {
  getElementOrThrow,
  setElementFocus,
  setToggle,
  watchElementFocus
} from "~/browser"
import {
  SearchTransformFn,
  defaultTransform,
  SearchWorker,
  SearchQueryMessage,
  SearchMessageType,
  setupSearchWorker,
} from "~/integrations"
import { configuration } from "~/_"

import { Component } from "../../_"
import { mountSearchQuery, SearchQuery } from "../query"
import { mountSearchResult, SearchResult } from "../result"

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
 *
 */
function fetchSearchIndex() {

}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Mount search
 *
 * @param el - Search element
 *
 * @return Search component observable
 */
export function mountSearch(
  el: HTMLElement
): Observable<Component<Search>> {

  const searchQueryEl = getElementOrThrow<HTMLInputElement>("[data-md-component=search-query]", el)
  const searchResultEl = getElementOrThrow("[data-md-component=search-result]", el)

  const config = configuration()

  // TODO: determine correct BASE URL -> may change on instant loading!
  const index$ = defer(() => fetch(`${config.base}/search/search_index.json`, {
    credentials: "same-origin"
  }).then(res => res.json()))

  // TODO: shouldnt be necessary, as it's done from config?
  const worker$ = setupSearchWorker(config.search, {
    index$
  })
  // TODO: hand transformFn to

  // __search.transform -> search transform
  // __search.index     -> search index

  const query$ = mountSearchQuery(searchQueryEl, worker$)
  const result$ = mountSearchResult(searchResultEl, worker$, { query$ })



  return merge(
    query$,
    result$

    // /* Search query */
    // ...getElements("[data-md-component=search-query]", el)
    //   .map(child => mountSearchQuery(child, worker$)),

    // /* Search result */
    // ...getElements("[data-md-component=search-query]", el)
    //   .map(child => mountSearchResult(child, worker$)),
  )
  // /* Create and return component */
  // return watchSearchQuery(el, transform)
  //   .pipe(
  //     tap(internal$),
  //     finalize(() => internal$.complete()),
  //     map(state => ({ ref: el, ...state }))
  //   )
}

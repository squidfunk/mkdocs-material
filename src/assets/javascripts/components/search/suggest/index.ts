/*
 * Copyright (c) 2016-2022 Martin Donath <martin.donath@squidfunk.com>
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
  asyncScheduler,
  combineLatestWith,
  distinctUntilChanged,
  filter,
  finalize,
  fromEvent,
  map,
  merge,
  observeOn,
  tap
} from "rxjs"

import { Keyboard } from "~/browser"
import {
  SearchResult,
  SearchWorker,
  isSearchResultMessage
} from "~/integrations"

import { Component, getComponentElement } from "../../_"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Search suggestions
 */
export interface SearchSuggest {}

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Mount options
 */
interface MountOptions {
  keyboard$: Observable<Keyboard>      /* Keyboard observable */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Mount search suggestions
 *
 * This function will perform a lazy rendering of the search results, depending
 * on the vertical offset of the search result container.
 *
 * @param el - Search result list element
 * @param worker - Search worker
 * @param options - Options
 *
 * @returns Search result list component observable
 */
export function mountSearchSuggest(
  el: HTMLElement, { rx$ }: SearchWorker, { keyboard$ }: MountOptions
): Observable<Component<SearchSuggest>> {
  const push$ = new Subject<SearchResult>()

  /* Retrieve query component and track all changes */
  const query  = getComponentElement("search-query")
  const query$ = merge(
    fromEvent(query, "keydown"),
    fromEvent(query, "focus")
  )
    .pipe(
      observeOn(asyncScheduler),
      map(() => query.value),
      distinctUntilChanged(),
    )

  /* Update search suggestions */
  push$
    .pipe(
      combineLatestWith(query$),
      map(([{ suggestions }, value]) => {
        const words = value.split(/([\s-]+)/)
        if (suggestions?.length && words[words.length - 1]) {
          const last = suggestions[suggestions.length - 1]
          if (last.startsWith(words[words.length - 1]))
            words[words.length - 1] = last
        } else {
          words.length = 0
        }
        return words
      })
    )
      .subscribe(words => el.innerHTML = words
        .join("")
        .replace(/\s/g, "&nbsp;")
      )

  /* Set up search keyboard handlers */
  keyboard$
    .pipe(
      filter(({ mode }) => mode === "search")
    )
      .subscribe(key => {
        switch (key.type) {

          /* Right arrow: accept current suggestion */
          case "ArrowRight":
            if (
              el.innerText.length &&
              query.selectionStart === query.value.length
            )
              query.value = el.innerText
            break
        }
      })

  /* Filter search result message */
  const result$ = rx$
    .pipe(
      filter(isSearchResultMessage),
      map(({ data }) => data)
    )

  /* Create and return component */
  return result$
    .pipe(
      tap(state => push$.next(state)),
      finalize(() => push$.complete()),
      map(() => ({ ref: el }))
    )
}

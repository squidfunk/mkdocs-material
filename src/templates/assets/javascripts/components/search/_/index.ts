/*
 * Copyright (c) 2016-2024 Martin Donath <martin.donath@squidfunk.com>
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
  NEVER,
  Observable,
  ObservableInput,
  filter,
  fromEvent,
  merge,
  mergeWith
} from "rxjs"

import { configuration } from "~/_"
import {
  Keyboard,
  getActiveElement,
  getElements,
  setToggle
} from "~/browser"
import {
  SearchIndex,
  SearchResult,
  setupSearchWorker
} from "~/integrations"

import {
  Component,
  getComponentElement,
  getComponentElements
} from "../../_"
import {
  SearchQuery,
  mountSearchQuery
} from "../query"
import { mountSearchResult } from "../result"
import {
  SearchShare,
  mountSearchShare
} from "../share"
import {
  SearchSuggest,
  mountSearchSuggest
} from "../suggest"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Search
 */
export type Search =
  | SearchQuery
  | SearchResult
  | SearchShare
  | SearchSuggest

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Mount options
 */
interface MountOptions {
  index$: ObservableInput<SearchIndex> /* Search index observable */
  keyboard$: Observable<Keyboard>      /* Keyboard observable */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Mount search
 *
 * This function sets up the search functionality, including the underlying
 * web worker and all keyboard bindings.
 *
 * @param el - Search element
 * @param options - Options
 *
 * @returns Search component observable
 */
export function mountSearch(
  el: HTMLElement, { index$, keyboard$ }: MountOptions
): Observable<Component<Search>> {
  const config = configuration()
  try {
    const worker$ = setupSearchWorker(config.search, index$)

    /* Retrieve query and result components */
    const query  = getComponentElement("search-query", el)
    const result = getComponentElement("search-result", el)

    /* Always close search on result selection */
    fromEvent<PointerEvent>(el, "click")
      .pipe(
        filter(({ target }) => (
          target instanceof Element && !!target.closest("a")
        ))
      )
        .subscribe(() => setToggle("search", false))

    /* Set up search keyboard handlers */
    keyboard$
      .pipe(
        filter(({ mode }) => mode === "search")
      )
        .subscribe(key => {
          const active = getActiveElement()
          switch (key.type) {

            /* Enter: go to first (best) result */
            case "Enter":
              if (active === query) {
                const anchors = new Map<HTMLAnchorElement, number>()
                for (const anchor of getElements<HTMLAnchorElement>(
                  ":first-child [href]", result
                )) {
                  const article = anchor.firstElementChild!
                  anchors.set(anchor, parseFloat(
                    article.getAttribute("data-md-score")!
                  ))
                }

                /* Go to result with highest score, if any */
                if (anchors.size) {
                  const [[best]] = [...anchors].sort(([, a], [, b]) => b - a)
                  best.click()
                }

                /* Otherwise omit form submission */
                key.claim()
              }
              break

            /* Escape or Tab: close search */
            case "Escape":
            case "Tab":
              setToggle("search", false)
              query.blur()
              break

            /* Vertical arrows: select previous or next search result */
            case "ArrowUp":
            case "ArrowDown":
              if (typeof active === "undefined") {
                query.focus()
              } else {
                const els = [query, ...getElements(
                  ":not(details) > [href], summary, details[open] [href]",
                  result
                )]
                const i = Math.max(0, (
                  Math.max(0, els.indexOf(active)) + els.length + (
                    key.type === "ArrowUp" ? -1 : +1
                  )
                ) % els.length)
                els[i].focus()
              }

              /* Prevent scrolling of page */
              key.claim()
              break

            /* All other keys: hand to search query */
            default:
              if (query !== getActiveElement())
                query.focus()
          }
        })

    /* Set up global keyboard handlers */
    keyboard$
      .pipe(
        filter(({ mode }) => mode === "global")
      )
        .subscribe(key => {
          switch (key.type) {

            /* Open search and select query */
            case "f":
            case "s":
            case "/":
              query.focus()
              query.select()

              /* Prevent scrolling of page */
              key.claim()
              break
          }
        })

    /* Create and return component */
    const query$ = mountSearchQuery(query, { worker$ })
    return merge(
      query$,
      mountSearchResult(result, { worker$, query$ })
    )
      .pipe(
        mergeWith(

          /* Search sharing */
          ...getComponentElements("search-share", el)
            .map(child => mountSearchShare(child, { query$ })),

          /* Search suggestions */
          ...getComponentElements("search-suggest", el)
            .map(child => mountSearchSuggest(child, { worker$, keyboard$ }))
        )
      )

  /* Gracefully handle broken search */
  } catch (err) {
    el.hidden = true
    return NEVER
  }
}

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
  switchMap,
  withLatestFrom
} from "rxjs/operators"

import { setToggle } from "actions"
import { SearchResult } from "integrations/search"
import {
  Key,
  SearchQuery,
  Viewport,
  WorkerHandler,
  getActiveElement,
  getElements,
  paintSearchResult,
  setElementFocus,
  useToggle,
  watchElementOffset,
  watchToggle
} from "observables"
import { takeIf } from "utilities"
import {
  SearchMessage,
  isSearchResultMessage
} from "workers"

import { useComponent } from "../../_"

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Mount options
 */
interface MountOptions {
  query$: Observable<SearchQuery>      /* Search query observable */
  viewport$: Observable<Viewport>      /* Viewport observable */
  keyboard$: Observable<Key>           /* Keyboard observable */
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
  { query$, viewport$, keyboard$ }: MountOptions
): OperatorFunction<HTMLElement, SearchResult[]> {
  const toggle$ = useToggle("search")
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

      /* Setup keyboard navigation in search mode */
      keyboard$
        .pipe(
          takeIf(toggle$.pipe(switchMap(watchToggle))),
          withLatestFrom(toggle$, useComponent("search-query"))
        )
          .subscribe(([key, toggle, query]) => {
            const active = getActiveElement()
            switch (key.type) {

              /* Enter: prevent form submission */
              case "Enter":
                if (active === query)
                  key.claim()
                break

              /* Escape or Tab: close search */
              case "Escape":
              case "Tab":
                setToggle(toggle, false)
                setElementFocus(query, false)
                break

              /* Vertical arrows: select previous or next search result */
              case "ArrowUp":
              case "ArrowDown":
                if (typeof active === "undefined") {
                  setElementFocus(query)
                } else {
                  const els = [query, ...getElements("[href]", el)]
                  const i = Math.max(0, (
                    Math.max(0, els.indexOf(active)) + els.length + (
                      key.type === "ArrowUp" ? -1 : +1
                    )
                  ) % els.length)
                  setElementFocus(els[i])
                }

                /* Prevent scrolling of page */
                key.claim()
                break

              /* All other keys: hand to search query */
              default:
                if (query !== getActiveElement())
                  setElementFocus(query)
            }
          })

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

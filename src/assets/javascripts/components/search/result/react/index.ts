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
  MonoTypeOperatorFunction,
  Observable,
  animationFrameScheduler,
  pipe
} from "rxjs"
import {
  finalize,
  map,
  mapTo,
  observeOn,
  scan,
  switchMap,
  withLatestFrom
} from "rxjs/operators"

import { getElementOrThrow } from "browser"
import { SearchResult } from "integrations/search"
import { renderSearchResult } from "templates"

import { SearchQuery } from "../../query"
import {
  addToSearchResultList,
  resetSearchResultList,
  resetSearchResultMeta,
  setSearchResultMeta
} from "../set"

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Apply options
 */
interface ApplyOptions {
  query$: Observable<SearchQuery>     /* Search query observable */
  ready$: Observable<boolean>         /* Search ready observable */
  fetch$: Observable<boolean>         /* Result fetch observable */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Apply search results
 *
 * This function will perform a lazy rendering of the search results, depending
 * on the vertical offset of the search result container. When the scroll offset
 * reaches the bottom of the element, more results are fetched and rendered.
 *
 * @param el - Search result element
 * @param options - Options
 *
 * @return Operator function
 */
export function applySearchResult(
  el: HTMLElement, { query$, ready$, fetch$ }: ApplyOptions
): MonoTypeOperatorFunction<SearchResult[]> {
  const list = getElementOrThrow(".md-search-result__list", el)
  const meta = getElementOrThrow(".md-search-result__meta", el)
  return pipe(

    /* Apply search result metadata */
    withLatestFrom(query$, ready$),
    map(([result, query]) => {
      if (query.value) {
        setSearchResultMeta(meta, result.length)
      } else {
        resetSearchResultMeta(meta)
      }
      return result
    }),

    /* Apply search result list */
    switchMap(result => fetch$
      .pipe(

        /* Defer repaint to next animation frame */
        observeOn(animationFrameScheduler),
        scan(index => {
          const container = el.parentElement!
          while (index < result.length) {
            addToSearchResultList(list, renderSearchResult(result[index++]))
            if (container.scrollHeight - container.offsetHeight > 16)
              break
          }
          return index
        }, 0),

        /* Re-map to search result */
        mapTo(result),

        /* Reset on complete or error */
        finalize(() => {
          resetSearchResultList(list)
        })
      )
    )
  )
}

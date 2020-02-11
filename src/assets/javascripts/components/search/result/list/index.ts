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
  mapTo,
  observeOn,
  scan,
  switchMap
} from "rxjs/operators"

import {
  addToSearchResultList,
  resetSearchResultList
} from "actions"
import { SearchResult } from "modules"
import { renderSearchResult } from "templates"
import { getElement } from "utilities"

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Options
 */
interface Options {
  render$: Observable<boolean>         /* Render trigger observable */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Paint search result list from source observable
 *
 * @param el - Search result element
 * @param options - Options
 *
 * @return Operator function
 */
export function paintSearchResultList(
  el: HTMLElement, { render$ }: Options
): MonoTypeOperatorFunction<SearchResult[]> {
  const container = el.parentElement!
  const list = getElement(".md-search-result__list", el)!
  return pipe(
    switchMap(result => render$
      .pipe(

        /* Defer repaint to next animation frame */
        observeOn(animationFrameScheduler),
        scan(index => {
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

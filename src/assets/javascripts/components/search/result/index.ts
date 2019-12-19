/*
 * Copyright (c) 2016-2019 Martin Donath <martin.donath@squidfunk.com>
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
import {
  MonoTypeOperatorFunction,
  Observable,
  animationFrameScheduler,
  pipe
} from "rxjs"
import {
  distinctUntilChanged,
  filter,
  finalize,
  map,
  mapTo,
  observeOn,
  scan,
  switchMap
} from "rxjs/operators"

import { addToSearchResultList, resetSearchResultList } from "actions"
import { SearchResult } from "modules"
import { renderSearchResult } from "templates"
import { ViewportSize, watchElementOffset } from "utilities"

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Options
 */
interface Options {
  size$: Observable<ViewportSize>      /* Viewport size observable */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Paint search result from source observable
 *
 * @param el - Search result element
 *
 * @return Operator function
 */
export function paintSearchResult(
  el: HTMLElement, { size$ }: Options
): MonoTypeOperatorFunction<SearchResult[]> {
  const container = el.parentElement!

  /* Compute whether the container is near the bottom offset */
  const render$ = watchElementOffset(container, { size$ })
    .pipe(
      map(({ y }) => y >= container.scrollHeight - container.offsetHeight - 16),
      distinctUntilChanged(),
      filter(identity)
    )

  /* Paint search results lazily */
  const [meta, list] = Array.from(el.children) as HTMLElement[]
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
        mapTo(result),

        /* Reset on complete or error */
        finalize(() => {
          resetSearchResultList(list)
        })
      )
    )
  )
}

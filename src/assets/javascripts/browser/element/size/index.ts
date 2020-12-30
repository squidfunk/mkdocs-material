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

import ResizeObserver from "resize-observer-polyfill"
import {
  NEVER,
  Observable,
  Subject,
  defer,
  of
} from "rxjs"
import {
  filter,
  finalize,
  map,
  shareReplay,
  startWith,
  switchMap,
  tap
} from "rxjs/operators"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Element offset
 */
export interface ElementSize {
  width: number                        /* Element width */
  height: number                       /* Element height */
}

/* ----------------------------------------------------------------------------
 * Data
 * ------------------------------------------------------------------------- */

/**
 * Resize observer entry subject
 */
const entry$ = new Subject<ResizeObserverEntry>()

/**
 * Resize observer observable
 *
 * This observable will create a `ResizeObserver` on the first subscription
 * and will automatically terminate it when there are no more subscribers.
 * It's quite important to centralize observation in a single `ResizeObserver`,
 * as the performance difference can be quite dramatic, as the link shows.
 *
 * @see https://bit.ly/3iIYfEm - Google Groups on performance
 */
const observer$ = defer(() => of(
  new ResizeObserver(entries => {
    for (const entry of entries)
      entry$.next(entry)
  })
))
  .pipe(
    switchMap(resize => NEVER.pipe(startWith(resize))
      .pipe(
        finalize(() => resize.disconnect())
      )
    ),
    shareReplay({ bufferSize: 1, refCount: true })
  )

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Retrieve element size
 *
 * @param el - Element
 *
 * @return Element size
 */
export function getElementSize(el: HTMLElement): ElementSize {
  return {
    width:  el.offsetWidth,
    height: el.offsetHeight
  }
}

/* ------------------------------------------------------------------------- */

/**
 * Watch element size
 *
 * This function returns an observable that will subscribe to a single internal
 * instance of `ResizeObserver` upon subscription, and emit resize events until
 * termination. Note that this function should not be called with the same
 * element twice, as the first unsubscription will terminate observation.
 *
 * @param el - Element
 *
 * @return Element size observable
 */
export function watchElementSize(
  el: HTMLElement
): Observable<ElementSize> {
  return observer$
    .pipe(
      tap(observer => observer.observe(el)),
      switchMap(observer => entry$
        .pipe(
          filter(({ target }) => target === el),
          finalize(() => observer.unobserve(el)),
          map(({ contentRect }) => ({
            width:  contentRect.width,
            height: contentRect.height
          }))
        )
      ),
      startWith(getElementSize(el))
    )
}

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
  Subject,
  defer,
  distinctUntilChanged,
  filter,
  finalize,
  map,
  merge,
  of,
  shareReplay,
  switchMap,
  tap
} from "rxjs"

import {
  getElementContentSize,
  getElementSize,
  watchElementContentOffset
} from "~/browser"

/* ----------------------------------------------------------------------------
 * Data
 * ------------------------------------------------------------------------- */

/**
 * Intersection observer entry subject
 */
const entry$ = new Subject<IntersectionObserverEntry>()

/**
 * Intersection observer observable
 *
 * This observable will create an `IntersectionObserver` on first subscription
 * and will automatically terminate it when there are no more subscribers.
 *
 * @see https://bit.ly/3iIYfEm - Google Groups on performance
 */
const observer$ = defer(() => of(
  new IntersectionObserver(entries => {
    for (const entry of entries)
      entry$.next(entry)
  }, {
    threshold: 0
  })
))
  .pipe(
    switchMap(observer => merge(NEVER, of(observer))
      .pipe(
        finalize(() => observer.disconnect())
      )
    ),
    shareReplay(1)
  )

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Watch element visibility
 *
 * @param el - Element
 *
 * @returns Element visibility observable
 */
export function watchElementVisibility(
  el: HTMLElement
): Observable<boolean> {
  return observer$
    .pipe(
      tap(observer => observer.observe(el)),
      switchMap(observer => entry$
        .pipe(
          filter(({ target }) => target === el),
          finalize(() => observer.unobserve(el)),
          map(({ isIntersecting }) => isIntersecting)
        )
      )
    )
}

/**
 * Watch element boundary
 *
 * This function returns an observable which emits whether the bottom content
 * boundary (= scroll offset) of an element is within a certain threshold.
 *
 * @param el - Element
 * @param threshold - Threshold
 *
 * @returns Element boundary observable
 */
export function watchElementBoundary(
  el: HTMLElement, threshold = 16
): Observable<boolean> {
  return watchElementContentOffset(el)
    .pipe(
      map(({ y }) => {
        const visible = getElementSize(el)
        const content = getElementContentSize(el)
        return y >= (
          content.height - visible.height - threshold
        )
      }),
      distinctUntilChanged()
    )
}

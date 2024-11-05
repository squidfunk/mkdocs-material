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
  EMPTY,
  Observable,
  fromEvent,
  fromEventPattern,
  map,
  merge,
  startWith,
  switchMap
} from "rxjs"

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Watch media query
 *
 * Note that although `MediaQueryList.addListener` is deprecated we have to
 * use it, because it's the only way to ensure proper downward compatibility.
 *
 * @see https://bit.ly/3dUBH2m - GitHub issue
 *
 * @param query - Media query
 *
 * @returns Media observable
 */
export function watchMedia(query: string): Observable<boolean> {
  const media = matchMedia(query)
  return fromEventPattern<boolean>(next => (
    media.addListener(() => next(media.matches))
  ))
    .pipe(
      startWith(media.matches)
    )
}

/**
 * Watch print mode
 *
 * @returns Print observable
 */
export function watchPrint(): Observable<boolean> {
  const media = matchMedia("print")
  return merge(
    fromEvent(window, "beforeprint").pipe(map(() => true)),
    fromEvent(window, "afterprint").pipe(map(() => false))
  )
    .pipe(
      startWith(media.matches)
    )
}

/* ------------------------------------------------------------------------- */

/**
 * Toggle an observable with a media observable
 *
 * @template T - Data type
 *
 * @param query$ - Media observable
 * @param factory - Observable factory
 *
 * @returns Toggled observable
 */
export function at<T>(
  query$: Observable<boolean>, factory: () => Observable<T>
): Observable<T> {
  return query$
    .pipe(
      switchMap(active => active ? factory() : EMPTY)
    )
}

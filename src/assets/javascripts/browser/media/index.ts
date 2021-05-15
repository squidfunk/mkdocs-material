/*
 * Copyright (c) 2016-2021 Martin Donath <martin.donath@squidfunk.com>
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
  fromEvent,
  fromEventPattern
} from "rxjs"
import {
  mapTo,
  startWith,
  switchMap
} from "rxjs/operators"

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
 * Watch print mode, cross-browser
 *
 * @returns Print mode observable
 */
export function watchPrint(): Observable<void> {
  return fromEvent(window, "beforeprint")
    .pipe(
      mapTo(undefined)
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
      switchMap(active => active ? factory() : NEVER)
    )
}

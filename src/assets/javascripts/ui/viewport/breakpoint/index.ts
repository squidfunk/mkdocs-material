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

import {
  Observable,
  OperatorFunction,
  fromEventPattern
} from "rxjs"
import {
  filter,
  shareReplay,
  startWith,
  windowToggle
} from "rxjs/operators"

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Create an observable for a media query
 *
 * @param query - Media query
 *
 * @return Media query observable
 */
export function fromMediaQuery(query: string): Observable<boolean> {
  const media = window.matchMedia(query)
  return fromEventPattern<boolean>(next =>
    media.addListener(() => next(media.matches))
  )
    .pipe(
      startWith(media.matches),
      shareReplay(1)
    )
}

/**
 * Only emit values from the source observable when a media query matches
 *
 * @template T - Observable value type
 *
 * @param query - Media query observable
 *
 * @return Observable of source observable values
 */
export function withMediaQuery<T>(
  query$: Observable<boolean>
): OperatorFunction<T, Observable<T>> {
  const start$ = query$.pipe(filter(match => match === true))
  const until$ = query$.pipe(filter(match => match === false))
  return windowToggle<T, boolean>(start$, () => until$)
}

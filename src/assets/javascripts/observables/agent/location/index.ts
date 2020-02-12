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

import { Observable, Subject, fromEvent } from "rxjs"
import { filter, map, share } from "rxjs/operators"

/* ----------------------------------------------------------------------------
 * Data
 * ------------------------------------------------------------------------- */

/**
 * Observable for window hash change events
 */
const hashchange$ = fromEvent<HashChangeEvent>(window, "hashchange")

/**
 * Observable for window pop state events
 */
const popstate$ = fromEvent<PopStateEvent>(window, "popstate")

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Watch location
 *
 * @return Location subject
 */
export function watchLocation(): Subject<string> {
  const location$ = new Subject<string>()
  popstate$
    .pipe(
      map(() => location.href),
      share()
    )
      .subscribe(location$)

  /* Return subject */
  return location$
}

/**
 * Watch location hash
 *
 * @return Location hash observable
 */
export function watchLocationHash(): Observable<string> {
  return hashchange$
    .pipe(
      map(() => location.hash),
      filter(hash => hash.length > 0),
      share()
    )
}

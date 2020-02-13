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

import { Observable, combineLatest, fromEvent } from "rxjs"
import {
  distinctUntilChanged,
  map,
  shareReplay,
  startWith
} from "rxjs/operators"

import { watchElementFocus } from "../../agent"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Search query
 */
export interface SearchQuery {
  value: string                        /* Query value */
  focus: boolean                       /* Query focus */
}

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Watch options
 */
interface WatchOptions {
  transform?(value: string): string    /* Transformation function */
}

/* ----------------------------------------------------------------------------
 * Helper functions
 * ------------------------------------------------------------------------- */

/**
 * Default transformation function
 *
 * Rogue control characters are filtered before handing the query to the
 * search index, as lunr will throw otherwise.
 *
 * @param value - Query value
 *
 * @return Transformed query value
 */
function defaultTransform(value: string): string {
  return value
    .replace(/(?:^|\s+)[*+-:^~]+(?=\s+|$)/g, "")
    .trim()
    .replace(/\s+|\b$/g, "* ")
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Watch search query
 *
 * @param el - Search query element
 * @param options - Options
 *
 * @return Search query observable
 */
export function watchSearchQuery(
  el: HTMLInputElement, { transform = defaultTransform }: WatchOptions = {}
): Observable<SearchQuery> {

  /* Intercept keyboard events */
  const value$ = fromEvent(el, "keyup")
    .pipe(
      map(() => transform(el.value)),
      startWith(transform(el.value)),
      distinctUntilChanged()
    )

  /* Intercept focus events */
  const focus$ = watchElementFocus(el)

  /* Combine into a single hot observable */
  return combineLatest([value$, focus$])
    .pipe(
      map(([value, focus]) => ({ value, focus })),
      shareReplay(1)
    )
}

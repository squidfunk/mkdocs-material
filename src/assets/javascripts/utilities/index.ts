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

import { Observable, OperatorFunction } from "rxjs"
import { filter, windowToggle } from "rxjs/operators"

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Convert a HTML collection to an array
 *
 * @template T - HTML element type
 *
 * @param collection - HTML collection
 *
 * @return Array of HTML elements
 */
export function toArray<
  T extends HTMLElement
>(collection: HTMLCollection | NodeListOf<T>): T[] {
  return Array.from(collection) as T[]
}

/* ----------------------------------------------------------------------------
 * Operators
 * ------------------------------------------------------------------------- */

/**
 * Toggle emission from a source observable
 *
 * @template T - Observable value type
 *
 * @param toggle$ - Toggle observable
 *
 * @return Observable of source observables
 */
export function toggle<T>(
  toggle$: Observable<boolean>
): OperatorFunction<T, Observable<T>> {
  const start$ = toggle$.pipe(filter(match => match === true))
  const until$ = toggle$.pipe(filter(match => match === false))
  return windowToggle<T, boolean>(start$, () => until$)
}

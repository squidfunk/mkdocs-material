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

import { Observable, of } from "rxjs"
import { shareReplay } from "rxjs/operators"

import { getElement, getElements } from "../../ui"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Navigation index
 */
export type NavigationIndex = Map<HTMLInputElement, HTMLElement>

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Set navigation overflow scrolling
 *
 * @param nav - Navigation element
 * @param active - Whether overflow scrolling is active
 */
export function setNavigationOverflowScrolling(
  nav: HTMLElement, active: boolean
): void {
  nav.style.webkitOverflowScrolling = active ? "touch" : ""
}

/* ------------------------------------------------------------------------- */

/**
 * Create an observable to index all navigation elements
 *
 * @param nav - Top-level navigation element
 *
 * @return Navigation index observable
 */
export function watchNavigationIndex(
  nav: HTMLElement
): Observable<NavigationIndex> {
  const list = getElements("nav", nav)

  /* Build index to map inputs to navigation lists */
  const index = new Map<HTMLInputElement, HTMLElement>()
  for (const item of list) {
    const label = getElement<HTMLLabelElement>("label", item)!
    if (typeof label !== "undefined") {
      const input = getElement<HTMLInputElement>(`#${label.htmlFor}`)!
      index.set(input, item)
    }
  }

  /* Return navigation index */
  return of(index)
    .pipe(
      shareReplay({ bufferSize: 1, refCount: true })
    )
}

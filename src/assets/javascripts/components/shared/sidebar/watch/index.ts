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

import { Observable, combineLatest } from "rxjs"
import {
  distinctUntilChanged,
  distinctUntilKeyChanged,
  map,
  withLatestFrom
} from "rxjs/operators"

import { Viewport } from "observables"

import { Main } from "../../../main"
import { Sidebar } from "../_"

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Watch options
 */
interface WatchOptions {
  main$: Observable<Main>              /* Main area observable */
  viewport$: Observable<Viewport>      /* Viewport observable */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Watch sidebar
 *
 * This function returns an observable that computes the visual parameters of
 * the sidebar which depends on the vertical viewport offset, as well as the
 * height of the main area. When the page is scrolled beyond the header, the
 * sidebar is locked and fills the remaining space.
 *
 * @param el - Sidebar element
 * @param options - Options
 *
 * @return Sidebar observable
 */
export function watchSidebar(
  el: HTMLElement, { main$, viewport$ }: WatchOptions
): Observable<Sidebar> {

  /* Adjust for internal main area offset */
  const adjust$ = viewport$
    .pipe(
      distinctUntilKeyChanged("size"),
      map(() => parseFloat(
        getComputedStyle(el.parentElement!)
          .getPropertyValue("padding-top")
      )),
      distinctUntilChanged()
    )

  /* Compute the sidebar's available height */
  const height$ = viewport$
    .pipe(
      withLatestFrom(adjust$, main$),
      map(([{ offset: { y } }, adjust, { offset, height }]) => (
        height
          + Math.min(adjust, Math.max(0, y - offset))
          - adjust
      )),
      distinctUntilChanged()
    )

  /* Compute whether the sidebar should be locked */
  const lock$ = viewport$
    .pipe(
      withLatestFrom(adjust$, main$),
      map(([{ offset: { y } }, adjust, { offset }]) => (
        y >= offset + adjust
      )),
      distinctUntilChanged()
    )

  /* Combine into single observable */
  return combineLatest([height$, lock$])
    .pipe(
      map(([height, lock]) => ({ height, lock }))
    )
}

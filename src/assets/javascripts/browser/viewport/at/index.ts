/*
 * Copyright (c) 2016-2022 Martin Donath <martin.donath@squidfunk.com>
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
  combineLatest,
  distinctUntilKeyChanged,
  map
} from "rxjs"

import { Header } from "~/components"

import { getElementOffset } from "../../element"
import { Viewport } from "../_"

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Watch options
 */
interface WatchOptions {
  viewport$: Observable<Viewport>      /* Viewport observable */
  header$: Observable<Header>          /* Header observable */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Watch viewport relative to element
 *
 * @param el - Element
 * @param options - Options
 *
 * @returns Viewport observable
 */
export function watchViewportAt(
  el: HTMLElement, { viewport$, header$ }: WatchOptions
): Observable<Viewport> {
  const size$ = viewport$
    .pipe(
      distinctUntilKeyChanged("size")
    )

  /* Compute element offset */
  const offset$ = combineLatest([size$, header$])
    .pipe(
      map(() => getElementOffset(el))
    )

  /* Compute relative viewport, return hot observable */
  return combineLatest([header$, viewport$, offset$])
    .pipe(
      map(([{ height }, { offset, size }, { x, y }]) => ({
        offset: {
          x: offset.x - x,
          y: offset.y - y + height
        },
        size
      }))
    )
}

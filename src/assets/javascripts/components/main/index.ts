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
  Observable,
  combineLatest
} from "rxjs"
import {
  distinctUntilChanged,
  distinctUntilKeyChanged,
  map,
  switchMap
} from "rxjs/operators"

import { Viewport, watchElementSize } from "~/browser"

import { Header } from "../header"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Main area
 */
export interface Main {
  offset: number                       /* Main area top offset */
  height: number                       /* Main area visible height */
  active: boolean                      /* User scrolled past header */
}

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
 * Watch main area
 *
 * This function returns an observable that computes the visual parameters of
 * the main area which depends on the viewport vertical offset and height, as
 * well as the height of the header element, if the header is fixed.
 *
 * @param el - Main area element
 * @param options - Options
 *
 * @returns Main area observable
 */
export function watchMain(
  el: HTMLElement, { viewport$, header$ }: WatchOptions
): Observable<Main> {

  /* Compute necessary adjustment for header */
  const adjust$ = header$
    .pipe(
      map(({ height }) => height),
      distinctUntilChanged()
    )

  /* Compute the main area's top and bottom borders */
  const border$ = adjust$
    .pipe(
      switchMap(() => watchElementSize(el)
        .pipe(
          map(({ height }) => ({
            top:    el.offsetTop,
            bottom: el.offsetTop + height
          })),
          distinctUntilKeyChanged("bottom")
        )
      )
    )

  /* Compute the main area's offset, visible height and if we scrolled past */
  return combineLatest([adjust$, border$, viewport$])
    .pipe(
      map(([header, { top, bottom }, { offset: { y }, size: { height } }]) => {
        height = Math.max(0, height
          - Math.max(0, top    - y,  header)
          - Math.max(0, height + y - bottom)
        )
        return {
          offset: top - header,
          height,
          active: top - header + 1 < y
        }
      }),
      distinctUntilChanged((a, b) => (
        a.offset === b.offset &&
        a.height === b.height &&
        a.active === b.active
      ))
    )
}

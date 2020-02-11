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
  map,
  shareReplay,
  switchMapTo
} from "rxjs/operators"

import { Agent, ViewportOffset } from "utilities"

import { HeaderState } from "../_"

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Options
 */
interface Options {
  header$: Observable<HeaderState>     /* Header state observable */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Watch viewport offset relative to an element's top
 *
 * This function returns an observable that computes the relative offset to the
 * top of the given element based on the current viewport offset.
 *
 * @param el - HTML element
 * @param agent - Agent
 * @param options - Options
 *
 * @return Viewport offset observable
 */
export function watchViewportOffsetFromTopOf(
  el: HTMLElement, { viewport }: Agent, { header$ }: Options
): Observable<ViewportOffset> {

  /* Compute necessary adjustment for offset */
  const adjust$ = viewport.size$
    .pipe(
      switchMapTo(header$),
      map(({ height }) => el.offsetTop - height),
      distinctUntilChanged()
    )

  /* Compute relative offset and return as hot observable */
  return combineLatest([viewport.offset$, adjust$])
    .pipe(
      map(([{ x, y }, adjust]) => ({ x, y: y - adjust })),
      shareReplay(1)
    )
}

/**
 * Watch viewport offset relative to an element's bottom
 *
 * This function returns an observable that computes the relative offset to the
 * bottom of the given element based on the current viewport offset.
 *
 * @param el - HTML element
 * @param agent - Agent
 * @param options - Options
 *
 * @return Viewport offset observable
 */
export function watchViewportOffsetFromBottomOf(
  el: HTMLElement, { viewport }: Agent, { header$ }: Options
): Observable<ViewportOffset> {

  /* Compute necessary adjustment for offset */
  const adjust$ = viewport.size$
    .pipe(
      switchMapTo(header$),
      map(({ height }) => el.offsetTop + el.offsetHeight - height),
      distinctUntilChanged()
    )

  /* Compute relative offset and return as hot observable */
  return combineLatest([viewport.offset$, adjust$])
    .pipe(
      map(([{ x, y }, adjust]) => ({ x, y: y - adjust })),
      shareReplay(1)
    )
}

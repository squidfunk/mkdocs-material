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

import ResizeObserver from "resize-observer-polyfill"
import { Observable, fromEventPattern } from "rxjs"
import { shareReplay, startWith } from "rxjs/operators"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Element offset
 */
export interface ElementSize {
  width: number                        /* Element width */
  height: number                       /* Element height */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Retrieve element size
 *
 * @param el - Element
 *
 * @return Element size
 */
export function getElementSize(el: HTMLElement): ElementSize {
  return {
    width:  el.offsetWidth,
    height: el.offsetHeight
  }
}

/* ------------------------------------------------------------------------- */

/**
 * Watch element size
 *
 * @param el - Element
 *
 * @return Element size observable
 */
export function watchElementSize(
  el: HTMLElement
): Observable<ElementSize> {
  return fromEventPattern<ElementSize>(next => {
    new ResizeObserver(([{ contentRect }]) => next({
      width:  Math.round(contentRect.width),
      height: Math.round(contentRect.height)
    }))
      .observe(el)
  })
    .pipe(
      startWith(getElementSize(el)),
      shareReplay(1)
    )
}

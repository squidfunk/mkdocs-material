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

import { Observable, fromEvent, merge } from "rxjs"
import { map, startWith } from "rxjs/operators"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Viewport offset
 */
export interface ViewportOffset {
  x: number                            /* Horizontal offset */
  y: number                            /* Vertical offset */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Retrieve viewport offset
 *
 * On iOS Safari, viewport offset can be negative due to overflow scrolling.
 * As this may induce strange behaviors downstream, we'll just limit it to 0.
 *
 * @return Viewport offset
 */
export function getViewportOffset(): ViewportOffset {
  return {
    x: Math.max(0, pageXOffset),
    y: Math.max(0, pageYOffset)
  }
}

/**
 * Set viewport offset
 *
 * @param offset - Viewport offset
 */
export function setViewportOffset(
  { x, y }: Partial<ViewportOffset>
): void {
  window.scrollTo(x || 0, y || 0)
}

/* ------------------------------------------------------------------------- */

/**
 * Watch viewport offset
 *
 * @return Viewport offset observable
 */
export function watchViewportOffset(): Observable<ViewportOffset> {
  return merge(
    fromEvent(window, "scroll", { passive: true }),
    fromEvent(window, "resize", { passive: true })
  )
    .pipe(
      map(getViewportOffset),
      startWith(getViewportOffset())
    )
}

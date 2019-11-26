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

import { Observable, fromEvent, merge } from "rxjs"
import { map, shareReplay, startWith } from "rxjs/operators"

/* ----------------------------------------------------------------------------
 * Data
 * ------------------------------------------------------------------------- */

/**
 * Observable for window scroll events
 */
const scroll$ = fromEvent<UIEvent>(window, "scroll")

/**
 * Observable for window resize events
 */
const resize$ = fromEvent<UIEvent>(window, "resize")

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

/**
 * Viewport size
 */
export interface ViewportSize {
  width: number                        /* Viewport width */
  height: number                       /* Viewport height */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Retrieve viewport offset
 *
 * @return Viewport offset
 */
export function getViewportOffset(): ViewportOffset {
  return {
    x: pageXOffset,
    y: pageYOffset
  }
}

/**
 * Retrieve viewport size
 *
 * @return Viewport size
 */
export function getViewportSize(): ViewportSize {
  return {
    width:  innerWidth,
    height: innerHeight
  }
}

/* ------------------------------------------------------------------------- */

/**
 * Watch viewport offset
 *
 * @return Viewport offset observable
 */
export function watchViewportOffset(): Observable<ViewportOffset> {
  return merge(scroll$, resize$)
    .pipe(
      map(getViewportOffset),
      startWith(getViewportOffset()),
      shareReplay(1)
    )
}

/**
 * Watch viewport size
 *
 * @return Viewport size observable
 */
export function watchViewportSize(): Observable<ViewportSize> {
  return resize$
    .pipe(
      map(getViewportSize),
      startWith(getViewportSize()),
      shareReplay(1)
    )
}

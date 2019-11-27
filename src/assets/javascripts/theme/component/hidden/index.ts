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

import { OperatorFunction, animationFrameScheduler, pipe } from "rxjs"
import {
  distinctUntilChanged,
  finalize,
  map,
  observeOn,
  tap
} from "rxjs/operators"

import { ViewportOffset } from "../../../ui"
import { resetHidden, setHidden } from "../../action"

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Paint hideable from source observable
 *
 * @param el - Hideable element
 * @param offset - Additional offset
 *
 * @return Operator function
 */
export function paintHidden(
  el: HTMLElement, offset: number = 0
): OperatorFunction<ViewportOffset, boolean> {
  return pipe(
    map(({ y }) => y >= offset),
    distinctUntilChanged(),

    /* Defer repaint to next animation frame */
    observeOn(animationFrameScheduler),
    tap(value => {
      setHidden(el, value)
    }),

    /* Reset on complete or error */
    finalize(() => {
      resetHidden(el)
    })
  )
}

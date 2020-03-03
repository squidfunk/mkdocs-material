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

import {
  MonoTypeOperatorFunction,
  animationFrameScheduler,
  pipe
} from "rxjs"
import {
  delay,
  finalize,
  observeOn,
  tap
} from "rxjs/operators"

import { getElementOrThrow } from "observables"

import { NavigationLayer } from "../_"
import {
  resetOverflowScrolling,
  setOverflowScrolling
} from "../apply"

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Paint navigation layer
 *
 * @param els - Navigation elements
 *
 * @return Operator function
 */
export function paintNavigationLayer(
  els: HTMLElement[]
): MonoTypeOperatorFunction<NavigationLayer> {
  return pipe(

    /* Defer repaint to next animation frame */
    observeOn(animationFrameScheduler),
    tap(({ prev }) => {
      if (prev)
        resetOverflowScrolling(prev)
    }),

    /* Wait until transition has finished */
    delay(250),

    /* Defer repaint to next animation frame */
    observeOn(animationFrameScheduler),
    tap(({ next }) => {
      setOverflowScrolling(next)
    }),

    /* Reset on complete or error */
    finalize(() => {
      for (const el of els)
        resetOverflowScrolling(
          getElementOrThrow(".md-nav__list", el)
        )
    })
  )
}

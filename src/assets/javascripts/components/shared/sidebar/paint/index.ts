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
  Observable,
  animationFrameScheduler,
  pipe
} from "rxjs"
import {
  finalize,
  map,
  observeOn,
  tap,
  withLatestFrom
} from "rxjs/operators"

import { Header } from "../../../header"
import { Sidebar } from "../_"
import {
  resetSidebarHeight,
  resetSidebarLock,
  resetSidebarOffset,
  setSidebarHeight,
  setSidebarLock,
  setSidebarOffset
} from "../apply"

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Paint options
 */
interface PaintOptions {
  header$: Observable<Header>          /* Header observable */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Paint sidebar
 *
 * @param el - Sidebar element
 * @param options - Options
 *
 * @return Operator function
 */
export function paintSidebar(
  el: HTMLElement, { header$ }: PaintOptions
): MonoTypeOperatorFunction<Sidebar> {
  return pipe(

    /* Defer repaint to next animation frame */
    observeOn(animationFrameScheduler),
    withLatestFrom(header$),
    tap(([{ height, lock }, { height: offset }]) => {
      setSidebarHeight(el, height)
      setSidebarLock(el, lock)

      /* Set offset in locked state depending on header height */
      if (lock)
        setSidebarOffset(el, offset)
      else
        resetSidebarOffset(el)
    }),

    /* Re-map to sidebar */
    map(([sidebar]) => sidebar),

    /* Reset on complete or error */
    finalize(() => {
      resetSidebarOffset(el)
      resetSidebarHeight(el)
      resetSidebarLock(el)
    })
  )
}

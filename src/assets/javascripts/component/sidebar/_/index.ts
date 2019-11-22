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

import { equals } from "ramda"
import {
  MonoTypeOperatorFunction,
  Observable,
  animationFrameScheduler,
  combineLatest,
  pipe
} from "rxjs"
import {
  distinctUntilChanged,
  finalize,
  map,
  observeOn,
  shareReplay,
  tap
} from "rxjs/operators"

import { ViewportOffset } from "../../../ui"
import { Main } from "../../main"
import {
  resetSidebarHeight,
  resetSidebarLock,
  setSidebarHeight,
  setSidebarLock
} from "../element"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Sidebar
 */
export interface Sidebar {
  height: number                       /* Sidebar height */
  lock: boolean                        /* Sidebar lock */
}

/* ----------------------------------------------------------------------------
 * Function types
 * ------------------------------------------------------------------------- */

/**
 * Watch options
 */
interface WatchOptions {
  offset$: Observable<ViewportOffset>  /* Viewport offset observable */
  main$: Observable<Main>              /* Main area observable */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Create an observable to watch a sidebar
 *
 * @param el - Sidebar element
 * @param options - Options
 *
 * @return Sidebar observable
 */
export function watchSidebar(
  el: HTMLElement, { offset$, main$ }: WatchOptions
): Observable<Sidebar> {

  /* Adjust for internal main area offset */
  const adjust = parseFloat(
    getComputedStyle(el.parentElement!)
      .getPropertyValue("padding-top")
  )

  /* Compute the sidebar's available height */
  const height$ = combineLatest(offset$, main$)
    .pipe(
      map(([{ y }, { offset, height }]) => {
        return height - adjust + Math.min(adjust, Math.max(0, y - offset))
      })
    )

  /* Compute whether the sidebar should be locked */
  const lock$ = combineLatest(offset$, main$)
    .pipe(
      map(([{ y }, { offset }]) => y >= offset + adjust)
    )

  /* Combine into single hot observable */
  return combineLatest(height$, lock$)
    .pipe(
      map(([height, lock]) => ({ height, lock })),
      distinctUntilChanged<Sidebar>(equals),
      shareReplay({ bufferSize: 1, refCount: true })
    )
}

/* ------------------------------------------------------------------------- */

/**
 * Paint sidebar from source observable
 *
 * @param el - Sidebar element
 *
 * @return Operator function
 */
export function paintSidebar(
  el: HTMLElement
): MonoTypeOperatorFunction<Sidebar> {
  return pipe(

    /* Defer repaint to next animation frame */
    observeOn(animationFrameScheduler),
    tap(({ height, lock }) => {
      setSidebarHeight(el, height)
      setSidebarLock(el, lock)
    }),

    /* Reset on complete or error */
    finalize(() => {
      resetSidebarHeight(el)
      resetSidebarLock(el)
    })
  )
}

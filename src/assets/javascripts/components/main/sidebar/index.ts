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

import {
  resetSidebarHeight,
  resetSidebarLock,
  setSidebarHeight,
  setSidebarLock
} from "actions"
import { Agent } from "utilities"

import { MainState } from "../_"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Sidebar state
 */
export interface SidebarState {
  height: number                       /* Sidebar height */
  lock: boolean                        /* Sidebar lock */
}

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Options
 */
interface Options {
  main$: Observable<MainState>         /* Main area state observable */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Watch sidebar
 *
 * This function returns an observable that computes the visual parameters of
 * the sidebar which depends on the vertical viewport offset, as well as the
 * height of the main area. When the page is scrolled beyond the header, the
 * sidebar is locked and fills the remaining space.
 *
 * @param el - Sidebar element
 * @param agent - Agent
 * @param options - Options
 *
 * @return Sidebar state observable
 */
export function watchSidebar(
  el: HTMLElement, { viewport }: Agent, { main$ }: Options
): Observable<SidebarState> {

  /* Adjust for internal main area offset */
  const adjust = parseFloat(
    getComputedStyle(el.parentElement!)
      .getPropertyValue("padding-top")
  )

  /* Compute the sidebar's available height */
  const height$ = combineLatest([viewport.offset$, main$])
    .pipe(
      map(([{ y }, { offset, height }]) => {
        return height - adjust + Math.min(adjust, Math.max(0, y - offset))
      })
    )

  /* Compute whether the sidebar should be locked */
  const lock$ = combineLatest([viewport.offset$, main$])
    .pipe(
      map(([{ y }, { offset }]) => y >= offset + adjust)
    )

  /* Combine into single hot observable */
  return combineLatest([height$, lock$])
    .pipe(
      map(([height, lock]) => ({ height, lock })),
      distinctUntilChanged<SidebarState>(equals),
      shareReplay(1)
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
): MonoTypeOperatorFunction<SidebarState> {
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

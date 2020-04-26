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
  combineLatest,
  pipe
} from "rxjs"
import {
  distinctUntilChanged,
  finalize,
  map,
  observeOn,
  tap,
  withLatestFrom
} from "rxjs/operators"

import { Viewport } from "browser"

import { Header } from "../../../header"
import { Main } from "../../../main"
import { Sidebar } from "../_"
import {
  resetSidebarHeight,
  resetSidebarOffset,
  setSidebarHeight,
  setSidebarOffset
} from "../set"

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Watch options
 */
interface WatchOptions {
  main$: Observable<Main>              /* Main area observable */
  viewport$: Observable<Viewport>      /* Viewport observable */
}

/**
 * Apply options
 */
interface ApplyOptions {
  header$: Observable<Header>          /* Header observable */
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
 * @param options - Options
 *
 * @return Sidebar observable
 */
export function watchSidebar(
  el: HTMLElement, { main$, viewport$ }: WatchOptions
): Observable<Sidebar> {
  const adjust = el.parentElement!.offsetTop
               - el.parentElement!.parentElement!.offsetTop

  /* Compute the sidebar's available height and if it should be locked */
  return combineLatest([main$, viewport$])
    .pipe(
      map(([{ offset, height }, { offset: { y } }]) => {
        height = height
          + Math.min(adjust, Math.max(0, y - offset))
          - adjust
        return {
          height,
          lock: y >= offset + adjust
        }
      }),
      distinctUntilChanged<Sidebar>((a, b) => {
        return a.height === b.height
            && a.lock   === b.lock
      })
    )
}

/* ------------------------------------------------------------------------- */

/**
 * Apply sidebar
 *
 * @param el - Sidebar element
 * @param options - Options
 *
 * @return Operator function
 */
export function applySidebar(
  el: HTMLElement, { header$ }: ApplyOptions
): MonoTypeOperatorFunction<Sidebar> {
  return pipe(

    /* Defer repaint to next animation frame */
    observeOn(animationFrameScheduler),
    withLatestFrom(header$),
    tap(([{ height, lock }, { height: offset }]) => {
      setSidebarHeight(el, height)

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
    })
  )
}

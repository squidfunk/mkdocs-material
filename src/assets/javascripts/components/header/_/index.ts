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
  Observable,
  Subject,
  animationFrameScheduler,
  defer,
  of
} from "rxjs"
import {
  combineLatestWith,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  map,
  observeOn,
  shareReplay
} from "rxjs/operators"

import { resetHeaderState, setHeaderState } from "~/actions"
import { Viewport, watchElementSize } from "~/browser"

import { Component } from "../../_"
import { Main } from "../../main"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Header
 */
export interface Header {
  sticky: boolean                      /* Header stickyness */
  height: number                       /* Header visible height */
}

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Mount options
 */
interface MountOptions {
  viewport$: Observable<Viewport>      /* Viewport observable */
  header$: Observable<Header>          /* Header observable */
  main$: Observable<Main>              /* Main area observable */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Watch header
 *
 * @param el - Header element
 *
 * @returns Header observable
 */
export function watchHeader(
  el: HTMLElement
): Observable<Header> {
  return defer(() => {
    const styles = getComputedStyle(el)
    return of(
      styles.position === "sticky" ||
      styles.position === "-webkit-sticky"
    )
  })
    .pipe(
      combineLatestWith(watchElementSize(el)),
      map(([sticky, { height }]) => ({
        sticky,
        height: sticky ? height : 0
      })),
      distinctUntilChanged((a, b) => (
        a.sticky === b.sticky &&
        a.height === b.height
      ))
    )
}

/**
 * Mount header
 *
 * The header must be connected to the main area observable outside of the
 * operator function, as the header will persist in-between document switches
 * while the main area is replaced. However, the header observable must be
 * passed to this function, so we connect both via a long-living subject.
 *
 * @param el - Header element
 * @param options - Options
 *
 * @returns Header component observable
 */
export function mountHeader(
  el: HTMLElement, { header$, main$ }: MountOptions
): Observable<Component<Header>> {
  const internal$ = new Subject<Main>()
  internal$
    .pipe(
      distinctUntilKeyChanged("active"),
      observeOn(animationFrameScheduler)
    )
      .subscribe(({ active }) => {
        if (active)
          setHeaderState(el, "shadow")
        else
          resetHeaderState(el)
      })

  /* Connect to long-living subject and return component */
  main$.subscribe(main => internal$.next(main))
  return header$
    .pipe(
      map(state => ({ ref: el, ...state })),
      shareReplay(1)
    )
}

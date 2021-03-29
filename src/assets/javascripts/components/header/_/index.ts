/*
 * Copyright (c) 2016-2021 Martin Donath <martin.donath@squidfunk.com>
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
  combineLatest,
  defer,
  of
} from "rxjs"
import {
  bufferCount,
  combineLatestWith,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  filter,
  map,
  observeOn,
  shareReplay,
  startWith,
  switchMap
} from "rxjs/operators"

import { feature } from "~/_"
import { resetHeaderState, setHeaderState } from "~/actions"
import {
  Viewport,
  watchElementSize,
  watchToggle
} from "~/browser"

import { Component } from "../../_"
import { Main } from "../../main"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Header
 */
export interface Header {
  height: number                       /* Header visible height */
  sticky: boolean                      /* Header stickyness */
  hidden: boolean                      /* User scrolled past threshold */
}

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Watch options
 */
interface WatchOptions {
  viewport$: Observable<Viewport>      /* Viewport observable */
}

/**
 * Mount options
 */
interface MountOptions {
  viewport$: Observable<Viewport>      /* Viewport observable */
  header$: Observable<Header>          /* Header observable */
  main$: Observable<Main>              /* Main area observable */
}

/* ----------------------------------------------------------------------------
 * Helper functions
 * ------------------------------------------------------------------------- */

/**
 * Compute whether the header is hidden
 *
 * If the user scrolls past a certain threshold, the header can be hidden when
 * scrolling down, and shown when scrolling up.
 *
 * @param options - Options
 *
 * @returns Toggle observable
 */
function isHidden({ viewport$ }: WatchOptions): Observable<boolean> {
  if (!feature("header.autohide"))
    return of(false)

  /* Compute direction and turning point */
  const direction$ = viewport$
    .pipe(
      map(({ offset: { y } }) => y),
      bufferCount(2, 1),
      map(([a, b]) => [a < b, b] as const),
      distinctUntilKeyChanged(0)
    )

  /* Compute whether header should be hidden */
  const hidden$ = combineLatest([viewport$, direction$])
    .pipe(
      filter(([{ offset }, [, y]]) => Math.abs(y - offset.y) > 100),
      map(([, [direction]]) => direction),
      distinctUntilChanged()
    )

  /* Compute threshold for hiding */
  const search$ = watchToggle("search")
  return combineLatest([viewport$, search$])
    .pipe(
      map(([{ offset }, search]) => offset.y > 400 && !search),
      distinctUntilChanged(),
      switchMap(active => active ? hidden$ : of(false)),
      startWith(false)
    )
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Watch header
 *
 * @param el - Header element
 * @param options - Options
 *
 * @returns Header observable
 */
export function watchHeader(
  el: HTMLElement, options: WatchOptions
): Observable<Header> {
  return defer(() => {
    const styles = getComputedStyle(el)
    return of(
      styles.position === "sticky" ||
      styles.position === "-webkit-sticky"
    )
  })
    .pipe(
      combineLatestWith(watchElementSize(el), isHidden(options)),
      map(([sticky, { height }, hidden]) => ({
        height: sticky ? height : 0,
        sticky,
        hidden
      })),
      distinctUntilChanged((a, b) => (
        a.sticky === b.sticky &&
        a.height === b.height &&
        a.hidden === b.hidden
      )),
      shareReplay(1)
    )
}

/**
 * Mount header
 *
 * This function manages the different states of the header, i.e. whether it's
 * hidden or rendered with a shadow. This depends heavily on the main area.
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
      combineLatestWith(header$),
      observeOn(animationFrameScheduler)
    )
      .subscribe(([{ active }, { hidden }]) => {
        if (active)
          setHeaderState(el, hidden ? "hidden" : "shadow")
        else
          resetHeaderState(el)
      })

  /* Connect to long-living subject and return component */
  main$.subscribe(main => internal$.next(main))
  return header$
    .pipe(
      map(state => ({ ref: el, ...state }))
    )
}

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

import { animationFrameScheduler, interval, of } from "rxjs"
import { concatMap, concatMapTo, filter, finalize, mapTo, mergeMap, skipUntil, startWith, switchMap, takeUntil, tap, throttleTime, windowToggle } from "rxjs/operators"
import {
  fromContainer,
  fromSidebar,
  setSidebarHeight,
  setSidebarLock,
  unsetSidebarHeight,
  unsetSidebarLock,
  withToggle
} from "./component"
import {
  fromMediaQuery,
  fromViewportOffset,
  fromViewportSize,
  getElement,
  withMediaQuery,
} from "./ui"

// ----------------------------------------------------------------------------

const offset$ = fromViewportOffset()
const size$   = fromViewportSize()

const screenAndAbove$ = fromMediaQuery("(min-width: 1220px)")
const tabletAndAbove$ = fromMediaQuery("(min-width: 960px)")

// ----------------------------------------------------------------------------

// modernizr for the poor
document.documentElement.classList.remove("no-js")
document.documentElement.classList.add("js")

// ----------------------------------------------------------------------------
// sidebar lock + height
// ----------------------------------------------------------------------------

const container = getElement("[data-md-component=container]")!
const header    = getElement("[data-md-component=header]")!

const container$ = fromContainer(container, header, { size$, offset$ })

// ---

const nav = getElement("[data-md-component=navigation")!

fromSidebar(nav, { container$, offset$ })
  .pipe(
    withMediaQuery(screenAndAbove$),
    concatMap(sidebar$ => sidebar$.pipe(
      finalize(() => {
        unsetSidebarHeight(nav)
        unsetSidebarLock(nav)
      })
    ))
  )
    .subscribe(({ height, lock }) => {
      setSidebarHeight(nav, height)
      setSidebarLock(nav, lock)
    })

const toc = getElement("[data-md-component=toc")!

fromSidebar(toc, { container$, offset$ })
  .pipe(
    withMediaQuery(tabletAndAbove$),
    concatMap(sidebar$ => sidebar$.pipe(
      finalize(() => {
        unsetSidebarHeight(toc)
        unsetSidebarLock(toc)
      })
    ))
  )
    .subscribe(({ height, lock }) => {
      setSidebarHeight(toc, height)
      setSidebarLock(toc, lock)
    })

// ----------------------------------------------------------------------------

export function app(config: any) {
  // TODO:
  let parent = container.parentElement as HTMLElement
  const height = 0

  // TODO: write a fromHeader (?) component observable which
  // this fromHeader should take the container and ...?
  // container$.subscribe()

  // container padding = "with parent" + 30px (padding of container...)
}

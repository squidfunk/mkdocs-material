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

import { difference } from "ramda"
import {
  distinctUntilKeyChanged,
  finalize,
  map,
  pairwise,
  startWith
} from "rxjs/operators"

import {
  resetAnchor,
  resetSidebar,
  setAnchorActive,
  setAnchorBlur,
  setHeaderShadow,
  setSidebarHeight,
  setSidebarLock,
  watchAnchors,
  watchContainer,
  watchSidebar
} from "./component"
import {
  getElement,
  getElements,
  watchMedia,
  watchViewportOffset,
  watchViewportSize
} from "./ui"
import { toggle } from "./utilities"

// ----------------------------------------------------------------------------

const offset$ = watchViewportOffset()
const size$   = watchViewportSize()

const screen$ = watchMedia("(min-width: 1220px)")
const tablet$ = watchMedia("(min-width: 960px)")

// ----------------------------------------------------------------------------

// modernizr for the poor
document.documentElement.classList.remove("no-js")
document.documentElement.classList.add("js")

// ----------------------------------------------------------------------------
// sidebar lock + height
// ----------------------------------------------------------------------------

const container = getElement("[data-md-component=container]")!
const header    = getElement("[data-md-component=header]")!
const container$ = watchContainer(container, header, { size$, offset$ })

// Optimize anchor list candidates
const anchors = getElements<HTMLAnchorElement>("[data-md-component=toc] .md-nav__link")
if (anchors.length)
  tablet$
    .pipe(
      toggle(() => watchAnchors(anchors, header, { offset$ })
        .pipe(
          startWith({ done: [], next: [] }),
          pairwise(),
          map(([a, b]) => {
            const begin = Math.max(0, Math.min(b.done.length, a.done.length) - 1)
            const end   = Math.max(b.done.length, a.done.length)
            return {
              done: b.done.slice(begin, end + 1),
              next: difference(b.next, a.next)
            }
          }),
          finalize(() => {
            for (const anchor of anchors)
              resetAnchor(anchor)
          })
        )
      )
    )
      .subscribe(({ done, next }) => {

        /* Look backward */
        for (const [i, [anchor]] of done.entries()) {
          setAnchorBlur(anchor, true)
          setAnchorActive(anchor, i === done.length - 1)
        }

        /* Look forward */
        for (const [anchor] of next) {
          setAnchorBlur(anchor, false)
          setAnchorActive(anchor, false)
        }
      })

// TODO: this should be subscribed to a subject!
// const toggle = getElement<HTMLInputElement>("[data-md-toggle=search]")!
// fromEvent(toggle, "change")
//   .subscribe(x2 => {
//     console.log("toggle changed", x2)
//   })

// const query = getElement("[data-md-component=query]")
// if (typeof query !== "undefined") {
//   fromEvent(query, "focus")
//     .pipe(

//     )
//       .subscribe(console.log)
// }

/* Component: header shadow toggle */ // - TODO: put this into a separate component
if (typeof header !== "undefined") {
  container$
    .pipe(
      distinctUntilKeyChanged("active")
    )
      .subscribe(({ active }) => {
        setHeaderShadow(header, active)
      })
}

/* Component: sidebar with navigation */
const nav = getElement("[data-md-component=navigation")
if (typeof nav !== "undefined") {
  screen$
    .pipe(
      toggle(() => watchSidebar(nav, { container$, offset$ })
        .pipe(
          finalize(() => {
            resetSidebar(nav)
          })
        )
      )
    )
      .subscribe(({ height, lock }) => {
        setSidebarHeight(nav, height)
        setSidebarLock(nav, lock)
      })
}

/* Component: sidebar with table of contents (missing on 404 page) */
const toc = getElement("[data-md-component=toc")
if (typeof toc !== "undefined") {
  tablet$
    .pipe(
      toggle(() => watchSidebar(toc, { container$, offset$ })
        .pipe(
          finalize(() => {
            resetSidebar(toc)
          })
        )
      )
    )
      .subscribe(({ height, lock }) => {
        setSidebarHeight(toc, height)
        setSidebarLock(toc, lock)
      })
}

// ----------------------------------------------------------------------------

export function app(config: any) {
  console.log("called app")
}

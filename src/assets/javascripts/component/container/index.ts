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

import { Observable, combineLatest } from "rxjs"
import { distinctUntilChanged, map, pluck, shareReplay } from "rxjs/operators"

import { ViewportOffset, ViewportSize } from "../../ui"
import { Header } from "../header"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Container
 */
export interface Container {
  offset: number                       /* Container top offset */
  height: number                       /* Container visible height */
  active: boolean                      /* Scrolled past top offset */
}

/* ----------------------------------------------------------------------------
 * Function types
 * ------------------------------------------------------------------------- */

/**
 * Watch options
 */
interface WatchOptions {
  size$: Observable<ViewportSize>      /* Viewport size observable */
  offset$: Observable<ViewportOffset>  /* Viewport offset observable */
  header$: Observable<Header>          /* Header observable */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Create an observable to monitor the container
 *
 * The container represents the main content area including the sidebars (table
 * of contents and navigation), as well as the actual page content.
 *
 * @param el - Container element
 * @param options - Options
 *
 * @return Container observable
 */
export function watchContainer(
  el: HTMLElement, { size$, offset$, header$ }: WatchOptions
): Observable<Container> {

  /* Compute necessary adjustment for header */
  const adjust$ = header$
    .pipe(
      pluck("height")
    )

  /* Compute the container's visible height */
  const height$ = combineLatest(offset$, size$, adjust$)
    .pipe(
      map(([{ y }, { height }, adjust]) => {
        const top    = el.offsetTop
        const bottom = el.offsetHeight + top
        return height
          - Math.max(0, top    - y,  adjust)
          - Math.max(0, height + y - bottom)
      }),
      distinctUntilChanged()
    )

  /* Compute whether the viewport offset is past the container's top */
  const active$ = combineLatest(offset$, adjust$)
    .pipe(
      map(([{ y }, adjust]) => y >= el.offsetTop - adjust),
      distinctUntilChanged()
    )

  /* Combine into a single hot observable */
  return combineLatest(height$, adjust$, active$)
    .pipe(
      map(([height, adjust, active]) => ({
        offset: el.offsetTop - adjust,
        height,
        active
      })),
      shareReplay({ bufferSize: 1, refCount: true })
    )
}

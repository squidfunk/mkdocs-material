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
import { distinctUntilChanged, map, shareReplay } from "rxjs/operators"

import { ViewportOffset, ViewportSize } from "../../ui"

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
 * Options
 */
interface Options {
  size$: Observable<ViewportSize>      /* Viewport size observable */
  offset$: Observable<ViewportOffset>  /* Viewport offset observable */
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
 * @param container - Container element
 * @param header - Header element
 * @param options - Options
 *
 * @return Container observable
 */
export function watchContainer(
  container: HTMLElement, header: HTMLElement, { size$, offset$ }: Options
): Observable<Container> {

  /* Adjust for header offset if fixed */
  const adjust = getComputedStyle(header)
    .getPropertyValue("position") === "fixed"
      ? header.offsetHeight
      : 0

  /* Compute the container's visible height */
  const height$ = combineLatest(offset$, size$)
    .pipe(
      map(([{ y }, { height }]) => {
        const top    = container.offsetTop
        const bottom = container.offsetHeight + top
        return height
          - Math.max(0, top    - y,  adjust)
          - Math.max(0, height + y - bottom)
      }),
      distinctUntilChanged()
    )

  /* Compute whether the viewport offset is past the container's top */
  const active$ = offset$
    .pipe(
      map(({ y }) => y >= container.offsetTop - adjust),
      distinctUntilChanged()
    )

  /* Combine into a single hot observable */
  return combineLatest(height$, active$)
    .pipe(
      map(([height, active]) => ({
        offset: container.offsetTop - adjust,
        height,
        active
      })),
      shareReplay({ bufferSize: 1, refCount: true })
    )
}

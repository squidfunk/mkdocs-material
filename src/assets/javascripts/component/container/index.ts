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

import { reduce } from "ramda"
import { Observable, combineLatest } from "rxjs"
import { distinctUntilChanged, map, shareReplay } from "rxjs/operators"

import { ViewportOffset, ViewportSize } from "../../ui"
import { toArray } from "../../utilities"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Container state
 */
export interface Container {
  offset: number                       /* Container top offset */
  height: number                       /* Container height */
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
 * Create an observable for the container component
 *
 * The container represents the main content area including the sidebars (table
 * of contents and navigation), as well as the actual page content.
 *
 * @param container - Container element
 * @param header - Header element
 * @param options - Options
 *
 * @return Container state observable
 */
export function fromContainer(
  container: HTMLElement, header: HTMLElement, { size$, offset$ }: Options
): Observable<Container> {

  /* Adjust top offset if header is fixed */
  const adjust = getComputedStyle(header)
    .getPropertyValue("position") === "fixed"
      ? header.offsetHeight
      : 0

  /* Compute the container's top offset */
  const top$ = size$.pipe(
    map(() => reduce((offset, child) => {
      return Math.max(offset, child.offsetTop)
    }, 0, toArray(container.children)) - adjust),
    distinctUntilChanged(),
    shareReplay({ bufferSize: 1, refCount: true })
  )

  /* Compute the container's available height */
  const height$ = combineLatest(offset$, size$, top$).pipe(
    map(([{ y }, { height }, offset]) => {
      const bottom = container.offsetTop + container.offsetHeight
      return height - adjust
        - Math.max(0, offset - y)
        - Math.max(0, height + y - bottom)
    }),
    distinctUntilChanged()
  )

  /* Compute whether the viewport offset is past the container's top */
  const active$ = combineLatest(offset$, top$).pipe(
    map(([{ y }, threshold]) => y >= threshold),
    distinctUntilChanged()
  )

  /* Combine into a single hot observable */
  return combineLatest(top$, height$, active$).pipe(
    map(([offset, height, active]) => ({ offset, height, active })),
    shareReplay({ bufferSize: 1, refCount: true })
  )
}

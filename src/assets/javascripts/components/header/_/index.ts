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

import { Observable, OperatorFunction, combineLatest, pipe } from "rxjs"
import {
  distinctUntilChanged,
  filter,
  map,
  shareReplay,
  startWith,
  switchMap,
  withLatestFrom
} from "rxjs/operators"

import {
  Viewport,
  getElement,
  watchViewportAt
} from "browser"

import { useComponent } from "../../_"
import {
  applyHeaderType,
  watchHeader
} from "../react"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Header type
 */
export type HeaderType =
  | "site"                             /* Header shows site title */
  | "page"                             /* Header shows page title */

/* ------------------------------------------------------------------------- */

/**
 * Header
 */
export interface Header {
  type: HeaderType                     /* Header type */
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
  document$: Observable<Document>      /* Document observable */
  viewport$: Observable<Viewport>      /* Viewport observable */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Mount header from source observable
 *
 * @param options - Options
 *
 * @return Operator function
 */
export function mountHeader(
  { document$, viewport$ }: MountOptions
): OperatorFunction<HTMLElement, Header> {
  return pipe(
    switchMap(el => {
      const header$ = watchHeader(el, { document$ })

      /* Compute whether the header should switch to page header */
      const type$ = useComponent("main")
        .pipe(
          map(main => getElement("h1, h2, h3, h4, h5, h6", main)!),
          filter(hx => typeof hx !== "undefined"),
          withLatestFrom(useComponent("header-title")),
          switchMap(([hx, title]) => watchViewportAt(hx, { header$, viewport$ })
            .pipe(
              map(({ offset: { y } }) => {
                return y >= hx.offsetHeight ? "page" : "site"
              }),
              distinctUntilChanged(),
              applyHeaderType(title)
            )
          ),
          startWith<HeaderType>("site")
        )

      /* Combine into single observable */
      return combineLatest([header$, type$])
        .pipe(
          map(([header, type]): Header => ({ type, ...header })),
          shareReplay(1)
        )
    })
  )
}

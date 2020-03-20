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

import { Observable, OperatorFunction, Subject, pipe } from "rxjs"
import { distinctUntilKeyChanged, switchMap, tap } from "rxjs/operators"

import { Viewport } from "browser"

import { useComponent } from "../../_"
import { Header } from "../../header"
import {
  applyHeaderShadow,
  watchMain
} from "../react"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Main area
 */
export interface Main {
  offset: number                       /* Main area top offset */
  height: number                       /* Main area visible height */
  active: boolean                      /* Scrolled past top offset */
}

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Mount options
 */
interface MountOptions {
  header$: Observable<Header>          /* Header observable */
  viewport$: Observable<Viewport>      /* Viewport observable */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Mount main area from source observable
 *
 * The header must be connected to the main area observable outside of the
 * operator function, as the header will persist in-between document switches
 * while the main area is replaced. However, the header observable must be
 * passed to this function, so we connect both via a long-living subject.
 *
 * @param options - Options
 *
 * @return Operator function
 */
export function mountMain(
  { header$, viewport$ }: MountOptions
): OperatorFunction<HTMLElement, Main> {
  const main$ = new Subject<Main>()

  /* Connect to main area observable via long-living subject */
  useComponent("header")
    .pipe(
      switchMap(header => main$
        .pipe(
          distinctUntilKeyChanged("active"),
          applyHeaderShadow(header)
        )
      )
    )
      .subscribe()

  /* Return operator */
  return pipe(
    switchMap(el => watchMain(el, { header$, viewport$ })),
    tap(main => main$.next(main))
  )
}

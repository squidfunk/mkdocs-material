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

import { Observable, OperatorFunction, pipe } from "rxjs"
import { distinctUntilKeyChanged, switchMap } from "rxjs/operators"

import {
  Header,
  Main,
  Viewport,
  paintHeaderShadow,
  watchMain
} from "observables"

import { useComponent } from "../_"

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
 * @param options - Options
 *
 * @return Main area observable
 */
export function mountMain(
  { header$, viewport$ }: MountOptions
): OperatorFunction<HTMLElement, Main> {
  return pipe(
    switchMap(el => useComponent("header")
      .pipe(
        switchMap(header => {
          const main$ = watchMain(el, { header$, viewport$ })

          /* Paint header shadow */
          main$
            .pipe(
              distinctUntilKeyChanged("active"),
              paintHeaderShadow(header)
            )
              .subscribe()

          /* Return main area */
          return main$
        })
      )
    )
  )
}

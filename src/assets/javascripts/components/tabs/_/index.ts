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

import { Observable, OperatorFunction, of, pipe } from "rxjs"
import {
  distinctUntilKeyChanged,
  map,
  switchMap
} from "rxjs/operators"

import { Viewport, watchViewportAt } from "browser"

import { Header } from "../../header"
import { applyTabs } from "../react"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Tabs
 */
export interface Tabs {
  hidden: boolean                      /* Whether the tabs are hidden */
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
  screen$: Observable<boolean>         /* Media screen observable */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Mount tabs from source observable
 *
 * @param options - Options
 *
 * @return Operator function
 */
export function mountTabs(
  { header$, viewport$, screen$ }: MountOptions
): OperatorFunction<HTMLElement, Tabs> {
  return pipe(
    switchMap(el => screen$
      .pipe(
        switchMap(screen => {

          /* [screen +]: Mount tabs above screen breakpoint */
          if (screen) {
            return watchViewportAt(el, { header$, viewport$ })
              .pipe(
                map(({ offset: { y } }) => ({ hidden: y >= 10 })),
                distinctUntilKeyChanged("hidden"),
                applyTabs(el)
              )

          /* [screen -]: Unmount tabs below screen breakpoint */
          } else {
            return of({ hidden: true })
          }
        })
      )
    )
  )
}

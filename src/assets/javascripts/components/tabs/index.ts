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
import { map, shareReplay } from "rxjs/operators"

import {
  Header,
  Viewport,
  paintHideable,
  watchViewportFrom
} from "observables"
import { switchMapIf } from "utilities"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Tabs state
 */
export interface TabsState {
  hidden: boolean                      /* Whether the tabs are hidden */
}

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Options
 */
interface Options {
  header$: Observable<Header>     /* Header state observable */
  viewport$: Observable<Viewport>
  screen$: Observable<boolean>         /* Media screen observable */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Watch tabs
 *
 * This function returns an observable that computes the visual parameters of
 * the tabs, currently only denoting whether the tabs are hidden or not.
 *
 * @param el - Tabs element
 * @param options - Options
 *
 * @return Tabs state
 */
export function watchTabs(
  el: HTMLElement, options: Options
): Observable<TabsState> {

  /* Watch and paint visibility */
  const hidden$ = watchViewportFrom(el, options)
    .pipe(
      paintHideable(el, 8)
    )

  /* Combine into a single hot observable */
  return hidden$
    .pipe(
      map(hidden => ({ hidden }))
    )
}
// TODO: generalize into watchHideable !!! or mountHideable...

/* ------------------------------------------------------------------------- */

/**
 * Mount tabs from source observable
 *
 * @param agent - Agent
 * @param options - Options
 *
 * @return Operator function
 */
export function mountTabs(
  options: Options
): OperatorFunction<HTMLElement, TabsState> {
  return pipe(
    switchMapIf(options.screen$, el => watchTabs(el, options)),
    shareReplay(1)
  )
}

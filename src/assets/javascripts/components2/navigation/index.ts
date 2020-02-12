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
import { map, shareReplay, switchMap } from "rxjs/operators"

import {
  Main,
  NavigationLayer,
  Sidebar,
  Viewport,
  getElements,
  paintNavigationLayer,
  paintSidebar,
  watchNavigationLayer,
  watchSidebar
} from "observables"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Navigation for breakpoint below screen
 */
export interface NavigationBelowScreen {
  layer: NavigationLayer               /* Navigation layer */
}

/**
 * Navigation for breakpoint above screen
 */
export interface NavigationAboveScreen {
  sidebar: Sidebar                     /* Navigation sidebar */
}

/* ------------------------------------------------------------------------- */

/**
 * Navigation
 */
export type Navigation =
  | NavigationBelowScreen
  | NavigationAboveScreen

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Options
 */
interface Options {
  main$: Observable<Main>              /* Main area observable */
  viewport$: Observable<Viewport>      /* Viewport offset observable */
  screen$: Observable<boolean>         /* Screen media observable */
}

/* ----------------------------------------------------------------------------
 * Helper functions
 * ------------------------------------------------------------------------- */

/**
 * Mount navigation below screen from source observable
 *
 * @param options - Options
 *
 * @return Operator function
 */
function mountNavigationBelowScreen(
  _options: Options
): OperatorFunction<HTMLElement, NavigationBelowScreen> {
  return pipe(
    map(el => getElements("nav", el)),
    switchMap(els => watchNavigationLayer(els)
      .pipe(
        paintNavigationLayer(els),
        map(layer => ({ layer }))
      )
    )
  )
}

/**
 * Mount navigation above screen from source observable
 *
 * @param options - Options
 *
 * @return Operator function
 */
function mountNavigationAboveScreen(
  options: Options
): OperatorFunction<HTMLElement, NavigationAboveScreen> {
  return pipe(
    switchMap(el => watchSidebar(el, options)
      .pipe(
        paintSidebar(el),
        map(sidebar => ({ sidebar }))
      )
    )
  )
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Mount navigation from source observable
 *
 * @param options - Options
 *
 * @return Operator function
 */
export function mountNavigation(
  options: Options
): OperatorFunction<HTMLElement, Navigation> {
  return pipe(
    switchMap(el => options.screen$
      .pipe(
        switchMap(screen => screen
          ? of(el).pipe(mountNavigationAboveScreen(options))
          : of(el).pipe(mountNavigationBelowScreen(options))
        )
      )
    ),
    shareReplay(1)
  )
}

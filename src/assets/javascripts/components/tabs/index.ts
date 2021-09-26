/*
 * Copyright (c) 2016-2021 Martin Donath <martin.donath@squidfunk.com>
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

import {
  Observable,
  Subject,
  animationFrameScheduler,
  of
} from "rxjs"
import {
  distinctUntilKeyChanged,
  finalize,
  map,
  observeOn,
  switchMap,
  tap
} from "rxjs/operators"

import { feature } from "~/_"
import { resetTabsState, setTabsState } from "~/actions"
import {
  Viewport,
  watchElementSize,
  watchViewportAt
} from "~/browser"

import { Component } from "../_"
import { Header } from "../header"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Navigation tabs
 */
export interface Tabs {
  hidden: boolean                      /* User scrolled past tabs */
}

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Watch options
 */
interface WatchOptions {
  viewport$: Observable<Viewport>      /* Viewport observable */
  header$: Observable<Header>          /* Header observable */
}

/**
 * Mount options
 */
interface MountOptions {
  viewport$: Observable<Viewport>      /* Viewport observable */
  header$: Observable<Header>          /* Header observable */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Watch navigation tabs
 *
 * @param el - Navigation tabs element
 * @param options - Options
 *
 * @returns Navigation tabs observable
 */
export function watchTabs(
  el: HTMLElement, { viewport$, header$ }: WatchOptions
): Observable<Tabs> {
  return watchElementSize(document.body)
    .pipe(
      switchMap(() => watchViewportAt(el, { header$, viewport$ })),
      map(({ offset: { y } }) => {
        return {
          hidden: y >= 10
        }
      }),
      distinctUntilKeyChanged("hidden")
    )
}

/**
 * Mount navigation tabs
 *
 * This function hides the navigation tabs when scrolling past the threshold
 * and makes them reappear in a nice CSS animation when scrolling back up.
 *
 * @param el - Navigation tabs element
 * @param options - Options
 *
 * @returns Navigation tabs component observable
 */
export function mountTabs(
  el: HTMLElement, options: MountOptions
): Observable<Component<Tabs>> {
  const internal$ = new Subject<Tabs>()
  internal$
    .pipe(
      observeOn(animationFrameScheduler)
    )
      .subscribe({

        /* Update state */
        next({ hidden }) {
          if (hidden)
            setTabsState(el, "hidden")
          else
            resetTabsState(el)
        },

        /* Reset on complete */
        complete() {
          resetTabsState(el)
        }
      })

  /* Create and return component */
  return (
    feature("navigation.tabs.sticky")
      ? of({ hidden: false })
      : watchTabs(el, options)
  )
    .pipe(
      tap(state => internal$.next(state)),
      finalize(() => internal$.complete()),
      map(state => ({ ref: el, ...state }))
    )
}

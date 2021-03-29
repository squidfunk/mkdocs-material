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
  combineLatest
} from "rxjs"
import {
  bufferCount,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  finalize,
  map,
  observeOn,
  tap
} from "rxjs/operators"

import { resetBackToTopState, setBackToTopState } from "~/actions"
import { Viewport } from "~/browser"

import { Component } from "../_"
import { Main } from "../main"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Back-to-top button
 */
export interface BackToTop {
  hidden: boolean                      /* User scrolled up */
}

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Watch options
 */
interface WatchOptions {
  viewport$: Observable<Viewport>      /* Viewport observable */
  main$: Observable<Main>              /* Main area observable */
}

/**
 * Mount options
 */
interface MountOptions {
  viewport$: Observable<Viewport>      /* Viewport observable */
  main$: Observable<Main>              /* Main area observable */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Watch back-to-top
 *
 * @param _el - Back-to-top element
 * @param options - Options
 *
 * @returns Back-to-top observable
 */
export function watchBackToTop(
  _el: HTMLElement, { viewport$, main$ }: WatchOptions
): Observable<BackToTop> {

  /* Compute direction */
  const direction$ = viewport$
    .pipe(
      map(({ offset: { y } }) => y),
      bufferCount(2, 1),
      map(([a, b]) => a > b),
      distinctUntilChanged()
    )

  /* Compute whether button should be hidden */
  const hidden$ = main$
    .pipe(
      distinctUntilKeyChanged("active")
    )

  /* Compute threshold for hiding */
  return combineLatest([hidden$, direction$])
    .pipe(
      map(([{ active }, direction]) => ({
        hidden: !(active && direction)
      })),
      distinctUntilChanged((a, b) => (
        a.hidden === b.hidden
      ))
    )
}

/* ------------------------------------------------------------------------- */

/**
 * Mount back-to-top
 *
 * @param el - Back-to-top element
 * @param options - Options
 *
 * @returns Back-to-top component observable
 */
export function mountBackToTop(
  el: HTMLElement, options: MountOptions
): Observable<Component<BackToTop>> {
  const internal$ = new Subject<BackToTop>()
  internal$
    .pipe(
      observeOn(animationFrameScheduler)
    )
      .subscribe({

        /* Update state */
        next({ hidden }) {
          if (hidden)
            setBackToTopState(el, "hidden")
          else
            resetBackToTopState(el)
        },

        /* Reset on complete */
        complete() {
          resetBackToTopState(el)
        }
      })

  /* Create and return component */
  return watchBackToTop(el, options)
    .pipe(
      tap(internal$),
      finalize(() => internal$.complete()),
      map(state => ({ ref: el, ...state }))
    )
}

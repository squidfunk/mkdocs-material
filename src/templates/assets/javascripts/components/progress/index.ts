/*
 * Copyright (c) 2016-2024 Martin Donath <martin.donath@squidfunk.com>
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
  defer,
  finalize,
  map,
  tap
} from "rxjs"

import { Component } from "../_"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Progress indicator
 */
export interface Progress {
  value: number                        // Progress value
}

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Mount options
 */
interface MountOptions {
  progress$: Subject<number>           // Progress subject
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Mount progress indicator
 *
 * @param el - Progress indicator element
 * @param options - Options
 *
 * @returns Progress indicator component observable
 */
export function mountProgress(
  el: HTMLElement, { progress$ }: MountOptions
): Observable<Component<Progress>> {

  // Mount component on subscription
  return defer(() => {
    const push$ = new Subject<Progress>()
    push$.subscribe(({ value }) => {
      el.style.setProperty("--md-progress-value", `${value}`)
    })

    // Create and return component
    return progress$
      .pipe(
        tap(value => push$.next({ value })),
        finalize(() => push$.complete()),
        map(value => ({ ref: el, value }))
      )
  })
}

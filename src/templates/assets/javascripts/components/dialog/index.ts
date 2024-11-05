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
  delay,
  finalize,
  map,
  merge,
  of,
  switchMap,
  tap
} from "rxjs"

import { getElement } from "~/browser"

import { Component } from "../_"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Dialog
 */
export interface Dialog {
  message: string                      /* Dialog message */
  active: boolean                      /* Dialog is active */
}

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Watch options
 */
interface WatchOptions {
  alert$: Subject<string>              /* Alert subject */
}

/**
 * Mount options
 */
interface MountOptions {
  alert$: Subject<string>              /* Alert subject */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Watch dialog
 *
 * @param _el - Dialog element
 * @param options - Options
 *
 * @returns Dialog observable
 */
export function watchDialog(
  _el: HTMLElement, { alert$ }: WatchOptions
): Observable<Dialog> {
  return alert$
    .pipe(
      switchMap(message => merge(
        of(true),
        of(false).pipe(delay(2000))
      )
        .pipe(
          map(active => ({ message, active }))
        )
      )
    )
}

/**
 * Mount dialog
 *
 * This function reveals the dialog in the right corner when a new alert is
 * emitted through the subject that is passed as part of the options.
 *
 * @param el - Dialog element
 * @param options - Options
 *
 * @returns Dialog component observable
 */
export function mountDialog(
  el: HTMLElement, options: MountOptions
): Observable<Component<Dialog>> {
  const inner = getElement(".md-typeset", el)
  return defer(() => {
    const push$ = new Subject<Dialog>()
    push$.subscribe(({ message, active }) => {
      el.classList.toggle("md-dialog--active", active)
      inner.textContent = message
    })

    /* Create and return component */
    return watchDialog(el, options)
      .pipe(
        tap(state => push$.next(state)),
        finalize(() => push$.complete()),
        map(state => ({ ref: el, ...state }))
      )
  })
}

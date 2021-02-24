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
  merge,
  of
} from "rxjs"
import {
  delay,
  finalize,
  map,
  observeOn,
  switchMap,
  tap
} from "rxjs/operators"

import {
  resetDialogState,
  setDialogMessage,
  setDialogState
} from "~/actions"

import { Component } from "../_"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Dialog
 */
export interface Dialog {
  message: string                      /* Dialog message */
  open: boolean                        /* Dialog is visible */
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
          map(open => ({ message, open }))
        )
      )
    )
}

/**
 * Mount dialog
 *
 * This function reveals the dialog in the right cornerwhen a new alert is
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
  const internal$ = new Subject<Dialog>()
  internal$
    .pipe(
      observeOn(animationFrameScheduler)
    )
      .subscribe(({ message, open }) => {
        setDialogMessage(el, message)
        if (open)
          setDialogState(el, "open")
        else
          resetDialogState(el)
      })

  /* Create and return component */
  return watchDialog(el, options)
    .pipe(
      tap(internal$),
      finalize(() => internal$.complete()),
      map(state => ({ ref: el, ...state }))
    )
}

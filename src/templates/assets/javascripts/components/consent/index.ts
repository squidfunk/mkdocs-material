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
  finalize,
  map,
  tap
} from "rxjs"

import { Component } from "../_"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Consent
 */
export interface Consent {
  hidden: boolean                      /* Consent is hidden */
}

/**
 * Consent defaults
 */
export interface ConsentDefaults {
  analytics?: boolean                  /* Consent for Analytics */
  github?: boolean                     /* Consent for GitHub */
}

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Watch options
 */
interface WatchOptions {
  target$: Observable<HTMLElement>     /* Target observable */
}

/**
 * Mount options
 */
interface MountOptions {
  target$: Observable<HTMLElement>     /* Target observable */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Watch consent
 *
 * @param el - Consent element
 * @param options - Options
 *
 * @returns Consent observable
 */
export function watchConsent(
  el: HTMLElement, { target$ }: WatchOptions
): Observable<Consent> {
  return target$
    .pipe(
      map(target => ({ hidden: target !== el }))
    )
}

/* ------------------------------------------------------------------------- */

/**
 * Mount consent
 *
 * @param el - Consent element
 * @param options - Options
 *
 * @returns Consent component observable
 */
export function mountConsent(
  el: HTMLElement, options: MountOptions
): Observable<Component<Consent>> {
  const internal$ = new Subject<Consent>()
  internal$.subscribe(({ hidden }) => {
    el.hidden = hidden
  })

  /* Create and return component */
  return watchConsent(el, options)
    .pipe(
      tap(state => internal$.next(state)),
      finalize(() => internal$.complete()),
      map(state => ({ ref: el, ...state }))
    )
}

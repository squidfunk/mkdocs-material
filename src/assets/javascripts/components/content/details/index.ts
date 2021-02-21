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

import { Observable, Subject } from "rxjs"
import {
  filter,
  finalize,
  map,
  mapTo,
  mergeWith,
  tap
} from "rxjs/operators"

import { Component } from "../../_"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Details
 */
export interface Details {}

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Watch options
 */
interface WatchOptions {
  target$: Observable<HTMLElement>     /* Location target observable */
  print$: Observable<void>             /* Print mode observable */
}

/**
 * Mount options
 */
interface MountOptions {
  target$: Observable<HTMLElement>     /* Location target observable */
  print$: Observable<void>             /* Print mode observable */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Watch details
 *
 * @param el - Details element
 * @param options - Options
 *
 * @returns Details observable
 */
export function watchDetails(
  el: HTMLDetailsElement, { target$, print$ }: WatchOptions
): Observable<Details> {
  return target$
    .pipe(
      map(target => target.closest("details:not([open])")!),
      filter(details => el === details),
      mergeWith(print$),
      mapTo(el)
    )
}

/**
 * Mount details
 *
 * This function ensures that `details` tags are opened on anchor jumps and
 * prior to printing, so the whole content of the page is visible.
 *
 * @param el - Details element
 * @param options - Options
 *
 * @returns Details component observable
 */
export function mountDetails(
  el: HTMLDetailsElement, options: MountOptions
): Observable<Component<Details>> {
  const internal$ = new Subject<Details>()
  internal$.subscribe(() => {
    el.setAttribute("open", "")
    el.scrollIntoView()
  })

  /* Create and return component */
  return watchDetails(el, options)
    .pipe(
      tap(internal$),
      finalize(() => internal$.complete()),
      mapTo({ ref: el })
    )
}

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
  combineLatest,
  delay,
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
  merge,
  startWith,
  withLatestFrom
} from "rxjs"

import { watchElementFocus } from "~/browser"

import { Component } from "../../_"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Icon search query
 */
export interface IconSearchQuery {
  value: string                        /* Query value */
  focus: boolean                       /* Query focus */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Mount icon search query
 *
 * @param el - Icon search query element
 *
 * @returns Icon search query component observable
 */
export function mountIconSearchQuery(
  el: HTMLInputElement
): Observable<Component<IconSearchQuery, HTMLInputElement>> {

  /* Intercept focus and input events */
  const focus$ = watchElementFocus(el)
  const value$ = merge(
    fromEvent(el, "keyup"),
    fromEvent(el, "focus").pipe(delay(1))
  )
    .pipe(
      map(() => el.value),
      startWith(el.value),
      distinctUntilChanged(),
    )

  /* Log search on blur */
  focus$
    .pipe(
      filter(active => !active),
      withLatestFrom(value$)
    )
      .subscribe(([, value]) => {
        const path = document.location.pathname
        if (typeof ga === "function" && value.length)
          ga("send", "pageview", `${path}?q=[icon]+${value}`)
      })

  /* Combine into single observable */
  return combineLatest([value$, focus$])
    .pipe(
      map(([value, focus]) => ({ ref: el, value, focus })),
    )
}

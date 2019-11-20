/*
 * Copyright (c) 2016-2019 Martin Donath <martin.donath@squidfunk.com>
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

import { Observable, of } from "rxjs"
import { shareReplay } from "rxjs/operators"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Header
 */
export interface Header {
  sticky: boolean                      /* Header stickyness */
  height: number                       /* Header visible height */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Set header shadow
 *
 * @param el - Header element
 * @param shadow - Shadow
 */
export function setHeaderShadow(
  el: HTMLElement, shadow: boolean
): void {
  el.setAttribute("data-md-state", shadow ? "shadow" : "")
}

/**
 * Reset header
 *
 * @param el - Header element
 */
export function resetHeader(el: HTMLElement): void {
  el.removeAttribute("data-md-state")
}

/* ------------------------------------------------------------------------- */

/**
 * Create an observable to monitor the header
 *
 * @param header - Header element
 *
 * @return Header observable
 */
export function watchHeader(
  header: HTMLElement
): Observable<Header> {
  const sticky = getComputedStyle(header)
    .getPropertyValue("position") === "fixed"

  /* Return header as hot observable */
  return of({
    sticky,
    height: sticky ? header.offsetHeight : 0
  })
    .pipe(
      shareReplay({ bufferSize: 1, refCount: true })
    )
}

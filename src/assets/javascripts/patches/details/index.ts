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

import { identity } from "ramda"
import { NEVER, Observable, fromEvent, merge, of } from "rxjs"
import {
  catchError,
  filter,
  map,
  switchMap,
  switchMapTo,
} from "rxjs/operators"

import {
  getElementOrThrow,
  getElements,
  getLocationHash,
  setLocationHash,
  watchMedia
} from "observables"

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Mount options
 */
interface MountOptions {
  document$: Observable<Document>      /* Document observable */
  hash$: Observable<string>            /* Location hash observable */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Patch all `details` elements
 *
 * This function will ensure that all `details` tags are opened prior to
 * printing, so the whole content of the page is included.
 *
 * @param options - Options
 */
export function patchDetails(
  { document$, hash$ }: MountOptions
): void {
  const els$ = document$
    .pipe(
      map(() => getElements<HTMLDetailsElement>("details"))
    )

  /* Open all details before printing */
  merge(
    watchMedia("print").pipe(filter(identity)), // Webkit
    fromEvent(window, "beforeprint")            // IE, FF
  )
    .pipe(
      switchMapTo(els$)
    )
      .subscribe(els => {
        for (const el of els)
          el.setAttribute("open", "")
      })

  /* Open parent details before anchor jump */
  merge(hash$, of(getLocationHash()))
    .pipe(
      filter(hash => !!hash.length),
      switchMap(hash => of(getElementOrThrow<HTMLElement>(hash))
        .pipe(
          map(el => [el.closest("details")!, hash] as const),
          filter(([el]) => el && !el.open)
        )
      ),
      catchError(() => NEVER)
    )
      .subscribe(([el, hash]) => {
        el.setAttribute("open", "")
        setLocationHash(hash)
      })
}

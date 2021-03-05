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

import { Observable, fromEvent, of } from "rxjs"
import {
  mapTo,
  mergeMap,
  switchMap,
  takeWhile,
  tap,
  withLatestFrom
} from "rxjs/operators"

import { getElements } from "~/browser"

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Patch options
 */
interface PatchOptions {
  document$: Observable<Document>      /* Document observable */
  tablet$: Observable<boolean>         /* Tablet breakpoint observable */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Patch indeterminate checkboxes
 *
 * This function replaces the indeterminate "pseudo state" with the actual
 * indeterminate state, which is used to keep navigation always expanded.
 *
 * @param options - Options
 */
export function patchIndeterminate(
  { document$, tablet$ }: PatchOptions
): void {
  document$
    .pipe(
      switchMap(() => of(...getElements<HTMLInputElement>(
        "[data-md-state=indeterminate]"
      ))),
      tap(el => {
        el.indeterminate = true
        el.checked = false
      }),
      mergeMap(el => fromEvent(el, "change")
        .pipe(
          takeWhile(() => el.hasAttribute("data-md-state")),
          mapTo(el)
        )
      ),
      withLatestFrom(tablet$)
    )
      .subscribe(([el, tablet]) => {
        el.removeAttribute("data-md-state")
        if (tablet)
          el.checked = false
      })
}

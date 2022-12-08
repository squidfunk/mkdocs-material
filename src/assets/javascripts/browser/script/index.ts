/*
 * Copyright (c) 2016-2022 Martin Donath <martin.donath@squidfunk.com>
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
  defer,
  finalize,
  fromEvent,
  map,
  merge,
  switchMap,
  take,
  throwError
} from "rxjs"

import { h } from "~/utilities"

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Create and load a `script` element
 *
 * This function returns an observable that will emit when the script was
 * successfully loaded, or throw an error if it didn't.
 *
 * @param src - Script URL
 *
 * @returns Script observable
 */
export function watchScript(src: string): Observable<void> {
  const script = h("script", { src })
  return defer(() => {
    document.head.appendChild(script)
    return merge(
      fromEvent(script, "load"),
      fromEvent(script, "error")
        .pipe(
          switchMap(() => (
            throwError(() => new ReferenceError(`Invalid script: ${src}`))
          ))
        )
    )
      .pipe(
        map(() => undefined),
        finalize(() => document.head.removeChild(script)),
        take(1)
      )
  })
}

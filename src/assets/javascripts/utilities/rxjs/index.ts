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

import { Observable, defer, of } from "rxjs"

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Cache the last value emitted by an observable in session storage
 *
 * If the key is not found in session storage, the factory is executed and the
 * latest value emitted will automatically be persisted to sessions storage.
 * Note that the values emitted by the returned observable must be serializable
 * as `JSON`, or data will be lost.
 *
 * @template T - Value type
 *
 * @param key - Cache key
 * @param factory - Observable factory
 *
 * @return Value observable
 */
export function cache<T>(
  key: string, factory: () => Observable<T>
): Observable<T> {
  return defer(() => {
    const data = sessionStorage.getItem(key)
    if (data) {
      return of(JSON.parse(data) as T)

    /* Retrieve value from observable factory and write to storage */
    } else {
      const value$ = factory()
      value$.subscribe(value => {
        try {
          sessionStorage.setItem(key, JSON.stringify(value))
        } catch (err) {
          /* Uncritical, just swallow */
        }
      })

      /* Return value */
      return value$
    }
  })
}

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

import { NEVER, Observable } from "rxjs"
import { ajax } from "rxjs/ajax"
import {
  catchError,
  distinctUntilKeyChanged,
  map,
  share,
  skip,
  switchMap
} from "rxjs/operators"

import { setLocation } from "../../location"

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Watch options
 */
interface WatchOptions {
  location$: Observable<URL>           /* Location observable */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Watch document switch
 *
 * This function returns an observable that fetches a document if the provided
 * location observable emits a new value (i.e. URL). If the emitted URL points
 * to the same page, the request is effectively ignored (i.e. when only the
 * fragment identifier changes).
 *
 * Theoretically, we could use `responseType: "document"`, but since all MkDocs
 * links are relative, we need to make sure that the current location matches
 * the document we just loaded. Otherwise any relative links in the document
 * may use the old location.
 *
 * @param options - Options
 *
 * @return Document observable
 */
export function watchDocumentSwitch(
  { location$ }: WatchOptions
): Observable<Document> {
  const dom = new DOMParser()
  return location$
    .pipe(
      distinctUntilKeyChanged("pathname"),
      skip(1),

      /* Fetch document */
      switchMap(url => ajax({
        url: url.href,
        responseType: "text",
        withCredentials: true
      })
        .pipe(
          map(({ response }): Document => {
            history.pushState({}, "", url.toString())                           // TODO: abstract into function
            return dom.parseFromString(response, "text/html")
          }),
          catchError(() => {
            setLocation(url)
            return NEVER
          })
        )
      ),
      share()
    )
}

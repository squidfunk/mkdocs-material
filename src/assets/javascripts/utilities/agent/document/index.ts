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

import { Observable, fromEvent } from "rxjs"
import { ajax } from "rxjs/ajax"
import {
  distinctUntilChanged,
  map,
  mapTo,
  pluck,
  shareReplay,
  skip,
  startWith,
  switchMap
} from "rxjs/operators"

/* ----------------------------------------------------------------------------
 * Function types
 * ------------------------------------------------------------------------- */

/**
 * Switch options
 */
interface SwitchOptions {
  location$: Observable<string>        /* Location observable */
}

/* ----------------------------------------------------------------------------
 * Data
 * ------------------------------------------------------------------------- */

/**
 * Observable for document load events
 */
const load$ = fromEvent(document, "DOMContentLoaded")

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Watch document
 *
 * @return Document observable
 */
export function watchDocument(): Observable<Document> {
  return load$
    .pipe(
      mapTo(document),
      shareReplay(1)
    )
}

/**
 * Watch document switch
 *
 * This function returns an observables that fetches a document if the provided
 * location observable emits a new value (i.e. URL). If the emitted URL points
 * to the same page, the request is effectively ignored (e.g. when only the
 * fragment identifier changes)
 *
 * @param options - Options
 *
 * @return Document switch observable
 */
export function watchDocumentSwitch(
  { location$ }: SwitchOptions
): Observable<Document> {
  return location$
    .pipe(
      startWith(location.href),
      map(url => url.replace(/#[^#]+$/, "")),
      distinctUntilChanged(),
      skip(1),

      /* Fetch document */
      switchMap(url => ajax({
        url,
        responseType: "document",
        withCredentials: true
      })
        .pipe<Document>(
          pluck("response")
        )
      ),
      shareReplay(1)
    )
}

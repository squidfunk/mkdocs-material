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
  EMPTY,
  Observable,
  catchError,
  filter,
  from,
  map,
  shareReplay,
  switchMap
} from "rxjs"

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Fetch the given URL
 *
 * If the request fails (e.g. when dispatched from `file://` locations), the
 * observable will complete without emitting a value.
 *
 * @param url - Request URL
 * @param options - Options
 *
 * @returns Response observable
 */
export function request(
  url: URL | string, options: RequestInit = { credentials: "same-origin" }
): Observable<Response> {
  return from(fetch(`${url}`, options))
    .pipe(
      filter(res => res.status === 200),
      catchError(() => EMPTY)
    )
}

/**
 * Fetch JSON from the given URL
 *
 * @template T - Data type
 *
 * @param url - Request URL
 * @param options - Options
 *
 * @returns Data observable
 */
export function requestJSON<T>(
  url: URL | string, options?: RequestInit
): Observable<T> {
  return request(url, options)
    .pipe(
      switchMap(res => res.json()),
      shareReplay(1)
    )
}

/**
 * Fetch XML from the given URL
 *
 * @param url - Request URL
 * @param options - Options
 *
 * @returns Data observable
 */
export function requestXML(
  url: URL | string, options?: RequestInit
): Observable<Document> {
  const dom = new DOMParser()
  return request(url, options)
    .pipe(
      switchMap(res => res.text()),
      map(res => dom.parseFromString(res, "text/xml")),
      shareReplay(1)
    )
}

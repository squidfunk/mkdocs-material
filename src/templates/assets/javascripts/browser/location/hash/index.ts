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
  filter,
  fromEvent,
  map,
  merge,
  shareReplay,
  startWith
} from "rxjs"

import { getOptionalElement } from "~/browser"
import { h } from "~/utilities"

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Retrieve location hash
 *
 * @returns Location hash
 */
export function getLocationHash(): string {
  return location.hash.slice(1)
}

/**
 * Set location hash
 *
 * Setting a new fragment identifier via `location.hash` will have no effect
 * if the value doesn't change. When a new fragment identifier is set, we want
 * the browser to target the respective element at all times, which is why we
 * use this dirty little trick.
 *
 * @param hash - Location hash
 */
export function setLocationHash(hash: string): void {
  const el = h("a", { href: hash })
  el.addEventListener("click", ev => ev.stopPropagation())
  el.click()
}

/* ------------------------------------------------------------------------- */

/**
 * Watch location hash
 *
 * @param location$ - Location observable
 *
 * @returns Location hash observable
 */
export function watchLocationHash(
  location$: Observable<URL>
): Observable<string> {
  return merge(
    fromEvent<HashChangeEvent>(window, "hashchange"),
    location$
  )
    .pipe(
      map(getLocationHash),
      startWith(getLocationHash()),
      filter(hash => hash.length > 0),
      shareReplay(1)
    )
}

/**
 * Watch location target
 *
 * @param location$ - Location observable
 *
 * @returns Location target observable
 */
export function watchLocationTarget(
  location$: Observable<URL>
): Observable<HTMLElement> {
  return watchLocationHash(location$)
    .pipe(
      map(id => getOptionalElement(`[id="${id}"]`)!),
      filter(el => typeof el !== "undefined")
    )
}

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

import { NEVER, Observable, fromEvent, of } from "rxjs"
import {
  map,
  shareReplay,
  startWith,
  switchMap,
  take
} from "rxjs/operators"

import { getElement } from "../agent"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Toggle
 */
export type Toggle =
  | "drawer"                           /* Toggle for drawer */
  | "search"                           /* Toggle for search */

/**
 * Toggle map
 */
export type ToggleMap = {
  [P in Toggle]?: HTMLInputElement
}

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Watch options
 */
interface WatchOptions {
  document$: Observable<Document>      /* Document observable */
}

/* ----------------------------------------------------------------------------
 * Data
 * ------------------------------------------------------------------------- */

/**
 * Toggle map observable
 */
let toggles$: Observable<ToggleMap>

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Watch toggles with given names
 *
 * @param names - Toggle names
 * @param options - Options
 *
 * @return Toggle map observable
 */
export function watchToggleMap(
  names: Toggle[], { document$ }: WatchOptions
): Observable<ToggleMap> {
  toggles$ = document$
    .pipe(
      take(1),

      /* Build toggle map */
      map(document => names.reduce<ToggleMap>((toggles, name) => {
        const el = getElement(`[data-md-toggle=${name}]`, document)
        return {
          ...toggles,
          ...typeof el !== "undefined" ? { [name]: el } : {}
        }
      }, {}))
    )

  /* Return toggle map as hot observable */
  return toggles$
    .pipe(
      shareReplay(1)
    )
}

/**
 * Retrieve a toggle
 *
 * @template T - Element type
 *
 * @param name - Toggle name
 *
 * @return Element observable
 */
export function useToggle(
  name: Toggle
): Observable<HTMLInputElement> {
  return toggles$
    .pipe(
      switchMap(toggles => {
        return typeof toggles[name] !== "undefined"
          ? of(toggles[name]!)
          : NEVER
      })
    )
}

/* ------------------------------------------------------------------------- */

/**
 * Watch toggle
 *
 * @param el - Toggle element
 *
 * @return Toggle observable
 */
export function watchToggle(
  el: HTMLInputElement
): Observable<boolean> {
  return fromEvent(el, "change")
    .pipe(
      map(() => el.checked),
      startWith(el.checked)
    )
}

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
  fromEvent,
  map,
  startWith
} from "rxjs"

import { getElement } from "../element"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Toggle
 */
export type Toggle =
  | "drawer"                           /* Toggle for drawer */
  | "search"                           /* Toggle for search */

/* ----------------------------------------------------------------------------
 * Data
 * ------------------------------------------------------------------------- */

/**
 * Toggle map
 */
const toggles: Record<Toggle, HTMLInputElement> = {
  drawer: getElement("[data-md-toggle=drawer]"),
  search: getElement("[data-md-toggle=search]")
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Retrieve the value of a toggle
 *
 * @param name - Toggle
 *
 * @returns Toggle value
 */
export function getToggle(name: Toggle): boolean {
  return toggles[name].checked
}

/**
 * Set toggle
 *
 * Simulating a click event seems to be the most cross-browser compatible way
 * of changing the value while also emitting a `change` event. Before, Material
 * used `CustomEvent` to programmatically change the value of a toggle, but this
 * is a much simpler and cleaner solution which doesn't require a polyfill.
 *
 * @param name - Toggle
 * @param value - Toggle value
 */
export function setToggle(name: Toggle, value: boolean): void {
  if (toggles[name].checked !== value)
    toggles[name].click()
}

/* ------------------------------------------------------------------------- */

/**
 * Watch toggle
 *
 * @param name - Toggle
 *
 * @returns Toggle value observable
 */
export function watchToggle(name: Toggle): Observable<boolean> {
  const el = toggles[name]
  return fromEvent(el, "change")
    .pipe(
      map(() => el.checked),
      startWith(el.checked)
    )
}

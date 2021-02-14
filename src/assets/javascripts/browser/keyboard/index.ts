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

import { Observable, fromEvent } from "rxjs"
import { filter, map, share } from "rxjs/operators"

import { getActiveElement } from "../element"
import { getToggle } from "../toggle"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Keyboard mode
 */
export type KeyboardMode =
  | "global"                           /* Global */
  | "search"                           /* Search is open */

/* ------------------------------------------------------------------------- */

/**
 * Keyboard
 */
export interface Keyboard {
  mode: KeyboardMode                   /* Keyboard mode */
  type: string                         /* Key type */
  claim(): void                        /* Key claim */
}

/* ----------------------------------------------------------------------------
 * Helper functions
 * ------------------------------------------------------------------------- */

/**
 * Check whether an element may receive keyboard input
 *
 * @param el - Element
 *
 * @returns Test result
 */
function isSusceptibleToKeyboard(el: HTMLElement): boolean {
  switch (el.tagName) {

    /* Form elements */
    case "INPUT":
    case "SELECT":
    case "TEXTAREA":
      return true

    /* Everything else */
    default:
      return el.isContentEditable
  }
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Watch keyboard
 *
 * @returns Keyboard observable
 */
export function watchKeyboard(): Observable<Keyboard> {
  return fromEvent<KeyboardEvent>(window, "keydown")
    .pipe(
      filter(ev => !(ev.metaKey || ev.ctrlKey)),
      map(ev => ({
        mode: getToggle("search") ? "search" : "global",
        type: ev.key,
        claim() {
          ev.preventDefault()
          ev.stopPropagation()
        }
      } as Keyboard)),
      filter(({ mode }) => {
        if (mode === "global") {
          const active = getActiveElement()
          if (typeof active !== "undefined")
            return !isSusceptibleToKeyboard(active)
        }
        return true
      }),
      share()
    )
}

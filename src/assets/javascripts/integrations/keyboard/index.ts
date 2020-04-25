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

import { Observable } from "rxjs"
import {
  filter,
  map,
  share,
  withLatestFrom
} from "rxjs/operators"

import {
  Key,
  getActiveElement,
  getElement,
  getElements,
  getToggle,
  isSusceptibleToKeyboard,
  setElementFocus,
  setElementSelection,
  setToggle,
  watchKeyboard
} from "browser"
import { useComponent } from "components"

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
export interface Keyboard extends Key {
  mode: KeyboardMode                   /* Keyboard mode */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Set up keyboard
 *
 * This function will set up the keyboard handlers and ensure that keys are
 * correctly propagated. Currently there are two modes:
 *
 * - `global`: This mode is active when the search is closed. It is intended
 *   to assign hotkeys to specific functions of the site. Currently the search,
 *   previous and next page can be triggered.
 *
 * - `search`: This mode is active when the search is open. It maps certain
 *   navigational keys to offer search results that can be entirely navigated
 *   through keyboard input.
 *
 * The keyboard observable is returned and can be used to monitor the keyboard
 * in order toassign further hotkeys to custom functions.
 *
 * @return Keyboard observable
 */
export function setupKeyboard(): Observable<Keyboard> {
  const keyboard$ = watchKeyboard()
    .pipe(
      map<Key, Keyboard>(key => ({
        mode: getToggle("search") ? "search" : "global",
        ...key
      })),
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

  /* Set up search keyboard handlers */
  keyboard$
    .pipe(
      filter(({ mode }) => mode === "search"),
      withLatestFrom(
        useComponent("search-query"),
        useComponent("search-result")
      )
    )
      .subscribe(([key, query, result]) => {
        const active = getActiveElement()
        switch (key.type) {

          /* Enter: prevent form submission */
          case "Enter":
            if (active === query)
              key.claim()
            break

          /* Escape or Tab: close search */
          case "Escape":
          case "Tab":
            setToggle("search", false)
            setElementFocus(query, false)
            break

          /* Vertical arrows: select previous or next search result */
          case "ArrowUp":
          case "ArrowDown":
            if (typeof active === "undefined") {
              setElementFocus(query)
            } else {
              const els = [query, ...getElements("[href]", result)]
              const i = Math.max(0, (
                Math.max(0, els.indexOf(active)) + els.length + (
                  key.type === "ArrowUp" ? -1 : +1
                )
              ) % els.length)
              setElementFocus(els[i])
            }

            /* Prevent scrolling of page */
            key.claim()
            break

          /* All other keys: hand to search query */
          default:
            if (query !== getActiveElement())
              setElementFocus(query)
        }
      })

  /* Set up global keyboard handlers */
  keyboard$
    .pipe(
      filter(({ mode }) => mode === "global"),
      withLatestFrom(useComponent("search-query"))
    )
      .subscribe(([key, query]) => {
        switch (key.type) {

          /* Open search and select query */
          case "f":
          case "s":
          case "/":
            setElementFocus(query)
            setElementSelection(query)
            key.claim()
            break

          /* Go to previous page */
          case "p":
          case ",":
            const prev = getElement("[href][rel=prev]")
            if (typeof prev !== "undefined")
              prev.click()
            break

          /* Go to next page */
          case "n":
          case ".":
            const next = getElement("[href][rel=next]")
            if (typeof next !== "undefined")
              next.click()
            break
        }
      })

  /* Return keyboard */
  return keyboard$
}

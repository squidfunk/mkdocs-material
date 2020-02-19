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
import { switchMap, withLatestFrom } from "rxjs/operators"

import { useComponent } from "components"
import {
  Key,
  getActiveElement,
  getElements,
  isSusceptibleToKeyboard,
  setElementFocus,
  setToggle,
  useToggle,
  watchKeyboard,
  watchToggle
} from "observables"
import { not, takeIf } from "utilities"

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Setup keyboard
 *
 * @return Keyboard observable
 */
export function setupKeyboard(): Observable<Key> {
  const keyboard$ = watchKeyboard()

  /* Setup keyboard handlers in search mode */
  const toggle$ = useToggle("search")
  keyboard$
    .pipe(
      takeIf(toggle$.pipe(switchMap(watchToggle))),
      withLatestFrom(
        toggle$,
        useComponent("search-query"),
        useComponent("search-result")
      )
    )
      .subscribe(([key, toggle, query, result]) => {
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
            setToggle(toggle, false)
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

  /* Setup general keyboard handlers */
  keyboard$
    .pipe(
      takeIf(not(toggle$.pipe(switchMap(watchToggle)))),
      withLatestFrom(useComponent("search-query"))
    )
      .subscribe(([key, query]) => {
        const active = getActiveElement()
        switch (key.type) {

          /* [s]earch / [f]ind: open search  */
          case "s":
          case "f":
            if (!(active && isSusceptibleToKeyboard(active))) {
              setElementFocus(query)
              key.claim()
            }
            break
        }
      })

  /* Return keyboard observable */
  return keyboard$
}

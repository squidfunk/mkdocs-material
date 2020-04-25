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

import { Subject, animationFrameScheduler, of } from "rxjs"
import {
  delay,
  map,
  observeOn,
  switchMap,
  tap
} from "rxjs/operators"

import { createElement } from "browser"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Setup options
 */
interface SetupOptions {
  duration?: number                    /* Display duration (default: 2s) */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Set up dialog
 *
 * @param options - Options
 *
 * @return Dialog observable
 */
export function setupDialog(
  { duration }: SetupOptions = {}
): Subject<string> {
  const dialog$ = new Subject<string>()

  /* Create dialog */
  const dialog = createElement("div")                                           // TODO: improve scoping
  dialog.classList.add("md-dialog", "md-typeset")

  /* Display dialog */
  dialog$
    .pipe(
      switchMap(text => of(document.body) // useComponent("container")
        .pipe(
          map(container => container.appendChild(dialog)),
          observeOn(animationFrameScheduler),
          delay(1), // Strangley it doesnt work when we push things to the new animation frame...
          tap(el => {
            el.innerHTML = text
            el.setAttribute("data-md-state", "open")
          }),
          delay(duration || 2000),
          tap(el => el.removeAttribute("data-md-state")),
          delay(400),
          tap(el => {
            el.innerHTML = ""
            el.remove()
          })
        )
      )
    )
      .subscribe()

  /* Return dialog */
  return dialog$
}

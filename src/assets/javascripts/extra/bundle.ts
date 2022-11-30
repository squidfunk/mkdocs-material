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
  NEVER,
  ReplaySubject,
  delay,
  distinctUntilChanged,
  filter,
  finalize,
  fromEvent,
  interval,
  merge,
  mergeMap,
  of,
  repeat,
  switchMap,
  take,
  takeUntil,
  tap,
  withLatestFrom
} from "rxjs"

/* ----------------------------------------------------------------------------
 * Script
 * ------------------------------------------------------------------------- */

/* Append container for instances */
const container = document.createElement("div")
document.body.appendChild(container)

/* Append button next to palette toggle */
const header = document.querySelector(".md-header__title")
if (header) {
  const button = document.createElement("button")
  button.className = "md-header__button md-icon ᴴₒᴴₒᴴₒ__button"
  if (header.parentElement)
    header.insertAdjacentElement("afterend", button)

  /* Toggle animation */
  const on$ = new ReplaySubject<boolean>(1)
  on$
    .pipe(
      distinctUntilChanged()
    )
      .subscribe(on => {
        sessionStorage.setItem("ᴴₒᴴₒᴴₒ", `${on}`)
        button.hidden = !on
      })

  /* Load state from session storage */
  on$.next(JSON.parse(sessionStorage.getItem("ᴴₒᴴₒᴴₒ") || "true"))
  fromEvent(button, "click")
    .pipe(
      withLatestFrom(on$)
    )
      .subscribe(([, on]) => on$.next(!on))

  /* Generate instances */
  interval(250)
    .pipe(
      takeUntil(on$.pipe(filter(on => !on))),
      take(75),
      repeat({ delay: () => on$.pipe(filter(on => on)) }),
      mergeMap(() => {
        const instance = document.createElement("div")
        instance.className = "ᴴₒᴴₒᴴₒ"
        instance.ariaHidden = "true"
        container.appendChild(instance)
        return merge(NEVER, of(instance))
          .pipe(
            finalize(() => instance.remove()),
            takeUntil(on$.pipe(filter(on => !on))),
            switchMap(el => fromEvent(el, "click")
              .pipe(
                tap(() => el.classList.add("ᴴₒᴴₒᴴₒ--ᵍₒᵗ꜀ᴴₐ")),
                delay(1000),
                tap(() => el.classList.remove("ᴴₒᴴₒᴴₒ--ᵍₒᵗ꜀ᴴₐ"))
              )
            )
          )
      })
    )
      .subscribe()
}

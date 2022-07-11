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
  Observable,
  combineLatest,
  delay,
  map,
  of,
  switchMap,
  withLatestFrom
} from "rxjs"

import {
  Viewport,
  watchToggle
} from "~/browser"

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Patch options
 */
interface PatchOptions {
  viewport$: Observable<Viewport>      /* Viewport observable */
  tablet$: Observable<boolean>         /* Media tablet observable */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Patch the document body to lock when search is open
 *
 * For mobile and tablet viewports, the search is rendered full screen, which
 * leads to scroll leaking when at the top or bottom of the search result. This
 * function locks the body when the search is in full screen mode, and restores
 * the scroll position when leaving.
 *
 * @param options - Options
 */
export function patchScrolllock(
  { viewport$, tablet$ }: PatchOptions
): void {
  combineLatest([watchToggle("search"), tablet$])
    .pipe(
      map(([active, tablet]) => active && !tablet),
      switchMap(active => of(active)
        .pipe(
          delay(active ? 400 : 100)
        )
      ),
      withLatestFrom(viewport$)
    )
      .subscribe(([active, { offset: { y }}]) => {
        if (active) {
          document.body.setAttribute("data-md-scrolllock", "")
          document.body.style.top = `-${y}px`
        } else {
          const value = -1 * parseInt(document.body.style.top, 10)
          document.body.removeAttribute("data-md-scrolllock")
          document.body.style.top = ""
          if (value)
            window.scrollTo(0, value)
        }
      })
}

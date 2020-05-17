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

import { Observable, combineLatest } from "rxjs"
import { distinctUntilKeyChanged, map } from "rxjs/operators"

import { Viewport, getElements } from "browser"

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Mount options
 */
interface MountOptions {
  document$: Observable<Document>      /* Document observable */
  viewport$: Observable<Viewport>      /* Viewport observable */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Patch all `code` elements
 *
 * This function will make overflowing code blocks focusable via keyboard, so
 * they can be scrolled without a mouse.
 *
 * @param options - Options
 */
export function patchCodeBlocks(
  { document$, viewport$ }: MountOptions
): void {
  const els$ = document$
    .pipe(
      map(() => getElements<HTMLTableElement>("pre > code"))
    )

  /* Observe viewport size only */
  const size$ = viewport$
    .pipe(
      distinctUntilKeyChanged("size")
    )

  /* Make overflowing elements focusable */
  combineLatest([els$, size$])
    .subscribe(([els]) => {
      for (const el of els) {
        if (el.scrollWidth > el.clientWidth)
          el.setAttribute("tabindex", "0")
        else
          el.removeAttribute("tabindex")
      }
    })
}

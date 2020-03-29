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
import { map } from "rxjs/operators"

import {
  createElement,
  getElements,
  replaceElement
} from "browser"
import { renderTable } from "templates"

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Mount options
 */
interface MountOptions {
  document$: Observable<Document>      /* Document observable */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Patch all `table` elements
 *
 * This function will re-render all tables by wrapping them to improve overflow
 * scrolling on smaller screen sizes.
 *
 * @param options - Options
 */
export function patchTables(
  { document$ }: MountOptions
): void {
  const sentinel = createElement("table")
  document$
    .pipe(
      map(() => getElements<HTMLTableElement>("table:not([class])"))
    )
      .subscribe(els => {
        for (const el of els) {
          replaceElement(el, sentinel)
          replaceElement(sentinel, renderTable(el))
        }
      })
}

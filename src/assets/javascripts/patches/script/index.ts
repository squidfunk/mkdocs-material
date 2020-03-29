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
import { map, skip, withLatestFrom } from "rxjs/operators"

import {
  createElement,
  getElements,
  replaceElement
} from "browser"
import { useComponent } from "components"

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Patch options
 */
interface PatchOptions {
  document$: Observable<Document>      /* Document observable */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Patch all `script` elements
 *
 * This function must be run after a document switch, which means the first
 * emission must be ignored.
 *
 * @param options - Options
 */
export function patchScripts(
  { document$ }: PatchOptions
): void {
  const els$ = document$
    .pipe(
      skip(1),
      withLatestFrom(useComponent("container")),
      map(([, el]) => getElements<HTMLScriptElement>("script", el))
    )

  /* Evaluate all scripts via replacement */
  els$.subscribe(els => {
    for (const el of els) {
      if (el.src || /(^|\/javascript)$/i.test(el.type)) {
        const script = createElement("script")
        const key = el.src ? "src" : "textContent"
        script[key] = el[key]!
        replaceElement(el, script)
      }
    }
  })
}

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

import ClipboardJS from "clipboard"
import {
  Observable,
  Subject,
  map,
  tap
} from "rxjs"

import { translation } from "~/_"
import { getElement } from "~/browser"

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Setup options
 */
interface SetupOptions {
  alert$: Subject<string>              /* Alert subject */
}

/* ----------------------------------------------------------------------------
 * Helper functions
 * ------------------------------------------------------------------------- */

/**
 * Extract text to copy
 *
 * @param el - HTML element
 *
 * @returns Extracted text
 */
function extract(el: HTMLElement): string {
  el.setAttribute("data-md-copying", "")
  const copy = el.closest("[data-copy]")
  const text = copy
    ? copy.getAttribute("data-copy")!
    : el.innerText
  el.removeAttribute("data-md-copying")
  return text.trimEnd()
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Set up Clipboard.js integration
 *
 * @param options - Options
 */
export function setupClipboardJS(
  { alert$ }: SetupOptions
): void {
  if (ClipboardJS.isSupported()) {
    new Observable<ClipboardJS.Event>(subscriber => {
      new ClipboardJS("[data-clipboard-target], [data-clipboard-text]", {
        text: el => (
          el.getAttribute("data-clipboard-text")! ||
          extract(getElement(
            el.getAttribute("data-clipboard-target")!
          ))
        )
      })
        .on("success", ev => subscriber.next(ev))
    })
      .pipe(
        tap(ev => {
          const trigger = ev.trigger as HTMLElement
          trigger.focus()
        }),
        map(() => translation("clipboard.copied"))
      )
        .subscribe(alert$)
  }
}

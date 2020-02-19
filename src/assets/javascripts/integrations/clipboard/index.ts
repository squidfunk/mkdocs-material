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

import * as ClipboardJS from "clipboard"
import { NEVER, Observable, fromEventPattern } from "rxjs"
import { shareReplay } from "rxjs/operators"

import { getElements } from "observables"
import { renderClipboard } from "templates"

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Setup options
 */
interface SetupOptions {
  document$: Observable<Document>      /* Document observable */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Setup clipboard
 *
 * This function implements the Clipboard.js integration and injects a button
 * into all code blocks when the document changes.
 *
 * @param options - Options
 *
 * @return Clipboard observable
 */
export function setupClipboard(
  { document$ }: SetupOptions
): Observable<ClipboardJS.Event> {
  if (!ClipboardJS.isSupported())
    return NEVER

  /* Inject 'copy-to-clipboard' buttons */
  document$
    .subscribe(() => {
      const blocks = getElements("pre > code")
      for (const [index, block] of blocks.entries()) {
        const parent = block.parentElement!
        parent.id = `__code_${index}`
        parent.insertBefore(renderClipboard(parent.id), block)
      }
    })

  /* Initialize and setup clipboard */
  const clipboard$ = fromEventPattern<ClipboardJS.Event>(next => {
    new ClipboardJS(".md-clipboard").on("success", next)
  })

  // TODO: integrate rendering of dialog

  /*  */
  return clipboard$
    .pipe(
      shareReplay(1)
    )
}

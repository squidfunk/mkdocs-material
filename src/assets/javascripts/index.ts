/*
 * Copyright (c) 2016-2019 Martin Donath <martin.donath@squidfunk.com>
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

import { shareReplay, switchMap } from "rxjs/operators"

import { isConfig } from "./config"
import {
  setupSidebar,
  switchComponent,
  switchMapIfActive,
  watchComponentMap,
  watchHeader,
  watchMain
} from "./theme"
import {
  watchDocument,
  watchDocumentSwitch,
  watchLocation,
  watchLocationFragment,
  watchMedia,
  watchViewportOffset,
  watchViewportSize
} from "./ui"

// TBD

const names = [
  "header",                          /* Header */
  "title",                           /* Header title */
  "search",                          /* Search */
  "query",                           /* Search input */
  "reset",                           /* Search reset */
  "result",                          /* Search results */
  "container",                       /* Container */
  "main",                            /* Main area */
  "hero",                            /* Hero */
  "tabs",                            /* Tabs */
  "navigation",                      /* Navigation */
  "toc"                              /* Table of contents */
] as const // TODO: put this somewhere else... (merge with config!) JSON schema!?

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Initialize Material for MkDocs
 *
 * @param config - Configuration
 */
export function initialize(config: unknown) {
  if (!isConfig(config))
    throw new SyntaxError(`Invalid configuration: ${JSON.stringify(config)}`)

  /* ----------------------------------------------------------------------- */

  /* Create viewport observables */
  const offset$   = watchViewportOffset()
  const size$     = watchViewportSize()

  /* Create media observables */
  const screen$   = watchMedia("(min-width: 1220px)")
  const tablet$   = watchMedia("(min-width: 960px)")

  /* Create location observables */
  const url$      = watchLocation()
  const fragment$ = watchLocationFragment()

  /* Create document observables */
  const load$     = watchDocument()
  const switch$   = watchDocumentSwitch({ url$ })

  /* ----------------------------------------------------------------------- */

  /* Create component map observable */
  const components$ = watchComponentMap(names, { load$, switch$ })

  /* Create header observable */
  const header$ = components$
    .pipe(
      switchComponent("header"),
      switchMap(watchHeader)
    )

  /* Create main area observable */
  const main$ = components$
    .pipe(
      switchComponent("main"),
      switchMap(el => watchMain(el, { size$, offset$, header$ })),
      shareReplay(1)
    )

  /* ----------------------------------------------------------------------- */

  /* Create sidebar with navigation */
  screen$
    .pipe(
      switchMapIfActive(() => components$ // TODO: write an observable creation function...
        .pipe(
          switchComponent("navigation"),
          switchMap(el => setupSidebar(el, { offset$, main$ }))
        )
      )
    )
      .subscribe()

  /* Create sidebar with table of contents (missing on 404 page) */
  tablet$
    .pipe(
      switchMapIfActive(() => components$
        .pipe(
          switchComponent("toc"),
          switchMap(el => setupSidebar(el, { offset$, main$ }))
        )
      )
    )
      .subscribe(console.log)

  /* Return all observables */
  return {
    ui: {
      document: { load$, switch$ },
      location: { url$, fragment$ },
      media: { screen$, tablet$ },
      viewport: { offset$, size$ }
    }
  }
}

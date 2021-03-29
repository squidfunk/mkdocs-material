/*
 * Copyright (c) 2016-2021 Martin Donath <martin.donath@squidfunk.com>
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

import "focus-visible"
import { NEVER, Subject, defer, merge } from "rxjs"
import {
  delay,
  filter,
  map,
  mergeWith,
  shareReplay,
  switchMap
} from "rxjs/operators"

import { configuration, feature } from "./_"
import {
  at,
  getElement,
  requestJSON,
  setToggle,
  watchDocument,
  watchKeyboard,
  watchLocation,
  watchLocationTarget,
  watchMedia,
  watchPrint,
  watchViewport
} from "./browser"
import {
  getComponentElement,
  getComponentElements,
  mountBackToTop,
  mountContent,
  mountDialog,
  mountHeader,
  mountHeaderTitle,
  mountPalette,
  mountSearch,
  mountSidebar,
  mountSource,
  mountTableOfContents,
  mountTabs,
  watchHeader,
  watchMain
} from "./components"
import {
  SearchIndex,
  setupClipboardJS,
  setupInstantLoading,
  setupVersionSelector
} from "./integrations"
import {
  patchIndeterminate,
  patchScrollfix,
  patchScrolllock
} from "./patches"

/* ----------------------------------------------------------------------------
 * Application
 * ------------------------------------------------------------------------- */

/* Yay, JavaScript is available */
document.documentElement.classList.remove("no-js")
document.documentElement.classList.add("js")

/* Set up navigation observables and subjects */
const document$ = watchDocument()
const location$ = watchLocation()
const target$   = watchLocationTarget()
const keyboard$ = watchKeyboard()

/* Set up media observables */
const viewport$ = watchViewport()
const tablet$   = watchMedia("(min-width: 960px)")
const screen$   = watchMedia("(min-width: 1220px)")
const print$    = watchPrint()

/* Retrieve search index, if search is enabled */
const config = configuration()
const index$ = document.forms.namedItem("search")
  ? __search?.index || requestJSON<SearchIndex>(
    `${config.base}/search/search_index.json`
  )
  : NEVER

/* Set up Clipboard.js integration */
const alert$ = new Subject<string>()
setupClipboardJS({ alert$ })

/* Set up instant loading, if enabled */
if (feature("navigation.instant"))
  setupInstantLoading({ document$, location$, viewport$ })

/* Set up version selector */
if (config.version?.provider === "mike")
  setupVersionSelector()

/* Always close drawer and search on navigation */
merge(location$, target$)
  .pipe(
    delay(125)
  )
    .subscribe(() => {
      setToggle("drawer", false)
      setToggle("search", false)
    })

/* Set up global keyboard handlers */
keyboard$
  .pipe(
    filter(({ mode }) => mode === "global")
  )
    .subscribe(key => {
      switch (key.type) {

        /* Go to previous page */
        case "p":
        case ",":
          const prev = getElement("[href][rel=prev]")
          if (typeof prev !== "undefined")
            prev.click()
          break

        /* Go to next page */
        case "n":
        case ".":
          const next = getElement("[href][rel=next]")
          if (typeof next !== "undefined")
            next.click()
          break
      }
    })

/* Set up patches */
patchIndeterminate({ document$, tablet$ })
patchScrollfix({ document$ })
patchScrolllock({ viewport$, tablet$ })

/* Set up header and main area observable */
const header$ = watchHeader(getComponentElement("header"), { viewport$ })
const main$ = document$
  .pipe(
    map(() => getComponentElement("main")),
    switchMap(el => watchMain(el, { viewport$, header$ })),
    shareReplay(1)
  )

/* Set up control component observables */
const control$ = merge(

  /* Dialog */
  ...getComponentElements("dialog")
    .map(el => mountDialog(el, { alert$ })),

  /* Header */
  ...getComponentElements("header")
    .map(el => mountHeader(el, { viewport$, header$, main$ })),

  /* Color palette */
  ...getComponentElements("palette")
    .map(el => mountPalette(el)),

  /* Search */
  ...getComponentElements("search")
    .map(el => mountSearch(el, { index$, keyboard$ })),

  /* Repository information */
  ...getComponentElements("source")
    .map(el => mountSource(el))
)

/* Set up content component observables */
const content$ = defer(() => merge(

  /* Content */
  ...getComponentElements("content")
    .map(el => mountContent(el, { target$, viewport$, print$ })),

  /* Header title */
  ...getComponentElements("header-title")
    .map(el => mountHeaderTitle(el, { viewport$, header$ })),

  /* Sidebar */
  ...getComponentElements("sidebar")
    .map(el => el.getAttribute("data-md-type") === "navigation"
      ? at(screen$, () => mountSidebar(el, { viewport$, header$, main$ }))
      : at(tablet$, () => mountSidebar(el, { viewport$, header$, main$ }))
    ),

  /* Navigation tabs */
  ...getComponentElements("tabs")
    .map(el => mountTabs(el, { viewport$, header$ })),

  /* Table of contents */
  ...getComponentElements("toc")
    .map(el => mountTableOfContents(el, { viewport$, header$ })),

  /* Back-to-top button */
  ...getComponentElements("top")
    .map(el => mountBackToTop(el, { viewport$, main$ }))
))

/* Set up component observables */
const component$ = document$
  .pipe(
    switchMap(() => content$),
    mergeWith(control$),
    shareReplay(1)
  )

/* Subscribe to all components */
component$.subscribe()

/* ----------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------- */

window.document$  = document$          /* Document observable */
window.location$  = location$          /* Location subject */
window.target$    = target$            /* Location target observable */
window.keyboard$  = keyboard$          /* Keyboard observable */
window.viewport$  = viewport$          /* Viewport observable */
window.tablet$    = tablet$            /* Tablet observable */
window.screen$    = screen$            /* Screen observable */
window.print$     = print$             /* Print mode observable */
window.alert$     = alert$             /* Alert subject */
window.component$ = component$         /* Component observable */

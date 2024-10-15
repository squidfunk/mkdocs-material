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

import "focus-visible"

import {
  EMPTY,
  NEVER,
  Observable,
  Subject,
  defer,
  delay,
  filter,
  map,
  merge,
  mergeWith,
  shareReplay,
  switchMap
} from "rxjs"

import { configuration, feature } from "./_"
import {
  at,
  getActiveElement,
  getOptionalElement,
  requestJSON,
  setLocation,
  setToggle,
  watchDocument,
  watchKeyboard,
  watchLocation,
  watchLocationTarget,
  watchMedia,
  watchPrint,
  watchScript,
  watchViewport
} from "./browser"
import {
  getComponentElement,
  getComponentElements,
  mountAnnounce,
  mountBackToTop,
  mountConsent,
  mountContent,
  mountDialog,
  mountHeader,
  mountHeaderTitle,
  mountPalette,
  mountProgress,
  mountSearch,
  mountSearchHiglight,
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
  setupInstantNavigation,
  setupVersionSelector
} from "./integrations"
import {
  patchEllipsis,
  patchIndeterminate,
  patchScrollfix,
  patchScrolllock
} from "./patches"
import "./polyfills"

/* ----------------------------------------------------------------------------
 * Functions - @todo refactor
 * ------------------------------------------------------------------------- */

/**
 * Fetch search index
 *
 * @returns Search index observable
 */
function fetchSearchIndex(): Observable<SearchIndex> {
  if (location.protocol === "file:") {
    return watchScript(
      `${new URL("search/search_index.js", config.base)}`
    )
      .pipe(
        // @ts-ignore - @todo fix typings
        map(() => __index),
        shareReplay(1)
      )
  } else {
    return requestJSON<SearchIndex>(
      new URL("search/search_index.json", config.base)
    )
  }
}

/* ----------------------------------------------------------------------------
 * Application
 * ------------------------------------------------------------------------- */

/* Yay, JavaScript is available */
document.documentElement.classList.remove("no-js")
document.documentElement.classList.add("js")

/* Set up navigation observables and subjects */
const document$ = watchDocument()
const location$ = watchLocation()
const target$   = watchLocationTarget(location$)
const keyboard$ = watchKeyboard()

/* Set up media observables */
const viewport$ = watchViewport()
const tablet$   = watchMedia("(min-width: 960px)")
const screen$   = watchMedia("(min-width: 1220px)")
const print$    = watchPrint()

/* Retrieve search index, if search is enabled */
const config = configuration()
const index$ = document.forms.namedItem("search")
  ? fetchSearchIndex()
  : NEVER

/* Set up Clipboard.js integration */
const alert$ = new Subject<string>()
setupClipboardJS({ alert$ })

/* Set up progress indicator */
const progress$ = new Subject<number>()

/* Set up instant navigation, if enabled */
if (feature("navigation.instant"))
  setupInstantNavigation({ location$, viewport$, progress$ })
    .subscribe(document$)

/* Set up version selector */
if (config.version?.provider === "mike")
  setupVersionSelector({ document$ })

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
          const prev = getOptionalElement<HTMLLinkElement>("link[rel=prev]")
          if (typeof prev !== "undefined")
            setLocation(prev)
          break

        /* Go to next page */
        case "n":
        case ".":
          const next = getOptionalElement<HTMLLinkElement>("link[rel=next]")
          if (typeof next !== "undefined")
            setLocation(next)
          break

        /* Expand navigation, see https://bit.ly/3ZjG5io */
        case "Enter":
          const active = getActiveElement()
          if (active instanceof HTMLLabelElement)
            active.click()
      }
    })

/* Set up patches */
patchEllipsis({ viewport$, document$ })
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

  /* Consent */
  ...getComponentElements("consent")
    .map(el => mountConsent(el, { target$ })),

  /* Dialog */
  ...getComponentElements("dialog")
    .map(el => mountDialog(el, { alert$ })),

  /* Color palette */
  ...getComponentElements("palette")
    .map(el => mountPalette(el)),

  /* Progress bar */
  ...getComponentElements("progress")
    .map(el => mountProgress(el, { progress$ })),

  /* Search */
  ...getComponentElements("search")
    .map(el => mountSearch(el, { index$, keyboard$ })),

  /* Repository information */
  ...getComponentElements("source")
    .map(el => mountSource(el))
)

/* Set up content component observables */
const content$ = defer(() => merge(

  /* Announcement bar */
  ...getComponentElements("announce")
    .map(el => mountAnnounce(el)),

  /* Content */
  ...getComponentElements("content")
    .map(el => mountContent(el, { viewport$, target$, print$ })),

  /* Search highlighting */
  ...getComponentElements("content")
    .map(el => feature("search.highlight")
      ? mountSearchHiglight(el, { index$, location$ })
      : EMPTY
    ),

  /* Header */
  ...getComponentElements("header")
    .map(el => mountHeader(el, { viewport$, header$, main$ })),

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
    .map(el => mountTableOfContents(el, {
      viewport$, header$, main$, target$
    })),

  /* Back-to-top button */
  ...getComponentElements("top")
    .map(el => mountBackToTop(el, { viewport$, header$, main$, target$ }))
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
window.tablet$    = tablet$            /* Media tablet observable */
window.screen$    = screen$            /* Media screen observable */
window.print$     = print$             /* Media print observable */
window.alert$     = alert$             /* Alert subject */
window.progress$  = progress$          /* Progress indicator subject */
window.component$ = component$         /* Component observable */

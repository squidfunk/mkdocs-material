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

import "focus-visible"
import { Subject, defer, merge } from "rxjs"
import {
  map,
  mergeWith,
  shareReplay,
  switchMap
} from "rxjs/operators"

import { feature } from "./_"
import {
  at,
  getElementOrThrow,
  getElements,
  watchDocument,
  watchLocation,
  watchLocationTarget,
  watchMedia,
  watchPrint,
  watchViewport
} from "./browser"
import {
  mountContent,
  mountDialog,
  mountHeader,
  mountHeaderTitle,
  mountSearch,
  mountSidebar,
  mountSource,
  mountTableOfContents,
  mountTabs,
  watchHeader,
  watchMain
} from "./components"
import {
  setupClipboardJS,
  setupInstantLoading
} from "./integrations"
import {
  patchIndeterminate,
  patchScrollfix
} from "./patches"

/* ----------------------------------------------------------------------------
 * Program
 * ------------------------------------------------------------------------- */

/* Yay, JavaScript is available */
document.documentElement.classList.remove("no-js")
document.documentElement.classList.add("js")

/* Set up navigation observables */
const document$ = watchDocument()
const location$ = watchLocation()
const target$   = watchLocationTarget()

/* Set up media observables */
const viewport$ = watchViewport()
const tablet$   = watchMedia("(min-width: 960px)")
const screen$   = watchMedia("(min-width: 1220px)")
const print$    = watchPrint()

/* Set up Clipboard.js integration */
const alert$ = new Subject<string>()
setupClipboardJS({ alert$ })

/* Set up instant loading, if enabled */
if (feature("navigation.instant"))
  setupInstantLoading({ document$, location$, viewport$ })

/* Set up patches */
patchIndeterminate({ document$ })
patchScrollfix({ document$ })

/* Set up header observable */
const header$ = watchHeader(
  getElementOrThrow("[data-md-component=header]"),
  { viewport$ }
)

/* Set up main area observable */
const main$ = document$
  .pipe(
    map(() => getElementOrThrow("[data-md-component=main]")),
    switchMap(el => watchMain(el, { viewport$, header$ })),
    shareReplay(1)
  )

/* Set up control component observables */
const control$ = merge(

  /* Dialog */
  ...getElements("[data-md-component=dialog]")
    .map(child => mountDialog(child, { alert$ })),

    /* Header */
  ...getElements("[data-md-component=header]")
    .map(child => mountHeader(child, { viewport$, header$, main$ })),

  /* Search */
  ...getElements("[data-md-component=search]")
    .map(child => mountSearch(child)),

  /* Repository information */
  ...getElements("[data-md-component=source]")
    .map(child => mountSource(child as HTMLAnchorElement)),

  /* Navigation tabs */
  ...getElements("[data-md-component=tabs]")
    .map(child => mountTabs(child, { viewport$, header$ })),
)

/* Set up content component observables */
const content$ = defer(() => merge(

  /* Content */
  ...getElements("[data-md-component=content]")
    .map(child => mountContent(child, { target$, viewport$, print$ })),

  /* Header title */
  ...getElements("[data-md-component=header-title]")
    .map(child => mountHeaderTitle(child, { viewport$, header$ })),

  /* Sidebar */
  ...getElements("[data-md-component=sidebar]")
    .map(child => child.getAttribute("data-md-type") === "navigation"
      ? at(screen$, () => mountSidebar(child, { viewport$, header$, main$ }))
      : at(tablet$, () => mountSidebar(child, { viewport$, header$, main$ }))
    ),

  /* Table of contents */
  ...getElements("[data-md-component=toc]")
    .map(child => mountTableOfContents(child, { viewport$, header$ })),
))

/* Set up component observables */
const component$ = document$
  .pipe(
    switchMap(() => content$),
    mergeWith(control$)
  )

component$.subscribe()

/* Export to window */
export {
  document$,
  component$,
  viewport$,
  location$,
  target$,
  screen$,
  tablet$,
  print$
}

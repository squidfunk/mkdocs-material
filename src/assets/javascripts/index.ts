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
import { merge, NEVER, Observable, Subject } from "rxjs"
import { switchMap } from "rxjs/operators"

import {
  getElementOrThrow,
  getElements,
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
  setupClipboardJS
} from "./integrations"
import { translation } from "./_"

/* ----------------------------------------------------------------------------
 * Program
 * ------------------------------------------------------------------------- */

/* Yay, JavaScript is available */
document.documentElement.classList.remove("no-js")
document.documentElement.classList.add("js")

/* Set up subjects */
const target$   = watchLocationTarget()

/* Set up user interface observables */
const viewport$ = watchViewport()
const tablet$   = watchMedia("(min-width: 960px)")
const screen$   = watchMedia("(min-width: 1220px)")
const print$    = watchPrint()

// these elements MUST be available
const header = getElementOrThrow("[data-md-component=header]")
const main   = getElementOrThrow("[data-md-component=main]")

const header$ = watchHeader(header)
const main$   = watchMain(main, { header$: header$, viewport$ })

/* Setup Clipboard.js integration */
const message$ = new Subject<string>()
setupClipboardJS()
  .subscribe(() => message$.next(translation("clipboard.copied")))

// TODO: watchElements + general mount function that takes a factory...
// + a toggle function (optionally)

// TODO: catch errors on all components when mounting, so one error doesn't
// take down the whole site.

const app$ = merge(

  /* Content */
  ...getElements("[data-md-component=content]")
    .map(child => mountContent(child, { target$, viewport$, print$ })),

  /* Dialog */
  ...getElements("[data-md-component=dialog]")
    .map(child => mountDialog(child, { message$ })),

  /* Header */
  ...getElements("[data-md-component=header]")
    .map(child => mountHeader(child, { viewport$, header$, main$ })),

  /* Header title */
  ...getElements("[data-md-component=header-title]")
    .map(child => mountHeaderTitle(child, { viewport$, header$ })),

  /* Search */
  ...getElements("[data-md-component=search]")
    .map(child => mountSearch(child)),

  /* Sidebar */
  ...getElements("[data-md-component=sidebar]")
    .map(child => child.getAttribute("data-md-type") === "navigation"
      ? at(screen$, () => mountSidebar(child, { viewport$, header$, main$ }))
      : at(tablet$, () => mountSidebar(child, { viewport$, header$, main$ }))
    ),

  /* Repository information */
  ...getElements("[data-md-component=source]")
    .map(child => mountSource(child as HTMLAnchorElement)),

  /* Navigation tabs */
  ...getElements("[data-md-component=tabs]")
    .map(child => mountTabs(child, { viewport$, header$ })),

  /* Table of contents */
  ...getElements("[data-md-component=toc]")
    .map(child => mountTableOfContents(child, { viewport$, header$ })),
)

app$.subscribe(console.log)


/* ------------------------------------------------------------------------- */

// put this somewhere else
function at<T>(
  toggle$: Observable<boolean>, factory: () => Observable<T>
) {
  return toggle$
    .pipe(
      switchMap(active => active ? factory() : NEVER),
    )
}

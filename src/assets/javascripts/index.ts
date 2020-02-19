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

// TODO: remove this after we finished refactoring
// tslint:disable

import "../stylesheets/app.scss"
import "../stylesheets/app-palette.scss"

import { values } from "ramda"
import {
  merge,
  of,
  combineLatest,
  animationFrameScheduler
} from "rxjs"
import {
  delay,
  switchMap,
  tap,
  filter,
  withLatestFrom,
  observeOn,
  take
} from "rxjs/operators"

import {
  watchToggle,
  setToggle,
  getElements,
  watchMedia,
  watchDocument,
  watchLocation,
  watchLocationHash,
  watchViewport,
  watchKeyboard,
  watchToggleMap,
  useToggle
} from "./observables"
import { setupSearchWorker } from "./workers"

import { setScrollLock, resetScrollLock } from "actions"
import {
  mountHeader,
  mountHero,
  mountMain,
  mountNavigation,
  mountSearch,
  mountTableOfContents,
  mountTabs,
  useComponent,
  watchComponentMap,
  mountHeaderTitle
} from "components"
import { setupClipboard } from "./integrations/clipboard"
import { setupKeyboard } from "./integrations/keyboard"
import {
  patchTables,
  patchDetails,
  patchScrollfix,
  patchSource
} from "patches"
import { takeIf, not, isConfig } from "utilities"
import { renderDialog } from "templates/dialog"

/* ------------------------------------------------------------------------- */

document.documentElement.classList.remove("no-js")
document.documentElement.classList.add("js")

/* Test for iOS */
if (navigator.userAgent.match(/(iPad|iPhone|iPod)/g))
  document.documentElement.classList.add("ios")

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

  // pass config here!?
  const document$ = watchDocument()
  const location$ = watchLocation()
  const hash$ = watchLocationHash()
  const keyboard$ = watchKeyboard()
  const viewport$ = watchViewport()
  const tablet$ = watchMedia("(min-width: 960px)")
  const screen$ = watchMedia("(min-width: 1220px)")

  /* ----------------------------------------------------------------------- */

  const worker = setupSearchWorker(config.worker.search, {
    base: config.base
  })

  /* ----------------------------------------------------------------------- */

  watchToggleMap([
    "drawer",                          /* Toggle for drawer */
    "search"                           /* Toggle for search */
  ], { document$ })

  watchComponentMap([
    "container",                       /* Container */
    "header",                          /* Header */
    "header-title",                    /* Header title */
    "hero",                            /* Hero */
    "main",                            /* Main area */
    "navigation",                      /* Navigation */
    "search",                          /* Search */
    "search-query",                    /* Search input */
    "search-reset",                    /* Search reset */
    "search-result",                   /* Search results */
    "tabs",                            /* Tabs */
    "toc"                              /* Table of contents */
  ], { document$ })

  /* Create header observable */
  const header$ = useComponent("header")
    .pipe(
      mountHeader({ viewport$ })
    )

  const main$ = useComponent("main")
    .pipe(
      mountMain({ header$, viewport$ })
    )

  /* ----------------------------------------------------------------------- */

  const search$ = useComponent("search")
    .pipe(
      mountSearch(worker)
    )

  const navigation$ = useComponent("navigation")
    .pipe(
      mountNavigation({ header$, main$, viewport$, screen$ })
    )

  const toc$ = useComponent("toc")
    .pipe(
      mountTableOfContents({ header$, main$, viewport$, tablet$ })
    )

  const tabs$ = useComponent("tabs")
    .pipe(
      mountTabs({ header$, viewport$, screen$ })
    )

  const hero$ = useComponent("hero")
    .pipe(
      mountHero({ header$, viewport$ })
    )

  // TODO: make this part of mountHeader!?
  const title$ = useComponent("header-title")
    .pipe(
      mountHeaderTitle({ header$, viewport$ })
    )

  /* ----------------------------------------------------------------------- */

  setupKeyboard({ keyboard$ })

  patchTables({ document$ })
  patchDetails({ document$, hash$ })
  patchSource({ document$ })

  /* Force 1px scroll offset to trigger overflow scrolling */
  if (navigator.userAgent.match(/(iPad|iPhone|iPod)/g))
    patchScrollfix({ document$ })

  // snackbar for copy to clipboard
  const dialog = renderDialog("Copied to Clipboard")
  setupClipboard({ document$ })
    .pipe(
      switchMap(ev => {
        ev.clearSelection()
        return useComponent("container")
          .pipe(
            tap(el => el.appendChild(dialog)), // only set text on dialog... render once...
            observeOn(animationFrameScheduler),
            tap(() => dialog.dataset.mdState = "open"),
            delay(2000),
            tap(() => dialog.dataset.mdState = ""),
            delay(400),
            tap(() => dialog.remove())
          )
      })
    )
    .subscribe()

  // TODO: general keyboard handler...
  // put into main!?

  /* ----------------------------------------------------------------------- */

  // Close drawer and search on hash change
  hash$.subscribe(x => {

    useToggle("drawer").subscribe(el => {
      setToggle(el, false)
    })
  })

  // TODO:
  hash$
    .pipe(
      switchMap(hash => {

        return useToggle("search")
          .pipe(
            filter(x => x.checked), // only active
            tap(toggle => setToggle(toggle, false)),
            delay(125), // ensure that it runs after the body scroll reset...
            tap(() => {
              location.hash = " "
              location.hash = hash
            }) // encapsulate this...
          )

      })
    )
      .subscribe()

  // Scroll lock
  const toggle$ = useToggle("search")
  combineLatest([
    toggle$.pipe(switchMap(watchToggle)),
    tablet$,
  ])
    .pipe(
      withLatestFrom(viewport$),
      switchMap(([[toggle, tablet], { offset: { y }}]) => {
        const active = toggle && !tablet
        return of(document.body)
          .pipe(
            delay(active ? 400 : 100),
            observeOn(animationFrameScheduler),
            tap(el => active
              ? setScrollLock(el, y)
              : resetScrollLock(el)
            )
          )
      })
    )
      .subscribe()

  /* ----------------------------------------------------------------------- */

  // if we use a single tab outside of search, unhide all permalinks.
  // TODO: experimental. necessary!?
  keyboard$
    .pipe(
      takeIf(not(toggle$.pipe(switchMap(watchToggle)))),
      filter(key => ["Tab"].includes(key.type)),
      take(1)
    )
    .subscribe(() => {
      for (const link of getElements(".headerlink"))
        link.style.visibility = "visible"
    })

  // build a notification component! feed txt into it...

  /* ----------------------------------------------------------------------- */

  const state = {
    search$,
    main$,
    navigation$,
    toc$,
    tabs$,
    hero$,
    title$
  }

  const { ...rest } = state
  merge(...values(rest))
    .subscribe() // potential memleak <-- use takeUntil

  return {
    // agent,
    state
  }
}

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
  combineLatest,
  animationFrameScheduler,
  fromEvent,
  of,
  NEVER
} from "rxjs"
import {
  delay,
  switchMap,
  tap,
  filter,
  withLatestFrom,
  observeOn,
  take,
  mapTo,
  shareReplay,
  switchMapTo
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
  watchToggleMap,
  useToggle,
  getElement,
  watchDocumentSwitch
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
  mountHeaderTitle,
  mountSearchQuery,
  mountSearchReset,
  mountSearchResult
} from "components"
import { setupClipboard } from "./integrations/clipboard"
import { setupKeyboard } from "./integrations/keyboard"
import {
  patchTables,
  patchDetails,
  patchScrollfix,
  patchSource
} from "patches"
import { isConfig } from "utilities"
import { setupDialog } from "integrations/dialog"

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

  const location$ = watchLocation()

  // instant loading
  const switch$ = config.feature.instant
    ? watchDocumentSwitch({ location$ })
    : NEVER

  const load$ = watchDocument()
  const document$ = merge(load$, switch$)
  const hash$ = watchLocationHash()
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
      mountHeader({ viewport$ }),
      shareReplay(1)
    )

  const main$ = useComponent("main")
    .pipe(
      mountMain({ header$, viewport$ }),
      shareReplay(1)
    )

  /* ----------------------------------------------------------------------- */

  /* Mount search query */
  const query$ = useComponent<HTMLInputElement>("search-query")
    .pipe(
      mountSearchQuery(worker),
      shareReplay(1) // TODO: this must be put onto EVERY component!
    )

  /* Mount search reset */
  const reset$ = useComponent("search-reset")
    .pipe(
      mountSearchReset(),
      shareReplay(1)
    )

  /* Mount search result */
  const result$ = useComponent("search-result")
    .pipe(
      mountSearchResult(worker, { query$ }),
      shareReplay(1)
    )

  /* ----------------------------------------------------------------------- */

  const search$ = useComponent("search")
    .pipe(
      mountSearch({ query$, reset$, result$ }),
      shareReplay(1)
    )

  /* ----------------------------------------------------------------------- */

  const navigation$ = useComponent("navigation")
    .pipe(
      mountNavigation({ header$, main$, viewport$, screen$ }),
      shareReplay(1)
    )

  const toc$ = useComponent("toc")
    .pipe(
      mountTableOfContents({ header$, main$, viewport$, tablet$ }),
      shareReplay(1)
    )

  const tabs$ = useComponent("tabs")
    .pipe(
      mountTabs({ header$, viewport$, screen$ }),
      shareReplay(1)
    )

  const hero$ = useComponent("hero")
    .pipe(
      mountHero({ header$, viewport$ }),
      shareReplay(1)
    )

  const title$ = useComponent("header-title")
    .pipe(
      mountHeaderTitle({ header$, viewport$ }),
      shareReplay(1)
    )

  /* ----------------------------------------------------------------------- */

  const keyboard$ = setupKeyboard()

  patchTables({ document$ })
  patchDetails({ document$, hash$ })
  patchSource({ document$ })

  /* Force 1px scroll offset to trigger overflow scrolling */
  if (navigator.userAgent.match(/(iPad|iPhone|iPod)/g))
    patchScrollfix({ document$ })

  /* Setup clipboard and dialog */
  const dialog$ = setupDialog()
  const clipboard$ = setupClipboard({ document$, dialog$ })

  /* ----------------------------------------------------------------------- */

  // Close drawer and search on hash change
  // put into navigation...
  hash$.subscribe(x => {
    useToggle("drawer").subscribe(el => {
      setToggle(el, false)
    })
  })

  // put into search...
  hash$
    .pipe(
      switchMap(hash => useToggle("search")
        .pipe(
          filter(x => x.checked), // only active
          tap(toggle => setToggle(toggle, false)),
          delay(125), // ensure that it runs after the body scroll reset...
          mapTo(hash)
        )
      )
    )
      .subscribe(hash => {
        getElement(hash)!.scrollIntoView()
      })

  // Scroll lock // document -> document$ => { body } !?
  // put into search...
  const toggle$ = useToggle("search")
  combineLatest([
    toggle$.pipe(switchMap(watchToggle)),
    tablet$,
  ])
    .pipe(
      withLatestFrom(viewport$),
      switchMap(([[toggle, tablet], { offset: { y }}]) => {
        const active = toggle && !tablet
        return document$
          .pipe(
            delay(active ? 400 : 100), // TOOD: directly combine this with the hash!
            observeOn(animationFrameScheduler),
            tap(({ body }) => active
              ? setScrollLock(body, y)
              : resetScrollLock(body)
            )
          )
      })
    )
      .subscribe()

  /* ----------------------------------------------------------------------- */

  // instant loading
  const instant$ = config.feature.instant ? load$ // TODO: just use document$ and take(1)
    .pipe(
      switchMap(({ body }) => fromEvent(body, "click")),
      switchMap(ev => {

        // two cases: search results which should always load from same domain
        // and/or
        if (ev.target && ev.target instanceof HTMLElement) {
          const anchor = ev.target.closest("a")
          if (anchor) {
            if (/(:\/\/|^#)/.test(anchor.getAttribute("href")!) === false) {
              ev.preventDefault()

              // we must copy the value, or weird stuff will happen
              const href = anchor.href
              history.pushState(true, "", href)
              return of(href)
            }
          }
        }
        return NEVER
      }),
      shareReplay(1)
    )
    : NEVER

  // deploy new location
  instant$.subscribe(url => {
    console.log(`Load ${url}`)
    location$.next(url)
  })

  // scroll to top when document is loaded
  instant$
    .pipe(
      switchMapTo(switch$), // TODO: just use document$ and skip(1)
    )
    .subscribe(() => {
      window.scrollTo(0, 0) // TODO: or scroll element into view
    })

  /* ----------------------------------------------------------------------- */

  // if we use a single tab outside of search, unhide all permalinks.
  // TODO: experimental. necessary!?
  keyboard$
    .pipe(
      filter(key => key.mode === "global" && ["Tab"].includes(key.type)),
      take(1)
    )
    .subscribe(() => {
      for (const link of getElements(".headerlink"))
        link.style.visibility = "visible"
    })

  /* ----------------------------------------------------------------------- */

  const state = {
    search$,
    clipboard$,
    location$,
    hash$,
    keyboard$,
    dialog$,
    main$,
    navigation$,
    toc$,
    tabs$,
    hero$,
    title$ // TODO: header title
  }

  const { ...rest } = state
  merge(...values(rest))
    .subscribe() // potential memleak <-- use takeUntil

  return {
    // agent,
    state
  }
}

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
  EMPTY,
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
  observeOn
} from "rxjs/operators"

import {
  getElement,
  watchToggle,
  getElements,
  watchMedia,
  watchDocument,
  watchLocation,
  watchLocationHash,
  watchViewport,
  watchKeyboard,
  watchToggleMap,
  useToggle,
  getActiveElement,
  mayReceiveKeyboardEvents
} from "./observables"
import { setupSearchWorker } from "./workers"
import { renderSource } from "templates"
import { setToggle, setScrollLock, resetScrollLock } from "actions"
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
import { mountClipboard } from "./integrations/clipboard"
import { patchTables, patchDetails, patchScrollfix } from "patches"
import { takeIf, not, isConfig } from "utilities"
import { fetchSourceFacts } from "integrations/source"

/* ------------------------------------------------------------------------- */

document.documentElement.classList.remove("no-js")
document.documentElement.classList.add("js")

/* Test for iOS */
if (navigator.userAgent.match(/(iPad|iPhone|iPod)/g))
  document.documentElement.classList.add("ios")

/* ------------------------------------------------------------------------- */

/**
 * Yes, this is a super hacky implementation. Needs clean up.
 */
function repository() {
  const el = getElement<HTMLAnchorElement>(".md-source[href]") // TODO: dont use classes
  // console.log(el)
  if (!el)
    return EMPTY

  const data = sessionStorage.getItem("repository")
  if (data) {
    const x = JSON.parse(data)
    return of(x)
  }

  return fetchSourceFacts(el.href)
    .pipe(
      tap(data => sessionStorage.setItem("repository", JSON.stringify(data)))
    )
}

// memoize

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
      mountSearch(worker, { keyboard$ }),
    )

  const navigation$ = useComponent("navigation")
    .pipe(
      mountNavigation({ main$, viewport$, screen$ })
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

  mountClipboard({ document$ })
    .subscribe()

  patchTables({ document$ })
    .subscribe()

  patchDetails({ document$ })
    .subscribe()

  /* Force 1px scroll offset to trigger overflow scrolling */
  if (navigator.userAgent.match(/(iPad|iPhone|iPod)/g))
    patchScrollfix({ document$ })
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

  // General keyboard handlers
  keyboard$
    .pipe(
      takeIf(not(toggle$.pipe(switchMap(watchToggle)))),
      filter(key => ["s", "f"].includes(key.type)),
      withLatestFrom(toggle$)
    )
      .subscribe(([key, toggle]) => {
        const el = getActiveElement()
        if (!(el && mayReceiveKeyboardEvents(el))) {
          setToggle(toggle, true)
          key.claim()
        }
      })

  /* ----------------------------------------------------------------------- */

  // TODO: WIP repo rendering
  repository().subscribe(facts => {
    if (facts.length) {
      const sources = getElements(".md-source__repository")
      sources.forEach(repo => {
        repo.dataset.mdState = "done"
        repo.appendChild(
          renderSource(facts)
        )
      })
    }
  })

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

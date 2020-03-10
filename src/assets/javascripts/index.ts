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

import "../stylesheets/main.scss"
import "../stylesheets/palette.scss"

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
  shareReplay,
  share
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
  isLocationInternal,
  isLocationAnchor
} from "./browser"
import { setupSearchWorker } from "./workers"

import {
  mountHeader,
  mountHero,
  mountMain,
  mountNavigation,
  mountSearch,
  mountTableOfContents,
  mountTabs,
  useComponent,
  setupComponents,
  mountSearchQuery,
  mountSearchReset,
  mountSearchResult
} from "components"
import { setupClipboard } from "./integrations/clipboard"
import { setupDialog } from "integrations/dialog"
import { setupKeyboard } from "./integrations/keyboard"
import { setupInstantLoading } from "integrations/instant"
import {
  patchTables,
  patchDetails,
  patchScrollfix,
  patchSource,
  patchScripts
} from "patches"
import { isConfig } from "utilities"

/* ------------------------------------------------------------------------- */

document.documentElement.classList.remove("no-js")
document.documentElement.classList.add("js")

/* Test for iOS */
if (navigator.userAgent.match(/(iPad|iPhone|iPod)/g))
  document.documentElement.classList.add("ios")

/**
 * Set scroll lock
 *
 * @param el - Scrollable element
 * @param value - Vertical offset
 */
export function setScrollLock(
  el: HTMLElement, value: number
): void {
  el.setAttribute("data-md-state", "lock")
  el.style.top = `-${value}px`
}

/**
 * Reset scroll lock
 *
 * @param el - Scrollable element
 */
export function resetScrollLock(
  el: HTMLElement
): void {
  const value = -1 * parseInt(el.style.top, 10)
  el.removeAttribute("data-md-state")
  el.style.top = ""
  if (value)
    window.scrollTo(0, value)
}

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

  /* Setup user interface observables */
  const location$ = watchLocation()
  const hash$     = watchLocationHash()
  const viewport$ = watchViewport()
  const tablet$   = watchMedia("(min-width: 960px)")
  const screen$   = watchMedia("(min-width: 1220px)")

  /* Setup document observable */
  const document$ = config.features.includes("instant")
    ? watchDocument({ location$ })
    : watchDocument()

  /* Setup component bindings */
  setupComponents([
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
    "skip",                            /* Skip link */
    "tabs",                            /* Tabs */
    "toc"                              /* Table of contents */
  ], { document$ })

  /* ----------------------------------------------------------------------- */

  // External index
  const index = config.search && config.search.index
    ? config.search.index
    : undefined

  // TODO: pass URL config as first parameter, options as second
  const worker = setupSearchWorker(config.url.worker.search, {
    base: config.url.base, index, location$
  })

  /* ----------------------------------------------------------------------- */

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
  const query$ = useComponent("search-query")
    .pipe(
      mountSearchQuery(worker),
      shareReplay(1)
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
      shareReplay(1) // shareReplay because there might be late subscribers
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

  /* ----------------------------------------------------------------------- */

  const keyboard$ = setupKeyboard()

  patchDetails({ document$, hash$ })
  patchScripts({ document$ })
  patchSource({ document$ })
  patchTables({ document$ })

  /* Force 1px scroll offset to trigger overflow scrolling */
  patchScrollfix({ document$ })

  /* Setup clipboard and dialog */
  const dialog$ = setupDialog()
  const clipboard$ = setupClipboard({ document$, dialog$ })

  /* ----------------------------------------------------------------------- */

  // // put into search...
  // hash$
  //   .pipe(
  //     switchMap(hash => useToggle("search")
  //       .pipe(
  //         filter(x => x.checked), // only active
  //         tap(toggle => setToggle(toggle, false)),
  //         delay(125), // ensure that it runs after the body scroll reset...
  //         mapTo(hash)
  //       )
  //     )
  //   )
  //     .subscribe(hash => {
  //       getElement(`[id="${hash}"]`)!.scrollIntoView()
  //     })

  // Scroll lock // document -> document$ => { body } !?
  // put into search...
  combineLatest([
    watchToggle("search"),
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

  /* Intercept internal link clicks */
  const link$ = fromEvent<MouseEvent>(document.body, "click")
    .pipe(
      filter(ev => !(ev.metaKey || ev.ctrlKey)),
      switchMap(ev => {
        if (ev.target instanceof HTMLElement) {
          const el = ev.target.closest("a") // TODO: abstract as link click?
          if (el && isLocationInternal(el)) {
            if (!isLocationAnchor(el) && config.features.includes("instant"))
              ev.preventDefault()
            return of(el)
          }
        }
        return NEVER
      }),
      share()
    )

  /* Always close drawer on click */
  link$.subscribe(() => {
    setToggle("drawer", false)
  })

  // somehow call this setupNavigation ?

  // instant loading
  if (config.features.includes("instant")) {

    /* Disable automatic scroll restoration, as it doesn't work nicely */
    if ("scrollRestoration" in history)
      history.scrollRestoration = "manual"

    /* Resolve relative links for stability */
    for (const selector of [
      `link[rel="shortcut icon"]`,
      // `link[rel="stylesheet"]` // reduce style computations
    ])
      for (const el of getElements<HTMLLinkElement>(selector))
        el.href = el.href

    setupInstantLoading({
      document$, link$, location$, viewport$
    })

  }

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

    /* Browser observables */
    document$,
    viewport$,

    /* Component observables */
    header$,
    hero$,
    main$,
    navigation$,
    search$,
    tabs$,
    toc$,

    /* Integation observables */
    clipboard$,
    keyboard$,
    dialog$
  }

  /* Subscribe to all observables */
  merge(...values(state))
    .subscribe()
  return state
}

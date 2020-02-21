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
  sample
} from "rxjs/operators"

import {
  watchToggle,
  setToggle,
  getElements,
  getLocation,
  watchMedia,
  watchDocument,
  watchLocation,
  watchLocationHash,
  watchViewport,
  setupToggles,
  useToggle,
  getElement,
  setViewportOffset
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
  setupComponents,
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

  /* Setup user interface observables */
  const location$ = watchLocation()
  const hash$     = watchLocationHash()
  const viewport$ = watchViewport()
  const tablet$   = watchMedia("(min-width: 960px)")
  const screen$   = watchMedia("(min-width: 1220px)")

  /* Setup document observable */
  const document$ = config.feature.instant
    ? watchDocument({ location$ })
    : watchDocument()

  /* Setup toggle bindings */
  setupToggles([
    "drawer",                          /* Toggle for drawer */
    "search"                           /* Toggle for search */
  ], { document$ })

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
    "tabs",                            /* Tabs */
    "toc"                              /* Table of contents */
  ], { document$ })

  /* ----------------------------------------------------------------------- */

  const worker = setupSearchWorker(config.worker.search, {
    base: config.base
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
        getElement(`[id="${hash}"]`)!.scrollIntoView()
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
  const instant$ = config.feature.instant ? document$ // TODO: just use document$ and take(1)
    .pipe(
      take(1), // only initial load
      switchMap(({ body }) => fromEvent(body, "click")),
      withLatestFrom(viewport$),
      switchMap(([ev, { offset }]) => {
        if (ev.target && ev.target instanceof HTMLElement) {
          const link = ev.target.closest("a")
          if (link) {
            if (/(:\/\/|^#)/.test(link.getAttribute("href")!) === false) {
              ev.preventDefault()

              // we must copy the value, or weird stuff will happen
              // remember scroll position!
              const href = link.href
              history.replaceState(offset, document.title)
              history.pushState({}, "", href)
              return of(href) // anchor.href
            }
          }
        }
        return NEVER
      }),
      shareReplay(1)
    )
    : NEVER

  // the location might change, but popstate might not be triggered which is
  // the case when we hit the back button on the same page. scroll to top.
  // location$
  //   .pipe(
  //     bufferCount(2, 1)
  //   )
  //     .subscribe(x => {
  //       console.log(x)
  //     })

  // deploy new location - can be written as instant$.subscribe(location$)
  instant$.subscribe(url => {
    console.log(`Load ${url}`)
    location$.next(url)
  })

  if ("scrollRestoration" in history)
    history.scrollRestoration = "manual"

  const pop$ = fromEvent<PopStateEvent>(window, "popstate")
    .pipe(
      shareReplay(1) // TODO: share() should be enough
    )

  pop$
    .subscribe(() => location$.next(getLocation()))

  pop$
    .pipe(
      sample(document$),
      withLatestFrom(document$),
    )
    .subscribe(([ev, { title, head }]) => {

      document.title = title

      // replace meta tags
      for (const selector of [
        "link[rel=canonical]",
        "meta[name=author]",
        "meta[name=description]"
      ]) {
        const next = getElement(selector, head)
        const prev = getElement(selector, document.head)
        if (
          typeof next !== "undefined" &&
          typeof prev !== "undefined"
        ) {
          prev.replaceWith(next)
        }
      }

      console.log(ev)
      if (ev.state)
        setViewportOffset(ev.state)
    })

  // make links absolute, so they remain stable
  for (const selector of [
    "link[rel='shortcut icon']",
    "link[rel='stylesheet']"
  ]) {
    for (const el of getElements<HTMLLinkElement>(selector))
      el.href = el.href
  }

  // if a new url is deployed via instant loading, switch to document observable
  // to exactly know when the content was loaded. then go to top.
  instant$
    .pipe(
      sample(document$),
      withLatestFrom(document$),
    )
    .subscribe(([url, { title, head }]) => {
      document.title = title

      // replace meta tags
      for (const selector of [
        "link[rel=canonical]",
        "meta[name=author]",
        "meta[name=description]"
      ]) {
        const next = getElement(selector, head)
        const prev = getElement(selector, document.head)
        if (
          typeof next !== "undefined" &&
          typeof prev !== "undefined"
        ) {
          prev.replaceWith(next)
        }
      }

      // TODO: this doesnt work as expected
      const { hash } = new URL(url)
      if (hash) {
        const el = getElement(hash)
        if (typeof el !== "undefined") {
          el.scrollIntoView()
          return
        }
      } else {
        // console.log("scroll to top")
        setViewportOffset({ y: 0 })
      }
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

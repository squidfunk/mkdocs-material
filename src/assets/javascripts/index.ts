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

// DISCLAIMER: this file is still WIP. There're some refactoring opportunities
// which must be tackled after we gathered some feedback on v5.
// tslint:disable

import "focus-visible"

import {
  merge,
  combineLatest,
  animationFrameScheduler,
  fromEvent,
  from,
  defer,
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
  catchError,
  map,
  bufferCount,
  distinctUntilKeyChanged
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
  isLocalLocation,
  setLocationHash,
  watchLocationBase,
  getElement
} from "browser"
import {
  mountHeader,
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
import {
  setupClipboard,
  setupDialog,
  setupKeyboard,
  setupInstantLoading,
  setupSearchWorker,
  SearchIndex,
  SearchIndexPipeline
} from "integrations"
import {
  patchCodeBlocks,
  patchTables,
  patchDetails,
  patchScrollfix,
  patchSource,
  patchScripts
} from "patches"
import { isConfig } from "utilities"

/* ------------------------------------------------------------------------- */

/* Denote that JavaScript is available */
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

  /* Set up subjects */
  const document$ = watchDocument()
  const location$ = watchLocation()

  /* Set up user interface observables */
  const base$     = watchLocationBase(config.base, { location$ })
  const hash$     = watchLocationHash()
  const viewport$ = watchViewport()
  const tablet$   = watchMedia("(min-width: 960px)")
  const screen$   = watchMedia("(min-width: 1220px)")

  /* ----------------------------------------------------------------------- */

  /* Set up component bindings */
  setupComponents([
    "announce",                        /* Announcement bar */
    "container",                       /* Container */
    "header",                          /* Header */
    "header-title",                    /* Header title */
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

  const keyboard$ = setupKeyboard()

  // Hack: only make code blocks focusable on non-touch devices
  if (matchMedia("(hover)").matches)
    patchCodeBlocks({ document$, viewport$ })
  patchDetails({ document$, hash$ })
  patchScripts({ document$ })
  patchSource({ document$ })
  patchTables({ document$ })

  /* Force 1px scroll offset to trigger overflow scrolling */
  patchScrollfix({ document$ })

  /* Set up clipboard and dialog */
  const dialog$ = setupDialog()
  const clipboard$ = setupClipboard({ document$, dialog$ })

  /* ----------------------------------------------------------------------- */

  /* Create header observable */
  const header$ = useComponent("header")
    .pipe(
      mountHeader({ document$, viewport$ }),
      shareReplay({ bufferSize: 1, refCount: true })
    )

  const main$ = useComponent("main")
    .pipe(
      mountMain({ header$, viewport$ }),
      shareReplay({ bufferSize: 1, refCount: true })
    )

  /* ----------------------------------------------------------------------- */

  const navigation$ = useComponent("navigation")
    .pipe(
      mountNavigation({ header$, main$, viewport$, screen$ }),
      shareReplay({ bufferSize: 1, refCount: true }) // shareReplay because there might be late subscribers
    )

  const toc$ = useComponent("toc")
    .pipe(
      mountTableOfContents({ header$, main$, viewport$, tablet$ }),
      shareReplay({ bufferSize: 1, refCount: true })
    )

  const tabs$ = useComponent("tabs")
    .pipe(
      mountTabs({ header$, viewport$, screen$ }),
      shareReplay({ bufferSize: 1, refCount: true })
    )

  /* ----------------------------------------------------------------------- */

  /* Search worker - only if search is present */
  const worker$ = useComponent("search")
    .pipe(
      switchMap(() => defer(() => {
        const index = config.search && config.search.index
          ? config.search.index
          : undefined

        /* Fetch index if it wasn't passed explicitly */
        const index$ = (
          typeof index !== "undefined"
            ? from(index)
            : base$
                .pipe(
                  switchMap(base => fetch(`${base}/search/search_index.json`, {
                    credentials: "same-origin"
                  }).then(res => res.json())) // SearchIndex
                )
        )

        return of(setupSearchWorker(config.search.worker, {
          base$, index$
        }))
      }))
    )

  /* ----------------------------------------------------------------------- */

  /* Mount search query */
  const search$ = worker$
    .pipe(
      switchMap(worker => {

        const query$ = useComponent("search-query")
          .pipe(
            mountSearchQuery(worker, { transform: config.search.transform }),
            shareReplay({ bufferSize: 1, refCount: true })
          )

        /* Mount search reset */
        const reset$ = useComponent("search-reset")
          .pipe(
            mountSearchReset(),
            shareReplay({ bufferSize: 1, refCount: true })
          )

        /* Mount search result */
        const result$ = useComponent("search-result")
          .pipe(
            mountSearchResult(worker, { query$ }),
            shareReplay({ bufferSize: 1, refCount: true })
          )

        return useComponent("search")
          .pipe(
            mountSearch(worker, { query$, reset$, result$ }),
          )
      }),
      catchError(() => {
        useComponent("search")
          .subscribe(el => el.hidden = true) // TODO: Hack
        return NEVER
      }),
      shareReplay({ bufferSize: 1, refCount: true })
    )

  /* ----------------------------------------------------------------------- */

  // // put into search...
  hash$
    .pipe(
      tap(() => setToggle("search", false)),
      delay(125), // ensure that it runs after the body scroll reset...
    )
      .subscribe(hash => setLocationHash(`#${hash}`))

  // TODO: scroll restoration must be centralized
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
            delay(active ? 400 : 100),
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

  /* Always close drawer on click */
  fromEvent<MouseEvent>(document.body, "click")
    .pipe(
      filter(ev => !(ev.metaKey || ev.ctrlKey)),
      filter(ev => {
        if (ev.target instanceof HTMLElement) {
          const el = ev.target.closest("a") // TODO: abstract as link click?
          if (el && isLocalLocation(el)) {
            return true
          }
        }
        return false
      })
    )
      .subscribe(() => {
        setToggle("drawer", false)
      })

  /* Enable instant loading, if not on file:// protocol */
  if (
    config.features.includes("navigation.instant") &&
    location.protocol !== "file:"
  ) {
    const dom = new DOMParser()

    /* Fetch sitemap and extract URL whitelist */
    base$
      .pipe(
        switchMap(base => from(fetch(`${base}/sitemap.xml`)
          .then(res => res.text())
          .then(text => dom.parseFromString(text, "text/xml"))
        )),
        withLatestFrom(base$),
        map(([document, base]) => {
          const urls = getElements("loc", document)
            .map(node => node.textContent!)

          // Hack: This is a temporary fix to normalize instant loading lookup
          // on localhost and Netlify previews. If this approach proves to be
          // suitable, we'll refactor URL whitelisting anyway. We take the two
          // shortest URLs and determine the common prefix to isolate the
          // domain. If there're no two domains, we just leave it as-is, as
          // there isn't anything to be loaded anway.
          if (urls.length > 1) {
            const [a, b] = urls.sort((a, b) => a.length - b.length)

            /* Determine common prefix */
            let index = 0
            if (a === b)
              index = a.length
            else
              while (a.charAt(index) === b.charAt(index))
                index++

            /* Replace common prefix (i.e. base) with effective base */
            for (let i = 0; i < urls.length; i++)
              urls[i] = urls[i].replace(a.slice(0, index), `${base}/`)
          }
          return urls
        })
      )
        .subscribe(urls => {
          setupInstantLoading(urls, { document$, location$, viewport$ })
        })
  }

  /* ----------------------------------------------------------------------- */

  // Make indeterminate toggles indeterminate to expand navigation on screen
  document$.subscribe(() => {
    const toggles = getElements<HTMLInputElement>("[data-md-state=indeterminate]")
    for (const toggle of toggles) {
      toggle.dataset.mdState = ""
      toggle.indeterminate = true
      toggle.checked = false
    }
  })

  // Auto hide header - this is still experimental, so there might be some
  // opportunities for refactoring, but we'll address them when this feature
  // got some feedback from the community.
  if (config.features.includes("header.autohide")) {
    viewport$
      .pipe(
        map(({ offset }) => offset.y),
        bufferCount(2, 1),
        map(([a, b]) => [a < b, b] as const),
        distinctUntilKeyChanged(0),
        switchMap(([direction, y0]) => viewport$
          .pipe(
            map(({ offset }) => offset.y),
            filter(y1 => y1 > 400),
            map(y1 => Math.abs(y0 - y1)),
            filter(y => y > 100),
            map(() => direction),
            take(1)
          )
        )
      )
        .subscribe(hide => {
          const header = getElement("[data-md-component=header]")
          header?.setAttribute("data-md-state", hide ? "hidden": "shadow")
        })
  }

  /* ----------------------------------------------------------------------- */

  const state = {

    /* Browser observables */
    document$,
    location$,
    viewport$,

    /* Component observables */
    header$,
    main$,
    navigation$,
    search$,
    tabs$,
    toc$,

    /* Integration observables */
    clipboard$,
    keyboard$,
    dialog$
  }

  /* Subscribe to all observables */
  merge(...Object.values(state))
    .subscribe()
  return state
}

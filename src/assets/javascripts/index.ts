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

import { sortBy, prop, values, identity } from "ramda"
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
import { ajax } from "rxjs/ajax"
import {
  delay,
  switchMap,
  tap,
  filter,
  withLatestFrom,
  observeOn,
  take,
  shareReplay,
  pluck,
  catchError,
  map
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
  watchLocationBase
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
  SearchIndex, SearchIndexPipeline
} from "integrations"
import {
  patchCodeBlocks,
  patchTables,
  patchDetails,
  patchScrollfix,
  patchSource,
  patchScripts
} from "patches"
import { isConfig, translate } from "utilities"

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
 * Helper functions
 * ------------------------------------------------------------------------- */

/**
 * Set up search index
 *
 * @param data - Search index
 *
 * @return Search index
 */
function setupSearchIndex(                                                      // Hack: move this outside here, temporarily...
  { config, docs, index }: SearchIndex
): SearchIndex {

  /* Override default language with value from translation */
  if (config.lang.length === 1 && config.lang[0] === "en")
    config.lang = [translate("search.config.lang")]

  /* Override default separator with value from translation */
  if (config.separator === "[\\s\\-]+")
    config.separator = translate("search.config.separator")

  /* Set pipeline from translation */
  const pipeline = translate("search.config.pipeline")
    .split(/\s*,\s*/)
    .filter(identity) as SearchIndexPipeline

  /* Return search index after defaulting */
  return { config, docs, index, pipeline }
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
                  switchMap(base => ajax({
                    url: `${base}/search/search_index.json`,
                    responseType: "json",
                    withCredentials: true
                  })
                    .pipe<SearchIndex>(
                      pluck("response")
                    )
                  )
                )
        )
          .pipe(
            map(setupSearchIndex),
            shareReplay(1)
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

    /* Fetch sitemap and extract URL whitelist */
    base$
      .pipe(
        switchMap(base => ajax({
          url: `${base}/sitemap.xml`,
          responseType: "document",
          withCredentials: true
        })
          .pipe<Document>(
            pluck("response")
          )
        ),
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
            const [a, b] = sortBy(prop("length"), urls)

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

  /* Unhide permalinks on first tab */
  keyboard$
    .pipe(
      filter(key => key.mode === "global" && key.type === "Tab"),
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
  merge(...values(state))
    .subscribe()
  return state
}

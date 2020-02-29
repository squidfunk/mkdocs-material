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
  mapTo,
  shareReplay,
  sample,
  share,
  map,
  pluck,
  debounceTime,
  distinctUntilKeyChanged,
  distinctUntilChanged,
  bufferCount,
  startWith
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
  setupToggles,
  useToggle,
  getElement,
  setViewportOffset,
  ViewportOffset,
  getLocation
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
    base: config.base, location$
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
  // TODO: replace with popstate?
  hash$.subscribe(() => {
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

  /**
   * Location change
   */
  interface State {
    url: URL
    data?: ViewportOffset
  }

  function isInternalLink(el: HTMLAnchorElement | URL) {
    return el.host === location.host && (
      !el.pathname || /\/[\w-]+(?:\/?|\.html)$/i.test(el.pathname)
    )
  }

  // on same page!
  function isAnchorLink(el: HTMLAnchorElement | URL) {
    return el.pathname === location.pathname && el.hash.length > 0
  }

  function compareState(
    { url: a }: State, { url: b }: State
  ) {
    return a.href === b.href
  }

  // instant loading
  if (config.feature.instant) {

    /* Disable automatic scroll restoration, as it doesn't work nicely */
    if ("scrollRestoration" in history)
      history.scrollRestoration = "manual"

    /* Resolve relative links for stability */
    for (const selector of [
      `link[rel="shortcut icon"]`,
      `link[rel="stylesheet"]`
    ])
      for (const el of getElements<HTMLLinkElement>(selector))
        el.href = el.href

    /* Intercept internal link clicks */
    const internal$ = fromEvent<MouseEvent>(document.body, "click")
      .pipe(
        filter(ev => !(ev.metaKey || ev.ctrlKey)),
        switchMap(ev => {
          if (ev.target instanceof HTMLElement) {
            const el = ev.target.closest("a")
            if (el && isInternalLink(el)) {
              if (!isAnchorLink(el))
                ev.preventDefault()
              return of(el.href)
            }
          }
          return NEVER
        }),
        distinctUntilChanged(),
        map<string, State>(href => ({ url: new URL(href) })),
        share()
      )

    /* Intercept internal links to dispatch */
    const dispatch$ = internal$
      .pipe(
        filter(({ url }) => !isAnchorLink(url)),
        share()
      )

    /* Intercept popstate events (history back and forward) */
    const popstate$ = fromEvent<PopStateEvent>(window, "popstate")
      .pipe(
        filter(ev => ev.state !== null),
        map<PopStateEvent, State>(ev => ({
          url: new URL(location.href),
          data: ev.state
        })),
        share()
      )

    /* Emit location change */
    merge(dispatch$, popstate$)
      .pipe(
        pluck("url")
      )
        .subscribe(location$)

    /* Add dispatched link to history */
    internal$
      .pipe(
        // TODO: must start with the current location and ignore the first emission
        distinctUntilChanged(compareState),
        filter(({ url }) => !isAnchorLink(url))
      )
        .subscribe(({ url }) => {
          // console.log(`History.Push ${url}`)
          history.pushState({}, "", url.toString())
        })

    // special case
    merge(internal$, popstate$)
      .pipe(
        bufferCount(2, 1),
        // filter(([prev, next]) => {
        //   return prev.url.href.match(next.url.href) !== null
        //       && isAnchorLink(prev.url)
        // })
      )
        .subscribe(([prev, next]) => {
          console.log(`<- ${prev.url}`)
          console.log(`-> ${next.url}`)

          if (
            prev.url.href.match(next.url.href) !== null &&
            isAnchorLink(prev.url)
          ) {
            // dialog$.next(`Potential Candidate: ${JSON.stringify(next.data)}`, ) // awesome debugging.
            setViewportOffset(next.data || { y: 0 })
          }
            // console.log("Potential Candidate")
        })
        // .subscribe((x) => console.log(x[0].url.toString(), x[1].url.toString()))
    //     filter(([prev, next]) => {
    //       return prev.url.href.match(next.url.href) !== null
    //           && isAnchorLink(prev.url)
    //     }),
    //     map(([, next]) => next)
    //     // distinctUntilChanged(compareLocationChange),
    //     // filter(({ url }) => !isAnchorLink(url))
    //   )
    //     .subscribe(({ url }) => {
    //       console.log(`Restore ${url}`)
    //     })

    /* Persist viewport offset in history before hash change */
    viewport$
      .pipe(
        debounceTime(250),
        distinctUntilKeyChanged("offset"),
      )
        .subscribe(({ offset }) => {
          // console.log("Update", offset)
          history.replaceState(offset, "")
        })

    /*  */
    merge(dispatch$, popstate$)
      .pipe(
        sample(document$),
        withLatestFrom(document$),
      )
        .subscribe(([{ url, data }, { title, head }]) => {
          console.log("Done", url.href, data)

          // setDocumentTitle
          document.title = title

          // replace meta tags
          for (const selector of [
            `link[rel="canonical"]`,
            `meta[name="author"]`,
            `meta[name="description"]`
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

          // // TODO: this doesnt work as expected
          // if (!data) {
          //   const { hash } = new URL(href)
          //   if (hash) {
          //     const el = getElement(hash)
          //     if (typeof el !== "undefined") {
          //       el.scrollIntoView()
          //       return
          //     }
          //   }
          // }

          // console.log(ev)
          // if (!data)
          setViewportOffset(data || { y: 0 }) // push state!
        })

    // internal$.subscribe(({ url }) => {
    //   console.log(`Internal ${url}`)
    // })

    // dispatch$.subscribe(({ url }) => {
    //   console.log(`Dispatch ${url}`)
    // })

    popstate$.subscribe(({ url }) => {
      console.log(`Popstate ${url.href}`, url)
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

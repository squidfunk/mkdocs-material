/*
 * Copyright (c) 2016-2019 Martin Donath <martin.donath@squidfunk.com>
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

// TODO: remove this later on

// tslint:disable

import { identity } from "ramda"
import {
  EMPTY,
  MonoTypeOperatorFunction,
  NEVER,
  Observable,
  Subject,
  defer,
  forkJoin,
  fromEvent,
  merge,
  of,
  pipe,
} from "rxjs"
import {
  combineAll,
  delay,
  distinctUntilKeyChanged,
  filter,
  map,
  pluck,
  shareReplay,
  switchMap,
  switchMapTo,
  take,
  tap,
} from "rxjs/operators"

import {} from "components"
import { AjaxResponse, ajax } from "rxjs/ajax"
import {
  Component,
  paintHeaderShadow,
  setupHero,
  setupMain,
  setupNavigation,
  setupSearchResult,
  switchComponent,
  watchComponentMap,
  watchHeader,
  watchSearchReset,
} from "./components"
import { SearchIndex, SearchResult } from "./modules/search"
import {
  getElement,
  setupAgent,
  watchDocument,
  watchLocation,
  watchLocationHash,
  watchMedia,
  watchToggle,
  watchViewportOffset,
  watchViewportSize,
  watchWorker
} from "./utilities"
import {
  SearchMessage,
  SearchMessageType,
  SearchSetupMessage,
  isSearchDumpMessage,
  isSearchResultMessage
} from "./workers"

/**
 * Configuration
 */
export interface Config {
  base: string                         /* Base URL */
  worker: {
    search: string                     /* Web worker URL */
    packer: string                     /* Web worker URL */
  }
}

import {
  PackerMessage,
  PackerMessageType
} from "./workers/packer"

import { setupTabs } from "components/tabs"
import { setupTableOfContents } from "components/toc/_"

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Ensure that the given value is a valid configuration
 *
 * @param config - Configuration
 *
 * @return Test result
 */
export function isConfig(config: any): config is Config {
  return typeof config === "object"
      && typeof config.base === "string"
}

// TBD

// TODO: put this somewhere else... (merge with config!) JSON schema!?
const names: Component[] = [
  "header",                          /* Header */
  "title",                           /* Header title */
  "search",                          /* Search */
  "query",                           /* Search input */
  "reset",                           /* Search reset */
  "result",                          /* Search results */
  "container",                       /* Container */
  "main",                            /* Main area */
  "hero",                            /* Hero */
  "tabs",                            /* Tabs */
  "navigation",                      /* Navigation */
  "toc"                              /* Table of contents */
]

// modernizr for the poor
document.documentElement.classList.remove("no-js")
document.documentElement.classList.add("js")

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
  *
  * Rogue control characters must be filtered before handing the query to the
  * search index, as lunr will throw otherwise.
 */
function prepareQuery(value: string): string {
  const newvalue = value
    .replace(/(?:^|\s+)[*+-:^~]+(?=\s+|$)/g, "")
    .trim()

  return newvalue ? newvalue.replace(/\s+|$/g, "* ") : ""
}

/**
 * Initialize Material for MkDocs
 *
 * @param config - Configuration
 */
export function initialize(config: unknown) {
  if (!isConfig(config))
    throw new SyntaxError(`Invalid configuration: ${JSON.stringify(config)}`)

  const agent = setupAgent()

  const worker = new Worker(config.worker.search)
  const packer = new Worker(config.worker.packer)

  // const query = message.data.trim().replace(/\s+|$/g, "* ") // TODO: do this outside of the worker

  const packerMessage$ = new Subject<PackerMessage>()
  const packer$ = watchWorker(packer, { send$: packerMessage$ })

  // send a message, then switchMapTo worker!

  packer$.subscribe(message => {
    console.log("PACKER.MSG", message.data.length)
    // is always packed!
    if (message.type === PackerMessageType.BINARY && message.data[0] !== "{")
      localStorage.setItem("index", message.data)
  })

  // storing = experimental feature

  const searchMessage$ = new Subject<SearchMessage>()

  const search$ = watchWorker(worker, { send$: searchMessage$ })

  // paintSearchResult <-- must paint META AND LIST!
  // list must be painted based on scroll offset...

  /* Render search results */
  // search$
  //   .pipe(
  //     filter(isSearchResultMessage),
  //     pluck("data")
  //   )
  //     .subscribe(result => {
  //       const list = getElement(".md-search-result__list")!
  //       list.innerHTML = ""
  //       for (const el of result.map(renderSearchResult)) // TODO: perform entire lazy render!!!!
  //         list.appendChild(el)
  //     })

      // scroll!
      // watchSearchResult

  /* Link search to packer */
  search$
    .pipe(
      filter(isSearchDumpMessage),
      map(message => ({
        type: PackerMessageType.STRING,
        data: message.data
      })),
      tap(message => packerMessage$.next(message))  // send message and wait!
      // switchMapTo(packer$)
    )
      .subscribe()

  const data$ = ajax({
    url: `${config.base}/search/search_index.json`,
    responseType: "json",
    withCredentials: true
  })
    .pipe<SearchIndex>(
      pluck("response")
      // take(1)
    )

  const fromLocal = localStorage.getItem("index")

  ;
  (fromLocal ? of({
    type: PackerMessageType.BINARY,
    data: localStorage.getItem("index")!
  }) : EMPTY)
    .subscribe(x => {
      // console.log("send message to packer")
      packerMessage$.next(x)
    })

  const index$ = fromLocal ? packer$.pipe(pluck("data"), take(1)) : of(undefined) // of(localStorage.getItem("index"))

  // index$.subscribe(xx => console.log("INDEX", xx))

  forkJoin([data$, index$])
    .pipe<SearchSetupMessage>(
      map(([data, index]) => ({
        type: SearchMessageType.SETUP,
        data: { ...data, index }
      }))
    )
      .subscribe(message => {
        searchMessage$.next(message) // TODO: this shall not complete
      })

  // filter singular "+" or "-",as it will result in a lunr.js error

  // data$
  //   .pipe(
  //     map<SearchIndex, SearchMessage>(data => ({
  //       type: SearchMessageType.SETUP,
  //       data
  //     }))
  //   )
  //     .subscribe(message => {
  //       searchMessage$.next(message) // TODO: this shall not complete
  //     })

  /* ----------------------------------------------------------------------- */

  /* Create viewport observables */
  const offset$   = watchViewportOffset()
  const size$     = watchViewportSize()

  /* Create media observables */
  const screen$   = watchMedia("(min-width: 1220px)")
  const tablet$   = watchMedia("(min-width: 960px)")

  /* Create location observables */
  const location$ = watchLocation()
  const fragment$ = watchLocationHash()

  /* Create document observables */
  const load$     = watchDocument()

  // Complete set of AgentObservables...

  // component map!
  //

  // const switch$   = watchDocumentSwitch({ location$ })

  /* ----------------------------------------------------------------------- */

  /* Create component map observable */
  const components$ = watchComponentMap(names, { document$: load$ })

  const component = <T extends HTMLElement>(name: Component): Observable<T> => {
    return components$
      .pipe(
        switchComponent<T>(name)
      )
  }

  /* Create header observable */
  const header$ = component("header")  // TODO:!
    .pipe(
      switchMap(watchHeader)
    )

  // DONE
  const main$ = component("main")
    .pipe(
      setupMain(agent, { header$ })
    )

  // setupHeader(agent) ??

  // setupSearch

  // ----------------------------------------------------------------------------


  /* Create header shadow toggle */
  component("header")
    .pipe(
      switchMap(el => main$
        .pipe(
          paintHeaderShadow(el)
        )
      )
    )
      .subscribe()

  // watchSearchResult // emit, if at bottom...
  // receive results as a second observable!? filter stuff, paint

  const result$ = search$
    .pipe(
      filter(isSearchResultMessage),
      pluck("data")
    )

  const query$ = component<HTMLInputElement>("query")
    .pipe(
      switchMap(el => fromEvent(el, "keyup")
        .pipe(
          map(() => prepareQuery(el.value))
        )
      )
    )

  // DONE
  component("result")
    .pipe(
      setupSearchResult(agent, { result$, query$ })
    )
      .subscribe()

  query$
    .pipe(
      map(data => ({ // put this into some function...
        type: SearchMessageType.QUERY,
        data
      })), // TODO. ugly...
      distinctUntilKeyChanged("data")
    )

      .subscribe(x => {
        searchMessage$.next(x as any) // TODO
      })

  // Focus on search input
  component("query")
    .pipe(
      switchMap(el => fromEvent(el, "focus")
        .pipe(
          tap(() => {
            if (!search.checked)
              search.click() // move this inside the search query stuff? not important...
          })
        )
      ) // not super nice...
    )
      .subscribe()

  // // WIP: instant loading
  // load$
  //   .pipe(
  //     switchMap(({ body }) => fromEvent(body, "click")),
  //     switchMap(ev => {
  //       if (ev.target instanceof HTMLElement) {
  //         const el = ev.target.closest("a") || undefined
  //         if (el) {
  //           if (!/^(https?:|#)/.test(el.getAttribute("href")!)) {
  //             ev.preventDefault()
  //           }
  //           const href = el.href
  //           history.pushState({}, "", href) // TODO: reference necessary!?
  //           return of(href)
  //         }
  //       }
  //       return EMPTY
  //     })

  //     // try to reduce the jiggle upon instant page load. ideally, the location
  //     // should directly be resolved and the respective document loaded, but
  //     // we must scroll to the top at first and wait at least 250ms.
  //     //
  //     // Furthermore, this doesn't include the back/next buttons of the browser
  //     // which must be delayed
  //     // tap(url => {
  //     //   if (!/#/.test(url))
  //     //     scrollTo({ top: 0 })
  //     // }) // only when loading something we havent loaded!
  //     // delay(250)
  //   )
  //     .subscribe(location$)

  // location$.subscribe(x => {
  //   console.log("L", x)
  // })
  // switch$.subscribe(x => {
  //   console.log("S", x)
  // })

  /* ----------------------------------------------------------------------- */

  component("navigation")
    .pipe(
      setupNavigation(agent, { main$ })
    )
      .subscribe()

  component("toc")
    .pipe(
      setupTableOfContents(agent, { header$, main$ })
    )
      .subscribe()

  component("tabs")
    .pipe(
      setupTabs(agent, { header$ })
    )
      .subscribe()

  component("hero")
    .pipe(
      setupHero(agent, { header$ })
    )
      .subscribe()

  // /* Create header title toggle */
  // component("main")
  //   .pipe(
  //     delay(1000), // initial delay
  //     switchMap(el => typeof getElement("h1", el) !== "undefined"
  //       ? watchBottomOffset(getElement("h1", el)!, { size$, offset$, header$ })
  //           .pipe(
  //             map(({ y }) => y >= 0),
  //             withLatestFrom(component("title")),
  //             tap(([active, title]) => {
  //               title.dataset.mdState = active ? "active" : ""
  //             })
  //           )
  //       : NEVER
  //     )
  //   )
  //     .subscribe()

  // TODO: replace title as inner text

  /* ----------------------------------------------------------------------- */

  const drawer = getElement<HTMLInputElement>("[data-md-toggle=drawer]")!
  const search = getElement<HTMLInputElement>("[data-md-toggle=search]")!

  // watchToggle

  // --> watchSearchQuery?

  // watchSearch
  // watchSearchReset

  // toggles stay the same...

  const a$ = watchToggle(search)
    .pipe(
      filter(identity),
      delay(400)
    )

  // watchSearchReset()

  const b$ = component("reset")
    .pipe(
      switchMap(watchSearchReset)
    )

  function focusQuery(): MonoTypeOperatorFunction<HTMLElement> {
    return pipe(
      tap(el => el.focus())
    )
  }

  merge(a$, b$)
    .pipe(
      switchMapTo(component("query")),
      focusQuery()
    )
      .subscribe()

  /* Wrap all data tables for better overflow scrolling */
  // const tables = getElements<HTMLTableElement>("table:not([class])")
  // tables.forEach(table => {
  //   console.log("x", table)
  //   table.parentNode!.insertBefore(renderTable(table), table)
  //   table.replaceWith(renderTable(table) as any)
  //   // table.parentElement!.replaceChild(, table)
  // })

  return {
    // agent, // agent.viewport.offset$
    // component, // component.toc$
  }

  /* Return observable factories */
  return {

    /* User interface */
    watchDocument:         () => load$,
    // watchDocumentSwitch:   () => switch$,
    watchLocation:         () => location$,
    watchLocationFragment: () => fragment$,
    watchMediaScreen:      () => screen$,
    watchMediaTablet:      () => tablet$,
    watchViewportOffset:   () => offset$,
    watchViewportSize:     () => size$
  }
}

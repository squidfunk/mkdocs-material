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

import { identity } from "ramda"
import {
  MonoTypeOperatorFunction,
  Observable,
  Subject,
  fromEvent,
  merge,
  pipe,
} from "rxjs"
import {
  delay,
  distinctUntilKeyChanged,
  filter,
  map,
  pluck,
  shareReplay,
  switchMap,
  switchMapTo,
  tap,
} from "rxjs/operators"

import { ajax } from "rxjs/ajax"
import {
  Component,
  paintHeaderShadow,
  paintHidden,
  paintSidebar,
  switchComponent,
  watchBottomOffset,
  watchComponentMap,
  watchHeader,
  watchMain,
  watchSearchReset,
  watchSidebar,
  watchTopOffset
} from "./components"
import {
  not,
  switchMapIf
} from "./extensions"
import { SearchIndex } from "./modules/search"
import {
  getElement,
  watchDocument,
  watchDocumentSwitch,
  watchLocation,
  watchLocationFragment,
  watchMedia,
  watchToggle,
  watchViewportOffset,
  watchViewportSize,
  watchWorker
} from "./utilities"
import { SearchMessage, SearchMessageType } from "./workers"

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

import { PackerMessage, PackerMessageType } from "./workers/packer"

import { renderSearchResult } from "./templates"

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
const names = [
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
] as const

// modernizr for the poor
document.documentElement.classList.remove("no-js")
document.documentElement.classList.add("js")

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

  const worker = new Worker(config.worker.search)
  const packer = new Worker(config.worker.packer)

  // const query = message.data.trim().replace(/\s+|$/g, "* ") // TODO: do this outside of the worker

  const packerMessage$ = new Subject<PackerMessage>()
  const packer$ = watchWorker(packer, { message$: packerMessage$ })

  // send a message, then switchMapTo worker!

  packer$.subscribe(message => {
    console.log("PACKER.MSG", message)
    // is always packed!
    console.log(message.data.length)
    localStorage.setItem("index", message.data)
  })

  const searchMessage$ = new Subject<SearchMessage>()

  const search$ = watchWorker(worker, { message$: searchMessage$ })
  search$.subscribe(message => {
    if (message.type === SearchMessageType.DUMP) {
      console.log(message.data.length)
      packerMessage$.next({
        type: PackerMessageType.STRING,
        data: message.data
      })
    } else if (message.type === SearchMessageType.RESULT) {
      console.log("RESULT", message)

      const list = document.querySelector(".md-search-result__list")!
      list.innerHTML = ""
      for (const el of message.data.map(renderSearchResult)) // TODO: perform entire lazy render!!!!
        list.appendChild(el as any) // only render visibile stuff...!

      // paint on next animation frame!?

      // build a rendering pipeline for search results + scroll bottom!

    }
    // if (message.type === 0) {
    //   console.log("Packing...")
    //   packerMessage$.next(message.toString())
    // } else {
    //   console.log((message as any).term, ":", (message as any).res)
    // }
  })

  // filter singular "+" or "-",as it will result in a lunr.js error

  ajax({
    url: `${config.base}/search/search_index.json`,
    responseType: "json",
    withCredentials: true
  })
    .pipe(
      pluck("response"),
      map<SearchIndex, SearchMessage>(data => ({
        type: SearchMessageType.SETUP,
        data
      }))
    )
      .subscribe(message => {
        searchMessage$.next(message) // TODO: this shall not complete
      })

  /* ----------------------------------------------------------------------- */

  /* Create viewport observables */
  const offset$   = watchViewportOffset()
  const size$     = watchViewportSize()

  /* Create media observables */
  const screen$   = watchMedia("(min-width: 1220px)")
  const tablet$   = watchMedia("(min-width: 960px)")

  /* Create location observables */
  const location$ = watchLocation()
  const fragment$ = watchLocationFragment()

  /* Create document observables */
  const load$     = watchDocument()
  // const switch$   = watchDocumentSwitch({ location$ })

  /* ----------------------------------------------------------------------- */

  /* Create component map observable */
  const components$ = watchComponentMap(names, { document$: load$ })

  const component = (name: Component): Observable<HTMLElement> => {
    return components$
      .pipe(
        switchComponent(name)
      )
  }

  /* Create header observable */
  const header$ = component("header")
    .pipe(
      switchMap(watchHeader)
    )

  /* Create main area observable */
  const main$ = component("main")
    .pipe(
      switchMap(el => watchMain(el, { size$, offset$, header$ })),
      shareReplay(1)
    )

  // ----------------------------------------------------------------------------

  component("query")
    .pipe(
      switchMap(el => fromEvent(el, "keyup") // not super nice...
        .pipe(
          map<Event, SearchMessage>(() => ({
            type: SearchMessageType.QUERY,
            data: (el as HTMLInputElement).value
          })), // TODO. ugly...
          distinctUntilKeyChanged("data")
        )
      )
    )
      .subscribe(x => {
        searchMessage$.next(x)
      })

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

  /* Create sidebar with navigation */
  component("navigation")
    .pipe(
      switchMapIf(screen$, el => watchSidebar(el, { offset$, main$ })
        .pipe(
          paintSidebar(el)
        )
      ),
      shareReplay(1)
    )
      .subscribe()

  /* Create sidebar with table of contents */
  component("toc")
    .pipe(
      switchMapIf(tablet$, el => watchSidebar(el, { offset$, main$ })
        .pipe(
          paintSidebar(el)
        )
      ),
      shareReplay(1)
    )
      .subscribe()

  /* Create tabs visibility toggle */
  component("tabs")
    .pipe(
      switchMapIf(screen$, el => watchTopOffset(el, { size$, offset$, header$ })
        .pipe(
          paintHidden(el, 8)
        )
      ),
      shareReplay(1)
    )
      .subscribe()

  /* Create hero visibility toggle */
  component("hero")
    .pipe(
      switchMap(el => watchTopOffset(el, { size$, offset$, header$ })
        .pipe(
          paintHidden(el, 20)
        )
      ),
      shareReplay(1)
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

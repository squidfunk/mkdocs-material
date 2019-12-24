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

// TODO: remove this after we finished refactoring
// tslint:disable

import { identity, values } from "ramda"
import {
  EMPTY,
  Observable,
  Subject,
  forkJoin,
  merge,
  of
} from "rxjs"
import { ajax } from "rxjs/ajax"
import {
  delay,
  filter,
  map,
  pluck,
  switchMap,
  switchMapTo,
  take,
  tap,
} from "rxjs/operators"

import {
  Component,
  paintHeaderShadow,
  mountHero,
  mountMain,
  mountNavigation,
  mountSearchResult,
  mountTableOfContents,
  mountTabs,
  switchComponent,
  watchComponentMap,
  watchHeader,
  watchSearchQuery,
  watchSearchReset
} from "./components"
import { SearchIndexOptions } from "./modules"
import {
  getElement,
  setupAgent,
  watchToggle,
  watchWorker,
  setToggle
} from "./utilities"
import {
  PackerMessage,
  PackerMessageType,
  SearchMessage,
  SearchMessageType,
  SearchSetupMessage,
  isSearchDumpMessage,
  isSearchResultMessage
} from "./workers"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Configuration
 */
export interface Config {
  base: string                         /* Base URL */
  worker: {
    search: string                     /* Search worker URL */
    packer: string                     /* Packer worker URL */
  }
}

/* ----------------------------------------------------------------------------
 * TODO: where do we put this stuff?
 * ------------------------------------------------------------------------- */

document.documentElement.classList.remove("no-js")
document.documentElement.classList.add("js")

const names: Component[] = [
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
]

/* ----------------------------------------------------------------------------
 * Helper functions
 * ------------------------------------------------------------------------- */

/**
 * Ensure that the given value is a valid configuration
 *
 * We could use `jsonschema` or any other schema validation framework, but that
 * would just add more bloat to the bundle, so we'll keep it plain and simple.
 *
 * @param config - Configuration
 *
 * @return Test result
 */
function isConfig(config: any): config is Config {
  return typeof config === "object"
      && typeof config.base === "string"
      && typeof config.worker === "object"
      && typeof config.worker.search === "string"
      && typeof config.worker.packer === "string"
}

/**
  *
  * Rogue control characters must be filtered before handing the query to the
  * search index, as lunr will throw otherwise.
 */
function prepare(value: string): string {
  const newvalue = value
    .replace(/(?:^|\s+)[*+-:^~]+(?=\s+|$)/g, "")
    .trim()

  return newvalue ? newvalue.replace(/\s+|$/g, "* ") : ""
}

function setupWorkers(config: Config) {
  // Remove trailing URL, or search might not work on the 404 page.
  config.base = config.base.replace(/\/$/, "")

  const worker = new Worker(config.worker.search)
  const packer = new Worker(config.worker.packer)

  const packerMessage$ = new Subject<PackerMessage>()
  const packer$ = watchWorker(packer, { send$: packerMessage$ })

  // send a message, then switchMapTo worker!

  packer$.subscribe(message => {
    // console.log("PACKER.MSG", message.data.length)
    // is always packed!
    if (message.type === PackerMessageType.BINARY && message.data[0] !== "{")
      localStorage.setItem("index", message.data)
  })

  // storing = experimental feature

  const searchMessage$ = new Subject<SearchMessage>()

  const search$ = watchWorker(worker, { send$: searchMessage$ })

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
    .pipe<SearchIndexOptions>(
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

  return [search$, searchMessage$] as const
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

  // pass config here!?
  const agent = setupAgent() // TODO: add a config parameter here to configure media queries

  const [
    searchWorkerRecv$,
    searchMessage$
  ] = setupWorkers(config)

  /* ----------------------------------------------------------------------- */

  /* Create component map observable */
  const components$ = watchComponentMap(names, { document$: agent.document.load$ })
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

  /* Create header shadow toggle */
  component("header")
    .pipe(
      switchMap(el => main$
        .pipe(
          paintHeaderShadow(el) // technically, this could be done in paintMain
        )
      )
    )
      .subscribe()

  // ----------------------------------------------------------------------------

  // watchSearchResult // emit, if at bottom...
  // receive results as a second observable!? filter stuff, paint

  const result$ = searchWorkerRecv$ // move worker initialization into mountSearch ?
    .pipe(
      // tap(m => console.log("message from worker", m)),
      filter(isSearchResultMessage),
      pluck("data"),
      // Prefix URLs with base URL
      tap(result => result.forEach(item => {
        item.article.location = `${config.base}/${item.article.location}`
        item.sections.forEach(section => {
          section.location = `${config.base}/${section.location}`
        })
      }))
    )

  // handleSearchResult <-- operator

  const query$ = component<HTMLInputElement>("search-query")
    .pipe(
      switchMap(el => watchSearchQuery(el, { prepare }))
    )

  query$
    .pipe<SearchMessage>(
      map(query => ({ // put this into some function...
        type: SearchMessageType.QUERY,
        data: query.value
      })), // TODO. ugly...
      // distinctUntilKeyChanged("data")
    )
      .subscribe(searchMessage$)

  // create the message subject internally... and link it to the worker...?
  // watchSearchWorker(worker, agent, { query$ }) // message internally...

  query$
    .pipe(
      tap(query => {
        if (query.focus)
          setToggle(search, true)
      })
    )
      .subscribe()

  /* ----------------------------------------------------------------------- */

  const main$ = component("main")
    .pipe(
      mountMain(agent, { header$ })
    )

  const navigation$ = component("navigation")
    .pipe(
      mountNavigation(agent, { main$ })
    )

  const toc$ = component("toc")
    .pipe(
      mountTableOfContents(agent, { header$, main$ })
    )

  // TODO: naming?
  const resultComponent$ = component("search-result")
    .pipe(
      mountSearchResult(agent, { result$, query$: query$.pipe(pluck("value")) })
    ) // temporary fix

  const tabs$ = component("tabs")
    .pipe(
      mountTabs(agent, { header$ })
    )

  const hero$ = component("hero")
    .pipe(
      mountHero(agent, { header$ })
    )


  /* ----------------------------------------------------------------------- */

  const drawer = getElement<HTMLInputElement>("[data-md-toggle=drawer]")!
  const search = getElement<HTMLInputElement>("[data-md-toggle=search]")!

  const a$ = watchToggle(search)
    .pipe(
      filter(identity),
      delay(400)
    )

  const reset$ = component("search-reset")
    .pipe(
      switchMap(watchSearchReset)
    )

  merge(a$, reset$)
    .pipe(
      switchMapTo(component<HTMLInputElement>("search-query")),
      tap(el => el.focus())
    )
      .subscribe()

  /* ----------------------------------------------------------------------- */

  const state = {
    search: {
      query$,
      result$: resultComponent$,
      reset$,
    },
    main$,
    navigation$,
    toc$,
    tabs$,
    hero$
  }

  const { search: temp, ...rest } = state
  merge(...values(rest), ...values(temp))
    .subscribe() // potential memleak <-- use takeUntil

  return {
    agent,
    state
  }
}

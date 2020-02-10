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

import * as Clipboard from "clipboard"
import { identity, values } from "ramda"
import {
  EMPTY,
  Observable,
  Subject,
  forkJoin,
  merge,
  of,
  fromEvent,
  interval,
  NEVER
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
  withLatestFrom,
  distinctUntilChanged,
  distinctUntilKeyChanged,
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
  setToggle,
  getElements,
  watchMedia,
  translate,
  watchElementFocus
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
import { renderSource } from "templates"
import { switchMapIf, not, takeIf } from "extensions"
import { renderClipboard } from "templates/clipboard"
import { watchActiveLayer, paintActiveLayer } from "components/navigation/layer"

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
      pluck("response"),
      // map(res => {
      //   // search language... default for theme language...
      //   const override = translate("search.tokenizer")
      //   // TODO: ???
      //   if (override.length)
      //     res.config.separator = override

      //   return res
      // })
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

/**
 * Yes, this is a super hacky implementation. Needs clean up.
 */
function repository() {
  const el = getElement<HTMLAnchorElement>(".md-source[href]") // TODO: dont use classes
  console.log(el)
  if (!el)
    return EMPTY

  const data = sessionStorage.getItem("repository")
  if (data) {
    const x = JSON.parse(data)
    return of(x)
  }

  // TODO: do correct rounding, see GitHub
  function format(value: number) {
    return value > 999
      ? `${(value / 1000).toFixed(1)}k`
      : `${(value)}`
  }

  // github repository...
  const [, user, repo] = el.href.match(/^.+github\.com\/([^\/]+)\/?([^\/]+)?.*$/i)

  // Show repo stats
  if (user && repo) {
    return ajax({
      url: `https://api.github.com/repos/${user}/${repo}`,
      responseType: "json"
    })
      .pipe(
        map(({ status, response }) => {
          if (status === 200) {
            const { stargazers_count, forks_count } = response
            return [
              `${format(stargazers_count)} Stars`,
              `${format(forks_count)} Forks`
            ]
          }
          return []
        }),
        tap(data => sessionStorage.setItem("repository", JSON.stringify(data)))
      )

  // Show user or organization stats
  } else if (user) {
    return ajax({
      url: `https://api.github.com/users/${user}`,
      responseType: "json"
    })
      .pipe(
        map(({ status, response }) => {
          if (status === 200) {
            const { public_repos } = response
            return [
              `${format(public_repos)} Repositories`
            ]
          }
          return []
        }),
        tap(data => sessionStorage.setItem("repository", JSON.stringify(data)))
      )
  }
  return of([])
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
      distinctUntilKeyChanged("data")
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
      mountSearchResult(agent, { result$, query$: query$.pipe(
        distinctUntilKeyChanged("value"),
        pluck("value")
      ) })
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

  const searchActive$ = watchToggle(search)
    .pipe(
      delay(400)
    )

  const reset$ = component("search-reset")
    .pipe(
      switchMap(watchSearchReset)
    )

  const key$ = fromEvent<KeyboardEvent>(window, "keydown").pipe(
    filter(ev => !(ev.metaKey || ev.ctrlKey))
  )

  // filter arrow keys if search is active!
  searchActive$.subscribe(console.log)

  // shortcodes
  key$
    .pipe(
      takeIf(not(searchActive$))
    )
      .subscribe(ev => {
        if (
          document.activeElement && (
            ["TEXTAREA", "SELECT", "INPUT"].includes(
              document.activeElement.tagName
            ) ||
            document.activeElement instanceof HTMLElement &&
            document.activeElement.isContentEditable
          )
        ) {
          // do nothing...
        } else {
          if (ev.keyCode === 70 || ev.keyCode === 83) {
            setToggle(search, true)
          }
        }
      })
  // check which element is focused...
  // note that all links have tabindex=-1
  key$
    .pipe(
      takeIf(searchActive$),

      /* Abort if meta key (macOS) or ctrl key (Windows) is pressed */
      tap(ev => {
        if (ev.key === "Enter") {
          if (document.activeElement === getElement("[data-md-component=search-query]")) {
            ev.preventDefault()
            // intercept hash change after search closed
          } else {
            setToggle(search, false)
          }
        }

        if (ev.key === "ArrowUp" || ev.key === "ArrowDown") {
          const active = getElements("[data-md-component=search-query], [data-md-component=search-result] [href]")
          const i = Math.max(0, active.findIndex(el => el === document.activeElement))
          const x = Math.max(0, (i + active.length + (ev.keyCode === 38 ? -1 : +1)) % active.length)
          active[x].focus()

          /* Prevent scrolling of page */
          ev.preventDefault()
          ev.stopPropagation()

        } else if (ev.key === "Escape" || ev.key === "Tab") {
          setToggle(search, false)
          getElement("[data-md-component=search-query]")!.blur()

        } else {
          if (search.checked && document.activeElement !== getElement("[data-md-component=search-query]")) {
            getElement("[data-md-component=search-query]")!.focus()
          }
        }
      })
    )
      .subscribe()

  // TODO: close search on hashchange
  // anchor jump -> always close drawer + search

  // focus search on reset, on toggle and on keypress if open
  merge(searchActive$.pipe(filter(identity)), reset$)
    .pipe(
      switchMapTo(component<HTMLInputElement>("search-query")),
      tap(el => el.focus()) // TODO: only if element isnt focused! setFocus? setToggle?
    )
      .subscribe()

  /* ----------------------------------------------------------------------- */

  /* Open details before printing */
  merge(
    watchMedia("print").pipe(filter(identity)), // Webkit
    fromEvent(window, "beforeprint") // IE, FF
  )
    .subscribe(() => {
      const details = getElements("details")
      Array.prototype.forEach.call(details, detail => {
        detail.setAttribute("open", "")
      })
    })

  // Close drawer and search on hash change
  agent.location.hash$.subscribe(() => {
    setToggle(drawer, false)
    setToggle(search, false) // we probably need to delay the anchor jump for search
  })

  /* ----------------------------------------------------------------------- */

  /* Clipboard integration */
  if (Clipboard.isSupported()) {
    const blocks = getElements(".codehilite > pre, .highlight> pre, pre > code")
    Array.prototype.forEach.call(blocks, (block, index) => {
      const id = `__code_${index}`

      /* Create button with message container */
      const button = renderClipboard(id)

      /* Link to block and insert button */
      const parent = block.parentNode
      parent.id = id
      parent.insertBefore(button, block)
    })

    /* Initialize Clipboard listener */
    const copy = new Clipboard(".md-clipboard")

    /* Success handler */
    copy.on("success", action => {
      alert("Copied to clipboard") // TODO: integrate snackbar
      // TODO: add a snackbar/notification

    })
  }

  /* ----------------------------------------------------------------------- */

  const navigationlayer$ = component("navigation")
    .pipe(
      switchMapIf(not(agent.media.tablet$), el => watchActiveLayer(el)
        .pipe(
          paintActiveLayer()
        )
      )
    )
      .subscribe(console.log)

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

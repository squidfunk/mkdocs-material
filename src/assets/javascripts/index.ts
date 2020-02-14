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

import { identity, values } from "ramda"
import {
  EMPTY,
  merge,
  of,
  fromEvent
} from "rxjs"
import {
  delay,
  filter,
  map,
  switchMap,
  tap
} from "rxjs/operators"

import {
  mountHero,
  mountTabs,
} from "./components"
import {
  getElement,
  watchToggle,
  getElements,
  watchMedia,
  watchDocument,
  watchLocationHash,
  watchViewport,
  watchKeyboard,
  watchToggleMap,
  useToggle
} from "./observables"
import { setupSearchWorker } from "./workers"
import { renderSource } from "templates"
import { fetchGitHubStats } from "integrations/source/github"
import { renderTable } from "templates/table"
import { setToggle } from "actions"
import {
  Component,
  mountHeader,
  mountMain,
  mountNavigation,
  mountSearch,
  mountTableOfContents,
  useComponent,
  watchComponentMap
} from "components2"
import { mountClipboard } from "./integrations/clipboard"
import { patchTables, patchDetails } from "patches"

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

/* Test for iOS */
if (navigator.userAgent.match(/(iPad|iPhone|iPod)/g))
  document.documentElement.classList.add("ios")

// add to config? default components to mount...?
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

  // TODO: do correct rounding, see GitHub - done
  function format(value: number) {
    if (value > 999) {
      const digits = +((value - 950) % 1000 > 99)
      return `${(++value / 1000).toFixed(digits)}k`
    } else {
      return value.toString()
    }
  }

  // github repository...
  const [, user, repo] = el.href.match(/^.+github\.com\/([^\/]+)\/?([^\/]+)?.*$/i)

  // storage memoization!?
  // get, if not available, exec and persist

  // getOrRetrieve... storage$.

  // Show repo stats
  if (user && repo) {
    return fetchGitHubStats(user, repo)
      .pipe(
        map(({ stargazers_count, forks_count }) => ([
          `${format(stargazers_count || 0)} Stars`,
          `${format(forks_count || 0)} Forks`
        ])),
        tap(data => sessionStorage.setItem("repository", JSON.stringify(data)))
      )

  // Show user or organization stats
  } else if (user) {
    return fetchGitHubStats(user)
      .pipe(
        map(({ public_repos }) => ([
          `${format(public_repos || 0)} Repositories`
        ])),
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
  const document$ = watchDocument()
  const hash$ = watchLocationHash()
  const keyboard$ = watchKeyboard()
  const viewport$ = watchViewport()
  const tablet$ = watchMedia("(min-width: 960px)")
  const screen$ = watchMedia("(min-width: 1220px)")

  /* ----------------------------------------------------------------------- */

  watchComponentMap(names, { document$ })
  watchToggleMap(["drawer", "search"], { document$ })

  /* Create header observable */
  const header$ = useComponent("header")
    .pipe(
      mountHeader()
    )

  const main$ = useComponent("main")
    .pipe(
      mountMain({ header$, viewport$ })
    )

  /* ----------------------------------------------------------------------- */

  const sw = setupSearchWorker(config.worker.search, {
    base: config.base
  })

  const search$ = useComponent("search")
    .pipe(
      mountSearch(sw, { viewport$, keyboard$ }),
    )

  /* ----------------------------------------------------------------------- */

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
      mountHero({ header$, viewport$, screen$ })
    )

  /* ----------------------------------------------------------------------- */

  // TODO: general keyboard handler...
  // put into main!?

  //   search$
  //     .pipe(
  //       filter(not),
  //       switchMapTo(keyboard$),
  //       filter(key => ["s", "f"].includes(key.type)),
  //       switchMapTo(toggle$)
  //     )
  //       .subscribe(toggle => {
  //         const el = getActiveElement()
  //         if (!(el && mayReceiveKeyboardEvents(el)))
  //           setToggle(toggle, true)
  //       })

  const search = getElement<HTMLInputElement>("[data-md-toggle=search]")!

  /* ----------------------------------------------------------------------- */

  // patches... table, details, pre, ...

  /* Open details before printing */
  merge(
    watchMedia("print").pipe(filter(identity)), // Webkit
    fromEvent(window, "beforeprint")            // IE, FF
  )
    .subscribe(() => {
      for (const detail of getElements("details"))
        detail.setAttribute("open", "")
    })

  // Close drawer and search on hash change
  hash$.subscribe(() => {

    useToggle("drawer").subscribe(el => {
      setToggle(el, false)
    })

    useToggle("search").subscribe(el => { // omit nested subscribes...
      setToggle(el, false)
    })
  })

  /* ----------------------------------------------------------------------- */

  // watchClipboard

  mountClipboard({ document$ })
    .subscribe(console.log)

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

  // TODO: this is just a re-rendering patch...
  patchTables({ document$ })
    .subscribe(console.log)

  patchDetails({ document$ })
    .subscribe(console.log)

  // /* Wrap all data tables for better overflow scrolling */
  // const placeholder = document.createElement("table")
  // for (const table of getElements<HTMLTableElement>("table:not([class])")) {
  //   table.replaceWith(placeholder)
  //   placeholder.replaceWith(renderTable(table))
  // }

  // accidentally triggers on resize
  let lastOffset = 0
  tablet$.pipe(
    switchMap(active => {
      return !active ? watchToggle(search) : EMPTY
    }),
    switchMap(toggle => {
      if (toggle) {
        console.log("ACTIVE")
        return of(document.body)
          .pipe(
            tap(() => lastOffset = window.pageYOffset),
            delay(400),
            tap(() => {
              window.scrollTo(0, 0),
              console.log("scrolled... to top, locked body")
              document.body.dataset.mdState = "lock"
            })
          )
      } else {
        console.log("INACTIVE")
        return of(document.body)
          .pipe(
            tap(() => document.body.dataset.mdState = ""),
            delay(100),
            tap(() => {
              window.scrollTo(0, lastOffset)
            })
          )
      }
      return EMPTY
    })
  )
    .subscribe(x => console.log("SEARCHLOCK", x))

  /* ----------------------------------------------------------------------- */

  const state = {
    search$,
    main$,
    navigation$,
    toc$,
    tabs$,
    hero$
  }

  const { ...rest } = state
  merge(...values(rest))
    .subscribe() // potential memleak <-- use takeUntil

  return {
    // agent,
    state
  }
}

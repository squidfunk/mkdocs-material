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

import { findLast } from "ramda"
import {
  NEVER,
  animationFrameScheduler,
  fromEvent,
  merge,
  of
} from "rxjs"
import { AjaxRequest, ajax } from "rxjs/ajax"
import {
  delay,
  filter,
  map,
  mapTo,
  observeOn,
  scan,
  shareReplay,
  switchMap,
  tap
} from "rxjs/operators"

import "./polyfill"

import {
  paintAnchorList,
  paintComponentMap,
  paintHeaderShadow,
  paintSidebar,
  pluckComponent,
  setNavigationOverflowScrolling,
  watchAnchorList,
  watchComponentMap,
  watchHeader,
  watchMain,
  watchNavigationIndex,
  watchSidebar
} from "./component"
import {
  getElement,
  getElements,
  watchLocation,
  watchLocationHash,
  watchMedia,
  watchViewportOffset,
  watchViewportSize,
  withElement
} from "./ui"
import { toggle } from "./utilities"

// ----------------------------------------------------------------------------
// Disclaimer: this file is currently heavy WIP
// ----------------------------------------------------------------------------

const offset$ = watchViewportOffset()
const size$   = watchViewportSize()

const aboveScreen$ = watchMedia("(min-width: 1220px)")
const belowScreen$ = watchMedia("(max-width: 1219px)")

const aboveTablet$ = watchMedia("(min-width: 960px)")
const belowTablet$ = watchMedia("(max-width: 959px)")

// ----------------------------------------------------------------------------

// modernizr for the poor
document.documentElement.classList.remove("no-js")
document.documentElement.classList.add("js")

// ----------------------------------------------------------------------------

// Observable that resolves with document when loaded
const init$ = fromEvent(document, "DOMContentLoaded")
  .pipe(
    mapTo(document),
    shareReplay({ bufferSize: 1, refCount: true })
  )

// Location subject
const location$ = watchLocation()

// Observable that resolves with document on XHR load
const reload$ = location$
  .pipe(
    switchMap(url => load(url))
  )

// Extract and (re-)paint components
const components$ = merge(init$, reload$)
  .pipe(
    switchMap(watchComponentMap),
    paintComponentMap(),
    shareReplay({ bufferSize: 1, refCount: true })
  )

// ----------------------------------------------------------------------------

const header$ = components$
  .pipe(
    pluckComponent("header"),
    switchMap(watchHeader)
  )

const main$ = components$
  .pipe(
    pluckComponent("main"),
    switchMap(el => watchMain(el, { size$, offset$, header$ })),
    shareReplay({ bufferSize: 1, refCount: true})
  )

// ----------------------------------------------------------------------------

/* Component: sidebar with navigation */
components$
  .pipe(
    pluckComponent("navigation"),
    switchMap(el => aboveScreen$
      .pipe(
        toggle(() => watchSidebar(el, { offset$, main$ })
          .pipe(
            paintSidebar(el)
          )
        )
      ))
  )
    .subscribe()

/* Component: sidebar with table of contents (missing on 404 page) */
components$
  .pipe(
    pluckComponent("toc"),
    switchMap(el => aboveTablet$
      .pipe(
        toggle(() => watchSidebar(el, { offset$, main$ })
          .pipe(
            paintSidebar(el)
          )
        )
      ))
  )
    .subscribe()

/* Component: link blurring for table of contents */
components$
  .pipe(
    pluckComponent("toc"),
    map(el => getElements<HTMLAnchorElement>(".md-nav__link", el)),
    switchMap(els => aboveTablet$
      .pipe(
        toggle(() => watchAnchorList(els, { size$, offset$, header$ })
          .pipe(
            paintAnchorList(els)
          )
        )
      )
    )
  )
    .subscribe()

/* Component: header shadow toggle */
components$
  .pipe(
    pluckComponent("header"),
    switchMap(el => main$.pipe(
      paintHeaderShadow(el)
    ))
  )
    .subscribe()

// ----------------------------------------------------------------------------
// Refactor:
// ----------------------------------------------------------------------------

// Observable that catches all internal links without the necessity of rebinding
// as events are bubbled up through the DOM.
init$
  .pipe(
    switchMap(({ body }) => fromEvent(body, "click")),
    switchMap(ev => {

      /* Walk up as long as we're not in a details tag */
      let parent = ev.target as Node | undefined
      while (parent && !(parent instanceof HTMLAnchorElement))
        parent = parent.parentNode // TODO: fix errors...

      if (parent) { // this one OR (!) one of
        // its parents...
        if (!/(:\/\/|^#[^\/]+$)/.test(parent.getAttribute("href")!)) {
          ev.preventDefault()
          console.log("> ", parent.href)

          // Extract URL; push to state, then emit new URL
          const href = parent.href
          history.pushState({}, "", href) // move this somewhere else!???
          return of(href)
        }
      }
      return NEVER
    }),
    shareReplay({ bufferSize: 1, refCount: true })
  )
    .subscribe(location$)

// ----------------------------------------------------------------------------

const nav2 = getElement("[data-md-component=navigation]")!
const index$ = watchNavigationIndex(nav2) // TODO: maybe rename into setup!? merge with sidebar?
belowScreen$
  .pipe(
    toggle(() => index$
      .pipe(
        switchMap(index => merge(...[...index.keys()]
          .map(input => fromEvent(input, "change"))
        )
          .pipe(
            mapTo(index)
          )
        ),
        map(index => getElement("ul", index.get(
          findLast(input => input.checked, [...index.keys()])!)
        )!), // find the TOP MOST! <-- this is the actively displayed on mobile

        // this is the paint job...

        // dispatch action - TODO: document why this crap is even necessary
        scan((prev, next) => {
          if (prev)
            setNavigationOverflowScrolling(prev, false) // TODO: resetOverflowScrolling ....
          return next
        }),
        delay(250),
        tap(next => {
          setNavigationOverflowScrolling(next, true) // setNavigationScrollfix
        })
      )
    )
  )
    .subscribe()

// ----------------------------------------------------------------------------

function isNavigationCollapsible(el: HTMLElement): boolean {
  return el.getAttribute("data-md-component") === "collapsible" // TODO: maybe better remove again
}

aboveScreen$
  .pipe(
    toggle(() => index$
      .pipe(
        // map(index => )
        // filter shit from index...
        switchMap(index => [...index.keys()]
          .filter(input => isNavigationCollapsible(index.get(input)!))
          .map(input => {
            const el = index.get(input)!
            // this doesnt work...
            el.setAttribute("data-md-height", `${el.offsetHeight}`) // TODO: this is a hack
            return input
          })
          .map(input => fromEvent(input, "change")
            .pipe(
              map(() => {
                const el = index.get(input)!
                let height = parseInt(el.getAttribute("data-md-height")!, 10)
                // always goes from data-md-height... wrong...
                if (!input.checked) {
                  el.style.maxHeight = `${height}px`

                  /* Set target height */
                  height = 0

                } else {
                  el.style.maxHeight = "initial" // 100%!?
                  el.style.transitionDuration = "initial"

                  /* Retrieve target height */
                  height = el.offsetHeight
                  console.log("expand to height")

                  /* Reset state and set start height */
                  // el.removeAttribute("data-md-state")
                  el.style.maxHeight = "0px"
                }

                /* Force style recalculation */
                el.offsetHeight // tslint:disable-line
                el.style.transitionDuration = ""
                return height
              }), // max height is set... just read it.
              observeOn(animationFrameScheduler),
              tap(height => {
                const el = index.get(input)!
                // el.setAttribute("data-md-state", "animate")
                el.style.maxHeight = `${height}px`
                console.log("setting shit...")

                el.setAttribute("data-md-height", `${height}`)
              }),
              delay(250),
              tap(() => {
                const el = index.get(input)!
                console.log("DONE")
                // el.removeAttribute("data-md-state")
                el.style.maxHeight = ""
              })
            )
              .subscribe() // merge shit and return it...
          )
        )
      )
    )
  )
    .subscribe()

// ----------------------------------------------------------------------------

/* Open details after anchor jump */
const hash$ = watchLocationHash()
hash$
  .pipe(
    withElement(), // TODO: somehow ugly... not so nice and cool
    tap(el => {
      let parent = el.parentNode
      while (parent && !(parent instanceof HTMLDetailsElement)) // TODO: put this into a FUNCTION!
        parent = parent.parentNode

      /* If there's a details tag, open it */
      if (parent && !parent.open) {
        parent.open = true

        /* Hack: force reload for repositioning */ // TODO. what happens here!?
        const hash = location.hash
        location.hash = " "
        location.hash = hash // tslint:disable-line
        // TODO: setLocationHash() + forceLocationHashChange
      }
    })
  )
    .subscribe()

// ----------------------------------------------------------------------------

// setupAnchorToggle?
const drawerToggle = getElement<HTMLInputElement>("[data-md-toggle=drawer]")!
const searchToggle = getElement<HTMLInputElement>("[data-md-toggle=search]")!

/* Listener: close drawer when anchor links are clicked */
hash$
  .pipe(
    tap(() => setToggle(drawerToggle, false))
  )
    .subscribe()

/* Listener: open search on focus */
const query = getElement("[data-md-component=query]")!
if (query) {
  fromEvent(query, "focus")
    .pipe(
      tap(() => setToggle(searchToggle, true))
    )
      .subscribe()
}

/* Listener: focus input after opening search */
fromEvent(searchToggle, "change")
  .pipe(
    filter(() => searchToggle.checked),
    delay(400),
    tap(() => query.focus())
  )
    .subscribe()

// data-md-toggle!
function setToggle(toggle: HTMLInputElement, active: boolean): void {
  if (toggle.checked !== active) {
    toggle.checked = active
    toggle.dispatchEvent(new CustomEvent("change"))
  }
}

// ----------------------------------------------------------------------------

// Asynchronously load a document
function load(url: string) {

  const options: AjaxRequest = {
    responseType: "document",
    withCredentials: true
  } // TODO: remove favicon from source!? patch...

  return ajax({ url, ...options })
    .pipe(
      map(({ response }) => {
        if (!(response instanceof Document)) // TODO: what to do in case of error?
          throw Error("Unknown error...")

        return response
      })
    )
}

// ----------------------------------------------------------------------------

// function isLocal(el: HTMLAnchorElement): boolean {
//   return /(:\/\/|^#[^\/]+$)/.test(el.getAttribute("href")!)
// }

export function app(config: any) {
  console.log("called app with", config)
}

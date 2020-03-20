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

import { Observable, Subject, fromEvent, merge } from "rxjs"
import {
  bufferCount,
  debounceTime,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  filter,
  map,
  pluck,
  sample,
  share,
  withLatestFrom
} from "rxjs/operators"

import {
  Viewport,
  ViewportOffset,
  getElement,
  isLocationAnchor,
  setLocationHash,
  setViewportOffset
} from "browser"

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * History state
 */
interface State {
  url: URL                             /* State URL */
  offset?: ViewportOffset              /* State viewport offset */
}

/* ------------------------------------------------------------------------- */

/**
 * Setup options
 */
interface SetupOptions {
  document$: Observable<Document>      /* Document observable */
  viewport$: Observable<Viewport>      /* Viewport observable */
  link$: Observable<HTMLAnchorElement> /* Internal link observable */
  location$: Subject<URL>              /* Location subject */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Setup instant loading
 *
 * @param options - Options
 *
 * @return TODO ?
 */
export function setupInstantLoading(
  { document$, viewport$, link$, location$ }: SetupOptions
) { // TODO: add return type
  const state$ = link$
    .pipe(
      map(el => ({ url: new URL(el.href) })),
      share<State>()
    )

  /* Intercept internal links to dispatch */
  const push$ = state$
    .pipe(
      distinctUntilChanged((prev, next) => prev.url.href === next.url.href),
      filter(({ url }) => !isLocationAnchor(url)),
      share()
    )

  /* Intercept popstate events (history back and forward) */
  const pop$ = fromEvent<PopStateEvent>(window, "popstate")
    .pipe(
      filter(ev => ev.state !== null),
      map<PopStateEvent, State>(ev => ({
        url: new URL(location.href),
        offset: ev.state
      })),
      share()
    )

  /* Emit location change */
  merge(push$, pop$)
    .pipe(
      pluck("url")
    )
      .subscribe(location$)

  /* History: debounce update of viewport offset */
  viewport$
    .pipe(
      debounceTime(250),
      distinctUntilKeyChanged("offset")
    )
      .subscribe(({ offset }) => {
        history.replaceState(offset, "")
      })

  /* Apply viewport offset from history */
  merge(state$, pop$)
    .pipe(
      bufferCount(2, 1),
      filter(([prev, next]) => {
        return prev.url.pathname === next.url.pathname
            && !isLocationAnchor(next.url)
      }),
      map(([, state]) => state)
    )
      .subscribe(({ offset }) => {
        setViewportOffset(offset || { y: 0 })
      })

  /* Intercept actual instant loading */
  const instant$ = merge(push$, pop$)
    .pipe(
      sample(document$)
    )

  // TODO: from here on, everything is beta.... ###############################

  instant$.subscribe(({ url, offset }) => {
    if (url.hash && !offset) {
      // console.log("set hash!")
      setLocationHash(url.hash) // must delay, if search is open!
    } else {
      setViewportOffset(offset || { y: 0 })
    }
  })

  instant$
    .pipe(
      withLatestFrom(document$)
    )
      .subscribe(([, { title, head }]) => {
        document.dispatchEvent(new CustomEvent("DOMContentSwitch"))
        document.title = title

        /* Replace meta tags */
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
      })
}

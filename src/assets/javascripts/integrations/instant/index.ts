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

import { NEVER, Observable, Subject, fromEvent, merge } from "rxjs"
import { ajax } from "rxjs//ajax"
import {
  bufferCount,
  catchError,
  debounceTime,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  filter,
  map,
  pluck,
  sample,
  share,
  skip,
  switchMap,
  withLatestFrom
} from "rxjs/operators"

import {
  Viewport,
  ViewportOffset,
  getElement,
  isAnchorLocation,
  replaceElement,
  setLocation,
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
  document$: Subject<Document>         /* Document subject */
  viewport$: Observable<Viewport>      /* Viewport observable */
  link$: Observable<HTMLAnchorElement> /* Internal link observable */
  location$: Subject<URL>              /* Location subject */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Set up instant loading
 *
 * When fetching, theoretically, we could use `responseType: "document"`, but
 * since all MkDocs links are relative, we need to make sure that the current
 * location matches the document we just loaded. Otherwise any relative links
 * in the document could use the old location.
 *
 * This is the reason why we need to synchronize history events and the process
 * of fetching the document for navigation changes (except `popstate` events):
 *
 * 1. Fetch document via `XMLHTTPRequest`
 * 2. Set new location via `history.pushState`
 * 3. Parse and emit fetched document
 *
 * For `popstate` events, we must not use `history.pushState`, or the forward
 * history will be irreversibly overwritten. In case the request fails, the
 * location change is dispatched regularly.
 *
 * @param options - Options
 *
 * @return TODO: return type?
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
      filter(({ url }) => !isAnchorLocation(url)),
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


  const dom = new DOMParser()
  const ajax$ = location$
    .pipe(
      distinctUntilKeyChanged("pathname"),
      skip(1),

      /* Fetch document */
      switchMap(url => ajax({
        url: url.href,
        responseType: "text",
        withCredentials: true
      })
        .pipe(
          catchError(() => {
            setLocation(url)
            return NEVER
          })
        )
      )
      // share()
    )

  push$
    .pipe(
      sample(ajax$)
    )
      .subscribe(({ url }) => {
        history.pushState({}, "", url.toString())
      })

  ajax$
    .pipe(
      map(({ response }) => {
        return dom.parseFromString(response, "text/html")
      })
    )
      .subscribe(document$)

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
            && !isAnchorLocation(next.url)
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
            replaceElement(prev, next)
          }
        }
      })
}

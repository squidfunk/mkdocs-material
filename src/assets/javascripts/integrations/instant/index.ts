/*
 * Copyright (c) 2016-2023 Martin Donath <martin.donath@squidfunk.com>
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

import {
  EMPTY,
  NEVER,
  Observable,
  Subject,
  bufferCount,
  catchError,
  concatMap,
  debounceTime,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  filter,
  fromEvent,
  map,
  merge,
  of,
  sample,
  share,
  skip,
  skipUntil,
  switchMap,
  tap,
  observeOn,
  asyncScheduler,
  asapScheduler,
  combineLatestWith,
  combineLatest,
  startWith
} from "rxjs"

import { configuration, feature } from "~/_"
import {
  Viewport,
  ViewportOffset,
  getElements,
  getOptionalElement,
  request,
  setLocation,
  setLocationHash,
  getLocation
} from "~/browser"
import { getComponentElement } from "~/components"
import { h } from "~/utilities"

import { fetchSitemap } from "../sitemap"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * History state
 */
export interface HistoryState {
  url: URL                             /* State URL */
  offset?: ViewportOffset              /* State viewport offset */
}

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Setup options
 */
interface SetupOptions {
  document$: Subject<Document>         /* Document subject */
  location$: Subject<URL>              /* Location subject */
  viewport$: Observable<Viewport>      /* Viewport observable */
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
 */
export function setupInstantLoading(
  { document$, location$, viewport$ }: SetupOptions
): void {
  const config = configuration()
  if (location.protocol === "file:")
    return

  /* Use sitemap to detect internal navigation */
  const sitemap$ = fetchSitemap()
    .pipe(
      map(paths => paths.map(path => `${new URL(path, config.base)}`)),
    )

  /* Intercept internal navigation */
  const intercept$ = fromEvent<MouseEvent>(document.body, "click")
    .pipe(
      filter(ev => !ev.metaKey && !ev.ctrlKey),
      combineLatestWith(sitemap$),
      switchMap(([ev, sitemap]) => {

        /* Skip, as target is not an element */
        if (!(ev.target instanceof Element))
          return EMPTY

        /* Skip, as target is not within a link or opens in new window */
        const el = ev.target.closest("a")
        if (!el || el.target)
          return EMPTY

        /* Canonicalize URL for comparison */
        const url = new URL(el.href)
        url.search = ""
        url.hash = ""

        /* Skip, as URL should not be intercepted */
        if (!sitemap.includes(url.toString()))
          return EMPTY

        /* Return intercepted URL */
        ev.preventDefault()
        return of({ url: new URL(el.href) })
      }),
      share<HistoryState>()
    )

  /* Change location if  */
  intercept$ // merge(push$, pop$)
    .pipe(
      map(({ url }) => url),
      startWith(getLocation()),
      distinctUntilKeyChanged("pathname")
    )
      .subscribe(location$)

  /* Fetch document via `XMLHTTPRequest` */
  const response$ = location$
    .pipe(
      switchMap(url => request(url.href)
        .pipe(
          catchError(() => {
            setLocation(url)
            return EMPTY
          })
        )
      ),
      share()
    )

  document$.subscribe(console.log)
  response$.subscribe(console.log)

  /* Disable automatic scroll restoration */
  if ("scrollRestoration" in history) {
    // document$.pipe(observeOn(asapScheduler))
    //   .subscribe(() => {
    //     history.scrollRestoration = "manual"
    //   })
    // @todo: safari scrollrestoration bug
    // fromEvent(window, "load")
    //   .subscribe(() => {
    //     history.scrollRestoration = "manual"
    //   })

    // /* Hack: ensure that reloads restore viewport offset */
    // fromEvent(window, "beforeunload")
    //   .subscribe(() => {
    //     history.scrollRestoration = "auto"
    //   })
  }

  // /* Hack: ensure absolute favicon link to omit 404s when switching */
  // const favicon = getOptionalElement<HTMLLinkElement>("link[rel=icon]")
  // if (typeof favicon !== "undefined")
  //   favicon.href = favicon.href

  // /* Intercept history back and forward */
  // const pop$ = fromEvent<PopStateEvent>(window, "popstate")
  //   .pipe(
  //     map(ev => ({
  //       url: new URL(location.href),
  //       ...ev.state && { offset: ev.state }
  //     })),
  //     share<HistoryState>()
  //   )

  // /* Emit location change */
  // merge(push$, pop$)
  //   .pipe(
  //     distinctUntilChanged((a, b) => a.url.href === b.url.href),
  //     map(({ url }) => url)
  //   )
  //     .subscribe(location$)

  // location$.subscribe(console.log)


  // /* Set new location via `history.pushState` */
  // push$
  //   .pipe(
  //     sample(response$)
  //   )
  //     .subscribe(({ url }) => {
  //       history.pushState({}, "", `${url}`)
  //     })

  // /* Parse and emit fetched document */
  // const dom = new DOMParser()
  // response$
  //   .pipe(
  //     switchMap(res => res.text()),
  //     map(res => dom.parseFromString(res, "text/html"))
  //   )
  //     .subscribe(document$)

  // /* Replace meta tags and components */
  // document$
  //   .pipe(
  //     skip(1)
  //   )
  //     .subscribe(replacement => {
  //       for (const selector of [

  //         /* Meta tags */
  //         "title",
  //         "link[rel=canonical]",
  //         "meta[name=author]",
  //         "meta[name=description]",

  //         /* Components */
  //         "[data-md-component=announce]",
  //         "[data-md-component=container]",
  //         "[data-md-component=header-topic]",
  //         "[data-md-component=outdated]",
  //         "[data-md-component=logo]",
  //         "[data-md-component=skip]",
  //         ...feature("navigation.tabs.sticky")
  //           ? ["[data-md-component=tabs]"]
  //           : []
  //       ]) {
  //         const source = getOptionalElement(selector)
  //         const target = getOptionalElement(selector, replacement)
  //         if (
  //           typeof source !== "undefined" &&
  //           typeof target !== "undefined"
  //         ) {
  //           source.replaceWith(target)
  //         }
  //       }
  //     })

  // /* Re-evaluate scripts */
  // document$
  //   .pipe(
  //     skip(1),
  //     map(() => getComponentElement("container")),
  //     switchMap(el => getElements("script", el)),
  //     concatMap(el => {
  //       const script = h("script")
  //       if (el.src) {
  //         for (const name of el.getAttributeNames())
  //           script.setAttribute(name, el.getAttribute(name)!)
  //         el.replaceWith(script)

  //         /* Complete when script is loaded */
  //         return new Observable(observer => {
  //           script.onload = () => observer.complete()
  //         })

  //       /* Complete immediately */
  //       } else {
  //         script.textContent = el.textContent
  //         el.replaceWith(script)
  //         return EMPTY
  //       }
  //     })
  //   )
  //     .subscribe()

  // /* Emit history state change */
  // merge(push$, pop$)
  //   .pipe(
  //     sample(document$)
  //   )
  //     .subscribe(({ url, offset }) => {
  //       if (url.hash && !offset?.y) {
  //         setLocationHash(url.hash)
  //       } else {
  //         window.scrollTo(0, offset?.y || 0)
  //       }
  //     })

  // /* Debounce update of viewport offset */
  // viewport$
  //   .pipe(
  //     skipUntil(push$),
  //     debounceTime(250),
  //     distinctUntilKeyChanged("offset")
  //   )
  //     .subscribe(({ offset }) => {
  //       history.replaceState(offset, "")
  //     })

  // /* Set viewport offset from history */
  // merge(push$, pop$)
  //   .pipe(
  //     bufferCount(2, 1),
  //     filter(([a, b]) => a.url.pathname === b.url.pathname),
  //     map(([, state]) => state)
  //   )
  //     .subscribe(({ offset }) => {
  //       window.scrollTo(0, offset?.y || 0)
  //     })
}

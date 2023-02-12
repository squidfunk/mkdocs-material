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
  BehaviorSubject,
  EMPTY,
  Observable,
  Subject,
  catchError,
  concatMap,
  distinctUntilKeyChanged,
  filter,
  fromEvent,
  map,
  of,
  share,
  skip,
  skipUntil,
  switchMap,
  tap,
  withLatestFrom
} from "rxjs"

import { configuration, feature } from "~/_"
import {
  ViewportOffset,
  getElements,
  getOptionalElement,
  request,
  setLocation,
  setLocationHash
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
}

/**
 * Navigation type
 */
enum NavigationType {
  URL,
  HISTORY
}

/**
 * Navigation event
 */
interface Navigation {
  url: URL                             /* Navigation URL */
  claim(): void                        /* Navigation claim */
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
  { document$, location$ }: SetupOptions
): void {
  const config = configuration()
  if (location.protocol === "file:")
    return

  /* Hack: ensure absolute favicon link to omit 404s when switching */
  const favicon = getOptionalElement<HTMLLinkElement>("link[rel=icon]")
  if (typeof favicon !== "undefined")
    favicon.href = favicon.href

  /* Intercept inter-page navigation */
  const intercept$ = fromEvent<MouseEvent>(document.body, "click")
    .pipe(
      filter(ev => !(ev.metaKey || ev.ctrlKey)),
      switchMap(ev => {

        /* Skip, as target is not an element */
        if (!(ev.target instanceof Element))
          return EMPTY

        /* Skip, as target is not within a link or opens in new window */
        const el = ev.target.closest("a")
        if (!el || el.target)
          return EMPTY

        /* Skip, as target is a different host or the same page */
        return of({
          url: new URL(el.href),
          claim() {
            ev.preventDefault()
            ev.stopPropagation()
          }
        } as Navigation)
      }),
      share()
    )

  /* Filter URLs that should be instantly loaded */
  const instant$ = fetchSitemap()
    .pipe(
      map(paths => paths.map(path => `${new URL(path, config.base)}`)),
      switchMap(sitemap => intercept$
        .pipe(
          filter(({ url }) => {
            url = new URL(url)
            url.hash = url.search = ""

            /* Compare canonical URLs */
            return sitemap.includes(url.toString())
          })
        )
      ),
      share()
    )

  /* Track origin of action - not ideal, but it'll do for now */
  const type$ = new BehaviorSubject(NavigationType.URL)

  /* Dispatch instant navigation on non-anchor click */
  instant$.subscribe(({ claim, url }) => {
    if (url.pathname !== location.pathname || !url.hash) {
      claim()
      type$.next(NavigationType.URL)
      location$.next(url)

      /* Scroll to top when we stay on the same page */
      if (!url.hash)
        window.scrollTo({ top: 0 })
    }
  })

  /* Dispatch history changes (browser back button) */
  fromEvent<PopStateEvent>(window, "popstate")
    .pipe(
      map(() => new URL(location.href)),
      tap(() => type$.next(NavigationType.HISTORY))
    )
      .subscribe(location$)

  /* Fetch document via `XMLHTTPRequest` */
  const response$ = location$
    .pipe(
      distinctUntilKeyChanged("pathname"),
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

  /* Parse and emit fetched document */
  const dom = new DOMParser()
  response$
    .pipe(
      switchMap(res => res.text()),
      map(res => dom.parseFromString(res, "text/html"))
    )
      .subscribe(document$)

  /* Replace meta tags and components */
  document$
    .pipe(
      skipUntil(instant$),
      withLatestFrom(location$, type$),
    )
      .subscribe(([document, url, type]) => {
        for (const selector of [

          /* Meta tags */
          "title",
          "link[rel=canonical]",
          "meta[name=author]",
          "meta[name=description]",

          /* Components */
          "[data-md-component=announce]",
          "[data-md-component=container]",
          "[data-md-component=header-topic]",
          "[data-md-component=outdated]",
          "[data-md-component=logo]",
          "[data-md-component=skip]",
          ...feature("navigation.tabs.sticky")
            ? ["[data-md-component=tabs]"]
            : []
        ]) {
          const source = getOptionalElement(selector)
          const target = getOptionalElement(selector, document)
          if (
            typeof source !== "undefined" &&
            typeof target !== "undefined"
          ) {
            source.replaceWith(target)
          }
        }

        /* Replace state */
        if (type === NavigationType.URL) {
          history.pushState({}, "", url.toString())
          window.scrollTo({ top: 0 })
        }

        /* Update offset */
        if (location.href.includes("#"))
          setLocationHash(url.hash)
      })

  /* Re-evaluate scripts */
  document$
    .pipe(
      skip(1),
      map(() => getComponentElement("container")),
      switchMap(el => getElements("script", el)),
      concatMap(el => {
        const script = h("script")
        if (el.src) {
          for (const name of el.getAttributeNames())
            script.setAttribute(name, el.getAttribute(name)!)
          el.replaceWith(script)

          /* Complete when script is loaded */
          return new Observable(observer => {
            script.onload = () => observer.complete()
          })

          /* Complete immediately */
        } else {
          script.textContent = el.textContent
          el.replaceWith(script)
          return EMPTY
        }
      })
    )
      .subscribe()
}

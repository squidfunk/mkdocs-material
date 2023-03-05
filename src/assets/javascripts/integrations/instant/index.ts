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
  Observable,
  Subject,
  bufferCount,
  catchError,
  concat,
  debounceTime,
  distinctUntilKeyChanged,
  endWith,
  fromEvent,
  ignoreElements,
  map,
  of,
  share,
  skip,
  startWith,
  switchMap,
  take,
  withLatestFrom
} from "rxjs"

import { configuration, feature } from "~/_"
import {
  Viewport,
  getElements,
  getLocation,
  getOptionalElement,
  request,
  setLocation,
  setLocationHash
} from "~/browser"
import { getComponentElement } from "~/components"

import { fetchSitemap } from "../sitemap"

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Setup options
 */
interface SetupOptions {
  location$: Subject<URL>              /* Location subject */
  viewport$: Observable<Viewport>      /* Viewport observable */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Set up instant navigation
 *
 * This is a heavily orchestrated operation - see inline comments to learn how
 * this works with Material for MkDocs, and how you can hook into it.
 *
 * @param options - Options
 *
 * @returns Document observable
 */
export function setupInstantLoading(
  { location$, viewport$ }: SetupOptions
): Observable<Document> {
  const config = configuration()
  if (location.protocol === "file:")
    return EMPTY

  // Load sitemap immediately, so we have it available when the user initiates
  // the first instant navigation request, and canonicalize URLs to the current
  // base URL. The base URL will remain stable in between loads, as it's only
  // read at the first initialization of the application.
  const sitemap$ = fetchSitemap()
    .pipe(
      map(paths => paths.map(path => `${new URL(path, config.base)}`))
    )

  // Intercept inter-site navigation - to keep the number of event listeners
  // low we use the fact that uncaptured events bubble up to the body. This also
  // has the nice property that we don't need to detach and then again attach
  // event listeners when instant navigation occurs.
  const instant$ = fromEvent<MouseEvent>(document.body, "click")
    .pipe(
      withLatestFrom(sitemap$),
      switchMap(([ev, sitemap]) => {
        if (!(ev.target instanceof Element))
          return EMPTY

        // Skip, as target is not within a link - clicks on non-link elements
        // are also captured, which we need to exclude from processing.
        const el = ev.target.closest("a")
        if (el === null)
          return EMPTY

        // Skip, as link opens in new window - we now know we have captured a
        // click on a link, but the link either has a `target` property defined,
        // or the user pressed the `meta` or `ctrl` key to open it in a new
        // window. Thus, we need to filter those events, too.
        if (el.target || ev.metaKey || ev.ctrlKey)
          return EMPTY

        // Next, we must check if the URL is relevant for us, i.e., if it's an
        // internal link to a page that is managed by MkDocs. Only then we can
        // be sure that the structure of the page to be loaded adheres to the
        // current document structure and can subsequently be injected into it
        // without doing a full reload. For this reason, we must canonicalize
        // the URL by removing all search parameters and hash fragments.
        const url = new URL(el.href)
        url.search = url.hash = ""

        // Skip, if URL is not included in the sitemap - this could be the case
        // when linking between versions or languages, or to another page that
        // the author included as part of the build, but that is not managed by
        // MkDocs. In that case we must not continue with instant navigation.
        if (!sitemap.includes(`${url}`))
          return EMPTY

        // We now know that we have a link to an internal page, so we prevent
        // the browser from navigation and emit the URL for instant navigation.
        // Note that this also includes anchor links, which means we need to
        // implement anchor positioning ourselves.
        ev.preventDefault()
        return of(new URL(el.href))
      }),
      share()
    )

  // Before fetching for the first time, resolve the absolute favicon position,
  // as the browser will try to fetch the icon immediately.
  instant$.pipe(take(1))
    .subscribe(() => {
      const favicon = getOptionalElement<HTMLLinkElement>("link[rel=icon]")
      if (typeof favicon !== "undefined")
        favicon.href = favicon.href
    })

  // Enable scroll restoration before window unloads - this is essential to
  // ensure that full reloads (F5) restore the viewport offset correctly. If
  // only popstate events wouldn't reset the scroll position prior to their
  // emission, we could just reset this in popstate. Meh.
  fromEvent(window, "beforeunload")
    .subscribe(() => {
      history.scrollRestoration = "auto"
    })

  // When an instant navigation event occurs, disable scroll restoration, since
  // we must normalize and synchronize the behavior across all browsers. For
  // instance, when the user clicks the back or forward button, the browser
  // would immediately jump to the position of the previous document.
  instant$.pipe(withLatestFrom(viewport$))
    .subscribe(([url, { offset }]) => {
      history.scrollRestoration = "manual"

      // While it would be better UX to defer the history state change until the
      // document was fully fetched and parsed, we must schedule it here, since
      // popstate events are emitted when history state changes happen. Moreover
      // we need to back up the current viewport offset, so we can restore it
      // when popstate events occur, e.g., when the browser's back and forward
      // buttons are used for navigation.
      history.replaceState(offset, "")
      history.pushState(null, "", url)
    })

  // Emit URL that should be fetched via instant loading on location subject,
  // which was passed into this function. The idea is that instant loading can
  // be intercepted by other parts of the application, which can synchronously
  // back up or restore state before instant loading happens.
  instant$.subscribe(location$)

  // Fetch document - when fetching, we could use `responseType: document`, but
  // since all MkDocs links are relative, we need to make sure that the current
  // location matches the document we just loaded. Otherwise any relative links
  // in the document might use the old location. If the request fails for some
  // reason, we fall back to regular navigation and set the location explicitly,
  // which will force-load the page. Furthermore, we must pre-warm the buffer
  // for the duplicate check, or the first click on an anchor link will also
  // trigger an instant loading event, which doesn't make sense.
  const response$ = location$
    .pipe(
      startWith(getLocation()),
      distinctUntilKeyChanged("pathname"),
      skip(1),
      switchMap(url => request(url)
        .pipe(
          catchError(() => {
            setLocation(url)
            return EMPTY
          })
        )
      )
    )

  // Initialize the DOM parser, parse the returned HTML, and replace selected
  // meta tags and components before handing control down to the application.
  const dom = new DOMParser()
  const document$ = response$
    .pipe(
      switchMap(res => res.text()),
      switchMap(res => {
        const document = dom.parseFromString(res, "text/html")
        for (const selector of [

          // Meta tags
          "title",
          "link[rel=canonical]",
          "meta[name=author]",
          "meta[name=description]",

          // Components
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

        // After meta tags and components were replaced, re-evaluate scripts
        // that were provided by the author as part of Markdown files.
        const container = getComponentElement("container")
        return concat(getElements("script", container))
          .pipe(
            switchMap(el => {
              const script = document.createElement("script")
              if (el.src) {
                for (const name of el.getAttributeNames())
                  script.setAttribute(name, el.getAttribute(name)!)
                el.replaceWith(script)

                // Complete when script is loaded
                return new Observable(observer => {
                  script.onload = () => observer.complete()
                })

              // Complete immediately
              } else {
                script.textContent = el.textContent
                el.replaceWith(script)
                return EMPTY
              }
            }),
            ignoreElements(),
            endWith(document)
          )
      }),
      share()
    )

  // Intercept popstate events, e.g. when using the browser's back and forward
  // buttons, and emit new location for fetching and parsing.
  const popstate$ = fromEvent<PopStateEvent>(window, "popstate")
  popstate$.pipe(map(() => getLocation()))
    .subscribe(location$)

  // Intercept clicks on anchor links, and scroll document into position. As
  // we disabled scroll restoration, we need to do this manually here.
  location$
    .pipe(
      startWith(getLocation()),
      bufferCount(2, 1),
      switchMap(([prev, next]) => (
        prev.pathname === next.pathname &&
        prev.hash     !== next.hash
      )
        ? of(next)
        : EMPTY
      )
    )
      .subscribe(url => {
        if (history.state !== null || !url.hash) {
          window.scrollTo(0, history.state?.y ?? 0)
        } else {
          history.scrollRestoration = "auto"
          setLocationHash(url.hash)
          history.scrollRestoration = "manual"
        }
      })

  // After parsing the document, check if the current history entry has a state.
  // This may happen when users press the back or forward button to visit a page
  // that was already seen. If there's no state, it means a new page was visited
  // and we should scroll to the top, unless an anchor is given.
  document$.pipe(withLatestFrom(location$))
    .subscribe(([, url]) => {
      if (history.state !== null || !url.hash) {
        window.scrollTo(0, history.state?.y ?? 0)
      } else {
        setLocationHash(url.hash)
      }
    })

  // If the current history is not empty, register an event listener updating
  // the current history state whenever the scroll position changes. This must
  // be debounced and cannot be done in popstate, as popstate has already
  // removed the entry from the history.
  document$
    .pipe(
      switchMap(() => viewport$),
      distinctUntilKeyChanged("offset"),
      debounceTime(100)
    )
      .subscribe(({ offset }) => {
        history.replaceState(offset, "")
      })

  // Return document
  return document$
}

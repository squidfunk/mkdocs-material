/*
 * Copyright (c) 2016-2024 Martin Donath <martin.donath@squidfunk.com>
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
  catchError,
  combineLatestWith,
  concat,
  debounceTime,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  endWith,
  fromEvent,
  ignoreElements,
  map,
  merge,
  of,
  share,
  switchMap,
  tap,
  withLatestFrom
} from "rxjs"

import { configuration, feature } from "~/_"
import {
  Viewport,
  getElements,
  getLocation,
  getOptionalElement,
  requestHTML,
  setLocation,
  setLocationHash
} from "~/browser"
import { getComponentElement } from "~/components"

import { Sitemap, fetchSitemap } from "../sitemap"

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Setup options
 */
interface SetupOptions {
  location$: Subject<URL>              // Location subject
  viewport$: Observable<Viewport>      // Viewport observable
  progress$: Subject<number>           // Progress subject
}

/* ----------------------------------------------------------------------------
 * Helper functions
 * ------------------------------------------------------------------------- */

/**
 * Handle clicks on internal URLs while skipping external URLs
 *
 * @param ev - Mouse event
 * @param sitemap - Sitemap
 *
 * @returns URL observable
 */
function handle(
  ev: MouseEvent, sitemap: Sitemap
): Observable<URL> {
  if (!(ev.target instanceof Element))
    return EMPTY

  // Skip, as target is not within a link - clicks on non-link elements are
  // also captured, which we need to exclude from processing
  const el = ev.target.closest("a")
  if (el === null)
    return EMPTY

  // Skip, as link opens in new window - we now know we have captured a click
  // on a link, but the link either has a `target` property defined, or the
  // user pressed the `meta` or `ctrl` key to open it in a new window. Thus,
  // we need to filter this event as well.
  if (el.target || ev.metaKey || ev.ctrlKey)
    return EMPTY

  // Next, we must check if the URL is relevant for us, i.e., if it's an
  // internal link to a page that is managed by MkDocs. Only then we can be
  // sure that the structure of the page to be loaded adheres to the current
  // document structure and can subsequently be injected into it without doing
  // a full reload. For this reason, we must canonicalize the URL by removing
  // all search parameters and hash fragments.
  const url = new URL(el.href)
  url.search = url.hash = ""

  // Skip, if URL is not included in the sitemap - this could be the case when
  // linking between versions or languages, or to another page that the author
  // included as part of the build, but that is not managed by MkDocs. In that
  // case we must not continue with instant navigation.
  if (!sitemap.has(`${url}`))
    return EMPTY

  // We now know that we have a link to an internal page, so we prevent the
  // browser from navigation and emit the URL for instant navigation. Note that
  // this also includes anchor links, which means we need to implement anchor
  // positioning ourselves. The reason for this is that if we wouldn't manage
  // anchor links as well, scroll restoration will not work correctly (e.g.
  // following an anchor link and scrolling).
  ev.preventDefault()
  return of(new URL(el.href))
}

/**
 * Create a map of head elements for lookup and replacement
 *
 * @param document - Document
 *
 * @returns Tag map
 */
function head(document: Document): Map<string, HTMLElement> {
  const tags = new Map<string, HTMLElement>()
  for (const el of getElements(":scope > *", document.head))
    tags.set(el.outerHTML, el)

  // Return tag map
  return tags
}

/**
 * Resolve relative URLs in the given document
 *
 * This function resolves relative `href` and `src` attributes, which can belong
 * to all sorts of tags, like meta tags, links, images, scripts and more.
 *
 * @param document - Document
 *
 * @returns Document observable
 */
function resolve(document: Document): Observable<Document> {
  for (const el of getElements("[href], [src]", document))
    for (const key of ["href", "src"]) {
      const value = el.getAttribute(key)
      if (value && !/^(?:[a-z]+:)?\/\//i.test(value)) {
        // @ts-expect-error - trick: self-assign to resolve URL
        el[key] = el[key]
        break
      }
    }

  // Return document observable
  return of(document)
}

/**
 * Inject the contents of a document into the current one
 *
 * @param next - Next document
 *
 * @returns Document observable
 */
function inject(next: Document): Observable<Document> {
  for (const selector of [
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
    const target = getOptionalElement(selector, next)
    if (
      typeof source !== "undefined" &&
      typeof target !== "undefined"
    ) {
      source.replaceWith(target)
    }
  }

  // Update meta tags
  const tags = head(document)
  for (const [html, el] of head(next))
    if (tags.has(html))
      tags.delete(html)
    else
      document.head.appendChild(el)

  // Remove meta tags that are not present in the new document
  for (const el of tags.values()) {
    const name = el.getAttribute("name")
    // @todo - find a better way to handle attributes we add dynamically in
    // other components without mounting components on every navigation, as
    // this might impact overall performance - see https://t.ly/ehp_O
    if (name !== "theme-color" && name !== "color-scheme")
      el.remove()
  }

  // After components and meta tags were replaced, re-evaluate scripts
  // that were provided by the author as part of Markdown files
  const container = getComponentElement("container")
  return concat(getElements("script", container))
    .pipe(
      switchMap(el => {
        const script = next.createElement("script")
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
export function setupInstantNavigation(
  { location$, viewport$, progress$ }: SetupOptions
): Observable<Document> {
  const config = configuration()
  if (location.protocol === "file:")
    return EMPTY

  // Load sitemap immediately, so we have it available when the user initiates
  // the first navigation request without any perceivable delay
  const sitemap$ = fetchSitemap(config.base)

  // Since we might be on a slow connection, the user might trigger multiple
  // instant navigation events that overlap. MkDocs produces relative URLs for
  // all internal links, which becomes a problem in this case, because we need
  // to change the base URL the moment the user clicks a link that should be
  // intercepted in order to be consistent with popstate, which means that the
  // base URL would now be incorrect when resolving another relative link from
  // the same site. For this reason we always resolve all relative links to
  // absolute links, so we can be sure this never happens.
  of(document)
    .subscribe(resolve)

  // --------------------------------------------------------------------------
  // Navigation interception
  // --------------------------------------------------------------------------

  // Intercept navigation - to keep the number of event listeners down we use
  // the fact that uncaptured events bubble up to the body. This has the nice
  // property that we don't need to detach and then re-attach event listeners
  // when the document is replaced after a navigation event.
  const instant$ =
    fromEvent<MouseEvent>(document.body, "click")
      .pipe(
        combineLatestWith(sitemap$),
        switchMap(([ev, sitemap]) => handle(ev, sitemap)),
        share()
      )

  // Intercept history change events, e.g. when the user uses the browser's
  // back or forward buttons, and emit new location for fetching and parsing
  const history$ =
    fromEvent<PopStateEvent>(window, "popstate")
      .pipe(
        map(getLocation),
        share()
      )

  // While it would be better UX to defer navigation events until the document
  // is fully fetched and parsed, we must schedule it here to synchronize with
  // popstate events, as they are emitted immediately. Moreover we need to
  // store the current viewport offset for scroll restoration later on.
  instant$.pipe(withLatestFrom(viewport$))
    .subscribe(([url, { offset }]) => {
      history.replaceState(offset, "")
      history.pushState(null, "", url)
    })

  // Emit URLs that should be fetched via instant navigation on location subject
  // which was passed into this function. The state of instant navigation can be
  // intercepted by other parts of the application, which can synchronously back
  // up or restore state before or after instant navigation happens.
  merge(instant$, history$)
    .subscribe(location$)

  // --------------------------------------------------------------------------
  // Fetching and parsing
  // --------------------------------------------------------------------------

  // Fetch document - we deduplicate requests to the same location, so we don't
  // end up with multiple requests for the same page. We use `switchMap`, since
  // we want to cancel the previous request when a new one is triggered, which
  // is automatically handled by the observable returned by `request`. This is
  // essential to ensure a good user experience, as we don't want to load pages
  // that are not needed anymore, e.g., when the user clicks multiple links in
  // quick succession or on slow connections. If the request fails for some
  // reason, we fall back and use regular navigation, forcing a reload.
  const document$ =
    location$.pipe(
      distinctUntilKeyChanged("pathname"),
      switchMap(url => requestHTML(url, { progress$ })
        .pipe(
          catchError(() => {
            setLocation(url, true)
            return EMPTY
          })
        )
      ),

      // The document was successfully fetched and parsed, so we can inject its
      // contents into the currently active document
      switchMap(resolve),
      switchMap(inject),
      share()
    )

  // --------------------------------------------------------------------------
  // Scroll restoration
  // --------------------------------------------------------------------------

  // Handle scroll restoration - we must restore the viewport offset after the
  // document has been fetched and injected, and every time the user clicks an
  // anchor that leads to an element on the same page, which might also happen
  // when the user uses the back or forward button.
  merge(
    document$.pipe(withLatestFrom(location$, (_, url) => url)),

    // Handle instant navigation events that are triggered by the user clicking
    // on an anchor link with a hash fragment different from the current one, as
    // well as from popstate events, which are emitted when the user navigates
    // back and forth between pages. We use a two-layered subscription to scope
    // the scroll restoration to the current page, as we don't need to restore
    // the viewport offset when the user navigates to a different page, as this
    // is already handled by the previous observable.
    document$.pipe(
      switchMap(() => location$),
      distinctUntilKeyChanged("pathname"),
      switchMap(() => location$),
      distinctUntilKeyChanged("hash")
    ),

    // Handle instant navigation events that are triggered by the user clicking
    // on an anchor link with the same hash fragment as the current one in the
    // URL. It is essential that we only intercept those from instant navigation
    // events and not from history change events, or we'll end up in and endless
    // loop. The top-level history entry must be removed, as it will be replaced
    // with a new one, which would otherwise lead to a duplicate entry.
    location$.pipe(
      distinctUntilChanged((a, b) => (
        a.pathname === b.pathname &&
        a.hash     === b.hash
      )),
      switchMap(() => instant$),
      tap(() => history.back())
    )
  )
    .subscribe(url => {

      // Check if the current history entry has a state, which happens when the
      // user presses the back or forward button to visit a page we've already
      // seen. If there's no state, it means a new page was visited and we must
      // scroll to the top, unless an anchor is given.
      if (history.state !== null || !url.hash) {
        window.scrollTo(0, history.state?.y ?? 0)
      } else {
        history.scrollRestoration = "auto"
        setLocationHash(url.hash)
        history.scrollRestoration = "manual"
      }
    })

  // Disable scroll restoration when an instant navigation event occurs, so the
  // browser does not immediately set the viewport offset to the prior history
  // entry, scrolling to the position on the same page, which would look odd.
  // Instead, we manually restore the position once the page has loaded.
  location$.subscribe(() => {
    history.scrollRestoration = "manual"
  })

  // Enable scroll restoration before window unloads - this is essential to
  // ensure that full reloads (F5) restore the viewport offset correctly. If
  // only popstate events wouldn't reset the viewport offset prior to their
  // emission, we could just reset this in popstate. Meh.
  fromEvent(window, "beforeunload")
    .subscribe(() => {
      history.scrollRestoration = "auto"
    })

  // Track viewport offset, so we can restore it when the user navigates back
  // and forth between pages. Note that this must be debounced and cannot be
  // done in popstate, as popstate has already removed the entry from the
  // history, which means it is too late.
  viewport$.pipe(
    distinctUntilKeyChanged("offset"),
    debounceTime(100)
  )
    .subscribe(({ offset }) => {
      history.replaceState(offset, "")
    })

  // Return document observable
  return document$
}

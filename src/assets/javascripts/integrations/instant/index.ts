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

import { Observable, Subject, fromEvent } from "rxjs"

import { Viewport, ViewportOffset, getElement } from "~/browser"

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
 * @param urls - URLs to load with XHR
 * @param options - Options
 */
export function setupInstantLoading(
  urls: string[], { document$, location$, viewport$ }: SetupOptions
): void {
  if (location.protocol === "file:")
    return

  /* Disable automatic scroll restoration */
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual"

    /* Hack: ensure that reloads restore viewport offset */
    fromEvent(window, "beforeunload")
      .subscribe(() => {
        history.scrollRestoration = "auto"
      })
  }

  /* Hack: ensure absolute favicon link to omit 404s when switching */
  const favicon = getElement<HTMLLinkElement>("link[rel='shortcut icon']")
  if (typeof favicon !== "undefined")
    favicon.href = favicon.href

  // eslint-disable-next-line
  console.log(urls, document$, location$, viewport$)
}

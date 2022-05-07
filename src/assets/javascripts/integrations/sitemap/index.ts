/*
 * Copyright (c) 2016-2022 Martin Donath <martin.donath@squidfunk.com>
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
  catchError,
  defaultIfEmpty,
  map,
  of,
  tap
} from "rxjs"

import { configuration } from "~/_"
import { getElements, requestXML } from "~/browser"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Sitemap, i.e. a list of URLs
 */
export type Sitemap = string[]

/* ----------------------------------------------------------------------------
 * Helper functions
 * ------------------------------------------------------------------------- */

/**
 * Preprocess a list of URLs
 *
 * This function replaces the `site_url` in the sitemap with the actual base
 * URL, to allow instant loading to work in occasions like Netlify previews.
 *
 * @param urls - URLs
 *
 * @returns URL path parts
 */
function preprocess(urls: Sitemap): Sitemap {
  if (urls.length < 2)
    return [""]

  /* Take the first two URLs and remove everything after the last slash */
  const [root, next] = [...urls]
    .sort((a, b) => a.length - b.length)
    .map(url => url.replace(/[^/]+$/, ""))

  /* Compute common prefix */
  let index = 0
  if (root === next)
    index = root.length
  else
    while (root.charCodeAt(index) === next.charCodeAt(index))
      index++

  /* Remove common prefix and return in original order */
  return urls.map(url => url.replace(root.slice(0, index), ""))
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Fetch the sitemap for the given base URL
 *
 * @param base - Base URL
 *
 * @returns Sitemap observable
 */
export function fetchSitemap(base?: URL): Observable<Sitemap> {
  const cached = __md_get<Sitemap>("__sitemap", sessionStorage, base)
  if (cached) {
    return of(cached)
  } else {
    const config = configuration()
    return requestXML(new URL("sitemap.xml", base || config.base))
      .pipe(
        map(sitemap => preprocess(getElements("loc", sitemap)
          .map(node => node.textContent!)
        )),
        catchError(() => EMPTY), // @todo refactor instant loading
        defaultIfEmpty([]),
        tap(sitemap => __md_set("__sitemap", sitemap, sessionStorage, base))
      )
  }
}

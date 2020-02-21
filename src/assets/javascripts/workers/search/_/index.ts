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
 * FITNESS FOR A RTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */

import { Subject, from } from "rxjs"
import { ajax } from "rxjs/ajax"
import { map, pluck, shareReplay } from "rxjs/operators"

import { SearchIndexOptions } from "integrations/search"
import {
  WorkerHandler,
  getLocation,
  watchWorker
} from "observables"

import {
  SearchMessage,
  SearchMessageType,
  SearchSetupMessage,
  isSearchResultMessage
} from "../message"

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Setup options
 */
interface SetupOptions {
  base: string                         /* Base url */
  index?: Promise<SearchIndexOptions>  /* Promise resolving with index */
}

/* ----------------------------------------------------------------------------
 * Helper functions
 * ------------------------------------------------------------------------- */

/**
 * Resolve URL
 * * TODO: document what's going on here + cache results
 *
 * @param origin - Base URL
 * @param paths - Further URL paths
 *
 * @return Relative URL
 */
function resolve(origin: URL, ...paths: string[]) {
  const path = location.pathname
    .replace(origin.pathname, "")
    .replace(/[^\/]+/g, "..")
  return [path, ...paths].join("")
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Setup search web worker
 *
 * This function will create a web worker to setup and query the search index
 * which is done using `lunr`. The index can be passed explicitly in order to
 * enable hacks like _localsearch_ via search index embedding as JSON. If no
 * index is given, this function will load it from the default location.
 *
 * @param url - Worker url
 * @param options - Options
 *
 * @return Worker handler
 */
export function setupSearchWorker(
  url: string, { base, index }: SetupOptions
): WorkerHandler<SearchMessage> {
  const worker = new Worker(url)
  const origin = new URL(base, getLocation())

  /* Create communication channels and resolve relative links */
  const tx$ = new Subject<SearchMessage>()
  const rx$ = watchWorker(worker, { tx$ })
    .pipe(
      map(message => {
        if (isSearchResultMessage(message)) {
          for (const { article, sections } of message.data) {
            article.location = resolve(origin, article.location)
            for (const section of sections)
              section.location = resolve(origin, section.location)
          }
        }
        return message
      }),
      shareReplay(1)
    )

  /* Fetch index if it wasn't passed explicitly */
  const index$ = typeof index !== "undefined"
    ? from(index)
    : ajax({
        url: resolve(origin, "search/search_index.json"),
        responseType: "json",
        withCredentials: true
      })
        .pipe<SearchIndexOptions>(
          pluck("response")
        )

  /* Send index to worker */
  index$
    .pipe<SearchSetupMessage>(
      map(data => ({
        type: SearchMessageType.SETUP,
        data
      }))
    )
      .subscribe(tx$.next.bind(tx$))

  /* Return worker handler */
  return { tx$, rx$ }
}

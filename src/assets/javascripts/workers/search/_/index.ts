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

import { Observable, Subject } from "rxjs"
import { ajax } from "rxjs/ajax"
import { distinctUntilKeyChanged, map, pluck } from "rxjs/operators"

import { SearchIndexOptions } from "modules"
import {
  SearchQuery,
  WorkerHandler,
  watchWorker
} from "observables"

import {
  SearchMessage,
  SearchMessageType,
  SearchQueryMessage,
  SearchSetupMessage,
  isSearchResultMessage
} from "../message"

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Options
 */
interface Options {
  base: string                         /* Base url */
  query$: Observable<SearchQuery>      /* Search query observable */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Setup search web worker
 *
 * @param url - Worker url
 * @param options - Options
 *
 * @return Worker handler
 */
export function setupSearchWorker(
  url: string, { base, query$ }: Options
): WorkerHandler<SearchMessage> {
  const worker = new Worker(url)
  const prefix = new URL(base, location.href)

  /* Create communication channels and correct relative links */
  const tx$ = new Subject<SearchMessage>()
  const rx$ = watchWorker(worker, { tx$ })
    .pipe(
      map(message => {
        if (isSearchResultMessage(message)) {
          for (const { article, sections } of message.data) {
            article.location = `${prefix}/${article.location}`
            for (const section of sections)
              section.location = `${prefix}/${section.location}`
          }
        }
        return message
      })
    )

  /* Fetch index and setup search worker */
  ajax({
    url: `${base}/search/search_index.json`,
    responseType: "json",
    withCredentials: true
  })
    .pipe(
      pluck("response"),
      map<SearchIndexOptions, SearchSetupMessage>(data => ({
        type: SearchMessageType.SETUP,
        data
      }))
    )
      .subscribe(tx$.next.bind(tx$))

  /* Subscribe to search query */
  query$
    .pipe(
      distinctUntilKeyChanged("value"),
      map<SearchQuery, SearchQueryMessage>(query => ({
        type: SearchMessageType.QUERY,
        data: query.value
      }))
    )
      .subscribe(tx$.next.bind(tx$))

  /* Return worker handler */
  return { tx$, rx$ }
}

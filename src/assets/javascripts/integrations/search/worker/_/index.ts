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

import { Observable, Subject, asyncScheduler } from "rxjs"
import {
  map,
  observeOn,
  share,
  withLatestFrom
} from "rxjs/operators"

import { WorkerHandler, watchWorker } from "browser"
import { translate } from "utilities"

import { SearchIndex, SearchIndexPipeline } from "../../_"
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
  index$: Observable<SearchIndex>      /* Search index observable */
  base$: Observable<string>            /* Location base observable */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Set up search index
 *
 * @param data - Search index
 *
 * @return Search index
 */
function setupSearchIndex(
  { config, docs, index }: SearchIndex
): SearchIndex {

  /* Override default language with value from translation */
  if (config.lang.length === 1 && config.lang[0] === "en")
    config.lang = [translate("search.config.lang")]

  /* Override default separator with value from translation */
  if (config.separator === "[\\s\\-]+")
    config.separator = translate("search.config.separator")

  /* Set pipeline from translation */
  const pipeline = translate("search.config.pipeline")
    .split(/\s*,\s*/)
    .filter(Boolean) as SearchIndexPipeline

  /* Return search index after defaulting */
  return { config, docs, index, pipeline }
}

/* ----------------------------------------------------------------------------
 * Helper functions
 * ------------------------------------------------------------------------- */

/**
 * Set up search web worker
 *
 * This function will create a web worker to set up and query the search index
 * which is done using `lunr`. The index must be passed as an observable to
 * enable hacks like _localsearch_ via search index embedding as JSON.
 *
 * @param url - Worker URL
 * @param options - Options
 *
 * @return Worker handler
 */
export function setupSearchWorker(
  url: string, { index$, base$ }: SetupOptions
): WorkerHandler<SearchMessage> {
  const worker = new Worker(url)

  /* Create communication channels and resolve relative links */
  const tx$ = new Subject<SearchMessage>()
  const rx$ = watchWorker(worker, { tx$ })
    .pipe(
      withLatestFrom(base$),
      map(([message, base]) => {
        if (isSearchResultMessage(message)) {
          for (const result of message.data)
            for (const document of result)
              document.location = `${base}/${document.location}`
        }
        return message
      }),
      share()
    )

  /* Set up search index */
  index$
    .pipe(
      map<SearchIndex, SearchSetupMessage>(data => ({
        type: SearchMessageType.SETUP,
        data: setupSearchIndex(data)
      })),
      observeOn(asyncScheduler)
    )
      .subscribe(tx$.next.bind(tx$))

  /* Return worker handler */
  return { tx$, rx$ }
}

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
 * FITNESS FOR A RTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */

import {
  ObservableInput,
  Subject,
  from,
  map,
  share
} from "rxjs"

import { configuration, feature, translation } from "~/_"
import { WorkerHandler, watchWorker } from "~/browser"

import { SearchIndex } from "../../_"
import {
  SearchOptions,
  SearchPipeline
} from "../../options"
import {
  SearchMessage,
  SearchMessageType,
  SearchSetupMessage,
  isSearchResultMessage
} from "../message"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Search worker
 */
export type SearchWorker = WorkerHandler<SearchMessage>

/* ----------------------------------------------------------------------------
 * Helper functions
 * ------------------------------------------------------------------------- */

/**
 * Set up search index
 *
 * @param data - Search index
 *
 * @returns Search index
 */
function setupSearchIndex({ config, docs }: SearchIndex): SearchIndex {

  /* Override default language with value from translation */
  if (config.lang.length === 1 && config.lang[0] === "en")
    config.lang = [
      translation("search.config.lang")
    ]

  /* Override default separator with value from translation */
  if (config.separator === "[\\s\\-]+")
    config.separator = translation("search.config.separator")

  /* Set pipeline from translation */
  const pipeline = translation("search.config.pipeline")
    .split(/\s*,\s*/)
    .filter(Boolean) as SearchPipeline

  /* Determine search options */
  const options: SearchOptions = {
    pipeline,
    suggestions: feature("search.suggest")
  }

  /* Return search index after defaulting */
  return { config, docs, options }
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Set up search worker
 *
 * This function creates a web worker to set up and query the search index,
 * which is done using Lunr.js. The index must be passed as an observable to
 * enable hacks like _localsearch_ via search index embedding as JSON.
 *
 * @param url - Worker URL
 * @param index - Search index observable input
 *
 * @returns Search worker
 */
export function setupSearchWorker(
  url: string, index: ObservableInput<SearchIndex>
): SearchWorker {
  const config = configuration()
  const worker = new Worker(url)

  /* Create communication channels and resolve relative links */
  const tx$ = new Subject<SearchMessage>()
  const rx$ = watchWorker(worker, { tx$ })
    .pipe(
      map(message => {
        if (isSearchResultMessage(message)) {
          for (const result of message.data.items)
            for (const document of result)
              document.location = `${new URL(document.location, config.base)}`
        }
        return message
      }),
      share()
    )

  /* Set up search index */
  from(index)
    .pipe(
      map(data => ({
        type: SearchMessageType.SETUP,
        data: setupSearchIndex(data)
      } as SearchSetupMessage))
    )
      .subscribe(tx$.next.bind(tx$))

  /* Return search worker */
  return { tx$, rx$ }
}

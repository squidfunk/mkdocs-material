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

import "lunr"

import {
  Search,
  SearchIndex,
  SearchIndexConfig
} from "../../_"
import {
  SearchMessage,
  SearchMessageType
} from "../message"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Add support for usage with `iframe-worker` polyfill
 *
 * While `importScripts` is synchronous when executed inside of a webworker,
 * it's not possible to provide a synchronous polyfilled implementation. The
 * cool thing is that awaiting a non-Promise is a noop, so extending the type
 * definition to return a `Promise` shouldn't break anything.
 *
 * @see https://bit.ly/2PjDnXi - GitHub comment
 */
declare global {
  function importScripts(...urls: string[]): Promise<void> | void
}

/* ----------------------------------------------------------------------------
 * Data
 * ------------------------------------------------------------------------- */

/**
 * Search index
 */
let index: Search

/* ----------------------------------------------------------------------------
 * Helper functions
 * ------------------------------------------------------------------------- */

/**
 * Fetch search index from given URL
 *
 * @param url - Search index URL
 *
 * @return Promise resolving with search index
 */
async function fetchSearchIndex(url: string): Promise<SearchIndex> {
  return fetch(url, {
    credentials: "same-origin"
  })
    .then(res => res.json())
}

/**
 * Fetch (= import) multi-language support through `lunr-languages`
 *
 * This function will automatically import the stemmers necessary to process
 * the languages which were given through the search index configuration.
 *
 * @param config - Search index configuration
 *
 * @return Promise resolving with no result
 */
async function setupSearchLanguages(
  config: SearchIndexConfig
): Promise<void> {
  const base = "../lunr"

  /* Add scripts for languages */
  const scripts = []
  for (const lang of config.lang) {
    if (lang === "ja") scripts.push(`${base}/tinyseg.min.js`)
    if (lang !== "en") scripts.push(`${base}/min/lunr.${lang}.min.js`)
  }

  /* Add multi-language support */
  if (config.lang.length > 1)
    scripts.push(`${base}/min/lunr.multi.min.js`)

  /* Load scripts synchronously */
  if (scripts.length)
    await importScripts(
      `${base}/min/lunr.stemmer.support.min.js`,
      ...scripts
    )
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Message handler
 *
 * @param message - Source message
 *
 * @return Target message
 */
export async function handler(
  message: SearchMessage
): Promise<SearchMessage> {
  switch (message.type) {

    /* Search setup message */
    case SearchMessageType.SETUP:
      const data = typeof message.data === "string"
        ? await fetchSearchIndex(message.data)
        : message.data

      /* Set up search index with multi-language support */
      await setupSearchLanguages(data.config)
      index = new Search(data)
      return {
        type: SearchMessageType.READY
      }

    /* Search query message */
    case SearchMessageType.QUERY:
      return {
        type: SearchMessageType.RESULT,
        data: index ? index.search(message.data) : []
      }

    /* All other messages */
    default:
      throw new TypeError("Invalid message type")
  }
}

/* ----------------------------------------------------------------------------
 * Worker
 * ------------------------------------------------------------------------- */

addEventListener("message", async ev => {
  postMessage(await handler(ev.data))
})

/*
 * Copyright (c) 2016-2025 Martin Donath <martin.donath@squidfunk.com>
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

import type { SearchResult, SearchItem } from "../../_";
import "~/polyfills"

import {
  SearchMessage,
  SearchMessageType
} from "../message"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Add support for `iframe-worker` shim
 *
 * While `importScripts` is synchronous when executed inside of a web worker,
 * it's not possible to provide a synchronous shim implementation. The cool
 * thing is that awaiting a non-Promise will convert it into a Promise, so
 * extending the type definition to return a `Promise` shouldn't break anything.
 *
 * @see https://bit.ly/2PjDnXi - GitHub comment
 *
 * @param urls - Scripts to load
 *
 * @returns Promise resolving with no result
 */
declare global {
  function importScripts(...urls: string[]): Promise<void> | void
}

/* ----------------------------------------------------------------------------
 * Data
 * ------------------------------------------------------------------------- */

let searchEndpoint: string;

/* ----------------------------------------------------------------------------
 * Helper functions
 * ------------------------------------------------------------------------- */

async function handleSearch(keyword: string): Promise<SearchResult> {
  keyword = keyword.trim();
  if (!keyword) return { items: [] };

  interface OiWikiSearchServerResponseBody {
    url: string;
    title: string;
    highlight: string[];
  }

  const response = await fetch(
    `${searchEndpoint}?s=${keyword}`,
    {
      credentials: "same-origin"
    }
  );
  const responseBody: OiWikiSearchServerResponseBody[] = await response.json();

  let score = 1e6;
  return {
    items: responseBody.map<SearchItem[]>(item =>
      (item.highlight || [""]).map(match => ({
        title: item.title,
        location: item.url.startsWith("/") ? item.url.slice(1) : item.url,
        terms: { [keyword]: true },
        text: match.split("<em>").join("<mark>").split("</em>").join("</mark>"),
        score: --score
      }))
    )
  };
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Message handler
 *
 * @param message - Source message
 *
 * @returns Target message
 */
export async function handler(
  message: SearchMessage
): Promise<SearchMessage> {
  switch (message.type) {

    /* Search setup message */
    case SearchMessageType.SETUP:
      searchEndpoint = message.data as any as string;
      return {
        type: SearchMessageType.READY
      }

    /* Search query message */
    case SearchMessageType.QUERY:
      return {
        type: SearchMessageType.RESULT,
        data: await handleSearch(message.data)
      }

    /* All other messages */
    default:
      throw new TypeError("Invalid message type")
  }
}

/* ----------------------------------------------------------------------------
 * Worker
 * ------------------------------------------------------------------------- */

/* Handle messages */
addEventListener("message", async ev => {
  postMessage(await handler(ev.data))
})

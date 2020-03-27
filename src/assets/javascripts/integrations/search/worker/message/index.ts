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

import { SearchIndex, SearchResult } from "../../_"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Search message type
 */
export const enum SearchMessageType {
  SETUP,                               /* Search index setup */
  READY,                               /* Search index ready */
  QUERY,                               /* Search query */
  RESULT                               /* Search results */
}

/* ------------------------------------------------------------------------- */

/**
 * A message containing the data necessary to setup the search index
 */
export interface SearchSetupMessage {
  type: SearchMessageType.SETUP        /* Message type */
  data: SearchIndex                    /* Message data */
}

/**
 * A message indicating the search index is ready
 */
export interface SearchReadyMessage {
  type: SearchMessageType.READY       /* Message type */
}

/**
 * A message containing a search query
 */
export interface SearchQueryMessage {
  type: SearchMessageType.QUERY        /* Message type */
  data: string                         /* Message data */
}

/**
 * A message containing results for a search query
 */
export interface SearchResultMessage {
  type: SearchMessageType.RESULT       /* Message type */
  data: SearchResult[]                 /* Message data */
}

/* ------------------------------------------------------------------------- */

/**
 * A message exchanged with the search worker
 */
export type SearchMessage =
  | SearchSetupMessage
  | SearchReadyMessage
  | SearchQueryMessage
  | SearchResultMessage

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Type guard for search setup messages
 *
 * @param message - Search worker message
 *
 * @return Test result
 */
export function isSearchSetupMessage(
  message: SearchMessage
): message is SearchSetupMessage {
  return message.type === SearchMessageType.SETUP
}

/**
 * Type guard for search ready messages
 *
 * @param message - Search worker message
 *
 * @return Test result
 */
export function isSearchReadyMessage(
  message: SearchMessage
): message is SearchReadyMessage {
  return message.type === SearchMessageType.READY
}

/**
 * Type guard for search query messages
 *
 * @param message - Search worker message
 *
 * @return Test result
 */
export function isSearchQueryMessage(
  message: SearchMessage
): message is SearchQueryMessage {
  return message.type === SearchMessageType.QUERY
}

/**
 * Type guard for search result messages
 *
 * @param message - Search worker message
 *
 * @return Test result
 */
export function isSearchResultMessage(
  message: SearchMessage
): message is SearchResultMessage {
  return message.type === SearchMessageType.RESULT
}

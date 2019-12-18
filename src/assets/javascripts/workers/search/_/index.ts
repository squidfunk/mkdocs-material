/*
 * Copyright (c) 2016-2019 Martin Donath <martin.donath@squidfunk.com>
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

import { Subject } from "rxjs"

import { SearchIndex, SearchResult } from "modules"
import { watchWorker } from "utilities"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Search message type
 */
export const enum SearchMessageType {
  SETUP,                               /* Search index setup */
  DUMP,                                /* Search index dump */
  QUERY,                               /* Search query */
  RESULT                               /* Search results */
}

/* ------------------------------------------------------------------------- */

/**
 * A message containing the data necessary to setup the search index
 */
interface SetupMessage {
  type: SearchMessageType.SETUP        /* Message type */
  data: SearchIndex                    /* Message data */
}

/**
 * A message containing the a dump of the search index
 */
interface DumpMessage {
  type: SearchMessageType.DUMP        /* Message type */
  data: string                        /* Message data */
}

/**
 * A message containing a search query
 */
interface QueryMessage {
  type: SearchMessageType.QUERY        /* Message type */
  data: string                         /* Message data */
}

/**
 * A message containing results for a search query
 */
interface ResultMessage {
  type: SearchMessageType.RESULT       /* Message type */
  data: SearchResult[]                 /* Message data */
}

/* ------------------------------------------------------------------------- */

/**
 * A message exchanged with the search worker
 */
export type SearchMessage =
  | SetupMessage
  | DumpMessage
  | QueryMessage
  | ResultMessage

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

import { SearchIndex } from "modules"

import { SearchMessage, SearchMessageType } from "../_"

/* ----------------------------------------------------------------------------
 * Data
 * ------------------------------------------------------------------------- */

/**
 * Search index
 */
let index: SearchIndex

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
export function handler(message: SearchMessage): SearchMessage {
  switch (message.type) {

    /* Setup search index */
    case SearchMessageType.SETUP:
      index = new SearchIndex(message.data)
      return {
        type: SearchMessageType.DUMP,
        data: index.toString()
      }

    /* Query search index */
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

self.addEventListener("message", ev => {
  self.postMessage(handler(ev.data))
})

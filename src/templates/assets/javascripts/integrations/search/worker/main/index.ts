/*!
 * Search preview, do not use in production - see https://t.ly/ovHX7
 * ----------------------------------------------------------------------------
 * Copyright (c) 2016-2023 Martin Donath <martin.donath@squidfunk.com>
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

import { create, search } from "@squidfunk/mkdocs-material-search-preview"

import {
  SearchMessage,
  SearchMessageType
} from "../message"

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
      await create(message.data.config, message.data.docs)
      return {
        type: SearchMessageType.READY
      }

    /* Search query message */
    case SearchMessageType.QUERY:
      const query = message.data
      try {
        return {
          type: SearchMessageType.RESULT,
          data: await search(query)
        }

      /* Return empty result in case of error */
      } catch (err) {
        console.warn(err)
        return {
          type: SearchMessageType.RESULT,
          data: { items: [] }
        }
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

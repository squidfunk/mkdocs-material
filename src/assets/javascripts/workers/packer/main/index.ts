
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
 * FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */

import {
  compress,
  compressToUTF16,
  decompress,
  decompressFromUTF16
} from "lz-string"

import { PackerMessage, PackerMessageType } from "../_"

/* ----------------------------------------------------------------------------
 * Data
 * ------------------------------------------------------------------------- */

/**
 * Determine methods for packing and unpacking
 *
 * While all Webkit-based browsers can store invalid UTF-16 strings in local
 * storage, other browsers may only store valid UTF-16 strings.
 *
 * @see https://bit.ly/2Q1ArhU - LZ-String documentation
 */
const isWebkit = navigator.userAgent.includes("AppleWebKit")

/* ------------------------------------------------------------------------- */

/**
 * Method for packing
 */
const pack = isWebkit
  ? compress
  : compressToUTF16

/**
 * Method for unpacking
 */
const unpack = isWebkit
  ? decompress
  : decompressFromUTF16

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
export function handler(message: PackerMessage): PackerMessage {
  switch (message.type) {

    /* Pack an unpacked string */
    case PackerMessageType.STRING:
      return {
        type: PackerMessageType.BINARY,
        data: pack(message.data)
      }

    /* Unpack a packed string */
    case PackerMessageType.BINARY:
      return {
        type: PackerMessageType.STRING,
        data: unpack(message.data)
      }
  }
}

/* ----------------------------------------------------------------------------
 * Worker
 * ------------------------------------------------------------------------- */

addEventListener("message", ev => {
  postMessage(handler(ev.data))
})


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

import { compress, decompress } from "lz-string"

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Packer message type
 */
export const enum PackerMessageType {
  STRING,                              /* String data */
  PACKED                               /* Packed data */
}

/* ------------------------------------------------------------------------- */

/**
 * A message containing an unpacked string
 */
interface StringMessage {
  type: PackerMessageType.STRING       /* Message type */
  data: string                         /* Message data */
}

/**
 * A message containing a packed string
 */
interface PackedMessage {
  type: PackerMessageType.PACKED       /* Message type */
  data: string                         /* Message data */
}

/* ------------------------------------------------------------------------- */

/**
 * A message exchanged with the packer worker
 */
export type PackerMessage =
  | StringMessage
  | PackedMessage

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
        type: PackerMessageType.PACKED,
        data: compress(message.data)
      }

    /* Unpack a packed string */
    case PackerMessageType.PACKED:
      return {
        type: PackerMessageType.STRING,
        data: decompress(message.data)
      }
  }
}

/* ----------------------------------------------------------------------------
 * Worker
 * ------------------------------------------------------------------------- */

addEventListener("message", ev => {
  postMessage(handler(ev.data))
})

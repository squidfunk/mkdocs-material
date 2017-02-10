/*
 * Copyright (c) 2016-2017 Martin Donath <martin.donath@squidfunk.com>
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

import launcher from "sauce-connect-launcher"

/* ----------------------------------------------------------------------------
 * Locals
 * ------------------------------------------------------------------------- */

/* SauceConnect process */
let server = null

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Open SauceConnect tunnel
 *
 * @param {string} id - Unique identifier
 * @param {string} username - SauceConnect username
 * @param {string} accesskey - SauceConnect accesskey
 * @param {Function} done - Resolve callback
 */
export const start = (id, username, accesskey, done) => {
  launcher({
    username,
    accessKey: accesskey,
    tunnelIdentifier: id
  }, (err, proc) => {
    if (err)
      throw new Error(err)
    server = proc
    done()
  })

  /* Register signal handlers */
  for (const signal of ["SIGTERM", "SIGINT", "exit"])
    process.on(signal, stop)
}

/**
 * Close SauceConnect tunnel
 *
 * @param {Function} done - Resolve callback
 */
export const stop = done => {
  if (server) {
    server.close(done)
    server = null
  }
}

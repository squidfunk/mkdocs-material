/*
 * Copyright (c) 2016 Martin Donath <martin.donath@squidfunk.com>
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

import selenium from "selenium-standalone"

/* ----------------------------------------------------------------------------
 * Locals
 * ------------------------------------------------------------------------- */

/* Selenium server */
let server = null

/* ----------------------------------------------------------------------------
 * Definition
 * ------------------------------------------------------------------------- */

export const start = done => {
  selenium.start({}, (err, proc) => {
    if (err) {

      /* Install selenium, if not present */
      if (/^Missing(.*)chromedriver$/.test(err.message)) {
        selenium.install(done)

        /* Start selenium again */
        selenium.start({}, (err_, proc_) => {
          server = proc_
        })

      /* Otherwise, throw error */
      } else {
        throw err
      }
    }

    /* Remember process handle */
    server = server || proc
    done()
  })
}

export const stop = () => {
  if (server)
    server.kill()
}

/* ----------------------------------------------------------------------------
 * Signal handler
 * ------------------------------------------------------------------------- */

/* Register signal handler for all relevant events */
for (const signal of ["SIGTERM", "SIGINT", "exit"])
  process.on(signal, stop)

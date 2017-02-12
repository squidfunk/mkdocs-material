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

import moniker from "moniker"
import * as ecstatic from "~/lib/servers/ecstatic"
import * as sauce from "~/lib/servers/sauce-connect"

/* ----------------------------------------------------------------------------
 * Task: run visual tests
 * ------------------------------------------------------------------------- */

export default (gulp, config) => {
  return done => {

    /* Start static file server */
    new Promise(resolve => {
      ecstatic.start(`${config.tests.visual}/data`, 8000, resolve)

    /* Open SauceConnect tunnel */
    }).then(() => {
      return new Promise((resolve, reject) => {

        /* Start SauceConnect tunnel */
        if (process.env.CI || process.env.SAUCE) {
          if (!process.env.SAUCE_USERNAME ||
              !process.env.SAUCE_ACCESS_KEY)
            throw new Error(
              "SauceConnect: please provide SAUCE_USERNAME " +
              "and SAUCE_ACCESS_KEY")

            /* Open tunnel */
          sauce.start(
            `Local #${moniker.choose()}`,
            process.env.SAUCE_USERNAME,
            process.env.SAUCE_ACCESS_KEY,
            err => {
              return err ? reject(err) : resolve(sauce)
            })
        } else {
          resolve()
        }
      })

        /* Close tunnel on CTRL-C */
        .then(runner => {
          return new Promise(resolve => {
            process.on("SIGINT", () => {
              return runner
                ? runner.stop(resolve)
                : resolve()
            })
          })
        })

    /* Stop static file server */
    })
      .then(() => {
        ecstatic.stop(done)
      }, err => {
        return done(err)
      })
  }
}

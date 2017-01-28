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

import path from "path"
import * as ecstatic from "~/lib/servers/ecstatic"
import * as selenium from "~/lib/servers/selenium"

import Gemini from "gemini"

/* ----------------------------------------------------------------------------
 * Test runner: Selenium
 * ------------------------------------------------------------------------- */

class SeleniumTestRunner {

  /**
   * Start Selenium
   *
   * @param {Function} done - Resolve callback
   */
  start(done) {
    selenium.start(done)
  }

  /**
   * Stop Selenium
   *
   * @param {Function} done - Resolve callback
   */
  stop(done) {
    selenium.stop(done)
  }
}

/* ----------------------------------------------------------------------------
 * Task: run visual tests
 * ------------------------------------------------------------------------- */

export default (gulp, config, args) => {
  return done => {

    /* Start static file server */
    new Promise(resolve => {
      ecstatic.start(`${config.tests.visual}/data`, 8000, resolve)

    /* Create and start test runner */
    }).then(() => {
      return new Promise((resolve, reject) => {
        const runner = new SeleniumTestRunner()
        runner.start(err => {
          return err ? reject(err) : resolve(runner)
        })
      })

        /* Setup and run Gemini */
        .then(runner => {
          const gemini = require(
            path.join(process.cwd(), `${config.tests.visual}/config`,
              process.env.CI || process.env.SAUCE
                ? "gemini-sauce.json"
                : "gemini-local.json"))

          /* Start Gemini and return runner upon finish */
          return new Gemini(gemini).test(`${config.tests.visual}/suites`, {
            reporters: [process.env.CI ? "flat" : "html"],
            grep: args.grep ? new RegExp(args.grep, "i") : null,
            browsers: args.browsers ? [].concat(args.browsers) : null
          })

            /* Return runner for graceful stop */
            .then(() => {
              return runner
            })
        })

        /* Stop test runner */
        .then(runner => {
          return new Promise(resolve => {
            runner.stop(resolve)
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

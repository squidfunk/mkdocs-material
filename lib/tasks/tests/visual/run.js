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
import path from "path"
import * as ecstatic from "~/lib/servers/ecstatic"
import * as sauce from "~/lib/servers/sauce-connect"
import * as selenium from "~/lib/servers/selenium"

import Gemini from "gemini"
import SauceLabs from "saucelabs"

/* ----------------------------------------------------------------------------
 * Locals
 * ------------------------------------------------------------------------- */

/* SauceLabs job name */
const id = process.env.TRAVIS
  ? `Travis #${process.env.TRAVIS_BUILD_NUMBER}`
  : `Local #${moniker.choose()}`

/* SauceLabs test results */
const passed = {}

/* ----------------------------------------------------------------------------
 * Task: run visual tests
 * ------------------------------------------------------------------------- */

export default (gulp, config, args) => {
  return done => {

    /* Start static file server */
    let error = false
    new Promise(resolve => {
      ecstatic.start(`${config.tests.visual}/data`, 8000, resolve)

    /* Create and start test runner */
    }).then(() => {
      return new Promise((resolve, reject) => {

        /* Start SauceConnect tunnel */
        if (process.env.CI || process.env.SAUCE) {
          if (!process.env.SAUCE_USERNAME ||
              !process.env.SAUCE_ACCESS_KEY)
            throw new Error(
              "SauceConnect: please provide SAUCE_USERNAME " +
              "and SAUCE_ACCESS_KEY")

          /* Start tunnel, if credentials are given */
          sauce.start(
            id,
            process.env.SAUCE_USERNAME,
            process.env.SAUCE_ACCESS_KEY,
            err => {
              return err ? reject(err) : resolve(sauce)
            })

        /* Start Selenium */
        } else {
          selenium.start(() => resolve(selenium))
        }
      })

        /* Setup and run Gemini */
        .then(runner => {
          const setup = require(
            path.join(process.cwd(), `${config.tests.visual}/config`,
              process.env.CI || process.env.SAUCE
                ? "gemini.sauce-connect.json"
                : "gemini.selenium.json"))

          /* Add dynamic configuration to capabilities */
          for (const key of Object.keys(setup.browsers)) {
            const caps = setup.browsers[key].desiredCapabilities
            caps.tunnelIdentifier = id
            caps.public = "private"
            caps.name = id

            /* Adjust configuration for Travis CI */
            if (process.env.CI && process.env.TRAVIS)
              caps.public = "public"
          }

          /* Setup Gemini and test listeners */
          const gemini = new Gemini(setup)
          if (process.env.CI || process.env.SAUCE) {

            /* Initialize test run */
            gemini.on(gemini.events.START_BROWSER, job => {
              passed[job.sessionId] = true
            })

            /* Update state of test run */
            gemini.on(gemini.events.TEST_RESULT, job => {
              passed[job.sessionId] = passed[job.sessionId] && job.equal
            })
          }

          /* Run tests */
          return gemini.test(`${config.tests.visual}/suites`, {
            reporters: ["flat", "html"],
            browsers: args.browser ? [].concat(args.browser) : null
          })

            /* Return runner for graceful stop */
            .then(status => {
              error = status.failed + status.errored > 0
              return runner
            })
        })

        /* Stop test runner */
        .then(runner => {
          return new Promise(resolve => {
            runner.stop(resolve)
          })
        })

        /* Update SauceLabs jobs with test results */
        .then(() => {
          const saucelabs = new SauceLabs({
            username: process.env.SAUCE_USERNAME,
            password: process.env.SAUCE_ACCESS_KEY
          })
          const updates = Object.keys(passed).map(sessionId => {
            return new Promise(resolve => {
              saucelabs.updateJob(sessionId, {
                passed: passed[sessionId]
              }, resolve)
            })
          })
          return Promise.all(updates)
        })

    /* Stop static file server */
    })
      .then(() => {
        ecstatic.stop(() => {
          return error
            ? done(new Error("Gemini terminated with errors"))
            : done()
        })
      }, err => {
        return done(new Error(err))
      })
  }
}

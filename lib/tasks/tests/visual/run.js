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

import child from "child_process"
import path from "path"
import * as selenium from "~/lib/servers/selenium"

import Gemini from "gemini"

/* ----------------------------------------------------------------------------
 * Task: start test runner
 * ------------------------------------------------------------------------- */

/* MkDocs server */
let server = null

/* ----------------------------------------------------------------------------
 * Task: start test runner
 * ------------------------------------------------------------------------- */

export default (gulp, config) => {
  return () => {

    /* Start MkDocs server */
    return new Promise(resolve => {
      server = child.spawn("mkdocs", [
        "serve", "--dev-addr", "127.0.0.1:8000"
      ], {
        cwd: config.tests.visual,
        stdio: [process.stdin, process.stdout, "pipe"]
      })

      /* Wait for MkDocs server and resolve promise */
      server.stderr.on("data", data => {
        if (data.toString().match("Serving")) {
          server.stderr.removeAllListeners("data")
          resolve()
        }
      })

    /* Start Selenium */
    }).then(() => {
      return new Promise(resolve => {
        selenium.start(() => resolve())

      /* Start Gemini test runner depending on environment */
      }).then(() => {
        const gemini = require(path.join(
          process.cwd(), `${config.tests.visual}/.gemini-local.json`))
        return new Gemini(gemini).test("tests/visual/suites", {
          reporters: ["html"]
        })
      })
        .then(() => {
          selenium.stop()
        })
    })
      .then(() => {
        server.kill()
      })
  }
}

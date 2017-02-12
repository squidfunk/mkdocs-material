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
import through from "through2"
import util from "gulp-util"

/* ----------------------------------------------------------------------------
 * Task: generate visual tests
 * ------------------------------------------------------------------------- */

export default (gulp, config) => {
  const theme = path.resolve(process.cwd(), config.views.build)
  return () => {
    return gulp.src(`${config.tests.visual}/suites/**/mkdocs.yml`)
      .pipe(
        through.obj(function(file, enc, done) {
          if (file.isNull() || file.isStream())
            return done()

          /* Resolve test name and destination */
          const name = path.relative(`${config.tests.visual}/suites`,
            path.dirname(file.path))
          const site = path.resolve(process.cwd(),
            `${config.tests.visual}/data`, name, "_")

          /* Generate test fixtures with freshly built theme */
          const proc = child.spawnSync("mkdocs", [
            "build", "--site-dir", site, "--theme-dir", theme
          ], {
            cwd: path.dirname(file.path)
          })

          /* Emit error, if any */
          if (proc.status)
            this.emit("error", new util.PluginError("mkdocs",
              `Terminated with errors: ${proc.stderr.toString()}`))

          /* Terminate */
          done()
        }))
  }
}

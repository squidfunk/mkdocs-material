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
import through from "through2"
import util from "gulp-util"

import { CLIEngine } from "eslint"

/* ----------------------------------------------------------------------------
 * Locals
 * ------------------------------------------------------------------------- */

const eslint = new CLIEngine
const format = eslint.getFormatter()

/* ----------------------------------------------------------------------------
 * Task: lint JavaScript
 * ------------------------------------------------------------------------- */

export default (gulp, config) => {
  return () => {
    return gulp.src(`${config.assets.src}/javascripts/**/*.{js,jsx}`)

      /* Linting */
      .pipe(
        through.obj(function(file, enc, done) {
          if (file.isNull() || file.isStream())
            return done()

          /* Lint file using .eslintrc */
          file.eslint = eslint.executeOnText(
            file.contents.toString())

          /* Correct file path */
          file.eslint.results[0].filePath =
            path.relative(process.cwd(), file.path)

          /* Push file to next stage */
          this.push(file)
          done()
        }))

      /* Print errors */
      .pipe(
        through.obj(function(file, enc, done) {
          if (file.eslint.errorCount || file.eslint.warningCount) {
            // eslint-disable-next-line no-console
            console.log(format(file.eslint.results))
          }

          /* Push file to next stage */
          this.push(file)
          done()
        }))

      /* Terminate on error */
      .pipe(
        (() => {
          const errors = []

          /* Gather errors */
          return through.obj(function(file, enc, done) {
            const results = file.eslint

            /* Consider warnings as errors */
            if (results.errorCount || results.warningCount)
              errors.push(file)

            /* Push file to next stage */
            this.push(file)
            done()

          /* Format errors and terminate */
          }, function(done) {
            if (errors.length > 0) {
              const message = errors.map(file => {
                return file.relative
              }).join(", ")

              /* Emit error */
              this.emit("error", new util.PluginError("eslint",
                `Terminated with errors in files: ${message}`))
            }
            done()
          })
        })())
  }
}

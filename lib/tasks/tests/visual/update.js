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

import fs from "fs"
import path from "path"
import through from "through2"

/* ----------------------------------------------------------------------------
 * Task: update reference images for visual tests
 * ------------------------------------------------------------------------- */

export default (gulp, config) => {
  return () => {
    const base = path.join(
      process.cwd(), `${config.tests.visual}/config`)

    /* Read Gemini configs and map browsers to screenshot directories */
    const mapping = fs.readdirSync(base)
      .reduce((result, filename) => {
        return Object.assign(result, (gemini => {
          return Object.keys(gemini.browsers)
            .reduce((browsers, name) => {
              browsers[name] = gemini.screenshotsDir
              return browsers
            }, {})
        })(require(path.join(base, filename))))
      }, {})

    /* Prepare filenames */
    const dest = path.join(process.cwd(), `${config.tests.visual}/baseline`)
    return gulp.src("gemini-report/images/**/*~current.png")
      .pipe(
        through.obj(function(file, enc, done) {
          if (file.isNull() || file.isStream())
            return done()

          /* Remove the state from the filename */
          file.path = file.path.replace("~current", "")

          /* Retrieve the folder for the environment of the baseline */
          const folder = path.relative(dest,
            mapping[path.basename(file.path, ".png")])
          file.path = file.path.replace("images", `images/${folder}`)

          /* Push file to next stage */
          this.push(file)
          done()
        }))

      /* Update reference images */
      .pipe(gulp.dest(dest))
  }
}

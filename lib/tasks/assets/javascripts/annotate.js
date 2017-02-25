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

import { transform } from "babel-core"
import jsdoc2flow from "flow-jsdoc"
import through from "through2"

/* ----------------------------------------------------------------------------
 * Task: annotate JavaScript
 * ------------------------------------------------------------------------- */

export default (gulp, config) => {
  return () => {
    return gulp.src(`${config.assets.src}/javascripts/**/*.{js,jsx}`)

      /* Linting */
      .pipe(
        through.obj(function(file, enc, done) {
          if (file.isNull() || file.isStream())
            return done()

          /* Perform Babel transformation to resolve JSX calls */
          const transformed = transform(file.contents.toString(), {
            plugins: [
              ["transform-react-jsx", {
                "pragma": "Jsx.createElement"
              }]
            ]
          })

          /* Annotate contents */
          file.contents = new Buffer(jsdoc2flow(
            `/* @flow */\n\n${transformed.code}`
          ).toString())

          /* Push file to next stage */
          this.push(file)
          done()
        }))

      /* Print errors */
      .pipe(gulp.dest("tmp/assets/javascripts"))
  }
}

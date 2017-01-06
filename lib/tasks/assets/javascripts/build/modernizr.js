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

import concat from "gulp-concat"
import gulpif from "gulp-if"
import modernizr from "gulp-modernizr"
import uglify from "gulp-uglify"
import rev from "gulp-rev"
import version from "gulp-rev-replace"

/* ----------------------------------------------------------------------------
 * Task: build custom modernizr
 * ------------------------------------------------------------------------- */

export default (gulp, config, args) => {
  return () => {
    return gulp.src(`${config.assets.build}/stylesheets/*.css`)

      /* Build custom modernizr */
      .pipe(
        modernizr({
          options: [
            "addTest",                 /* Add custom tests */
            "setClasses"               /* Add CSS classes to root tag */
          ]
        }))
      .pipe(concat("modernizr.js"))

      /* Minify sources */
      .pipe(gulpif(args.optimize, uglify()))

      /* Revisioning */
      .pipe(gulpif(args.revision, rev()))
      .pipe(gulpif(args.revision,
        version({ manifest: gulp.src("manifest.json") })))
      .pipe(gulp.dest(`${config.assets.build}/javascripts`))
      .pipe(gulpif(args.revision,
        rev.manifest("manifest.json", {
          base: config.assets.build,
          merge: true
        })))
      .pipe(gulpif(args.revision, gulp.dest(config.assets.build)))
  }
}

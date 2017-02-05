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

import autoprefixer from "autoprefixer"
import gulpif from "gulp-if"
import mincss from "gulp-cssnano"
import mqpacker from "css-mqpacker"
import postcss from "gulp-postcss"
import pseudoclasses from "postcss-pseudo-classes"
import rev from "gulp-rev"
import sass from "gulp-sass"
import sourcemaps from "gulp-sourcemaps"
import version from "gulp-rev-replace"

/* ----------------------------------------------------------------------------
 * Task: build stylesheets from SASS source
 * ------------------------------------------------------------------------- */

export default (gulp, config, args) => {
  return () => {
    return gulp.src(`${config.assets.src}/stylesheets/*.scss`)
      .pipe(gulpif(args.sourcemaps, sourcemaps.init()))

      /* Compile SASS sources */
      .pipe(
        sass({
          includePaths: [
            "node_modules/modularscale-sass/stylesheets",
            "node_modules/material-design-color",
            "node_modules/material-shadows"
          ]
        }))

      /* Apply PostCSS plugins */
      .pipe(
        postcss([
          autoprefixer(),
          mqpacker
        ].concat(!args.optimize ? [
          pseudoclasses({
            "restrictTo": ["hover", "focus"]
          })
        ] : [])))

      /* Minify sources */
      .pipe(gulpif(args.optimize, mincss()))

      /* Revisioning */
      .pipe(gulpif(args.revision, rev()))
      .pipe(gulpif(args.revision,
        version({ manifest: gulp.src("manifest.json") })))
      .pipe(gulpif(args.sourcemaps, sourcemaps.write()))
      .pipe(gulp.dest(`${config.assets.build}/stylesheets`))
      .pipe(gulpif(args.revision,
        rev.manifest("manifest.json", {
          base: config.assets.build,
          merge: true
        })))
      .pipe(gulpif(args.revision, gulp.dest(config.assets.build)))
  }
}

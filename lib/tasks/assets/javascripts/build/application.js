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

import gulpif from "gulp-if"
import path from "path"
import rev from "gulp-rev"
import stream from "webpack-stream"
import version from "gulp-rev-replace"
import webpack from "webpack"

/* ----------------------------------------------------------------------------
 * Task: build application logic
 * ------------------------------------------------------------------------- */

export default (gulp, config, args) => {
  return () => {
    return gulp.src(`${config.assets.src}/javascripts/**/*.{js,jsx}`)

      /* Build with webpack */
      .pipe(
        stream({
          entry: [

            /* Polyfills */
            "core-js/fn/promise",
            "custom-event-polyfill",
            "whatwg-fetch",

            /* Main entry point */
            "application.js"
          ],
          output: {
            filename: "application.js",
            library: "app",
            libraryTarget: "window"
          },
          module: {

            /* Transpile ES6 to ES5 with Babel */
            rules: [
              {
                loader: "babel-loader",
                test: /\.jsx?$/
              }
            ]
          },
          plugins: [

            /* Don't emit assets that include errors */
            new webpack.NoEmitOnErrorsPlugin(),

            /* Provide JSX helper */
            new webpack.ProvidePlugin({
              Jsx: path.join(process.cwd(), `${config.lib}/providers/jsx.js`)
            })
          ].concat(

            /* Minify sources */
            args.optimize ? [
              new webpack.optimize.UglifyJsPlugin({
                compress: {
                  warnings: false,
                  screw_ie8: true,     // eslint-disable-line camelcase
                  conditionals: true,
                  unused: true,
                  comparisons: true,
                  sequences: true,
                  dead_code: true,     // eslint-disable-line camelcase
                  evaluate: true,
                  if_return: true,     // eslint-disable-line camelcase
                  join_vars: true      // eslint-disable-line camelcase
                },
                output: {
                  comments: false
                }
              })
            ] : []),

          /* Module resolver */
          resolve: {
            modules: [
              "src/assets/javascripts",
              "node_modules"
            ],
            extensions: [
              ".js",
              ".jsx"
            ]
          },

          /* Webpack commandline output */
          stats: {
            colors: true
          },

          /* Sourcemap support */
          devtool: args.sourcemaps ? "inline-source-map" : ""
        }, webpack))

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

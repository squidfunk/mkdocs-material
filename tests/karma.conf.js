/*
 * Copyright (c) 2016 Martin Donath <martin.donath@squidfunk.com>
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

const path = require("path")
const webpack = require("webpack")

/* ----------------------------------------------------------------------------
 * Definition
 * ------------------------------------------------------------------------- */

module.exports = karma => {
  const config = {
    basePath: "../",
    frameworks: ["mocha"],

    /* Include babel polyfill to support older browsers */
    files: [
      "node_modules/babel-polyfill/dist/polyfill.js",
      "tests/unit/*.spec.+(js|jsx)"
    ],

    /* Test reporters */
    reporters: ["spec", "coverage"],

    /* Silence calls to console.log */
    client: {
      captureConsole: false
    },

    /* Preprocess test files */
    preprocessors: {
      "tests/unit/*.spec.+(js|jsx)": ["webpack", "sourcemap"]
    },

    /* Configuration for webpack */
    webpack: {
      module: {

        /* Transpile ES6 to ES5 with Babel */
        loaders: [
          {
            loader: "babel-loader",
            test: /\.jsx?$/
          }
        ]
      },
      plugins: [

        /* Don't emit assets that include errors */
        new webpack.NoErrorsPlugin(),

        /* Provide JSX helper */
        new webpack.ProvidePlugin({
          JSX: path.join(process.cwd(), "lib/providers/jsx.js")
        })
      ],

      /* Module resolver */
      resolve: {
        modulesDirectories: [
          "src/assets/javascripts",
          "node_modules"
        ],
        extensions: [
          "",
          ".js",
          ".jsx"
        ]
      },

      /* Sourcemap support */
      devtool: "inline-source-map"
    },

    /* Suppress messages by webpack */
    webpackServer: {
      noInfo: true
    },

    /* Code coverage */
    coverageReporter: {
      dir: "./coverage",
      reporters: [
        { type: "json" }
      ]
    }
  }

  /* Setup for continuous integration */
  if (process.env.CI) {
    // TODO TBD

  /* Setup for local development environment */
  } else if (process.env.WATCH) {
    delete config.reporters
    delete config.client.captureConsole

  /* Setup for local testing */
  } else {
    config.browsers = ["Chrome"]
    config.singleRun = true
  }

  /* Persist configuration */
  karma.set(config)
}

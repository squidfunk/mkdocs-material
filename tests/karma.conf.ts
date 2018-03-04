/*
 * Copyright (c) 2017 Martin Donath <martin.donath@squidfunk.com>
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

import * as path from "path"

import {
  Config as KarmaConfig,
  ConfigOptions as KarmaConfigOptions
} from "karma"
import {
  Configuration as WebpackConfig,
  NewModule as WebpackNewModule
} from "webpack"

/* ----------------------------------------------------------------------------
 * Plugins
 * ------------------------------------------------------------------------- */

import EventHooksPlugin = require("event-hooks-webpack-plugin")

/* ----------------------------------------------------------------------------
 * Configuration
 * ------------------------------------------------------------------------- */

export default (config: KarmaConfig & KarmaConfigOptions) => {

  /* Webpack configuration */
  const webpack: Partial<WebpackConfig> = {
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /\/node_modules\//
        }
      ]
    },
    resolve: {
      modules: [
        path.resolve(__dirname, "../node_modules")
      ],
      extensions: [".js", ".ts"],
      alias: {
        "~": path.resolve(__dirname, "../src/assets/javascripts"),
        "@mock": path.resolve(__dirname, "mocks")
      }
    },
    plugins: [

      /* Hack: The webpack development middleware sometimes goes into a loop
         on macOS when starting for the first time. This is a quick fix until
         this issue is resolved. See: http://bit.ly/2AsizEn */
      new EventHooksPlugin({
        "watch-run": (compiler: any, done: () => {}) => {
          compiler.startTime += 10000
          done()
        },
        "done": (stats: any) => {
          stats.startTime -= 10000
        }
      })
    ]
  }

  /* Instrumentation for code coverage */
  if (config.singleRun)
    (webpack.module as WebpackNewModule).rules.push({
      test: /\.tsx?$/,
      use: "istanbul-instrumenter-loader?+esModules",
      include: path.resolve(__dirname, "../src"),
      enforce: "post"
    })

  /* Karma configuration */
  config.set({
    basePath: __dirname,

    /* Frameworks to be used */
    frameworks: [
      "jasmine",
      "jasmine-diff",
      "viewport"
    ],

    /* Entrypoint for tests */
    files: [
      "index.ts"
    ],

    /* Preprocessors */
    preprocessors: {
      "index.ts": [
        "webpack",
        "sourcemap"
      ]
    },

    /* Webpack configuration */
    webpack,

    /* Reporters */
    reporters: config.singleRun
      ? ["spec", "coverage-istanbul"]
      : ["spec", "clear-screen"],

    /* Browsers */
    browsers: ["Chrome"],

    /* Configuration for spec reporter */
    specReporter: {
      suppressErrorSummary: true,
      suppressSkipped: !config.singleRun
    },

    /* Configuration for coverage reporter */
    coverageIstanbulReporter: {
      reports: [
        "html",
        "text"
      ]
    },

    /* Hack: Don't serve TypeScript files with "video/mp2t" mime type */
    mime: {
      "text/x-typescript": ["ts"]
    },

    /* Client configuration */
    client: {
      jasmine: {
        random: false
      }
    }
  })
}

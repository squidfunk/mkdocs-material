/*
 * Copyright (c) 2017-2019 Martin Donath <martin.donath@squidfunk.com>
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
import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin"
import { Configuration } from "webpack"

/* ----------------------------------------------------------------------------
 * Helper functions
 * ------------------------------------------------------------------------- */

/**
 * Webpack base configuration
 *
 * @param args - Command-line arguments
 *
 * @return Webpack configuration
 */
function config(args: Configuration): Configuration {
  return {
    mode: args.mode,

    /* Loaders */
    module: {
      rules: [

        /* TypeScript */
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: "ts-loader",
              options: {
                transpileOnly: true,
                compilerOptions: {
                  module: "esnext",
                  removeComments: false
                }
              }
            }
          ],
          exclude: /\/node_modules\//
        },

        /* Preact is only used for its great JSX typings */
        {
          test: /\bpreact\b/,
          use: "null-loader"
        }
      ]
    },

    /* Module resolver */
    resolve: {
      modules: [
        __dirname,
        path.resolve(__dirname, "node_modules")
      ],
      extensions: [".ts", ".tsx", ".js", ".json"],
      plugins: [
        new TsconfigPathsPlugin()
      ]
    },

    /* Source maps */
    devtool: "source-map"
  }
}

/* ----------------------------------------------------------------------------
 * Configuration
 * ------------------------------------------------------------------------- */

/**
 * Webpack configuration
 *
 * @param env - Webpack environment arguments
 * @param args - Command-line arguments
 *
 * @return Webpack configuration
 */
export default (_env: never, args: Configuration): Configuration[] => ([

  /* Application */
  {
    ...config(args),
    entry: "src/assets/javascripts",
    output: {
      path: path.resolve(__dirname, "material/assets/javascripts"),
      filename: "bundle.js",
      libraryTarget: "window"
    }
  },

  /* Search worker */
  {
    ...config(args),
    entry: "src/assets/javascripts/workers/search/main",
    output: {
      path: path.resolve(__dirname, "material/assets/javascripts"),
      filename: "search.js",
      libraryTarget: "var"
    }
  },

  /* Packer worker */
  {
    ...config(args),
    entry: "src/assets/javascripts/workers/packer/main",
    output: {
      path: path.resolve(__dirname, "material/assets/javascripts"),
      filename: "packer.js",
      libraryTarget: "var"
    }
  }
])

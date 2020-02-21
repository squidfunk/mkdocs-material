/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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

import * as CopyPlugin from "copy-webpack-plugin"
import * as EventHooksPlugin from "event-hooks-webpack-plugin"
import * as fs from "fs"
import { minify as minhtml } from "html-minifier"
import * as path from "path"
import { toPairs } from "ramda"
import { minify as minjs } from "terser"
import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin"
import { Configuration } from "webpack"
import * as AssetsManifestPlugin from "webpack-assets-manifest"

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
  const assets = {}
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
                experimentalWatchApi: true,
                transpileOnly: true,
                compilerOptions: {
                  importHelpers: true,
                  module: "esnext",
                  removeComments: false
                }
              }
            }
          ],
          exclude: /\/node_modules\//
        },

        /* SASS stylesheets */
        {
          test: /\.scss$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: `[name]${
                  args.mode === "production" ? ".[md5:hash:hex:8].min" : ""
                }.css`,
                outputPath: "assets/stylesheets",
                publicPath: path.resolve(__dirname, "material")
              }
            },
            "extract-loader",
            {
              loader: "css-loader",
              options: {
                url: false,
                sourceMap: args.mode !== "production"
              }
            },
            {
              loader: "postcss-loader",
              options: {
                ident: "postcss",
                plugins: () => [
                  require("autoprefixer")(),
                  require("css-mqpacker")
                ],
                sourceMap: args.mode !== "production"
              }
            },
            {
              loader: "sass-loader",
              options: {
                implementation: require("sass"),
                sassOptions: {
                  includePaths: [
                    "node_modules/modularscale-sass/stylesheets",
                    "node_modules/material-design-color",
                    "node_modules/material-shadows"
                  ]
                },
                sourceMap: args.mode !== "production"
              }
            }
          ]
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

    /* Plugins */
    plugins: [
      new AssetsManifestPlugin({
        output: "assets/manifest.json",
        assets
      })
    ],

    /* Source maps */
    devtool: "source-map",

    /* Filter false positives and omit verbosity */
    stats: {
      entrypoints: false,
      excludeAssets: [
        /.fontawesome/,
        /\/(fonts|images|lunr)\//,
        /\.(html|py|yml)$/
      ],
      warningsFilter: [
        /export '.*' was not found in/
      ]
    }
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
 * @return Webpack configurations
 */
export default (_env: never, args: Configuration): Configuration[] => {
  const hash = args.mode === "production" ? ".[chunkhash].min" : ""
  const base = config(args)
  return [

    /* Application */
    {
      ...base,
      entry: {
        "assets/javascripts/bundle": "src/assets/javascripts"
      },
      output: {
        path: path.resolve(__dirname, "material"),
        filename: `[name]${hash}.js`,
        hashDigestLength: 8,
        libraryTarget: "window"
      },

      /* Plugins */
      plugins: [
        ...base.plugins,

        /* Copy FontAwesome SVGs to dot directory, so MkDocs ignores them */
        new CopyPlugin([
          { to: ".fontawesome", from: "**/*.svg" },
          { to: ".fontawesome", from: "../LICENSE.txt" }
        ], {
          context: "node_modules/@fortawesome/fontawesome-free/svgs"
        }),

        /* Copy search stemmers and segmenters */
        new CopyPlugin([
          { to: "assets/javascripts/lunr", from: "min/*.js" },
          {
            to: "assets/javascripts/lunr/tinyseg.min.js",
            from: "tinyseg.js",
            transform: content => minjs(`${content}`).code!
          }
        ], {
          context: "node_modules/lunr-languages"
        }),

        /* Copy assets like fonts and images */
        new CopyPlugin([
          { from: "assets/fonts/**/*.!(css)" },
          { from: "assets/images/*.{ico,png,svg}" },
          { from: "**/*.{py,yml}" },

          /* Copy and minify HTML */
          {
            from: "**/*.html",
            transform: content => {
              const metadata = require("./package.json")
              const banner =
                "{#-\n" +
                "  This file was automatically generated - do not edit\n" +
                "-#}\n"
              return banner + minhtml(content.toString(), {
                collapseBooleanAttributes: true,
                includeAutoGeneratedTags: false,
                minifyCSS: true,
                minifyJS: true,
                removeComments: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true
              })

                /* Remove empty lines without collapsing everything */
                .replace(/^\s*[\r\n]/gm, "")

                /* Write theme version into template */
                .replace("$md-name$", metadata.name)
                .replace("$md-version$", metadata.version)
            }
          }
        ], {
          context: "src"
        }),

        /* Replace assets in base template */
        new EventHooksPlugin({
          afterEmit: () => {
            const manifest = require("./material/assets/manifest.json")
            const template = toPairs<string>(manifest)
              .reduce((content, [from, to]) => {
                return content.replace(from, to)
              }, fs.readFileSync("material/base.html", "utf8"))

            /* Save template with replaced assets */
            fs.writeFileSync("material/base.html", template, "utf8")
          }
        })
      ]
    },

    /* Search worker */
    {
      ...base,
      entry: {
        "assets/javascripts/worker/search":
          "src/assets/javascripts/workers/search/main"
      },
      output: {
        path: path.resolve(__dirname, "material"),
        filename: `[name]${hash}.js`,
        hashDigestLength: 8,
        libraryTarget: "var"
      }
    }
  ]
}

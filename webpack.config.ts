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
import IgnoreEmitPlugin from "ignore-emit-webpack-plugin"
import ImageminPlugin from "imagemin-webpack-plugin"
import MiniCssExtractPlugin = require("mini-css-extract-plugin")
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
                  module: "esnext"
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
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                url: false,
                sourceMap: true
              }
            },
            {
              loader: "postcss-loader",
              options: {
                ident: "postcss",
                plugins: () => [
                  require("autoprefixer")(),
                  require("postcss-inline-svg")({
                    paths: [
                      path.resolve(__dirname, "node_modules")
                    ],
                    encode: false
                  }),
                  require("postcss-svgo")({
                    plugins: [
                      { removeDimensions: true },
                      { removeViewBox: false }
                    ],
                    encode: false
                  })
                ],
                sourceMap: true
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
                sourceMap: true
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
      new IgnoreEmitPlugin(/\/stylesheets\/.*?\.js/),
      new AssetsManifestPlugin({
        output: "assets/manifest.json",
        assets
      })
    ],

    /* Source maps */
    devtool: args.mode === "production" ? "source-map" : "eval",

    /* Filter false positives and omit verbosity */
    stats: {
      entrypoints: false,
      excludeAssets: [
        /\.(icons)/,
        /\/(images|lunr)\//,
        /\.(html|py|yml)$/
      ],
      warningsFilter: [
        /export '.[^']+' was not found in/
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
        "assets/javascripts/bundle":  "src/assets/javascripts",
        "assets/stylesheets/main":    "src/assets/stylesheets/main.scss",
        "assets/stylesheets/palette": "src/assets/stylesheets/palette.scss"
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

        /* Stylesheets */
        new MiniCssExtractPlugin({
          filename: `[name]${hash}.css`
        }),

        /* Improve performance by skipping dependencies in watch mode */
        ...args.watch ? [] : [

          /* FontAwesome icons */
          new CopyPlugin({
            patterns: [
              { to: ".icons/fontawesome", from: "**/*.svg" },
              { to: ".icons/fontawesome", from: "../LICENSE.txt" }
            ].map(pattern => ({
              context: "node_modules/@fortawesome/fontawesome-free/svgs",
              ...pattern
            }))
          }),

          /* Material Design icons */
          new CopyPlugin({
            patterns: [
              { to: ".icons/material", from: "*.svg" }
            ].map(pattern => ({
              context: "node_modules/@mdi/svg/svg",
              ...pattern
            }))
          }),

          /* GitHub octicons */
          new CopyPlugin({
            patterns: [
              { to: ".icons/octicons", from: "*.svg" },
              { to: ".icons/octicons", from: "../../LICENSE" }
            ].map(pattern => ({
              context: "node_modules/@primer/octicons/build/svg",
              ...pattern
            }))
          }),

          /* Search stemmers and segmenters */
          new CopyPlugin({
            patterns: [
              { to: "assets/javascripts/lunr", from: "min/*.js" },
              {
                to: "assets/javascripts/lunr/tinyseg.min.js",
                from: "tinyseg.js",
                transform: (content: Buffer) => minjs(`${content}`).code!
              }
            ].map(pattern => ({
              context: "node_modules/lunr-languages",
              ...pattern
            }))
          }),

          /* Assets and configuration */
          new CopyPlugin({
            patterns: [
              { from: ".icons/*.svg" },
              { from: "assets/images/*" },
              { from: "**/*.{py,yml}" }
            ].map(pattern => ({
              context: "src",
              ...pattern
            }))
          })
        ],

        /* Template files */
        new CopyPlugin({
          patterns: [
            {
              from: "**/*.html",
              transform: (content: Buffer) => {
                const metadata = require("./package.json")
                const banner =
                  "{#-\n" +
                  "  This file was automatically generated - do not edit\n" +
                  "-#}\n"

                /* Normalize line feeds and minify HTML */
                const html = content.toString().replace(/\r\n/gm, "\n")
                return banner + minhtml(html, {
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
          ].map(pattern => ({
            context: "src",
            ...pattern
          }))
        }),

        /* Hooks */
        new EventHooksPlugin({
          afterEmit: () => {

            /* Replace asset URLs in base template */
            if (args.mode === "production") {
              const manifest = require("./material/assets/manifest.json")
              const template = toPairs<string>(manifest)
                .reduce((content, [from, to]) => {
                  return content.replace(new RegExp(from, "g"), to)
                }, fs.readFileSync("material/base.html", "utf8"))

              /* Save template with replaced assets */
              fs.writeFileSync("material/base.html", template, "utf8")
            }
          }
        }),

        /* Minify SVGs */
        new ImageminPlugin({
          svgo: {
            plugins: [
              { removeDimensions: true },
              { removeViewBox: false }
            ]
          }
        })
      ],

      /* Optimizations */
      optimization: {
        splitChunks: {
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: "assets/javascripts/vendor",
              chunks: "all"
            }
          }
        }
      }
    },

    /* Search worker */
    {
      ...base,
      entry: {
        "assets/javascripts/worker/search":
          "src/assets/javascripts/integrations/search/worker/main"
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

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

const path = require("path")
const webpack = require("webpack")

const CopyPlugin = require("copy-webpack-plugin")
const EventHooksPlugin = require("event-hooks-webpack-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const HtmlMinifierPlugin = require("html-minifier-webpack-plugin")
const ImageminPlugin = require("imagemin-webpack-plugin").default
const ManifestPlugin = require("webpack-manifest-plugin")

/* ----------------------------------------------------------------------------
 * Configuration
 * ------------------------------------------------------------------------- */

module.exports = env => {
  const config = {

    /* Entrypoints */
    entry: {
      application: path.resolve(
        __dirname, "src/assets/javascripts/application.js"
      ),
      modernizr: path.resolve(
        __dirname, "src/assets/javascripts/modernizr.js"
      )
    },

    /* Polyfills */
    // "core-js/fn/promise",
    // "custom-event-polyfill",
    // "whatwg-fetch",

    /* Main entry point */
    //   path.resolve(__dirname, "src/assets/javascripts/application.js"),
    //   path.resolve(__dirname, "src/assets/javascripts/modernizr.js")
    // ],

    /* Loaders */
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          use: "babel-loader",
          exclude: /\/node_modules\//
        },
        {
          test: /\.modernizr-autorc$/,
          use: "modernizr-auto-loader"
        },
        {
          test: /\.svg$/,
          use:
            "file-loader?name=[path][name].[md5:hash:hex:8].[ext]&context=./src"
        }
      ]
    },

    /* Output */
    output: {
      path: path.resolve(__dirname, "material"),
      pathinfo: true,
      filename: "assets/javascripts/[name].[chunkhash].js",
      hashDigestLength: 8,
      library: "app",
      libraryTarget: "window"
    },

    /* Plugins */
    plugins: [

      /* Combine all dependencies into a single file */
      new webpack.optimize.CommonsChunkPlugin({
        name: "src/assets/javascripts/modernizr.js",
        chunks: [".modernizr-autorc"]
      }),

      /* Provide JSX helper */
      new webpack.ProvidePlugin({
        Jsx: path.resolve(__dirname, "lib/providers/jsx.js")
      }),

      /* Copy templates and configuration files */
      new CopyPlugin([
        { context: "src", from: "assets/images/*.{ico,png}" },
        { context: "src", from: "**/*.{py,html,yml}" },
        { context: "src", from: "partials/*.html" }                             // TODO: new HtmlWebpackHarddiskPlugin()
      ]),

      /* Minify images */
      new ImageminPlugin({
        test: /\.(jpg|png|gif|svg)$/i
      }),

      /* Hack: The webpack development middleware sometimes goes into a loop on
         macOS when starting for the first time. This is a quick fix until
         this issue is resolved. See: http://bit.ly/2AsizEn */
      new EventHooksPlugin({
        "watch-run": (compiler, cb) => {
          compiler.startTime += 10000
          cb()
        },
        "done": stats => {
          stats.startTime -= 10000
        }
      })
    ],

    /* Module resolver */
    resolve: {
      modules: [
        path.resolve(__dirname, "node_modules")
      ],
      extensions: [".js", ".jsx", ".scss"],
      alias: {
        modernizr$: path.resolve(__dirname, ".modernizr-autorc")
      }
    }
  }

  /* Extract styles */
  const styles = {
    "application.scss": new ExtractTextPlugin(
      "assets/stylesheets/application.scss"
    ),
    "application.palette.scss": new ExtractTextPlugin(
      "assets/stylesheets/application.palette.scss"
    )
  }

  /* Compile stylesheets */
  Object.keys(styles).forEach(stylesheet => {
    config.plugins.push(styles[stylesheet])
    config.module.rules.push({
      test: new RegExp(`${stylesheet}$`),
      use: styles[stylesheet].extract({
        use: [
          {
            loader: "css-loader",
            options: {
              minimize: env && env.prod
            }
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: () => [
                require("autoprefixer")(),
                require("css-mqpacker")
              ]
            }
          },
          {
            loader: "sass-loader",
            options: {
              includePaths: [
                "node_modules/modularscale-sass/stylesheets",
                "node_modules/material-design-color",
                "node_modules/material-shadows"
              ]
            }
          }
        ]
      })
    })
  })

  /* Build for production environment */
  if (env && env.prod) {

    /* Beautify sources */
    config.plugins.push(
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
      }))

    /* Minify HTML */
    config.plugins.push(
      new HtmlMinifierPlugin({
        collapseBooleanAttributes: true,
        customAttrCollapse: /(content)/,
        includeAutoGeneratedTags: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
      }))

    /* Manifest and revisions */
    config.plugins.push(
      new ManifestPlugin()
    )
  }

  /* We're good to go */
  return config
}

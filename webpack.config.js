/*
 * Copyright (c) 2016-2018 Martin Donath <martin.donath@squidfunk.com>
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

const fs = require("fs")
const cssmin = require("cssmin")
const path = require("path")
const html = require("html-minifier")
const uglify = require("uglify-js")
const webpack = require("webpack")

/* ----------------------------------------------------------------------------
 * Plugins
 * ------------------------------------------------------------------------- */

const CopyPlugin = require("copy-webpack-plugin")
const EventHooksPlugin = require("event-hooks-webpack-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const ImageminPlugin = require("imagemin-webpack-plugin").default
const ManifestPlugin = require("webpack-manifest-plugin")

/* ----------------------------------------------------------------------------
 * Configuration
 * ------------------------------------------------------------------------- */

module.exports = env => { // eslint-disable-line complexity
  const config = {

    /* Entrypoints */
    entry: {

      /* Custom Modernizr build */
      "assets/javascripts/modernizr": path.resolve(
        __dirname, "src/assets/javascripts/modernizr.js"
      ),

      /* Application */
      "assets/javascripts/application": path.resolve(
        __dirname, "src/assets/javascripts/application.js"
      )
    },

    /* Loaders */
    module: {
      rules: [

        /* Babel ES6 transformations */
        {
          test: /\.jsx?$/,
          use: "babel-loader",
          exclude: /\/node_modules\//
        },

        /* Custom Modernizr build */
        {
          test: /\.modernizr-autorc$/,
          use: "modernizr-auto-loader"
        },

        /* Cache busting for SVGs */
        {
          test: /\.svg$/,
          use: `file-loader?name=[path][name]${
            env && env.prod ? ".[md5:hash:hex:8]" : ""
          }.[ext]&context=./src`
        }
      ]
    },

    /* Output */
    output: {
      path: path.resolve(__dirname, "material"),
      filename: `[name]${env && env.prod ? ".[chunkhash]" : ""}.js`,
      hashDigestLength: 8,
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
        JSX: path.resolve(__dirname, "src/assets/javascripts/providers/jsx.js")
      }),

      /* Copy and transform static assets */
      new CopyPlugin([

        /* Copy search language support files - we could define the languages
           package as entrypoints, but this leads to a lot of problems because
           the files have the structure lunr.[language].js, which some Webpack
           plugins will complain about. For this reason we only minify */
        {
          context: path.resolve(__dirname, "node_modules/lunr-languages"),
          to: "assets/javascripts/lunr",
          from: "*.js",
          transform: content => {
            return uglify.minify(content.toString()).code
          }
        },

        /* Copy web font files */
        {
          context: "src",
          from: "assets/fonts/**/*",
          ignore: "**/*.css"
        },

        /* Copy and minify web font stylesheets */
        {
          context: "src",
          from: "assets/fonts/*.css",
          transform: content => cssmin(content.toString())
        },

        /* Copy images without cache busting */
        {
          context: "src",
          from: "assets/images/*.{ico,png}"
        },

        /* Copy configuration */
        {
          context: "src",
          from: "**/*.{py,yml}"
        },

        /* Copy and minify HTML */
        {
          context: "src",
          from: "**/*.html",
          transform: content => {
            const metadata = require(path.resolve(__dirname, "package.json"))
            return html.minify(content.toString(), {
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

              /* Write available search languages into template */
              .replace("$md-lunr-languages$",
                fs.readdirSync(
                  path.resolve(__dirname, "node_modules/lunr-languages")
                ).reduce((files, file) => {
                  const matches = file.match(/lunr.(\w{2}).js$/)
                  if (matches) {
                    const [, language] = matches
                    files.push(`"${language}"`)
                  }
                  return files
                }, [])
                  .join(", "))
          }
        }
      ]),

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
    },

    /* Sourcemaps */
    devtool: !env || env.prod ? "inline-source-map" : ""
  }

  /* Compile stylesheets */
  for (const stylesheet of [
    "application.scss",
    "application-palette.scss"
  ]) {
    const plugin = new ExtractTextPlugin(
      `assets/stylesheets/${
        stylesheet.replace(".scss",
          env && env.prod ? ".[md5:contenthash:hex:8]" : ""
        )}.css`)

    /* Register plugin */
    config.plugins.push(plugin)
    config.module.rules.push({
      test: new RegExp(`${stylesheet}$`),
      use: plugin.extract({
        use: [
          {
            loader: "css-loader",
            options: {
              minimize: env && env.prod,
              sourceMap: !(env && env.prod)
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
              sourceMap: !(env && env.prod)
            }
          },
          {
            loader: "sass-loader",
            options: {
              includePaths: [
                "node_modules/modularscale-sass/stylesheets",
                "node_modules/material-design-color",
                "node_modules/material-shadows"
              ],
              sourceMap: !(env && env.prod),
              sourceMapContents: true
            }
          }
        ]
      })
    })
  }

  /* Production compilation */
  if (env && env.prod) {
    config.plugins.push(

      /* Uglify sources */
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
      }),

      /* Minify images */
      new ImageminPlugin({
        test: /\.(ico|png|svg)$/i,
        svgo: null
        // Hack: Temporarily disabled, as SVGO removes the viewbox property
        // and setting the plugin to false doesn't have any effect.
        // {
        //   plugins: [
        //     {
        //       cleanupIDs: false,
        //       removeViewBox: false
        //     }
        //   ]
        // }
      }),

      /* Write manifest */
      new ManifestPlugin({

        /* This is an ugly workaround for the fact that the manifest plugin
           doesn't handle multiple chunks. See http://bit.ly/2BbfER9 */
        map(file) {
          file.name = file.path.replace(/\.[a-z0-9].+\.(css|js|svg)/i, ".$1")
          return file
        }
      }),

      /* Apply manifest */
      new EventHooksPlugin({
        "after-emit": (compilation, cb) => {
          const manifest = require(path.resolve("material/manifest.json"))
          Object.keys(compilation.assets).forEach(name => {
            if (name.match(/\.html/)) {
              const asset = compilation.assets[name]
              const replaced = Object.keys(manifest).reduce((source, key) => {
                return source.replace(key, manifest[key])
              }, asset.source())
              fs.writeFileSync(asset.existsAt, replaced)
            }
          })
          cb()
        }
      })
    )
  }

  /* Oh my god, that was a hell of a setup */
  return config
}

/*
 * Copyright (c) 2016-2022 Martin Donath <martin.donath@squidfunk.com>
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

import { createHash } from "crypto"
import { build as esbuild } from "esbuild"
import * as fs from "fs/promises"
import * as path from "path"
import postcss, { Plugin, Rule } from "postcss"
import {
  EMPTY,
  Observable,
  catchError,
  concat,
  defer,
  endWith,
  ignoreElements,
  merge,
  of,
  switchMap
} from "rxjs"
import { compile } from "sass"

import { base, mkdir, write } from "../_"

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Transform options
 */
interface TransformOptions {
  from: string                         /* Source destination */
  to: string                           /* Target destination */
}

/* ----------------------------------------------------------------------------
 * Data
 * ------------------------------------------------------------------------- */

/**
 * Base directory for source map resolution
 */
const root = new RegExp(`file://${path.resolve(".")}/`, "g")

/* ----------------------------------------------------------------------------
 * Helper functions
 * ------------------------------------------------------------------------- */

/**
 * Compute a digest for cachebusting a file
 *
 * @param file - File
 * @param data - File data
 *
 * @returns File with digest
 */
function digest(file: string, data: string): string {
  if (process.argv.includes("--optimize")) {
    const hash = createHash("sha256").update(data).digest("hex")
    return file.replace(/\b(?=\.)/, `.${hash.slice(0, 8)}.min`)
  } else {
    return file
  }
}

/**
 * Custom PostCSS plugin to polyfill newer CSS features
 *
 * @returns PostCSS plugin
 */
function plugin(): Plugin {
  const rules = new Set<Rule>()
  return {
    postcssPlugin: 'mkdocs-material',
    Root (root) {

      /* Fallback for :is() */
      root.walkRules(/:is\(/, rule => {
        if (!rules.has(rule)) {
          rules.add(rule)

          /* Add prefixed versions */
          for (const pseudo of [":-webkit-any(", ":-moz-any("])
            rule.cloneBefore({
              selectors: rule.selectors.map(selector => (
                selector.replace(/:is\(/g, pseudo)
              ))
            })
        }
      })
    }
  }
}
plugin.postcss = true

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Transform a stylesheet
 *
 * @param options - Options
 *
 * @returns File observable
 */
export function transformStyle(
  options: TransformOptions
): Observable<string> {
  return defer(() => of(compile(options.from, {
    loadPaths: [
      "src/assets/stylesheets",
      "node_modules/modularscale-sass/stylesheets",
      "node_modules/material-design-color",
      "node_modules/material-shadows"
    ],
    sourceMap: true
  })))
    .pipe(
      switchMap(({ css, sourceMap }) => postcss([
        require("autoprefixer"),
        require("postcss-logical"),
        require("postcss-dir-pseudo-class"),
        plugin,
        require("postcss-inline-svg")({
          paths: [
            `${base}/.icons`
          ],
          encode: false
        }),
        ...process.argv.includes("--optimize")
          ? [require("cssnano")]
          : []
      ])
        .process(css, {
          from: options.from,
          to: options.to,
          map: {
            prev: sourceMap,
            inline: false
          }
        })
      ),
      catchError(err => {
        console.log(err.formatted || err.message)
        return EMPTY
      }),
      switchMap(({ css, map }) => {
        const file = digest(options.to, css)
        return concat(
          mkdir(path.dirname(file)),
          merge(
            write(`${file}.map`, `${map}`.replace(root, "")),
            write(`${file}`, css.replace(
              options.from,
              path.basename(file)
            )),
          )
        )
          .pipe(
            ignoreElements(),
            endWith(file)
          )
      })
    )
}

/**
 * Transform a script
 *
 * @param options - Options
 *
 * @returns File observable
 */
export function transformScript(
  options: TransformOptions
): Observable<string> {
  return defer(() => esbuild({
    entryPoints: [options.from],
    target: "es2015",
    write: false,
    bundle: true,
    sourcemap: true,
    sourceRoot: "../../../..",
    legalComments: "inline",
    minify: process.argv.includes("--optimize"),
    plugins: [

      /* Plugin to minify inlined CSS (e.g. for Mermaid.js) */
      {
        name: "mkdocs-material/inline",
        setup(build) {
          build.onLoad({ filter: /\.css/ }, async args => {
            const content = await fs.readFile(args.path, "utf8")
            const { css } = await postcss([require("cssnano")])
              .process(content, {
                from: undefined
              })

            /* Return minified CSS */
            return {
              contents: css,
              loader: "text"
            }
          })
        }
      }
    ]
  }))
    .pipe(
      catchError(() => EMPTY),
      switchMap(({ outputFiles: [file] }) => {
        const contents = file.text.split("\n")
        const [, data] = contents[contents.length - 2].split(",")
        return of({
          js:  file.text,
          map: Buffer.from(data, "base64")
        })
      }),
      switchMap(({ js, map }) => {
        const file = digest(options.to, js)
        return concat(
          mkdir(path.dirname(file)),
          merge(
            write(`${file}.map`, `${map}`),
            write(`${file}`, js.replace(
              /(sourceMappingURL=)(.*)/,
              `$1${path.basename(file)}.map\n`
            )),
          )
        )
          .pipe(
            ignoreElements(),
            endWith(file)
          )
      })
    )
}

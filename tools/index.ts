/*
 * Copyright (c) 2016-2021 Martin Donath <martin.donath@squidfunk.com>
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

// import { build } from "esbuild"
import * as fs from "fs/promises"
import { minify as minhtml } from "html-minifier"
import * as path from "path"
import { concat, from } from "rxjs"
import {
  finalize,
  mapTo,
  mergeMap,
  switchMap
} from "rxjs/operators"
import glob from "tiny-glob"

/* ----------------------------------------------------------------------------
 * Data
 * ------------------------------------------------------------------------- */

/**
 * Base directory
 */
const base = "material2"

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Transform function
 *
 * @param content - Content
 *
 * @returns Promise resolving with transformed content
 */
type TransformFn = (content: string) => Promise<string>

/* ------------------------------------------------------------------------- */

/**
 * Copy options
 */
interface CopyOptions {
  source: string                       /* Source destination */
  target: string                       /* Target destination */
  transform?: TransformFn              /* Transform function */
}

/* ----------------------------------------------------------------------------
 * Helper functions
 * ------------------------------------------------------------------------- */

/**
 * Recursively create the given directory
 *
 * @param directory - Directory
 *
 * @returns Directory observable
 */
function mkdir(directory: string) {
  return from(fs.mkdir(directory, { recursive: true }))
    .pipe(
      mapTo(directory)
    )
}

/**
 * Copy a file from source to target
 *
 * @param options - Options
 *
 * @returns File observable
 */
function copy({ source, target, transform }: CopyOptions) {
  return mkdir(path.dirname(target))
    .pipe(
      switchMap(() => typeof transform === "undefined"
        ? from(fs.copyFile(source, target))
        : from(fs.readFile(source, "utf8"))
            .pipe(
              switchMap(transform),
              switchMap(content => fs.writeFile(target, content))
            )
      ),
      mapTo(target)
    )
}

/**
 * Resolve a pattern and copy all files to target
 *
 * Note that this function will rebase all files that match the pattern to the
 * target folder, even if the pattern resolves to a parent folder.
 *
 * @param pattern - Pattern
 * @param options - Options
 *
 * @returns File observable
 */
function copyAll(pattern: string, options: CopyOptions) {
  return from(glob(pattern, { cwd: options.source }))
    .pipe(
      switchMap(from),
      mergeMap(file => copy({
        ...options,
        source: `${options.source}/${file}`,
        target: `${options.target}/${file.replace(/(\.{2}\/)+/, "")}`,
      }), 16)
    )
}

/* ----------------------------------------------------------------------------
 * Program
 * ------------------------------------------------------------------------- */

const icons$ = concat(

  /* Copy Material Design icons */
  ...["*.svg", "../LICENSE"]
    .map(pattern => copyAll(pattern, {
      source: "node_modules/@mdi/svg/svg",
      target: `${base}/.icons/material`
    })),

  /* Copy GitHub octicons */
  ...["*.svg", "../../LICENSE"]
    .map(pattern => copyAll(pattern, {
      source: "node_modules/@primer/octicons/build/svg",
      target: `${base}/.icons/octicons`
    })),

  /* Copy FontAwesome icons */
  ...["**/*.svg", "../LICENSE.txt"]
    .map(pattern => copyAll(pattern, {
      source: "node_modules/@fortawesome/fontawesome-free/svgs",
      target: `${base}/.icons/fontawesome`
    }))
)

const assets$ = concat(
  icons$,

  /* Copy search stemmers and segmenter */
  ...["min/*.js", "tinyseg.js"]
    .map(pattern => copyAll(pattern, {
      source: "node_modules/lunr-languages",
      target: `${base}/assets/javascripts/lunr`
    })),

  /* Copy assets and configuration */
  ...[".icons/*.svg", "assets/images/*", "**/*.{py,yml}"]
    .map(pattern => copyAll(pattern, {
      source: "src",
      target: base
    })),

  /* Template files */
  ...["**/*.html"]
    .map(pattern => copyAll(pattern, {
      source: "src",
      target: base,
      transform: async content => {
        const metadata = require("../package.json")
        const banner =
          "{#-\n" +
          "  This file was automatically generated - do not edit\n" +
          "-#}\n"

        /* Normalize line feeds and minify HTML */
        const html = content.replace(/\r\n/gm, "\n")
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
    }))
)

console.time("a")

assets$
  .pipe(
    finalize(() => console.timeEnd("a"))
  )
    .subscribe()
    // .subscribe(console.log)

// async function main() {
//   console.time("build")
//   const res = await build({
//     bundle: true,
//     sourceMap: true,
//     entryPoints: [
//       "src/assets/javascripts/index.ts"
//     ],
//     outdir: "material2"
//   })
//   console.timeEnd("build")
//   console.log(res)
// }

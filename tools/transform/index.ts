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

import * as fs from "fs/promises"
import * as path from "path"
import postcss from "postcss"
import { Observable, defer, merge } from "rxjs"
import {
  endWith,
  ignoreElements,
  switchMap,
  tap
} from "rxjs/operators"
import { render as sass } from "sass"
import { promisify } from "util"

import { base, mkdir } from "../resolve"

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Transform options
 */
interface TransformOptions {
  src: string                          /* Source file */
  out: string                          /* Target file */
  optimize?: boolean                   /* Optimize assets */
}

/* ----------------------------------------------------------------------------
 * Data
 * ------------------------------------------------------------------------- */

/**
 * Base directory for source maps
 */
const root = new RegExp(`file://${path.resolve(".")}/`, "g")

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
  { src, out, optimize }: TransformOptions
): Observable<string> {
  return defer(() => promisify(sass)({
    file: src,
    includePaths: [
      "src/assets/stylesheets",
      "node_modules/modularscale-sass/stylesheets",
      "node_modules/material-design-color",
      "node_modules/material-shadows"
    ],
    sourceMap: true,
    sourceMapRoot: ".",
    outFile: out
  }))
    .pipe(
      switchMap(({ css, map }) => postcss([
        require("autoprefixer"),
        require("postcss-inline-svg")({
          paths: [
            `${base}/.icons`
          ],
          encode: false
        }),
        ...optimize ? [require("cssnano")] : []
      ])
        .process(css, {
          from: src,
          to: out,
          map: {
            prev: `${map}`.replace(root, ""),
            inline: false
          }
        })
      ),
      tap(() => mkdir(path.dirname(out))),
      switchMap(({ css, map }) => merge(
        fs.writeFile(`${out}`, css),
        fs.writeFile(`${out}.map`, map.toString())
      )),
      ignoreElements(),
      endWith(out)
    )
}

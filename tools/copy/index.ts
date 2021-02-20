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
import { Observable, from } from "rxjs"
import { mapTo, mergeMap, switchMap } from "rxjs/operators"

import { mkdir, resolve } from "../resolve"

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Copy transform function
 *
 * @param content - Content
 *
 * @returns Transformed content
 */
type CopyTransformFn = (content: string) => Promise<string>

/* ------------------------------------------------------------------------- */

/**
 * Copy options
 */
interface CopyOptions {
  src: string                          /* Source file */
  out: string                          /* Target file */
  fn?: CopyTransformFn                 /* Transform function */
}

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Copy a file
 *
 * @param options - Options
 *
 * @returns File observable
 */
export function copy(
  { src, out, fn }: CopyOptions
): Observable<string> {
  return mkdir(path.dirname(out))
    .pipe(
      switchMap(() => typeof fn === "undefined"
        ? from(fs.copyFile(src, out))
        : from(fs.readFile(src, "utf8"))
            .pipe(
              switchMap(content => fn(content)),
              switchMap(content => fs.writeFile(out, content))
            )
      ),
      mapTo(out)
    )
}

/**
 * Copy all files matching the given pattern
 *
 * Note that this function will rebase all files that match the pattern to the
 * target folder, even if the pattern resolves to a parent folder.
 *
 * @param pattern - Pattern
 * @param options - Options
 *
 * @returns File observable
 */
export function copyAll(
  pattern: string, options: CopyOptions
): Observable<string> {
  return resolve(pattern, { cwd: options.src })
    .pipe(
      mergeMap(file => copy({
        ...options,
        src: `${options.src}/${file}`,
        out: `${options.out}/${file.replace(/(\.{2}\/)+/, "")}`
      }), 16)
    )
}

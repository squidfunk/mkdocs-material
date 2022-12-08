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

import * as fs from "fs/promises"
import * as path from "path"
import {
  Observable,
  from,
  map,
  mergeMap,
  switchMap
} from "rxjs"

import { mkdir, read, resolve, write } from "../_"

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Copy transform function
 *
 * @param data - File data
 * @param name - File name
 *
 * @returns Transformed file data
 */
type CopyTransformFn = (data: string, name: string) => Promise<string>

/* ------------------------------------------------------------------------- */

/**
 * Copy options
 */
interface CopyOptions {
  from: string                         /* Source destination */
  to: string                           /* Target destination */
  transform?: CopyTransformFn          /* Transform function */
  watch?: boolean                      /* Watch mode */
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
  { transform, ...options }: CopyOptions
): Observable<string> {
  return mkdir(path.dirname(options.to))
    .pipe(
      switchMap(() => typeof transform === "undefined"
        ? from(fs.copyFile(options.from, options.to))
        : read(options.from)
            .pipe(
              switchMap(data => transform(data, options.from)),
              switchMap(data => write(options.to, data))
            )
      ),
      map(() => options.to)
    )
}

/**
 * Copy all files matching the given pattern
 *
 * Note that this function rebases all files that match the pattern to the
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
  return resolve(pattern, { ...options, cwd: options.from })
    .pipe(
      mergeMap(file => copy({
        ...options,
        from: `${options.from}/${file}`,
        to:   `${options.to}/${file.replace(/(\.{2}\/)+/, "")}`
      }), 16)
    )
}

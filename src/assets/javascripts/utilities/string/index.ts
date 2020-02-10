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

import { getElement } from "../agent"

/* ----------------------------------------------------------------------------
 * Data
 * ------------------------------------------------------------------------- */

/**
 * Translations
 */
let lang: Record<string, string>

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Truncate a string after the given number of characters
 *
 * @param value - Value to be truncated
 * @param n - Number of characters
 *
 * @return Truncated value
 */
export function truncate(value: string, n: number): string {
  let i = n
  if (value.length > i) {
    while (value[i] !== " " && --i > 0); // tslint:disable-line
    return `${value.substring(0, i)}...`
  }
  return value
}

/**
 * Translate the given key
 *
 * @param key - Key to be translated
 * @param value - Value to be replaced
 *
 * @return Translation
 */
export function translate(key: string, value?: string): string {
  if (typeof lang === "undefined") {
    const el = getElement("#__lang")!
    lang = JSON.parse(el.innerText)
  }
  if (typeof lang[key] === "undefined") {
    throw new ReferenceError(`Invalid translation: ${key}`)
  }
  return typeof value !== "undefined"
    ? lang[key].replace("#", value)
    : lang[key]
}

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

import { getElementOrThrow } from "browser"

/* ----------------------------------------------------------------------------
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Translation keys
 */
type TranslateKey =
  | "clipboard.copy"                   /* Copy to clipboard */
  | "clipboard.copied"                 /* Copied to clipboard */
  | "search.config.lang"               /* Search language */
  | "search.config.pipeline"           /* Search pipeline */
  | "search.config.separator"          /* Search separator */
  | "search.result.placeholder"        /* Type to start searching */
  | "search.result.none"               /* No matching documents */
  | "search.result.one"                /* 1 matching document */
  | "search.result.other"              /* # matching documents */

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
 * Translate the given key
 *
 * @param key - Key to be translated
 * @param value - Value to be replaced
 *
 * @return Translation
 */
export function translate(key: TranslateKey, value?: string): string {
  if (typeof lang === "undefined") {
    const el = getElementOrThrow("#__lang")
    lang = JSON.parse(el.textContent!)
  }
  if (typeof lang[key] === "undefined") {
    throw new ReferenceError(`Invalid translation: ${key}`)
  }
  return typeof value !== "undefined"
    ? lang[key].replace("#", value)
    : lang[key]
}

/**
 * Truncate a string after the given number of characters
 *
 * This is not a very reasonable approach, since the summaries kind of suck.
 * It would be better to create something more intelligent, highlighting the
 * search occurrences and making a better summary out of it, but this note was
 * written three years ago, so who knows if we'll ever fix it.
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
 * Round a number for display with source facts
 *
 * This is a reverse engineered version of GitHub's weird rounding algorithm
 * for stars, forks and all other numbers. While all numbers below `1,000` are
 * returned as-is, bigger numbers are converted to fixed numbers:
 *
 * - `1,049` => `1k`
 * - `1,050` => `1.1k`
 * - `1,949` => `1.9k`
 * - `1,950` => `2k`
 *
 * @param value - Original value
 *
 * @return Rounded value
 */
export function round(value: number): string {
  if (value > 999) {
    const digits = +((value - 950) % 1000 > 99)
    return `${((value + 0.000001) / 1000).toFixed(digits)}k`
  } else {
    return value.toString()
  }
}

/**
 * Simple hash function
 *
 * @see https://bit.ly/2wsVjJ4 - Original source
 *
 * @param value - Value to be hashed
 *
 * @return Hash as 32bit integer
 */
export function hash(value: string): number {
    let h = 0
    for (let i = 0, len = value.length; i < len; i++) {
      h  = ((h << 5) - h) + value.charCodeAt(i)
      h |= 0 // Convert to 32bit integer
    }
    return h
  }

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

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

/**
 * Search transformation function
 *
 * @param value - Query value
 *
 * @returns Transformed query value
 */
export type SearchTransformFn = (value: string) => string

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Default transformation function
 *
 * 1. Search for terms in quotation marks and prepend a `+` modifier to denote
 *    that the resulting document must contain all terms, converting the query
 *    to an `AND` query (as opposed to the default `OR` behavior). While users
 *    may expect terms enclosed in quotation marks to map to span queries, i.e.
 *    for which order is important, Lunr.js doesn't support them, so the best
 *    we can do is to convert the terms to an `AND` query.
 *
 * 2. Replace control characters which are not located at the beginning of the
 *    query or preceded by white space, or are not followed by a non-whitespace
 *    character or are at the end of the query string. Furthermore, filter
 *    unmatched quotation marks.
 *
 * 3. Trim excess whitespace from left and right.
 *
 * @param query - Query value
 *
 * @returns Transformed query value
 */
export function defaultTransform(query: string): string {
  return query
    .split(/"([^"]+)"/g)                            /* => 1 */
      .map((terms, index) => index & 1
        ? terms.replace(/^\b|^(?![^\x00-\x7F]|$)|\s+/g, " +")
        : terms
      )
      .join("")
    .replace(/"|(?:^|\s+)[*+\-:^~]+(?=\s+|$)/g, "") /* => 2 */
    .trim()                                         /* => 3 */
}

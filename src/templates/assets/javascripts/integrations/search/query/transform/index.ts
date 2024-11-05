/*
 * Copyright (c) 2016-2024 Martin Donath <martin.donath@squidfunk.com>
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
 * Helper types
 * ------------------------------------------------------------------------- */

/**
 * Visitor function
 *
 * @param value - String value
 *
 * @returns String term(s)
 */
type VisitorFn = (
  value: string
) => string | string[]

/* ----------------------------------------------------------------------------
 * Functions
 * ------------------------------------------------------------------------- */

/**
 * Default transformation function
 *
 * 1. Trim excess whitespace from left and right.
 *
 * 2. Search for parts in quotation marks and prepend a `+` modifier to denote
 *    that the resulting document must contain all parts, converting the query
 *    to an `AND` query (as opposed to the default `OR` behavior). While users
 *    may expect parts enclosed in quotation marks to map to span queries, i.e.
 *    for which order is important, Lunr.js doesn't support them, so the best
 *    we can do is to convert the parts to an `AND` query.
 *
 * 3. Replace control characters which are not located at the beginning of the
 *    query or preceded by white space, or are not followed by a non-whitespace
 *    character or are at the end of the query string. Furthermore, filter
 *    unmatched quotation marks.
 *
 * 4. Split the query string at whitespace, then pass each part to the visitor
 *    function for tokenization, and append a wildcard to every resulting term
 *    that is not explicitly marked with a `+`, `-`, `~` or `^` modifier, since
 *    it ensures consistent and stable ranking when multiple terms are entered.
 *    Also, if a fuzzy or boost modifier are given, but no numeric value has
 *    been entered, default to 1 to not induce a query error.
 *
 * @param query - Query value
 * @param fn - Visitor function
 *
 * @returns Transformed query value
 */
export function transform(
  query: string, fn: VisitorFn = term => term
): string {
  return query

    /* => 1 */
    .trim()

    /* => 2 */
    .split(/"([^"]+)"/g)
      .map((parts, index) => index & 1
        ? parts.replace(/^\b|^(?![^\x00-\x7F]|$)|\s+/g, " +")
        : parts
      )
      .join("")

    /* => 3 */
    .replace(/"|(?:^|\s+)[*+\-:^~]+(?=\s+|$)/g, "")

    /* => 4 */
    .split(/\s+/g)
      .reduce((prev, term) => {
        const next = fn(term)
        return [...prev, ...Array.isArray(next) ? next : [next]]
      }, [] as string[])
      .map(term => /([~^]$)/.test(term) ? `${term}1` : term)
      .map(term => /(^[+-]|[~^]\d+$)/.test(term) ? term : `${term}*`)
      .join(" ")
}

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
 * Polyfills
 * ------------------------------------------------------------------------- */

/* Polyfill for `Object.entries` */
if (!Object.entries)
  Object.entries = function (obj: object) {
    const data: [string, string][] = []
    for (const key of Object.keys(obj))
      // @ts-expect-error - ignore property access warning
      data.push([key, obj[key]])

    /* Return entries */
    return data
  }

/* Polyfill for `Object.values` */
if (!Object.values)
  Object.values = function (obj: object) {
    const data: string[] = []
    for (const key of Object.keys(obj))
      // @ts-expect-error - ignore property access warning
      data.push(obj[key])

    /* Return values */
    return data
  }

/* Polyfill for `Element.scrollTo` */
if (typeof Element !== "undefined" && !Element.prototype.scrollTo)
  Element.prototype.scrollTo = function (
    x?: ScrollToOptions | number, y?: number
  ): void {
    if (typeof x === "object") {
      this.scrollLeft = x.left!
      this.scrollTop = x.top!
    } else {
      this.scrollLeft = x!
      this.scrollTop = y!
    }
  }

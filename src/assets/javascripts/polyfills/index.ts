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

/* ----------------------------------------------------------------------------
 * Polyfills
 * ------------------------------------------------------------------------- */

/* Polyfill `Object.entries` */
if (!Object.entries)
  Object.entries = function (obj: object) {
    const data: [string, string][] = []
    for (const key of Object.keys(obj))
      // @ts-expect-error - ignore property access warning
      data.push([key, obj[key]])

    /* Return entries */
    return data
  }

/* Polyfill `Object.values` */
if (!Object.values)
  Object.values = function (obj: object) {
    const data: string[] = []
    for (const key of Object.keys(obj))
      // @ts-expect-error - ignore property access warning
      data.push(obj[key])

    /* Return values */
    return data
  }

/* ------------------------------------------------------------------------- */

/* Polyfills for `Element` */
if (typeof Element !== "undefined") {

  /* Polyfill `Element.scrollTo` */
  if (!Element.prototype.scrollTo)
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

  /* Polyfill `Element.replaceWith` */
  if (!Element.prototype.replaceWith)
    Element.prototype.replaceWith = function (
      ...nodes: Array<string | Node>
    ): void {
      const parent = this.parentNode
      if (parent) {
        if (nodes.length === 0)
          parent.removeChild(this)

        /* Replace children and create text nodes */
        for (let i = nodes.length - 1; i >= 0; i--) {
          let node = nodes[i]
          if (typeof node === "string")
            node = document.createTextNode(node)
          else if (node.parentNode)
            node.parentNode.removeChild(node)

          /* Replace child or insert before previous sibling */
          if (!i)
            parent.replaceChild(node, this)
          else
            parent.insertBefore(this.previousSibling!, node)
        }
      }
    }
}

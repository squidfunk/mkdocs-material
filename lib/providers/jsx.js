/*
 * Copyright (c) 2016-2017 Martin Donath <martin.donath@squidfunk.com>
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
 * Module
 * ------------------------------------------------------------------------- */

/* eslint-disable no-underscore-dangle */
export default /* JSX */ {

  /**
   * Create a native DOM node from JSX's intermediate representation
   *
   * @param {string} tag - Tag name
   * @param {?Object} properties - Properties
   * @param {Array<string | number | { __html: string } | Array<HTMLElement>>}
   *   children - Child nodes
   * @return {HTMLElement} Native DOM node
   */
  createElement(tag, properties, ...children) {
    const el = document.createElement(tag)

    /* Set all properties */
    if (properties)
      Array.prototype.forEach.call(Object.keys(properties), attr => {
        el.setAttribute(attr, properties[attr])
      })

    /* Iterate child nodes */
    const iterateChildNodes = nodes => {
      Array.prototype.forEach.call(nodes, node => {

        /* Directly append text content */
        if (typeof node === "string" ||
            typeof node === "number") {
          el.textContent += node

        /* Recurse, if we got an array */
        } else if (Array.isArray(node)) {
          iterateChildNodes(node)

        /* Append raw HTML */
        } else if (typeof node.__html !== "undefined") {
          el.innerHTML += node.__html

        /* Append regular nodes */
        } else if (node instanceof Node) {
          el.appendChild(node)
        }
      })
    }

    /* Iterate child nodes and return element */
    iterateChildNodes(children)
    return el
  }
}

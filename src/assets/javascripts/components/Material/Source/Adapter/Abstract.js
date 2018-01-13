/*
 * Copyright (c) 2016-2018 Martin Donath <martin.donath@squidfunk.com>
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

import Cookies from "js-cookie"

/* ----------------------------------------------------------------------------
 * Class
 * ------------------------------------------------------------------------- */

export default class Abstract {

  /**
   * Retrieve repository information
   *
   * @constructor
   *
   * @property {HTMLAnchorElement} el_ - Link to repository
   * @property {string} base_ - API base URL
   * @property {number} salt_ - Unique identifier
   *
   * @param {(string|HTMLAnchorElement)} el - Selector or HTML element
   */
  constructor(el) {
    const ref = (typeof el === "string")
      ? document.querySelector(el)
      : el
    if (!(ref instanceof HTMLAnchorElement))
      throw new ReferenceError
    this.el_ = ref

    /* Retrieve base URL */
    this.base_ = this.el_.href
    this.salt_ = this.hash_(this.base_)
  }

  /**
   * Retrieve data from Cookie or fetch from respective API
   *
   * @return {Promise<Array<string>>} Promise that returns an array of facts
   */
  fetch() {
    return new Promise(resolve => {
      const cached = Cookies.getJSON(`${this.salt_}.cache-source`)
      if (typeof cached !== "undefined") {
        resolve(cached)

      /* If the data is not cached in a cookie, invoke fetch and set
         a cookie that automatically expires in 15 minutes */
      } else {
        this.fetch_().then(data => {
          Cookies.set(`${this.salt_}.cache-source`, data, { expires: 1 / 96 })
          resolve(data)
        })
      }
    })
  }

  /**
   * Abstract private function that fetches relevant repository information
   *
   * @abstract
   */
  fetch_() {
    throw new Error("fetch_(): Not implemented")
  }

  /**
   * Format a number with suffix
   *
   * @param {number} number - Number to format
   * @return {string} Formatted number
   */
  format_(number) {
    if (number > 10000)
      return `${(number / 1000).toFixed(0)}k`
    else if (number > 1000)
      return `${(number / 1000).toFixed(1)}k`
    return `${number}`
  }

  /**
   * Simple hash function
   *
   * Taken from http://stackoverflow.com/a/7616484/1065584
   *
   * @param {string} str - Input string
   * @return {number} Hashed string
   */
  hash_(str) {
    let hash = 0
    if (str.length === 0) return hash
    for (let i = 0, len = str.length; i < len; i++) {
      hash  = ((hash << 5) - hash) + str.charCodeAt(i)
      hash |= 0 // Convert to 32bit integer
    }
    return hash
  }
}

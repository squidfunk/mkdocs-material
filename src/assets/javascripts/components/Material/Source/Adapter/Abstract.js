/*
 * Copyright (c) 2016 Martin Donath <martin.donath@squidfunk.com>
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
   * Retrieve source information
   *
   * @constructor
   * @param {(string|HTMLElement)} el - Selector or HTML element
   */
  constructor(el) {
    this.el_ = (typeof el === "string")
      ? document.querySelector(el)
      : el

    /* Retrieve base URL */
    this.base_ = this.el_.href
  }

  /**
   * Retrieve data from Cookie or fetch from respective API
   *
   * @return {Promise} Promise that returns an array of facts
   */
  fetch() {
    return new Promise(resolve => {
      const cached = Cookies.getJSON(".cache-source")
      if (typeof cached !== "undefined") {
        resolve(cached)

      /* If the data is not cached in a cookie, invoke fetch */
      } else {
        this.fetch_().then(data => {
          Cookies.set(".cache-source", data)
          resolve(data)
        })
      }
    })
  }

  /**
   * Abstract private function that fetches relevant repository information
   *
   * @abstract
   * @return {Promise} Promise that provides the facts in an array
   */
  fetch_() {
    throw new Error("fetch_(): Not implemented")
  }

  /**
   * Format a number with suffix
   *
   * @param {Number} number - Number to format
   * @return {Number} Formatted number
   */
  format_(number) {
    if (number > 10000)
      return `${(number / 1000).toFixed(0)}k`
    else if (number > 1000)
      return `${(number / 1000).toFixed(1)}k`
    return number
  }
}

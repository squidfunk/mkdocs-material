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

/* ----------------------------------------------------------------------------
 * Search
 * ------------------------------------------------------------------------- */

class Search {

  /**
   * Constructor
   *
   * @constructor
   * @param {(string|HTMLElement)} el - Selector or HTML element
   */
  constructor(el) {
    this.el_ = (typeof el === "string") ? document.querySelector(el) : el

    /* Event listener */
    this.handler_ = ev => {
      this.update(ev)
    }
  }

  /**
   * Update state and height of sidebar
   *
   * @param {Event} ev - Event
   * @return {void}
   */
  update() {

  }

  /**
   * Reset state and height of sidebar
   *
   * @return {void}
   */
  reset() {

  }

  /**
   * Register listener for all relevant events
   *
   * @return {void}
   */
  listen() {
    // ['scroll', 'resize', 'orientationchange'].forEach(name => {
    //   window.addEventListener(name, this.handler_, false);
    // });

    /* Initial update */
    this.update()
  }

  /**
   * Unregister listener for all relevant events
   *
   * @return {void}
   */
  unlisten() {
    // ['scroll', 'resize', 'orientationchange'].forEach(name => {
    //   window.removeEventListener(name, this.handler_, false);
    // });

    /* Perform reset */
    this.reset()
  }
}

/* ----------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------- */

export default Search

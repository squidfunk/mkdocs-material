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

/* ----------------------------------------------------------------------------
 * Class
 * ------------------------------------------------------------------------- */

export default class Title {

  /**
   * Swap header title topics when header is scrolled past
   *
   * @constructor
   *
   * @property {HTMLElement} el_ - Element
   * @property {HTMLElement} header_ - Header
   * @property {boolean} active_ - Title state
   *
   * @param {(string|HTMLElement)} el - Selector or HTML element
   * @param {(string|HTMLHeadingElement)} header - Selector or HTML element
   */
  constructor(el, header) {
    let ref = (typeof el === "string")
      ? document.querySelector(el)
      : el
    if (!(ref instanceof HTMLElement))
      throw new ReferenceError
    this.el_ = ref

    /* Retrieve header */
    ref = (typeof header === "string")
      ? document.querySelector(header)
      : header
    if (!(ref instanceof HTMLHeadingElement))
      throw new ReferenceError
    this.header_ = ref

    /* Initialize state */
    this.active_ = false
  }

  /**
   * Setup title state
   */
  setup() {
    Array.prototype.forEach.call(this.el_.children, node => {                   // TODO: use childNodes here for IE?
      node.style.width = `${this.el_.offsetWidth - 20}px`
    })
  }

  /**
   * Update title state
   *
   * @param {Event} ev - Event
   */
  update(ev) {
    const active = window.pageYOffset >= this.header_.offsetTop
    if (active !== this.active_)
      this.el_.dataset.mdState = (this.active_ = active) ? "active" : ""

    /* Hack: induce ellipsis on topics */
    if (ev.type === "resize" || ev.type === "orientationchange") {
      Array.prototype.forEach.call(this.el_.children, node => {
        node.style.width = `${this.el_.offsetWidth - 20}px`
      })
    }

  }

  /**
   * Reset title state
   */
  reset() {
    this.el_.dataset.mdState = ""
    this.el_.style.width = ""
    this.active_ = false
  }
}

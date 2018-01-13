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

export default class Shadow {

  /**
   * Show or hide header shadow depending on page y-offset
   *
   * @constructor
   *
   * @property {HTMLElement} el_ - Content container
   * @property {HTMLElement} header_ - Header
   * @property {number} height_ - Offset height of previous nodes
   * @property {boolean} active_ - Header shadow state
   *
   * @param {(string|HTMLElement)} el - Selector or HTML element
   * @param {(string|HTMLElement)} header - Selector or HTML element
   */
  constructor(el, header) {
    let ref = (typeof el === "string")
      ? document.querySelector(el)
      : el
    if (!(ref instanceof HTMLElement) ||
        !(ref.parentNode instanceof HTMLElement))
      throw new ReferenceError
    this.el_ = ref.parentNode

    /* Retrieve header */
    ref = (typeof header === "string")
      ? document.querySelector(header)
      : header
    if (!(ref instanceof HTMLElement))
      throw new ReferenceError
    this.header_ = ref

    /* Initialize height and state */
    this.height_ = 0
    this.active_ = false
  }

  /**
   * Calculate total height of previous nodes
   */
  setup() {
    let current = this.el_
    while ((current = current.previousElementSibling)) {
      if (!(current instanceof HTMLElement))
        throw new ReferenceError
      this.height_ += current.offsetHeight
    }
    this.update()
  }

  /**
   * Update shadow state
   *
   * @param {Event} ev - Event
   */
  update(ev) {
    if (ev && (ev.type === "resize" || ev.type === "orientationchange")) {
      this.height_ = 0
      this.setup()
    } else {
      const active = window.pageYOffset >= this.height_
      if (active !== this.active_)
        this.header_.dataset.mdState = (this.active_ = active) ? "shadow" : ""
    }
  }

  /**
   * Reset shadow state
   */
  reset() {
    this.header_.dataset.mdState = ""
    this.height_ = 0
    this.active_ = false
  }
}

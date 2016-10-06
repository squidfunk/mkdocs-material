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

import Abstract from "./Abstract"

/* ----------------------------------------------------------------------------
 * Definition
 * ------------------------------------------------------------------------- */

export default
class Position extends Abstract {

  /**
   * Set sidebars to locked state and limit height to parent node
   *
   * @constructor
   * @param {(string|HTMLElement)} el - Selector or HTML element
   */
  constructor(el) {
    super()

    /* Resolve elements */
    this.el_ = (typeof el === "string")
      ? document.querySelector(el)
      : el

    /* Index inner and outer container */
    this.inner_ = this.el_.parentNode
    this.outer_ = this.el_.parentNode.parentNode

    /* Initialize current height */
    this.height_ = 0
  }

  /**
   * Update locked state and height
   *
   * @param {Event} ev - Event (omitted)
   * @return {void}
   */
  update() {
    const bounds = this.inner_.getBoundingClientRect()                          // TODO: thresholds can be calculated as a function
    const parent = this.outer_.offsetTop

    /* Determine top and bottom offsets */
    const top    = bounds.top    + window.pageYOffset,
          bottom = bounds.bottom + window.pageYOffset

    /* Determine current y-offset at top and bottom of window */
    const upper  = window.pageYOffset,
          lower  = window.pageYOffset + window.innerHeight

    /* Calculate new bounds */
    const offset = top - upper
    const height = window.innerHeight
                 - Math.max(lower - bottom, 0)
                 - Math.max(offset, parent)

    /* If height changed, update element */
    if (height !== this.height_)
      this.el_.style.height = `${this.height_ = height}px`

    /* Sidebar should be locked, as we're below parent offset */
    if (offset < parent) {
      if (!this.el_.dataset.mdLocked)
        this.el_.dataset.mdLocked = true

    /* Sidebar should be unlocked, if locked */
    } else if (this.el_.dataset.mdLocked) {
      delete this.el_.dataset.mdLocked
    }
  }

  /**
   * Reset locked state and height
   *
   * @return {void}
   */
  reset() {
    delete this.el_.dataset.mdLocked
    this.el_.style.height = ""
    this.height_ = 0
  }
}

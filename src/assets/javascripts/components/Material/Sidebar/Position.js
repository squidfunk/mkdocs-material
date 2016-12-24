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
 * Class
 * ------------------------------------------------------------------------- */

export default class Position {

  /**
   * Set sidebars to locked state and limit height to parent node
   *
   * @constructor
   * @param {(string|HTMLElement)} el - Selector or HTML element
   */
  constructor(el) {
    this.el_ = (typeof el === "string")
      ? document.querySelector(el)
      : el

    /* Retrieve inner and outer container */
    this.inner_ = this.el_.parentNode
    this.outer_ = this.el_.parentNode.parentNode

    /* Initialize top offset and current height */
    this.offset_ = this.outer_.offsetTop
    this.height_ = 0
  }

  /**
   * Initialize sidebar state
   */
  setup() {
    this.update()
  }

  /**
   * Update locked state and height
   */
  update() {
    const scroll = window.pageYOffset
    const expand = window.innerHeight

    /* Calculate bounds of sidebar container  */
    this.bounds_ = {
      top: this.inner_.offsetTop,
      bottom: this.inner_.offsetTop + this.inner_.offsetHeight
    }

    /* Calculate new offset and height */
    const offset = this.bounds_.top - scroll
    const height = expand
                 - Math.max(0, scroll + expand - this.bounds_.bottom)
                 - Math.max(offset, this.offset_)

    /* If height changed, update element */
    if (height !== this.height_)
      this.el_.style.height = `${this.height_ = height}px`

    /* Sidebar should be locked, as we're below parent offset */
    if (offset < this.offset_) {
      if (this.el_.dataset.mdState !== "lock")
        this.el_.dataset.mdState = "lock"

    /* Sidebar should be unlocked, if locked */
    } else if (this.el_.dataset.mdState === "lock") {
      delete this.el_.dataset.mdState
    }
  }

  /**
   * Reset locked state and height
   */
  reset() {
    delete this.el_.dataset.mdState
    this.el_.style.height = ""
    this.height_ = 0
  }
}

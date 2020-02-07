/*
 * Copyright (c) 2016-2020 Martin Donath <martin.donath@squidfunk.com>
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
   *
   * @property {HTMLElement} el_ - Sidebar
   * @property {HTMLElement} parent_ - Sidebar container
   * @property {HTMLElement} header_ - Header
   * @property {number} height_ - Current sidebar height
   * @property {number} offset_ - Current page y-offset
   * @property {boolean} pad_ - Pad when header is fixed
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
    this.el_ = ref
    this.parent_ = ref.parentNode

    /* Retrieve header */
    ref = (typeof header === "string")
      ? document.querySelector(header)
      : header
    if (!(ref instanceof HTMLElement))
      throw new ReferenceError
    this.header_ = ref

    /* Initialize current height and test whether header is fixed */
    this.height_ = 0
    this.pad_ = window.getComputedStyle(this.header_).position === "fixed"
  }

  /**
   * Initialize sidebar state
   */
  setup() {
    const top = Array.prototype.reduce.call(
      this.parent_.children, (offset, child) => {
        return Math.max(offset, child.offsetTop)
      }, 0)

    /* Set lock offset for element with largest top offset */
    this.offset_ = top - (this.pad_ ? this.header_.offsetHeight : 0)
    this.update()
  }

  /**
   * Update locked state and height
   *
   * The inner height of the window (= the visible area) is the maximum
   * possible height for the stretching sidebar. This height must be deducted
   * by the height of the fixed header (56px). Depending on the page y-offset,
   * the top offset of the sidebar must be taken into account, as well as the
   * case where the window is scrolled beyond the sidebar container.
   *
   * @param {Event?} ev - Event
   */
  update(ev) {
    const offset  = window.pageYOffset
    const visible = window.innerHeight

    /* Update offset, in case window is resized */
    if (ev && ev.type === "resize")
      this.setup()

    /* Set bounds of sidebar container - must be calculated on every run, as
       the height of the content might change due to loading images etc. */
    const bounds = {
      top: this.pad_ ? this.header_.offsetHeight : 0,
      bottom: this.parent_.offsetTop + this.parent_.offsetHeight
    }

    /* Calculate new offset and height */
    const height = visible - bounds.top
                 - Math.max(0, this.offset_ - offset)
                 - Math.max(0, offset + visible - bounds.bottom)

    /* If height changed, update element */
    if (height !== this.height_)
      this.el_.style.height = `${this.height_ = height}px`

    /* Sidebar should be locked, as we're below parent offset */
    if (offset >= this.offset_) {
      if (this.el_.dataset.mdState !== "lock")
        this.el_.dataset.mdState = "lock"

    /* Sidebar should be unlocked, if locked */
    } else if (this.el_.dataset.mdState === "lock") {
      this.el_.dataset.mdState = ""
    }
  }

  /**
   * Reset locked state and height
   */
  reset() {
    this.el_.dataset.mdState = ""
    this.el_.style.height = ""
    this.height_ = 0
  }
}

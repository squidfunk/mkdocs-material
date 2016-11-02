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
 * Definition
 * ------------------------------------------------------------------------- */

export default class Collapse {

  /**
   * Expand or collapse navigation on toggle
   *
   * @constructor
   * @param {(string|HTMLElement)} el - Selector or HTML element
   */
  constructor(el) {
    this.el_ = (typeof el === "string")
      ? document.querySelector(el)
      : el
  }

  /**
   * Make expand and collapse transition smoothly
   */
  update() {
    const current = this.el_.getBoundingClientRect().height

    /* Expanded, so collapse */
    if (current) {
      this.el_.style.maxHeight = `${current}px`
      requestAnimationFrame(() => {
        this.el_.dataset.mdAnimated = ""
        this.el_.style.maxHeight = "0px"
      })

    /* Collapsed, so expand */
    } else {
      this.el_.style.maxHeight = ""
      this.el_.dataset.mdExpanded = ""

      /* Read height and unset pseudo-toggled state */
      const height = this.el_.getBoundingClientRect().height
      delete this.el_.dataset.mdExpanded

      /* Set initial state and animate */
      this.el_.style.maxHeight = "0px"
      requestAnimationFrame(() => {
        this.el_.dataset.mdAnimated = ""
        this.el_.style.maxHeight = `${height}px`
      })
    }

    /* Remove state on end of transition */
    const end = function(ev) {
      delete ev.target.dataset.mdAnimated
      ev.target.style.maxHeight = ""

      /* Only fire once, so remove event listener again */
      ev.target.removeEventListener("transitionend", end, false)
    }
    this.el_.addEventListener("transitionend", end, false)
  }

  /**
   * Nothing to reset
   */
  reset() {
    this.el_.style.maxHeight = ""
    delete this.el_.dataset.mdToggled
  }
}

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

export default class Scrolling {

  /**
   * Set overflow scrolling on the current active pane (for iOS)
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
   * Setup panes
   */
  setup() {

    /* Initially set overflow scrolling on main pane */
    this.el_.children[1].style.webkitOverflowScrolling = "touch"

    /* Find all toggles and check which one is active */
    const toggles = this.el_.querySelectorAll("[data-md-toggle]")
    Array.prototype.forEach.call(toggles, toggle => {
      if (toggle.checked) {

        /* Find corresponding navigational pane */
        let pane = toggle.nextElementSibling
        while (pane.tagName !== "NAV")
          pane = pane.nextElementSibling

        /* Find current and parent list elements */
        const parent = toggle.parentNode.parentNode
        const target = pane.children[pane.children.length - 1]

        /* Always reset all lists when transitioning */
        parent.style.webkitOverflowScrolling = ""
        target.style.webkitOverflowScrolling = "touch"
      }
    })
  }

  /**
   * Update active panes
   *
   * @param {Event} ev - Change event
   */
  update(ev) {

    /* Find corresponding navigational pane */
    let pane = ev.target.nextElementSibling
    while (pane.tagName !== "NAV")
      pane = pane.nextElementSibling

    /* Find current and parent list elements */
    const parent = ev.target.parentNode.parentNode
    const target = pane.children[pane.children.length - 1]

    /* Always reset all lists when transitioning */
    parent.style.webkitOverflowScrolling = ""
    target.style.webkitOverflowScrolling = ""

    /* Set overflow scrolling on parent */
    if (!ev.target.checked) {
      const end = () => {
        parent.style.webkitOverflowScrolling = "touch"
        pane.removeEventListener("transitionend", end)
      }
      pane.addEventListener("transitionend", end, false)
    }

    /* Set overflow scrolling on target */
    if (ev.target.checked) {
      const end = () => {
        target.style.webkitOverflowScrolling = "touch"
        pane.removeEventListener("transitionend", end, false)
      }
      pane.addEventListener("transitionend", end, false)
    }
  }

  /**
   * Reset panes
   */
  reset() {

    /* Reset overflow scrolling on main pane */
    this.el_.children[1].style.webkitOverflowScrolling = ""

    /* Find all toggles and check which one is active */
    const toggles = this.el_.querySelectorAll("[data-md-toggle]")
    Array.prototype.forEach.call(toggles, toggle => {
      if (toggle.checked) {

        /* Find corresponding navigational pane */
        let pane = toggle.nextElementSibling
        while (pane.tagName !== "NAV")
          pane = pane.nextElementSibling

        /* Find current and parent list elements */
        const parent = toggle.parentNode.parentNode
        const target = pane.children[pane.children.length - 1]

        /* Always reset all lists when transitioning */
        parent.style.webkitOverflowScrolling = ""
        target.style.webkitOverflowScrolling = ""
      }
    })
  }
}

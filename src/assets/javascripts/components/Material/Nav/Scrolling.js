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

export default class Scrolling {

  /**
   * Set overflow scrolling on the current active pane (for iOS)
   *
   * @constructor
   *
   * @property {HTMLElement} el_ - Primary navigation
   *
   * @param {(string|HTMLElement)} el - Selector or HTML element
   */
  constructor(el) {
    const ref = (typeof el === "string")
      ? document.querySelector(el)
      : el
    if (!(ref instanceof HTMLElement))
      throw new ReferenceError
    this.el_ = ref
  }

  /**
   * Setup panes
   */
  setup() {

    /* Initially set overflow scrolling on main pane */
    const main = this.el_.children[this.el_.children.length - 1]
    main.style.webkitOverflowScrolling = "touch"

    /* Find all toggles and check which one is active */
    const toggles = this.el_.querySelectorAll("[data-md-toggle]")
    Array.prototype.forEach.call(toggles, toggle => {
      if (!(toggle instanceof HTMLInputElement))
        throw new ReferenceError
      if (toggle.checked) {

        /* Find corresponding navigational pane */
        let pane = toggle.nextElementSibling
        if (!(pane instanceof HTMLElement))
          throw new ReferenceError
        while (pane.tagName !== "NAV" && pane.nextElementSibling)
          pane = pane.nextElementSibling

        /* Check references */
        if (!(toggle.parentNode instanceof HTMLElement) ||
            !(toggle.parentNode.parentNode instanceof HTMLElement))
          throw new ReferenceError

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
    const target = ev.target
    if (!(target instanceof HTMLElement))
      throw new ReferenceError

    /* Find corresponding navigational pane */
    let pane = target.nextElementSibling
    if (!(pane instanceof HTMLElement))
      throw new ReferenceError
    while (pane.tagName !== "NAV" && pane.nextElementSibling)
      pane = pane.nextElementSibling

    /* Check references */
    if (!(target.parentNode instanceof HTMLElement) ||
        !(target.parentNode.parentNode instanceof HTMLElement))
      throw new ReferenceError

    /* Find parent and active panes */
    const parent = target.parentNode.parentNode
    const active = pane.children[pane.children.length - 1]

    /* Always reset all lists when transitioning */
    parent.style.webkitOverflowScrolling = ""
    active.style.webkitOverflowScrolling = ""

    /* Set overflow scrolling on parent pane */
    if (!target.checked) {
      const end = () => {
        if (pane instanceof HTMLElement) {
          parent.style.webkitOverflowScrolling = "touch"
          pane.removeEventListener("transitionend", end)
        }
      }
      pane.addEventListener("transitionend", end, false)
    }

    /* Set overflow scrolling on active pane */
    if (target.checked) {
      const end = () => {
        if (pane instanceof HTMLElement) {
          active.style.webkitOverflowScrolling = "touch"
          pane.removeEventListener("transitionend", end)
        }
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
      if (!(toggle instanceof HTMLInputElement))
        throw new ReferenceError
      if (toggle.checked) {

        /* Find corresponding navigational pane */
        let pane = toggle.nextElementSibling
        if (!(pane instanceof HTMLElement))
          throw new ReferenceError
        while (pane.tagName !== "NAV" && pane.nextElementSibling)
          pane = pane.nextElementSibling

        /* Check references */
        if (!(toggle.parentNode instanceof HTMLElement) ||
            !(toggle.parentNode.parentNode instanceof HTMLElement))
          throw new ReferenceError

        /* Find parent and active panes */
        const parent = toggle.parentNode.parentNode
        const active = pane.children[pane.children.length - 1]

        /* Always reset all lists when transitioning */
        parent.style.webkitOverflowScrolling = ""
        active.style.webkitOverflowScrolling = ""
      }
    })
  }
}

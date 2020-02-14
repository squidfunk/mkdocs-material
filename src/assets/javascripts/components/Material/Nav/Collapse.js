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

export default class Collapse {

  /**
   * Expand or collapse navigation on toggle
   *
   * @constructor
   *
   * @property {HTMLElement} el_ - Navigation list
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
   * Initialize overflow and display for accessibility
   */
  setup() {
    const current = this.el_.getBoundingClientRect().height

    /* Hidden links should not be focusable, so hide them when the navigation
       is collapsed and set overflow so the outline is not cut off */
    this.el_.style.display  = current ? "block"   : "none"
    this.el_.style.overflow = current ? "visible" : "hidden"
  }

  /**
   * Animate expand and collapse smoothly
   *
   * Internet Explorer 11 is very slow at recognizing changes on the dataset
   * which results in the menu not expanding or collapsing properly. THerefore,
   * for reasons of compatibility, the attribute accessors are used.
   */
  update() {
    const current = this.el_.getBoundingClientRect().height

    /* Reset overflow to CSS defaults */
    this.el_.style.display  = "block"
    this.el_.style.overflow = ""

    /* Hack: read value directly from input field */
    const expanded = this.el_
      .previousElementSibling
      .previousElementSibling
      .checked

    /* Expanded, so collapse */
    if (expanded) {
      this.el_.style.maxHeight = `${current}px`
      requestAnimationFrame(() => {
        this.el_.setAttribute("data-md-state", "animate")
        this.el_.style.maxHeight = "0px"
      })

    /* Collapsed, so expand */
    } else {
      this.el_.setAttribute("data-md-state", "expand")
      this.el_.style.maxHeight = ""

      /* Read height and unset pseudo-toggled state */
      const height = this.el_.getBoundingClientRect().height
      this.el_.removeAttribute("data-md-state")

      /* Set initial state and animate */
      this.el_.style.maxHeight = "0px"
      requestAnimationFrame(() => {
        this.el_.setAttribute("data-md-state", "animate")
        this.el_.style.maxHeight = `${height}px`
      })
    }

    /* Remove state on end of transition */
    const end = ev => {
      const target = ev.target
      if (!(target instanceof HTMLElement))
        throw new ReferenceError

      /* Reset height and state */
      target.removeAttribute("data-md-state")
      target.style.maxHeight = ""

      /* Hidden links should not be focusable, so hide them when the navigation
        is collapsed and set overflow so the outline is not cut off */
      target.style.display  = expanded ? "none"   : "block"
      target.style.overflow = expanded ? "hidden" : "visible"

      /* Only fire once, so directly remove event listener */
      target.removeEventListener("transitionend", end)
    }
    this.el_.addEventListener("transitionend", end, false)
  }

  /**
   * Reset height and pseudo-toggled state
   */
  reset() {
    this.el_.dataset.mdState = ""
    this.el_.style.maxHeight = ""
    this.el_.style.display   = ""
    this.el_.style.overflow  = ""
  }
}

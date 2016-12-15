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

export default class Lock {

  /**
   * Lock body for full-screen search modal
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
   * Setup locked state
   */
  setup() {
    this.update()
  }

  /**
   * Update locked state
   */
  update() {

    /* Entering search mode */
    if (this.el_.checked) {
      this.offset_ = window.pageYOffset

      /* Scroll to top after transition, to omit flickering */
      setTimeout(() => {
        window.scrollTo(0, 0)

        /* Lock body after finishing transition */
        if (this.el_.checked) {
          document.body.dataset.mdState = "lock"
        }
      }, 400)

    /* Exiting search mode */
    } else {
      delete document.body.dataset.mdState

      /* Scroll to former position, but wait for 100ms to prevent flashes on
         iOS. A short timeout seems to do the trick */
      setTimeout(() => {
        if (typeof this.offset_ !== "undefined")
          window.scrollTo(0, this.offset_)
      }, 100)
    }
  }

  /**
   * Reset locked state and page y-offset
   */
  reset() {
    if (document.body.dataset.mdState)
      window.scrollTo(0, this.offset_)
    delete document.body.dataset.mdState
  }
}

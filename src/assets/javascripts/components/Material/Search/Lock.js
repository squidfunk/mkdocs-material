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

export default class Lock {

  /**
   * Lock body for full-screen search bar
   *
   * @constructor
   * @param {(string|HTMLElement)} el - Selector or HTML element
   * @param {Function} handler - Callback to execute in active search mode
   */
  constructor(el, handler) {
    this.el_ = (typeof el === "string")
      ? document.querySelector(el)
      : el

    /* Initialize page y-offset and callback */
    this.offset_ = 0
    this.handler_ = handler

    /* Dispatch update on next repaint */
    this.handler_ = ev => {
      this.update(ev)
    }
  }

  /**
   * Update state
   *
   * @param {Event} ev - Event
   */
  update(ev) {

    /* Entering search mode */
    if (ev.target.checked) {
      this.offset_ = window.scrollY

      /* First timeout: scroll to top after transition, to omit flickering */
      setTimeout(() => {
        window.scrollTo(0, 0)
      }, 400)

      /* Second timeout: Lock body after finishing transition and scrolling
         to top and focus input field. Sadly, the focus event is not dispatched
         on iOS Safari and there's nothing we can do about it. */
      setTimeout(() => {

        /* This additional check is necessary to handle fast subsequent clicks
           on the toggle and the timeout to lock the body must be cancelled */
        if (ev.target.checked) {
          document.body.dataset.mdLocked = ""
          setTimeout(this.handler_, 200)
        }
      }, 400)

    /* Exiting search mode */
    } else {
      delete document.body.dataset.mdLocked

      /* Scroll to former position, but wait for 100ms to prevent flashes on
         iOS. A short timeout seems to do the trick */
      setTimeout(() => {
        window.scrollTo(0, this.offset_)
      }, 100)
    }
  }

  /**
   * Reset state
   *
   * @param {Event} ev - Event
   */
  reset() {
    delete document.body.dataset.mdLocked
    window.scrollTo(0, this.offset_)
  }

  /**
   * Register listener for all relevant events
   */
  listen() {
    ["change"].forEach(name => {
      this.el_.addEventListener(name, this.handler_, false)
    })
  }

  /**
   * Unregister listener for all relevant events
   */
  unlisten() {
    ["change"].forEach(name => {
      this.el_.removeEventListener(name, this.handler_, false)
    })

    /* Final reset */
    this.reset()
  }
}

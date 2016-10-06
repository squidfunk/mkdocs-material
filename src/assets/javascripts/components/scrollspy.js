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
 * Sidebar scroll-spy
 * ------------------------------------------------------------------------- */

export default
class ScrollSpy {

  /**
   * Constructor
   *
   * @constructor
   * @param {(string|HTMLCollection)} els - Selector or HTML elements
   */
  constructor(els) {
    this.els_ = (typeof els === "string")
      ? document.querySelectorAll(els)
      : els

    /* Initialize index for currently active element */
    this.index_ = 0
    this.offset_ = window.pageYOffset

    /* Index anchor nodes for fast lookup */
    this.anchors_ = [].map.call(this.els_, el => {
      return document.querySelector(el.hash)
    })

    /* Event listener */
    this.handler_ = ev => {
      this.update(ev)
    }
  }

  /**
   * Update state of sidebar
   *
   * @param {Event} ev - Event (omitted)
   * @return {void}
   */
  update() {

    /* Scroll direction is down */
    if (this.offset_ <= window.pageYOffset) {
      for (let i = this.index_ + 1; i < this.els_.length; i++) {
        if (this.anchors_[i].offsetTop <= window.pageYOffset) {
          if (i > 0)
            this.els_[i - 1].dataset.mdMarked = true
          this.index_ = i
        } else {
          break
        }
      }

    /* Scroll direction is up */
    } else {
      for (let i = this.index_; i >= 0; i--) {
        if (this.anchors_[i].offsetTop > window.pageYOffset) {
          if (i > 0)
            delete this.els_[i - 1].dataset.mdMarked
        } else {
          this.index_ = i
          break
        }
      }
    }

    /* Remember current offset for next cycle */
    this.offset_ = window.pageYOffset
  }

  /**
   * Reset state of sidebar
   *
   * @return {void}
   */
  reset() {
    [].forEach.call(this.els_, el => {
      delete el.dataset.mdMarked
    })
  }

  /**
   * Register listener for all relevant events
   *
   * @return {void}
   */
  listen() {
    ["scroll", "resize", "orientationchange"].forEach(name => {
      window.addEventListener(name, this.handler_, false)
    })

    /* Initial update */
    this.update()
  }

  /**
   * Unregister listener for all relevant events
   *
   * @return {void}
   */
  unlisten() {
    ["scroll", "resize", "orientationchange"].forEach(name => {
      window.removeEventListener(name, this.handler_, false)
    })

    /* Perform reset */
    this.reset()
  }
}

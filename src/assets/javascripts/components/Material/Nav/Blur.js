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

export default class Blur {

  /**
   * Blur anchors within the navigation above current page y-offset
   *
   * @constructor
   * @param {(string|NodeList<HTMLElement>)} els - Selector or HTML elements
   */
  constructor(els) {
    this.els_ = (typeof els === "string")
      ? document.querySelectorAll(els)
      : els

    /* Initialize index and page y-offset */
    this.index_  = 0
    this.offset_ = window.pageYOffset

    /* Index anchor node offsets for fast lookup */
    this.anchors_ = [].map.call(this.els_, el => {
      return document.querySelector(el.hash)
    })
  }

  /**
   * Initialize anchor states
   */
  setup() {
    this.update()
  }

  /**
   * Update anchor states
   *
   * Deduct the static offset of the header (56px) and sidebar offset (24px),
   * see _permalinks.scss for more information.
   */
  update() {
    const offset = window.pageYOffset

    /* Exit when there are no anchors */
    if (this.anchors_.length === 0)
      return

    /* Scroll direction is down */
    if (this.offset_ <= offset) {
      for (let i = this.index_ + 1; i < this.els_.length; i++) {
        if (this.anchors_[i].offsetTop - (56 + 24) <= offset) {
          if (i > 0)
            this.els_[i - 1].dataset.mdState = "blur"
          this.index_ = i
        } else {
          break
        }
      }

    /* Scroll direction is up */
    } else {
      for (let i = this.index_; i >= 0; i--) {
        if (this.anchors_[i].offsetTop - (56 + 24) > offset) {
          if (i > 0)
            this.els_[i - 1].dataset.mdState = ""
        } else {
          this.index_ = i
          break
        }
      }
    }

    /* Remember current offset for next iteration */
    this.offset_ = offset
  }

  /**
   * Reset anchor states
   */
  reset() {
    Array.prototype.forEach.call(this.els_, el => {
      el.dataset.mdState = ""
    })

    /* Reset index and page y-offset */
    this.index_  = 0
    this.offset_ = window.pageYOffset
  }
}

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

'use strict';

/* ----------------------------------------------------------------------------
 * Sidebar scroll-spy
 * ------------------------------------------------------------------------- */

class ScrollSpy {

  /**
   * Constructor
   *
   * @constructor
   * @param {(string|HTMLCollection)} el - Selector or HTML elements
   */
  constructor(el) {
    this.el_ = (typeof el === 'string') ? document.querySelectorAll(el) : el;

    /* Initialize index for currently active element */
    this.index_  = 0;
    this.offset_ = window.pageYOffset;

    /* Event listener */
    this.handler_ = (ev) => {
      this.update(ev);
    };
  }

  /**
   * Update state of sidebar and hash
   *
   * @param {Event} ev - Event
   */
  update(ev) {
    let index = this.index_;

    /* Scroll direction is down */
    if (this.offset_ <= window.pageYOffset) {
      for (let i = this.index_; i < this.el_.length; i++) {
        let anchor = document.querySelector(this.el_[i].hash);
        if (anchor.offsetTop <= window.pageYOffset) {
          if (i > 0)
            this.el_[i - 1].classList.add('md-nav__link--marked');
          this.index_ = i;
        } else {
          break;
        }
      }

    /* Scroll direction is up */
    } else {
      for (let i = this.index_; i >= 0; i--) {
        let anchor = document.querySelector(this.el_[i].hash);
        if (anchor.offsetTop > window.pageYOffset) {
          if (i > 0)
            this.el_[i - 1].classList.remove('md-nav__link--marked');
        } else {
          this.index_ = i;
          break;
        }
      }
    }

    /* Remember current offset for next cycle */
    this.offset_ = window.pageYOffset;
  }

  /**
   * Reset state of sidebar
   */
  reset() {
    [].forEach.call(this.el_, (el) => {
      el.classList.remove('md-nav__link--marked');
    });
  }

  /**
   * Register listener for all relevant events
   */
  listen() {
    ['scroll', 'resize', 'orientationchange'].forEach((name) => {
      window.addEventListener(name, this.handler_, false);
    });

    /* Initial update */
    this.update();
  }

  /**
   * Unregister listener for all relevant events
   */
  unlisten() {
    ['scroll', 'resize', 'orientationchange'].forEach((name) => {
      window.removeEventListener(name, this.handler_, false);
    });

    /* Perform reset */
    this.reset();
  }
}

/* ----------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------- */

export default ScrollSpy;
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
 * Sidebar sticky-scroll handler
 * ------------------------------------------------------------------------- */

class Sidebar {

  /**
   * Constructor
   *
   * @constructor
   * @param {(string|HTMLElement)} el - Selector or HTML element
   */
  constructor(el) {
    this.el_ = (typeof el === 'string') ? document.querySelector(el) : el;

    /* Initialize parameters */
    this.height_ = 0;
    this.locked_ = false;

    /* Event listener */
    this.handler_ = ev => {
      this.update(ev);
    };
  };

  /**
   * Update state and height of sidebar
   *
   * @param {Event} ev - Event
   */
  update(ev) {
    let container = this.el_.parentNode;
    let bounds = container.getBoundingClientRect();

    /* Determine top and bottom offsets */
    let top    = bounds.top    + window.pageYOffset,
        bottom = bounds.bottom + window.pageYOffset;

    /* Determine current y-offset at top and bottom of window */
    let upper  = window.pageYOffset,
        lower  = window.pageYOffset + window.innerHeight;

    /* Calculate new bounds */
    let offset = top - upper;
    let height = window.innerHeight - Math.max(lower - bottom, 0)
               - Math.max(offset, container.parentNode.offsetTop);

    /* If height changed, update element */
    if (height != this.height_)
      this.el_.style.height = (this.height_ = height) + 'px';

    /* Sidebar should be locked, as we're below parent offset */
    if (offset < container.parentNode.offsetTop) {
      if (!this.locked_) {
        this.el_.classList.add('md-js__sidebar--locked');
        this.locked_ = true;
      }

    /* Sidebar should be unlocked, if locked */
    } else if (this.locked_) {
      this.el_.classList.remove('md-js__sidebar--locked');
      this.locked_ = false;
    }
  };

  /**
   * Reset state and height of sidebar
   */
  reset() {
    this.el_.classList.remove('md-js__sidebar--locked');
    this.el_.style.height = '';

    /* Reset parameters */
    this.height_ = 0;
    this.locked_ = false;
  };

  /**
   * Register listener for all relevant events
   */
  listen() {
    ['scroll', 'resize', 'orientationchange'].forEach(name => {
      window.addEventListener(name, this.handler_, false);
    });

    /* Initial update */
    this.update();
  };

  /**
   * Unregister listener for all relevant events
   */
  unlisten() {
    ['scroll', 'resize', 'orientationchange'].forEach(name => {
      window.removeEventListener(name, this.handler_, false);
    });

    /* Perform reset */
    this.reset();
  };
}

/* ----------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------- */

export default Sidebar;
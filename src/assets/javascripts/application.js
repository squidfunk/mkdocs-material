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
 * Imports
 * ------------------------------------------------------------------------- */

import FastClick from 'fastclick';
import Sidebar from './components/sidebar';
import ScrollSpy from './components/scrollspy';

/* ----------------------------------------------------------------------------
 * Application
 * ------------------------------------------------------------------------- */

/* Initialize application upon DOM ready */
document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  /* Test for iOS */
  Modernizr.addTest('ios', function() {
    return !!navigator.userAgent.match(/(iPad|iPhone|iPod)/g);
  });

  /* Test for web application context */
  Modernizr.addTest('standalone', function() {
    return !!navigator.standalone;
  });

  /* Attack FastClick to mitigate 300ms delay on touch devices */
  FastClick.attach(document.body);


  var width = window.matchMedia("(min-width: 1200px)");
  var handler = function() {
    if (width.matches) {
      sidebar.listen();
    } else {
      sidebar.unlisten();
    }
  }

  var sidebar = new Sidebar('.md-sidebar--primary');
  handler(); // check listen!

  var toc = new Sidebar('.md-sidebar--secondary');
  toc.listen();

  var spy = new ScrollSpy('.md-nav--toc .md-nav__item a');
  spy.listen();

  window.addEventListener('resize', handler);

  /* Intercept click on search mode toggle */
  var offset = 0;
  var toggle = document.getElementById('md-toggle-search');
  toggle.addEventListener('click', function(e) {
    var list = document.body.classList;
    var lock = !matchMedia('only screen and (min-width: 960px)').matches;

    /* Exiting search mode */
    if (list.contains('md-js__body--locked')) {
      list.remove('md-js__body--locked');

      /* Scroll to former position, but wait for 100ms to prevent flashes
         on iOS. A short timeout seems to do the trick */
      if (lock)
        setTimeout(function() {
          window.scrollTo(0, offset);
        }, 100);

    /* Entering search mode */
    } else {
      offset = window.scrollY;

      /* First timeout: scroll to top after transition, to omit flickering */
      if (lock)
        setTimeout(function() {
          window.scrollTo(0, 0);
        }, 400);

      /* Second timeout: Lock body after finishing transition and scrolling to
         top and focus input field. Sadly, the focus event is not dispatched
         on iOS Safari and there's nothing we can do about it. */
      setTimeout(function() {

        /* This additional check is necessary to handle fast subsequent clicks
           on the toggle and the timeout to lock the body must be cancelled */
        if (this.checked) {
          if (lock)
            list.add('md-js__body--locked');
          setTimeout(function() {
            document.getElementById('md-search').focus();
          }, 200);
        }
      }.bind(this), 450);
    }
  });




});
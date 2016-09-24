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
import Expander from './components/expander';

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

  var spy = new ScrollSpy('.md-sidebar--secondary .md-nav--secondary .md-nav__link');
  spy.listen();

  window.addEventListener('resize', handler);

  /* Intercept click on search mode toggle */
  var offset = 0;
  var toggle = document.getElementById('search');
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

  // var toc = new Sidebar('.md-sidebar--secondary');
  // toc.listen();

  var toggles = document.querySelectorAll('.md-nav__item--nested > .md-nav__link');
  [].forEach.call(toggles, (toggle) => {
    let nav = toggle.nextElementSibling;

    // 1.

    nav.style.maxHeight = nav.getBoundingClientRect().height + 'px';

    toggle.addEventListener('click', function () {
      let first = nav.getBoundingClientRect().height;
      if (first) {
        console.log('closing');
        nav.style.maxHeight = first + 'px'; // reset!
        requestAnimationFrame(() => {

          nav.classList.add('md-nav--transitioning');
          nav.style.maxHeight = '0px';
        });
      } else {
        console.log('opening');

        /* Toggle and read height */
        nav.style.maxHeight = '';

        nav.classList.add('md-nav--toggled');
        let last = nav.getBoundingClientRect().height;
        nav.classList.remove('md-nav--toggled');

        // Initial state
        nav.style.maxHeight = '0px';

        /* Enable animations */
        requestAnimationFrame(() => {
          nav.classList.add('md-nav--transitioning');
          nav.style.maxHeight = last + 'px';
        });
      }

    });

    // Capture the end with transitionend
    nav.addEventListener('transitionend', function() {
      this.classList.remove('md-nav--transitioning');
      if (this.getBoundingClientRect().height > 0) {
        this.style.maxHeight = '100%';
      }
    });
  });

  // document.querySelector('[for="nav-3"]').addEventListener('click', function() {
  //   var el = document.querySelector('[for="nav-3"] + nav');
  //
  //   // TODO: do via class and disable transforms!!!
  //   el.style.maxHeight = '100%'; // class !?
  //
  //   var rect = el.getBoundingClientRect();
  //
  //   console.log(rect);
  //
  //   el.style.maxHeight = '0px';
  //   requestAnimationFrame(function() {
  //     el.classList.add('md-nav--transitioning');
  //     el.style.maxHeight = rect.height + 'px';
  //   });
  //
  //   // Capture the end with transitionend
  //   el.addEventListener('transitionend', function() {
  //     el.classList.remove('md-nav--transitioning');
  //   });
  // });


// setTimeout(function() {
  fetch('https://api.github.com/repos/squidfunk/mkdocs-material')
    .then(function(response) {
      return response.json()
    }).then(function(data) {
      var stars = data.stargazers_count;
      var forks = data.forks_count;
      // store in session!!!
      var lists = document.querySelectorAll('.md-source__facts');
      [].forEach.call(lists, function(list) {
        // list.innerHTML += '<li class="md-source__fact">' + stars + ' Stars</li>\n';
        // list.innerHTML += '<li>' + forks + ' Forks</li>\n';

        var li = document.createElement('li');
        li.className = 'md-source__fact md-source__fact--hidden';
        li.innerText = stars + ' Stars';
        list.appendChild(li);


        setTimeout(function(li) {
          li.classList.remove('md-source__fact--hidden');
        }, 100, li);

        li = document.createElement('li');
        li.className = 'md-source__fact md-source__fact--hidden';
        li.innerText = forks + ' Forks';
        list.appendChild(li);

        setTimeout(function(li) {
          li.classList.remove('md-source__fact--hidden');
        }, 500, li);
      })


      // setTimeout(function() {
      //   li.classList.remove('md-source__fact--hidden');
      // }, 100);

    }).catch(function(ex) {
      console.log('parsing failed', ex)
    });
// }, 1000);

});